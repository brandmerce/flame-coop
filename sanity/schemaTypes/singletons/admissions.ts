import { defineType, defineField } from 'sanity'

export const admissions = defineType({
  name: 'admissions',
  title: 'Admissions Page',
  type: 'document',
  groups: [
    { name: 'seo',        title: 'SEO' },
    { name: 'hero',       title: 'Hero' },
    { name: 'fit',        title: 'Fit Checklist' },
    { name: 'enrollment', title: 'Enrollment Status' },
    { name: 'after',      title: 'After You Enroll' },
  ],
  fields: [
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'Meta Description', type: 'text', rows: 3, group: 'seo' }),
    defineField({ name: 'ogImage',        title: 'OG Image',         type: 'image', group: 'seo' }),

    defineField({ name: 'heroHeadline',   title: 'Headline',         type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',       title: 'Lead',             type: 'text', rows: 3, group: 'hero' }),

    defineField({
      name: 'fitItems', title: 'Fit Checklist Items', type: 'array', group: 'fit',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'enrollmentOpen', title: 'Enrollment is Currently OPEN',
      type: 'boolean', initialValue: true, group: 'enrollment',
      description: 'Toggle this to show the open or closed message on the page.',
    }),
    defineField({ name: 'enrollmentOpenMessage',   title: 'Open Message',   type: 'text', rows: 3, group: 'enrollment' }),
    defineField({ name: 'enrollmentClosedMessage', title: 'Closed Message', type: 'text', rows: 3, group: 'enrollment' }),

    defineField({
      name: 'afterEnrollBody', title: 'After You Enroll Body', type: 'array', group: 'after',
      of: [{ type: 'block' }],
    }),
  ],
})
