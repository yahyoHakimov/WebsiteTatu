import React, {Component} from 'react';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import './Login/Login.css'
import {addStudentAction, getStudentOneList} from "../redux/actions/AppActions";
import {Button, Col, Modal, ModalBody, ModalFooter, Row} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Student extends Component {

    state = {
        variable: false,
        currentObject: '',
        styles: {
            border: "none",
            color: "#4d265e",
            borderRadius: 0,
            transition: ".1s",
            borderBottom: "2px solid #c89b00",
            backgroundColor: "transparent"
        }
    }


    render() {
        const {showModal, dispatch} = this.props
        const {currentObject} = this.state
        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: 'updateState',
                payload: {
                    showModal: !showModal
                }
            })
        }
        const onClickButton = (e, v) => {
            console.log(e)
            console.log(v)
            this.props.dispatch(addStudentAction(v))
        }

        return (
            <div className="container-fluid loginPage d-flex">
                <div className={"m-auto registration"}>
                    <div className={"firstInputs mt-2"}>
                        <AvForm onValidSubmit={onClickButton}>
                            <Row className={"float-left"}>
                                <Col md={6}>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Ism"} type="text" name={"name"}
                                                 placeholder="Vali"/>
                                    </div>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Familya"} type={"text"}
                                                 name={"sourName"}
                                                 placeHolder="Aliyev"/>
                                    </div>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Telefon Raqam"} type={"text"}
                                                 name={"phoneNumber"}
                                                 placeholder="998991234567"/></div>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Yashash Manzili"} type={"text"}
                                                 name={"address"} placeholder="..."/>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Vaqtinchalik yashash manzili"}
                                                 type={"text"} name={"flatAddress"}
                                                 placeholder="..."/>
                                    </div>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Ota-ona telefon raqami"}
                                                 type={"text"}
                                                 name={"parentNumber"}
                                                 placeholder="998901234567"/></div>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Izohlar"} type={"text"}
                                                 name={"description"}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Jurnaldagi raqami"} type={"text"}
                                                 name={"documentNumber"}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <AvField style={this.state.styles} label={"Kabinetingiz uchun parol"} type={"text"}
                                                 name={"cabinetCode"}/>
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                <Button type={"submit"} className={"btn py-2 mt-4 btn-block btn-sign-in"}>
                                    <Link to={"/student/page"}>
                                        Saqlash
                                    </Link>
                                </Button>
                            </div>
                        </AvForm>
                    </div>
                </div>
            </div>

        );
    }
}

Student.propTypes = {};

export default connect(({app: {showModal, student},}) => ({showModal, student}))(Student);
