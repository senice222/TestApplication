import { useAppSelector, useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchUserMarks } from "../redux/slices/UserSlice";
import {fetchDeletedTest} from "../redux/slices/TestsSlice"
import '../styles/CreatedTests.scss'
const CreatedTests = () => {
    const user = useAppSelector((state) => state.auth.data);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const onClickRemove = (id: string) => {
        dispatch(fetchDeletedTest(id)).then(() => dispatch(fetchUserMarks()))
    }
    
    return (
        <div className="passedTests">
            <div className="passedTestItem">
                            <h1>Name:</h1>
                            <h1>Questions count:</h1>
                        </div>
            {
                (user?.createdTests.length) ?
                    user?.createdTests.map((item) => (
                        <div onClick={() => {
                            navigate(`/testMarks/${item.testId}`)
                        }} key={item.testId} className="passedTestItem" >
                            <h1>{item.name}</h1>
                            <div style={{display: 'flex'}}>
                            <h1 >{item.questionsLength}</h1>
                            <h1 className="x" onClick={(e) => {
                                e.stopPropagation()
                                onClickRemove(item.testId)
                            }}>x</h1>
                            </div>
                        </div>
                    )) 
                    : <div><h1 style={{color: 'white'}}>Вы еще не создавали тестов</h1></div>
            }
        </div>
    );
};

export default CreatedTests;
