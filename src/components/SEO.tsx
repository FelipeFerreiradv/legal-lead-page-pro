import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: "summary" | "summary_large_image";
}

export function SEO({
  title = "Silva & Associados Advocacia | Escritório de Advocacia em São Paulo",
  description = "Escritório de advocacia especializado em Direito Civil, Empresarial, Trabalhista e Família. Mais de 15 anos de experiência. Consulta inicial gratuita. Atendimento humanizado em São Paulo.",
  keywords = "advogado, advocacia, escritório de advocacia, direito civil, direito empresarial, direito trabalhista, direito de família, consultoria jurídica, São Paulo, SP",
  ogImage = "/og-image.jpg",
  ogUrl = "https://silvaadvocacia.com.br",
  twitterCard = "summary_large_image",
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Silva & Associados Advocacia",
    image: ogImage,
    description: description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paulista, 1000 - Sala 1010",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01310-100",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.564616,
      longitude: -46.65512,
    },
    url: ogUrl,
    telephone: "+55-11-99999-9999",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "São Paulo",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços Jurídicos",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Direito Civil",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Direito Empresarial",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Direito Trabalhista",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Direito de Família",
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Silva & Associados Advocacia" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={ogUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Silva & Associados Advocacia" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
