import React, { useState } from 'react';
import { X, Download, Printer, CheckCircle2, Award, Briefcase, GraduationCap, Phone, Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, EXPERIENCES_DATA, SKILLS_DATA, CERTIFICATES_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    try {
      setIsGeneratingPdf(true);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      // ============================================================
      // PAGE / DESIGN CONSTANTS
      // ============================================================

      const pageWidth = 210;
      const pageHeight = 297;

      const margin = 9;
      const contentWidth = pageWidth - margin * 2;

      const colors = {
        ink: [20, 25, 32] as const,
        dark: [38, 45, 55] as const,
        text: [70, 78, 88] as const,
        muted: [115, 123, 133] as const,
        line: [218, 222, 227] as const,

        // Modern green accent
        accent: [49, 122, 83] as const,
        accentDark: [34, 91, 62] as const,
        accentLight: [232, 243, 236] as const,

        // Very light panel
        panel: [247, 249, 248] as const,
        white: [255, 255, 255] as const,

        // Soft depth/shadow
        shadow: [225, 228, 231] as const
      };

      // Header
      const headerHeight = 31;

      // Main columns
      const columnGap = 6;
      const leftWidth = 57;
      const rightWidth =
        contentWidth - leftWidth - columnGap;

      const leftX = margin;
      const rightX = leftX + leftWidth + columnGap;

      // ------------------------------------------------------------
      // HELPERS
      // ------------------------------------------------------------

      const setFont = (
        style: 'normal' | 'bold' | 'italic',
        size: number,
        color: readonly [number, number, number] = colors.text
      ) => {
        doc.setFont('helvetica', style);
        doc.setFontSize(size);
        doc.setTextColor(...color);
      };

      // Custom Justified Text Renderer for wide columns (Right section)
      const drawJustifiedText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        fontSize: number,
        style: 'normal' | 'bold' | 'italic' = 'normal',
        color: readonly [number, number, number] = colors.text
      ) => {
        setFont(style, fontSize, color);
        const lines = doc.splitTextToSize(text, maxWidth);
        
        let currentY = y;
        const lineHeight = fontSize * 0.42;

        lines.forEach((line: string, index: number) => {
          const isLastLine = index === lines.length - 1;
          if (isLastLine || lines.length === 1) {
            doc.text(line, x, currentY);
          } else {
            const words = line.trim().split(/\s+/);
            if (words.length > 1) {
              const totalWordsWidth = words.reduce((acc, word) => acc + doc.getTextWidth(word), 0);
              const remainingSpace = maxWidth - totalWordsWidth;
              const wordSpacing = remainingSpace / (words.length - 1);

              let currentX = x;
              words.forEach((word) => {
                doc.text(word, currentX, currentY);
                currentX += doc.getTextWidth(word) + wordSpacing;
              });
            } else {
              doc.text(line, x, currentY);
            }
          }
          currentY += lineHeight;
        });

        return lines.length * lineHeight;
      };

      const drawPanel = (
        x: number,
        y: number,
        width: number,
        height: number
      ) => {
        // Tiny shadow layer
        doc.setFillColor(...colors.shadow);
        doc.roundedRect(
          x + 0.8,
          y + 0.8,
          width,
          height,
          2,
          2,
          'F'
        );

        // Actual panel
        doc.setFillColor(...colors.white);
        doc.roundedRect(
          x,
          y,
          width,
          height,
          2,
          2,
          'F'
        );

        doc.setDrawColor(...colors.line);
        doc.setLineWidth(0.25);
        doc.roundedRect(
          x,
          y,
          width,
          height,
          2,
          2,
          'S'
        );
      };

      const sectionHeader = (
        title: string,
        x: number,
        y: number,
        width: number
      ) => {
        setFont('bold', 8.5, colors.ink);

        doc.text(title.toUpperCase(), x, y);

        const titleWidth = doc.getTextWidth(
          title.toUpperCase()
        );

        // Accent underline
        doc.setDrawColor(...colors.accent);
        doc.setLineWidth(1.1);

        const accentLineWidth = Math.min(titleWidth + 4, width);
        doc.line(
          x,
          y + 2,
          x + accentLineWidth,
          y + 2
        );

        // Fine continuation line connected perfectly at the same Y level
        doc.setDrawColor(...colors.line);
        doc.setLineWidth(0.3);

        if (x + accentLineWidth < x + width) {
          doc.line(
            x + accentLineWidth,
            y + 2,
            x + width,
            y + 2
          );
        }
      };

      const bullet = (
        text: string,
        x: number,
        y: number,
        width: number,
        fontSize = 7.4
      ) => {
        const bulletX = x;
        const textX = x + 3;

        doc.setFillColor(...colors.accent);
        doc.circle(
          bulletX + 0.8,
          y - 1.0,
          0.55,
          'F'
        );

        const textHeight = drawJustifiedText(
          text,
          textX,
          y,
          width - 3,
          fontSize,
          'normal',
          colors.text
        );

        return textHeight + 0.5;
      };

      // ------------------------------------------------------------
      // PAGE BACKGROUND
      // ------------------------------------------------------------

      doc.setFillColor(...colors.white);
      doc.rect(
        0,
        0,
        pageWidth,
        pageHeight,
        'F'
      );

      // ------------------------------------------------------------
      // HEADER
      // ------------------------------------------------------------

      // Shadow
      doc.setFillColor(...colors.shadow);
      doc.roundedRect(
        margin + 1,
        margin + 1,
        contentWidth,
        headerHeight,
        3,
        3,
        'F'
      );

      // Header panel
      doc.setFillColor(...colors.ink);
      doc.roundedRect(
        margin,
        margin,
        contentWidth,
        headerHeight,
        3,
        3,
        'F'
      );

      // Accent vertical bar
      doc.setFillColor(...colors.accent);
      doc.roundedRect(
        margin,
        margin,
        3,
        headerHeight,
        2,
        2,
        'F'
      );

      // Name
      setFont(
        'bold',
        20,
        colors.white
      );

      doc.text(
        PERSONAL_INFO.name.toUpperCase(),
        margin + 8,
        margin + 10
      );

      // Role
      setFont(
        'normal',
        9.5,
        [195, 211, 201]
      );

      doc.text(
        PERSONAL_INFO.role.toUpperCase(),
        margin + 8,
        margin + 17
      );

      // Experience badge
      const experienceText =
        '6+ YEARS PROFESSIONAL EXPERIENCE';

      const badgeWidth =
        doc.getTextWidth(experienceText) + 7;

      const badgeX =
        margin + contentWidth - badgeWidth - 6;

      doc.setFillColor(...colors.accentDark);

      doc.roundedRect(
        badgeX,
        margin + 7,
        badgeWidth,
        8,
        2,
        2,
        'F'
      );

      setFont(
        'bold',
        7,
        colors.white
      );

      doc.text(
        experienceText,
        badgeX + 3.5,
        margin + 12.1
      );

      // ------------------------------------------------------------
      // CONTACT STRIP
      // ------------------------------------------------------------

      let y = margin + headerHeight + 4;

      setFont(
        'normal',
        8.2,
        colors.muted
      );

      const contactText =
        `${PERSONAL_INFO.address}  •  ${PERSONAL_INFO.phone}  •  ${PERSONAL_INFO.email}  •  ${PERSONAL_INFO.portfolioUrl}` ;

      const contactLines = doc.splitTextToSize(
        contactText,
        contentWidth
      );

      doc.text(
        contactLines,
        margin,
        y
      );

      y += 6;

      // ------------------------------------------------------------
      // MAIN COLUMN TOP
      // ------------------------------------------------------------

      const mainTop = y;

      // ============================================================
      // LEFT PANEL (Left-aligned for clean, consistent word spacing)
      // ============================================================

      const leftPanelY = mainTop;
      const leftPanelHeight =
        pageHeight - mainTop - margin;

      drawPanel(
        leftX,
        leftPanelY,
        leftWidth,
        leftPanelHeight
      );

      let leftY = leftPanelY + 5.5;
      const leftPadding = 5;
      const innerLeftX = leftX + leftPadding;
      const innerLeftWidth = leftWidth - leftPadding * 2;

      // ------------------------------------------------------------
      // PROFESSIONAL PROFILE
      // ------------------------------------------------------------

      sectionHeader(
        'Professional Profile',
        innerLeftX,
        leftY,
        innerLeftWidth
      );

      leftY += 5;

      const profileHeight = drawJustifiedText(
        PERSONAL_INFO.tagline,
        innerLeftX,
        leftY,
        innerLeftWidth,
        7.8,
        'normal',
        colors.text
      );

      leftY += profileHeight + 3.5;

      // ------------------------------------------------------------
      // TECHNICAL EXPERTISE
      // ------------------------------------------------------------

      sectionHeader(
        'Technical Expertise',
        innerLeftX,
        leftY,
        innerLeftWidth
      );

      leftY += 5;

      const skillGroups = [
        {
          title: 'Programming & Scripting',
          content:
            'Python, SQL, JavaScript/React, Shell Scripting'
        },
        {
          title: 'AI & Orchestration',
          content:
            'Agentic AI Workflows, LLM Orchestration (Llama 3, Gemini, Claude), RAG, Prompt Engineering, Tool Calling'
        },
        {
          title: 'Automation',
          content:
            'n8n (Advanced Logic/Code Nodes), n8n Worker/Dispatcher patterns'
        },
        {
          title: 'Data Engineering',
          content:
            'Pipeline Automation, ETL/ELT Processes, API Integration (JSON handling), Data Preprocessing'
        },
        {
          title: 'Systems & Cloud',
          content:
            'Azure (Data Factory, Databricks, Data Lake, SQL), Google BigQuery, NextBank CBS, Cloud Run, Looker Studio, Supabase'
        },
        {
          title: 'Analytics & Operations',
          content:
            'Root-cause analysis, Dashboard Automation, Incident Management, Monitoring, Performance Testing'
        }
      ];

      skillGroups.forEach((skill) => {
        setFont(
          'bold',
          7.6,
          colors.ink
        );

        doc.text(
          skill.title,
          innerLeftX,
          leftY
        );

        leftY += 2.8;

        setFont('normal', 7.2, colors.text);
        const lines = doc.splitTextToSize(skill.content, innerLeftWidth);
        doc.text(lines, innerLeftX, leftY);

        leftY += lines.length * 3.0 + 2.2;
      });

      // ------------------------------------------------------------
      // EDUCATION
      // ------------------------------------------------------------

      sectionHeader(
        'Education',
        innerLeftX,
        leftY,
        innerLeftWidth
      );

      leftY += 5;

      setFont(
        'bold',
        7.6,
        colors.ink
      );

      const degreeLines =
        doc.splitTextToSize(
          PERSONAL_INFO.education.degree,
          innerLeftWidth
        );

      doc.text(
        degreeLines,
        innerLeftX,
        leftY
      );

      leftY +=
        degreeLines.length * 3.0 + 1.8;

      setFont(
        'normal',
        7.2,
        colors.text
      );

      const educationLines =
        doc.splitTextToSize(
          `${PERSONAL_INFO.education.school} • ${PERSONAL_INFO.education.location}`,
          innerLeftWidth
        );

      doc.text(
        educationLines,
        innerLeftX,
        leftY
      );

      leftY +=
        educationLines.length * 3.0 + 1.8;

      setFont(
        'normal',
        7.0,
        colors.muted
      );

      doc.text(
        `Graduated: ${PERSONAL_INFO.education.year}`,
        innerLeftX,
        leftY
      );

      leftY += 4.5;

      // ------------------------------------------------------------
      // LANGUAGES
      // ------------------------------------------------------------

      sectionHeader(
        'Languages',
        innerLeftX,
        leftY,
        innerLeftWidth
      );

      leftY += 5;

      setFont(
        'normal',
        7.4,
        colors.text
      );

      doc.text(
        PERSONAL_INFO.languages.join('  •  '),
        innerLeftX,
        leftY
      );

      // ============================================================
      // RIGHT PANEL (Justified paragraphs/bullets for a polished look)
      // ============================================================

      const rightPanelY = mainTop;
      const rightPanelHeight =
        pageHeight - mainTop - margin;

      drawPanel(
        rightX,
        rightPanelY,
        rightWidth,
        rightPanelHeight
      );

      let rightY = rightPanelY + 5.5;
      const rightPadding = 5;
      const innerRightX = rightX + rightPadding;
      const innerRightWidth = rightWidth - rightPadding * 2;

      // ------------------------------------------------------------
      // PROFESSIONAL EXPERIENCE
      // ------------------------------------------------------------

      sectionHeader(
        'Professional Experience',
        innerRightX,
        rightY,
        innerRightWidth
      );

      rightY += 8.5;

      EXPERIENCES_DATA.forEach((exp, index) => {
        // Company / role
        rightY += 1.5;
        
        setFont(
          'bold',
          8.2,
          colors.ink
        );

        const companyRole =
          `${exp.role} — ${exp.company}`;

        const roleLines =
          doc.splitTextToSize(
            companyRole,
            innerRightWidth - 30
          );

        doc.text(
          roleLines,
          innerRightX,
          rightY
        );

        // Period
        setFont(
          'bold',
          7.4,
          colors.accentDark
        );

        const periodWidth =
          doc.getTextWidth(exp.period);

        doc.text(
          exp.period,
          innerRightX +
            innerRightWidth -
            periodWidth,
          rightY
        );

        rightY +=
          roleLines.length * 3.4 + 1.8;

        // Description (Justified)
        const descHeight = drawJustifiedText(
          exp.description,
          innerRightX,
          rightY,
          innerRightWidth,
          7.4,
          'normal',
          colors.text
        );

        rightY += descHeight + 1.5;

        // Achievements (Justified)
        exp.achievements.forEach(
          (achievement) => {
            rightY += bullet(
              achievement,
              innerRightX,
              rightY,
              innerRightWidth,
              7.2
            );
          }
        );

        // Divider between jobs
        if (
          index <
          EXPERIENCES_DATA.length - 1
        ) {
          rightY += 2.0;

          doc.setDrawColor(...colors.line);
          doc.setLineWidth(0.25);

          doc.line(
            innerRightX,
            rightY,
            innerRightX + innerRightWidth,
            rightY
          );

          rightY += 3.5;
        }
      });

      // ------------------------------------------------------------
      // CERTIFICATIONS
      // ------------------------------------------------------------

      rightY += 1.5;

      sectionHeader(
        'Certifications & Compliance',
        innerRightX,
        rightY,
        innerRightWidth
      );

      rightY += 6.5;

      CERTIFICATES_DATA.forEach((cert) => {
        // Certification title
        setFont(
          'bold',
          7.4,
          colors.ink
        );

        const certTitle =
          `${cert.title} [${cert.code}]`;

        const certLines =
          doc.splitTextToSize(
            certTitle,
            innerRightWidth - 3
          );

        doc.text(
          certLines,
          innerRightX + 2.5,
          rightY
        );

        // Accent dot
        doc.setFillColor(...colors.accent);
        doc.circle(
          innerRightX + 0.8,
          rightY - 1.1,
          0.5,
          'F'
        );

        rightY +=
          certLines.length * 3.1 + 0.8;

        setFont(
          'normal',
          7.0,
          colors.muted
        );

        doc.text(
          `${cert.issuer} (${cert.date})`,
          innerRightX + 2.5,
          rightY
        );

        rightY += 3.5;
      });

      // ------------------------------------------------------------
      // BOTTOM MICRO FOOTER
      // ------------------------------------------------------------

      setFont(
        'normal',
        6.5,
        colors.muted
      );

      const footerText =
        `${PERSONAL_INFO.name}  •  ${PERSONAL_INFO.email}`;

      const footerWidth =
        doc.getTextWidth(footerText);

      doc.text(
        footerText,
        pageWidth - margin - footerWidth,
        pageHeight - 5
      );

      // ------------------------------------------------------------
      // SAVE
      // ------------------------------------------------------------

      doc.save(
        'James_Elliot_Ciano_Curriculum_Vitae.pdf'
      );

    } catch (err) {
      console.error(
        'PDF export error:',
        err
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="resume-view-modal"
        className="glass-subcard max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-white max-h-[92vh] flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Quick Actions */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/90 no-print">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-800">
              Curriculum Vitae • {PERSONAL_INFO.name}
            </h3>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              6+ Years Exp
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer active:scale-98"
              title="Download official PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs transition-colors cursor-pointer flex items-center gap-1"
              title="Print Curriculum Vitae"
            >
              <Printer className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content / Printable Area */}
        <div id="printable-cv-area" className="overflow-y-auto custom-scrollbar p-6 sm:p-8 space-y-6 text-slate-800 font-['Poppins'] bg-white">
          {/* Top Identity Header */}
          <div className="border-b border-slate-200 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm sm:text-base font-bold text-blue-700 mt-0.5">
                  {PERSONAL_INFO.role}
                </p>
              </div>
              <div className="text-xs text-slate-500 sm:text-right font-medium">
                <span className="inline-block bg-blue-50 text-blue-800 font-bold px-2.5 py-1 rounded-md border border-blue-100">
                  Total Experience: 6 Years
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{PERSONAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Languages: {PERSONAL_INFO.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Professional Profile Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Professional Profile Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Core Technical Proficiencies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              Core Competencies & Tools
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Programming & AI</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  Python, SQL, JavaScript/React, Shell Scripting, AI Workflows, LLM Orchestration (Llama 3, Gemini, Claude), RAG, Prompt Engineering, Tool Calling.
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Automation & Integration</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  n8n (Advanced Logic/Code Nodes), Worker/Dispatcher patterns, REST API Integrations, JSON data handling & stream preprocessing.
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Data Engineering & Analytics</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  Pipeline Automation, ETL/ELT Processes, NextBank Core Banking System (CBS), Google BigQuery, Cloud Run, Looker Studio dashboards.
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 mb-1">Cloud Platforms & Diagnostics</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  Azure Data Factory, Databricks, Azure Data Lake, Azure SQL, Apache Airflow, Incident Management, Root-cause analysis.
                </div>
              </div>
            </div>
          </div>

          {/* Professional Work History */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              Professional Employment History
            </h4>
            <div className="space-y-4">
              {EXPERIENCES_DATA.map((exp, i) => (
                <div key={i} className="text-xs border-l-2 border-blue-500 pl-3.5 py-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline font-bold text-slate-900 text-sm">
                    <span>{exp.role}</span>
                    <span className="text-xs font-semibold text-blue-700">{exp.period}</span>
                  </div>
                  <div className="text-blue-700 font-semibold mb-1">{exp.company}</div>
                  <p className="text-slate-700 mb-2 leading-relaxed">{exp.description}</p>
                  <div className="space-y-1">
                    {exp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Certifications & Compliance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATES_DATA.map((c) => (
                <div key={c.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-md bg-white p-0.5 shadow-2xs shrink-0 flex items-center justify-center">
                    <img src={c.badgeUrl} alt={c.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{c.title}</div>
                    <div className="text-slate-500 text-[11px] font-medium">{c.issuer} • Code: {c.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Background */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              Education & Background
            </h4>
            <div className="text-xs p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">
                {PERSONAL_INFO.education.degree}
              </div>
              <div className="text-slate-600 mt-0.5">
                {PERSONAL_INFO.education.school} • {PERSONAL_INFO.education.location}
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Completed: {PERSONAL_INFO.education.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
