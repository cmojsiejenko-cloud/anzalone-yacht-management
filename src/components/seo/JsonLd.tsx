import { getLocalBusinessSchema } from "@/lib/schema";

export function JsonLd() {
  const schema = getLocalBusinessSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
