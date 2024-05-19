'use client'

{
  /* This component uses Lightgallery, a customizable, modular, responsive, lightbox gallery plugin.  https://github.com/sachinchoolur/lightGallery */
}
import { useState } from 'react'
import Image from 'next/image'
import LightGallery from 'lightgallery/react'

// @ts-ignore
import confetti from 'canvas-confetti'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import heroImage1 from '/public/images/stock/gallery/gallery-hero-01.jpg'
import heroImage2 from '/public/images/stock/gallery/gallery-hero-02.jpg'
import heroImage3 from '/public/images/stock/gallery/gallery-hero-03.jpg'
import heroImage4 from '/public/images/stock/gallery/gallery-hero-04.jpg'
import heroImage5 from '/public/images/stock/gallery/gallery-hero-05.jpg'
import heroImage6 from '/public/images/stock/gallery/gallery-hero-06.jpg'

import 'lightgallery/css/lightgallery.css'
import Icon from './Icon'
import { IconLoader } from '@tabler/icons-react'

export default function GalleryHero() {
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: email }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(
          'Thank you for subscribing! We will notify you when we launch.',
          {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        )

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      } else {
        toast.error('Failed to subscribe. Please try again later.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false) // Set loading state to false
    }
  }

  return (
    <section className="h-full relative bg-purple-25 px-4 pt-16 sm:px-6 lg:px-8">
      {/* Container */}
      <div className="mx-auto max-w-screen-xl">
        {/* Hero header text */}
        <div className="relative">
          <div className="flex justify-center">
            <span className="inline-block -rotate-1 rounded-full bg-purple-200 px-4 py-2 font-medium text-purple-700 shadow-md">
              {/* Unique art for every need */}
              Coming Soon
            </span>
          </div>
          <h1 className="h1 mx-auto mt-4 max-w-3xl text-center text-purple-900">
            Where Hand Drawn Art Meets AI Magic
          </h1>
          <div className="relative">
            <p className="mx-auto mt-4 max-w-2xl text-center text-xl leading-relaxed text-purple-800 sm:mt-5">
              Elevate your branding, marketing, and personal projects with
              unique AI-enhanced hand drawn art.
            </p>
          </div>
          {/* join waiting list */}
          <div className="mt-8 flex items-center justify-center">
            <div className="relative h-14 w-full max-w-xl rounded-full">
              {/* Newsletter signup form */}
              <form onSubmit={handleSubmit}>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* Heroicon name: solid/mail */}
                  <Icon icon="mail" className="h-6 w-6 text-purple-500" />
                </div>
                <input
                  type="email"
                  className="h-14 w-full rounded-full border-0 border-transparent bg-white py-3.5 pl-12 pr-24 leading-5 text-purple-700 placeholder-purple-700 duration-300  focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  placeholder="Join waiting list"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-1.5 top-1.5 inline-flex h-11 items-center rounded-full bg-yellow-400 px-4 py-2 text-sm text-purple-900 outline-none duration-300 ease-in-out hover:bg-yellow-600 focus:outline-none sm:font-medium md:px-6"
                >
                  {isLoading && <IconLoader className="animate-spin mr-2" />}
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Hero images */}
        <LightGallery speed={500} selector="figure">
          <div
            id="hero-gallery"
            className="relative z-10 mt-14 grid grid-cols-12 gap-4 sm:mt-16 sm:gap-6 md:mt-20 lg:mt-24 lg:gap-10 lg:px-4 xl:gap-12 2xl:px-16"
          >
            <div className="col-span-4 flex flex-col md:col-span-2 md:justify-end">
              {/* Image 1 */}
              <figure
                className="group aspect-h-1 aspect-w-1 relative w-full cursor-pointer hover:z-50"
                data-src={heroImage1.src}
              >
                <Image
                  src={heroImage1}
                  className="absolute inset-0 h-full w-full rotate-3 rounded-2xl object-cover object-center shadow-2xl duration-300 ease-in-out group-hover:rotate-0 group-hover:scale-110 md:-translate-y-12 md:translate-x-3 md:-rotate-8"
                  alt="Vintage Rabbit Illustration"
                  sizes="(min-width: 1280px) 11.875rem, (min-width: 768px) 16.67vw, 33vw"
                />
              </figure>
            </div>
            <div className="col-span-8 flex md:col-span-3 md:flex-col">
              {/* Image 2 */}
              <div className="mr-2 w-1/2 sm:mr-3 md:mr-0 md:w-full">
                <figure
                  className="group aspect-h-1 aspect-w-1 relative z-10 cursor-pointer hover:z-50"
                  data-src={heroImage2.src}
                >
                  <Image
                    src={heroImage2}
                    className="absolute inset-0 h-full w-full -rotate-3 rounded-2xl object-cover object-center shadow-2xl duration-300 ease-in-out group-hover:rotate-0 group-hover:scale-110 md:-rotate-8"
                    alt="Majestic Horse Sketch"
                    sizes="(min-width: 1280px) 17.875rem, (min-width: 768px) 25vw, 33vw"
                  />
                </figure>
              </div>

              {/* Image 3 */}
              <div className="relative ml-2 w-1/2 sm:ml-3 md:ml-6">
                <figure
                  className="group aspect-h-1 aspect-w-1 cursor-pointer hover:z-50"
                  data-src={heroImage3.src}
                >
                  <Image
                    src={heroImage3}
                    className="absolute inset-0 h-full w-full rotate-3 rounded-2xl object-cover object-center shadow-2xl duration-300 ease-in-out group-hover:rotate-0 group-hover:scale-110 md:rotate-8"
                    alt="Vintage Telephone Art"
                    sizes="(min-width: 1280px) 9rem, (min-width: 768px) 12.5vw, 33vw"
                  />
                </figure>
              </div>
            </div>
            <div className="col-span-4 md:col-span-4 md:pr-4">
              {/* Image 4 */}
              <figure
                className="group aspect-h-1 aspect-w-1 relative w-full cursor-pointer hover:z-50"
                data-src={heroImage4.src}
              >
                <Image
                  src={heroImage4}
                  className="absolute inset-0 h-full w-full -rotate-3 rounded-2xl object-cover object-center shadow-2xl duration-300 ease-in-out group-hover:rotate-0 group-hover:scale-110 md:rotate-4"
                  alt="Quaint Urban Sketch"
                  sizes="(min-width: 1280px) 22.5rem, 33vw"
                />
              </figure>
            </div>
            <div className="col-span-8 flex md:col-span-3 md:translate-y-12 md:flex-col md:pr-3">
              {/* Image 5 */}
              <div className="mr-2 w-1/2 sm:mr-3 md:mr-0 md:w-full">
                <figure
                  className="group aspect-h-1 aspect-w-1 relative z-10 cursor-pointer hover:z-50"
                  data-src={heroImage5.src}
                >
                  <Image
                    src={heroImage5}
                    className="absolute inset-0 h-full w-full rotate-3 rounded-2xl object-cover object-center shadow-2xl duration-300 ease-in-out group-hover:rotate-0 group-hover:scale-110 md:rotate-12"
                    alt="Artistic Ocean Sketch"
                    sizes="(min-width: 1280px) 17.875rem, (min-width: 768px) 25vw, 33vw"
                  />
                </figure>
              </div>

              {/* Image 6 */}
              <div className="relative ml-2 w-1/2 sm:ml-3 md:-ml-3 md:w-2/3 lg:-ml-6">
                <figure
                  className="group aspect-h-1 aspect-w-1 relative cursor-pointer hover:z-50 md:-translate-y-6"
                  data-src={heroImage6.src}
                >
                  <Image
                    src={heroImage6}
                    className="absolute inset-0 h-full w-full -rotate-3 rounded-2xl object-cover object-center shadow-2xl duration-300 ease-in-out group-hover:rotate-0 group-hover:scale-110 md:-rotate-8"
                    alt="Elegant Rose Drawing"
                    sizes="(min-width: 1280px) 11.375rem, (min-width: 768px) 16.67vw, 33vw"
                  />
                </figure>
              </div>
            </div>
          </div>
        </LightGallery>
      </div>

      <ToastContainer />
    </section>
  )
}
