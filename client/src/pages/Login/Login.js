import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import * as authActions from "../../redux/actions/AuthActions";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Label} from "reactstrap";
import {connect} from "react-redux";

class Login extends Component {
    state = {
        variable: false,
        styles: {
            border: "none",
            color: "#eee",
            borderRadius: 0,
            transition: ".1s",
            borderBottom: "2px solid #c89b00",
            backgroundColor: "transparent"
        }
    }

    handleSignIn = async (e, v) => {
        this.props.dispatch(authActions.login({v, history: this.props.history}))
    };

    render() {
        return (
                <div className="container-fluid loginPage d-flex">
                <div className={"m-auto registration "}>
                    <h1>KIRISH</h1>
                    <div className={"firstInputs mt-2"}>
                        <AvForm className={"mx-auto"} onValidSubmit={this.handleSignIn}>
                            <div className={"form-group"}>
                                <Label for="usr" className="ml-0">Telefon raqam</Label>
                                <AvField type="text" name="phoneNumber" className="form-control login-input"
                                         placeholder="+998 90 1234567" style={this.state.styles} id="usr" required/>
                            </div>
                            <div className={"form-group"}>
                                <Label for="pwd" className="mr-sm-2">Parol</Label>
                                <AvField type="password" className="form-control thirdInput login-input" name="password"
                                         placeholder="Parol" style={this.state.styles} id={"pwd"} required/>
                            </div>
                            <button className={"btn py-2 mt-4 btn-block btn-sign-in"}>Kirish</button>
                        </AvForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({
         app: {showModal},
         auth: {isAdmin, isSuperAdmin, isFinancier, currentUser}
     }) => ({
        showModal,
        isAdmin,
        isSuperAdmin,
        isFinancier,
        currentUser
    })
)(Login);
