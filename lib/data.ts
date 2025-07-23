// lib/data.ts

export type Tool = {
  slug: string
  name: string
}

export type Pillar = {
  slug: string
  title: string
  description: string
  tools: Tool[]
}

// ————————————————
// 1. Define your pillar data
// ————————————————
const pillars: Pillar[] = [
  {
    slug: 'startup-pitch-decks',
    title: 'Startup Pitch Decks',
    description:
      'Comprehensive guides and templates to craft investor-focused pitch decks for your startup.',
    tools: [
      { slug: 'investor-pitch', name: 'Investor Pitch Generator' },
      { slug: 'saas-pitch',    name: 'SaaS Pitch Deck Builder' },
      { slug: 'series-a-slides', name: 'Series A Slides Creator' },
      // …add 7–12 more tool entries per pillar
    ],
  },
  {
    slug: 'teacher-toolkit',
    title: 'Teacher Toolkit',
    description:
      'Engaging slide and curriculum generators built for educators and trainers.',
    tools: [
      { slug: 'lesson-plan-slides', name: 'Lesson Plan Slide Creator' },
      { slug: 'pdf-to-class-slides', name: 'PDF → Class Slides Converter' },
      { slug: 'word-to-training-deck', name: 'Word → Training Deck Maker' },
      // …etc.
    ],
  },
  // …more pillars
]

// ————————————————
// 2. dataSource API
// ————————————————
export const dataSource = {
  /** Return all pillar slugs (for generateStaticParams) */
  getAllPillars: async (): Promise<string[]> => {
    return pillars.map((p) => p.slug)
  },

  /** Given a slug, return the full Pillar object (for generateMetadata + page render) */
  findPillar: async (slug: string): Promise<Pillar | undefined> => {
    return pillars.find((p) => p.slug === slug)
  },
}
