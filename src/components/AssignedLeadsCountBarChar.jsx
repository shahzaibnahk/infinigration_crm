import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,  // Added PointElement registration
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);  // Registering PointElement

const AssignedLeadsCountLineChart = ({ lineChartData }) => {

    // Check if lineChartData exists and is an array before proceeding
    if (!Array.isArray(lineChartData) || lineChartData.length === 0) {
        return <div>No data available</div>;  // Render a message when there's no data
    }

    // Prepare chart data from the props
    const data = {
        labels: lineChartData.map(item => item.month),  // Extracts months for X-axis
        datasets: [
            {
                label: 'Leads Assigned',  // Dataset label
                data: lineChartData.map(item => item.count),  // Extracts the counts for Y-axis
                borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Line fill color
                fill: true,  // Fill under the line
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
            <Line data={data} options={options} />
        </div>
    );
};

export default AssignedLeadsCountLineChart;
