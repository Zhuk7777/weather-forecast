import React from "react";
import Today from "../day/Today";
import Tomorrow from "../futureDays/oneDay/Tomorrow";
import ThreeDays from "../futureDays/threeDays/ThreeDays";

const InfoField = ({data, addData, selection}) => {

  return(
        <div>
          { data!==''?
                selection === 'today'? <Today data={data} addData={addData}/>
                :selection === 'tomorrow'? <Tomorrow data={addData}/>
                :selection === 'three_day'? <ThreeDays data={addData}/>
                :<span></span>
            :<span></span>
          }
        </div>
    )

  
}

export default InfoField;