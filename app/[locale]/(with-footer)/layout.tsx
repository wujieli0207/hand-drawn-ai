import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="mx-auto w-full">{children}</main>
    </>
  )
}
