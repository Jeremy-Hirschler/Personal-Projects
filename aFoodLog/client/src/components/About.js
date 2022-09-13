import React from 'react'
import Navbar from './Navbar';

const About = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='d-flex flex-column'>
                    <div className='border border-dark rounded mx-auto my-3 column col-12 col-sm-12 col-md-10 col-lg-10'>
                        <Navbar/>
                    </div>
                    <div className=' text-white border border-dark rounded d-flex flex-column align-items-start mx-auto px-4 py-2 my-3 column col-12 col-sm-10 col-md-10 col-lg-10'>
                        <h2>About the site:</h2>
                        <p>Welcome to food log! Yeah I couldn't think of a better name.</p>
                        <p>Enter your daily food log submissions to keep track of your total daily calorie count!
                            That's pretty much it. Enjoy!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
