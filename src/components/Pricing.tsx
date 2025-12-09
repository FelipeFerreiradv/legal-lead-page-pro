import { Check, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Landing Page",
    description: "Página única focada em conversão de leads",
    features: [
      "Design responsivo e moderno",
      "Formulário de contato integrado",
      "Otimização para SEO básico",
      "Integração com WhatsApp",
      "Hospedagem por 1 ano inclusa",
      "Entrega em até 15 dias",
    ],
    highlighted: true,
    badge: "Mais vendido",
    badgeIcon: Zap,
    cta: "Quero minha Landing Page",
  },
  {
    name: "Site Institucional",
    description: "Site completo para seu escritório",
    features: [
      "Até 10 páginas personalizadas",
      "Áreas de atuação detalhadas",
      "Página da equipe/advogados",
      "Blog integrado (opcional)",
      "SEO avançado",
      "Hospedagem por 1 ano inclusa",
      "Entrega em até 30 dias",
      "Copiright que converte",
    ],
    highlighted: false,
    cta: "Quero meu Site",
  },
  {
    name: "Sistema Personalizado",
    description: "Soluções sob medida para seu escritório",
    features: [
      "Análise de requisitos completa",
      "Desenvolvimento personalizado",
      "CRM jurídico / Gestão de processos",
      "Integração com APIs",
      "Treinamento da equipe",
      "Painel administrativo",
      "Suporte prioritário",
      "Documentação completa",
    ],
    highlighted: false,
    cta: "Solicitar Proposta",
  },
];

export function Pricing() {
  const scrollToContact = () => {
    const element = document.querySelector("#contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="precos"
      className="py-24 bg-card relative overflow-hidden"
      aria-labelledby="precos-title"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Investimento
          </span>
          <h2
            id="precos-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Planos e <span className="text-gold-gradient">valores</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Preços transparentes e acessíveis. O valor final depende da
            complexidade do seu projeto.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-gold md:scale-105 z-10"
                  : "bg-background border border-border hover:border-primary/30 hover:shadow-gold"
              }`}
            >
              {plan.highlighted && plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-2">
                  {plan.badgeIcon && <plan.badgeIcon className="w-4 h-4" />}
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm font-body mb-4">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-body text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "hero" : "outline"}
                className="w-full"
                size="lg"
                onClick={scrollToContact}
              >
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>

        {/* Additional services */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-background/50 rounded-2xl p-8 border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
              Serviços Adicionais
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">
                    Manutenção Mensal
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Atualizações e suporte
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="font-medium text-foreground">Hospedagem</p>
                  <p className="text-sm text-muted-foreground">
                    Servidor dedicado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-8 font-body max-w-2xl mx-auto">
          * Os valores podem variar com base no levantamento de requisitos.
          Parcelamento em até 12x disponível.
        </p>
      </div>
    </section>
  );
}
