export const FAQ_EN = [
  { q: "How do I convert my document?", a: "Upload a Word, PDF..." },
];

export function FaqEn() {
  return FAQ_EN.map(({ q, a }, i) => (
    <details key={i} className="mb-2">
      <summary className="font-semibold">{q}</summary>
      <p className="pl-4">{a}</p>
    </details>
  ));
}
