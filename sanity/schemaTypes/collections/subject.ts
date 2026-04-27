import { defineType, defineField } from 'sanity'

export const subject = defineType({
  name: 'subject',
  title: 'Academic Subject',
  type: 'document',
  fields: [
    defineField({ name: 'name',         title: 'Subject Name',              type: 'string' }),
    defineField({ name: 'slug',         title: 'Slug',                      type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'description',  title: 'Description',               type: 'text', rows: 4 }),
    defineField({ name: 'displayOrder', title: 'Display Order (1 = first)', type: 'number' }),
  ],
  preview: { select: { title: 'name' } },
})
