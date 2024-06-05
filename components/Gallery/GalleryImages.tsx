'use client'

import dynamic from 'next/dynamic'
import { IImage } from '@/types/gallery'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { configResponsive, useResponsive } from 'ahooks'
import { useMemo } from 'react'
import { responseConfig } from '@/config/common'

// 确保只在客户端渲染
const Masonry = dynamic(() => import('masonic').then((mod) => mod.Masonry), {
  ssr: false,
})

interface IProps {
  images: IImage[]
  className?: string
}

configResponsive(responseConfig)

export default function GalleryImages({ images, className }: IProps) {
  const responsive = useResponsive()

  const columnCount = useMemo(() => {
    if (responsive?.large === true) {
      return 4
    } else if (responsive?.middle === true) {
      return 3
    } else if (responsive?.small === true) {
      return 2
    }

    return 4
  }, [responsive])

  const GalleryImage = ({ image }: { image: IImage }) => {
    const { id, imageUrl, title, tags = [] } = image

    return (
      <Link
        href={`/image/${id}`}
        className="relative group"
        key={`gallery-image-${id}`}
        data-src={imageUrl}
        title={title}
      >
        <div className="relative overflow-hidden rounded-2xl bg-purple-50">
          <Image
            src={imageUrl}
            width={400}
            height={300}
            className="transform rounded-2xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            alt={title}
            sizes="(min-width: 1280px) 19.25rem, (min-width: 1024px) 25vw, (min-width: 768px) 23.25rem, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 px-4 py-2 text-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            <h3 className="text-md font-semibold">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Link
                  href={`/tag/${tag.name}`}
                  key={tag.id}
                  className="rounded-full bg-white bg-opacity-75 px-3 py-1 text-sm text-black hover:bg-gray-200"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div
      className={clsx(
        'mt-12 px-4 sm:mt-16 sm:px-6 lg:mt-20 lg:px-8',
        className
      )}
    >
      <div className="mx-auto max-w-3xl lg:max-w-screen-xl">
        <Masonry
          key={images.length} // 使用key强制重新渲染
          columnCount={columnCount}
          columnGutter={20}
          items={images}
          // @ts-ignore
          render={({ data }) => GalleryImage({ image: data })}
        />
      </div>
    </div>
  )
}
