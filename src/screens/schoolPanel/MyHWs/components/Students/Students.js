import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import SelectFromMyStudents from '../../../../../components/web/SelectFromMyStudents';
import {
  showError,
  showSuccess,
  simpleConvertTimestamp,
} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import translator from '../../../../panel/quiz/Translator';
import {
  dispatchMyQuizzesContext,
  myQuizzesContext,
} from '../../../MyQuizzes/components/Context';

import commonTranslator from '../../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import hwTranslator from '../Translator';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {styles} from '../../../../../styles/Common/Styles';

const Students = props => {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedSudent, setSelectedStudent] = useState(undefined);

  const setStudents = newList => {
    state.selectedQuiz.students = newList;
    state.selectedQuiz.studentsCount = newList.length;
    state.selectedQuiz.recp = undefined;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
  };

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const fetchStudents = React.useCallback(() => {
    if (isWorking || state.selectedQuiz.students !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getParticipants + 'hw/' + state.selectedQuiz.id,
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

  React.useEffect(() => {
    if (
      state.selectedQuiz !== undefined &&
      state.selectedQuiz.students === undefined
    )
      fetchStudents();
  }, [state.selectedQuiz, fetchStudents]);

  const handleOp = idx => {
    setSelectedStudent(state.selectedQuiz.students[idx]);
    toggleShowOpPopUp();
  };

  const [data, setData] = useState();

  const filter = (markStatus, uploadStatus) => {
    if (
      state.selectedQuiz === undefined ||
      state.selectedQuiz.students === undefined
    )
      return;

    setData(
      state.selectedQuiz.students.filter(e => {
        if (markStatus === 'marked' && (e.mark === undefined || e.mark < 0))
          return false;
        if (markStatus === 'notMarked' && e.mark !== undefined && e.mark >= 0)
          return false;
        if (
          uploadStatus === 'uploaded' &&
          (e.uploadAt === undefined || e.uploadAt <= 0)
        )
          return false;
        if (
          uploadStatus === 'notUploaded' &&
          e.uploadAt !== undefined &&
          e.uploadAt > 0
        )
          return false;

        return true;
      }),
    );
  };

  React.useEffect(() => {
    if (columns !== undefined) return;

    setColumns([
      {
        name: 'نام دانش آموز',
        selector: row => row.name,
      },
      {
        name: commonTranslator.NID,
        selector: row => row.NID,
      },
      {
        name: 'تاریخ آپلود تمرین',
        selector: row =>
          row.uploadAt === 0 ? '' : simpleConvertTimestamp(row.uploadAt),
        sortable: true,
        sortFunction: (a, b) => {
          return a.uploadAt - b.uploadAt;
        },
      },
      {
        name: 'نمره',
        selector: row => (row.mark === -1 ? 'نمره داده نشده' : row.mark),
        sortable: true,
        sortFunction: (a, b) => {
          return a.mark - b.mark;
        },
      },
      {
        name: 'تاریخ نمره دهی',
        selector: row =>
          row.markAt === 0 ? '' : simpleConvertTimestamp(row.markAt),
        sortable: true,
        sortFunction: (a, b) => {
          return a.markAt - b.markAt;
        },
      },
      {
        name: 'فایل آپلود شده',
        cell: (row, index, column, id) => {
          if (row.filename === undefined) return <></>;

          return <a href={row.url}>{row.filename}</a>;
        },
      },
    ]);
  }, [columns]);

  React.useEffect(() => {
    setData(state.selectedQuiz.students);
  }, [state.selectedQuiz.students]);

  const [showSelectStudentsPane, setShowSelectStudentsPane] = useState(false);
  const [showMarkPopUp, setShowMarkPopUp] = useState();
  const [selectedStudents, setSelectedStudents] = useState();
  const [mark, setMark] = useState();
  const [markDesc, setMarkDesc] = useState();

  const addStudentsToQuiz = React.useCallback(() => {
    if (
      isWorking ||
      selectedStudents === undefined ||
      selectedStudents.length === 0
    )
      return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.forceRegistry + 'hw/' + state.selectedQuiz.id,
        'put',
        {
          items: selectedStudents.map(elem => {
            return elem.NID;
          }),
          paid: 0,
        },
        ['excepts', 'doneIds'],
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) return;

      showSuccess(res[0].excepts);
      let addedStudents = state.myStudents.filter(e => {
        return res[0].doneIds.indexOf(e.id) !== -1;
      });

      state.selectedQuiz.students = addedStudents.concat(
        state.selectedQuiz.students,
      );

      state.selectedQuiz.studentsCount = state.selectedQuiz.students.length;
      state.selectedQuiz.recp = undefined;
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});

      setSelectedStudents(undefined);
      setIsWorking(false);
    });
  }, [
    props,
    isWorking,
    dispatch,
    state.selectedQuiz,
    state.myStudents,
    selectedStudents,
  ]);

  React.useEffect(() => {
    if (selectedStudents === undefined || selectedStudents.length === 0) return;
    addStudentsToQuiz();
  }, [selectedStudents, addStudentsToQuiz]);

  React.useEffect(() => {
    if (showMarkPopUp && selectedSudent !== undefined) {
      setMark(selectedSudent.mark < 0 ? undefined : selectedSudent.mark);
      setMarkDesc(selectedSudent.markDesc);
    }
  }, [showMarkPopUp, selectedSudent]);

  const [columns, setColumns] = useState();

  const [markStatus, setMarkStatus] = useState('all');
  const [uploadStatus, setUploadStatus] = useState('all');

  const markStatusValues = [
    {id: 'all', item: 'همه'},
    {id: 'marked', item: 'نمره داده شده'},
    {id: 'notMarked', item: 'نمره داده نشده'},
  ];

  const uploadStatusValues = [
    {id: 'all', item: 'همه'},
    {id: 'uploaded', item: 'آپلود شده'},
    {id: 'notUploaded', item: 'آپلود نشده'},
  ];

  return (
    <MyView>
      {showMarkPopUp && (
        <LargePopUp
          toggleShowPopUp={() => setShowMarkPopUp(false)}
          title={'نمره دهی به ' + selectedSudent.name}
          btns={
            <CommonButton
              theme={'dark'}
              title={commonTranslator.confrim}
              onPress={async () => {
                if (mark === undefined || mark < 0 || mark > 100) {
                  showError(hwTranslator.markConst);
                  return;
                }
                if (markDesc !== undefined && markDesc.length > 300) {
                  showError(hwTranslator.markDescConst);
                  return;
                }
                props.setLoading(true);
                let res = await generalRequest(
                  routes.setMarkHW +
                    state.selectedQuiz.id +
                    '/' +
                    selectedSudent.id,
                  'put',
                  {mark: mark, markDesc: markDesc},
                  undefined,
                  props.token,
                );
                props.setLoading(false);
                if (res !== null) {
                  showSuccess();
                  state.selectedQuiz.students = state.selectedQuiz.students.map(
                    e => {
                      if (e.id === selectedSudent.id) {
                        e.mark = mark;
                        if (markDesc !== undefined && markDesc.length > 0)
                          e.markDesc = markDesc;
                        e.markAt = Date.now();
                      }

                      return e;
                    },
                  );
                  dispatch({
                    selectedQuiz: state.selectedQuiz,
                    needUpdate: true,
                  });

                  setMark(undefined);
                  setMarkDesc(undefined);
                  setShowMarkPopUp(false);
                }
              }}
            />
          }>
          <JustBottomBorderTextInput
            onChangeText={e => setMark(e)}
            value={mark}
            justNum={true}
            placeholder={hwTranslator.mark}
            subText={hwTranslator.markHelp}
          />

          <JustBottomBorderTextInput
            onChangeText={e => setMarkDesc(e)}
            value={markDesc}
            multiline={true}
            placeholder={hwTranslator.markDesc}
            subText={hwTranslator.markDescHelp}
          />
        </LargePopUp>
      )}
      {showSelectStudentsPane && (
        <SelectFromMyStudents
          token={props.token}
          setLoading={props.setLoading}
          myStudents={state.myStudents}
          setMyStudents={myStudents => dispatch({myStudents: myStudents})}
          setSelectedStudents={selected => setSelectedStudents(selected)}
          toggleShowPopUp={() => setShowSelectStudentsPane(false)}
          title={'افزودن دانش آموز/دانش آموزان به تمرین'}
        />
      )}
      {showOpPopUp && (
        <LargePopUp
          toggleShowPopUp={toggleShowOpPopUp}
          title={state.selectedQuiz.title}>
          <PhoneView style={{gap: 20}}>
            <CommonButton
              onPress={() => {
                setShowMarkPopUp(true);
                setShowOpPopUp(false);
              }}
              dir={'rtl'}
              theme={'transparent'}
              title={'نمره دهی'}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {!showMarkPopUp && (
        <CommonWebBox
          btn={
            <PhoneView>
              {state.selectedQuiz.status === 'init' && (
                <CommonButton
                  title={'انتخاب دانش آموزان'}
                  theme={'dark'}
                  onPress={() => setShowSelectStudentsPane(true)}
                />
              )}

              <CommonButton
                title={'بازگشت'}
                onPress={() => props.setMode('list')}
              />
            </PhoneView>
          }
          header={translator.studentsListInQuiz}>
          <PhoneView style={{...styles.gap10}}>
            <JustBottomBorderSelect
              setter={e => {
                setMarkStatus(e);
                filter(e, uploadStatus);
              }}
              values={markStatusValues}
              value={markStatusValues.find(e => e.id === markStatus)}
              placeholder={'وضعیت تصحیح'}
              subText={'وضعیت تصحیح'}
            />
            <JustBottomBorderSelect
              setter={e => {
                setUploadStatus(e);
                filter(markStatus, e);
              }}
              values={uploadStatusValues}
              value={uploadStatusValues.find(e => e.id === uploadStatus)}
              placeholder={'وضعیت آپلود'}
              subText={'وضعیت آپلود'}
            />
          </PhoneView>
          {data !== undefined && columns !== undefined && (
            <CommonDataTable
              columns={columns}
              data={data}
              handleOp={handleOp}
              setLoading={props.setLoading}
              token={props.token}
              setData={setStudents}
              removeUrl={
                state.selectedQuiz.status === 'init'
                  ? routes.forceDeportation + 'hw/' + state.selectedQuiz.id
                  : undefined
              }
            />
          )}
        </CommonWebBox>
      )}
    </MyView>
  );
};

export default Students;
