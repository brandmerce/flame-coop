import { defineType, defineField } from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    defineField({ name: 'name',         title: 'Program Name',                    type: 'string' }),
    defineField({ name: 'slug',         title: 'Slug',                            type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'level',        title: 'Level Label (e.g. Kindergarten)', type: 'string' }),
    defineField({ name: 'ages',         title: 'Ages (e.g. Ages 5–6)',            type: 'string' }),
    defineField({ name: 'themeLine',    title: 'One-Line Theme',                  type: 'string' }),
    defineField({ name: 'badgeLabel',   title: 'Badge Letter',                    type: 'string' }),
    defineField({
      name: 'variant', title: 'Card Variant', type: 'string',
      options: {
        list: [
          { title: 'Elementary (gold)',   value: 'elementary' },
          { title: 'Discipleship (dark)', value: 'discipleship' },
        ],
        layout: 'radio',
      },
      initialValue: 'elementary',
    }),
    defineField({ name: 'displayOrder', title: 'Display Order (1 = first)', type: 'number' }),
    defineField({
      name: 'description', title: 'Full Description', type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  orderings: [{ title: 'Display Order', name: 'displayOrder', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'ages' } },
})
