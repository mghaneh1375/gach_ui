import React, {useState} from 'react';
import {dispatchTeachScheduleContext, teachScheduleContext} from './Context';
import {CommonWebBox} from '../../../../../styles/Common';
import Translator from './Translator';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {studentsColumns} from './TableStructure';

function Students(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [students, setStudents] = useState();

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getScheduleStudents + state.selectedScheduleId,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.setMode('list');
        return;
      }
      setStudents(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId]);

  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={Translator.studentsList}>
      {students && (
        <CommonDataTable columns={studentsColumns} data={students} />
      )}
    </CommonWebBox>
  );
}

export default Students;
