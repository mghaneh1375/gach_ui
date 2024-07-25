import React, {useState} from 'react';
import {dispatchTeachScheduleContext, teachScheduleContext} from './Context';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import Translator from './Translator';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {studentsColumns} from './TableStructure';
import {LargePopUp} from '../../../../../styles/Common/PopUp';

function Students(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [students, setStudents] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [showOp, setShowOp] = useState(false);

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

  const handleOp = (idx, row) => {
    setSelectedRow(row);
    setShowOp(true);
  };

  return (
    <>
      {!showOp && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => props.setMode('list')}
          header={Translator.studentsList}>
          {students && (
            <CommonDataTable
              excel={false}
              pagination={false}
              handleOp={handleOp}
              columns={studentsColumns}
              data={students}
            />
          )}
        </CommonWebBox>
      )}
      {showOp && (
        <LargePopUp
          title={'عملیات'}
          toggleShowPopUp={() => {
            setShowOp(false);
            setSelectedRow(undefined);
          }}>
          <PhoneView style={{gap: '10px'}}>
            <CommonButton
              onPress={() =>
                window.open(
                  'studentEducationalHistory/' + selectedRow.student.id,
                )
              }
              theme={'transparent'}
              title={Translator.seeStudentProfile}
            />
          </PhoneView>
        </LargePopUp>
      )}
    </>
  );
}

export default Students;
