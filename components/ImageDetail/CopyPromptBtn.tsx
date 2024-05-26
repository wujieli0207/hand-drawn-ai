'use client'

// @ts-ignore
import confetti from 'canvas-confetti'
import Button from '@/components/ui/Button'
import Icon from '../Icon'

interface IProps {
  prompt: string
}

export default function CopyPromptBtn({ prompt }: IProps) {
  const handleCopy = async () => {
    if (prompt) {
      try {
        await navigator.clipboard.writeText(prompt)
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      } catch (err) {
        console.error('Failed to copy prompt: ', err)
      }
    }
  }

  return (
    <Button variant="accent" size="sm" className="mt-10" onClick={handleCopy}>
      <Icon
        icon="copy"
        className="mr-3 h-5 w-5 group-hover:animate-horizontal-bounce"
        stroke={2}
      />
      Copy prompt
    </Button>
  )
}
