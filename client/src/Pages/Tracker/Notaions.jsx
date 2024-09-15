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
                    title : (item) => {
                        return `${item[0].label}`
                    },
                    label : (item) => {
                        if(item.dataIndex === 0 || item.dataIndex === 3)
                            return "";
                        else{
                            if(item.raw === 0){
                                return `${item.raw} ms`;
                            }
                            return `${item.raw.toFixed(3)} ms`;
                        }
                        }
                },
                displayColors: false,
                intersect: true,
                padding: 10,
                bodyFont: {
                    size: 13
                },
                titleFont: {
                    size: 15
                },
                cornerRadius: 10
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Test Cases"
                },
                grid: {
                    color: (item) => {
                        if(item.tick.value === 0)
                            return "black";
                        return "#F6F6F6"; // Color for other grid lines
                    },
                    lineWidth: (item) => {
                        if (item.tick.value === 0 || item.tick.value === 3) {
                            return 2;
                        }
                        return 70;
                    }
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
                },
                
                grid: {
                    color: (item) => {
                        console.log(item);
                        if(item.tick.value === 0)
                            return "black";
                        return "#F6F6F6"; // Color for other grid lines
                    },
                    lineWidth: (item) => {
                        if (item.tick.value === 0) {
                            return 2;
                        }
                    }
                }
            }
        },
        elements: {
            point: {
                radius: 6,
                borderWidth: 3,
                borderColor: "white",
                hoverRadius: (val)=>{
                    return (val.dataIndex === 0) ? 8 : 14;
                },
                hoverBackgroundColor: (val) => {
                    return (val.dataIndex === 0 || val.dataIndex === 3) ? "red" :"Green";
                },
                cursor: "crosshair"
            }
        },
        onHover: (event, chartElement) => {
            if (chartElement.length > 0) {
                event.native.target.style.cursor = 'pointer';
            }
            else{
                event.native.target.style.cursor = "default";
            }
        }
    };

    return (
        showTracker && <div id="Editor-1">
            <Line data={data} options={options}/>
        </div>
    );
}

export default Notations;
