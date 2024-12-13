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
const LeadsCountBarChart = () => {

    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Leads Count',
                data: [50, 75, 100, 120, 90, 140, 180, 150, 130, 170, 200, 220], // Replace with actual data
                backgroundColor: '#4364b7',
            },
        ],
    };

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
