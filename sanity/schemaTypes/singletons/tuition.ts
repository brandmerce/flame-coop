import { defineType, defineField } from 'sanity'

export const tuition = defineType({
  name: 'tuition',
  title: 'Tuition & Scholarship Page',
  type: 'document',
  groups: [
    { name: 'seo',          title: 'SEO' },
    { name: 'hero',         title: 'Hero' },
    { name: 'table',        title: 'Tuition Table' },
    { name: 'scholarships', title: 'Scholarships' },
  ],
  fields: [
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',        title: 'OG Image',         type: 'image', group: 'seo' }),

    defineField({ name: 'heroHeadline',   title: 'Headline',         type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',       title: 'Lead',             type: 'text', rows: 3, group: 'hero' }),

    defineField({ name: 'tableIntroHeading', title: 'Table Section Heading', type: 'string', group: 'table' }),
    defineField({ name: 'tableIntroBody',    title: 'Table Intro',           type: 'text', rows: 3, group: 'table' }),
    defineField({ name: 'tableFootnote',     title: 'Table Footnote',        type: 'text', rows: 3, group: 'table' }),
    defineField({
      name: 'tuitionRows', title: 'Tuition Table Rows', type: 'array', group: 'table',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'program',      title: 'Program Name',           type: 'string' }),
          defineField({ name: 'appFee1',      title: 'App Fee (1st child)',     type: 'string' }),
          defineField({ name: 'appFeeAdd',    title: 'App Fee (additional)',    type: 'string' }),
          defineField({ name: 'supplyFee',    title: 'Supply Fee',              type: 'string' }),
          defineField({ name: 'regFee',       title: 'Registration Fee',        type: 'string' }),
          defineField({ name: 'bgFee',        title: 'Background Check Fee',    type: 'string' }),
          defineField({ name: 'tuitionTotal', title: 'Tuition Total',           type: 'string' }),
          defineField({ name: 'grandTotal',   title: 'Tuition + Reg. Total',    type: 'string' }),
        ],
        preview: { select: { title: 'program', subtitle: 'grandTotal' } },
      }],
    }),
    defineField({
      name: 'callouts', title: 'Program Callout Cards', type: 'array', group: 'table',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'program', title: 'Program Label', type: 'string' }),
          defineField({ name: 'total',   title: 'Total Display',  type: 'string' }),
          defineField({ name: 'note',    title: 'Note',           type: 'string' }),
        ],
        preview: { select: { title: 'program', subtitle: 'total' } },
      }],
    }),

    defineField({ name: 'scholarshipsHeading', title: 'Scholarships Heading', type: 'string', group: 'scholarships' }),
    defineField({ name: 'scholarshipsIntro',   title: 'Intro',                type: 'text', rows: 3, group: 'scholarships' }),
    defineField({ name: 'scholarshipsBody',    title: 'Full Body',            type: 'text', rows: 6, group: 'scholarships' }),
    defineField({
      name: 'scholarships', title: 'Scholarship Programs', type: 'array', group: 'scholarships',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Scholarship Name', type: 'string' }),
          defineField({ name: 'desc', title: 'Description',      type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'name' } },
      }],
    }),
  ],
})
