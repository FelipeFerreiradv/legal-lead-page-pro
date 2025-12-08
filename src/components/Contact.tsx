import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
  honeypot: string; // Anti-spam field
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consent?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Por favor, informe seu nome.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres.";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "O nome deve ter no máximo 100 caracteres.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, informe seu e-mail.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, informe um e-mail válido.";
    } else if (formData.email.trim().length > 255) {
      newErrors.email = "O e-mail deve ter no máximo 255 caracteres.";
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Por favor, informe seu telefone.";
    } else if (!phoneRegex.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Por favor, informe um telefone válido.";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Por favor, descreva brevemente seu caso.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "A mensagem deve ter pelo menos 10 caracteres.";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "A mensagem deve ter no máximo 1000 caracteres.";
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = "Você precisa aceitar os termos para continuar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, it's a bot
    if (formData.honeypot) {
      return;
    }

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - Replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setIsSubmitted(true);
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
        honeypot: "",
      });
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  return (
    <section
      id="contato"
      className="py-24 relative overflow-hidden"
      aria-labelledby="contato-title"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Fale Conosco
          </span>
          <h2
            id="contato-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Entre em <span className="text-gold-gradient">contato</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Estamos prontos para ajudar. Preencha o formulário e responderemos em até 24
            horas úteis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <MapPin className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Endereço</p>
                    <p className="text-muted-foreground text-sm font-body">
                      Av. Paulista, 1000 - Sala 1010
                      <br />
                      Bela Vista, São Paulo - SP
                      <br />
                      CEP: 01310-100
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+5511999999999"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Telefone</p>
                    <p className="text-muted-foreground text-sm font-body">
                      (11) 99999-9999
                      <br />
                      (11) 3333-3333
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:contato@silvaadvocacia.com.br"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">E-mail</p>
                    <p className="text-muted-foreground text-sm font-body">
                      contato@silvaadvocacia.com.br
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Horário de Atendimento
                    </p>
                    <p className="text-muted-foreground text-sm font-body">
                      Segunda a Sexta: 9h às 18h
                      <br />
                      Sábados: 9h às 13h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-card rounded-2xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0976951333!2d-46.65512!3d-23.564616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do escritório"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Mensagem Enviada!
                </h3>
                <p className="text-muted-foreground font-body mb-6 max-w-sm">
                  Obrigado pelo contato. Nossa equipe analisará seu caso e retornará em
                  até 24 horas úteis.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Envie sua Mensagem
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot field - hidden from users */}
                  <div className="hidden" aria-hidden="true">
                    <Input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2 font-body"
                    >
                      Nome completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      aria-describedby={errors.name ? "name-error" : undefined}
                      aria-invalid={!!errors.name}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2 font-body"
                      >
                        E-mail *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="mt-2 text-sm text-destructive flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2 font-body"
                      >
                        Telefone *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          setFormData((prev) => ({ ...prev, phone: formatted }));
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        placeholder="(11) 99999-9999"
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        aria-invalid={!!errors.phone}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p
                          id="phone-error"
                          className="mt-2 text-sm text-destructive flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2 font-body"
                    >
                      Descreva seu caso *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte-nos brevemente sobre sua situação..."
                      rows={5}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      aria-invalid={!!errors.message}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="mt-2 text-sm text-destructive flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formData.message.length}/1000 caracteres
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => {
                        setFormData((prev) => ({
                          ...prev,
                          consent: checked as boolean,
                        }));
                        if (errors.consent) {
                          setErrors((prev) => ({ ...prev, consent: undefined }));
                        }
                      }}
                      aria-describedby={errors.consent ? "consent-error" : undefined}
                      className="mt-1"
                    />
                    <div>
                      <label
                        htmlFor="consent"
                        className="text-sm text-muted-foreground font-body cursor-pointer"
                      >
                        Li e concordo com a{" "}
                        <a
                          href="#politica-privacidade"
                          className="text-primary hover:underline"
                        >
                          Política de Privacidade
                        </a>{" "}
                        e autorizo o tratamento dos meus dados pessoais conforme a LGPD.
                        *
                      </label>
                      {errors.consent && (
                        <p
                          id="consent-error"
                          className="mt-1 text-sm text-destructive flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.consent}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensagem
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground font-body">
                    Seus dados estão seguros conosco. Respondemos em até 24h úteis.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
