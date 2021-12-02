import React, { useState } from 'react';

import Btn from '../Btn/Btn.jsx';
import './ActivityDetail.css';

const ActivityDetail = (props) => {
  const [isArchived, setIsArchived] = useState(props.is_archived);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const newDate = new Date(props.created_at);

  const fetchData = async (archived) => {
    try {
      await fetch(`https://aircall-job.herokuapp.com/activities/${props.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: archived }),
      });

      setIsArchived(archived);
    } catch (err) {
      console.log(err);
    }
  };

  // Set the call to archive
  const archivedCallHandler = () => {
    fetchData(true);
  };

  // Set the call to not archive
  const notArchivedCallHandler = () => {
    fetchData(false);
  };

  return (
    <React.Fragment>
      <div className='activity-detail'>
        <div className='detail-row'>
          <h3>From: {props.from}</h3>
        </div>
        <div className='detail-row'>
          <h3>To: {props.to}</h3>
        </div>
        <div className='detail-row'>
          <h3>Direction: {props.direction}</h3>
        </div>
        <div className='detail-row'>
          <h3>Duration: {props.duration}</h3>
        </div>
        <div className='detail-row'>
          <h3>Archived: {props.is_archived.toString()}</h3>
        </div>
        <div className='detail-row'>
          <h3>Call Type: {props.call_type}</h3>
        </div>
        <div className='detail-row'>
          <h3>Via: {props.via}</h3>
        </div>
        <div className='detail-row'>
          <h3>
            Date: {months[newDate.getMonth()]}, {newDate.getDate()}{' '}
            {newDate.getFullYear()}
          </h3>
        </div>
      </div>
      {!isArchived && (
        <Btn onClick={archivedCallHandler} btnGreen>
          Archived Call
        </Btn>
      )}
      {isArchived && (
        <Btn onClick={notArchivedCallHandler} btnBlack>
          Not Archived Call
        </Btn>
      )}
    </React.Fragment>
  );
};

export default ActivityDetail;
