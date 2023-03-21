import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'
import {LoginI} from "../../pages/Login";
import {RegisterI} from "../../pages/Register";

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params : LoginI) => {
    const {data} = await axios.post('auth/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchUserDataRegister', async (params : RegisterI) => {
    const {data} = await axios.post('auth/register', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/getMe')
    return data
})
export const fetchUserMarks = createAsyncThunk('auth/fetchUserMarks', async () => {
    const {data} = await axios.get('/auth/getUserMarks')
    return data
})
export interface createdUserTests {
    name: string,
    questionsLength: number,
    testId: string
}
export interface createdUserArticles {
    articleId: string
    name: string,
}

interface Marks {
    id: string,
    testName: string,
    mark: number,
    maxMark: number
}
interface UserRoot {
    _id: string
    fullName: string
    email: string
    token: string
    marks : Marks[]
    createdTests: createdUserTests[]
    createdArticles: createdUserArticles[]

}
interface AuthState {
    data: UserRoot | null,
    status: string
}
const initialState : AuthState = {
    data: null,
    status: 'loading',

}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state : AuthState) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {

        // auth
        builder.addCase(fetchAuth.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        })
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
        // get me
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        })
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
        
        // register
        builder.addCase(fetchRegister.pending, (state) => {
            state.data = null
            state.status = 'loading'
        })
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'loaded'
        })
        builder.addCase(fetchRegister.rejected, (state) => {
            state.data = null
            state.status = 'error'
        })
        
        // fetch user marks
        builder.addCase(fetchUserMarks.pending, (state) => {
            if (state.data) {
                state.data.marks = []
                state.data.createdTests = []
                state.data.createdArticles = []
            }
        })
        builder.addCase(fetchUserMarks.fulfilled, (state, action : PayloadAction<{marks: Marks[], created: createdUserTests[], createdArticles: createdUserArticles[]}>) => {
            if (state.data) {
                state.data.marks = action.payload.marks
                state.data.createdTests = action.payload.created
                state.data.createdArticles = action.payload.createdArticles
            }
        })
        builder.addCase(fetchUserMarks.rejected, (state) => {
            if (state.data) {
                state.data.marks = []
                state.data.createdTests = []
                state.data.createdArticles = []
            }
        })
    }
})

export const isSelectedAuth = (state: any) => Boolean(state.auth.data)
export const {logout} = AuthSlice.actions
export default AuthSlice.reducer