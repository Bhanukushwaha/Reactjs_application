import React, { useState, useEffect } from 'react';

function Aboute() {
  const curTime = new Date().toLocaleTimeString();
  const [time, setTime] = useState(curTime);

  const update = () => {
    const curTime = new Date().toLocaleTimeString();
    setTime(curTime);
  };

  useEffect(() => {
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  const [num, setNum] = useState(0)
  const increment = () =>{
    setNum(num+1)
  }; 
  const decrement = () =>{
    if (num === 0){
      alert("0 not be decrement")
    }
    else{
    setNum(num-1)
    }
  };  

  return (
    <div>
      <h1>how to add will paginat record</h1>
      <h1>{time}</h1> {/* Use 'time' state here */}
      <h2>{num}</h2>
      <div>
       <button onClick={decrement}>decrement</button>
       <button onClick={increment}>increment</button>
      </div>
    </div>
  );
}

export default Aboute;
