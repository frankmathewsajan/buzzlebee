export interface Project {
  id: string;
  title: string;
  category: string;
  timeline: string;
  role: string;
  description: string;
  achievements?: string;
  tags: string[];
  SHOW_IN_INDEX?: boolean;
  badges?: {
    AWARDED?: string;
    CERTIFIED?: string;
    DEPLOYED?: string;
  };
  skills: {
    [key: string]: string[];
  };
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  has_demo: boolean;
  has_github: boolean;
  has_case_study: boolean;
}

export interface SiteNode {
  name: string;
  path: string;
  icon: string;
  external?: boolean;
  externalUrl?: string;
  children?: SiteNode[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  linkedin?: string;
  instagram?: string;
  discord?: string;
  github?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  readTime: string;
  category: string;
  status: string;
  hidden?: boolean;
  objective: string;
  aim: string;
  summary: string;
  technologies: string[];
  outcomes: string[];
  projectRef: string;
  history?: string;
  liveUrl?: string;
  description?: string;
  image?: string;
}

export type ContactModalVariant = 'contact' | 'social' | 'gmail';

declare global {
  interface Window {
    portfolioScrollTimer?: NodeJS.Timeout;
  }
}

export {};
