export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://onexjob.com/#organization",
        name: "oneXjob",
        url: "https://onexjob.com",
        logo: {
          "@type": "ImageObject",
          url: "https://onexjob.com/og-image.png",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://onexjob.com/#website",
        url: "https://onexjob.com",
        name: "oneXjob",
        publisher: {
          "@id": "https://onexjob.com/#organization",
        },
        description:
          "Find software jobs faster with AI-powered job matching, personalized recruiter emails, and faster job applications.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}