import React from "react";
import {Route, Switch} from "react-router-dom";
import store from "../redux";
import {Provider} from "react-redux";
import PublicRoute from "../utils/PublicRoute";
import 'bootstrap/dist/css/bootstrap.min.css'
import PrivateRoute from "../utils/PrivateRoute";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage";
import Registration from "../pages/Login/Registration";
import Student from "../pages/Student";
import StudentList from "../pages/StudentList";
import StudentDocument from "../pages/StudentOne";
import AdminPage from "../pages/adminPages/AdminPage";
import StudentOne from "../pages/StudentOne";
import Dashboard from "../pages/adminPages/Dashboard";


const App = () => {
    return (
        <Provider store={store}>
            <Switch>
                <PublicRoute exact path="/" component={HomePage}/>
                <PublicRoute exact path="/login" component={Login}/>
                <PublicRoute exact path="/admin" component={AdminPage}/>
                <PrivateRoute exact path="/admin/dashboard" component={Dashboard}/>
                <PublicRoute exact path="/registration" component={Registration}/>
                <PrivateRoute exact path="/student" component={Student}/>
                <PrivateRoute exact path="/student/page" component={StudentOne}/>
                <PrivateRoute exact path="/student/list:id" component={StudentDocument}/>
                <PrivateRoute exact path="/admin/student/list" component={StudentList}/>
                <PublicRoute exact path="/notFound" component={NotFound}/>
            </Switch>
        </Provider>
    );
}

export default App;