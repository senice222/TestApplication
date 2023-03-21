import React, { useState } from "react";
import { useAppSelector } from "../redux/store";
import ReactQuill from "react-quill";
import axios from '../axios'
import "react-quill/dist/quill.snow.css";
import "./ArticleCreator.scss";
import '../styles/ArticleCreate.scss'
import {useNavigate} from 'react-router-dom'


const Quil: React.FC<{ value: string; handler: (text: string) => void }> = (
    props
) => {
    return <ReactQuill value={props.value} onChange={props.handler} />;
};

const ArticleCreate = () => {
    const [value, setValue] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [descr, setDescr] = useState<string>("")
    const [err, setErr] = useState<boolean>(false)
    const navigate = useNavigate()
    
    const handleSubmit = async () => {
        try {  
            const fields = {
              title: name,
              description: descr,
              text: value,
            };
            const {data} = await axios.post('courses/create', fields)

            const dataOfCreatedArticles = {
                articleId: data._id,
                name
            }

            await axios.post('/profile/setCreatedArticles', dataOfCreatedArticles)

            navigate(`/viewArticle/${data._id}`)
            
        } catch (e) {
          setErr(true)
        }
    };

    return (
        <div className="articleCreate">
            <div className="divheader">
                <textarea
                    placeholder="Enter name of article"
                    style={{
                        textAlign: "center",
                        resize: "none",
                        minWidth: "30vw",
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="answerText"
                    maxLength={35}
                />
                <textarea
                    className="answerText"
                    style={{
                        resize: "none",
                        textAlign: "center",
                        minWidth: "35vw",
                    }}
                    value={descr}
                    onChange={(e) => setDescr(e.target.value)}
                    placeholder="Enter description of article"
                    maxLength={50}
                />
            </div>

            <div className="quil">
                <Quil value={value} handler={setValue} />
            </div>
            <button onClick={handleSubmit} className={"submitTest"}>Submit</button>
            {err && 'Something went wrong'}
        </div>
    );
};
export default ArticleCreate;
