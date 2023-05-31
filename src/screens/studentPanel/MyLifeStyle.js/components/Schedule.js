import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {CommonWebBox} from '../../../../styles/Common';
import {fetchExamTags, fetchLifeStyleTags, fetchMyLifeStyle} from '../Utility';
import {dispatchScheduleContext, scheduleContext} from './Context';
import Day from './Day';

function Schedule(props) {
  const useGlobalState = () => [
    React.useContext(scheduleContext),
    React.useContext(dispatchScheduleContext),
  ];

  const [state, dispatch] = useGlobalState();

  const fetchData = React.useCallback(() => {
    Promise.all([
      fetchMyLifeStyle(props.token),
      fetchLifeStyleTags(props.token),
      fetchExamTags(props.token),
    ]).then(res => {
      if (res[0] == null || res[1] == null || res[2] == null) {
        props.navigate('/');
        return;
      }

      dispatch({
        myLifeStyle: res[0],
        lifeStyleTags: res[1],
        examTags: res[2],
      });
    });
  }, [props, dispatch]);

  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);

  return (
    <CommonWebBox>
      {state.myLifeStyle !== undefined &&
        state.myLifeStyle.map((e, index) => {
          <Day boxes={e.items} day={e.day} key={index} />;
        })}
    </CommonWebBox>
  );
}

export default Schedule;
