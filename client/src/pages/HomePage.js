import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./universal.scss"

class HomePage extends Component {
    state = {
        styles: {
            color: "#111",
            display: "block",
            position: "relative",
            padding: "18px",
            textDecoration: "none",
            fontSize: "1.3em",
            marginTop: "70px"
        },
}

    render() {
        return (
            <div className={"homePage"}>
                <div className={"homapage_start"}>
                    <h3 className='title'>
                        Assalomu Alaykum! <br/>
                        Talaba bo`lsangiz ro`yxatdan o`ting
                    </h3>
                    <br/>
                        <Link to={"/registration"} className={"homePage_btn mx-5"}>
                            <h5>Royxatdan o`tish</h5>
                        </Link><br/>
                        <h3>Ro`yxatdan o`tgan bo`lsangiz</h3>
                    <br/>
                        <Link to="/login" className={"homePage_btn mx-5"}>
                            <h5>Kirish</h5>
                        </Link>
                </div>
                <div>
                </div>
            </div>
        );
    }
}

HomePage.propTypes =
    {}
;

export default HomePage;
