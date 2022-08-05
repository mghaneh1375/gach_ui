import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {View} from 'react-native';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import ExcelComma from '../../../../../components/web/ExcelCommaInput';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import columns from './TableStructure';
import SearchUser from '../../../../../components/web/SearchUser/SearchUser';
import {changeText, showSuccess} from '../../../../../services/Utility';
import {removeStudents} from '../Utility';
import {dispatchQuizContext, quizContext} from '../Context';

const Students = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedSudent, setSelectedStudent] = useState(undefined);
  const [paid, setPaid] = useState();

  const afterAdd = items => {
    if (items === undefined) return;
    setStudents(items.concat(state.selectedQuiz.students));
  };

  const setStudents = newList => {
    state.selectedQuiz.students = newList;
    state.selectedQuiz.studentsCount = newList.length;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
  };

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const removeStudent = () => {
    props.setLoading(true);
    Promise.all([
      removeStudents(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        [selectedSudent.student.id],
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        let stds = state.selectedQuiz.students.filter(elem => {
          return res[0].doneIds.indexOf(elem.id) === -1;
        });

        setStudents(stds);
        toggleShowOpPopUp();
        showSuccess(res[0].excepts);
      }
    });
  };

  React.useEffect(() => {
    if (isWorking || state.selectedQuiz.students !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        state.selectedQuiz.generalMode === 'IRYSC'
          ? routes.getIRYSCParticipants + state.selectedQuiz.id
          : routes.getSchoolParticipants + state.selectedQuiz.id,
        'get',
        undefined,
        'students',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      state.selectedQuiz.students = res[0];
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, state.selectedQuiz]);

  const handleOp = idx => {
    setSelectedStudent(state.selectedQuiz.students[idx]);
    toggleShowOpPopUp();
  };

  const [showSearchUser, setShowSearchUser] = useState(false);
  const [foundUser, setFoundUser] = useState();

  return (
    <View>
      <SearchUser
        setFinalResult={setFoundUser}
        setShow={setShowSearchUser}
        token={props.token}
        setLoading={props.setLoading}
        show={showSearchUser}
      />
      {showOpPopUp && (
        <LargePopUp
          toggleShowPopUp={toggleShowOpPopUp}
          title={state.selectedQuiz.title}>
          <PhoneView style={{flexWrap: 'wrap'}}>
            <CommonButton
              onPress={() => removeStudent()}
              dir={'rtl'}
              theme={'transparent'}
              title={translator.deleteStudent}
            />
          </PhoneView>
        </LargePopUp>
      )}
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        style={{zIndex: 'unset'}}
        header={translator.studentsListInQuiz}>
        <ExcelComma
          header={translator.addStudent}
          placeholder={commonTranslator.NIDs}
          help={commonTranslator.NIDHelp}
          newItems={
            foundUser === undefined ? [] : foundUser.map(elem => elem.NID)
          }
          setNewItems={setFoundUser}
          setLoading={props.setLoading}
          onSearchClick={() => setShowSearchUser(true)}
          token={props.token}
          url={
            routes.forceRegistry +
            state.selectedQuiz.generalMode +
            '/' +
            state.selectedQuiz.id
          }
          afterAddingCallBack={afterAdd}
          additionalData={{paid: paid}}
          mandatoryFields={['paid']}>
          <View style={{zIndex: 1, marginBottom: 10}}>
            <JustBottomBorderTextInput
              justNum={true}
              value={paid}
              onChangeText={e => changeText(e, setPaid)}
              placeholder={commonTranslator.paid}
            />
          </View>
        </ExcelComma>
        <CommonDataTable
          columns={columns}
          data={state.selectedQuiz.students}
          handleOp={handleOp}
          setLoading={props.setLoading}
          token={props.token}
          setData={setStudents}
          removeUrl={
            routes.forceDeportation +
            state.selectedQuiz.generalMode +
            '/' +
            state.selectedQuiz.id
          }
        />
      </CommonWebBox>
    </View>
  );
};

export default Students;
