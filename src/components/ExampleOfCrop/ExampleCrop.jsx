import React from "react";
import "./ExampleCrop.css";
import CropData from "./CropData";
import { useState } from "react";
import Navbar from '../Navbar/Navbar'


export function ExampleCrop({mode,setmode}) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(CropData);
  
  function handlesearch(e){
    setSearch(e.target.value);
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
      <Navbar isHomepage={false} mode={mode} setmode={setmode} />
    <div className="backdrop-opacity-10 backdrop-invert bg-white/30">
      <center><h1 className="h1_E" >Find your crop </h1></center>
    
      <div className="search-wrapper">
        <input type="text" placeholder="Search by Season" />
      </div>


      <table className="table_E" style={{backgroundColor:mode === "light" ? "white": ""}}>
        <thead className="thead_E">
          <tr style={{backgroundColor:mode === "light" ? "white": "",color:mode === "light"? "black" : "white" }}>
            <th>SL NO.</th>
            <th>SEASON</th>
            <th>CROP</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody className="tbody_E">
          {data.map((card, index) => (
            <tr key={index} className="rowex" style={{backgroundColor:mode === "light" ? "white": "",color:mode === "light"? "black" : "white" }}>
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
