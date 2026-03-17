/**
 * usePageMeta — sets per-page <title> and <meta name="description"> at runtime.
 *
 * GEO note: AI crawlers that execute JS (Perplexity, Google AI Overviews, Bing)
 * read runtime-updated meta tags. Without this hook, every URL in this SPA
 * returns the same generic title/description from index.html — which means
 * AI engines cannot distinguish between pages for citation purposes.
 *
 * Usage:
 *   usePageMeta(
 *     "How Social Native Works — Fully Managed Creator Marketing",
 *     "Social Native automates creator sourcing, contracting, rights clearance..."
 *   );
 */
import { useEffect } from "react";

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create <meta name="description">
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (meta) {
        meta.setAttribute("content", description);
      } else {
        meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }

    // Update Open Graph title + description to match
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    if (description) {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
    }
  }, [title, description]);
}
