'use client'

import Link from 'next/link';
import { useState } from 'react';

export default function HamburgerMenu() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // 사이드바 토글 함수
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex">
            <button onClick={toggleSidebar}>
                {sidebarOpen ? (
                    <img className="size-10" src="/close-icon.svg" alt="Close Icon Image" />
                ) : (
                    <img className="size-10" src="/menu-icon.svg" alt="Menu Icon Image" />
                )}
            </button>
            <div className={`fixed lg:w-64 bg-gray-800 ${sidebarOpen ? 'left-0' : '-left-64'} mt-12 transition-all opacity-100 duration-300 ease-in-out`}
                style={{ height: '100vh' }}>
                <div className='flex flex-col'>
                    <div className="flex justify-center">
                        <Link className="hover:bg-sky-500 rounded-lg text-white my-2 py-2 px-24" href="/home/index">
                            <img src="/home-icon.svg" alt="home-icon" />Home</Link>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/subway/articles">서브웨이 메뉴 게시판</Link>
                    </div>
                    <div className="flex justify-center">
                        <Link href="/gongcha/articles">공차 메뉴 게시판</Link>
                    </div>
                    <div className="flex justify-center">
                        <Link href="#">랜덤 메뉴 추천</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}