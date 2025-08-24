'use client';

import { motion } from 'framer-motion';

// 사용되지 않는 상수 제거 (ESLint: no-unused-vars)

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="bg-secondary/10 pb-10 pt-20 md:pb-20 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mx-auto max-w-5xl"
        >
          <motion.h2
            variants={itemVariants}
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
          >
            About Me
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="prose prose-lg mx-auto mb-12 w-full text-center dark:prose-invert"
          >
            <h4>다양한 서비스를 만들고 체험해보고 싶은 개발자입니다. </h4>
            <p>
              &ldquo;이걸 만들면 어떨까?&rdquo;하는 호기심이 저를 움직입니다. AI 시대의 개발자로서{' '}
              <strong>기술은 수단, 가치 창출이 목적</strong>이라고 생각합니다. 필요한 기술은 가리지
              않고 배우며 서비스의 경계를 확장하는 실험을 즐깁니다.
            </p>
            <p>
              단순한 웹사이트가 아닌 <strong>&ldquo;경험을 설계하는 디지털 공간&rdquo;</strong>을
              만드는게 우선순위입니다. 성능과 아름다움, 기능과 감성이 조화를 이루는 순간을 찾아가며,
              매 프로젝트마다 새로운 도전을 통해 한계를 넓혀가고 있습니다.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
