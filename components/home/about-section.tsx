"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  tools: ["Git", "Figma", "VS Code", "Vercel", "Notion"],
  learning: ["Three.js", "WebGL", "React Native"],
};

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            About Me
          </motion.h2>

          <motion.div variants={itemVariants} className="prose prose-lg dark:prose-invert mx-auto mb-12">
            <p>
              안녕하세요! 사용자 경험을 중시하는 프론트엔드 개발자입니다.
              깔끔하고 직관적인 인터페이스와 부드러운 인터랙션을 구현하는 것을 좋아합니다.
            </p>
            <p>
              크몽에서 랜딩 페이지 제작 서비스를 시작하며, 고객의 비즈니스 목표를 달성할 수 있는
              효과적인 웹사이트를 만들고 있습니다. 최신 웹 기술을 활용하여 빠르고 반응형인
              웹사이트를 제작합니다.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-secondary rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-secondary rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Learning</h3>
              <div className="flex flex-wrap gap-2">
                {skills.learning.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-secondary rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
