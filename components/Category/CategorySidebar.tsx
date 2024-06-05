'use client'

import { ICategory } from '@/types/gallery'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'

interface NavLinkProps {
  children: ReactNode
  href: string
  className?: string
  active?: string
}

// NavLink component
const NavLink = ({
  children,
  href = '',
  className = '',
  active = '',
}: NavLinkProps) => {
  const [pathname, setPathname] = useState('/')

  const isActive = pathname.includes(href)
  const activeClass = isActive ? active : ''

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  return (
    <Link href={href} className={`${activeClass} ${className}`}>
      {children}
    </Link>
  )
}

interface TitleProps {
  children: ReactNode
}

// Title component
const Title = ({ children }: TitleProps) => (
  <h3 className="pb-3 px-4 font-medium text-gray-800 md:px-8">{children}</h3>
)

interface SectionsListProps {
  items: { name: string; href: string }[]
}

// Sections List
const SectionsList = ({ items }: SectionsListProps) => (
  <div className="text-gray-600 px-4 md:px-8">
    <ul>
      {items?.map((item) => (
        <li key={item.href}>
          <NavLink
            href={`/category/${item?.href}`}
            active="text-gray-900 border-indigo-600"
            className="block w-full py-2 px-4 border-l hover:border-purple-400 hover:text-purple-900 duration-150"
          >
            {item?.name}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
)

interface IProps {
  category: ICategory[]
}

const CategorySidebar = ({ category }: IProps) => {
  // 将category数据构建为一级和二级分类结构
  const categoryMap = category.reduce((acc, curr) => {
    if (!acc[curr.firstCategory]) {
      acc[curr.firstCategory] = []
    }
    acc[curr.firstCategory].push({
      name: curr.secondCategory,
      href: curr.secondCategory,
    })
    return acc
  }, {} as Record<string, { name: string; href: string }[]>)

  return (
    <nav className="mt-8 mb-12 border-r w-full h-full bg-white space-y-8 overflow-auto">
      <div className="text-[0.9rem] space-y-6">
        {Object.keys(categoryMap).map((firstCategory, idx) => (
          <div key={idx}>
            <Title>{firstCategory}</Title>
            <SectionsList items={categoryMap[firstCategory]} />
          </div>
        ))}
      </div>
    </nav>
  )
}

export default CategorySidebar
