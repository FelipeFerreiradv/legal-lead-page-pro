import { Clock, Shield, MessageSquare, Target, Award, HeartHandshake } from "lucide-react";

const differentials = [
  {
    icon: Clock,
    title: "Agilidade",
    description: "Respostas rápidas e acompanhamento em tempo real de todos os processos.",
  },
  {
    icon: Shield,
    title: "Confidencialidade",
    description: "Sigilo absoluto e proteção de dados em conformidade com a LGPD.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação Clara",
    description: "Explicamos cada etapa do processo de forma simples e acessível.",
  },
  {
    icon: Target,
    title: "Foco em Resultados",
    description: "Estratégias jurídicas orientadas para alcançar seus objetivos.",
  },
  {
    icon: Award,
    title: "Experiência Comprovada",
    description: "Equipe com mais de 15 anos de atuação no mercado jurídico.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento Humanizado",
    description: "Tratamos cada cliente de forma única, com empatia e dedicação.",
  },
];

export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="py-24 bg-card relative overflow-hidden"
      aria-labelledby="diferenciais-title"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Por que nos escolher
          </span>
          <h2
            id="diferenciais-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Nossos <span className="text-gold-gradient">diferenciais</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Combinamos tradição jurídica com inovação para oferecer a melhor experiência
            aos nossos clientes.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <div
              key={item.title}
              className="group flex gap-5 p-6 rounded-xl border border-transparent hover:border-primary/20 hover:bg-muted/30 transition-all duration-300"
            >
              <div className="w-12 h-12 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
