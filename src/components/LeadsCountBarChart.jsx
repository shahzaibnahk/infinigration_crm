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

const LeadsCountBarChart = ({ barChartData }) => {

    const data = barChartData

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw} leads`;
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
                    text: 'Leads Count',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='h-[430px] w-full flex justify-center items-center'>
            <Bar data={data} options={options} />
        </div>
    )
}

export default LeadsCountBarChart
