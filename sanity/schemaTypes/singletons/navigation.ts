import { defineType, defineField } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'href',  title: 'URL',   type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      }],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Label', type: 'string' }),
    defineField({ name: 'ctaHref',  title: 'CTA Button URL',   type: 'string' }),
  ],
})
