import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,  // Required for Doughnut chart
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);  // Registering ArcElement for doughnut chart

const AssignedLeadsCountDoughnutChart = ({ doughnutChartData }) => {

    // Check if doughnutChartData exists and is an array before proceeding
    if (!Array.isArray(doughnutChartData) || doughnutChartData.length === 0) {
        return <div>No data available</div>;  // Render a message when there's no data
    }

    // Prepare chart data from the props
    const data = {
        labels: doughnutChartData.map(item => item.status),  // Extracts statuses for labels
        datasets: [
            {
                label: 'Lead Statuses',  // Dataset label
                data: doughnutChartData.map(item => item.count),  // Extracts the counts
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',  // Raw Lead color
                    'rgba(54, 162, 235, 0.6)',  // Follow-up color
                    'rgba(255, 206, 86, 0.6)',  // Meeting Scheduled color
                    'rgba(75, 192, 192, 0.6)',  // Delayed Client color
                    'rgba(153, 102, 255, 0.6)',  // Visited color
                    'rgba(255, 159, 64, 0.6)',  // Closed color
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',  // Raw Lead border color
                    'rgba(54, 162, 235, 1)',  // Follow-up border color
                    'rgba(255, 206, 86, 1)',  // Meeting Scheduled border color
                    'rgba(75, 192, 192, 1)',  // Delayed Client border color
                    'rgba(153, 102, 255, 1)',  // Visited border color
                    'rgba(255, 159, 64, 1)',  // Closed border color
                ],
                hoverOffset: 4,  // Add hover effect
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
                        return `${tooltipItem.raw} leads`;  // Format tooltips
                    },
                },
            },
        },
    };

    return (
        <div className='h-[400px] w-full flex justify-center items-center'>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default AssignedLeadsCountDoughnutChart;
