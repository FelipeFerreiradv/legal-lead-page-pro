import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Roberto Mendes",
    role: "Empresário",
    content:
      "Excelente atendimento do início ao fim. A equipe foi extremamente profissional e conseguiu resolver meu caso empresarial de forma rápida e eficiente. Recomendo fortemente!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ana Carolina Souza",
    role: "Médica",
    content:
      "Fui muito bem atendida durante todo o processo de divórcio. Os advogados foram sensíveis à situação e me orientaram de forma clara. Gratidão pela dedicação.",
    rating: 5,
  },
  {
    id: 3,
    name: "Carlos Eduardo Lima",
    role: "Engenheiro",
    content:
      "Busquei o escritório para uma questão trabalhista e fiquei impressionado com a competência e agilidade. O resultado superou minhas expectativas.",
    rating: 5,
  },
  {
    id: 4,
    name: "Mariana Alves",
    role: "Arquiteta",
    content:
      "Precisei de consultoria para minha empresa e encontrei profissionais extremamente qualificados. O atendimento humanizado faz toda a diferença.",
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      id="depoimentos"
      className="py-24 bg-card relative overflow-hidden"
      aria-labelledby="depoimentos-title"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary text-sm font-medium uppercase tracking-widest mb-4 font-body">
            Depoimentos
          </span>
          <h2
            id="depoimentos-title"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            O que nossos clientes{" "}
            <span className="text-gold-gradient">dizem</span>
          </h2>
          <div className="gold-line mb-6" />
        </div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote icon */}
            <Quote className="absolute -top-4 left-0 w-16 h-16 text-primary/20" />

            {/* Testimonial */}
            <div className="bg-background/50 rounded-2xl p-8 md:p-12 border border-border shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-primary fill-primary"
                  />
                ))}
              </div>

              <blockquote className="text-lg md:text-xl text-foreground font-body leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-display text-lg font-bold text-primary">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted hover:bg-primary/50"
                    }`}
                    aria-label={`Ir para depoimento ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : "false"}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
