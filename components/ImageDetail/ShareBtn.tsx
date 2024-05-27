'use client'

import Button from '@/components/ui/Button'
import Icon from '../Icon'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ShareBtn() {
  const t = useTranslations('Gallery')

  const [isCopy, setIsCopy] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setIsCopy(true)
    } catch (err) {
      console.error('Failed to copy prompt: ', err)
    } finally {
      setTimeout(() => {
        setIsCopy(false)
      }, 3 * 1000)
    }
  }

  return (
    <Button
      variant="secondary"
      size="sm"
      className="mt-10"
      onClick={handleCopy}
    >
      <Icon icon="share3" className="mr-3 h-5 w-5" stroke={2} />
      {isCopy ? t('btn.copied') : t('btn.share')}
    </Button>
  )
}
