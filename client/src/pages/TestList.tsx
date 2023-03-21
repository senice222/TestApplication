import React, {useEffect} from 'react'
import Search from '../components/Search'
import {useAppDispatch, useAppSelector} from "../redux/store";
import {fetchTests} from "../redux/slices/TestsSlice";
import ArticleItem from "../components/ArticleOrTestItem";
import '../styles/TestList.scss'
const Test = () => {
    const dispatch = useAppDispatch()
    const {tests} = useAppSelector(state => state.tests)
    const isTestsLoading = tests.status === 'loading'

    useEffect(() => {
        dispatch(fetchTests())
    }, [])

    return (
        <div className='courses'>
            <Search variant="test"/>
            <div className='CourseItems'>
                {
                    isTestsLoading ? <h1 style={{color: 'white', fontSize: '40px'}}>Loading...</h1> :
                        tests.items.map((obj, i) => <ArticleItem key={i} id={obj._id} text={obj.name} variant={"test"}/>)
                }
            </div>
        </div>
    )
}

export default Test