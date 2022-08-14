import React, {useState, useRef, useCallback} from 'react';
import {
  CommonButton,
  BigBoldBlueTextInline,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  MyView,
} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {quizContext, dispatchQuizContext} from '../../Context';
import {fetchStudentAnswerSheet, getKarname} from '../../Utility';
import lessonTableStructure from './LessonTableStructure.js';
import generalStatTableStructure from './GeneralStatTableStructure';
import rankStatTableStructure from './RankStatTableStructure';
import {SimpleFontIcon} from '../../../../../../styles/Common/FontIcon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import MiniCard from '../../CV/MiniCard';
import commonTranslator from '../../../../../../tranlates/Common';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';
import {
  VictoryLine,
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
  VictoryLegend,
} from 'victory-native';
import AnswerSheet from '../../AnswerSheet/AnswerSheet';
import StudentCard from '../../../../../../components/web/StudentCard';

function Karname(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState();
  const [karname, setKarname] = useState();
  const [showSubjectChart, setShowSubjectChart] = useState(false);
  const [hasFetchedAnswerSheet, setHasFetchedAnswerSheet] = useState(false);
  const [studentId, setStudentId] = useState();

  React.useEffect(() => {
    if (
      isWorking ||
      hasFetchedAnswerSheet ||
      studentId == undefined ||
      state.selectedQuiz === undefined
    )
      return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      fetchStudentAnswerSheet(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        studentId,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        setHasFetchedAnswerSheet(true);
        dispatch({
          wanted_answer_sheet: res[0],
          showAnswers: true,
          showStdAnswers: true,
          allowChangeStdAns: false,
        });
      }
      setIsWorking(false);
    });
  }, [
    props,
    isWorking,
    hasFetchedAnswerSheet,
    state.selectedQuiz,
    studentId,
    dispatch,
  ]);

  React.useEffect(() => {
    if (state.selectedQuiz === undefined) {
      setStudentId(props.studentId);
      dispatch({
        selectedQuiz: {id: props.quizId, generalMode: props.quizMode},
        selectedStudentId: props.studentId,
      });
      return;
    }

    if (isWorking || state.selectedStudentId === undefined) return;

    if (
      state.selectedQuiz.allKarname !== undefined &&
      state.selectedQuiz.allKarname.find(
        elem => elem.student.id === state.selectedStudentId,
      ) !== undefined
    ) {
      let tmp = state.selectedQuiz.allKarname.find(
        elem => elem.student.id === state.selectedStudentId,
      );
      setStudentId(tmp.student.id);
      setKarname(tmp);
      return;
    }

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      getKarname(
        props.token,
        state.selectedStudentId,
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }
      if (state.selectedQuiz.allKarname === undefined)
        state.selectedQuiz.allKarname = [res[0]];
      else state.selectedQuiz.allKarname.push(res[0]);

      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      setKarname(res[0]);
      setIsWorking(false);
    });
  }, [dispatch, props, state.selectedQuiz, state.selectedStudentId, isWorking]);

  const ref = useRef();

  const preparePrint = () => {
    if (ref.current === null) return;

    props.setLoading(true);

    setTimeout(() => {
      print();
    }, 2000);
  };

  const print = useCallback(() => {
    toPng(ref.current, {cacheBust: true})
      .then(async dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        await pdf.save('download.pdf');
        props.setLoading(false);
      })
      .catch(err => {
        console.log(err);
        props.setLoading(false);
      });
  }, [ref, props]);

  return (
    <MyView>
      <CommonWebBox
        header={
          karname !== undefined
            ? 'کارنامه آزمون ' + karname.quizName
            : 'کارنامه آزمون '
        }
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <EqualTwoTextInputs>
          {karname !== undefined && <StudentCard std={karname} />}
          {karname !== undefined && (
            <CommonButton
              onPress={() => preparePrint()}
              title={commonTranslator.print}
            />
          )}
        </EqualTwoTextInputs>
      </CommonWebBox>

      <MyView ref={ref}>
        <PhoneView>
          <CommonWebBox width={'60%'}>
            <EqualTwoTextInputs>
              <BigBoldBlueTextInline
                style={{alignSelf: 'center'}}
                text={'جدول شماره 1 - نتایج دروس'}
              />
              {/* <SimpleFontIcon
                kind={'normal'}
                onPress={() => setShowLessonChart(!showLessonChart)}
                icon={showLessonChart ? faAngleUp : faAngleDown}
              /> */}
            </EqualTwoTextInputs>
            {karname !== undefined && (
              <MyView style={{padding: 10}}>
                {karname !== undefined && (
                  <CommonDataTable
                    columns={lessonTableStructure}
                    data={karname.lessons}
                    show_row_no={false}
                    pagination={false}
                    groupOps={[]}
                  />
                )}
              </MyView>
            )}
          </CommonWebBox>
          <CommonWebBox width={'35%'}>
            <EqualTwoTextInputs>
              <BigBoldBlueTextInline
                style={{alignSelf: 'center'}}
                text={'جدول شماره 2 - نتایج آماری دروس'}
              />
            </EqualTwoTextInputs>
            <MyView style={{padding: 10}}>
              {karname !== undefined && (
                <CommonDataTable
                  columns={generalStatTableStructure}
                  data={karname.lessons}
                  show_row_no={false}
                  pagination={false}
                  groupOps={[]}
                />
              )}
            </MyView>
          </CommonWebBox>

          <CommonWebBox width={'60%'}>
            <EqualTwoTextInputs>
              <BigBoldBlueTextInline
                style={{alignSelf: 'center'}}
                text={'جدول شماره 3 - نتایج حیطه ها'}
              />
              {/* <SimpleFontIcon
                kind={'normal'}
                onPress={() => setShowSubjectChart(!showSubjectChart)}
                icon={showSubjectChart ? faAngleUp : faAngleDown}
              /> */}
            </EqualTwoTextInputs>
            <MyView style={{padding: 10}}>
              {karname !== undefined && (
                <CommonDataTable
                  columns={lessonTableStructure}
                  show_row_no={false}
                  pagination={false}
                  groupOps={[]}
                  data={karname.subjects}
                />
              )}
            </MyView>
          </CommonWebBox>

          <CommonWebBox width={'35%'}>
            <EqualTwoTextInputs>
              <BigBoldBlueTextInline
                style={{alignSelf: 'center'}}
                text={'جدول شماره 4 - نتایج کلی'}
              />
            </EqualTwoTextInputs>
            <MyView style={{padding: 10}}>
              {karname !== undefined && (
                <CommonDataTable
                  columns={rankStatTableStructure}
                  data={[karname.rank]}
                  show_row_no={false}
                  pagination={false}
                  groupOps={[]}
                />
              )}
            </MyView>
          </CommonWebBox>

          <CommonWebBox width={'60%'}>
            <EqualTwoTextInputs>
              <BigBoldBlueTextInline
                style={{alignSelf: 'center'}}
                text={'جدول شماره 5 - نتایج آماری حیطه ها'}
              />
            </EqualTwoTextInputs>
            <MyView style={{padding: 10}}>
              {karname !== undefined && (
                <CommonDataTable
                  columns={generalStatTableStructure}
                  show_row_no={false}
                  pagination={false}
                  groupOps={[]}
                  data={karname.subjects}
                />
              )}
            </MyView>
          </CommonWebBox>
          <CommonWebBox width={'60%'}>
            <MyView>
              {karname !== undefined && (
                <VictoryChart height={500} theme={VictoryTheme.material}>
                  <VictoryLegend
                    x={125}
                    y={50}
                    title="راهنما"
                    centerTitle
                    orientation="horizontal"
                    gutter={40}
                    style={{
                      data: {fontSize: 30, fontFamily: 'IRANSans'},
                      labels: {fontSize: 30, fontFamily: 'IRANSans', dx: 100},
                      border: {stroke: 'black'},
                      title: {fontSize: 30, fontFamily: 'IRANSans'},
                    }}
                    data={[
                      {name: 'درصد شما', symbol: {fill: '#c43a31'}},
                      {name: 'میانگین', symbol: {fill: '#777777'}},
                    ]}
                  />

                  <VictoryLine
                    categories={{
                      x: karname.subjects.map(elem => {
                        return elem.name;
                      }),
                    }}
                    style={{
                      data: {
                        stroke: '#c43a31',
                        strokeWidth: ({data}) => data.length,
                      },
                      labels: {
                        fontSize: 15,
                        fontFamily: 'IRANSans',
                        fill: ({datum}) =>
                          datum.x === 3 ? '#000000' : '#c43a31',
                      },
                    }}
                    data={karname.subjects.map(elem => {
                      return elem.percent;
                    })}
                  />
                  <VictoryLine
                    categories={{
                      x: karname.subjects.map(elem => {
                        return elem.name;
                      }),
                    }}
                    style={{
                      data: {
                        stroke: '#777777',
                        strokeWidth: ({data}) => data.length,
                      },
                      labels: {
                        fontSize: 15,
                        fill: ({datum}) =>
                          datum.x === 3 ? '#000000' : '#c43a31',
                      },
                    }}
                    data={karname.subjects.map(elem => {
                      return elem.avg;
                    })}
                  />
                  <VictoryAxis
                    style={{
                      tickLabels: {
                        fontFamily: 'IRANSans',
                        fontSize: 24,
                        dy: 10,
                      },
                      axisLabel: {
                        fontFamily: 'IRANSans',
                        fontSize: 24,
                        dy: 10,
                      },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={x => x}
                    style={{
                      tickLabels: {
                        fontFamily: 'IRANSans',
                        fontSize: 24,
                        dx: -30,
                      },
                      axisLabel: {
                        fontFamily: 'IRANSans',
                        fontSize: 24,
                        dx: -30,
                      },
                    }}
                  />
                </VictoryChart>
              )}
            </MyView>
          </CommonWebBox>
        </PhoneView>
        {hasFetchedAnswerSheet && state.wanted_answer_sheet !== undefined && (
          <AnswerSheet answer_sheet={state.wanted_answer_sheet} />
        )}
      </MyView>
    </MyView>
  );
}

export default Karname;
