import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import {Doughnut} from "react-chartjs-2";
import Chart from "./Chart";
import VerticalBar from "./VerticalBar";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <AdminLayout>
                    {/*<Doughnut data={} />*/}

                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <Chart />
                            </div>
                            <div className="col-4">
                                <VerticalBar />
                            </div>
                        </div>
                    </div>
                </AdminLayout>
            </div>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;