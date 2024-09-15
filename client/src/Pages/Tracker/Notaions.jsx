import React, { useContext } from "react";
import { CodeContext } from "../../codeContext";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import lineData from './line.json';

function Notations() {
    const { showTracker, result } = useContext(CodeContext); // Define graph to show or not

    if (result && result.result1 && result.result1.ExecutionTime !== undefined) {
        lineData[1].Time = result.result1.ExecutionTime;
    }

    if (result && result.result2 && result.result2.ExecutionTime !== undefined) {
        lineData[2].Time = result.result2.ExecutionTime;
    }

    if (lineData[2].Time !== undefined) {
        lineData[3].Time = lineData[2].Time;
    }

    const data = {
        labels: lineData.map((data) => data.label),
        datasets: [
            {
                data: lineData.map((data) => data.Time),
                backgroundColor: "blue",
                borderColor: "black"
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Test Cases"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Execution Time"
                },
                ticks: {
                    callback: function(val) {
                        if(val === 0)
                            return "0 ms";
                        return `${val.toFixed(3)} ms`;
                    }
                }
            }
        },
        elements: {
            point: {
                radius: 6,
                backgroundColor: "red"
            }
        }
    }

    return (
        showTracker && <div id="LineChart">
            <Line data={data} options={options}/>
        </div>
    );
}

export default Notations;
