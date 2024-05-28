import { IImage, ITag } from '@/types/gallery'
import { createClient } from '@/lib/supabase/server'

interface IParams {
  imageId?: string
  tagIds?: Array<ITag['id']>
}

export async function fetchImages(params?: IParams): Promise<IImage[]> {
  const { imageId, tagIds } = params ?? {}

  const supabase = createClient()

  let query = supabase.from('image').select(`
    id,
    created_at,
    title,
    content,
    prompt,
    imageUrl,
    thumbnailUrl,
    category:category(
      id,
      created_at,
      firstCategory,
      secondCategory
    ),
    tags:image_tag_rel (
      tag:tag (
        id,
        created_at,
        name,
        count
      )
    )
  `)

  if (typeof imageId === 'string') {
    query = query.eq('id', imageId)
  }

  if (Array.isArray(tagIds) && tagIds.length > 0) {
    query = query.in('image_tag_rel.tagId', tagIds)
  }

  const { data: imagesData, error } = await query
  console.log('imagesData: ', imagesData)

  if (error) {
    console.error('Error fetching images:', error)
    return []
  }

  const images: IImage[] = imagesData.map((image: any) => ({
    id: image.id,
    created_at: new Date(image.created_at),
    title: image.title,
    content: image.content,
    prompt: image.prompt,
    imageUrl: image.imageUrl,
    thumbnailUrl: image.thumbnailUrl,
    tags: image.tags.map((tagRel: any) => ({
      id: tagRel.tag.id,
      created_at: new Date(tagRel.tag.created_at),
      name: tagRel.tag.name,
      count: tagRel.tag.count,
    })),
    category: image.category
      ? {
          id: image.category.id,
          created_at: new Date(image.category.created_at),
          firstCategory: image.category.firstCategory,
          secondCategory: image.category.secondCategory,
        }
      : undefined,
  }))

  return images
}
