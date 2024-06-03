import { siteConfig } from '@/config/site'
import { locales } from '@/i18n'
import { fetchImages } from '@/lib/fetch/gallery'
import { createClient } from '@/lib/supabase/server'
import { IImage, ITag } from '@/types/gallery'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url

  const supabase = createClient()

  const { data: tagsData } = await supabase.from('tag').select()
  const tags = tagsData as ITag[]
  const tagRoutes = tags.flatMap((item) => {
    return locales.map((locale) => {
      const lang = locale === 'en' ? '' : `${locale}/`
      return {
        url: `${siteUrl}${lang}tag/${item.name}`,
        lastModified: item.created_at,
      }
    })
  })

  const result = await fetchImages()
  const images = result as IImage[]

  const imageRoutes = images.flatMap((item) => {
    return locales.map((locale) => {
      const lang = locale === 'en' ? '' : `${locale}/`
      return {
        url: `${siteUrl}${lang}image/${item.id}`,
        lastModified: item.created_at,
      }
    })
  })

  const routes = [''].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...tagRoutes, ...imageRoutes]
}
