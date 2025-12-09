import {
  Layout,
  Building2,
  ShoppingCart,
  Smartphone,
  Settings,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    description:
      "Páginas de alta conversão para captar clientes. Perfeita para campanhas de marketing e geração de leads qualificados.",
    highlight: true,
  },
  {
    icon: Building2,
    title: "Sites Institucionais",
    description:
      "Sites completos e profissionais para apresentar seu escritório, áreas de atuação, equipe e credenciais.",
    highlight: false,
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Jurídico",
    description:
      "Plataformas para venda de cursos, e-books, modelos de petições e consultorias online.",
    highlight: false,
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description:
      "Apps para acompanhamento de processos, comunicação com clientes e gestão de prazos.",
    highlight: false,
  },
  {
    icon: Settings,
    title: "Sistemas Web",
    description:
      "Sistemas personalizados de gestão de escritório, CRM jurídico e automação de documentos.",
    highlight: false,
  },
  {
    icon: Wrench,
    title: "Manutenção e Suporte",
    description:
      "Atualizações, correções, melhorias de desempenho e suporte técnico contínuo para seu site.",
    highlight: false,
  },
];

export function Services() {
  const scrollToContact = () => {
    const element = document.querySelector("#contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="servicos"
      className="py-24 relative overflow-hidden"
      aria-labelledby="servicos-title"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Serviços
          </span>
          <h2
            id="servicos-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Soluções digitais para{" "}
            <span className="text-gold-gradient">advogados</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-muted-foreground text-lg font-body">
            Do site simples ao sistema complexo, desenvolvo soluções sob medida
            para o mercado jurídico com foco em credibilidade e conversão.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`group relative p-8 rounded-xl border transition-all duration-500 ${
                service.highlight
                  ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 shadow-gold"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-gold"
              }`}
            >
              {service.highlight && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Mais procurado
                </div>
              )}

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  service.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                }`}
              >
                <service.icon className="w-7 h-7" />
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>

              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {service.description}
              </p>
              <Button
                variant="ghost"
                className="group/btn p-0 h-auto text-primary hover:bg-transparent"
                onClick={scrollToContact}
              >
                Solicitar orçamento
                <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </Button>
            </article>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-8 font-body">
          * Valores podem variar conforme complexidade e requisitos do projeto.
        </p>
      </div>
    </section>
  );
}
