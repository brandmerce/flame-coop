import { defineType, defineField } from 'sanity'

export const beliefs = defineType({
  name: 'beliefs',
  title: 'Beliefs Page',
  type: 'document',
  groups: [
    { name: 'seo',       title: 'SEO' },
    { name: 'hero',      title: 'Hero' },
    { name: 'statement', title: 'Statement of Faith' },
    { name: 'faith',     title: 'Faith in the Classroom' },
    { name: 'formation', title: 'Formation' },
  ],
  fields: [
    defineField({ name: 'seoTitle',         title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription',   title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',          title: 'OG Image',         type: 'image', group: 'seo' }),

    defineField({ name: 'heroHeadline',     title: 'Headline',         type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',         title: 'Lead',             type: 'text', rows: 3, group: 'hero' }),

    defineField({ name: 'statementTitle',   title: 'Title',            type: 'string', group: 'statement' }),
    defineField({ name: 'statementIntro',   title: 'Intro',            type: 'text', rows: 3, group: 'statement' }),
    defineField({
      name: 'beliefsList', title: 'Belief Statements', type: 'array', group: 'statement',
      of: [{ type: 'string' }],
    }),

    defineField({ name: 'faithClassroomTitle', title: 'Title', type: 'string', group: 'faith' }),
    defineField({
      name: 'faithClassroomBody', title: 'Body', type: 'array', group: 'faith',
      of: [{ type: 'block' }],
    }),

    defineField({ name: 'formationTitle', title: 'Title',        type: 'string', group: 'formation' }),
    defineField({ name: 'formationQuote', title: 'Italic Quote', type: 'text', rows: 3, group: 'formation' }),
    defineField({ name: 'formationBody',  title: 'Body',         type: 'text', rows: 5, group: 'formation' }),
  ],
})
