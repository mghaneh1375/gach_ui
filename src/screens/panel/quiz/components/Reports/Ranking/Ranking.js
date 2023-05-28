import React, {useState} from 'react';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {getRanking} from '../../Utility';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../../styles/Common';
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
import {convertSecToMin, getDevice} from '../../../../../../services/Utility';

function Ranking(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;
  const [columns, setColumns] = useState();
  const [selectedTeam, setSelectedTeam] = useState();
  const [showDetailt, setShowDetailt] = useState(false);
  const [selectedTeamRank, setSelectedTeamRank] = useState();

  const chooseColumns = React.useCallback(() => {
    if (state.selectedQuiz.generalMode === 'onlineStanding') {
      let a = [
        {
          name: '',
          cell: (row, index, column, id) => {
            return (
              <SimpleFontIcon
                onPress={() => {
                  setSelectedTeam(state.selectedQuiz.ranking[index]);
                  setSelectedTeamRank(index + 1);
                  setShowDetailt(true);
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
          name: 'نام تیم',
          selector: row => row.teamName,
          grow: 2,
          fontSize: 10,
        },
        {
          name: 'رهبر تیم',
          selector: row => row.stdName,
          grow: 1,
          size: 10,
        },
        {
          name: 'امتیاز',
          selector: row => row.point,
          grow: 1,
          fontSize: 10,
        },
        {
          name: 'رتبه',
          cell: (row, index, column, id) => {
            return index + 1;
          },
          minWidth: '40px',
          maxWidth: '40px',
          center: true,
        },
      ];
      setColumns(a);
      return;
    }

    if (
      state.selectedQuiz.ranking !== undefined &&
      state.selectedQuiz.ranking.length > 0 &&
      state.selectedQuiz.ranking[0].totalMark !== undefined
    ) {
      setColumns([
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
          name: 'نمره',
          selector: row => row.mark,
          minWidth: '70px',
          maxWidth: '70px',
          center: true,
        },
        {
          name: 'نمره کل',
          selector: row => row.totalMark,
          minWidth: '70px',
          maxWidth: '70px',
          center: true,
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
      ]);
    } else {
      setColumns([
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
      ]);
    }
  }, [props, dispatch, state.selectedQuiz]);

  React.useEffect(() => {
    if (state.selectedQuiz.ranking === undefined) return;
    chooseColumns();
  }, [state.selectedQuiz, chooseColumns]);

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
      getRanking(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        state.selectedQuiz.generalMode === 'open' ? props.token : undefined,
      ),
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
      header={
        state.selectedQuiz.title !== undefined
          ? 'نتایج ' + state.selectedQuiz.title
          : props.quizName !== undefined
          ? 'نتایج ' + props.quizName
          : 'نتایج'
      }
      btn={
        <PhoneView style={styles.alignItemsCenter}>
          {state.selectedQuiz.generalMode !== 'open' && !isInPhone && (
            <CopyBox
              title={commonTranslator.copyLink}
              url={
                state.selectedQuiz.title !== undefined
                  ? BASE_SITE_NAME +
                    'ranking/' +
                    state.selectedQuiz.generalMode +
                    '/' +
                    state.selectedQuiz.id +
                    '/' +
                    state.selectedQuiz.title
                  : props.quizName !== undefined
                  ? BASE_SITE_NAME +
                    'ranking/' +
                    state.selectedQuiz.generalMode +
                    '/' +
                    state.selectedQuiz.id +
                    '/' +
                    props.quizName
                  : BASE_SITE_NAME +
                    'ranking/' +
                    state.selectedQuiz.generalMode +
                    '/' +
                    state.selectedQuiz.id
              }
            />
          )}
          {state.selectedQuiz.title !== undefined && (
            <FontIcon
              onPress={() =>
                showDetailt ? setShowDetailt(false) : props.setMode('list')
              }
              theme="rect"
              kind="normal"
              icon={faArrowLeft}
            />
          )}
        </PhoneView>
      }>
      {state.selectedQuiz !== undefined &&
        !showDetailt &&
        columns !== undefined &&
        state.selectedQuiz.ranking !== undefined && (
          <CommonDataTable
            columns={columns}
            data={state.selectedQuiz.ranking}
            show_row_no={false}
            pagination={false}
            groupOps={[]}
            excel={isInPhone ? false : state.selectedQuiz.title !== undefined}
          />
        )}

      {state.selectedQuiz !== undefined &&
        showDetailt &&
        selectedTeam !== undefined && (
          <>
            <PhoneView style={{...styles.gap15}}>
              <SimpleText text={'نام تیم: ' + selectedTeam.teamName} />
              <SimpleText text={'نام رهبر تیم: ' + selectedTeam.stdName} />
              <SimpleText text={'امتیاز: ' + selectedTeam.point} />
              <SimpleText text={'رتبه: ' + selectedTeamRank} />
              {state.selectedQuiz.startAt !== undefined && (
                <SimpleText text={'زمان آغاز: ' + selectedTeam.startAt} />
              )}
              {state.selectedQuiz.endAt !== undefined && (
                <SimpleText text={'زمان پایان: ' + selectedTeam.endAt} />
              )}
            </PhoneView>
            <SimpleText
              text={'سوالات حل شده'}
              style={{...styles.fontSize17, ...styles.BlueBold}}
            />
            <MyView>
              {selectedTeam.marks.map((e, index) => {
                console.log(index);
                console.log(selectedTeam);
                if (selectedTeam.answers[index].mark === undefined) return;
                return (
                  <PhoneView style={{...styles.gap50}}>
                    <SimpleText text={'سوال ' + (index + 1)} />
                    <SimpleText text={'نمره سوال: ' + e} />
                    <SimpleText
                      text={'نمره کسب شده: ' + selectedTeam.answers[index].mark}
                    />
                    <SimpleText
                      text={
                        'زمان حل: ' +
                        convertSecToMin(selectedTeam.answers[index].time) +
                        ' ثانیه بعد از شروع آزمون'
                      }
                    />
                    <SimpleText
                      text={
                        'امتیاز کسب شده: ' + selectedTeam.answers[index].point
                      }
                    />
                  </PhoneView>
                );
              })}
            </MyView>
          </>
        )}
    </CommonWebBox>
  );
}

export default Ranking;
