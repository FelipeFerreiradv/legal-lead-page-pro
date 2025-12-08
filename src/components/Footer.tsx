import { Scale, Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border" role="contentinfo">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="flex items-center gap-3 mb-6 group"
              aria-label="Silva & Associados - Página inicial"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-gold">
                <Scale className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-foreground">
                  Silva & Associados
                </span>
                <span className="block text-xs text-muted-foreground tracking-widest uppercase">
                  Advocacia
                </span>
              </div>
            </a>
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
              Escritório de advocacia comprometido com a excelência jurídica e o
              atendimento humanizado. Mais de 15 anos defendendo seus direitos.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {[
                { href: "#servicos", label: "Serviços" },
                { href: "#diferenciais", label: "Diferenciais" },
                { href: "#processo", label: "Como Funciona" },
                { href: "#depoimentos", label: "Depoimentos" },
                { href: "#faq", label: "FAQ" },
                { href: "#contato", label: "Contato" },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              Informações Legais
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#politica-privacidade"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body text-sm"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="#termos-uso"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body text-sm"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#codigo-etica"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-body text-sm"
                >
                  Código de Ética da OAB
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground font-body">
                <strong className="text-foreground">OAB/SP nº 123.456</strong>
                <br />
                Registro Seccional São Paulo
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              Contato
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-body text-sm">
                    Av. Paulista, 1000 - Sala 1010
                    <br />
                    Bela Vista, São Paulo - SP
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-body text-sm">(11) 99999-9999</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@silvaadvocacia.com.br"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-body text-sm">
                    contato@silvaadvocacia.com.br
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-body text-center md:text-left">
              © {currentYear} Silva & Associados Advocacia. Todos os direitos
              reservados.
            </p>
            <p className="text-xs text-muted-foreground font-body">
              Desenvolvido com base nas{" "}
              <a
                href="https://onovoprogramador.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                soluções ONP
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
