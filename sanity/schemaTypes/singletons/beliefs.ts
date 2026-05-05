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

    defineField({
      name: 'heroStyle',
      title: 'Hero Style (Hero — choose how the top of the page looks)',
      type: 'string', group: 'hero',
      options: {
        list: [
          { title: 'Dark gradient with white text (current default)', value: 'dark' },
          { title: 'Cream block with dark text', value: 'cream' },
          { title: 'Background photo with dark overlay & white text (like Home)', value: 'image' },
          { title: 'No hero — page starts at first section', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({ name: 'heroEyebrow',      title: 'Eyebrow (Hero — small label above headline)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline',     title: 'Headline (Hero — main heading)',               type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',         title: 'Lead (Hero — intro paragraph)',                type: 'text', rows: 3, group: 'hero' }),
    defineField({
      name: 'heroImage',
      title: 'Background Image (Hero — only used when style is "Background photo")',
      type: 'image', options: { hotspot: true }, group: 'hero',
      hidden: ({ parent }) => parent?.heroStyle !== 'image',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Background Image Alt Text (Hero — accessibility description)',
      type: 'string', group: 'hero',
      hidden: ({ parent }) => parent?.heroStyle !== 'image',
    }),

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
