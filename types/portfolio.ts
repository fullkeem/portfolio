export interface Portfolio {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  projectType?: 'website' | 'landing' | 'webapp' | 'mobile' | 'other';
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface TechStack {
  name: string;
  icon?: string;
  category: "frontend" | "backend" | "tool" | "other";
}
