import React, { useEffect, useState } from "react";
import axios from 'axios';
import HashLoader from "react-spinners/HashLoader";

import "./contributor.css"
const Contributor = ({override}) => {
  const [contributors, setContributors] = useState([]);
  let [loading,setLoading] = useState(true);
  let [color,] = useState("#ffffff");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/abhijeet141/CropForesight-FrontEnd/contributors"
        );
        const data = response.data;
        setContributors(data);
        setLoading(false)
      } catch (error) { 
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    {loading ? <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> :
      <>
       <div >
        <h1 className="h1" >
          Our Contributors
        </h1>
      </div>
      <div className="main_cont">
        {contributors.map((i) => (
          <>
          <div className="Contributor_cards">
          <div className="image">
            <img src={i.avatar_url} alt="" />
          </div>
          <div className="login" key={i.id}>{i.login}</div>
          <div className="commits">
            Commits: {i.contributions}
          </div>
          <a href={i.html_url} target='_blank' rel="noreferrer">
              <button className="view" >
                View
              </button>
            </a>
          </div>
          </>   
        ))}
      </div>
      </>
      }
     
    </>
  );
}
export default Contributor;



