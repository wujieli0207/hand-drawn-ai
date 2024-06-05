import CategorySidebar from '@/components/Category/CategorySidebar'
import { createClient } from '@/lib/supabase/server'
import { ICategory } from '@/types/gallery'
import { fetchImages } from '@/lib/fetch/gallery'
import GalleryImages from '@/components/Gallery/GalleryImages'

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
    <div className="grid grid-cols-[200px_1fr] gap-4 mb-16">
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
