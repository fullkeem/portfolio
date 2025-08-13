import type { JsonLdType, JsonLdInput } from '@/lib/utils/seo';
import { buildJsonLd } from '@/lib/utils/seo';

export function JsonLd({ type, data }: { type: JsonLdType; data?: JsonLdInput }) {
  const schema = buildJsonLd(type, data);
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}

