import React, {useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import {fetchDeletedArticles} from "../redux/slices/ArticleSlice"
import { fetchUserMarks } from "../redux/slices/UserSlice";
import '../styles/CreatedArticles.scss'
const CreatedArticles = () => {
    const user = useAppSelector((state) => state.auth.data);
    
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const onClickRemove = (id: string) => {
        dispatch(fetchDeletedArticles(id)).then(() => dispatch(fetchUserMarks()))
    }

    return (
        <>
        <div className="passedTestItem">
                            <h1>Name:</h1>
                        </div>
            {user?.createdArticles ? (
                user?.createdArticles.map((item) => (
                    
                    <div
                        className="passedTestItem"
                        key={item.articleId}
                        onClick={() =>
                            navigate(`/viewArticle/${item.articleId}`)
                        }
                    >
                        <h1>{item.name}</h1>
                        <h1 className="x" onClick={(e) => {
                            e.stopPropagation()
                            onClickRemove(item.articleId)
                        }}>x</h1>
                    </div>
                ))
                
            ) : (
                <div>
                    <h1 style={{ color: "white" }}>Вы еще не cоздавали статьи</h1>
                </div>
            )}
        </>
    );
};

export default CreatedArticles;
