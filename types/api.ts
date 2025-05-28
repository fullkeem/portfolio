export interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export interface ContactMethod {
  type: 'email' | 'kakao' | 'github' | 'linkedin';
  label: string;
  href: string;
  icon?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
