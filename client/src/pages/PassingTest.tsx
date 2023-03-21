import React, {useState} from 'react'
import { passingDataI } from '../App';
import {useAppSelector} from "../redux/store";
import { useParams, Navigate } from 'react-router-dom';
import axios from '../axios'
import '../styles/PassingTest.scss'

interface PassingTestI {
    setCorrectAndQuestion: (data: passingDataI) => void; 
}

const PassingTest: React.FC<PassingTestI> = ({ setCorrectAndQuestion }) => {
    const [step, setStep] = useState<number>(0)
    const [correct, setCorrect] = useState<number>(0)
    const [err, setErr] = useState<boolean>(false)
    const tests = useAppSelector(state => state.tests.tests.items) 
    const user = useAppSelector(state => state.auth.data)    

    const { id } = useParams()
    const test = tests.find((item) => item._id === id)
    const question = test?.questions[step]
    const percantage = test && Math.round((step / test.questions.length) * 100)

    if (test?.userMarks.find(item => item.id === user?._id)) {
        return <Navigate to={`/result/${id}`}/>
    }

    const fetchMark = async () => {
        try {
            const fields = {
                id: user?._id,
                username: user?.fullName,
                mark: correct
            }
            const data = {
                id: test?._id,
                testName: test?.name,
                mark: correct,
                maxMark: test?.questions.length
            }           
                        
            await axios.post(`tests/setMark/${id}`, fields)
            await axios.post(`profile/setMarks`, data)
        } catch(e) {
            console.log(e)
            setErr(true)
        }
    }
	const onClickAnswer = (index: number) => {
		setStep(step + 1)
        index === Number(question?.correct) && setCorrect(correct + 1)
    }
	 
    if (step === test?.questions.length) {
        fetchMark()
        test && setCorrectAndQuestion({questionLength: test?.questions.length, correct, name: test?.name})
        return <Navigate to={`/result/${id}`} />
    }

    return (
        <div className='testContainer'>
            <div className='test'>
                <div className='testHeader'>
                    <div className='progressBar'>
                        <div style={{width: `${percantage}%`}} className='progress'></div>
                    </div>
                    <p className='answer'>{step + 1} / {test && test?.questions.length}</p>
                </div>
                <h1 className='testTitle'>{question?.title}</h1>
                <div className='testAnswers'>
                    {
                        question?.answers.map((item, index) => <div key={item.answerId} className='AnswerDiv' onClick={() => onClickAnswer(index)}> 
                                <p className='answer'>{item.title}</p>
                            </div>)
                    }
                </div>
                {err && <p>Something went wrong</p>}
            </div>
        </div>
    )
}

export default PassingTest