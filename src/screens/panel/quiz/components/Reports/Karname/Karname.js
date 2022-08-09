import React, {useState, useRef, useCallback} from 'react';
import {View} from 'react-native';
import {CommonWebBox, PhoneView} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {quizContext, dispatchQuizContext} from '../../Context';
import {getKarname} from '../../Utility';
import lessonTableStructure from './LessonTableStructure.js';
import generalStatTableStructure from './GeneralStatTableStructure';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

function Karname(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState();
  const [karname, setKarname] = useState();
  const [showSubjectChart, setShowSubjectChart] = useState(true);

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
    <PhoneView style={{flexWrap: 'wrap'}}>
      <CommonWebBox header={'جدول شماره 1 - نتایج دروس'} width={'60%'}>
        {karname !== undefined && (
          <CommonDataTable
            columns={lessonTableStructure}
            data={karname.lessons}
            show_row_no={false}
            pagination={false}
            groupOps={[]}
          />
        )}
      </CommonWebBox>
      <CommonWebBox header={'جدول شماره 2 - نتایج آماری دروس'} width={'35%'}>
        {karname !== undefined && (
          <CommonDataTable
            columns={generalStatTableStructure}
            data={karname.lessons}
            show_row_no={false}
            pagination={false}
            groupOps={[]}
          />
        )}
      </CommonWebBox>

      <CommonWebBox header={'جدول شماره 3 - نتایج حیطه ها'} width={'60%'}>
        {karname !== undefined && !showSubjectChart && (
          <CommonDataTable
            columns={lessonTableStructure}
            data={karname.subjects}
            show_row_no={false}
            pagination={false}
            groupOps={[]}
          />
        )}
        {karname !== undefined && showSubjectChart && (
          <LineChart
            data={{
              labels: karname.subjects.map(elem => {
                return elem.name;
              }),
              datasets: [
                {
                  data: karname.subjects.map(elem => {
                    return elem.percent;
                  }),
                },
              ],
            }}
            width={600} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                maxWidth: 50,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
              fontFamily: 'IRANSans',
            }}
          />
        )}
      </CommonWebBox>
    </PhoneView>
  );
}

export default Karname;
