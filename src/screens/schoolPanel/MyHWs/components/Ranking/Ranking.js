import React, {useState} from 'react';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {getDevice} from '../../../../../services/Utility';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {getRanking} from '../../../../panel/quiz/components/Utility';
import {CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Karname from '../../../../panel/quiz/components/Reports/Karname/Karname';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../../panel/quiz/components/Context';

function Ranking(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;
  const [columns, setColumns] = useState();
  const [ranking, setRanking] = useState();

  const chooseColumns = React.useCallback(() => {
    setColumns([
      {
        name: '',
        cell: (row, index, column, id) => {
          return (
            <SimpleFontIcon
              onPress={() => {
                dispatch({
                  selectedStudentId: ranking[index].id,
                  selectedQuiz: props.quiz,
                });
                setShowKarname(true);
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
        name: 'رتبه',
        selector: row => row.rank,
        minWidth: '70px',
        maxWidth: '70px',
        center: true,
      },
    ]);
  }, [dispatch, ranking, props.quiz]);

  React.useEffect(() => {
    chooseColumns();
  }, [props.quizId, chooseColumns]);

  React.useEffect(() => {
    if (isWorking || ranking !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      getRanking(props.quiz.id, props.quiz.generalMode, props.token),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.hide();
        return;
      }
      setRanking(res[0]);
      setIsWorking(false);
    });
  }, [state.selectedQuiz, ranking, props, isWorking]);

  const [showKarname, setShowKarname] = useState(false);

  return (
    <>
      {showKarname && state.selectedStudentId !== undefined && (
        <Karname
          setLoading={props.setLoading}
          setMode={() => {
            dispatch({selectedStudentId: undefined});
            setShowKarname(false);
          }}
          onBackClick={() => {
            dispatch({selectedStudentId: undefined});
            setShowKarname(false);
          }}
          token={props.token}
        />
      )}
      {(!showKarname || state.selectedStudentId === undefined) && (
        <CommonWebBox
          header={props.quiz !== undefined ? 'نتایج ' + props.quiz.title : ''}
          backBtn={true}
          onBackClick={() => props.hide()}>
          {props.quiz !== undefined &&
            columns !== undefined &&
            ranking !== undefined && (
              <CommonDataTable
                columns={columns}
                data={ranking}
                show_row_no={false}
                pagination={false}
                groupOps={[]}
                excel={isInPhone ? false : props.quiz.title !== undefined}
              />
            )}
        </CommonWebBox>
      )}
    </>
  );
}

export default Ranking;
