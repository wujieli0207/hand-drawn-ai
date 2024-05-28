interface ICommonInstanceProps {
  id: number
  created_at: Date
}

export interface ITag extends ICommonInstanceProps {
  name: string
  count: number
}

export interface IImage extends Omit<ICommonInstanceProps, 'id'> {
  id: string
  title: string
  content: string
  prompt: string
  imageUrl: string
  thumbnailUrl: string
  tags?: Array<ITag>
  category?: ICategory
}

export interface ICategory extends ICommonInstanceProps {
  firstCategory: string
  secondCategory: string
}
