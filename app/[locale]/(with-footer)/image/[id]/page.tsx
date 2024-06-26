import GalleryImages from '@/components/Gallery/GalleryImages'
import ImageDetail from '@/components/ImageDetail'
import { siteConfig, siteName } from '@/config/site'
import { fetchImages } from '@/lib/fetch/gallery'
import { IImage } from '@/types/gallery'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params
  const result = (await fetchImages({ imageId: id })) as IImage[]
  const image = result[0]

  return {
    title: `${siteName} - ${image.title}`,
    description: image.content,
    keywords: [
      ...siteConfig.keywords,
      ...(image.tags ?? [])?.map((item) => item.name),
    ].join(','),
  }
}

export default async function Image({ params }: { params: { id: string } }) {
  const t = await getTranslations('Gallery')

  const { id } = params

  const result = (await fetchImages({ imageId: id })) as IImage[]
  const image = result[0]

  const releatedResult = (await fetchImages({
    tagIds: (image.tags ?? []).map((item) => item.id),
  })) as IImage[]
  const releatedImage = releatedResult.filter((item) => item.id !== image.id)

  return (
    <>
      <ImageDetail image={image} />

      <h2 className="h2 mx-auto mt-10 mb-10 max-w-2xl text-center text-purple-900 sm:mb-12 md:mb-20">
        {t('similarImage')}
      </h2>
      <GalleryImages images={releatedImage} className="mb-12" />
    </>
  )
}
