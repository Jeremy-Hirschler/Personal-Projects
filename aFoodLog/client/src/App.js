import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Main from './components/Main';
import Form from './components/Form';
import Day from './components/Day';
import Update from './components/Update';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';
import {useState} from 'react';

function App() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [dailyList, setDailyList] = useState([]);
  const [newDate, setNewDate] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  return (
    <BrowserRouter>
      <div className="App d-flex flex-column">
        <Routes>
          <Route 
            path = '/foodlog/home' 
            element = {<Main 
                            foodList={foodList} 
                            setFoodList={setFoodList}
                            dailyList={dailyList} 
                            setDailyList={setDailyList} 
                            setSuccessMsg={setSuccessMsg}
                      />} 
          />
          <Route 
            path = '/foodlog/new' 
            element = {<Form  
                            food = {food} 
                            setFood = {setFood}
                            calories = {calories} 
                            setCalories = {setCalories} 
                            foodList={foodList} 
                            setFoodList={setFoodList}
                            dailyList={dailyList} 
                            setDailyList={setDailyList} 
                            newDate={newDate} 
                            setNewDate={setNewDate}
                        />} 
          />
          <Route 
            path = '/foodlog/view/:id' 
            element = {<Day 
                            foodList={foodList} 
                            setFoodList={setFoodList}
                      />}
          />
          <Route 
            path = '/foodlog/update/:id' 
            element = {<Update 
                            food = {food} 
                            setFood = {setFood}
                            calories = {calories} 
                            setCalories = {setCalories} 
                            foodList={foodList} 
                            setFoodList={setFoodList}
                            dailyList={dailyList} 
                            setDailyList={setDailyList} 
                            newDate={newDate} 
                            setNewDate={setNewDate}
                      />}
          />
          <Route path = '/foodlog/register' element = {<Register setSuccessMsg={setSuccessMsg}/>} />
          <Route path = '/foodlog/login' element = {<Login successMsg={successMsg} setSuccessMsg={setSuccessMsg}/>} />
          <Route path = '/foodlog/about' element = {<About/>} />
          <Route path = '/' element = {<Navigate to = '/foodlog/login'/>} />
        </Routes>
        <p
        >Made by<a className='mx-1' id='githubLink' href='https://github.com/Jeremy-Hirschler' target={'_blank'}>Jeremy</a></p>
      </div>
    </BrowserRouter>
  );
}

export default App;
