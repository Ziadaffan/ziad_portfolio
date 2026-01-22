import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t("contact.toast.sentTitle"),
      description: t("contact.toast.sentBody"),
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.info.email"),
      value: "Ziadaffan92@gmail.com",
      href: "mailto:Ziadaffan92@gmail.com",
    },
    {
      icon: Phone,
      label: t("contact.info.phone"),
      value: "(418) 573-6096",
      href: "tel:+14185736096",
    },
    {
      icon: MapPin,
      label: t("contact.info.location"),
      value: t("hero.location"),
    },
    {
      icon: Linkedin,
      label: t("contact.info.linkedin"),
      value: t("contact.info.linkedinValue"),
      href: "https://linkedin.com/in/ziad-affan-460ba519b",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-mono text-sm mb-2">{t("contact.whatsNext")}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
              <p className="text-muted-foreground max-w-lg mx-auto whitespace-pre-line">{t("contact.body")}</p>
            </div>

            <div>
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href?.startsWith("http") ? "_blank" : undefined}
                      rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-4 p-4 rounded-xl glass-card hover:border-primary/30 transition-all duration-300 group ${
                        item.href ? "cursor-pointer" : ""
                      }`}
                    >
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                <Button variant="outline" onClick={() => window.open('/CV_Ziad_Affan_amerique_nord.docx', '_blank')} className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  {t("contact.downloadCv")}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
