import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

const LeadSourcesDoughntChart = ({ doughntChartData }) => {

    const data = {
        labels: doughntChartData?.labels, // Update labels as needed
        datasets: [
            {
                label: 'Sources of Leads',
                data: doughntChartData?.datasets[0]?.data, // Replace with actual data
                backgroundColor: [
                    'rgba(59, 89, 152, 0.7)', // Facebook color
                    'rgba(131, 58, 180, 0.7)', // Instagram color
                    'rgba(128, 128, 128, 0.7)', // Other color
                ],
                borderColor: [
                    'rgba(59, 89, 152, 1)',
                    'rgba(131, 58, 180, 1)',
                    'rgba(128, 128, 128, 1)',
                ],
                borderWidth: 1,
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
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw;
                        return `${label}: ${value} leads`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-[400px] h-[400px] overflow-hidden">
            <Doughnut className="w-full h-full" data={data} options={options} />
        </div>
    )
}

export default LeadSourcesDoughntChart
