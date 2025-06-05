'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

import {
  contactFormSchema,
  type ContactFormData,
  projectTypeOptions,
  budgetOptions,
} from '@/lib/validations/contact';

type SubmissionState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState('loading');

    try {
      // EmailJS 환경변수 확인
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS 환경변수가 설정되지 않았습니다.');
      }

      // EmailJS 템플릿 파라미터 준비
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        project_type: data.projectType
          ? projectTypeOptions.find((opt) => opt.value === data.projectType)?.label
          : '미선택',
        budget: data.budget
          ? budgetOptions.find((opt) => opt.value === data.budget)?.label
          : '미선택',
        timeline: data.timeline || '미입력',
        message: data.message,
        to_name: 'fullkeem', // 수신자 이름
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmissionState('success');
      reset(); // 폼 초기화

      // 3초 후 상태 초기화
      setTimeout(() => {
        setSubmissionState('idle');
      }, 3000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmissionState('error');

      // 5초 후 상태 초기화
      setTimeout(() => {
        setSubmissionState('idle');
      }, 5000);
    }
  };

  const renderSubmissionFeedback = () => {
    switch (submissionState) {
      case 'loading':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>메시지를 전송하고 있습니다...</span>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 rounded-lg bg-green-50 px-4 py-3 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          >
            <CheckCircle className="h-5 w-5" />
            <span>메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.</span>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 rounded-lg bg-red-50 px-4 py-3 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          >
            <AlertCircle className="h-5 w-5" />
            <span>메시지 전송에 실패했습니다. 다시 시도하거나 다른 연락 방법을 이용해주세요.</span>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">프로젝트 문의하기</h2>
            <p className="text-lg text-muted-foreground">
              아래 폼을 통해 프로젝트에 대한 자세한 내용을 알려주세요
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* 이름 */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-primary"
                  placeholder="홍길동"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>

              {/* 이메일 */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-primary"
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* 프로젝트 유형 */}
              <div>
                <label htmlFor="projectType" className="mb-2 block text-sm font-medium">
                  프로젝트 유형
                </label>
                <select
                  {...register('projectType')}
                  id="projectType"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-primary"
                >
                  <option value="">선택해주세요</option>
                  {projectTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>
                )}
              </div>

              {/* 예산 범위 */}
              <div>
                <label htmlFor="budget" className="mb-2 block text-sm font-medium">
                  예산 범위
                </label>
                <select
                  {...register('budget')}
                  id="budget"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-primary"
                >
                  <option value="">선택해주세요</option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>
                )}
              </div>
            </div>

            {/* 희망 일정 */}
            <div>
              <label htmlFor="timeline" className="mb-2 block text-sm font-medium">
                희망 일정
              </label>
              <input
                {...register('timeline')}
                type="text"
                id="timeline"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="예: 2주 내, 연말까지, 급하지 않음 등"
              />
              {errors.timeline && (
                <p className="mt-1 text-sm text-red-500">{errors.timeline.message}</p>
              )}
            </div>

            {/* 메시지 */}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                상세 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={6}
                className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="프로젝트에 대해 자세히 설명해주세요. 원하는 기능, 디자인 스타일, 참고 사이트 등을 포함해주시면 더 정확한 견적을 드릴 수 있습니다."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* 제출 피드백 */}
            {submissionState !== 'idle' && <div className="mb-6">{renderSubmissionFeedback()}</div>}

            {/* 제출 버튼 */}
            <motion.button
              type="submit"
              disabled={isSubmitting || submissionState === 'loading'}
              whileHover={{ scale: submissionState === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: submissionState === 'idle' ? 0.98 : 1 }}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 font-medium text-primary-foreground transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submissionState === 'loading' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  전송 중...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  메시지 보내기
                </>
              )}
            </motion.button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                또는 위의 연락 방법을 통해 직접 연락주세요
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
