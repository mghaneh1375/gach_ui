import React, {useState, useRef, useCallback} from 'react';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {getQuiz, getRanking} from '../../Utility';
import {CommonWebBox, PhoneView} from '../../../../../../styles/Common';
import {quizContext, dispatchQuizContext} from '../../Context';
import {
  FontIcon,
  SimpleFontIcon,
} from '../../../../../../styles/Common/FontIcon';
import {faArrowLeft, faEye} from '@fortawesome/free-solid-svg-icons';
import CopyBox from '../../../../../../components/CopyBox';
import commonTranslator from '../../../Translator';
import {BASE_SITE_NAME} from '../../../../../../API/Utility';
import {styles} from '../../../../../../styles/Common/Styles';

function Ranking(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  const columns = [
    {
      name: '',
      cell: (row, index, column, id) => {
        return (
          <SimpleFontIcon
            onPress={() => {
              dispatch({
                selectedStudentId: state.selectedQuiz.ranking[index].id,
              });
              props.setMode('karname');
            }}
            icon={faEye}
          />
        );
      },
      minWidth: '40px',
      maxWidth: '40px',
      center: true,
    },
    {
      name: 'نام ',
      selector: row => row.name,
      grow: 2,
      fontSize: 10,
    },
    {
      name: 'شهر',
      selector: row => row.city,
      grow: 1,
      size: 10,
    },
    {
      name: 'استان',
      selector: row => row.state,
      grow: 1,
      fontSize: 10,
    },
    {
      name: 'مدرسه',
      selector: row => row.school,
      grow: 1,
      fontSize: 10,
    },
    {
      name: 'تراز کل',
      selector: row => row.taraz,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    },
    {
      name: 'رتبه در شهر',
      selector: row => row.cityRank,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    },
    {
      name: 'رتبه در استان',
      selector: row => row.stateRank,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    },
    {
      name: 'رتبه در کشور',
      selector: row => row.rank,
      minWidth: '70px',
      maxWidth: '70px',
      center: true,
    },
  ];

  // const fetchQuiz = React.useCallback(async () => {
  //   props.setLoading(true);

  //   let res = await getQuiz(props.quizId, props.quizMode, props.token);

  //   if (res === null) {
  //     props.setLoading(false);
  //     props.navigate('/');
  //     setIsWorking(false);
  //     return;
  //   }

  //   dispatch({selectedQuiz: res, needUpdate: true});
  // }, [props, dispatch]);

  // React.useEffect(() => {
  //   if (isWorking) return;

  //   if (state.quizzes === undefined) {
  //     setIsWorking(true);
  //     fetchQuiz();
  //     return;
  //   }
  // }, [state.quizzes, fetchQuiz, isWorking]);

  React.useEffect(() => {
    if (state.selectedQuiz === undefined) {
      dispatch({
        selectedQuiz: {id: props.quizId, generalMode: props.quizMode},
      });
      return;
    }

    if (isWorking || state.selectedQuiz.ranking !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      getRanking(state.selectedQuiz.id, state.selectedQuiz.generalMode),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }
      state.selectedQuiz.ranking = res[0];
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      setIsWorking(false);
    });
  }, [dispatch, state.selectedQuiz, props, isWorking]);

  return (
    <CommonWebBox
      header={'نتایج'}
      btn={
        <PhoneView style={styles.alignItemsCenter}>
          <CopyBox
            title={commonTranslator.copyLink}
            url={
              BASE_SITE_NAME +
              'ranking/' +
              state.selectedQuiz.generalMode +
              '/' +
              state.selectedQuiz.id
            }
          />
          <FontIcon
            onPress={() => props.setMode('list')}
            theme="rect"
            kind="normal"
            icon={faArrowLeft}
          />
        </PhoneView>
      }>
      {state.selectedQuiz !== undefined &&
        state.selectedQuiz.ranking !== undefined && (
          <CommonDataTable
            columns={columns}
            data={state.selectedQuiz.ranking}
            show_row_no={false}
            pagination={false}
            groupOps={[]}
          />
        )}
    </CommonWebBox>
  );
}

export default Ranking;
