import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import AdminLayout from "../../component/AdminLayout";

class AdminPage extends Component {
    render() {
        return (
            <div>
                {/*<NavLink exact to={"/student/list"}>O`quvchilar</NavLink>*/}
                <AdminLayout>

                </AdminLayout>
            </div>
        );
    }
}

AdminPage.propTypes = {};

export default connect((({app: {student},}) => ({student})))(AdminPage);