import React from "react";
import { Doughnut } from 'react-chartjs-2';
import "./Budget.css"

export const PieChart = (props) => {
    const filteredToPaidItems = props.budgetItems.filter(b => b.paid)
    const label = filteredToPaidItems.map(fb => fb.budget_item.save_for)
    const paidForNumbers = filteredToPaidItems.map(fb => fb.actual_cost)
    const data = {
        labels: [label],
        datasets: [
            {
                label: 'Paid',
                backgroundColor: [
                    // '#B21F00',
                    // '#C9DE00',
                    // '#2FDE00',
                    // '#00A6B4',
                    // '#6800B4'
                ],
                hoverBackgroundColor: [
                    // '#501800',
                    // '#4B5000',
                    // '#175000',
                    // '#003350',
                    // '#35014F'
                ],
                data: [paidForNumbers]
            }
        ]
    
    }
    console.log(label)
    console.log(paidForNumbers)
    return (
        
        <>
            <div className="pieChart">
                <Doughnut
                    data={data}
                    options={{
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        },
                        elements: {
                            arc: {
                              borderWidth: 0
                            }
                          }
                    }}
                />
            </div>
        </>
    )
}