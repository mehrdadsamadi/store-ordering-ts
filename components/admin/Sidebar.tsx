"use client"

import Link from 'next/link'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Home,
    ShoppingCart,
    Users2,
    Tag,
    Flag,
    Box,
    List,
    SwatchBook,
    LogOut
} from "lucide-react"
import { usePathname } from 'next/navigation'
import { cn, handleLogout } from '@/lib/utils'
import { Separator } from '../ui/separator'
import ConfirmButtton from '../ConfirmButtton'
import CustomDialog from '../CustomDialog'

const Sidebar = () => {
    const path = usePathname()

    return (
        <aside className="fixed inset-y-0 right-0 z-10 hidden w-14 flex-col border-l bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/profile"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path === '/admin' && 'bg-accent text-accent-foreground')}
                        >
                            <Home className="h-5 w-5" />
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>MS</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">پروفایل</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">پروفایل</TooltipContent>
                </Tooltip>
                <Separator />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path === '/admin' && 'bg-accent text-accent-foreground')}
                        >
                            <Home className="h-5 w-5" />
                            <span className="sr-only">داشبورد</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">داشبورد</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/categories"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path.includes('categories') && 'bg-accent text-accent-foreground')}
                        >
                            <Tag className="h-5 w-5" />
                            <span className="sr-only">دسته بندی ها</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">دسته بندی ها</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/brands"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path.includes('brands') && 'bg-accent text-accent-foreground')}
                        >
                            <Flag className="h-5 w-5" />
                            <span className="sr-only">برند ها</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">برند ها</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/products"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path.includes('products') && 'bg-accent text-accent-foreground')}
                        >
                            <Box className="h-5 w-5" />
                            <span className="sr-only">محصولات</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">محصولات</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/specifications"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path.includes('specifications') && 'bg-accent text-accent-foreground')}
                        >
                            <List className="h-5 w-5" />
                            <span className="sr-only">مشخصات</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">مشخصات</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/features"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path.includes('features') && 'bg-accent text-accent-foreground')}
                        >
                            <SwatchBook className="h-5 w-5" />
                            <span className="sr-only">ویژگی ها</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">ویژگی ها</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/orders"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path.includes('orders') && 'bg-accent text-accent-foreground')}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">سفارشات</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">سفارشات</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/admin/users"
                            className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', path.includes('users') && 'bg-accent text-accent-foreground')}
                        >
                            <Users2 className="h-5 w-5" />
                            <span className="sr-only">کاربر ها</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">کاربر ها</TooltipContent>
                </Tooltip>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <ConfirmButtton
                    triggerBtnText={<LogOut color='red' className="h-5 w-5" />}
                    title='خروج'
                    description='برای خروج مطمعن هستید؟'
                    onSubmit={handleLogout}
                />
            </nav>
        </aside>
    )
}

export default Sidebar