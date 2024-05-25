import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="mx-auto flex w-full flex-1">{children}</main>
    </>
  )
}
