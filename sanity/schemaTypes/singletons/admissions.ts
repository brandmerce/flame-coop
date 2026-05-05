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

    defineField({
      name: 'heroStyle',
      title: 'Hero Style (Hero — choose how the top of the page looks)',
      type: 'string', group: 'hero',
      options: {
        list: [
          { title: 'Cream block with dark text (default)', value: 'cream' },
          { title: 'Dark gradient with white text', value: 'dark' },
          { title: 'Background photo with dark overlay & white text (like Home)', value: 'image' },
          { title: 'No hero — page starts at first section', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'cream',
    }),
    defineField({ name: 'heroEyebrow',    title: 'Eyebrow (Hero — small label above headline)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline',   title: 'Headline (Hero — main heading)',               type: 'string', group: 'hero' }),
    defineField({ name: 'heroLead',       title: 'Lead (Hero — intro paragraph)',                type: 'text', rows: 3, group: 'hero' }),
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
