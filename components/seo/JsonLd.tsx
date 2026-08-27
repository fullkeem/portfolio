import type { JsonLdType, JsonLdInput } from '@/lib/utils/seo';
import { buildJsonLd } from '@/lib/utils/seo';
import type { Locale } from '@/types/locale';

export function JsonLd({ type, data, locale = 'ko' }: { type: JsonLdType; data?: JsonLdInput; locale?: Locale }) {
  const schema = buildJsonLd(type, data, locale);
  if (!schema) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
