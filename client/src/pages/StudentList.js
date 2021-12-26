import React, {Component} from 'react';
import {connect} from "react-redux";
import {getStudentAction} from "../redux/actions/AppActions";
import {Table} from "react-bootstrap";
import AdminLayout from "../component/AdminLayout";

class StudentList extends Component {
    componentDidMount() {
        this.props.dispatch(getStudentAction());
    }

    render() {
        const {dispatch, studentList} = this.props
        return (
            <AdminLayout>
                <Table>
                    <thead>
                    <tr>
                        <td>№</td>
                        <td>Ism</td>
                        <td>Familya</td>
                        <td>Manzil</td>
                        <td>Kvartira manzili</td>
                        <td>Telefon Raqami</td>
                        <td>Ota-onasi telefon Raqami</td>
                        <td>Jurnaldagi Raqami</td>
                        <td>Description</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        studentList ? studentList.map((item, i) =>
                            <tr>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.sourName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.address}</td>
                                <td>{item.flatAddress}</td>
                                <td>{item.parentNumber}</td>
                                <td>{item.number}</td>
                                <td>{item.description}</td>
                                {console.log(item)}
                                <td>{item.journalNumber}</td>
                            </tr>
                        ) : ''}
                    </tbody>
                </Table>
            </AdminLayout>
        );
    }
}

StudentList.propTypes = {};

export default connect (({app: {showModal, studentList}}) => ({showModal, studentList})) (StudentList);
