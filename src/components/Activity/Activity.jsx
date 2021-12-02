import React from 'react';

import './Activity.css';

const Activity = (props) => {
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

  let call;
  if (props.allCalls) {
    call = props.allCalls.map((call) => {
      // Get format time and date
      const createdTime = new Date(call.created_at);
      const year = createdTime.getFullYear();
      const month = createdTime.getMonth();
      const date = createdTime.getDate();
      let hours = createdTime.getHours();
      const min = createdTime.getMinutes();
      let amOrPm = 'AM';

      if (hours > 12) {
        amOrPm = 'PM';
        hours = hours - 12;
      } else if (hours === 12) {
        amOrPm = 'PM';
        hours = hours.toString();
      }

      if (hours < 10) {
        hours = '0' + hours.toString();
      }

      return (
        <div className='container-view' key={call.id}>
          <h3>
            {months[month]}, {date} {year}
          </h3>
          <div className='detail' id={call.id} onClick={props.onClick}>
            <div>
              <img
                src='https://cdn-icons-png.flaticon.com/512/483/483955.png'
                alt='Missed Call'
              />
            </div>
            <div>
              <h3>{call.from}</h3>
              <h3>
                tried to call on <span>{call.to}</span>
              </h3>
            </div>
            <div>
              {hours}:{min} {amOrPm}
            </div>
          </div>
        </div>
      );
    });
  }

  return call;
};

export default Activity;
