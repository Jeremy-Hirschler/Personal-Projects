import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Main = (props) => {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false)
    
    const {dailyList, setDailyList, successMsg, setSuccessMsg} = props;

    useEffect(()=> {
        axios.get('http://localhost:8000/api/days')
        .then((res)=> {
            setDailyList(res.data)
            setLoaded(true)
        })
        .catch((err)=> {
            console.log(err)
        })
        console.log('document.cookie', document.cookie)
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

    const handleLogout = () => {
        console.log('before')
        axios.post('http://localhost:8000/api/logout')
        .then((res)=> {
            console.log(res)
            setSuccessMsg(res.data.msg)
            navigate('/foodlog/login')
        })
        .catch((err)=> {
            console.log('gi')
            console.log(err)
        })
        
    }
    
    return (
        <div>
            
            <div className='border border-dark rounded w-75 mx-auto my-3 container'>
                <div className='d-flex justify-content-between'>
                    <h2 className='d-flex justify-content-start mx-4 my-3'>Daily Log: Latest Entries</h2>
                    <Link to = '/foodlog/new' className='mx-3 my-4'>Add new entry</Link>
                </div>
                <table className='table table-striped table-dark table-hover w-75 mx-auto my-3 border border-dark'>
                    <thead className='tableHead'>
                        <tr>
                            <th>Date</th>
                            <th>Total Daily Intake</th>
                            <th colSpan={3}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // each item is an object with _id, foods, total, date
                            loaded ? 
                            dailyList.map((item, index)=>{
                                console.log('ttoal',item.totalCalories)
                                return <tr key={item._id}>
                                    <td>{item.newDate.slice(0,10)}</td>
                                    <td>{item.totalCalories}</td>
                                    <td><Link to={`/foodlog/view/${item._id}`}>View</Link></td>
                                    <td><Link to ={`/foodlog/update/${item._id}`}>Edit</Link></td>
                                    <td><button  onClick={(e)=> {handleDelete(`${item._id}`)}} className='btn btn-danger'>Delete</button></td>
                                </tr>
                            }) : null
                        }
                    </tbody>
                </table>
                <div className='d-flex justify-content-end px-4 py-2'>

                    <button onClick={handleLogout} className='btn btn-warning'>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Main;