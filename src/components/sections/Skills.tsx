import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "Java", "C#", "Kotlin", "VB"],
  },
  {
    title: "Web, Mobile & Desktop",
    skills: ["Next.js", "React.js", "React Native", "Expo", "Vue.js", "Node.js", "Express.js", "NestJS", "Fastify", "Django", "ASP.NET", "WPF (C#)"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Oracle", "SQL", "Prisma ORM"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS ECS", "AWS Bedrock", "Docker", "CI/CD", "Google Calendar API", "Cloudinary"],
  },
  {
    title: "Testing",
    skills: ["Jest", "Supertest", "Unit Testing", "Integration Testing"],
  },
  {
    title: "Tools & Platforms",
    skills: ["TailwindCSS", "Bootstrap", "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Trello", "Pivotal", "BetterStack", "PgAdmin", "Visual Studio"],
  },
  {
    title: "Systems",
    skills: ["Linux", "Windows"],
  },
  {
    title: "Other",
    skills: ["OAuth", "RESTful APIs", "Shopify", "GraphQL"],
  },
];

export const Skills = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const translatedCategories = t("skills.categories", { returnObjects: true }) as Array<{
    title: string;
  }>;

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{t("skills.title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.1 + categoryIndex * 0.05 }}
                className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-semibold text-primary mb-4">
                  {translatedCategories[categoryIndex]?.title ?? category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
