import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import lineData from './line.json';

function Notations({ showTracker, result, ID }) {
    
    if (result && result.result1 && result.result1.ExecutionTime !== undefined) {
        lineData[1].Time = result.result1.ExecutionTime;
    }

    if (result && result.result2 && result.result2.ExecutionTime !== undefined) {
        lineData[2].Time = result.result2.ExecutionTime;
    }

    if (lineData[2].Time !== undefined) {
        lineData[3].Time = lineData[2].Time;
    }

    const colors = ['red', 'blue', 'blue', 'red'];

    const data = {
        labels: lineData.map((data) => data.label),
        datasets: [
            {
                data: lineData.map((data) => data.Time),
                backgroundColor: colors,
                borderColor: "black"
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title : (item) => `${item[0].label}`,
                    label : (item) => {
                        if(item.dataIndex === 0 || item.dataIndex === 3) return "";
                        return item.raw === 0 ? "0 ms" : `${item.raw.toFixed(3)} ms`;
                    }
                },
                displayColors: false,
                intersect: true,
                padding: 10,
                bodyFont: { size: 13 },
                titleFont: { size: 15 },
                cornerRadius: 10
            }
        },
        scales: {
            x: {
                title: { display: true, text: "Test Cases" },
                grid: {
                    color: item => item.tick.value === 0 ? "black" : "#F6F6F6",
                    lineWidth: item => (item.tick.value === 0 || item.tick.value === 3) ? 2 : 70
                }
            },
            y: {
                title: { display: true, text: "Execution Time" },
                ticks: {
                    callback: val => val === 0 ? "0 ms" : `${val.toFixed(3)} ms`
                },
                grid: {
                    color: item => item.tick.value === 0 ? "black" : "#F6F6F6",
                    lineWidth: item => item.tick.value === 0 ? 2 : undefined
                }
            }
        },
        elements: {
            point: {
                radius: 6,
                borderWidth: 3,
                borderColor: "white",
                hoverRadius: val => (val.dataIndex === 0 || val.dataIndex === 3) ? 6 : 14,
                hoverBackgroundColor: val => (val.dataIndex === 0 || val.dataIndex === 3) ? "red" : "Green"
            }
        },
        onHover: (event, chartElement) => {
            event.native.target.style.cursor = chartElement.length > 0 ? 'pointer' : 'default';
        }
    };

    return (
        showTracker && <div id={`${ID}-graph`}>
            <Line data={data} options={options}/>
        </div>
    );
}

export default Notations;
