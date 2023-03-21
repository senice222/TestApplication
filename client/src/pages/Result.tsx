import React, { useEffect } from 'react'
import MarkItem from '../components/MarkItem'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { fetchTests } from '../redux/slices/TestsSlice'
import '../styles/Result.scss'

const Result: React.FC = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(fetchTests())
    }, [])

    const isDataResultLoading = useAppSelector(state => state.tests.tests.status)

    const test = useAppSelector(state => state.tests.tests.items).find(item => item._id === id)
    
    const userData = useAppSelector((state) => state.auth)
    
    const isLoading = isDataResultLoading === 'loading'
    
    const userResult = test?.userMarks.find((item) => item.id === userData.data?._id)
    
    const notcorrect = test && userResult && test.questions.length - userResult.mark
    
    const percentage = test && userResult && Math.round((userResult.mark / test.questions.length) * 100)

    return (
        <div className='resultBg'>
            <div className='result'>
                <div className='resultHeader'>
                    <h1 className='resultTitle'>{isLoading ? 'Loading...' : test?.name}</h1>
                    <div className='correctDiv'>
                        <p className='correct'>{isLoading ? 'Loading...' : `${userResult?.mark}/${test?.questions.length}`}</p>
                    </div>
                </div>
                <hr className='resultLine' />
                <div className='Accuracy'>
                    <h1 className='accuracy2'>Accuracy</h1>
                    <div className='proccentDiv'>
                        <div className='accuracybar'>
                            <div style={{ width: `${percentage}%` }} className='accuracybar2'></div>
                        </div>
                        <h1 className='procent'>{percentage}%</h1>
                    </div>
                    <div className='checkresult'>
                        <div className='correctCont'><p className='correctP'>{isLoading ? 'Loading...' : `${userResult?.mark} correct`}</p></div>
                        <div className='correctCont'><p className='correctP'>{isLoading ? 'Loading...' : `${notcorrect} incorrect`} </p></div>
                    </div>
                </div>
                <div className='userMarks'>
                    {test && test.userMarks.map((item, i) => <MarkItem key={i} name={item.name} mark={item.mark} maxMark={test ? test.questions.length : 'Loading'} />)}
                </div>
            </div>
        </div>
    )
}

export default Result