import React from "react";
import "./ExampleCrop.css";
import CropData from "./CropData";
import { useState } from "react";


export function ExampleCrop() {
  const [data, setData] = useState(CropData);
  
  function handlesearch(e){
    const query = e.target.value;
    if(query === ""){
        setData(CropData);
    }

    const array = CropData.filter((elem)=>{
        return elem.head.toLowerCase().includes(query);
    })

    for (let index = 0; index < CropData.length; index++) {
        const element = CropData[index];
        // if not present in the array 
        if(array.find((elem)=>{ return elem.sl === element.sl}) === undefined
            && element.season.toLowerCase().includes(query)
        ){
            array.push(element);
        }           
    }
    // setfiltered(array);
    setData(array);
}

  return (
    <>
    <div className="backdrop-opacity-10 backdrop-invert bg-white/30">
      <center><h1 className="h1_E" >Find your crop </h1></center>
    
      <div className="search-wrapper">
        <input type="text" onChange={handlesearch} placeholder="Search by Season" />
      </div>


      <table className="table_E">
        <thead className="thead_E">
          <tr style={{color:"white" }}>
            <th>SL NO.</th>
            <th>SEASON</th>
            <th>CROP</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody className="tbody_E">
          {data.map((card, index) => (
            <tr key={index} className="rowex" style={{color:"light"}}>
              <td>{card.sl}</td>
              <td>{card.season}</td>
              <td>{card.head}</td>
              <td>
                <img src={card.imageUrl} alt="img" className="Avtar" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
