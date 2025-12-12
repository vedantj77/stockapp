'use client'

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = () => {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({ href, label }) => (
                <li key={href} className="p-1">
                    <Link 
                        href={href} 
                        className={`
                            transition-colors duration-200
                            ${isActive(href) 
                                ? 'text-gray-100 hover:text-yellow-500' 
                                : 'text-gray-400 hover:text-yellow-500'
                            }
                        `}
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavItems
