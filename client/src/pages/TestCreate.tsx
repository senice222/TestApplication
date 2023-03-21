import React, {useState, useEffect, KeyboardEvent} from "react";
import QuestionItem from "../components/QuestionItem";
import {addQuestion, createTest, reloadTest, updateTestName} from "../redux/slices/CreateTestSlice";
import {useAppDispatch, useAppSelector} from "../redux/store";
import axios from '../axios'
import {useNavigate} from "react-router-dom";
import '../styles/TestCreate.scss'
const TestCreate = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.auth.data)
    const test = useAppSelector(state => state.CreateTest.test)
    const [testName, setNameTest] = useState<string>(test?.name)
    const [testNameSaved, setTestNameSaved] = useState<boolean>(true)
    const [limitQuestion, setLimitQuestion] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData?._id) {
            dispatch(createTest(userData._id))
        }
    }, [])

    const updTestName = () => {
        dispatch(updateTestName({newTitleOfTest: testName}))
        setTestNameSaved(true)
    }

    const handleTestName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameTest(e.target.value)
        setTestNameSaved(false)
    }

    const addQuestionHandle = () => {
        if (test.questions.length <= 30) {
            dispatch(addQuestion())
        } else {
            setLimitQuestion(true)
        }
    }

    const postTestOnServer = async () => {
        try {
            const fields = {
                name: test.name,
                questions: test.questions,
                ownerId: test.ownerId
            }
            
            const {data} = await axios.post('tests/create', fields)

            const createdDataTests = {
                testId: data?._id,
                name: test?.name,
                questionsLength: test?.questions.length
            }

            await axios.post('profile/setCreatedTests', createdDataTests)

            navigate('/tests')
            if (userData) {
                dispatch(reloadTest(userData._id))
            }

        } catch (e) {
            alert('Something went wrong')
        }
    }

    return (
        <div className="createWrapper">
            <div className="createTitleDiv">
                <input
                    className="createTitle"
                    maxLength={30}
                    value={testName}
                    onChange={(e) => handleTestName(e)}
                />
                {!testNameSaved && <h1 className="saveTestNameBtn" onClick={updTestName}>+</h1>}
            </div>
            <div className="createQuestionsDiv">
                {test.questions.map((item) => <QuestionItem    key={item.id}
                                                               title={item.title}
                                                               id={item.id}
                                                               correct={item.correct}
                                                               answers={item.answers}
                                                               />
                )}
            </div>
            <p className={'questionItemAdd'} onClick={addQuestionHandle}>Add Question</p>
            <button className="submitTest" onClick={postTestOnServer}>Submit Test</button>
            {limitQuestion && <p>The maximum limit of questions has been reached</p>}
        </div>
    )
}
export default TestCreate
