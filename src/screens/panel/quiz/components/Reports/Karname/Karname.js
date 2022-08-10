import React, {useState, useRef, useCallback} from 'react';
import {Image, View} from 'react-native';
import {CommonWebBox, PhoneView} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {quizContext, dispatchQuizContext} from '../../Context';
import {getKarname} from '../../Utility';
import lessonTableStructure from './LessonTableStructure.js';
import generalStatTableStructure from './GeneralStatTableStructure';
import {SimpleFontIcon} from '../../../../../../styles/Common/FontIcon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import MyLineChart from './MyLineChart';
import MiniCard from '../../CV/MiniCard';

function Karname(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState();
  const [karname, setKarname] = useState();
  const [showSubjectChart, setShowSubjectChart] = useState(false);
  const [showGeneralStatChart, setShowGeneralStatChart] = useState(false);
  const [showLessonChart, setShowLessonChart] = useState(false);

  React.useEffect(() => {
    if (isWorking || state.selectedStudentId === undefined) return;

    if (
      state.selectedQuiz.allKarname !== undefined &&
      state.selectedQuiz.allKarname.find(
        elem => elem.student.id === state.selectedStudentId,
      ) !== undefined
    ) {
      setKarname(
        state.selectedQuiz.allKarname.find(
          elem => elem.student.id === state.selectedStudentId,
        ),
      );
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

  return (
    <View>
      <CommonWebBox
        header={
          state.selectedQuiz !== undefined
            ? 'کارنامه آزمون ' + state.selectedQuiz.title
            : 'کارنامه آزمون '
        }
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView>
          {karname !== undefined && (
            <MiniCard
              text={'رتبه: ' + karname.rank.rank}
              header={karname.student.name}
              src={karname.student.pic}
            />
          )}
        </PhoneView>
      </CommonWebBox>
      <PhoneView style={{flexWrap: 'wrap'}}>
        <CommonWebBox
          header={'جدول شماره 1 - نتایج دروس'}
          width={'60%'}
          btn={
            <SimpleFontIcon
              kind={'normal'}
              onPress={() => setShowLessonChart(!showLessonChart)}
              icon={showLessonChart ? faAngleUp : faAngleDown}
            />
          }>
          {karname !== undefined && (
            <View style={{padding: 10}}>
              {karname !== undefined && !showLessonChart && (
                <CommonDataTable
                  columns={lessonTableStructure}
                  data={karname.lessons}
                  show_row_no={false}
                  pagination={false}
                  groupOps={[]}
                />
              )}
              {karname !== undefined && showLessonChart && (
                <MyLineChart
                  labels={karname.lessons.map(elem => {
                    return elem.name;
                  })}
                  data={karname.lessons.map(elem => {
                    return elem.percent;
                  })}
                  width={600}
                />
              )}
            </View>
          )}
        </CommonWebBox>
        <CommonWebBox
          header={'جدول شماره 2 - نتایج آماری دروس'}
          width={'35%'}
          btn={
            <SimpleFontIcon
              kind={'normal'}
              onPress={() => setShowGeneralStatChart(!showGeneralStatChart)}
              icon={showGeneralStatChart ? faAngleUp : faAngleDown}
            />
          }>
          <View style={{padding: 10}}>
            {karname !== undefined && !showGeneralStatChart && (
              <CommonDataTable
                columns={generalStatTableStructure}
                data={karname.lessons}
                show_row_no={false}
                pagination={false}
                groupOps={[]}
              />
            )}
            {karname !== undefined &&
              showGeneralStatChart &&
              karname.lessons.map((elem, index) => {
                return (
                  <MyLineChart
                    width={400}
                    key={index}
                    labels={[
                      'میانگین درصد پاسخگویی',
                      'کمترین درصد پاسخگویی',
                      'بیشترین درصد پاسخگویی',
                      'درصد پاسخگویی داوطلب',
                    ]}
                    data={[
                      parseInt(elem.avg) / 100,
                      parseInt(elem.min) / 100,
                      parseInt(elem.max) / 100,
                      elem.percent / 100,
                    ]}
                  />
                );
              })}
          </View>
        </CommonWebBox>

        <CommonWebBox
          header={'جدول شماره 3 - نتایج حیطه ها'}
          width={'60%'}
          btn={
            <SimpleFontIcon
              kind={'normal'}
              onPress={() => setShowSubjectChart(!showSubjectChart)}
              icon={showSubjectChart ? faAngleUp : faAngleDown}
            />
          }>
          <View style={{padding: 10}}>
            {karname !== undefined && !showSubjectChart && (
              <CommonDataTable
                columns={lessonTableStructure}
                show_row_no={false}
                pagination={false}
                groupOps={[]}
                data={karname.subjects}
              />
            )}
            {karname !== undefined && showSubjectChart && (
              <MyLineChart
                labels={karname.subjects.map(elem => {
                  return elem.name;
                })}
                data={karname.subjects.map(elem => {
                  return elem.percent;
                })}
                width={400}
              />
            )}
          </View>
        </CommonWebBox>

        <CommonWebBox
          header={'جدول شماره 4 - نتایج آماری حیطه ها'}
          width={'60%'}
          btn={
            <SimpleFontIcon
              kind={'normal'}
              onPress={() => setShowSubjectChart(!showSubjectChart)}
              icon={showSubjectChart ? faAngleUp : faAngleDown}
            />
          }>
          <View style={{padding: 10}}>
            {karname !== undefined && !showSubjectChart && (
              <CommonDataTable
                columns={generalStatTableStructure}
                show_row_no={false}
                pagination={false}
                groupOps={[]}
                data={karname.subjects}
              />
            )}
            {karname !== undefined && showSubjectChart && (
              <MyLineChart
                labels={karname.subjects.map(elem => {
                  return elem.name;
                })}
                data={karname.subjects.map(elem => {
                  return elem.percent;
                })}
                width={400}
              />
            )}
          </View>
        </CommonWebBox>
      </PhoneView>
    </View>
  );
}

export default Karname;
