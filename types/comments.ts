export interface Comment {
  id: string;
  post_slug: string;
  author_name: string;
  author_email: string;
  author_avatar?: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_approved: boolean;
  is_deleted: boolean;
  reply_to?: string;
  likes_count: number;
  system_type: 'giscus' | 'custom';
}

export interface CommentFormData {
  author_name: string;
  author_email: string;
  content: string;
  reply_to?: string;
}

export interface CommentStats {
  giscus_count: number;
  custom_count: number;
  total_count: number;
  last_activity?: string;
}

export interface CommentSystemConfig {
  enableGiscus: boolean;
  enableCustom: boolean;
  requireApproval: boolean;
  allowAnonymous: boolean;
  enableRealtime: boolean;
}

export type CommentSystemType = 'giscus' | 'custom' | 'both';

export interface CommentFilter {
  post_slug: string;
  system_type?: CommentSystemType;
  is_approved?: boolean;
  limit?: number;
  offset?: number;
} 