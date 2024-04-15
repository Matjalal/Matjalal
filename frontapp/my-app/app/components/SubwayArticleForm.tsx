'use client'
import api from "@/app/utils/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import IngredientCheckBox from "./IngredientCheckBox";
type memberInterface = {
    id: number,
    createdDate: string,
    modifiedDate: string,
    username: string,
    email: string
}
interface ingredientsInterface {
    id: string,
    name: string,
    type: string
}

export default function SubwayArticleForm() {
    const idParam = useParams();
    const router = useRouter();
    const [member, setMember] = useState<memberInterface>();
    const [selectedIngredients, setSelectedIngredients] = useState<ingredientsInterface[]>([]);
    const [article, setArticle] = useState({ title: '', content: '' });
    
    useEffect(() => {
        api.get("/members/me")
            .then(response => setMember(response.data.data.memberDTO))
            .catch(err => {
                console.log(err)
            })
    }, [])

    
    
    const handleIngredientChange = (ingredients: ingredientsInterface[]) => {
        setSelectedIngredients(ingredients);
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            await api.post("http://localhost:8090/api/v1/subwayArticles/", {
                title: article.title,
                content: article.content,
                author: member,
                ingredients: selectedIngredients
            });
            console.log("Article updated successfully!");
            // 추가적인 로직이 필요한 경우 여기에 작성
        } catch (error) {
            console.error("An error occurred while updating the article:", error);
            // 에러 처리 로직을 추가할 수 있습니다. 예를 들어, 사용자에게 오류 메시지를 표시하거나 다시 시도할 수 있도록 유도할 수 있습니다.
        }
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        // const name: any = e.target.name;
        // const value = e.target.value;
        setArticle({ ...article, [name]: value });
        console.log({ ...article, [name]: value })
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap lg:w-2/3 w-full  flex-col mx-auto px-8 sm:space-x-4  space-y-4 sm:px-0 ">
                <div className="flex justify-around space-x-4 pl-4">
                    <div className="flex items-center">
                        <span role="img" aria-label="sandwich">🥪</span>
                    </div>
                    <div className="flex items-center">
                        <span role="img" aria-label="bread">🍞</span>
                    </div>
                    <div className="flex items-center">
                        <span role="img" aria-label="cheese">🧀</span>
                    </div>
                    <div className="flex items-center">
                        <span role="img" aria-label="vegetable">🥗</span>
                    </div>
                    <div className="flex items-center">
                        <span role="img" aria-label="sauce">🍅</span>
                    </div>
                </div>                    
                    <div className="flex space-x-4 pl-4">
                    <IngredientCheckBox onIngredientChange={handleIngredientChange} ingredientType="subwayMenu" maxChecked={1}/>
                    <IngredientCheckBox onIngredientChange={handleIngredientChange} ingredientType="bread" maxChecked={1}/>
                    <IngredientCheckBox onIngredientChange={handleIngredientChange} ingredientType="cheese" maxChecked={1}/>
                    <IngredientCheckBox onIngredientChange={handleIngredientChange} ingredientType="vegetable" maxChecked={8}/>
                    <IngredientCheckBox onIngredientChange={handleIngredientChange} ingredientType="sauce" maxChecked={3}/>
                    </div>
                    <div className="relative flex-grow w-full">
                        <label htmlFor="subject" className="leading-7 text-sm text-gray-600">
                            제목
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative flex-grow w-full">
                        <label htmlFor="content" className="leading-7 text-sm text-gray-600">
                            내용
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            className="w-full h-40 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-transparent focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <button className="text-white  bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                        create
                    </button>
                </div>
            </form>
        </>
    );
}