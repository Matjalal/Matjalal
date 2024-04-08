import Link from "next/link";
export default function Home() {
  console.log( )
  return (
    <>
    홈입니다.
    <br/>
    <Link href="/auth/login">로그인창</Link>
    </>
  );
}
