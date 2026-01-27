import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Project {
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export const Projects = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const projects = t("projects.list", { returnObjects: true }) as Project[];

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">{t("projects.title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex flex-col">
                  {/* Project Video */}
                  <div className="relative w-full h-64 md:h-96 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-lg overflow-hidden">
                    {project.title === "Trimium - Barber Shop Platform" ? (
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src="/barbershop.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Calendar className="w-10 h-10 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">{t("projects.bookingPlatform")}</p>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                        <div className="absolute bottom-4 left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <p className="text-sm text-primary font-mono mb-2">{t("projects.featuredLabel")}</p>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>

                    <ul className="space-y-2 mb-6">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5">▹</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="skill-tag text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="default" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t("projects.liveSite")}
                          </Button>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            <Github className="w-4 h-4 mr-2" />
                            {t("projects.code")}
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="text-xl font-semibold mb-6">{t("projects.additionalExperience")}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all duration-300">
                <h4 className="font-semibold mb-2">{t("projects.cards.tutorTitle")}</h4>
                <p className="text-sm text-muted-foreground mb-2">{t("projects.cards.tutorOrg")}</p>
                <p className="text-xs text-primary font-mono">{t("projects.cards.tutorPeriod")}</p>
              </div>
              <div className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all duration-300">
                <h4 className="font-semibold mb-2">{t("projects.cards.goalkeeperTitle")}</h4>
                <p className="text-sm text-muted-foreground mb-2">{t("projects.cards.goalkeeperOrg")}</p>
                <p className="text-xs text-muted-foreground">{t("projects.cards.goalkeeperDesc")}</p>
              </div>
              <div className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all duration-300">
                <h4 className="font-semibold mb-2">{t("projects.cards.volunteerTitle")}</h4>
                <p className="text-sm text-muted-foreground">{t("projects.cards.volunteerDesc")}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
