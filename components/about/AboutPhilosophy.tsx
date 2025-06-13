'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Lightbulb, Users, Target } from 'lucide-react';

const philosophies = [
  {
    icon: Code,
    title: '깔끔한 코드',
    description: '읽기 쉽고 유지보수가 용이한 코드를 작성합니다.',
  },
  {
    icon: Lightbulb,
    title: '창의적 사고',
    description: '문제를 다각도로 바라보며 혁신적인 해결책을 찾습니다.',
  },
  {
    icon: Users,
    title: '사용자 중심',
    description: '사용자의 니즈를 최우선으로 고려한 UX/UI를 설계합니다.',
  },
  {
    icon: Target,
    title: '목표 지향',
    description: '명확한 목표 설정과 체계적인 접근으로 프로젝트를 완성합니다.',
  },
];

export function AboutPhilosophy() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">개발 철학</h2>
            <p className="text-lg text-muted-foreground">
              좋은 코드와 사용자 경험을 만들어가는 저만의 원칙들입니다.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {philosophies.map((philosophy, index) => (
              <motion.div
                key={philosophy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-card group rounded-lg border border-border p-6 text-center transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
                    <philosophy.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{philosophy.title}</h3>
                <p className="text-muted-foreground">{philosophy.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
