export interface Portfolio {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface TechStack {
  name: string;
  icon?: string;
  category: "frontend" | "backend" | "tool" | "other";
}
