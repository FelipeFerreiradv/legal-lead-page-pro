import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Qual o valor de uma consulta inicial?",
    answer:
      "A primeira consulta é gratuita. Nela, avaliamos seu caso, esclarecemos dúvidas e apresentamos as melhores estratégias jurídicas. Sem compromisso.",
  },
  {
    question: "Vocês atendem em quais áreas do direito?",
    answer:
      "Atuamos nas principais áreas: Direito Civil, Empresarial, Trabalhista, Família, Consumidor e Consultoria Preventiva. Nossa equipe conta com especialistas em cada área.",
  },
  {
    question: "Como funciona o pagamento dos honorários?",
    answer:
      "Trabalhamos com flexibilidade. Oferecemos opções de pagamento à vista com desconto, parcelamento no cartão ou boleto, e em alguns casos, honorários condicionados ao êxito.",
  },
  {
    question: "Qual o prazo médio para resolução de um caso?",
    answer:
      "Depende da complexidade e tipo de processo. Acordos extrajudiciais podem ser resolvidos em semanas. Processos judiciais variam de meses a anos. Sempre buscamos a solução mais rápida.",
  },
  {
    question: "Vocês atendem online?",
    answer:
      "Sim! Oferecemos atendimento presencial e remoto via videoconferência. Você pode resolver seu caso sem sair de casa, com toda a segurança e sigilo necessários.",
  },
  {
    question: "Como posso acompanhar meu processo?",
    answer:
      "Enviamos atualizações regulares por e-mail e WhatsApp. Além disso, você pode entrar em contato a qualquer momento para tirar dúvidas ou solicitar informações.",
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
      className="py-24 bg-card relative overflow-hidden"
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
              className="border border-border rounded-xl overflow-hidden bg-background/50 hover:border-primary/30 transition-colors duration-300"
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
