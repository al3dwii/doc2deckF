/* content/home.ts
 * Pure data → easily statically analysed & tree‑shaken
 */
export interface HomeCopy {
  hero: { title: string; subtitle: string; cta: string };
  features: Array<{ icon: string; title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
}

export const HOME_EN: HomeCopy = {
  hero: {
    title: 'Turn any document into a board‑ready slide deck — in seconds',
    subtitle:
      'Upload a Word, PDF or Markdown file and get back a beautifully‑designed PowerPoint that matches your brand.',
    cta: 'Generate a deck',
  },
  features: [
    {
      icon: 'FileText',
      title: 'Multi‑format ingest',
      desc: 'Word, PDF, Markdown, Google Docs — even Notion pages.',
    },
    {
      icon: 'Palette',
      title: 'Brand‑safe themes',
      desc: 'Upload a template once; Doc‑to‑Deck re‑uses its slide masters.',
    },
    {
      icon: 'Zap',
      title: 'AI slide writer',
      desc: 'GPT‑4o condenses long documents into concise, speaker‑ready bullets.',
    },
  ],
  faqs: [
    {
      q: 'Do you store my files?',
      a: 'No. Source docs and generated decks are deleted after 24 h.',
    },
    {
      q: 'Is Arabic fully supported?',
      a: 'Yes — we generate RTL slides with Geeza Pro and localised placeholders.',
    },
  ],
};

export const HOME_AR: HomeCopy = {
  hero: {
    title: 'حوِّل أي مستند إلى عرض شرائح احترافي في ثوانٍ',
    subtitle:
      'ارفع مستند Word أو PDF أو Markdown واحصل على عرض بوربوينت متناسق مع هوية علامتك.',
    cta: 'أنشئ العرض الآن',
  },
  // …translate the rest 1‑for‑1
  features: [
    {
      icon: 'FileText',
      title: 'تنسيقات متعددة',
      desc: 'Word وPDF وMarkdown وحتى صفحات Notion.',
    },
    {
      icon: 'Palette',
      title: 'قوالب متوافقة مع الهوية',
      desc: 'حمِّل القالب مرة واحدة وسيُعاد استخدامه تلقائيًا.',
    },
    {
      icon: 'Zap',
      title: 'كتابة شرائح بالذكاء الاصطناعي',
      desc: 'يلخّص GPT‑4o المستندات الطويلة في نقاط واضحة وجاهزة للتقديم.',
    },
  ],
  faqs: [
    {
      q: 'هل يتم تخزين ملفاتي؟',
      a: 'لا، جميع الملفات تُحذف بعد 24 ساعة.',
    },
    {
      q: 'هل اللغة العربية مدعومة بالكامل؟',
      a: 'نعم، ننشئ شرائح RTL بخط Geeza Pro ونصوص معرَّبة.',
    },
  ],
};
