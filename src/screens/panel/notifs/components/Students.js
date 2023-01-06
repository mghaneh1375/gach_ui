import React, {useState} from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {dispatchNotifContext, notifContext} from './Context';
import columns from './TableStructure';
import {getStudents} from './Utility';

function Students(props) {
  const useGlobalState = () => [
    React.useContext(notifContext),
    React.useContext(dispatchNotifContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.selectedNotif.students !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([getStudents(props.token, state.selectedNotif.id)]).then(
      res => {
        props.setLoading(false);

        if (res[0] === null) {
          props.setMode('list');
          return;
        }

        state.selectedNotif.students = res[0];

        dispatch({selectedNotif: state.selectedNotif, needUpdate: true});
        setIsWorking(false);
      },
    );
  }, [props, isWorking, dispatch, state.selectedNotif]);

  React.useEffect(() => {
    if (
      state.selectedNotif === undefined ||
      (state.selectedNotif !== undefined &&
        state.selectedNotif.students !== undefined)
    )
      return;
    fetchData();
  }, [state.selectedNotif, fetchData]);

  return (
    <CommonWebBox
      header={'لیست نفرات دریافت کننده'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {state.selectedNotif !== undefined &&
        state.selectedNotif.students !== undefined && (
          <CommonDataTable
            columns={columns}
            data={state.selectedNotif.students}
          />
        )}
    </CommonWebBox>
  );
}

export default Students;
