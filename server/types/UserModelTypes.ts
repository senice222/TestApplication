interface IUserMarks {
    id: string,
    testName: string,
    mark: number,
    maxMark: number
}
interface ICreatedUserTests {
    testId: string,
    name: string,
    questionLength: number
}
interface IUserCreatedArticles {
    articleId: string,
    name: string
}

export interface IUser {
    fullName: string,
    email: string,
    passwordHash: string,
    marks: IUserMarks[],
    createdTests: ICreatedUserTests[],
    createdArticles: IUserCreatedArticles[]
}