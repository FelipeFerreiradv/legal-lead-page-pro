import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
  honeypot: string;
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
    service: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, informe seu nome.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "O nome deve ter pelo menos 3 caracteres.";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "O nome deve ter no máximo 100 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, informe seu e-mail.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, informe um e-mail válido.";
    } else if (formData.email.trim().length > 255) {
      newErrors.email = "O e-mail deve ter no máximo 255 caracteres.";
    }

    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Por favor, informe seu telefone.";
    } else if (
      !phoneRegex.test(formData.phone) ||
      formData.phone.replace(/\D/g, "").length < 10
    ) {
      newErrors.phone = "Por favor, informe um telefone válido.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor, descreva seu projeto.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "A mensagem deve ter pelo menos 10 caracteres.";
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "A mensagem deve ter no máximo 1000 caracteres.";
    }

    if (!formData.consent) {
      newErrors.consent = "Você precisa aceitar os termos para continuar.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot anti-bot: se preenchido, aborta silenciosamente
    if (formData.honeypot && formData.honeypot.trim() !== "") {
      // trata como sucesso para não entregar pista ao bot
      setIsSubmitted(true);
      toast.success(
        "Mensagem enviada com sucesso! Entrarei em contato em breve."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        consent: false,
        honeypot: "",
      });
      return;
    }

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service || "",
        message: formData.message.trim(),
        consent: formData.consent,
        honeypot: formData.honeypot || "",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json && (json.ok === true || json.ok === undefined)) {
        // Dispara gtag somente após confirmação do backend (se existir)
        if (typeof (window as any).gtag === "function") {
          try {
            (window as any).gtag("event", "conversion", {
              send_to: "AW-17733737601/8SCcCJ_01sMbEIG5jYhC",
            });
          } catch (err) {
            // ignore
          }
        }

        setIsSubmitted(true);
        toast.success(
          "Mensagem enviada com sucesso! Entrarei em contato em breve."
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          consent: false,
          honeypot: "",
        });
        setErrors({});
      } else {
        // Backend retornou erro / validação
        const errorMsg =
          (json && (json.error || json.message)) ||
          "Não foi possível enviar a mensagem. Tente novamente.";
        toast.error(
          typeof errorMsg === "string" ? errorMsg : "Erro ao enviar mensagem."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar contato:", error);
      toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(
        6
      )}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  return (
    <section
      id="contato"
      className="py-24 bg-card relative overflow-hidden"
      aria-labelledby="contato-title"
    >
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Contato
          </span>
          <h2
            id="contato-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Vamos criar seu <span className="text-gold-gradient">projeto?</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Preencha o formulário e receba um orçamento personalizado em até 24
            horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-background rounded-2xl p-8 border border-border">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Fale Comigo
              </h3>

              <div className="space-y-6">
                <a
                  href="https://wa.me/11912655674?text=Olá! Vim pelo site e gostaria de um orçamento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">WhatsApp</p>
                    <p className="text-muted-foreground text-sm font-body">
                      (11) 91265-5674
                      <br />
                      <span className="text-primary">
                        Clique para conversar
                      </span>
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:fefelbf@gmail.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">E-mail</p>
                    <p className="text-muted-foreground text-sm font-body">
                      fefelbf@gmail.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Localização
                    </p>
                    <p className="text-muted-foreground text-sm font-body">
                      Jundiaí, SP - Brasil
                      <br />
                      Atendimento remoto para todo o país
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Horário</p>
                    <p className="text-muted-foreground text-sm font-body">
                      Segunda a Sexta: 9h às 18h
                      <br />
                      Respondo em até 24h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/30">
              <h4 className="font-display text-xl font-semibold text-foreground mb-3">
                Prefere uma conversa rápida?
              </h4>
              <p className="text-muted-foreground font-body mb-4">
                Clique no botão abaixo e fale diretamente comigo pelo WhatsApp.
              </p>
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() =>
                  window.open(
                    "https://wa.me/11912655674?text=Olá! Vim pelo site e gostaria de um orçamento.",
                    "_blank"
                  )
                }
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chamar no WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-2xl p-8 border border-border shadow-lg">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Mensagem Enviada!
                </h3>
                <p className="text-muted-foreground font-body mb-6 max-w-sm">
                  Obrigado pelo contato! Analisarei seu projeto e retornarei com
                  um orçamento personalizado em até 24 horas.
                </p>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Enviar nova mensagem
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Solicite seu Orçamento
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                      aria-invalid={!!errors.name}
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-destructive flex items-center gap-1">
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
                        aria-invalid={!!errors.email}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="mt-2 text-sm text-destructive flex items-center gap-1">
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
                          setFormData((prev) => ({
                            ...prev,
                            phone: formatted,
                          }));
                          if (errors.phone) {
                            setErrors((prev) => ({
                              ...prev,
                              phone: undefined,
                            }));
                          }
                        }}
                        placeholder="(11) 99999-9999"
                        aria-invalid={!!errors.phone}
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-foreground mb-2 font-body"
                    >
                      Serviço de interesse
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="flex h-12 w-full rounded-md border border-border bg-card px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary transition-all duration-300 font-body"
                    >
                      <option value="">Selecione um serviço</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="site-institucional">
                        Site Institucional{" "}
                      </option>
                      <option value="e-commerce">E-Commerce</option>
                      <option value="app-mobile">Aplicativo Mobile</option>
                      <option value="sistema-web">Sistema Web</option>
                      <option value="manutencao">Manutenção Mensal</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2 font-body"
                    >
                      Descreva seu projeto *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Conte-me sobre seu escritório e o que você precisa..."
                      rows={5}
                      aria-invalid={!!errors.message}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-destructive flex items-center gap-1">
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
                          setErrors((prev) => ({
                            ...prev,
                            consent: undefined,
                          }));
                        }
                      }}
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
                        e autorizo o tratamento dos meus dados conforme a LGPD.
                        *
                      </label>
                      {errors.consent && (
                        <p className="mt-1 text-sm text-destructive flex items-center gap-1">
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
                        Solicitar Orçamento
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground font-body">
                    Respondo todos os orçamentos em até 24 horas úteis.
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
