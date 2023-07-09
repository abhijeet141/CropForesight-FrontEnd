import React, { useEffect, useState } from "react";
import axios from 'axios';
import NAV from "./nav";
import "./Contributors.css"
const Contributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/abhijeet141/CropForesight-FrontEnd/contributors"
        );
        const data = response.data;
        console.log(data);
        setContributors(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <NAV/>
    <br /><br /><br /><br /><br />
      <div>
        <h1>
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
            <a href={i.html_url} target="_blank">
              <button className="view" >
                View
              </button>
            </a>
          </div>
          </>   
        ))}
      </div>
    </>
  );
}

export default Contributors;
