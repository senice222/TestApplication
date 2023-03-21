import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import '../styles/PassedTests.scss'
const PassedTests = () => {
    const user = useAppSelector((state) => state.auth.data);
    const navigate = useNavigate()            
    return (
        <div className="passedTests">
            <div className='passedTestItem'>
                            <h1>Name:</h1>
                            <h1>Mark:</h1>
            </div>
            {
                (user?.marks.length) ? 
                    user?.marks.map((item) => (
                        <div key={item.id} className='passedTestItem' onClick={() => navigate(`/result/${item.id}`)}>
                            <h1>{item.testName}</h1>
                            <h1>
                                {item.mark}/{item.maxMark}
                            </h1>
                        </div>
                    ))
                : <div><p style={{color: 'white'}}>Вы еще не проходили тесты</p></div> 
            }   
        </div>
    );
};

export default PassedTests;
