import { Scale, Palette, Zap, Shield, Smartphone, Search } from "lucide-react";

const differentials = [
  {
    icon: Scale,
    title: "Especialista em Advocacia",
    description: "Entendo as necessidades específicas do mercado jurídico e as regras da OAB para publicidade.",
  },
  {
    icon: Palette,
    title: "Design Sofisticado",
    description: "Sites elegantes que transmitem credibilidade e profissionalismo para seus clientes.",
  },
  {
    icon: Zap,
    title: "Entrega Rápida",
    description: "Prazo médio de 15 dias para landing pages e 30 dias para sites completos.",
  },
  {
    icon: Shield,
    title: "Segurança e LGPD",
    description: "Sites com SSL, proteção de dados e formulários em conformidade com a LGPD.",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Seu site funciona perfeitamente em celulares, tablets e computadores.",
  },
  {
    icon: Search,
    title: "Otimizado para Google",
    description: "SEO integrado para seu escritório aparecer nas buscas e atrair mais clientes.",
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
            Por que me escolher
          </span>
          <h2
            id="diferenciais-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Diferenciais do meu{" "}
            <span className="text-gold-gradient">trabalho</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Não sou apenas um desenvolvedor — sou parceiro estratégico para a presença digital 
            do seu escritório.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item) => (
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
