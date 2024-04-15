'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function HamburgerMenu() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex">
            <button><img className="size-10" onClick={() => setSidebarOpen(!sidebarOpen)} src="/menu-icon.svg" alt="Menu Icon Image" /></button>
            <div className={`fixed lg:w-64 bg-gray-200 ${sidebarOpen ? 'left-0' : '-left-64'} mt-12 transition-all opacity-90 duration-300 ease-in-out`}
                style={{ height: '100vh' }}>
                <ul className='grid grid-cols-1 gap-4'>
                    <li>
                        <Link href="/home/index">홈</Link>
                    </li>
                    <li>
                        <Link href="/subway/articles">서브웨이 메뉴 게시판</Link>
                    </li>
                    <li>
                        <Link href="/gongcha/articles">공차 메뉴 게시판</Link>
                    </li>
                    <li>
                        <Link href="#">랜덤 메뉴 추천</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}