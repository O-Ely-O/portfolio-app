import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

/**
 * Escape user-controlled text before inserting it into HTML email.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) {
    return false;
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  return emailRegex.test(email);
}

export async function handler(req: Request) {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  try {
    const body = await req.json();

    const {
      name,
      email,
      service,
      budget,
      subject,
      message,
      website_hp,
    } = body ?? {};

    // Server-side honeypot check.
    // Do not send anything if a bot filled the hidden field.
    if (typeof website_hp === 'string' && website_hp.trim()) {
      return json({ success: true });
    }

    // Validate required field types.
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return json(
        {
          error: 'Name, email, and message are required.',
        },
        400
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    const cleanService =
      typeof service === 'string' ? service.trim() : '';

    const cleanBudget =
      typeof budget === 'string' ? budget.trim() : '';

    const cleanSubject =
      typeof subject === 'string' ? subject.trim() : '';

    const cleanMessage = message.trim();

    // Required-field validation.
    if (!cleanName || !cleanEmail || !cleanMessage) {
      return json(
        {
          error: 'Name, email, and message are required.',
        },
        400
      );
    }

    // Length validation.
    if (cleanName.length > 80) {
      return json(
        {
          error: 'Name must be 80 characters or fewer.',
        },
        400
      );
    }

    if (cleanEmail.length > 254 || !isValidEmail(cleanEmail)) {
      return json(
        {
          error: 'Please provide a valid email address.',
        },
        400
      );
    }

    if (cleanService.length > 100) {
      return json(
        {
          error: 'Service selection is invalid.',
        },
        400
      );
    }

    if (cleanBudget.length > 50) {
      return json(
        {
          error: 'Budget selection is invalid.',
        },
        400
      );
    }

    if (cleanSubject.length > 120) {
      return json(
        {
          error: 'Subject must be 120 characters or fewer.',
        },
        400
      );
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
      return json(
        {
          error: 'Message must be between 10 and 3,000 characters.',
        },
        400
      );
    }

    // Escape everything before placing user-controlled values into HTML.
    const htmlName = escapeHtml(cleanName);
    const htmlEmail = escapeHtml(cleanEmail);
    const htmlService = escapeHtml(cleanService);
    const htmlBudget = escapeHtml(cleanBudget);
    const htmlSubject = escapeHtml(cleanSubject);
    const htmlMessage = escapeHtml(cleanMessage).replace(
      /\n/g,
      '<br />'
    );

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['cianojameselliot@gmail.com'],
      replyTo: cleanEmail,
      subject:
        cleanSubject ||
        `New Portfolio Inquiry from ${cleanName}`,

      html: `
        <h2>New Project Inquiry</h2>

        <p>
          <strong>Name:</strong>
          ${htmlName}
        </p>

        <p>
          <strong>Email:</strong>
          ${htmlEmail}
        </p>

        <p>
          <strong>Service:</strong>
          ${htmlService || 'Not specified'}
        </p>

        <p>
          <strong>Budget:</strong>
          ${htmlBudget || 'Not specified'}
        </p>

        <p>
          <strong>Subject:</strong>
          ${htmlSubject || 'No subject'}
        </p>

        <h3>Project Details</h3>

        <p>
          ${htmlMessage}
        </p>

        <hr />

        <p>
          <small>
            Submitted from your portfolio contact form.
          </small>
        </p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);

      return json(
        {
          error: 'Failed to send email.',
        },
        500
      );
    }

    return json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);

    return json(
      {
        error: 'Something went wrong while sending your message.',
      },
      500
    );
  }
}