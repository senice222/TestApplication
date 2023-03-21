import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'
import {Answers} from './CreateTestSlice'

export const fetchTests = createAsyncThunk('/tests/fetchTests', async () => {
    const {data} = await axios.get('tests')
    return data
})
export const fetchDeletedTest = createAsyncThunk('/tests/fetchDeletedTests', async (id: string) => {
    const {data} = await axios.delete(`tests/${id}`)
    return data
})


export interface Question {
    title: string
    answers: Answers[]
    correct: string
    id: string
}

export interface TestRoot {
    _id: string
    name: string
    questions: Question[]
    userMarks: Array<{
        id: string,
        name: string,
        mark: number
    }>
    ownerId: string
}
export interface TestState {
    items: TestRoot[],
    status: string
}
interface TestState1 {
    tests: TestState
}
const initialState : TestState1 = {
    tests : {
        items: [
        
        ],
        status: 'loading'
    }
}

export const TestSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        filterTest: (state, action: PayloadAction<{text: string}>) => {
            const {text} = action.payload
            state.tests.items = state.tests.items.filter(test => test.name.toLowerCase().includes(text.toLowerCase()))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTests.pending, (state) => {
            state.tests.items = []
            state.tests.status = 'loading'
        })
        builder.addCase(fetchTests.fulfilled, (state, action) => {
            state.tests.items = action.payload
            state.tests.status = 'loaded'
        })
        builder.addCase(fetchTests.rejected, (state) => {
            state.tests.items = []
            state.tests.status = 'rejected'
        })

        // delete test
        builder.addCase(fetchDeletedTest.pending, (state) => {
            state.tests.items = []
            state.tests.status = 'loading'
        })
        builder.addCase(fetchDeletedTest.fulfilled, (state, action: PayloadAction<string>) => {
            state.tests.items = state.tests.items.filter(item => item._id !== action.payload)
            state.tests.status = 'loaded'
        })
        builder.addCase(fetchDeletedTest.rejected, (state) => {
            state.tests.items = []
            state.tests.status = 'rejected'
        })

    }
})

export const {filterTest} = TestSlice.actions
export default TestSlice.reducer