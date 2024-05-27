'use client'

// @ts-ignore
import confetti from 'canvas-confetti'
import Button from '@/components/ui/Button'
import Icon from '../Icon'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface IProps {
  prompt: string
}

export default function CopyPromptBtn({ prompt }: IProps) {
  const t = useTranslations('Gallery')

  const [isCopy, setIsCopy] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setIsCopy(true)
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
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
      <Icon icon="copy" className="mr-3 h-5 w-5" stroke={2} />
      {isCopy ? t('btn.copied') : t('btn.copyPrompt')}
    </Button>
  )
}
