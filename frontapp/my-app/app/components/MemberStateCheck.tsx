import { useQuery } from "@tanstack/react-query";
import { MemberInterface } from "../interface/member/MemberInterfaces";
import api from "../utils/api";

export default function MemberStateCheck({ setMember }) {

    const getMember = () => {
        return api
            .get("/members/me")
            .then(response => response.data.data.memberDTO)
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['member'],
        queryFn: getMember,
    })

    if (error) {
        console.log(error.message)
    }

    if (isLoading) <div>Loading...</div>

    if (data) setMember(data);
}