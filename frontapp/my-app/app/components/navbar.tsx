'use client'

import Link from "next/link";
import HamburgerMenu from "./HamburgerMenu";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MemberStateCheck from "./MemberStateCheck";

export default function Navbar() {
    const [member, setMember] = useState(null);

    return (
        <>
            <div className="sticky top-5 flex justify-between mx-5 my-5">
                <HamburgerMenu />
                <MemberStateCheck setMember={setMember} />
                {member === null ?
                    (<Link href="/member/login"><img className="size-10" src="/lock-icon.svg" alt="Locker Icon Image" /></Link>)
                    : (<div>
                        <img className="size-10" src="/user-icon.svg" alt="User Icon Image" />
                        <img className="size-10" src="/logout-icon.svg" alt="Logout Icon Image" />
                    </div>)}
            </div>
        </>
    );
}