import { isWidthDown, withTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import "./Budget.css"

export const PieChart = (props) => {

    const [labels, setLables] = useState([])
    const [numbers, setNumbers] = useState([])

    useEffect(() => {
        props.getBudgetItems()
    },[])

    useEffect(() => {
    const filteredToPaidItems = props.budgetItems.filter(b => b.paid)
    const paidForNumbers = filteredToPaidItems.map(fb => fb.actual_cost)
    
    let sum = 0
    for (let num of paidForNumbers){
         sum = sum + num
    } 

    const remainingBudget = props.currentWedding.budget - sum


    paidForNumbers.push(remainingBudget)

    setNumbers(paidForNumbers)
    }, [props.budgetItems])

    useEffect(() => {
    const filteredToPaidItems = props.budgetItems.filter(b => b.paid)
    const label = filteredToPaidItems.map(fb => fb.budget_item.save_for)

    const remainingLable = "Remaining Balance"

    label.push(remainingLable)

    setLables(label)
    }, [props.budgetItems])

    const pieData = {
        labels: labels,
        datasets: [
            {

                backgroundColor: [
                    "#7d5e6a","#8b575c","#9c7ca5","#c98986","#bbbfdb","#f6e4f6","#c7cae1", "#948d99","#9c94a1","#a39ba8","#a9a6b4","#aeb0bf","#b8c5d6","#c6d1e0","#d3dde9","#e0e9f3","#edf5fc"
                ],
                data: numbers
            }
        ]
    }
    
    return (
        
        <>
            <div className="pieChart">
                <Doughnut
                    data={pieData}
                    options={{
                        responsive: true,
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
                <div className="budgetTotal">Total Budget: ${props.currentWedding.budget}</div>
                
            </div>
        </>
    )
}