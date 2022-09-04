import React, { useState, useEffect } from 'react'
import {nanoid} from 'nanoid';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Form = (props) => {
    let total=0;
    const navigate = useNavigate();
    useEffect(()=> {
        setTotals(total)
    }, [total])
    const {food, setFood, calories, setCalories, foodList, setFoodList,
    dailyList, setDailyList, newDate, setNewDate, totalCal, setTotalCal, totals, setTotals} = props;
    

    const addItem = (e) => {
        //create new key-value pair for food-calories
        e.preventDefault();
        const kvPair = {food, calories, newDate, id: nanoid()}
        setFoodList([...foodList, kvPair])
        
        let calCount = Number(calories);
        setTotalCal([...totalCal, calCount])
        
        for (let i=0; i < totalCal.length; i++){
            total += totalCal[i]
        }
        setTotals(total);
        
        console.log('tots', total)
        console.log(kvPair.newDate)
    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('foodlist is:', foodList)
        axios.post('http://localhost:8000/api/days', {
            foods: foodList,
            total 
        })
        .then((res)=> {
            console.log(res.data)
            setDailyList([...dailyList, res.data])
            navigate('/foodlog/home')
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    const removeItem = (uniqueId) => {
        console.log(uniqueId)
        const newList = foodList.filter((singleItem)=> {
            return singleItem.id !== uniqueId
        })
        setFoodList(newList);
    }
    

    return (
        <div>
            <div className='border border-dark w-75 mx-auto my-3'>
                <div className='d-flex justify-content-between'>

                    <h2 className='d-flex justify-content-start mx-4 my-3'>Daily Entry for {newDate}</h2>
                    <Link to = '/foodlog/home'>Go Home</Link>
                </div>
                <table className='table table-striped w-75 mx-auto my-3'>
                    <thead>
                        <tr className='border border-dark'>
                            <th>Food</th>
                            <th>Calories</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* each item is object with food-calories pair */}
                        {
                            foodList.map((item, index)=> {
                                return <tr key = {item.id}>
                                    <td>{item.food}</td>
                                    <td>{item.calories}</td>
                                    <td><button onClick = {(e)=> {removeItem(`${item.id}`)}} className='btn btn-danger'>Remove</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {/* <h3>Total: {totals}</h3> */}
            {/* add new item, update list in useState */}
                <form onSubmit={handleSubmit}>
                    <div className='d-flex mx-auto'>
                        <div className='d-flex align-items-center mx-4'>

                            <label>New Food:</label>
                            <input type = 'text' value = {food} 
                            onChange = {(e)=>{setFood(e.target.value)}} className='m-2'/>
                        </div>
                        <div className='d-flex align-items-center'>

                            <label>Calories:</label>
                            <input type = 'number' value = {calories}
                            onChange = {(e)=> {setCalories(e.target.value)}} className='m-2'/>
                        </div>
                        <div className='d-flex align-items-center'>

                            <label>Date:</label>
                            <input type = 'date' value={newDate}
                            onChange = {(e)=>{setNewDate(e.target.value)}} className='m-2'/>
                        </div>
                        <button onClick={addItem} className='btn btn-info'>Add new item</button>
                    </div>
                        <div className='d-flex justify-content-end m-2'>
                            <button className='btn btn-success'>Submit Entry</button>
                        </div>
                            
                    
                        
                </form>
                
            </div>
        </div>
    )
}

export default Form