import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Day = (props) => {
    const {id} = useParams();
    const {foodList, setFoodList} = props;
    const [date, setDate] = useState('');
    const [oneDay, setOneDay] = useState({})

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/days/${id}`)
        .then((res)=>{
            console.log('oneday', res.data.foods)
            console.log('res.data', res.data)
            setOneDay(res.data)
            setDate(res.data.newDate)
            setFoodList(res.data.foods)
            console.log(foodList)
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])

    return (
        <div>
            <div className='border border-dark w-75 mx-auto my-3'>
                <div className='d-flex justify-content-between'>
                    <h2 className='d-flex justify-content-start mx-4 my-3'>Daily Entry for {date.slice(0,10)}</h2>
                    <Link to = '/foodlog/home' className='mx-3 my-4'>Go Home</Link>
                </div>
                <table className='table table-striped w-75 mx-auto my-3'>
                    <thead>
                        <tr className='border border-dark'>
                            <th>Food</th>
                            <th>Calories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* each item is object with food-calories pair */}
                        {
                            foodList.map((item, index)=> {
                                return <tr key={index}>
                                    <td>{item.food}</td>
                                    <td>{item.calories}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className='m-2 w-75 d-flex justify-content-end text-success'>
                    <h4>Total Calories: {oneDay.totalCalories}</h4>
                </div>
            </div>
        </div>
    )
}

export default Day;