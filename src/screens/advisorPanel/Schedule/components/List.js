import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {CommonWebBox} from '../../../../styles/Common';
import {
  advisorScheduleContext,
  dispatchAdvisorScheduleContext,
} from './Context';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {fetchSchedules} from './Utility';
import columns from './TableStructure';

function List(props) {
  const useGlobalState = () => [
    React.useContext(advisorScheduleContext),
    React.useContext(dispatchAdvisorScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([fetchSchedules(props.token, props.studentId)]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        props.navigate('/');
        return;
      }

      dispatch({schedules: res[0]});
    });
  }, [props]);

  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);

  return (
    <CommonWebBox>
      {state.schedules !== undefined && (
        <CommonDataTable columns={columns} data={state.schedules} />
      )}
    </CommonWebBox>
  );
}

export default List;
