import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {nanoid} from 'nanoid';
import axios from 'axios';
import Navbar from './Navbar';

const Update = (props) => {
    const {id} = useParams();
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
        } = props;
        
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/days/${id}`)
        .then((res)=>{
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
        const updatedfoodEntry = {food, calories, newDate, id: nanoid()};
        setFoodList([...foodList, updatedfoodEntry]);
        setErrors({});
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let newTotal = 0;
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
                setDailyList([...dailyList, res.data]);
                setFoodList([]);
                navigate('/foodlog/home');
            })
            .catch((err)=> {
                setErrors(err.response.data.errors);
            })
        }else{
            setErrors({listLengthMessage: 'Log must contain at least 1 entry!'})
        }
    }

    const removeItem = (uniqueId) => {
        const newList = foodList.filter((singleItem)=> {
            return singleItem.id !== uniqueId
        })
        setFoodList(newList);
    }

    const startOver = (e) => {
        e.preventDefault();
        setFoodList([]);
        setErrors({});
    }
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='border border-dark rounded mx-auto my-3 column col-12 col-sm-12 col-md-10 col-lg-10'>
                    <Navbar/>
                </div>
                <div className='border border-dark mx-auto my-3 column col-12 col-sm-12 col-md-12 col-lg-10'>
                    <div className='d-flex justify-content-between'>
                        <h2 className='d-flex justify-content-start mx-4 my-3'>Daily Entry for {date.slice(0,10)}</h2>
                        <Link to = '/foodlog/home' className='mx-3 my-4'>Go Home</Link>
                    </div>
                    <table className='table table-striped table-dark w-75 mx-auto my-3'>
                        <thead className='tableHead'>
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
                        <div className='d-flex mx-auto justify-content-evenly'>
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
                        </div>
                        <div className='d-flex justify-content-end py-2'>
                            <button onClick={addItem} className='btn btn-warning mx-3'>Add new item</button>
                            <button onClick={startOver} className='btn btn-primary mx-2'>Start Over</button>
                            <button className='btn btn-success mx-5'>Update Entry</button>
                        </div>
                        <div className='d-flex w-50 mx-auto justify-content-evenly'>
                            {
                                errors.listLengthMessage ? 
                                <p className='text-danger'>{errors.listLengthMessage}</p>:null
                            }  
                            {
                                errors.newDate ?
                                <p className='text-danger'>{errors.newDate.message}</p>: null
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update;