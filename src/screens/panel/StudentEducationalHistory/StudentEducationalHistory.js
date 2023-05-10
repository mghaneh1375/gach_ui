import {faEye} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import StudentCard from '../../../components/web/StudentCard';
import {CommonWebBox, MyView, SimpleText} from '../../../styles/Common';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {styles} from '../../../styles/Common/Styles';
import commonTranslator from '../../../translator/Common';
import MiniCard from '../quiz/components/CV/MiniCard';
import {subjectColsCustomQuiz} from '../quiz/components/Reports/Karname/LessonTableStructure';
import iryscQuizColumns from './components/IryscQuizTableStructure';

function StudentEducationalHistory(props) {
  const params = useParams();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [iryscQuizzes, setIryscQuizzes] = useState();
  const [openQuizzes, setOpenQuizzes] = useState();
  const [customQuizzes, setCustomQuizzes] = useState();

  const commonColumns = [
    {
      name: 'نام آزمون',
      selector: row => row.name,
      grow: 3,
      minWidth: '120px',
    },

    {
      name: 'زمان اجرا',
      selector: row => row.date,
      grow: 4,
      minWidth: '200px',
    },
    {
      name: 'تعداد سوال',
      selector: row => row.questionsCount,
      grow: 1,
      center: true,
    },
    {
      name: 'تعداد دانش آموزان',
      selector: row => row.studentsCount,
      grow: 1,
      center: true,
    },
    {
      name: 'رتبه در شهر',
      selector: row => row.cityRank,
      grow: 1,
      center: true,
    },
    {
      name: 'رتبه در استان',
      selector: row => row.stateRank,
      grow: 1,
      center: true,
    },
    {
      name: 'رتبه در کشور',
      selector: row => row.rank,
      grow: 1,
      center: true,
    },
    {
      name: 'تراز',
      selector: row => row.taraz,
      grow: 1,
      center: true,
    },
  ];

  const iryscColumns = [
    {
      name: '',
      cell: (row, index, column, id) => {
        return (
          <SimpleFontIcon
            onPress={() => {
              window.open(
                '/result/irysc/' + iryscQuizzes[index].id + '/' + params.userId,
                '_blank',
              );
            }}
            icon={faEye}
          />
        );
      },
      minWidth: '40px',
      maxWidth: '40px',
      center: true,
    },
    ...commonColumns,
  ];

  const openColumns = [
    {
      name: '',
      cell: (row, index, column, id) => {
        return (
          <SimpleFontIcon
            onPress={() => {
              window.open(
                '/result/open/' + openQuizzes[index].id + '/' + params.userId,
                '_blank',
              );
            }}
            icon={faEye}
          />
        );
      },
      minWidth: '40px',
      maxWidth: '40px',
      center: true,
    },
    ...commonColumns,
  ];

  const [data, setData] = useState();

  const getData = React.useCallback(() => {
    dispatch({loading: true});

    Promise.all([
      generalRequest(
        routes.getEducationalHistory + params.userId,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] == null) {
        props.navigate('/');
        return;
      }

      setIryscQuizzes(res[0].iryscQuizzes);
      setOpenQuizzes(res[0].openQuizzes);
      setCustomQuizzes(res[0].customQuizzes);
      setData(res[0]);
    });
  }, [params.userId, dispatch, state, props]);

  useEffectOnce(() => {
    if (params.userId === undefined) {
      props.navigate('/');
      return;
    }

    getData();
  }, [params.userId, dispatch, state, props]);

  return (
    <>
      <CommonWebBox>
        {data !== undefined && (
          <MiniCard
            styleCard100Percent={false}
            subTexts={[
              {
                label: 'تعداد آزمون های شرکت کرده: ',
                value: iryscQuizzes.length,
              },
              {label: 'نام مدرسه: ', value: data.school},
              {label: 'نام شهر: ', value: data.city},
              {label: 'پایه تحصیلی: ', value: data.grade},
              {label: 'رشته: ', value: data.branches},
              {label: 'رتبه کل در آیریسک: ', value: data.rank},
            ]}
            header={data.name}
            ops={false}
            src={data.pic}
          />
        )}
      </CommonWebBox>

      <CommonWebBox header={commonTranslator.iryscQuiz}>
        {iryscQuizzes !== undefined && (
          <CommonDataTable
            data={iryscQuizzes}
            columns={iryscColumns}
            pagination={false}
            excel={false}
          />
        )}
      </CommonWebBox>

      <CommonWebBox header={commonTranslator.openQuiz}>
        {openQuizzes !== undefined && (
          <CommonDataTable
            data={openQuizzes}
            columns={openColumns}
            pagination={false}
            excel={false}
          />
        )}
      </CommonWebBox>

      <CommonWebBox header={commonTranslator.customQuiz}>
        {customQuizzes !== undefined &&
          customQuizzes.map((elem, index) => {
            return (
              <MyView>
                <SimpleText
                  text={'نام آزمون: ' + elem.name}
                  style={{
                    ...styles.BlueBold,
                    ...styles.textCenter,
                    ...styles.margin15,
                  }}
                />
                <SimpleText
                  text={'تاریخ برگزاری: ' + elem.date}
                  style={{
                    ...styles.BlueBold,
                    ...styles.textCenter,
                    ...styles.margin15,
                  }}
                />
                <CommonDataTable
                  key={index}
                  columns={subjectColsCustomQuiz}
                  data={elem.subjects}
                  show_row_no={false}
                  pagination={false}
                  excel={false}
                />
              </MyView>
            );
          })}
      </CommonWebBox>
    </>
  );
}

export default StudentEducationalHistory;
