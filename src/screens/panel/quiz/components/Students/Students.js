import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
  CommonRadioButton,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import ExcelComma from '../../../../../components/web/ExcelCommaInput';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import columns, {columnsForQRTashtihi} from './TableStructure';
import {columnsForTashtihi} from './TableStructure';
import SearchUser from '../../../../../components/web/SearchUser/SearchUser';
import {changeText, showSuccess} from '../../../../../services/Utility';
import {getAnswerSheets, removeStudents} from '../Utility';
import {dispatchQuizContext, quizContext} from '../Context';
import StudentAnswerSheet from '../AnswerSheet/StudentAnswerSheet';

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
        routes.getParticipants +
          state.selectedQuiz.generalMode +
          '/' +
          state.selectedQuiz.id,
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
  const [studentIdx, setStudentIdx] = useState();
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [showJustRate, setShowJustRate] = useState(false);
  const [data, setData] = useState();

  React.useEffect(() => {
    setData(state.selectedQuiz.students);
  }, [state.selectedQuiz.students]);

  const prepareShowAnswerSheet = async () => {
    if (state.selectedQuiz.mode === 'tashrihi') {
      window.open(
        '/showAnswerSheet/' +
          state.selectedQuiz.generalMode +
          '/' +
          state.selectedQuiz.id +
          '/student/' +
          selectedSudent.id,
        '_blank',
      );
    }

    if (state.selectedQuiz.answer_sheets === undefined) {
      props.setLoading(true);
      let res = await getAnswerSheets(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        props.token,
      );

      props.setLoading(false);

      if (res !== null) {
        state.selectedQuiz.answer_sheet = res.answers;
        state.selectedQuiz.answer_sheets = res.students;
        dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      } else return;
    }

    state.selectedQuiz.answer_sheets.forEach((elem, index) => {
      if (elem.student.id == selectedSudent.id) {
        let data = state.selectedQuiz.answer_sheet.map((elem, idx) => {
          elem.studentAns =
            state.selectedQuiz.answer_sheets[index].answers[idx];
          return elem;
        });

        dispatch({
          showAnswers: true,
          showStdAnswers: true,
          allowChangeStdAns: true,
          allowChangeAns: false,
          wanted_answer_sheet: data,
          new_std_answer_sheet: state.selectedQuiz.answer_sheets[
            index
          ].answers.map(elem => {
            return elem;
          }),
        });
        setStudentIdx(index);
        setShowOpPopUp(false);
        setShowAnswerSheet(true);
      }
    });
  };

  return (
    <MyView>
      {showAnswerSheet && (
        <StudentAnswerSheet
          selectedAnswerSheetIdx={studentIdx}
          setLoading={props.setLoading}
          onBackClick={() => setShowAnswerSheet(false)}
          token={props.token}
          state={state}
          dispatch={dispatch}
        />
      )}
      {showOpPopUp && (
        <LargePopUp
          toggleShowPopUp={toggleShowOpPopUp}
          title={state.selectedQuiz.title}>
          <PhoneView style={{gap: 20}}>
            <CommonButton
              onPress={() => removeStudent()}
              dir={'rtl'}
              theme={'transparent'}
              title={translator.deleteStudent}
            />
            <CommonButton
              onPress={() => prepareShowAnswerSheet()}
              dir={'rtl'}
              theme={'transparent'}
              title={'مشاهده پاسخ برگ'}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {!showAnswerSheet && (
        <MyView>
          <SearchUser
            setFinalResult={setFoundUser}
            setShow={setShowSearchUser}
            token={props.token}
            setLoading={props.setLoading}
            show={showSearchUser}
          />
          <CommonWebBox
            backBtn={true}
            onBackClick={() => props.setMode('list')}
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
              <MyView style={{marginBottom: 10}}>
                <JustBottomBorderTextInput
                  justNum={true}
                  value={paid}
                  onChangeText={e => changeText(e, setPaid)}
                  placeholder={commonTranslator.paid}
                />
              </MyView>
            </ExcelComma>
            <CommonRadioButton
              status={showJustRate ? 'checked' : 'unchecked'}
              onPress={() => {
                setShowJustRate(true);
                setData(
                  state.selectedQuiz.students.filter(e => e.rate !== undefined),
                );
              }}
              text={'فقط افراد دارای امتیاز را نمایش بده'}
            />
            <CommonRadioButton
              status={showJustRate ? 'unchecked' : 'checked'}
              onPress={() => {
                setShowJustRate(false);
                setData(state.selectedQuiz.students);
              }}
              text={'نمایش همه افراد'}
            />
            {data !== undefined && (
              <CommonDataTable
                columns={
                  state.selectedQuiz.mode === 'tashrihi'
                    ? state.selectedQuiz.isQRNeeded !== undefined &&
                      state.selectedQuiz.isQRNeeded
                      ? columnsForQRTashtihi
                      : columnsForTashtihi
                    : columns
                }
                data={data}
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
            )}
          </CommonWebBox>
        </MyView>
      )}
    </MyView>
  );
};

export default Students;
