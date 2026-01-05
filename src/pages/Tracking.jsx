import React, { useEffect, useRef, useState } from 'react'
import CodeTracker from "../components/sections/CodeTracker";
import { baseUrl } from '..';
import "../tracking.css"

const Tracking = () => {

  
    const [todayRange , setTodayRange] = useState([])
    const [progress , setProgress] = useState(0)
    const progressButtonRef = useRef()
    const  [showToolTip,setToolTip] = useState(false)
    useEffect(() =>{
  
      const getTodayRange = async() =>{
        const response = await fetch(`${baseUrl}/get-today-logs`)
        const data = await response.json()
        setTodayRange(data.today_logs?.data[0].grand_total)
      }
      getTodayRange()
    },[])
  
    useEffect(() =>{
      if(!todayRange) return
  let workDone = (todayRange?.hours * 60 ) + todayRange?.minutes
  let totalTime = 14 * 60
  let progress = workDone === 0 ? 0 : (workDone / totalTime) * 100;
  setProgress(progress)
    },[todayRange])
  
  
    const MouseEnter = () =>{
      setToolTip(true)
    }
    const MouseLeave =() =>{
      setToolTip(false)
    }
  
  return (
    <div  className='tracking-page'>
      <div className='today-hustle-text'>
        Today Hustle
      </div>
      {             
      <div  onMouseEnter={()=>MouseEnter()} onMouseLeave={()=>MouseLeave()} className="single-week-glow" ref={progressButtonRef}>
        <div  className="progress-bar" style={{width:`${progress}%`}}/>
       <div className="time-container-hero"> 
          <span className="hours">{todayRange?.hours || 0}hr</span>:  
          <span className="minutes">{todayRange?.minutes || 0}min</span>
        </div>
        </div>
      }
      {
        showToolTip &&   <div className="tool-tip">
      Another productive day of coding! Here’s my total time
            </div>
      }
            <CodeTracker />
      
    </div>
  )
}

export default Tracking
