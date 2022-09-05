import React, { useState, useEffect } from 'react'
import {nanoid} from 'nanoid';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Form = (props) => {
    const {
            food,
            setFood, 
            calories, 
            setCalories, 
            foodList, 
            setFoodList,
            dailyList, 
            setDailyList, 
            newDate, 
            setNewDate, 
        } = props;

    const [errors, setErrors] = useState({});

    useEffect(()=> {
        setFoodList([])
        
    },[])

    const navigate = useNavigate();

    const addItem = (e) => {
        //create new key-value pair for food-calories
        e.preventDefault();
        const foodEntry = {food, calories, newDate, id: nanoid()}
        setFoodList([...foodList, foodEntry])
        console.log(foodEntry)
        setErrors({})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let calTotal = 0;
        for (let i=0; i < foodList.length; i++){
            calTotal += Number(foodList[i].calories)
        }
        console.log('foodlist is:', foodList)
        console.log('newDate', newDate)
        if (foodList.length >= 1){
            axios.post('http://localhost:8000/api/days', {
                foods: foodList,
                totalCalories: calTotal,
                newDate
                
            })
            .then((res)=> {
                console.log(res.data)
                setDailyList([...dailyList, res.data])
                setFoodList([]);
                
                navigate('/foodlog/home')
            })
            .catch((err)=> {
                //add validatoins
                setErrors(err.response.data.errors)
                console.log('errors', errors.newDate.message)
            })
        }else{
            setErrors({listLengthMessage: 'Log must contain at least 1 entry!'})
        }
    }

    const removeItem = (uniqueId, uniqueCalories) => {
        console.log(uniqueId)
        const newList = foodList.filter((singleItem)=> {
            return singleItem.id !== uniqueId
        })
        setFoodList(newList);
    }
    
    const startOver = () => {
        setFoodList([])
    }

    return (
        <div>
            <div className='border border-dark col-10 mx-auto my-3'>
                <div className='d-flex justify-content-between'>
                    <h2 className='d-flex justify-content-start mx-4 my-3'>Daily Entry for {newDate}</h2>
                    <Link to = '/foodlog/home' className='mx-3 my-4'>Go Home</Link>
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
                                    <td><button onClick = {(e)=> {removeItem(`${item.id}`, `${item.calories}`)}} className='btn btn-danger'>Remove</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
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
                        <button onClick={addItem} className='btn btn-info mx-3'>Add new item</button>
                        <button onClick={startOver} className='btn btn-primary mx-3'>Start Over</button>
                    </div>
                        <div className='d-flex justify-content-end m-2'>
                            <button className='btn btn-success'>Submit Entry</button>
                        </div>
                            {
                                errors.newDate ?
                                <p className='d-flex justify-content-end w-75 text-danger'>{errors.newDate.message}</p>: null
                            }
                            {
                                errors.listLengthMessage ? 
                                <p className='text-danger'>{errors.listLengthMessage}</p>:null
                            }
                </form>
            </div>
        </div>
    )
}

export default Form;