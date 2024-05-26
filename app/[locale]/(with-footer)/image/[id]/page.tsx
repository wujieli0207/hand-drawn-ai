import ImageDetail from '@/components/ImageDetail'
import { fetchImages } from '@/lib/fetch/gallery'
import { IImage } from '@/types/gallery'

export default async function Image({ params }: { params: { id: string } }) {
  const { id } = params

  const result = await fetchImages(Number(id))
  const image = result as IImage[]

  return (
    <>
      <ImageDetail image={image[0]} />
    </>
  )
}
