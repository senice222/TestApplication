import { configureStore } from '@reduxjs/toolkit'
import TestSlice from './slices/TestsSlice'
import { useDispatch, useSelector} from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import AuthSlice from "./slices/UserSlice";
import CreateTestSlice from './slices/CreateTestSlice';
import ArticleSlice from './slices/ArticleSlice';

export const store = configureStore({
    reducer: {
        tests: TestSlice,
        auth: AuthSlice,
        CreateTest: CreateTestSlice,
        articles: ArticleSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
