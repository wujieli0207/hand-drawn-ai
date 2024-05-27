'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { IImage, ITag } from '@/types/gallery'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

// 确保只在客户端渲染
const Masonry = dynamic(() => import('masonic').then((mod) => mod.Masonry), {
  ssr: false,
})

interface IProps {
  gallery: IImage[]
  tags: ITag[]
}

export default function Gallery({ gallery, tags }: IProps) {
  const t = useTranslations('Gallery')

  const [galleryPhotos, setGalleryPhotos] = useState(gallery)
  const [selectedTag, setSelectedTag] = useState('all')

  useEffect(() => {
    setGalleryPhotos(
      selectedTag === 'all'
        ? [...gallery]
        : gallery.filter(
            (image) =>
              image.tags && image.tags.map((t) => t.name).includes(selectedTag)
          )
    )
  }, [selectedTag, gallery])

  const GalleryTabs = () => {
    return (
      <>
        <div className="bg-purple-25 px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-36">
          <div className="mx-auto max-w-screen-xl">
            <h2 className="h2 mx-auto mb-10 max-w-2xl text-center text-purple-900 sm:mb-12 md:mb-20">
              {t('title')}
            </h2>
            <ul className="-my-2 flex flex-wrap items-center justify-center space-x-2 text-sm font-medium sm:space-x-4 lg:space-x-6">
              <li className="my-2">
                <button
                  className={clsx(
                    'inline-flex items-center justify-center rounded-full px-4 py-1.5 duration-300 ease-in-out sm:text-lg',
                    selectedTag === 'all'
                      ? 'bg-purple-600 text-purple-25 hover:bg-purple-500'
                      : 'bg-white text-purple-700 shadow-sm hover:bg-purple-100'
                  )}
                  onClick={() => setSelectedTag('all')}
                >
                  All images
                </button>
              </li>
              {tags.map((tag, index) => (
                <li key={`tag-${index}`} className="my-2">
                  <button
                    className={clsx(
                      'inline-flex items-center justify-center rounded-full px-4 py-1.5 duration-300 ease-in-out sm:text-lg',
                      selectedTag === tag.name
                        ? 'bg-purple-600 text-purple-25 hover:bg-purple-500'
                        : 'bg-white text-purple-700 shadow-sm hover:bg-purple-100'
                    )}
                    onClick={() => setSelectedTag(tag.name)}
                  >
                    {tag.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Background for overlay effect */}
        <div className="h-56 w-full bg-purple-25" />
      </>
    )
  }

  const GalleryPhotos = ({ data }: { data: IImage }) => {
    const { imageUrl, content } = data

    return (
      <Link
        href={`/image/${data.id}`}
        className="relative rounded-2xl bg-purple-50"
        key={`gallery-image-${data.id}`}
        data-src={imageUrl}
        title={data.title}
      >
        <Image
          src={imageUrl}
          width={400}
          height={300}
          className="rounded-2xl object-cover"
          alt={content}
          sizes="(min-width: 1280px) 19.25rem, (min-width: 1024px) 25vw, (min-width: 768px) 23.25rem, (min-width: 640px) 50vw, 100vw"
        />
      </Link>
    )
  }

  return (
    <section>
      <GalleryTabs />

      {/* Gallery */}
      <div className="-mb-48 mt-12 -translate-y-56 px-4 sm:mt-16 sm:px-6 lg:mt-20 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-screen-xl">
          <Masonry
            key={galleryPhotos.length} // 使用key强制重新渲染
            columnCount={4}
            columnGutter={20}
            items={galleryPhotos}
            // @ts-ignore
            render={GalleryPhotos}
          />
        </div>
      </div>
    </section>
  )
}
