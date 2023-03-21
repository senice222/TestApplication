import React, {useState, useEffect} from 'react';
import './App.css';
import ArticleList from './pages/ArticleList';
// import './styles/style.scss';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Header from './components/Header';
import PrivateCabinet from './pages/PrivateCabinet';
import Main from './pages/Main';
import Login from './pages/Login';
import Test from './pages/TestList';
import Register from './pages/Register';
import PassingTest from './pages/PassingTest';
import TestCreate from './pages/TestCreate';
import Result from './pages/Result';
import ArticleView from './pages/ArticleView';
import {useAppSelector, useAppDispatch} from "./redux/store";
import {isSelectedAuth} from "./redux/slices/UserSlice";
import {fetchAuthMe} from './redux/slices/UserSlice'
import TestUserMarks from './pages/TestUserMarks'
import ArticleCreate from './pages/ArticleCreate'

export interface passingDataI {
    correct?: number,
    questionLength?: number,
    name?: string
}

function App(): JSX.Element {
    
    const ProtectedRoute = () => {
        const isAuth = useAppSelector(isSelectedAuth)
        if (!isAuth) {
            return <Navigate to={'/register'}/>
        }
        return <Outlet/>
    }

    const dispatch = useAppDispatch()
    const [passingData, setPassingData] = useState<passingDataI>({})
    
    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path={'/'} element={<Main/>}/>
                        <Route path={'/articles'} element={<ArticleList/>}/>
                        <Route path={'/passingTest/:id'} element={<PassingTest setCorrectAndQuestion={setPassingData} />}/>
                        <Route path={'/tests'} element={<Test/>}/>
                        <Route path={'/createTest'} element={<TestCreate/>}/>
                        <Route path={'/result/:id'} element={<Result />}/>
                        <Route path={'/profile/:id'} element={<PrivateCabinet />}/>
                        <Route path={'/testMarks/:id'} element={<TestUserMarks />}/>
                        <Route path={'/articleCreate'} element={<ArticleCreate />} />
                        <Route path={'/viewArticle/:id'} element={<ArticleView />} />
                    </Route>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;
