import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ClientsBarChart = ({ barChartData }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw} clients`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Clients',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="h-[430px] w-full flex justify-center items-center">
            <Bar data={barChartData} options={options} />
        </div>
    );
};

export default ClientsBarChart;
