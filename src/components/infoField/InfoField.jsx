import React from "react";
import Today from "../day/Today";

const InfoField = ({data, addData, selection}) => {

  return(
        <div>
          { data!==''?
                selection==='today'?
                <Today data={data} addData={addData}/>
                :selection==='week'?
                  <Today data={data} addData={addData}/>
                  :<span></span>
            :<span></span>
          }
        </div>
    )

  
}

export default InfoField;