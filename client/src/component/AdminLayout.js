import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import './adminLayout.scss'
import '../pages/universal.scss'
import {connect} from "react-redux";
import {TOKEN} from "../utils/constants";
import {Button} from "reactstrap";


class AdminLayout extends Component {

    state = {
        addMenu: false,
        addMenu1: false
    }

    render() {
        const {
            menuHidden,
            dispatch,
        } = this.props;
        const {addMenu, addMenu1} = this.state

        const closeFun = () => {
            if (addMenu || addMenu1) {
                this.setState({addMenu: false})
                this.setState({addMenu1: false})
            }
        }

        const signOut = () => {
            localStorage.removeItem('role');
            localStorage.removeItem(TOKEN);
            this.props.history.push("/")
        }

            return (
            <div className={"admin-layout-page"} onClick={closeFun}>
                <div className={"main-layout"}>

                    {/*Head*/}
                    <div className={"top-menu row my-auto"}>
                        <div className={"col-10"}></div>
                        <div className={"col-2 p-0"}>
                            <Link to={"/main"} className={"btn-goto-site float-right"}>
                                Saytga o'tish
                            </Link>
                        </div>
                    </div>

                    {/*Left Menu*/}
                    <div className={menuHidden ? "main-layout-left main-layout-left-hidden" : "main-layout-left"}>

                        {/*<div className={"logo-box"}>*/}
                        {/*    <div className={"logo logo-boxShadow ml-4"}></div>*/}
                        {/*    <div className={"logo_text"}>Book Express</div>*/}
                        {/*</div>*/}

                        <div className="main-link-div">
                            <div className={"main-link-title"}>MENYULAR</div>
                            <Link to="/admin/dashboard" className={
                                this.props.pathname === "/admin/dashboard" ?
                                    "active-link" : "default-link"
                            }>
                                <div className="main-link">
                                    <span className="icon icon-dashboard"/>
                                    Dashboard
                                </div>
                            </Link>
                            <Link to="/admin/student/list" className={
                                this.props.pathname === "/admin/student/list" ?
                                    "active-link" : "default-link"
                            }>
                                <div className="main-link">
                                    <span className="icon icon-books"/>
                                    O`quvchilar
                                </div>
                            </Link>
                            {/*<Link to="/admin/publish" className={*/}
                            {/*    this.props.pathname === "/admin/publish" ?*/}
                            {/*        "active-link" : "default-link"*/}
                            {/*}>*/}
                            {/*    <div className="main-link">*/}
                            {/*        <span className="icon icon-publishes"/>*/}
                            {/*        Nashriyotlar*/}
                            {/*    </div>*/}
                            {/*</Link>*/}
                            {/*<Link to="/admin/bookCategory" className={*/}
                            {/*    this.props.pathname === "/admin/bookCategory" ?*/}
                            {/*        "active-link" : "default-link"*/}
                            {/*}>*/}
                            {/*    <div className="main-link">*/}
                            {/*        <span className="icon icon-categories"/>*/}
                            {/*        Bo'limlar*/}
                            {/*    </div>*/}
                            {/*</Link>*/}
                            {/*<Link to="/admin/writer" className={*/}
                            {/*    this.props.pathname === "/admin/writer" ?*/}
                            {/*        "active-link" : "default-link"*/}
                            {/*}>*/}
                            {/*    <div className="main-link">*/}
                            {/*        <span className="icon icon-writer"/>*/}
                            {/*        Mualliflar*/}
                            {/*    </div>*/}
                            {/*</Link>*/}
                            {/*<Link to="/admin/carousel" className={*/}
                            {/*    this.props.pathname === "/admin/carousel" ?*/}
                            {/*        "active-link" : "default-link"*/}
                            {/*}>*/}
                            {/*    <div className="main-link">*/}
                            {/*        <span className="icon icon-dashboard"/>*/}
                            {/*        Aktsiyalar qo`shish*/}
                            {/*    </div>*/}
                            {/*</Link>*/}
                            {/*<Link to="/admin/orders" className={*/}
                            {/*    this.props.pathname === "/admin/orders" ?*/}
                            {/*        "active-link" : "default-link"*/}
                            {/* }>*/}
                            {/*     <div className="main-link">*/}
                            {/*         <span className="icon icon-orders"/>*/}
                            {/*         Buyurtmalar*/}
                            {/*     </div>*/}
                            {/* </Link>*/}
                        </div>

                    </div>
                    {/*<div className="logout_button">*/}
                        <Button type={"submit"} onClick={signOut}>Logout</Button>
                    {/*</div>*/}

                    {/*Main Body*/}
                    <div className="main-layout-right">
                        {this.props.children}
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    ({
         app: {
             isOpenGeneral,
             isOpenUser,
             isOpenPages,
             isOpen,
             openCol,
             loading,
             isFilter,
             filters,
             search,
             notifications
         },
         auth: {addMenu, addMenu1, menuHidden, isAdmin, isSuperAdmin, currentUser, isFinancier, isReception, isTeacher}
     }) =>
        ({
            addMenu,
            addMenu1,
            menuHidden,
            isOpenGeneral,
            isOpenPages,
            isAdmin,
            currentUser,
            isOpenUser,
            isOpen,
            isSuperAdmin,
            openCol,
            loading,
            isFilter,
            filters,
            search,
            notifications,
            isFinancier,
            isReception,
            isTeacher
        })
)
(AdminLayout));