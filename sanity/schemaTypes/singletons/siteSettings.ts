import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName',     title: 'Site Name',       type: 'string' }),
    defineField({ name: 'tagline',      title: 'Tagline',         type: 'string' }),
    defineField({ name: 'contactEmail', title: 'Contact Email',   type: 'string' }),
    defineField({ name: 'phone',        title: 'Phone Number',    type: 'string' }),
    defineField({ name: 'address',      title: 'Address',         type: 'text', rows: 2 }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL',   type: 'url' }),
    defineField({ name: 'facebookUrl',  title: 'Facebook URL',    type: 'url' }),
    defineField({ name: 'youtubeUrl',   title: 'YouTube URL',     type: 'url' }),
  ],
})
