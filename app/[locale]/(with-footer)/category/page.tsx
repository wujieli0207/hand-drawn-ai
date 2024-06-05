import CategorySidebar from '@/components/Category/CategorySidebar'
import GalleryImages from '@/components/Gallery/GalleryImages'
import { siteConfig, siteName } from '@/config/site'
import { fetchImages } from '@/lib/fetch/gallery'
import { createClient } from '@/lib/supabase/server'
import { ICategory, IImage } from '@/types/gallery'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${siteName} - Category`,
    description: `hand drawn art`,
    keywords: [...siteConfig.keywords].join(','),
  }
}

export default async function Category() {
  const supabase = createClient()

  const { data: categoryData } = await supabase.from('category').select()
  const allCategory = categoryData as ICategory[]

  const result = await fetchImages()
  const images = result as IImage[]

  return (
    <div className="mb-16 md:grid md:grid-cols-[200px_1fr] md:gap-4">
      <CategorySidebar category={allCategory} />

      <GalleryImages images={images} className="mb-12" />
    </div>
  )
}
