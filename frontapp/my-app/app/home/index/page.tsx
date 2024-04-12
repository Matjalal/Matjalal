'use client'

import LoginForm from "@/app/components/loginForm";
import Link from "next/link"

export default function HomeIndex() {

    return (
        <>
            <div className="text-6xl flex justify-center mt-24">
                <img src="/main-title.svg" alt="MainTitle Image" />
            </div>
            <div className="flex justify-center">
                <LoginForm></LoginForm>
            </div>
            <div className="top-section mb-5">
                <div className="container flex justify-between">
                    <div className="img-box transform -skew-x-12">
                        <img src="/subway-title.svg" alt="Subway Image" />
                        <Link href="/subway/articles" className="bg-black-box">
                            <div className="top-box">서브웨이 조합 추천</div>
                            <div className="bottom-box">
                                <div>바로가기</div>
                            </div>
                        </Link>
                    </div>
                    <div className="img-box transform -skew-x-12">
                        <img src="/gongcha-title.svg" alt="Gongcha Image" />
                        <Link href="/gongcha/articles" className="bg-black-box">
                            <div className="top-box">공차 조합 추천</div>
                            <div className="bottom-box">
                                <div>바로가기</div>
                            </div>
                        </Link>
                    </div>
                    <div className="img-box transform -skew-x-12">
                        <img src="/randombox-title.svg" alt="Gongcha Image" />
                        <Link href="/member/login" className="bg-black-box">
                            <div className="top-box">랜덤 메뉴 추천 받기</div>
                            <div className="bottom-box">
                                <div>바로가기</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <br></br>
        </>
    );
}