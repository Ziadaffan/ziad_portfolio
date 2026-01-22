import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  type: "work" | "education" | "achievement";
}

const getIcon = (type: string) => {
  switch (type) {
    case "education":
      return GraduationCap;
    case "achievement":
      return Award;
    default:
      return Briefcase;
  }
};

export const Experience = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = t("experience.timeline", { returnObjects: true }) as ExperienceItem[];
  const education = t("experience.education", { returnObjects: true }) as Array<
    Pick<ExperienceItem, "title" | "company" | "period" | "type">
  >;

  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{t("experience.title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Work Experience Timeline */}
          <div className="relative mb-16">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-1/2" />

            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const Icon = getIcon(exp.type);
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={`${exp.company}-${exp.period}`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className={`relative flex flex-col md:flex-row ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } items-start md:items-center gap-4 md:gap-8`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                    {/* Content */}
                    <div className={`flex-1 ml-10 md:ml-0 ${isLeft ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
                      <div className={`glass-card p-6 rounded-xl hover:border-primary/30 transition-all duration-300 ${isLeft ? "md:ml-auto" : "md:mr-auto"} max-w-lg`}>
                        <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-primary font-mono">{exp.period}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>
                        <p className="text-muted-foreground font-medium mb-3">{exp.company}</p>
                        <ul className={`space-y-1.5 text-sm text-muted-foreground ${isLeft ? "md:text-right" : ""}`}>
                          {exp.description.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className={`text-primary mt-1.5 ${isLeft ? "md:order-2" : ""}`}>▹</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-semibold">{t("experience.educationAndAchievements")}</h3>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {education.map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-primary font-mono mb-1">{item.period}</p>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.company}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
