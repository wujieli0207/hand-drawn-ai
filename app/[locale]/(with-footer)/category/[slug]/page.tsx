import CategorySidebar from '@/components/Category/CategorySidebar'
import { createClient } from '@/lib/supabase/server'
import { ICategory } from '@/types/gallery'
import { fetchImages } from '@/lib/fetch/gallery'
import GalleryImages from '@/components/Gallery/GalleryImages'
import { Metadata } from 'next'
import { siteConfig, siteName } from '@/config/site'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params

  const supabase = createClient()

  const { data: allCategoryData } = await supabase.from('category').select()
  const allCategory = allCategoryData as ICategory[]

  const currentCategory = allCategory.find(
    (category) => category.secondCategory === slug
  )!

  return {
    title: `${siteName} - Category: ${currentCategory.firstCategory} - ${currentCategory.secondCategory}`,
    description: `${currentCategory.secondCategory} hand drawn art`,
    keywords: [
      ...siteConfig.keywords,
      currentCategory.firstCategory,
      currentCategory.secondCategory,
    ].join(','),
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const supabase = createClient()

  const { data: allCategoryData } = await supabase.from('category').select()
  const allCategory = allCategoryData as ICategory[]

  const currentCategory = allCategory.find(
    (category) => category.secondCategory === slug
  )!

  const imagesByCategory = await fetchImages({ categoryId: currentCategory.id })

  return (
    <div className="mb-16 md:grid md:grid-cols-[200px_1fr] md:gap-4">
      <CategorySidebar category={allCategory} />

      <div>
        <h2 className="h2 mx-auto mt-10 mb-10 max-w-2xl text-center text-purple-900 sm:mb-12 md:mb-20">
          {currentCategory.firstCategory} - {currentCategory.secondCategory}
        </h2>
        <GalleryImages images={imagesByCategory} className="mb-12" />
      </div>
    </div>
  )
}
