import React, {useState, useRef, useCallback} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {quizContext, dispatchQuizContext} from '../../Context';
import {getKarname} from '../../Utility';
import lessonTableStructure from './LessonTableStructure.js';
import generalStatTableStructure from './GeneralStatTableStructure';
import rankStatTableStructure from './RankStatTableStructure';
import {SimpleFontIcon} from '../../../../../../styles/Common/FontIcon';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import MyLineChart from './MyLineChart';
import MiniCard from '../../CV/MiniCard';
import commonTranslator from '../../../../../../tranlates/Common';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';

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
  const [showSubjectGeneralStatChart, setShowSujectGeneralStatChart] =
    useState(false);

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

  const ref = useRef();

  const preparePrint = () => {
    if (ref.current === null) return;

    props.setLoading(true);

    setShowSubjectChart(true);
    setShowGeneralStatChart(true);
    setShowSujectGeneralStatChart(true);

    setTimeout(() => {
      print();
    }, 2000);
  };

  const print = useCallback(() => {
    let oldShowSubjectChart = showSubjectChart;
    let oldShowGeneralStatChart = showGeneralStatChart;
    let oldShowSubjectGeneralStatChart = showSubjectGeneralStatChart;

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

        // setShowSubjectChart(oldShowSubjectChart);
        // setShowGeneralStatChart(oldShowGeneralStatChart);
        // setShowSujectGeneralStatChart(oldShowSubjectGeneralStatChart);
      })
      .catch(err => {
        console.log(err);
        props.setLoading(false);
      });
  }, [
    ref,
    props,
    showGeneralStatChart,
    showSubjectChart,
    showSubjectGeneralStatChart,
  ]);

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
        <EqualTwoTextInputs>
          {karname !== undefined && (
            <MiniCard
              text={'رتبه: ' + karname.rank.rank}
              header={karname.student.name}
              src={karname.student.pic}
            />
          )}
          {karname !== undefined && (
            <CommonButton
              onPress={() => preparePrint()}
              title={commonTranslator.print}
            />
          )}
        </EqualTwoTextInputs>
      </CommonWebBox>
      <View ref={ref}>
        <PhoneView style={{flexWrap: 'wrap'}}>
          <CommonWebBox header={'جدول شماره 1 - نتایج دروس'} width={'60%'}>
            {karname !== undefined && (
              <View style={{padding: 10}}>
                {karname !== undefined && (
                  <CommonDataTable
                    columns={lessonTableStructure}
                    data={karname.lessons}
                    show_row_no={false}
                    pagination={false}
                    groupOps={[]}
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
              {karname !== undefined && (
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
                      height={400}
                      key={index}
                      labels={[
                        'میانگین درصد پاسخگویی',
                        'کمترین درصد پاسخگویی',
                        'بیشترین درصد پاسخگویی',
                        'درصد پاسخگویی داوطلب',
                      ]}
                      data={[
                        parseInt(elem.avg),
                        parseInt(elem.min),
                        parseInt(elem.max),
                        elem.percent,
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
              {karname !== undefined && (
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
                  width={700}
                  height={400}
                />
              )}
            </View>
          </CommonWebBox>

          <CommonWebBox header={'جدول شماره 4 - نتایج کلی'} width={'35%'}>
            <View style={{padding: 10}}>
              {karname !== undefined && (
                <CommonDataTable
                  columns={rankStatTableStructure}
                  data={[karname.rank]}
                  show_row_no={false}
                  pagination={false}
                  groupOps={[]}
                />
              )}
            </View>
          </CommonWebBox>

          <CommonWebBox
            header={'جدول شماره 5 - نتایج آماری حیطه ها'}
            width={'60%'}
            btn={
              <SimpleFontIcon
                kind={'normal'}
                onPress={() =>
                  setShowSujectGeneralStatChart(!showSubjectGeneralStatChart)
                }
                icon={showSubjectGeneralStatChart ? faAngleUp : faAngleDown}
              />
            }>
            <View style={{padding: 10}}>
              {karname !== undefined && (
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
                  height={400}
                />
              )}
            </View>
          </CommonWebBox>
        </PhoneView>
      </View>
    </View>
  );
}

export default Karname;
