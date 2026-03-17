/* Blog — redirects to standalone Airtable-powered Insights page */
import { useEffect } from "react";

export default function Blog() {
  useEffect(() => {
    window.location.replace("/blog.html");
  }, []);

  return null;
}
