import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Main from './components/Main';
import Form from './components/Form';
import Day from './components/Day';
import Update from './components/Update';
import {useState} from 'react';


function App() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [dailyList, setDailyList] = useState([]);
  const [newDate, setNewDate] = useState('');

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route 
          path = '/foodlog/home' 
          element = {<Main 
                          foodList={foodList} 
                          setFoodList={setFoodList}
                          dailyList={dailyList} 
                          setDailyList={setDailyList} 
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
          <Route path = '/' element = {<Navigate to = '/foodlog/home'/>} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
