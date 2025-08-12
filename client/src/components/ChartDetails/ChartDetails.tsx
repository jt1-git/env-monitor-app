import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import "./ChartDetails.scss"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface Props {
    data: any;
}

interface point {
    ts: number,
    value: number
}

function ChartDetails({ data }: Props) {

    const [points, setPoints] = useState<point[] | null>(null);

    useEffect(() => {
        setPoints(data.points)
    }, [data])

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: (data.kind).toUpperCase(),
                align: 'start',
                font: {
                    size: 20
                },
                padding: {
                    top: 10,
                    bottom: 30,
                }
            },
            legend: {
                display: false,
            },
        }
    }

    const lineChartData: ChartData <'line'> = {
        labels: points?.map((item: point) => {
            return new Date(item.ts).toLocaleTimeString()
        }),

        datasets: [{
            label: (data.kind).toUpperCase(),
            data: points?.map((item: point) => (item.value)) || [],
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            borderColor: "red",
            pointBackgroundColor: "rgba(255, 0, 0, 0.7)",
        }]
    }

    return (
        <div className='chart'>
            {points != null && points.length > 0 ? (

                <Line
                    data={lineChartData}
                    options={chartOptions}
                />

            ) : <div> Points not loaded </div>}
        </div>
    )
}

export default ChartDetails
