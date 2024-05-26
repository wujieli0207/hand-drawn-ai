import { getTranslations } from 'next-intl/server'
import WaitingList from './WaitingList'
import HeroImages from './HeroImages'

export default async function GalleryHero() {
  const t = await getTranslations('Hero')

  return (
    <section className="w-full relative bg-purple-25 px-4 pt-16 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="mx-auto max-w-screen-xl">
        {/* Hero header text */}
        <div className="relative">
          <div className="flex justify-center">
            <span className="inline-block -rotate-1 rounded-full bg-purple-200 px-4 py-2 font-medium text-purple-700 shadow-md">
              {/* Unique art for every need */}
              {t('comingSoon')}
            </span>
          </div>
          <h1 className="h1 mx-auto mt-4 max-w-3xl text-center text-purple-900">
            {t('title')}
          </h1>
          <div className="relative">
            <p className="mx-auto mt-4 max-w-2xl text-center text-xl leading-relaxed text-purple-800 sm:mt-5">
              {t('subTitle')}
            </p>
          </div>

          <WaitingList />
        </div>
      </div>

      <HeroImages />
    </section>
  )
}
