'use client'

import { ICategory } from '@/types/gallery'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { Drawer, Button, ConfigProvider } from 'antd'
import { configResponsive, useResponsive } from 'ahooks'
import { responseConfig } from '@/config/common'
import Icon from '../Icon'

configResponsive(responseConfig)

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
  const responsive = useResponsive()
  const [drawerVisible, setDrawerVisible] = useState(false)

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

  const sidebarContent = (
    <div className="text-[0.9rem] space-y-6">
      {Object.keys(categoryMap).map((firstCategory, idx) => (
        <div key={idx}>
          <Title>{firstCategory}</Title>
          <SectionsList items={categoryMap[firstCategory]} />
        </div>
      ))}
    </div>
  )

  return (
    <>
      {responsive?.middle !== true ? (
        <>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBorderColor: '#6260b5',
                  defaultHoverColor: '#6260b5',
                },
              },
            }}
          >
            <Button
              type="default"
              size="large"
              className="fixed top-1/2 -left-1 transform -translate-y-1/2 px-0"
              style={{ zIndex: 1000 }}
              onClick={() => setDrawerVisible(true)}
            >
              <Icon icon="chevronsRight" className="h-4 w-4" stroke={2} />
            </Button>
            <Drawer
              placement="left"
              closable={false}
              width="200"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
            >
              {sidebarContent}
            </Drawer>
          </ConfigProvider>
        </>
      ) : (
        <nav className="mt-8 mb-12 border-r w-full h-full bg-white space-y-8 overflow-auto">
          {sidebarContent}
        </nav>
      )}
    </>
  )
}

export default CategorySidebar
