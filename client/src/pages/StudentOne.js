import React, {Component} from 'react';
import {connect} from "react-redux";
import {getStudentAction} from "../redux/actions/AppActions";
import {Table} from "react-bootstrap";
import {TOKEN} from "../utils/constants";
import {Button} from "reactstrap";

class StudentOne extends Component {

    render() {
        const {dispatch, student} = this.props
        const signOut = () => {
            localStorage.removeItem("role");
            localStorage.removeItem(TOKEN);
            this.props.history.push("/")
        }
        return (
            <div>
                <div>
                    Rahmat siz malumotlaringiz qo`shildi
                </div>
                <Button onClick={signOut}>Chiqish</Button>
            </div>
        );
    }
}

StudentOne.propTypes = {};

export default connect(({app: showModal, student}) => ({showModal, student}))(StudentOne);
