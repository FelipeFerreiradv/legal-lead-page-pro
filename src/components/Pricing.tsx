import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Consulta Inicial",
    price: "Gratuita",
    description: "Avaliação do seu caso sem compromisso",
    features: [
      "Análise preliminar do caso",
      "Orientação sobre próximos passos",
      "Estimativa de prazos",
      "Esclarecimento de dúvidas",
    ],
    highlighted: false,
    cta: "Agendar Consulta",
  },
  {
    name: "Assessoria Jurídica",
    price: "R$ 800",
    priceDetail: "a partir de",
    description: "Para casos pontuais e demandas específicas",
    features: [
      "Análise completa do caso",
      "Elaboração de documentos",
      "Acompanhamento processual",
      "Suporte por WhatsApp",
      "Relatórios de andamento",
    ],
    highlighted: true,
    cta: "Contratar Agora",
  },
  {
    name: "Consultoria Empresarial",
    price: "R$ 1.500",
    priceDetail: "mensal a partir de",
    description: "Assessoria contínua para sua empresa",
    features: [
      "Atendimento prioritário",
      "Contratos e pareceres",
      "Consultoria preventiva",
      "Representação em reuniões",
      "Treinamento da equipe",
      "Suporte ilimitado",
    ],
    highlighted: false,
    cta: "Falar com Especialista",
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
      className="py-24 relative overflow-hidden"
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
            Honorários transparentes e acessíveis. O valor final pode variar conforme a
            complexidade do caso.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                plan.highlighted
                  ? "bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-gold scale-105 z-10"
                  : "bg-card border border-border hover:border-primary/30 hover:shadow-gold"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Mais Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm font-body mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  {plan.priceDetail && (
                    <span className="text-sm text-muted-foreground font-body">
                      {plan.priceDetail}
                    </span>
                  )}
                  <span
                    className={`font-display text-4xl font-bold ${
                      plan.highlighted ? "text-gold-gradient" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                </div>
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

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground mt-12 font-body max-w-2xl mx-auto">
          * Os valores apresentados são referências iniciais. O orçamento final será
          definido após análise detalhada do caso. Parcelamento disponível.
        </p>
      </div>
    </section>
  );
}
