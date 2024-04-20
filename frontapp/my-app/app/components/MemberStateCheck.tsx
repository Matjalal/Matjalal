import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import { useState } from 'react';

export default function MemberStateCheck() {
    const [member, setMember] = useState({ username: '', password: '' });

    const login = async () => {
        const response = await api.post('/members/login', JSON.stringify(member)).catch((e) => {
            console.log(e.response);
        });

        console.log(response);
    };

    const useLogin = () => {
        const queryClient = useQueryClient();

        return useMutation(login, {
            onSuccess: (data: any) => {
                queryClient.setQueryData(['loginStatus'], true); // 로그인 상태를 갱신
            },
        });
    };

    const checkLoginStatus = async () => {
        return await api.get('/members/me');
    };

    const useLoginStatus = () => {
        return useQuery('loginStatus', checkLoginStatus);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        // const name: any = e.target.name;
        // const value = e.target.value;
        setMember({ ...member, [name]: value });
        console.log({ ...member, [name]: value });
    };

    return (
        <>
            <input onChange={handleChange} className="border-2" name="username" type="text" />
            <input onChange={handleChange} className="border-2" name="password" type="text" />
            <button onClick={login}>로그인</button>
        </>
    );
}
