"use client";
import { useEffect, useState } from "react";
import api from "../utils/api";
import Link from "next/link";
import SearchBox from "./searchBox";
import { ArticleInterface } from "../interface/article/ArticleInterfaces";
interface SubwayArticleBoxProps {
    brand: string;
}
const ArticleBox: React.FC<SubwayArticleBoxProps> = ({ brand }) => {
    const [articles, setArticles] = useState<ArticleInterface[]>([]);
    const dynamicPath = `/${brand}/`;

    const fetchArticles = () => {
        api.get(`/articles/${brand}/brands`)
            .then((response) => setArticles(response.data.data.articles))
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <>
            <SearchBox brand={brand} setArticles={setArticles} />
            <div className="flex flex-wrap -m-4">
                {articles.map((article) => (
                    <div key={article.id} className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-200 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-100 text-green-500 mb-4">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                                <Link href={dynamicPath + article.id}>{article.subject}</Link>
                            </h2>
                            {/* 게시글 등록 시 작성자 추가하면 주석 해제하기 */}
                            {/* <p className="leading-relaxed text-base">
              {article.author.username}
            </p> */}
                            <p className="leading-relaxed text-base">{article.createdDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
export default ArticleBox;
