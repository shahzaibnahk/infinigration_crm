import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeVsExpense = ({ barChartData }) => {
    const data = {
        labels: barChartData.labels,
        datasets: barChartData.datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Income vs Expenses (Yearly)" },
        },
        scales: {
            y: { beginAtZero: true },
        },
    };

    return <Bar data={data} options={options} style={{ height: "400px" }} />;
};

export default IncomeVsExpense;
