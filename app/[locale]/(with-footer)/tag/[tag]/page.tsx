import GalleryImages from '@/components/Gallery/GalleryImages'
import { siteConfig, siteName } from '@/config/site'
import { fetchImages } from '@/lib/fetch/gallery'
import { createClient } from '@/lib/supabase/server'
import { IImage, ITag } from '@/types/gallery'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { tag: string }
}): Promise<Metadata> {
  const { tag } = params

  return {
    title: `${siteName} - ${tag}`,
    description: `${tag} hand drawn art`,
    keywords: [...siteConfig.keywords, tag].join(','),
  }
}

export default async function Tag({ params }: { params: { tag: string } }) {
  const supabase = createClient()

  const { data: tagsData } = await supabase.from('tag').select()
  const tags = tagsData as ITag[]

  const { tag } = params

  const tagId = tags.find((item) => item.name === tag)?.id!

  const imagesByTagName = (await fetchImages({ tagIds: [tagId] })) as IImage[]

  return (
    <>
      <h2 className="h2 mx-auto mt-10 mb-10 max-w-2xl text-center text-purple-900 sm:mb-12 md:mb-20">
        {tag}
      </h2>
      <GalleryImages images={imagesByTagName} className="mb-12" />
    </>
  )
}
