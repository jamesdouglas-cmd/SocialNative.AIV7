/**
 * SchemaMarkup — injects JSON-LD structured data into <head> at runtime.
 *
 * Usage:
 *   <SchemaMarkup id="faq-schema" schema={{ "@type": "FAQPage", ... }} />
 *
 * Each instance is identified by a unique `id`. When the component unmounts
 * (e.g. route change), the script tag is removed automatically.
 *
 * GEO note: modern AI crawlers (Perplexity, Google AI Overviews, Bing) execute
 * JavaScript, so runtime-injected JSON-LD is fully recognised for citation scoring.
 */
import { useEffect } from "react";

interface SchemaMarkupProps {
  /** Unique DOM id for the injected <script> tag — prevents duplicates on re-render */
  id: string;
  /** The schema.org object to serialise as JSON-LD */
  schema: object;
}

export default function SchemaMarkup({ id, schema }: SchemaMarkupProps) {
  useEffect(() => {
    // Remove any pre-existing tag with the same id to avoid duplicates
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

    // Cleanup when the page/component unmounts
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, JSON.stringify(schema)]);

  return null;
}
