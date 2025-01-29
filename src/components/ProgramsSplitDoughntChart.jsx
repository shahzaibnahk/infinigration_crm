import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgramsSplitDoughntChart = ({ doughnutChartData }) => {
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
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value} client${value > 1 ? 's' : ''}`;
                    },
                },
            },
        },
    };

    return (
        <div className="h-[430px] w-full flex justify-center items-center">
            <Doughnut data={doughnutChartData} options={options} />
        </div>
    );
};

export default ProgramsSplitDoughntChart;
