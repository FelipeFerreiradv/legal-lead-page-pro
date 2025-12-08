import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Quanto tempo leva para criar um site?",
    answer:
      "Landing pages são entregues em até 15 dias. Sites institucionais levam de 20 a 30 dias. Sistemas personalizados variam conforme a complexidade, geralmente entre 45 e 90 dias.",
  },
  {
    question: "O site fica otimizado para o Google?",
    answer:
      "Sim! Todos os sites são desenvolvidos com SEO integrado, incluindo meta tags, estrutura semântica, velocidade otimizada e dados estruturados para buscadores.",
  },
  {
    question: "Vocês cuidam da hospedagem e domínio?",
    answer:
      "Sim! O primeiro ano de hospedagem está incluso em todos os planos. Também auxilio no registro ou transferência do seu domínio (.com.br, .adv.br, etc).",
  },
  {
    question: "Posso atualizar o conteúdo do site sozinho?",
    answer:
      "Sim! Sites institucionais incluem um painel administrativo simples e intuitivo. Forneço treinamento para que você gerencie textos, imagens e conteúdos.",
  },
  {
    question: "O site segue as regras da OAB?",
    answer:
      "Absolutamente. Conheço o Provimento 205/2021 e as diretrizes de publicidade advocatícia. Seu site será elegante e em total conformidade com as normas éticas.",
  },
  {
    question: "Como funciona o pagamento?",
    answer:
      "Trabalho com 50% de entrada e 50% na entrega. Aceito PIX, transferência e cartão de crédito em até 12x. Para projetos maiores, podemos negociar condições especiais.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 relative overflow-hidden"
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Dúvidas Frequentes
          </span>
          <h2
            id="faq-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Perguntas <span className="text-gold-gradient">frequentes</span>
          </h2>
          <div className="gold-line mb-6" />
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden bg-card hover:border-primary/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-display text-lg font-medium text-foreground pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-5 text-muted-foreground font-body leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
