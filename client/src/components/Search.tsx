import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, SubmitHandler } from "react-hook-form";
import { filterTest } from "../redux/slices/TestsSlice";
import { fetchTests } from "../redux/slices/TestsSlice";
import { useAppDispatch } from "../redux/store";
import { fetchArcticles } from "../redux/slices/ArticleSlice";
import { filterArticles } from "../redux/slices/ArticleSlice";
import "../styles/Search.scss";
interface Input {
    request: string;
}
interface SearchProps {
    variant: 'test' | 'course'
}
const Search: React.FC<SearchProps> = ({ variant }) => {
    const { handleSubmit, register } = useForm<Input>();
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<Input> = (data) => {
        if (variant === 'test') {
            data.request === '' ? dispatch(fetchTests()) : dispatch(filterTest({ text: data.request }))
        } else if (variant === 'course') {
            data.request === '' ? dispatch(fetchArcticles()) : dispatch(filterArticles({ text: data.request }))
        }
    };

    return (
        <div className={"search"}>
            <form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="SearchInput"
                    autoComplete="off"
                    type="text"
                    placeholder="Search"
                    {...register("request")}
                />
                <button className="buttonSubmit">
                    <SearchIcon fontSize="large" />
                </button>
            </form>
        </div>
    );
};

export default Search;
