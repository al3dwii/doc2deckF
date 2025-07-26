// lib/data.ts
export type Tool = {
  slug: string;
  name_en: string;
  name_ar: string;
};

export type Pillar = {
  slug: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  tools: Tool[];
};

// lib/data.ts (continued)
const pillars: Pillar[] = [
  {
    slug: 'startup-pitch-decks',
    title_en: 'Startup Pitch Decks',
    title_ar: 'عروض المستثمرين للشركات الناشئة',
    description_en: 'Comprehensive guides and templates to craft investor‑focused pitch decks for your startup.',
    description_ar: 'أدلة شاملة وقوالب لإعداد عروض استثمارية تركز على المستثمرين لشركتك الناشئة.',
    tools: [
      { slug: 'investor-pitch', name_en: 'Investor Pitch Generator', name_ar: 'مولِّد عرض المستثمر' },
      { slug: 'saas-pitch', name_en: 'SaaS Pitch Deck Builder', name_ar: 'منشئ عرض SaaS' },
      { slug: 'series-a-slides', name_en: 'Series A Slides Creator', name_ar: 'منشئ شرائح الجولة أ' },
      // …add additional tools here
    ],
  },
  {
    slug: 'teacher-toolkit',
    title_en: 'Teacher Toolkit',
    title_ar: 'عدة المعلم',
    description_en: 'Engaging slide and curriculum generators built for educators and trainers.',
    description_ar: 'مولدات شرائح وخطط دروس تفاعلية مصممة للمعلمين والمدربين.',
    tools: [
      { slug: 'lesson-plan-slides', name_en: 'Lesson Plan Slide Creator', name_ar: 'مولّد شرائح خطة الدرس' },
      { slug: 'pdf-to-class-slides', name_en: 'PDF to Class Slides Converter', name_ar: 'محول PDF إلى شرائح صفية' },
      { slug: 'word-to-training-deck', name_en: 'Word to Training Deck Maker', name_ar: 'منشئ شرائح التدريب من Word' },
      // …etc.
    ],
  },
  {
    slug: 'sales-marketing',
    title_en: 'Sales & Marketing',
    title_ar: 'المبيعات والتسويق',
    description_en: 'Slide templates and generators for sales demos, marketing funnels and product launches.',
    description_ar: 'قوالب ومولدات شرائح لعروض المبيعات، وقمع التسويق، وإطلاق المنتجات.',
    tools: [
      { slug: 'product-launch', name_en: 'Product Launch Deck', name_ar: 'شرائح إطلاق المنتج' },
      { slug: 'sales-funnel-slides', name_en: 'Sales Funnel Slides Generator', name_ar: 'مولّد شرائح قمع المبيعات' },
      { slug: 'demo-presentation', name_en: 'Demo Presentation Maker', name_ar: 'منشئ عرض توضيحي' },
      // …add more tools
    ],
  },
  // …add more pillars here
];

export const dataSource = {
  getAllPillars: async (): Promise<string[]> => pillars.map((p) => p.slug),

  /** Return a localized pillar object given a slug and locale */
  findPillar: async (slug: string, locale: 'en' | 'ar'): Promise<Pillar | undefined> => {
    const pillar = pillars.find((p) => p.slug === slug);
    if (!pillar) return undefined;
    // Merge localized fields into a single object
    return {
      ...pillar,
      title: locale === 'ar' ? pillar.title_ar : pillar.title_en,
      description: locale === 'ar' ? pillar.description_ar : pillar.description_en,
      tools: pillar.tools.map((tool) => ({
        ...tool,
        name: locale === 'ar' ? tool.name_ar : tool.name_en,
      })),
    } as any;
  },
};
