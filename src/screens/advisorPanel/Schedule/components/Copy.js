import React, {useState} from 'react';
import SelectFromMyStudents from '../../../../components/web/SelectFromMyStudents';
import {showSuccess} from '../../../../services/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {
  advisorScheduleContext,
  dispatchAdvisorScheduleContext,
} from './Context';
import {copy} from './Utility';

function Copy(props) {
  const useGlobalState = () => [
    React.useContext(advisorScheduleContext),
    React.useContext(dispatchAdvisorScheduleContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [showSelectStudentsPane, setShowSelectStudentsPane] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState();

  const [isWorking, setIsWorking] = useState(false);
  const [scheduleFor, setScheduleFor] = useState();

  const scheduleForValues = [
    {id: 0, item: 'هفته جاری'},
    {id: 1, item: 'هفته بعد'},
    {id: 2, item: 'دو هفته بعد'},
    {id: 3, item: 'سه هفته بعد'},
    {id: 4, item: 'چهار هفته بعد'},
  ];

  const doCopy = React.useCallback(() => {
    if (
      isWorking ||
      selectedStudents === undefined ||
      scheduleFor === undefined ||
      selectedStudents.length === 0
    )
      return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      copy(
        props.token,
        state.selectedSchedule.id,
        scheduleFor,
        selectedStudents.map(e => e.id),
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) return;

      showSuccess(res[0].excepts);

      if (res[0].doneIds.indexOf(props.studentId) !== -1) {
        window.location.reload();
      } else {
        props.setMode('list');
        setIsWorking(false);
      }
    });
  }, [
    props,
    isWorking,
    selectedStudents,
    scheduleFor,
    state.selectedSchedule.id,
  ]);

  React.useEffect(() => {
    if (selectedStudents === undefined || selectedStudents.length === 0) return;
    doCopy();
  }, [selectedStudents, doCopy]);

  return (
    <CommonWebBox>
      {showSelectStudentsPane && (
        <SelectFromMyStudents
          token={props.token}
          setLoading={props.setLoading}
          myStudents={state.myStudents}
          setMyStudents={myStudents => dispatch({myStudents: myStudents})}
          setSelectedStudents={selected => setSelectedStudents(selected)}
          toggleShowPopUp={() => setShowSelectStudentsPane(false)}
          title={'انتخاب دانش آموز/دانش آموزان'}
        />
      )}
      {!showSelectStudentsPane && (
        <>
          <PhoneView>
            <JustBottomBorderSelect
              setter={setScheduleFor}
              values={scheduleForValues}
              value={scheduleForValues.find(elem => elem.id === scheduleFor)}
              placeholder={'هفته موردنظر'}
            />
          </PhoneView>
          <CommonButton
            theme={'dark'}
            onPress={() => setShowSelectStudentsPane(true)}
            title={'مرحله بعد'}
          />
        </>
      )}
    </CommonWebBox>
  );
}

export default Copy;
