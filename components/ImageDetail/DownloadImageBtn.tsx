'use client'

// @ts-ignore
import confetti from 'canvas-confetti'
import Button from '@/components/ui/Button'
import Icon from '../Icon'
import { siteName } from '@/config/site'
import { removeBlank } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface IProps {
  title: string
  url: string
}

export default function DownloadImageBtn({ url, title }: IProps) {
  const t = useTranslations('Gallery')

  const handleDownload = async () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const blob = await response.blob()
      const urlObject = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = urlObject

      const suffix = url.split('?')[0].split('.').pop()
      const download = `${removeBlank(siteName, '_')}-${removeBlank(
        title,
        '_'
      )}-${new Date().getTime()}.${suffix}`
      link.download = download

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(urlObject)
    } catch (error) {
      console.error('Error downloading the image:', error)
    }
  }

  return (
    <Button
      variant="accent"
      size="sm"
      className="mt-10"
      onClick={handleDownload}
    >
      <Icon
        icon="download"
        stroke={2}
        className="mr-3 h-5 w-5 group-hover:animate-bounce"
      />
      {t('btn.download')}
    </Button>
  )
}
