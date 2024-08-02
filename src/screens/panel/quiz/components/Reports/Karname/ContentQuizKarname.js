import React, {useState, useCallback} from 'react';
import {
  BigBoldBlueTextInline,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  MyView,
} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {quizContext, dispatchQuizContext} from '../../Context';
import {getKarname} from '../../Utility';
import {
  lessonCols,
  lessonColsCustomQuiz,
  subjectCols,
  subjectColsCustomQuiz,
} from './LessonTableStructure.js';

import AnswerSheet from '../../AnswerSheet/AnswerSheet';
import {getDevice} from '../../../../../../services/Utility';
import {getMyAnswerSheet} from '../../../../../studentPanel/MyQuizzes/irysc/components/Utility';
import {styleCard100Percent} from '../../../../package/card/Style';

function ContentQuizKarname(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [karname, setKarname] = useState();

  const fetchAnswerSheet = useCallback(async () => {
    if (props.user === null || props.user === undefined) return 'ok';

    return await getMyAnswerSheet(
      state.selectedQuiz.id,
      props.generalQuizMode === undefined
        ? state.selectedQuiz.generalMode
        : props.generalQuizMode,
      props.token,
    );
  }, [props, state.selectedQuiz]);

  React.useEffect(() => {
    if (state.selectedQuiz === undefined) {
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
        props.generalQuizMode === undefined
          ? state.selectedQuiz.generalMode
          : props.generalQuizMode,
      ),
    ]).then(res => {
      if (res[0] === null) {
        props.setLoading(false);
        props.setMode('list');
        return;
      }

      Promise.all([fetchAnswerSheet()]).then(res2 => {
        props.setLoading(false);

        if (res2[0] === null) {
          props.setMode('list');
          return;
        }

        if (state.selectedQuiz.allKarname === undefined)
          state.selectedQuiz.allKarname = [res[0]];
        else state.selectedQuiz.allKarname.push(res[0]);

        dispatch({
          wanted_answer_sheet: res2[0] === 'ok' ? undefined : res2[0],
          showAnswers: true,
          showStdAnswers: true,
          allowChangeStdAns: false,
          selectedQuiz: state.selectedQuiz,
          needUpdate: true,
        });
        setKarname(res[0]);
        setIsWorking(false);
      });
    });
  }, [
    dispatch,
    props,
    state.selectedQuiz,
    state.selectedStudentId,
    isWorking,
    fetchAnswerSheet,
  ]);

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

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  return (
    <MyView>
      <CommonWebBox
        header={
          karname !== undefined
            ? 'کارنامه آزمون ' + karname.quizName
            : 'کارنامه آزمون '
        }
        backBtn={true}
        onBackClick={() => props.navigate(-1)}></CommonWebBox>

      <MyView>
        <PhoneView>
          <CommonWebBox
            width={isInPhone ? '100%' : '50%'}
            style={{
              paddingLeft: 5,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 5,
              ...styleCard100Percent,
            }}>
            <EqualTwoTextInputs>
              <BigBoldBlueTextInline
                style={{alignSelf: 'center'}}
                text={'جدول شماره 1 - نتایج دروس'}
              />
            </EqualTwoTextInputs>
            {karname !== undefined && (
              <MyView>
                {karname !== undefined && (
                  <CommonDataTable
                    columns={
                      props.generalQuizMode === undefined
                        ? lessonCols
                        : lessonColsCustomQuiz
                    }
                    data={karname.lessons}
                    show_row_no={false}
                    pagination={false}
                    groupOps={[]}
                    excel={false}
                    conditionalRowStyles={conditionalRowStyles}
                  />
                )}
              </MyView>
            )}
          </CommonWebBox>

          <CommonWebBox
            width={isInPhone ? '100%' : '55%'}
            style={{
              paddingLeft: 5,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 5,
              ...styleCard100Percent,
            }}>
            <EqualTwoTextInputs>
              <BigBoldBlueTextInline
                style={{alignSelf: 'center'}}
                text={
                  props.generalQuizMode === undefined
                    ? 'جدول شماره 3 - نتایج حیطه\u200cها'
                    : 'جدول شماره 2 - نتایج حیطه\u200cها'
                }
              />
            </EqualTwoTextInputs>
            <MyView>
              {karname !== undefined && (
                <CommonDataTable
                  columns={
                    props.generalQuizMode === undefined
                      ? subjectCols
                      : subjectColsCustomQuiz
                  }
                  show_row_no={false}
                  pagination={false}
                  groupOps={[]}
                  data={karname.subjects}
                  excel={false}
                  conditionalRowStyles={conditionalRowStyles}
                />
              )}
            </MyView>
          </CommonWebBox>
        </PhoneView>
      </MyView>

      <MyView>
        {karname !== undefined && state.wanted_answer_sheet !== undefined && (
          <AnswerSheet
            setLoading={props.setLoading}
            token={props.token}
            state={state}
            dispatch={dispatch}
          />
        )}
      </MyView>
    </MyView>
  );
}

export default ContentQuizKarname;
