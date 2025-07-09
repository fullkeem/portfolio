'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState('loading');

    try {
      // API 호출로 간소화
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('전송에 실패했습니다.');
      }

      setSubmissionState('success');
      reset();

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
    const baseClasses =
      'flex items-center justify-center gap-3 rounded-lg px-4 py-3 transition-opacity';

    switch (submissionState) {
      case 'loading':
        return (
          <div
            className={`${baseClasses} bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400`}
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>메시지를 전송하고 있습니다...</span>
          </div>
        );

      case 'success':
        return (
          <div
            className={`${baseClasses} bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400`}
          >
            <CheckCircle className="h-5 w-5" />
            <span>메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.</span>
          </div>
        );

      case 'error':
        return (
          <div
            className={`${baseClasses} bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400`}
          >
            <AlertCircle className="h-5 w-5" />
            <span>메시지 전송에 실패했습니다. 다시 시도하거나 다른 연락 방법을 이용해주세요.</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
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
                placeholder="예: 2주 내, 이번 달 안에"
              />
              {errors.timeline && (
                <p className="mt-1 text-sm text-red-500">{errors.timeline.message}</p>
              )}
            </div>

            {/* 메시지 */}
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                프로젝트 상세 설명 <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={6}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-primary"
                placeholder="프로젝트에 대한 자세한 설명을 적어주세요. 목적, 타겟 고객, 원하는 기능 등을 포함해 주시면 더 정확한 견적을 제공할 수 있습니다."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* 제출 버튼 */}
            <div className="space-y-4">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submissionState === 'loading'}
              >
                {submissionState === 'loading' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    전송 중...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    메시지 전송
                  </>
                )}
              </Button>

              {/* 제출 상태 피드백 */}
              {submissionState !== 'idle' && renderSubmissionFeedback()}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
