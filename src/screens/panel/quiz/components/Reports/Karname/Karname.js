import React, {useState, useRef} from 'react';
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
import {lessonCols, subjectCols} from './LessonTableStructure.js';
import {
  lessonRankingCols,
  subjectRankingCols,
  totalRankCols,
} from './LessonRankingTableStructure';
import generalStatTableStructure from './GeneralStatTableStructure';
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
import CopyBox from '../../../../../../components/CopyBox';
import {BASE_SITE_NAME} from '../../../../../../API/Utility';
import {showError} from '../../../../../../services/Utility';

function Karname(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [karname, setKarname] = useState();

  React.useEffect(() => {
    if (state.selectedQuiz === undefined) {
      dispatch({
        selectedQuiz: {id: props.quizId, generalMode: props.quizMode},
        selectedStudentId: props.studentId,
      });
      return;
    }

    if (isWorking || state.selectedStudentId === undefined) return;

    if (state.selectedQuiz.allKarname !== undefined)
      if (
        state.selectedQuiz.allKarname !== undefined &&
        state.selectedQuiz.allKarname.find(
          elem => elem.student.id === state.selectedStudentId,
        ) !== undefined
      ) {
        let tmp = state.selectedQuiz.allKarname.find(
          elem => elem.student.id === state.selectedStudentId,
        );
        setKarname(tmp);
        return;
      }

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      getKarname(
        props.token,
        state.selectedStudentId,
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
      ),
      fetchStudentAnswerSheet(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        state.selectedStudentId,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null || res[1] === null) {
        props.setMode('list');
        return;
      }
      if (state.selectedQuiz.allKarname === undefined)
        state.selectedQuiz.allKarname = [res[0]];
      else state.selectedQuiz.allKarname.push(res[0]);

      dispatch({
        wanted_answer_sheet: res[1],
        showAnswers: true,
        showStdAnswers: true,
        allowChangeStdAns: false,
        selectedQuiz: state.selectedQuiz,
        needUpdate: true,
      });
      setKarname(res[0]);
      setIsWorking(false);
    });
  }, [dispatch, props, state.selectedQuiz, state.selectedStudentId, isWorking]);

  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const [pdf, setPdf] = useState(new jsPDF('p', 'pt', 'a4'));

  const callToPng = async (filled, counter, currentRef) => {
    await toPng(currentRef, {cacheBust: true})
      .then(async dataUrl => {
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let y = 0;

        if (filled + pdfHeight + 50 > 822) {
          pdf.addPage();
          filled = 0;
          y = 0;
        } else {
          y = filled + 50;
        }

        pdf.addImage(dataUrl, 'PNG', 0, y, pdfWidth, pdfHeight);

        if (counter === 0) callToPng(filled + pdfHeight, 1, ref2.current);
        else if (counter === 1) callToPng(filled + pdfHeight, 2, ref3.current);
        else if (counter === 2) {
          await pdf.save('download.pdf');
          props.setLoading(false);
          setPdf(undefined);
        }
      })
      .catch(err => {
        console.log(err);
        showError(commonTranslator.err);
        props.setLoading(false);
      });
  };

  const print = () => {
    if (pdf === undefined) return;
    props.setLoading(true);

    if (
      ref.current === null ||
      ref.current === undefined ||
      ref2.current === null ||
      ref2.current === undefined ||
      ref3.current === null ||
      ref3.current === undefined
    ) {
      props.setLoading(false);
      showError('عملیات موردنظر با خطا رو به رو شده است.');
      return;
    }

    callToPng(0, 0, ref.current);
  };

  const [conditionalRowStyles, setConditionalRowStyles] = useState();

  React.useEffect(() => {
    if (karname === undefined || karname.conditions === undefined) return;

    let conditions = karname.conditions.map(elem => {
      return {
        when: row => row.taraz <= elem.max && row.taraz >= elem.min,
        style: {
          backgroundColor: elem.color,
        },
      };
    });

    setConditionalRowStyles(conditions);
  }, [karname]);

  return (
    <MyView>
      <CommonWebBox
        header={
          karname !== undefined
            ? 'کارنامه آزمون ' + karname.quizName
            : 'کارنامه آزمون '
        }
        backBtn={true}
        onBackClick={() => props.setMode('ranking')}>
        <EqualTwoTextInputs>
          {karname !== undefined && <StudentCard std={karname} />}
          {karname !== undefined && (
            <PhoneView>
              {pdf !== undefined && (
                <CommonButton
                  theme={'dark'}
                  onPress={() => print()}
                  title={commonTranslator.print}
                />
              )}
              {state.selectedStudentId !== undefined && (
                <CopyBox
                  title={commonTranslator.copyLink}
                  url={
                    BASE_SITE_NAME +
                    'result/' +
                    state.selectedQuiz.generalMode +
                    '/' +
                    state.selectedQuiz.id +
                    '/' +
                    state.selectedStudentId
                  }
                />
              )}
            </PhoneView>
          )}
        </EqualTwoTextInputs>
      </CommonWebBox>

      <div ref={ref}>
        <MyView>
          <PhoneView>
            <CommonWebBox
              width={'55%'}
              style={{
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 5,
              }}>
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
                <MyView>
                  {karname !== undefined && (
                    <CommonDataTable
                      columns={lessonCols}
                      data={karname.lessons}
                      show_row_no={false}
                      pagination={false}
                      groupOps={[]}
                      conditionalRowStyles={conditionalRowStyles}
                    />
                  )}
                </MyView>
              )}
            </CommonWebBox>
            <CommonWebBox
              width={'45%'}
              style={{
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 5,
              }}>
              <EqualTwoTextInputs>
                <BigBoldBlueTextInline
                  style={{alignSelf: 'center'}}
                  text={'جدول شماره 2 - نتایج آماری دروس'}
                />
              </EqualTwoTextInputs>
              <MyView>
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

            <CommonWebBox
              width={'55%'}
              style={{
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 5,
              }}>
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
              <MyView>
                {karname !== undefined && (
                  <CommonDataTable
                    columns={subjectCols}
                    show_row_no={false}
                    pagination={false}
                    groupOps={[]}
                    data={karname.subjects}
                    conditionalRowStyles={conditionalRowStyles}
                  />
                )}
              </MyView>
            </CommonWebBox>

            <CommonWebBox
              width={'45%'}
              style={{
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 5,
              }}>
              <EqualTwoTextInputs>
                <BigBoldBlueTextInline
                  style={{alignSelf: 'center'}}
                  text={'جدول شماره 4 - نتایج آماری حیطه ها'}
                />
              </EqualTwoTextInputs>
              <MyView>
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

            <CommonWebBox
              width={'50%'}
              style={{
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 5,
              }}>
              <EqualTwoTextInputs>
                <BigBoldBlueTextInline
                  style={{alignSelf: 'center'}}
                  text={'جدول شماره 5 - نتایج رتبه بندی دروس'}
                />
              </EqualTwoTextInputs>
              <MyView style={{gap: 20}}>
                {karname !== undefined && (
                  <CommonDataTable
                    columns={lessonRankingCols}
                    show_row_no={false}
                    pagination={false}
                    groupOps={[]}
                    data={karname.lessons}
                  />
                )}
                <EqualTwoTextInputs>
                  <BigBoldBlueTextInline
                    style={{alignSelf: 'center'}}
                    text={'جدول شماره 6 - نتایج کلی'}
                  />
                </EqualTwoTextInputs>
                {karname !== undefined && (
                  <CommonDataTable
                    columns={totalRankCols}
                    data={[karname.rank]}
                    show_row_no={false}
                    pagination={false}
                    groupOps={[]}
                  />
                )}
              </MyView>
            </CommonWebBox>

            <CommonWebBox
              width={'50%'}
              style={{
                paddingLeft: 5,
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 5,
              }}>
              <EqualTwoTextInputs>
                <BigBoldBlueTextInline
                  style={{alignSelf: 'center'}}
                  text={'جدول شماره 6 - نتایج رتبه بندی حیطه ها'}
                />
              </EqualTwoTextInputs>
              <MyView>
                {karname !== undefined && (
                  <CommonDataTable
                    columns={subjectRankingCols}
                    data={karname.subjects}
                    show_row_no={false}
                    pagination={false}
                    groupOps={[]}
                  />
                )}
              </MyView>
            </CommonWebBox>
          </PhoneView>
        </MyView>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}} ref={ref2}>
        <CommonWebBox width={'90%'}>
          <MyView>
            {karname !== undefined && (
              <VictoryChart
                padding={{top: 150, left: 100, bottom: 50, right: 80}}
                height={500}
                theme={VictoryTheme.material}>
                <VictoryLegend
                  x={125}
                  y={20}
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
                      strokeWidth: ({data}) => 4,
                    },
                  }}
                  interpolation={'natural'}
                  domain={{y: [-30, 105]}}
                  data={[
                    0,
                    ...karname.subjects.map(elem => {
                      return elem.percent;
                    }),
                  ]}
                />
                <VictoryLine
                  categories={{
                    x: karname.subjects.map(elem => {
                      return elem.name;
                    }),
                  }}
                  interpolation={'natural'}
                  style={{
                    data: {
                      stroke: '#777777',
                      strokeWidth: ({data}) => 4,
                    },
                  }}
                  data={[
                    0,
                    ...karname.subjects.map(elem => {
                      return elem.avg;
                    }),
                  ]}
                />
                <VictoryAxis
                  style={{
                    tickLabels: {
                      fontFamily: 'IRANSans',
                      fontSize: 18,
                      dy: 10,
                      dx: 40,
                    },
                    axisLabel: {
                      fontFamily: 'IRANSans',
                      fontSize: 19,
                      dy: 10,
                      dx: 40,
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
      </div>
      <div ref={ref3}>
        {karname !== undefined && state.wanted_answer_sheet !== undefined && (
          <AnswerSheet answer_sheet={state.wanted_answer_sheet} />
        )}
      </div>
    </MyView>
  );
}

export default Karname;
