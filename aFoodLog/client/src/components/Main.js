import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

const Main = (props) => {
    
    const {dailyList, setDailyList} = props;

    useEffect(()=> {
        axios.get('http://localhost:8000/api/days')
        .then((res)=> {
            setDailyList(res.data)
            
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])
    
    const handleDelete = (dailyId) => {
        axios.delete(`http://localhost:8000/api/days/${dailyId}`)
        .then((res)=> {
            console.log(res)

            const newDailyList = dailyList.filter((singleDay)=> {
                console.log(singleDay._id)
                return singleDay._id !== dailyId
            })
        
            setDailyList(newDailyList);
        })
    }
    
    // axios.delete(`http://localhost:8000/api/pirate/${pirateId}`)
    // .then((res)=> {
    //     console.log(res)
    //     const newArr = pirateList.filter((pirate)=> {
    //         return pirate._id !== pirateId
    //     })
    //     setPirateList(newArr)
console.log(dailyList)
    return (
        <div>
            <div className='border border-dark w-75 mx-auto my-3'>
                <div className='d-flex justify-content-between'>
                    <h2 className='d-flex justify-content-start mx-4 my-3'>Daily Log: Latest Entries</h2>
                    <Link to = '/foodlog/new'>Add new entry</Link>
                </div>
                <table className='table table-striped w-75 mx-auto my-3'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Daily Intake</th>
                            <th colSpan={3}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // each item is an object with _id, foods, total, date
                            dailyList.map((item, index)=>{
                                
                                return <tr key={item._id}>
                                    <td>{item.foods[0].newDate}</td>
                                    <td>{item.total}</td>
                                    <td><Link to={`/foodlog/view/${item._id}`}>View</Link></td>
                                    <td><Link to ={`/foodlog/update/${item._id}`}>Edit</Link></td>
                                    <td><button  onClick={(e)=> {handleDelete(`${item._id}`)}} className='btn btn-danger'>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

                
            </div>
        </div>
    )
}

export default Main;