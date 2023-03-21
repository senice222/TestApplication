import React, {useEffect} from 'react'
import '../styles/ArticleList.scss'
import ArticleOrTestItem from '../components/ArticleOrTestItem'
import Search from '../components/Search'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { fetchArcticles } from '../redux/slices/ArticleSlice'
import ReactDom from 'react-dom'


const Article = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchArcticles())
    }, [])
    const articles = useAppSelector((state) => state.articles.articles)
    
    return (
        <div className='courses'>
            <Search variant="course"/>
            <div className='CourseItems'>
                {
                    articles.items.map(item => 
                        <ArticleOrTestItem 
                            text={item.title} 
                            variant='course' 
                            id={item._id}
                            key={item._id}
                        />
                        
                    )
                }
            </div>
        </div>
    )
}

export default Article