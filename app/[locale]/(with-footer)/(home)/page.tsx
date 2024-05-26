import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero/index'
import { fetchImages } from '@/lib/fetch/gallery'
import { createClient } from '@/lib/supabase/server'
import { IImage, ITag } from '@/types/gallery'

export default async function Home() {
  const supabase = createClient()

  const { data: tagsData } = await supabase.from('tag').select()
  const tags = tagsData as ITag[]

  const result = await fetchImages()
  const images = result as IImage[]

  return (
    <>
      <Hero />
      <Gallery tags={tags} gallery={images} />
    </>
  )
}
