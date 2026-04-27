import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'seo',       title: 'SEO' },
    { name: 'hero',      title: 'Hero' },
    { name: 'story',     title: 'Our Story' },
    { name: 'mvv',       title: 'Mission / Vision / Model' },
    { name: 'directors', title: 'Directors' },
  ],
  fields: [
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',        title: 'OG Image',         type: 'image', group: 'seo' }),

    defineField({ name: 'heroHeadline',   title: 'Headline',         type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',       title: 'Lead',             type: 'text', rows: 3, group: 'hero' }),

    defineField({
      name: 'storyBody', title: 'Our Story Body', type: 'array', group: 'story',
      of: [{ type: 'block' }],
    }),

    defineField({ name: 'missionText', title: 'Mission Statement', type: 'text', rows: 3, group: 'mvv' }),
    defineField({ name: 'visionText',  title: 'Vision Statement',  type: 'text', rows: 3, group: 'mvv' }),
    defineField({ name: 'modelText',   title: 'How We Work',       type: 'text', rows: 3, group: 'mvv' }),

    defineField({
      name: 'directors', title: 'Directors', type: 'array', group: 'directors',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name',        title: 'Name',             type: 'string' }),
          defineField({ name: 'titleText',   title: 'Title',            type: 'string' }),
          defineField({ name: 'bio',         title: 'Bio (paragraph 1)', type: 'text', rows: 4 }),
          defineField({ name: 'bio2',        title: 'Bio (paragraph 2)', type: 'text', rows: 4 }),
          defineField({ name: 'headshot',    title: 'Headshot',          type: 'image', options: { hotspot: true } }),
          defineField({ name: 'headshotAlt', title: 'Headshot Alt Text', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'titleText', media: 'headshot' } },
      }],
    }),
  ],
})
