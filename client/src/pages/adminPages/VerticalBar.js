import {Bar, Doughnut} from "react-chartjs-2";
import React from "react";

const data1 = {
    labels: ['Red', 'Blue'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const VerticalBar = () => (
    <>
        <div className='header'>
            <h1 className='title'>Davomat statistikasi</h1>
        </div>

        <Bar data={data1} options={options} />
    </>
);

export default VerticalBar;