import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseDoughnutChart = ({ doughnutChartData }) => {
    const data = {
        labels: doughnutChartData.labels,
        datasets: doughnutChartData.datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Expense Categories Distribution" },
        },
    };

    return <Doughnut data={data} options={options} style={{ height: "400px" }} />;
};

export default ExpenseDoughnutChart;
