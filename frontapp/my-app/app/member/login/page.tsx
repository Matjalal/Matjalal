'use client'
import LoginForm from "@/app/components/loginForm";
import api from "@/app/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Login() {
  const [member, setMember] = useState({ username: '', password: '' })

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
    console.log({ ...member, [name]: value })
  }

  const login = async (e: any) => {
    e.preventDefault()

    return await api
      .post("/members/login", {
        username: member.username,
        password: member.password
      })
      .then(response => response.data.memberDTO)
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['memberInfo'],
    queryFn: login
  });

  if (isLoading) <div>Loading....</div>

  if (error) {
    console.log(error.message)
  }

  const handleLogout = async () => {
    const response = await fetch("http://localhost:8090/api/v1/members/logout", {
      method: 'POST',
      credentials: 'include', // 핵심 변경점
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      alert("ok")
    } else {
      alert("fail")
    }
  }
  return (
    <>
      <button onClick={handleLogout}>로그아웃</button>
      <LoginForm />
    </>
  );
}