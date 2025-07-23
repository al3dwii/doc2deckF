// components/PillarTemplate.tsx
'use client'

import Link from 'next/link'
import { Pillar } from '@/lib/data'

interface PillarTemplateProps {
  locale: string        // 'ar' or 'en'
  pillar: Pillar
}

export default function PillarTemplate({
  locale,
  pillar,
}: PillarTemplateProps) {
  // Simple locale toggle for headings; replace with your i18n library if you have one.
  const toolsHeading =
    locale === 'ar' ? 'الأدوات ضمن هذه الفئة' : 'Tools in this Category'

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{pillar.title}</h1>
        <p className="mt-2 text-gray-600">{pillar.description}</p>
      </header>

      {/* Tools list */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">{toolsHeading}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillar.tools.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/${locale}/tools/${tool.slug}`}
                className="block p-4 border rounded hover:shadow"
              >
                {tool.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
