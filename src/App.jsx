import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

import Btn from './components/Btn/Btn.jsx';
import Activity from './components/Activity/Activity.jsx';
import ActivityDetail from './components/ActivityDetail/ActivityDetail.jsx';
import Header from './Header.jsx';

const App = () => {
  const [displayType, setDisplayType] = useState('feed');
  const [allCalls, setAllCalls] = useState();
  const [archivedCall, setArchivedCall] = useState();
  const [callDetail, setCallDetail] = useState();

  const fetchAirCallData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://aircall-job.herokuapp.com/activities`
      );
      const data = await response.json();
      setAllCalls(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchAirCallData();
  }, []);

  // Display all calls list
  const activityFeedHandler = () => {
    setDisplayType('feed');
  };

  // Display archive calls list
  const archiveCallHandler = () => {
    const archivedCall = allCalls.filter((call) => call.is_archived);
    setArchivedCall(archivedCall);
    setDisplayType('archive');
    fetchAirCallData();
  };

  // Display details
  const activityDetail = (e) => {
    const callDetail = allCalls.find((call) => call.id === +e.target.id);
    setCallDetail(callDetail);
    setDisplayType('detail');
  };

  return (
    <div className='container'>
      <Header />
      <div className='activity-container'>
        <Btn onClick={activityFeedHandler} btnGreen>
          Activity Feed
        </Btn>
        <Btn onClick={archiveCallHandler} btnGreen>
          Archive all calls
        </Btn>
      </div>
      {displayType === 'feed' && allCalls && (
        <Activity allCalls={allCalls} onClick={activityDetail} />
      )}

      {displayType === 'archive' && allCalls && (
        <Activity allCalls={archivedCall} onClick={activityDetail} />
      )}

      {displayType === 'detail' && <ActivityDetail {...callDetail} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
