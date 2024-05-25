'use client'

{
  /* This component uses Lightgallery, a customizable, modular, responsive, lightbox gallery plugin.  https://github.com/sachinchoolur/lightGallery */
}
import { useState } from 'react'
import { useTranslations } from 'next-intl'
// @ts-ignore
import confetti from 'canvas-confetti'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import 'lightgallery/css/lightgallery.css'
import Icon from '../Icon'
import { IconLoader } from '@tabler/icons-react'

export default function WaitingList() {
  const t = useTranslations('Hero')

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
            placeholder={t('waitList.placeholder')}
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
            {t('waitList.button')}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  )
}
