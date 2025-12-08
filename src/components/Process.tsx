import { MessageSquare, FileSearch, Handshake, Gavel, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consulta Inicial",
    description:
      "Agende uma consulta gratuita para apresentar seu caso. Escutamos atentamente e avaliamos as melhores opções.",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Análise do Caso",
    description:
      "Nossa equipe analisa todos os documentos e detalhes para elaborar a estratégia mais adequada.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Proposta de Honorários",
    description:
      "Apresentamos uma proposta transparente, com valores e condições claras, sem surpresas.",
  },
  {
    number: "04",
    icon: Gavel,
    title: "Atuação Jurídica",
    description:
      "Iniciamos o trabalho com acompanhamento constante e atualizações sobre cada etapa do processo.",
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Resolução",
    description:
      "Buscamos sempre a melhor solução, seja por acordo ou decisão judicial, com total transparência.",
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
            Como Trabalhamos
          </span>
          <h2
            id="processo-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Processo <span className="text-gold-gradient">simplificado</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Do primeiro contato à resolução do seu caso, acompanhamos você em cada etapa
            com total transparência.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
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
