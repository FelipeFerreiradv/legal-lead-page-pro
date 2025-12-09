import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export function SEO({
  title = "Feliupe Ferreira Dev | Sites para Escritórios de Advocacia",
  description = "Desenvolvedor especializado em criar sites profissionais, landing pages e sistemas web para advogados. Conquiste mais clientes com um site à altura do seu escritório. Orçamento grátis.",
  keywords = "site para advogado, site para escritório de advocacia, landing page advogado, desenvolvimento web jurídico, criação de site advocacia, site institucional advogado",
  ogImage = "/og-image.jpg",
  ogUrl = "https://felipeferreiradev.com",
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Feliupe Ferreira Dev",
    image: ogImage,
    description: description,
    url: ogUrl,
    telephone: "+55-11-99999-9999",
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Desenvolvimento Web",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Landing Page",
            description: "Páginas de alta conversão para captar clientes",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "BRL",
            minPrice: 800,
            maxPrice: 1500,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Site Institucional",
            description: "Sites completos para escritórios de advocacia",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "BRL",
            minPrice: 1500,
            maxPrice: 3000,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "E-Commerce",
            description:
              "Plataformas para venda de cursos e produtos jurídicos",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "BRL",
            minPrice: 3000,
            maxPrice: 8000,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sistemas Web",
            description: "Sistemas personalizados de gestão jurídica",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "BRL",
            minPrice: 5000,
            maxPrice: 20000,
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Felipe Ferreira Dev" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={ogUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
