import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../redux/store'
import { useParams } from 'react-router-dom'
import { fetchArcticles } from '../redux/slices/ArticleSlice'
import parse from 'html-react-parser'
import '../styles/ArticleView.scss'


const ArticleView = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      dispatch(fetchArcticles())
    }, [])
    
    const article = useAppSelector(state => state.articles.articles.items).find(item => item._id === id)

    return (
      <div className='courseview'>
          <h1 className='courseTitle'>{article?.title}</h1>
          <p className='courseDescr'>{article?.description}</p>
          
          <div className='coursetextdiv'><p className='courseText'>{parse(article?.text ? article?.text : 'Loading')}</p></div>
      </div>
    )
}

export default ArticleView