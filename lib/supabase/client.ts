import { createClient } from '@supabase/supabase-js';
import { Comment } from '@/types';

// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase 환경변수가 설정되지 않았습니다.');
}

// 클라이언트 생성 (환경변수가 없어도 에러가 발생하지 않도록)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 데이터베이스 타입 정의
export interface Database {
  public: {
    Tables: {
      comments: {
        Row: Comment;
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Comment, 'id' | 'created_at'>>;
      };
    };
  };
}

// 타입이 적용된 Supabase 클라이언트
export const typedSupabase = supabase;

// Supabase 연결 상태 확인
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabase);
}; 