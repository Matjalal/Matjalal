'use client'

import Link from "next/link"

export default function HomeIndex() {

    return (
        <>
            <div className="text-6xl flex justify-center my-32">
                <img src="/main-title.svg" alt="MainTitle Image" />
            </div>
            <div className="top-section mb-5">
                <div className="container flex justify-between">
                    <div className="img-box transform -skew-x-12">
                        <img src="/subway-title.svg" alt="Subway Image" />
                        <div className="bg-black-box">
                            <div className="top-box">"서브웨이 메뉴 추천"</div>
                            <div className="bottom-box">
                                <Link href="/article" className="btn-box">더보기</Link>
                            </div>
                        </div>
                    </div>
                    <div className="img-box transform -skew-x-12">
                        <img src="/gongcha-title.svg" alt="Gongcha Image" />
                        <div className="bg-black-box">
                            <div className="top-box">공차 메뉴 추천</div>
                            <div className="bottom-box">
                                <Link href="/about" className="btn-box">더보기</Link>
                            </div>
                        </div>
                    </div>
                    <div className="img-box transform -skew-x-12">
                        <img src="/randombox-title.svg" alt="Gongcha Image" />
                        <div className="bg-black-box">
                            <div className="top-box">랜덤 메뉴 추천</div>
                            <div className="bottom-box">
                                <Link href="/member/login" className="btn-box">더보기</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </>
    );
}