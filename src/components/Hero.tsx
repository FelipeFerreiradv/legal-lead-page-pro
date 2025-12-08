import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Award, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in-up">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80 font-body">
              Mais de 15 anos de excelência jurídica
            </span>
          </div>

          {/* Title */}
          <h1
            id="hero-title"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Defenda seus{" "}
            <span className="text-gold-gradient">direitos</span>
            <br />
            com quem entende
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Assessoria jurídica especializada para pessoas físicas e empresas.
            Atendimento humanizado, estratégias personalizadas e resultados
            comprovados.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <Button variant="hero" size="xl" onClick={scrollToContact}>
              Agende sua Avaliação Gratuita
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="elegant" size="xl" onClick={scrollToContact}>
              Fale com um Advogado Agora
            </Button>
          </div>

          {/* Social Proof */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-display font-bold text-foreground">+500</span>
              <span className="text-sm text-muted-foreground font-body">
                Casos de sucesso
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-display font-bold text-foreground">15+</span>
              <span className="text-sm text-muted-foreground font-body">
                Anos de experiência
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <span className="text-3xl font-display font-bold text-foreground">98%</span>
              <span className="text-sm text-muted-foreground font-body">
                Taxa de satisfação
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}
