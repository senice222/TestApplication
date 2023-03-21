import React, { useState } from "react";
import { useAppDispatch } from "../redux/store";
import {
    setCorrectAnswer,
    removeAnswer,
    updateAnswer
} from "../redux/slices/CreateTestSlice";
import '../styles/AnswerItem.scss'
interface AnswerI {
    answerId: string;
    questionText: string;
    questionId: string;
    correct: number;
    isSave: boolean;
    setIsSave: (data: boolean) => void;
    setActiveButton: (value: boolean) => void,
    answerIndex: number;
}

const AnswerItem = ({
    questionId,
    questionText,
    answerId,
    correct,
    isSave,
    setActiveButton,
    setIsSave,
    answerIndex
}: AnswerI) => {
    const dispatch = useAppDispatch();
    const [input, setInput] = useState<string>('Enter your answer')

    
    if (isSave) {
        setActiveButton(true)
        dispatch(updateAnswer({answerId, questionId, newAnswer: input}))
        setActiveButton(false)
        setIsSave(false)
    }
    
    const deleteAnswer = () => {
        dispatch(removeAnswer({ questionId, answerId}));
    }


    return (
        <div className="radio">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <div className={"radioDiv"}>
                    <input
                        id={`radio-${answerIndex} ${questionId}`}
                        type="radio"
                        onClick={() =>
                            dispatch(
                                setCorrectAnswer({
                                    id: questionId,
                                    answerIndex,
                                })
                            )
                        }
                        name={`answer ${questionId}`}
                        checked={correct === answerIndex  && true}
                    />
                    <label
                        htmlFor={`radio-${answerIndex} ${questionId}`}
                        className="radio-label"
                    >
                        <input
                            defaultValue={questionText}
                            onChange={(e) => {
                                setActiveButton(true)
                                setInput(e.target.value)
                            }}
                            className="answerText"
                            value={input}
                        />
                    </label>
                    
                </div>
                <div><h1 className="x" onClick={deleteAnswer}>x</h1></div>
            </div>
        </div>
    );
};
export default AnswerItem;
