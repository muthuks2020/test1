import React, { useState, useEffect } from 'react';
import appStyles from './styles/app.module.scss';
import homeStyles from './styles/home.module.scss';

const Home = props => {
  const [data, setData] = useState();

  useEffect(() => {
    if (props.match.params.filterStr !== undefined) {
      fetch(
        `https://api.spacexdata.com/v3/launches?limit=100${props.match.params.filterStr}`
      )
        .then(res => res.json())
        .then(res => {
          setData(res);
        })
        .catch(err => console.log(err));
    } else {
      fetch('https://api.spacexdata.com/v3/launches?limit=100')
        .then(res => res.json())
        .then(res => {
          setData(res);
        })
        .catch(err => console.log(err));
    }
  }, [props.match]);

  return (
    <div className={appStyles.row}>
      {data &&
        data.map(item => (
          <div key={item.flight_number} className={homeStyles.column}>
            <div className={homeStyles.missionSec}>
              <div className={homeStyles.imgsec}>
                <img src={item.links.mission_patch_small} alt="mission-img" />
              </div>
              <div className={homeStyles.missionDetails}>
                <h3 className={homeStyles.missionTitle}>
                  {item.mission_name} #{item.flight_number}
                </h3>
                <h3 className={homeStyles.missionId}>Mission Ids:</h3>
                <ul className={homeStyles.missionIdList}>
                  {item.mission_id &&
                    item.mission_id.map(id => <li key={id}>{id}</li>)}
                </ul>
                <div className={homeStyles.missionStatSec}>
                  <h4 className={homeStyles.missionStatus}>
                    <span>Launch Year:</span>
                  </h4>
                  <h4 className={homeStyles.missionStatus}>
                    {item.launch_year}
                  </h4>
                </div>
                <div className={homeStyles.missionStatSec}>
                  <h4 className={homeStyles.missionStatus}>
                    <span>Successful Launch:</span>
                  </h4>
                  <h4 className={homeStyles.missionStatus}>
                    {item.launch_success ? 'True' : 'False'}
                  </h4>
                </div>
                <div className={homeStyles.missionStatSec}>
                  <h4 className={homeStyles.missionStatus}>
                    <span>Successful Land:</span>
                  </h4>
                  <h4 className={homeStyles.missionStatus}>False</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Home;
