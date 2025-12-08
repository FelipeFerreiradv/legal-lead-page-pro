import { MessageSquare, FileSearch, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Briefing",
    description:
      "Conversamos sobre seu escritório, objetivos e o que você precisa. Entendo sua visão e defino os requisitos.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Proposta",
    description:
      "Envio um orçamento detalhado com prazo, escopo e condições de pagamento. Sem surpresas.",
  },
  {
    number: "03",
    icon: PenTool,
    title: "Design",
    description:
      "Crio o layout do seu site para aprovação. Você acompanha cada etapa e pode solicitar ajustes.",
  },
  {
    number: "04",
    icon: Code,
    title: "Desenvolvimento",
    description:
      "Codifico o site com as melhores tecnologias, garantindo velocidade, segurança e SEO.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Lançamento",
    description:
      "Publico seu site, configuro domínio e e-mails. Você recebe treinamento para gerenciar o conteúdo.",
  },
];

export function Process() {
  return (
    <section
      id="processo"
      className="py-24 relative overflow-hidden"
      aria-labelledby="processo-title"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Como Funciona
          </span>
          <h2
            id="processo-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Processo <span className="text-gold-gradient">simplificado</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Do primeiro contato ao site no ar, acompanho você em cada etapa com total 
            transparência.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative group text-center lg:text-left"
              >
                {/* Step number badge */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:shadow-gold transition-all duration-300">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center font-body">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
