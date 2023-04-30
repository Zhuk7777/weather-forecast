import React from "react";
import Day from "../day/Day";

const InfoField = ({data, addData, selection}) => {

  return(
        <div>
          { data!==''?
                selection==='today'?
                <Day data={data} addData={addData}/>
                :selection==='week'?
                  <Day data={data} addData={addData}/>
                  :<span></span>
            :<span></span>
          }
        </div>
    )

  
}

export default InfoField;