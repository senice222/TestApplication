import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { fetchUserMarks } from "../redux/slices/UserSlice";
import PassedTests from "../components/PassedTests";
import CreatedTests from "../components/CreatedTests";
import CreatedArticles from "../components/CreatedArticles";
import '../styles/PrivateCabinet.scss'
const PrivateCabinet = () => {
    const user = useAppSelector((state) => state.auth.data);
    const dispatch = useAppDispatch()
    const [selectedTab, setSelectedTab] = useState<"passed" | "created" | "article">(
        "passed"
    );
    const isTabSelectedHowPassed = selectedTab === "passed"
    const isTabSelectedHowCreated = selectedTab === "created"
    
    const selectTab = () => {
        if (isTabSelectedHowPassed) {
            return <PassedTests />
        } else if (isTabSelectedHowCreated) {
            return <CreatedTests />
        } else {
            return <CreatedArticles />
        }
    }
    useEffect(() => {
        dispatch(fetchUserMarks())
    }, [])
    
    return (
        <div className="area">
            <div className="header-cabinet">
                <div style={{ display: "flex" }}>
                    <div className="avatarDiv">
                        <PersonIcon
                            sx={{ fontSize: "140px" }}
                            className="personIcon"
                        />
                    </div>
                    <div className="userInfo">
                        <h1 className="userFullName">{user?.fullName}</h1>
                        <p className="userId">@{user?._id}</p>
                    </div>
                </div>
                <div className="testsInfo">
                    <div className="testInfoItem">
                        <h1>{user && user.marks.length}</h1>
                        <p>Пройденных тестов</p>
                    </div>
                    <div className="testInfoItem">
                        <h1>{user?.createdTests.length}</h1>
                        <p>Созданных тестов</p>
                    </div>
                    <div className="testInfoItem">
                        <h1>{user?.createdArticles.length}</h1>
                        <p>Созданных статей</p>
                    </div>
                </div>
            </div>
            <div className="links">
                <h1
                    className="user-link"
                    style={isTabSelectedHowPassed ? {color: '#FFA800'} : undefined}
                    onClick={() => setSelectedTab("passed")}
                >
                    Passed
                </h1>
                <h1
                    className="user-link"
                    style={isTabSelectedHowCreated ? {color: '#FFA800'} : undefined}
                    onClick={() => setSelectedTab("created")}
                >
                    Created
                </h1>
                <h1
                    className="user-link"
                    style={!isTabSelectedHowPassed && !isTabSelectedHowCreated ? {color: '#FFA800'} : undefined}
                    onClick={() => setSelectedTab("article")}
                >
                    Articles
                </h1>
            </div>
            {selectTab()}

        </div>
    );
};

export default PrivateCabinet;
