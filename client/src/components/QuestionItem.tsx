import React, { useState } from "react";
import AnswerItem from "./AnswerItem";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from "../redux/store";
import {
    createAnswer,
    Question,
    removeAnswer,
    updateQuestion,
    removeQuestion
} from "../redux/slices/CreateTestSlice";
import '../styles/QuestionItem.scss'

const QuestionItem: React.FC<Question> = ({ id, answers, correct }) => {
    const [questionName, setQuestionName] = useState<string>("Enter name of question")
    const [activeButton, setActiveButton] = useState<boolean>(false);
    const [isSave, setIsSave] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const addVariant = () => {
        dispatch(createAnswer({ id }));
    };

    const saveDataQuestion = () => {
        setIsSave(true);
        dispatch(updateQuestion({id, newTitle: questionName}))
        setActiveButton(false)
    }

    const handleQuestionName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionName(e.target.value);
        setActiveButton(true);
    }

    const deleteQuestion = () => {
        dispatch(removeQuestion({ questionId: id }))
    }

    return (
        <div className="questionItemWrapper">
            <div className="DefaultQuestionDiv">
                <input
                    value={questionName}
                    onChange={(e) => handleQuestionName(e)}
                    maxLength={45}
                    className="questionItemTitle"
                />
            </div>
            <div className="questionItemAnswers">
                {answers.map((item, i) => (
                    <AnswerItem
                        isSave={isSave}
                        setIsSave={setIsSave}
                        questionText={item.title}
                        questionId={id}
                        answerId={item.answerId}
                        correct={correct}
                        setActiveButton={setActiveButton}
                        answerIndex={i}
                        key={item.answerId}
                    />
                ))}
                
            </div>
            <p onClick={addVariant} className={"questionItemAdd"}>
                Add Variant
            </p>

            <div className="saveBtnDiv">
            <DeleteForeverIcon onClick={deleteQuestion} className='deleteQuestionBtn' sx={{fontSize: '48px'}} />
                {activeButton && (
                    <button className={"btnSave"} onClick={saveDataQuestion}>
                        Save
                    </button>
                    
                )}
            </div>
        </div>
    );
};
export default QuestionItem;
