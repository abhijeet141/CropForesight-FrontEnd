import React, { useEffect, useState } from 'react';
import './contributor.css';
import NAV from './nav';

function Contributor() {

    const [contributors, setContributors] = useState([]);

    const getData = async () => {
        const res = await fetch(
            `https://api.github.com/repos/abhijeet141/CropForesight-FrontEnd/contributors?per_page=40`
        );

        const data = await res.json();
        setContributors(data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='main'>
            <NAV />

            <div style={{ padding: "5% 0" }}>
                <p style={{ fontSize: "2.5rem", color: "#fff", textAlign: "center", marginBottom: "5rem" }}>Our Contributors</p>
                <div className='contributor-container'>
                    {contributors?.map((contributor, i) => (
                        <div className='content' key={i}>
                            <div className='content-child'>
                                <img
                                    src={`https://images.weserv.nl/?output=webp&url=${contributor.avatar_url}`}
                                    alt={contributor.login}
                                />
                                <div>
                                    <p style={{ fontSize: "2rem" }}>{contributor.login}</p>
                                    <p style={{ fontSize: "1.5rem" }}>{contributor.contributions} Commits</p>
                                </div>
                            </div>
                            <a href={contributor.html_url} target='_blank' rel="noreferrer">
                                <button className='contributor-btn'>Profile</button>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Contributor;