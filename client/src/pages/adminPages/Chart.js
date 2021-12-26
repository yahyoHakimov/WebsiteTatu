import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: ['Red', 'Blue'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const DoughnutChart = () => (
    <>
        <div className='header'>
            <h1 className='title'>Talabalar statistikasi</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <Doughnut data={data} />
                </div>
            </div>
        </div>

    </>
);

export default DoughnutChart;