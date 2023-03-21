import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from "@reduxjs/toolkit";

export interface Answers {
    answerId: string;
    title: string,
}

export interface Question {
    title: string;
    answers: Answers[];
    correct: number;
    id: string;
}

interface TestRoot {
    name: string;
    questions: Question[];
    ownerId: string;
}

interface TestState1 {
    test: TestRoot;
}

const initialState: TestState1 = {
    test: {
        name: "Enter your name of test",
        questions: [
            {
                title: "DefaultQuestion",
                answers: [{title: 'Your answer', answerId: nanoid()}, {title: 'Your answer', answerId: nanoid()}, {title: 'Your answer', answerId: nanoid()}],
                correct: 0,
                id: nanoid(),
            },
        ],
        ownerId: ''
    },
};

export const CreateTestSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        createTest: (state, action: PayloadAction<string>) => {
            state.test.ownerId = action.payload
        },
        reloadTest: (state, action: PayloadAction<string>) => {
            state.test = {
                name: "Enter your name of test",
                questions: [
                    {
                        title: "Enter your question",
                        answers: [
                            {answerId: nanoid(), title: 'Your answer'},
                            {answerId: nanoid(), title: 'Your answer'},
                            {answerId: nanoid(), title: 'Your answer'}
                        ],
                        correct: 0,
                        id: nanoid(),
                    },
                ],
                ownerId: action.payload
            }
        },
        addQuestion: (state) => {
            if (state.test) {
                state.test.questions.push({
                    title: 'Enter your question',
                    answers: [{answerId: nanoid(), title: 'Your answer'}],
                    id: nanoid(),
                    correct: 0,
                });
            }
        },
        createAnswer: (state, action: PayloadAction<{ id: string }>) => {
            const {id} = action.payload
            const question = state.test?.questions.find(item => item.id === id)
            if (question) {
                question.answers.push({answerId: nanoid(), title: 'Your answer'})
            }
        },
        updateTestName: (state, action: PayloadAction<{ newTitleOfTest: string }>) => {
            const {newTitleOfTest} = action.payload
            if (state.test) {
                state.test.name = newTitleOfTest
            }
        },
        updateQuestion: (state, action: PayloadAction<{ id: string, newTitle: string }>) => {
            const {id, newTitle} = action.payload
            const editableQuestion = state.test?.questions.find(item => item.id === id)
            if (editableQuestion) {
                editableQuestion.title = newTitle
            }
        },
        updateAnswer: (state, action: PayloadAction<{ questionId: string, newAnswer: string, answerId: string }>) => {
            const {questionId, newAnswer, answerId} = action.payload
            const editableQuestion = state.test?.questions.find(item => item.id === questionId)
            if (editableQuestion) {
                const answer = editableQuestion.answers.find(item => item.answerId === answerId) 
                if (answer) {
                    answer.title = newAnswer
                }
            }
        },
        setCorrectAnswer: (state, action: PayloadAction<{ id: string, answerIndex: number }>) => {
            const {id, answerIndex} = action.payload
            const question = state.test?.questions.find(item => item.id === id)
            if (question) {
                question.correct = answerIndex
            }
        },
        removeAnswer: (state, action: PayloadAction<{ questionId: string, answerId: string }>) => {
            const { questionId, answerId }= action.payload
            const question = state.test?.questions.find(item => item.id === questionId)
            if (question) {
                question.answers = question.answers.filter(item => item.answerId !== answerId)
            }
        },
        removeQuestion: (state, action: PayloadAction<{ questionId: string }>) => {
            const {questionId} = action.payload
            state.test.questions = state.test.questions.filter(question => question.id !== questionId)
        }
    },
});
   
export const {
    createTest,
    updateTestName,
    addQuestion,
    createAnswer,
    removeAnswer,
    removeQuestion,
    updateQuestion,
    updateAnswer,
    setCorrectAnswer,
    reloadTest,
    
} = CreateTestSlice.actions;
export default CreateTestSlice.reducer;
