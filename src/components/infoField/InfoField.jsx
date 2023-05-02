import React from "react";
import Today from "../day/Today";
import ThreeDays from "../futureDays/threeDays/ThreeDays";
import CertainDay from "../futureDays/oneDay/CertainDay";
import Week from "../futureDays/week/Week";

const InfoField = ({data, addData, selection}) => {
  return(
        <div>
          { data!==''?
                selection === 'today'? <Today data={data} addData={addData}/>
                :selection === 'tomorrow'? <CertainDay data={addData.forecast.forecastday[1]} city={data.location.name}/>
                :selection === 'three_day'? <ThreeDays data={addData}/>
                :selection === 'week'? <Week data={addData}/>:<span></span>
            :<span></span>
          }
        </div>
    )

  
}

export default InfoField;