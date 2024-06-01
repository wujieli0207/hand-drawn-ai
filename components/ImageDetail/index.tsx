// import Image from 'next/image'
import { Image } from 'antd'
import { IImage } from '@/types/gallery'
import CopyPromptBtn from './CopyPromptBtn'
import DownloadImageBtn from './DownloadImageBtn'
import ShareBtn from './ShareBtn'

interface IProps {
  image: IImage
}

export default function ImageDetail({ image }: IProps) {
  const {
    imageUrl,
    content: imageContent,
    title: imageTitle,
    prompt: imagePrompt,
  } = image

  return (
    <section className="relative w-full pt-8 px-4 pb-16 sm:px-6 sm:pb-24 xl:px-8">
      {/* Container */}
      <div className="mx-auto max-w-xl lg:max-w-screen-xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 xl:grid-cols-11 xl:gap-24">
          {/* Text content */}
          <div className="flex flex-col justify-center p-8 border rounded-md lg:order-2 lg:col-span-1 xl:col-span-6">
            {/* <span className="inline-block -rotate-1 rounded-full bg-purple-200 px-4 py-2 font-medium text-purple-700 shadow-md">
                AI Generated
              </span> */}
            <h2 className="h2 text-purple-900">{imageTitle}</h2>
            <p className="mt-4 max-w-xl text-xl leading-relaxed text-purple-800 md:mt-5">
              {imageContent}
            </p>
            <p className="space-x-4">
              <DownloadImageBtn title={imageTitle} url={imageUrl} />
              <ShareBtn />
            </p>
            {/* Teacher qualifications box */}
            <div className="relative mt-16 max-w-4xl rounded-xl bg-yellow-100 sm:mt-14">
              {/* <span className="absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-600 shadow-md sm:left-10">
                <Icon icon="certificate" className="h-8 w-8 text-purple-50" />
              </span> */}
              <div className="mt-2 px-4 py-10 sm:px-10 sm:py-12">
                <h3 className="font-semibold text-purple-900 sm:text-xl">
                  prompt
                </h3>
                {/* Teacher qualifications list */}
                <p className="mt-5 space-y-5 text-lg text-purple-800">
                  {imagePrompt}
                </p>
                <CopyPromptBtn prompt={imagePrompt} />
              </div>
            </div>
          </div>
          {/* Featured teachers section */}
          <div className="mx-auto grid items-center w-full gap-10 px-8 border rounded-md sm:mx-0 sm:max-w-none sm:grid-cols-1 sm:gap-8 lg:order-1 lg:col-span-1 lg:gap-4 xl:col-span-5 xl:gap-8">
            <div className="flex justify-center items-center w-full h-full">
              {/* <Image
                className="rounded-3xl object-contain"
                src={imageUrl}
                // layout="responsive"
                layout="fill"
                objectFit="contain"
                // width={400} // 设置固定宽度
                // height={300} // 高度将根据图片比例自适应
                // sizes="(min-width: 1280px) 15.6rem, (min-width: 1024px) 20.8vw, (min-width: 640px) 17rem, 100vw"
                alt={imageContent}
              /> */}
              <Image
                className="rounded-xl object-contain"
                style={{ width: '100%', height: 'auto', maxHeight: '700px' }}
                src={imageUrl}
                alt={imageContent}
              />
              {/* <Image
                className="rounded-3xl object-contain"
                // layout="fill"
                // objectFit="contain"
                width={400} // 设置固定宽度
                height={300} // 高度将根据图片比例自适应
                src={imageUrl}
                alt={imageContent}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
