export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'BI Dashboard' | 'Web Apps' | 'Data Pipelines' | 'AI Automation';
  image: string;
  description: string;
  fullDescription: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: string;
  year: string;
  highlights: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  code: string;
  date: string;
  credentialUrl: string;
  badgeUrl: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Tech' | 'Design' | 'Soft';
  color: string;
  iconName: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export type TabType = 'projects' | 'about' | 'certificates' | 'lab' | 'contact';
