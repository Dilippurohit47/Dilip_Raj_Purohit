import { useEffect } from "react"
import "../styles/code-tracker.css"
import { useState } from "react"
import { baseUrl } from "../.."



const CodeTracker = () =>{

const [sevenDaysLogs,setSevenDaysLogs] = useState([])
const [loading,setLoading]  = useState(true)
  useEffect(() =>{  
  const  getSevenDaysLogs = async() =>{
    setLoading(true)
      try {
const res = await fetch(`${baseUrl}/get-7d-logs`)  
const data = await res.json()
if(data.success){
  console.log("in 200")
  setSevenDaysLogs(data?.seven_days_logs)
}
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
getSevenDaysLogs()
  },[])
  console.log("object",sevenDaysLogs)

    return <div  id="coding-time" className="code-tracker-parent">
<div className="heading" >
Weekly Hustle 💥
</div>
<div className="logs-parent">

{ sevenDaysLogs &&  sevenDaysLogs?.length > 0 ?
sevenDaysLogs?.map((log) =>{
let workDone = (log.grand_total.hours * 60 )+ log.grand_total.minutes
let totalTime = 14 * 60
let progress = workDone === 0 ? 0 : (workDone / totalTime) * 100;
return <div  className="single-week">
  <div  className="progress-bar" style={{width:`${progress}%`}}/>
 <div className="time-container"> 
   <span className="week-name">{log.range.text.split(" ")[0]}</span>
  <div className="time">
    <span className="hours">{log.grand_total.hours}hr</span>:
    <span className="minutes">{log.grand_total.minutes}min</span>
  </div>
 </div>
</div>
  })
   : <div className="loader" style={{backgroundColor:"" , color:"white"}}> {loading ? "Loading.." : <span style={{fontSize:"1rem"}}>
    currently not avialable
    </span>} 

   </div>
}


</div>
    </div>
}

export default CodeTracker