import { Project, Certificate, Skill, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'James Elliot A. Ciano',
  displayName: 'James Elliot',
  handle: 'JamesElliotCiano',
  role: 'Data & AI Automation Specialist',
  tagline: 'Data and AI Automation Specialist with over 6 years of experience in computer engineering, specializing in data analytics, data engineering, and API integration. Proven track record in establishing centralized data systems, automating reporting pipelines, and performing complex root-cause analysis to improve data integrity.',
  location: 'Davao City, Philippines',
  address: 'Purok - 27 Happy Times, Matina Aplaya, Davao City',
  email: 'cianojameselliot@gmail.com',
  phone: '+63 960 246 3522',
  availability: 'Available for Projects & Full-Time',
  yearsOfExperience: '6+ Years',
  education: {
    degree: 'Bachelor of Science in Computer Engineering',
    school: 'AMA Computer College (Davao)',
    location: 'Davao City, Philippines',
    year: 'April 2018'
  },
  languages: ['English', 'Tagalog', 'Cebuano'],
  stats: {
    projectsCompleted: '5+',
    yearsExperience: '6+',
    clientSatisfaction: '100%',
    technologiesMastered: '18+'
  },
  socials: {
    github: 'https://github.com/O-Ely-O',
    linkedin: 'https://linkedin.com/in/james-elliot-ciano-4b2628187',
    dribbble: 'https://dribbble.com',
    twitter: 'https://twitter.com'
  }
};

