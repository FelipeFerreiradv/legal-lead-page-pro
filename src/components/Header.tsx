import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Code2 } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#servicos", label: "Serviços" },
    { href: "#portfolio", label: "Portfólio" },
    { href: "#processo", label: "Como Funciona" },
    { href: "#precos", label: "Preços" },
    { href: "#faq", label: "FAQ" },
    { href: "#contato", label: "Contato" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-border/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label="ONP - Página inicial"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-gold">
            <img src="/logo.png" alt="logo" width={25} height={25} />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-xl font-semibold text-foreground">
              FELIPE FERREIRA DEV
            </span>
            <span className="block text-xs text-muted-foreground tracking-widest uppercase">
              Sites para Advocacia
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-sm text-foreground/80 hover:text-primary transition-colors duration-300 link-underline font-body"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA & Phone */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/5511912655674?text=Olá!+Vim+pelo+site+e+gostaria+de+um+orçamento."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <Button
            variant="hero"
            size="lg"
            onClick={() => scrollToSection("#contato")}
          >
            Solicitar Orçamento
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass h-screen border-t flex mt-4 flex-col justify-center border-border/50 animate-fade-in">
          <nav
            className="container mx-auto px-4 py-6 flex flex-col gap-4"
            aria-label="Menu mobile"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-4xl text-foreground/80 hover:text-primary transition-colors duration-300 text-left py-2 font-body"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-border/50">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => scrollToSection("#contato")}
              >
                Solicitar Orçamento
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
