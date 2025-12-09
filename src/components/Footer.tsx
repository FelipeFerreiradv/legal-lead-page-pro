import { Code2, Phone, Mail, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border" role="contentinfo">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#"
              className="flex items-center gap-3 mb-6 group"
              aria-label="ONP - Página inicial"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-gold">
                <img src="/logo.png" alt="logo" width={25} height={25} />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-foreground">
                  FELIPE FERREIRA DEV
                </span>
                <span className="block text-xs text-muted-foreground tracking-widest uppercase">
                  Sites para Advocacia
                </span>
              </div>
            </a>
            <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
              Desenvolvedor especializado em criar sites profissionais e
              sistemas web para escritórios de advocacia em todo o Brasil.
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
                href="https://github.com/FelipeFerreiradv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
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
                { href: "#portfolio", label: "Depoimentos" },
                { href: "#processo", label: "Como Funciona" },
                { href: "#precos", label: "Preços" },
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

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              Serviços
            </h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground font-body text-sm">
                Landing Pages
              </li>
              <li className="text-muted-foreground font-body text-sm">
                Sites Institucionais
              </li>
              <li className="text-muted-foreground font-body text-sm">
                E-Commerce Jurídico
              </li>
              <li className="text-muted-foreground font-body text-sm">
                Sistemas Web
              </li>
              <li className="text-muted-foreground font-body text-sm">
                Aplicativos Mobile
              </li>
              <li className="text-muted-foreground font-body text-sm">
                Manutenção e Suporte
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">
              Contato
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/11912655674?text=Olá! Vim pelo site e gostaria de um orçamento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-body text-sm">(11) 91265-5674</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:fefelbf@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-body text-sm">fefelbf@gmail.com</span>
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground font-body">
                <strong className="text-foreground">Atendimento Remoto</strong>
                <br />
                Para todo o Brasil
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-body text-center md:text-left">
              © {currentYear} FELIPE FERREIRA DEV. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a
                href="#politica-privacidade"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#termos-uso"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
