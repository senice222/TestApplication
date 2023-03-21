import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchArcticles = createAsyncThunk('/articles/fetchArticle', async () => {
    const {data} = await axios.get('courses')
    return data
})

export const fetchDeletedArticles = createAsyncThunk('/articles/fetchDeletedArticle', async (id : string) => {
    const {data} = await axios.delete(`courses/${id}`)
    return data
})


interface ArticleRoot {
    _id: string
    title: string,
    text: string,
    description: string,    
}
interface ArticleState {
    items: ArticleRoot[]
    status: string
}

interface State {
    articles: ArticleState
}

const initialState: State = {
    articles : {
        items: [

        ],
        status: 'loading'
    }
}

export const ArticletSlice = createSlice({
    name: 'tests',
    initialState,
    reducers: {
        filterArticles: (state, action: PayloadAction<{text: string}>) => {
            const {text} = action.payload
            state.articles.items = state.articles.items.filter(article => article.title.toLowerCase().includes(text.toLowerCase()))
        }
    }, 
    extraReducers: (builder) => {

        // get articles

        builder.addCase(fetchArcticles.pending, (state) => {
            state.articles.items = []
            state.articles.status = 'loading'
        })
        builder.addCase(fetchArcticles.fulfilled, (state, action) => {
            state.articles.items = action.payload
            state.articles.status = 'loaded'
        })
        builder.addCase(fetchArcticles.rejected, (state) => {
            state.articles.items = []
            state.articles.status = 'rejected'
        })

        // delete articles

        builder.addCase(fetchDeletedArticles.pending, (state, action) => {
            state.articles.items = []
            state.articles.status = 'loading'
        })
        builder.addCase(fetchDeletedArticles.fulfilled, (state, action : PayloadAction<string>) => {
            state.articles.items = state.articles.items.filter(item => item._id !== action.payload)
            state.articles.status = 'loaded'
        })
        builder.addCase(fetchDeletedArticles.rejected, (state, action) => {
            state.articles.items = []
            state.articles.status = 'loaded'
        })
    }
})

export const {filterArticles} = ArticletSlice.actions
export default ArticletSlice.reducer