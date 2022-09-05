import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {nanoid} from 'nanoid';
import axios from 'axios';


const Update = (props) => {
    const {id} = useParams();
    const [oneDay, setOneDay] = useState({});
    const [loaded, setLoaded] = useState(false)
    const [errors, setErrors] = useState({});
    const [date, setDate] = useState('');
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
        
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/days/${id}`)
        .then((res)=>{
            console.log('oneday', res.data.foods)
            console.log('res.data', res.data)
            setFoodList(res.data.foods)
            setDate(res.data.newDate)
            setLoaded(true)
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])

    const navigate = useNavigate();

    const addItem = (e) => {
        //create new key-value pair for food-calories
        e.preventDefault();
        const updatedfoodEntry = {food, calories, newDate, id: nanoid()}
        setFoodList([...foodList, updatedfoodEntry])
        setErrors({})
    }
    
        const handleSubmit = (e) => {
            e.preventDefault();
            let newTotal = 0;
            console.log('before')
            for (let i=0; i < foodList.length; i++){
                newTotal += Number(foodList[i].calories)
            }
            
            if (foodList.length >= 1){
                axios.put(`http://localhost:8000/api/days/update/${id}`, {
                    foods: foodList,
                    totalCalories: newTotal,
                    newDate 
                })
                .then((res)=> {
                    setDailyList([...dailyList, res.data])
                    setFoodList([]);
                    navigate('/foodlog/home')
                })
                .catch((err)=> {
                    setErrors(err.response.data.errors)
                    console.log('errors', errors.newDate.message)
                })
            }else{
                setErrors({listLengthMessage: 'Log must contain at least 1 entry!'})
            }
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
            <div className='border border-dark col-10 mx-auto my-3'>
                <div className='d-flex justify-content-between'>
                    <h2 className='d-flex justify-content-start mx-4 my-3'>Daily Entry for {date.slice(0,10)}</h2>
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
                        {loaded ?
                            foodList.map((item, index)=> {
                                return <tr key={index}>
                                    <td>{item.food}</td>
                                    <td>{item.calories}</td>
                                    <td><button onClick = {(e)=> {removeItem(`${item.id}`)}} className='btn btn-danger'>Remove</button></td>
                                </tr>
                            }): null
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
                        <button onClick={addItem} className='btn btn-info mx-2'>Add new item</button>
                    </div>
                        <div className='d-flex justify-content-end m-2'>
                            <button className='btn btn-success'>Update Entry</button>
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

export default Update;