export const SKILLS_DATA: Skill[] = [
  {
    name: 'SQL & Relational DB',
    level: 90,
    category: 'Tech',
    color: '#4169E1',
    iconName: 'postgresql'
  },
  {
    name: 'ETL/ELT & Data Analytics',
    level: 90,
    category: 'Tech',
    color: '#669DF6',
    iconName: 'googlebigquery'
  },
  {
    name: 'n8n Automation',
    level: 100,
    category: 'Tech',
    color: '#EA4B71',
    iconName: 'n8n'
  },
  {
    name: 'Agentic AI & LLM Orchestration',
    level: 80,
    category: 'Tech',
    color: '#000000',
    iconName: 'ollama'
  },
  {
    name: 'Python',
    level: 90,
    category: 'Tech',
    color: '#3776AB',
    iconName: 'python'
  },
  {
    name: 'API Integration',
    level: 100,
    category: 'Tech',
    color: '#009688',
    iconName: 'fastapi'
  },
  {
    name: 'Azure Data Stack (ADF, Databricks)',
    level: 90,
    category: 'Tech',
    color: '#0078D4',
    iconName: 'databricks'
  },
  {
    name: 'Dashboard & Reporting Automation',
    level: 91,
    category: 'Tech',
    color: '#F59E0B',
    iconName: 'bar-chart'
  },
  {
    name: 'Root-Cause Analysis & QA',
    level: 93,
    category: 'Tech',
    color: '#6366F1',
    iconName: 'message-square'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'agentic-ai-orchestration',
    title: 'Autonomous Sales Pipeline & Secure Lead Engine',
    subtitle: 'A Local AI workflow that manages leads, follow-ups, meetings, and post-call work automatically',
    category: 'AI Automation',
    
    image: 'https://images.pexels.com/photos/7109292/pexels-photo-7109292.jpeg?auto=format&fit=crop&w=1000&q=80', 
    description: 'AI-powered sales automation that manages leads, outreach, bookings, meetings, proposals, and CRM updates end to end.',
    fullDescription: "An automated sales workflow that takes leads from first contact to post-call follow-up. It handles lead verification, personalized AI outreach, bookings, meeting summaries, proposals, CRM updates, and archiving—reducing repetitive work while keeping customer data under control.",
    tags: ['n8n', 'Python', 'Local AI (Llama3)', 'Calendly', 'Slack', 'Notion CRM', 'Tally Forms', 'Google Workspace'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    stats: 'End-to-End Sales Call Automation',
    year: '2025',
    highlights: [
      'Automatically captures, verifies, and organizes new leads before they enter the sales workflow',
      'Uses local AI to understand lead information and create personalized sales follow-ups',
      'Connects bookings, email activity, and meeting recordings to the correct customer automatically',
      'Turns approved meeting recordings into transcripts, summaries, and sales proposals',
      'Links completed proposals back to the CRM, archives recordings, and sends team notifications automatically',
      'Built with security checks that reject unknown leads, invalid files, and unexpected requests before they reach the workflow'
    ]
  },
  {
    id: '3d-ecom-crm-executive-dashboard',
    title: 'One Dashboard, Two Platforms, Zero Guesswork',
    subtitle: 'A 4-page Looker Studio suite connecting Shopify sales to GoHighLevel CRM leads',
    category: 'BI Dashboard',
    image: 'https://images.unsplash.com/photo-1686061594225-3e92c0cd51b0?auto=format&fit=crop&w=1000&q=80',
    description: 'Unifies Shopify Sales and GoHighLevel CRM data to track campaigns, customers, and revenue in one dashboard.',
    fullDescription: `Shopify has the sales data. GoHighLevel has the marketing data. This dashboard brings both together, matching customers across platforms so you can see which campaigns actually lead to purchases.

The biggest challenge was keeping the numbers accurate. Blending order and product data can quietly double-count revenue, so I kept those layers separate by design.

The result is a clean 4-page view of sales, campaign attribution, customer lifetime value, and finance reconciliation — with numbers you can actually trust.`,
    tags: [
      'Looker Studio',
      'Shopify Data',
      'Custom SQL',
      'Data Modeling',
      'GoHighLevel CRM',
      'Dashboard Design'
    ],
    liveUrl: 'https://datastudio.google.com/reporting/247bac4b-a432-4470-8902-f3d331b34c2b',
    githubUrl: 'https://github.com',
    stats: 'Zero Double-Counted Revenue',
    year: '2026',
    highlights: [
      'Four pages, four questions: how are sales doing, which campaigns turn leads into buyers, what is a customer worth over time, and does the money add up',
      'Kept order totals and line-item data on separate pages by design — the fix for the double-counting bug that quietly inflates most blended dashboards',
      'Wrote custom SQL-backed calculated fields to match the same shopper across Shopify and GoHighLevel, unlocking LTV and repeat-purchase numbers neither platform shows on its own'
    ]
  },
  {
    id: 'operational-performance-index',
    title: 'Operational Performance Index',
    subtitle: 'Automated weekly operations reporting, vendor health tracking, and maintenance visibility',
    category: 'BI Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',

    description: 'Automates weekly operations reporting to track KPIs, vendor health, rent collection, issues, and maintenance in one dashboard.',

    fullDescription: 'Built an end-to-end operations reporting workflow that collects weekly manager data, validates and structures it automatically, and delivers the results through a centralized Looker Studio dashboard. The system tracks operational KPIs, vendor health, rent collection, issues, and maintenance while keeping the underlying reporting sheets organized and monitored.',

    tags: [
      'n8n',
      'Looker Studio',
      'Google Sheets',
      'Google Apps Script',
      'Slack',
      'JavaScript'
    ],

    liveUrl: 'https://datastudio.google.com/reporting/28c83e65-1eca-478c-8346-440883175233/page/MwQrF',
    githubUrl: 'https://github.com',
    stats: 'End-to-End Operations Reporting',
    year: '2026',

    highlights: [
      'Automates weekly manager submissions into structured operational data',
      'Tracks outreach, applications, compliance, rent collection, social activity, and issues',
      'Provides a Weekly Pulse view of current operational performance',
      'Provides quarterly Vendor Health and Maintenance reporting',
      'Validates inputs, maintains reporting sheets, archives files, and alerts on failures'
    ]
  },
  {
    id: 'azure-pipeline-observability',
    title: 'Enterprise Azure ETL & Incident Observatory',
    subtitle: 'Telemetry, Apache Airflow monitoring & root-cause diagnostic suite',
    category: 'Data Pipelines',
    image: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?auto=format&fit=crop&w=1000&q=80',
    description: 'Monitors Azure Data Factory, Databricks, and Airflow pipelines to detect data anomalies, incidents, and reliability issues early.',
    fullDescription: 'Managed end-to-end data engineering incidents for global enterprise clients at DXC Technology. Created automated Shell and Airflow monitoring scripts that proactively identified data anomalies before downstream impact.',
    tags: ['Azure Data Factory', 'Databricks', 'SQL', 'Apache Airflow', 'Shell Scripting'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    stats: '99.9% Data Flow Reliability',
    year: '2023',
    highlights: [
      'Resolved high-priority pipeline incidents across multi-terabyte data lakes',
      'Streamlined anomaly detection using automated root-cause diagnostic queries',
      'Standardized monitoring runbooks across global technology consulting squads'
    ]
  },
  {
    id: 'voice-ai-crm-orchestrations',
    title: 'AI Voice Agent Lead Recovery & CRM Automation',
    subtitle: 'Automated n8n pipeline linking AI phone calls to Supabase, Gmail, and Telegram',
    category: 'AI Automation',
    image: 'https://images.unsplash.com/photo-1737644467636-6b0053476bb2?auto=format&fit=crop&w=1000&q=80',
    description: 'Turns AI voice call outcomes into immediate CRM updates, booking notifications, and automated follow-ups for unanswered leads.',
    fullDescription: 'When an AI voice agent finishes a call, this workflow turns the result into the next business action automatically. Booked appointments are logged and pushed to the right channels, while unanswered calls are scheduled for follow-up instead of being forgotten.',
    tags: [
      'n8n',
      'Supabase',
      'Retell AI',
      'Telegram API',
      'Gmail API',
      'Google Sheets',
      'Webhooks'
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    stats: 'Automated Lead Recovery',
    year: '2026',
    highlights: [
      'Processes AI call outcomes and separates booked calls from unanswered leads',
      'Logs call data and transcripts into Supabase for centralized CRM records',
      'Sends booking confirmations and team notifications across Gmail, Sheets, and Telegram',
      'Automatically schedules follow-ups for unanswered calls 48 hours later',
      'Uses parameterized database queries and failure alerts to keep the workflow reliable'
    ]
  },
  {
  id: 'master-data-management-clay-pipeline',
  title: 'Automated Lead Cleaning & Clay Enrichment Pipeline',
  subtitle: 'Merges multi-channel leads, eliminates duplicates, and cuts wasted enrichment spend',
  category: 'AI Automation',
  image: 'https://images.unsplash.com/photo-1705484229341-4f7f7519b718?auto=format&fit=crop&w=1000&q=80', 
  description: 'Unifies multi-source leads into clean profiles, stops duplicate outreach, and gatekeeps paid enrichment tools like Clay.',
  fullDescription: `Leads from Facebook ads, web forms, and manual sheets are usually chaotic. Duplicates waste rep time, conflicting data causes confusion, and pushing dirty leads into Clay burns API credits fast.

This n8n pipeline fixes the mess before it costs you money. It pulls raw lead entries, standardizes contact info, and merges duplicate profiles into a single source of truth. 

Valid leads pass directly to Clay for enrichment, while incomplete entries move to a quarantine sheet with instant Slack alerts so your team can fix them.`,
  tags: [
    'n8n',
    'Clay',
    'JavaScript',
    'Google Sheets',
    'Slack',
    'Data Cleaning'
  ],
  liveUrl: 'https://github.com',
  githubUrl: 'https://github.com',
  stats: '100% Valid Leads Sent to Clay',
  year: '2026',
  highlights: [
    'Cross-references phone, email, and address data to merge duplicate leads into one complete record',
    'Prioritizes trusted sources so accurate data automatically overwrites lower-quality inputs',
    'Gatekeeps Clay API calls to ensure you only pay to enrich clean, actionable leads',
    'Flags missing data into a quarantine tab with instant Slack alerts so no lead gets lost'
  ]
}
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 'ai-900',
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    code: 'AI-900',
    date: 'Certified',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JamesElliotCiano-0479/735F0EB3D9D737D?sharingId=FAB2A7E1A561CB7E',
    badgeUrl: '/badges/ai900.svg',
    description: 'Foundational mastery of Artificial Intelligence, Computer Vision, Natural Language Processing, and Generative AI workloads on Microsoft Azure.'
  },
  {
    id: 'az-900',
    title: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    code: 'AZ-900',
    date: 'Certified',
    credentialUrl: 'https://learn.microsoft.com/credentials',
    badgeUrl: '/badges/az900.svg',
    description: 'Validation of foundational cloud knowledge, Azure core architecture, management services, security governance, and cloud cost management.'
  },
  {
    id: 'dp-203',
    title: 'Microsoft Certified: Azure Data Engineer Associate',
    issuer: 'Microsoft',
    code: 'DP-203',
    date: 'Certified',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JamesElliotCiano-0479/E31E310FA8EBD0A1?sharingId=FAB2A7E1A561CB7E',
    badgeUrl: '/badges/dp203.svg',
    description: 'Advanced data engineering, data storage architecture, big data processing with Azure Synapse, Databricks, and Azure Data Factory pipelines.'
  },
  {
    id: 'dp-900',
    title: 'Microsoft Certified: Azure Data Fundamentals',
    issuer: 'Microsoft',
    code: 'DP-900',
    date: 'Certified',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-us/JamesElliotCiano-0479/191AD75A64D24128?sharingId=FAB2A7E1A561CB7E',
    badgeUrl: '/badges/dp900.svg',
    description: 'Core capabilities in relational and non-relational database concepts, big data analytics workloads, and modern data warehouse systems.'
  },
  {
    id: 'oml-2023',
    title: 'Oracle Machine Learning Using Autonomous Database 2023',
    issuer: 'Oracle',
    code: '1Z0-1096-23',
    date: 'Certified',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=2E15E42B9C6E55FC10C9C34A3AE749D4B6ECC5C802613F1FA12EE7F1712D3B59',
    badgeUrl: '/badges/oracle-ml.svg',
    description: 'Proficiency with Oracle Autonomous Database Machine Learning algorithms, in-database SQL/Python modeling, and automated data mining algorithms.'
  }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    company: '3 TONE ENTERPRISE LLC',
    role: 'Freelance AI & Automation Engineer',
    period: 'Dec - Feb',
    description: 'Helped startups automate their operations by building backend infrastructure, including Agentic AI and automation workflows that handle their data and sales pipelines—eliminating manual entry.',
    achievements: [
      'Architected end-to-end agentic AI pipelines with n8n worker/dispatcher patterns',
      'Eliminated manual lead entry by integrating Supabase, Slack, Stripe, and CRM platforms',
      'Engineered automated RAG workflows with modern LLMs for real-time lead qualification'
    ],
    tags: ['Agentic AI', 'n8n', 'Python', 'Supabase', 'API Integrations', 'Stripe']
  },
  {
    company: 'Agronomika Finance Corporation',
    role: 'Lead Data Analyst',
    period: 'March 2025 – July 2025',
    description: 'Established and maintained a centralized data system enabling leadership to access and leverage strategic insights. Partnered with IT and Core Banking (CBS) Teams to streamline data processing and improve system integration.',
    achievements: [
      'Established and maintained a centralized data warehouse feeding executive decision pipelines',
      'Partnered with Core Banking (CBS) and IT teams to streamline NextBank system data integration',
      'Developed and automated executive KPI dashboards in Looker Studio, training staff for sustained reporting',
      'Analyzed operational data requests and communicated actionable insights to organizational stakeholders'
    ],
    tags: ['NextBank CBS', 'Google BigQuery', 'Cloud Run', 'Looker Studio', 'Data Engineering']
  },
  {
    company: 'DXC Technology',
    role: 'Technology Consultant (Data Analytics)',
    period: 'June 2022 – October 2023',
    description: 'Managed data engineering incidents, resolving system errors and pipeline failures to restore reliable data flows. Performed root-cause analysis on data quality issues, validating multi-source datasets to identify anomalies.',
    achievements: [
      'Managed data engineering incidents, resolving system errors and pipeline failures to restore reliable data flows',
      'Performed root-cause analysis on data quality issues, validating multi-source datasets to identify anomalies',
      'Monitored and optimized data pipelines using Apache Airflow and Shell Scripting, automating incident detection',
      'Supported data engineering operations by configuring monitoring tools and conducting performance testing',
      'Analyzed data quality issues and implemented improvements to strengthen downstream analytics'
    ],
    tags: ['Azure Data Factory', 'Databricks', 'Apache Airflow', 'Azure SQL', 'Incident Management']
  },
  {
    company: 'Glodal Inc.',
    role: 'Freelance Project Assistant (Deep Learning & APIs)',
    period: 'January 2019 – March 2022',
    description: 'Assisted in the development and optimization of deep learning models by integrating with external APIs for data ingestion. Processed JSON-formatted datasets and prepared inputs for training and inference pipelines.',
    achievements: [
      'Assisted in development and optimization of deep learning models by integrating with external APIs for data ingestion',
      'Processed JSON-formatted datasets and prepared inputs for training and edge inference pipelines',
      'Supported deployment and testing of optimized models on edge devices, including NVIDIA Jetson platforms',
      'Managed JSON-based data streams and inference via integrated APIs for real-time applications',
      'Analyzed and preprocessed structured and unstructured data from API sources to streamline preprocessing steps'
    ],
    tags: ['NVIDIA Jetson', 'Deep Learning', 'REST APIs', 'JSON Preprocessing', 'Python']
  }
];
