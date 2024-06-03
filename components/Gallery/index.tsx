'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { IImage, ITag } from '@/types/gallery'
import { useTranslations } from 'next-intl'
import GalleryImages from './GalleryImages'

interface IProps {
  gallery: IImage[]
  tags: ITag[]
}

export default function Gallery({ gallery, tags }: IProps) {
  const t = useTranslations('Gallery')

  const [galleryImages, setGalleryImages] = useState(gallery)
  const [selectedTag, setSelectedTag] = useState('all')

  useEffect(() => {
    setGalleryImages(
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

  return (
    <section>
      <GalleryTabs />
      <GalleryImages
        images={galleryImages}
        className="-translate-y-56 -mb-48"
      />
    </section>
  )
}
