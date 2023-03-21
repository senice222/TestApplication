import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import '../styles/TestUserMarks.scss'
const TestUserMarks = () => {
    const tests = useAppSelector(state => state.tests.tests.items)
    const {id} = useParams()
    
    const test = tests.find(item => id === item._id)
    return (
        <div>
          {
            test?.userMarks.map(item => (
              <div>
                <h1 className={'userName'}>{item.name}</h1>
                <h1 className={'userMark'}>{item.mark}</h1>
              </div>
            ))
          }
        </div>
    );
};

export default TestUserMarks;
