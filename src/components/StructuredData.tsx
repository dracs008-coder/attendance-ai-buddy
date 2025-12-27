import React from "react";

interface StructuredDataProps {
  id?: string;
  data: unknown;
}

// Lightweight JSON-LD injector for SEO previews.
// In this UI-only workspace it simply renders a script tag in the DOM.

const StructuredData: React.FC<StructuredDataProps> = ({ id, data }) => {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export default StructuredData;
