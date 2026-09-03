/**
 * Emits a JSON-LD block. The payload is built from `src/content/*` only, so
 * there is no untrusted input to escape beyond the `</script>` guard.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
