import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 2글자 이상 입력해주세요')
    .max(50, '이름은 50글자 이하로 입력해주세요'),

  email: z
    .string()
    .email('올바른 이메일 주소를 입력해주세요')
    .max(100, '이메일은 100글자 이하로 입력해주세요'),

  projectType: z
    .enum(['landing', 'website', 'webapp', 'mobile', 'other'], {
      required_error: '프로젝트 유형을 선택해주세요',
    })
    .optional(),

  budget: z
    .enum(['under-100', '100-300', '300-500', '500-1000', 'over-1000', 'discussion'], {
      required_error: '예산 범위를 선택해주세요',
    })
    .optional(),

  message: z
    .string()
    .min(10, '메시지는 10글자 이상 입력해주세요')
    .max(1000, '메시지는 1000글자 이하로 입력해주세요'),

  timeline: z
    .string()
    .max(100, '희망 일정은 100글자 이하로 입력해주세요')
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectTypeOptions = [
  { value: 'landing', label: '랜딩페이지' },
  { value: 'website', label: '기업/개인 웹사이트' },
  { value: 'webapp', label: '웹 애플리케이션' },
  { value: 'mobile', label: '모바일 앱' },
  { value: 'other', label: '기타' },
] as const;

export const budgetOptions = [
  { value: 'under-100', label: '100만원 이하' },
  { value: '100-300', label: '100-300만원' },
  { value: '300-500', label: '300-500만원' },
  { value: '500-1000', label: '500-1000만원' },
  { value: 'over-1000', label: '1000만원 이상' },
  { value: 'discussion', label: '협의 후 결정' },
] as const; 