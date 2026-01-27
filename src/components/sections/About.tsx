import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Cloud, Smartphone, Languages } from "lucide-react";
import { Trans, useTranslation } from "react-i18next";

const highlightIcons = [Code2, Cloud, Smartphone, Languages] as const;

export const About = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const highlights = t("about.highlights", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("about.title")}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            <div className="md:col-span-3 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <Trans
                  i18nKey="about.p1"
                  components={{
                    1: <span className="text-foreground font-medium" />,
                  }}
                />
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <Trans
                  i18nKey="about.p2"
                  components={{
                    1: <span className="text-primary font-medium" />,
                    3: <span className="text-primary font-medium" />,
                    5: <span className="text-primary font-medium" />,
                    7: <span className="text-primary font-medium" />,
                  }}
                />
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("about.p3")}
              </p>
            </div>

            <div className="md:col-span-2 flex items-center justify-center">
              <div className="w-[230px] h-[300px] rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                <img
                  src="/image.jpeg"
                  alt={t("about.imageAlt")}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-card p-5 rounded-xl hover:border-primary/30 transition-all duration-300 group"
              >
                {(() => {
                  const Icon = highlightIcons[index] ?? Code2;
                  return (
                    <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                  );
                })()}
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
