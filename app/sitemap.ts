import { siteConfig } from '@/config/site'
import { fetchImages } from '@/lib/fetch/gallery'
import { IImage } from '@/types/gallery'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url

  const result = await fetchImages()
  const images = result as IImage[]

  const imageRoutes = images.map((item) => ({
    url: `${siteUrl}/${item.id}`,
    lastModified: item.created_at,
  }))

  const routes = [''].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...imageRoutes]
}
