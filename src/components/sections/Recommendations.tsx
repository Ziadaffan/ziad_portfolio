import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

interface Recommendation {
    name: string;
    role: string;
    text: string;
}

export const Recommendations = () => {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const recommendations = t("recommendations.list", { returnObjects: true }) as Recommendation[];

    return (
        <section id="recommendations" className="py-20 md:py-32">
            <div className="section-container">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold">{t("recommendations.title")}</h2>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="flex justify-around gap-6">
                        {recommendations.map((recommendation, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className="w-full md:w-1/2 glass-card p-6 md:p-8 rounded-2xl relative group hover:border-primary/30 transition-all duration-300"
                            >

                                <div className="relative z-10">
                                    <p className="text-muted-foreground mb-6 italic leading-relaxed">
                                        "{recommendation.text}"
                                    </p>

                                    <div>
                                        <h4 className="font-bold text-lg">{recommendation.name}</h4>
                                        <p className="text-primary text-sm font-mono">{recommendation.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
