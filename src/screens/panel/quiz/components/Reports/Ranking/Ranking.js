import React, {useState} from 'react';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import {getRanking} from '../../Utility';
import {
  CommonButton,
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
import {
  convertSecToMin,
  convertSecToMinWithOutSec,
  getDevice,
} from '../../../../../../services/Utility';

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
  const [showDetails, setshowDetails] = useState(false);
  const [selectedTeamRank, setSelectedTeamRank] = useState();

  const chooseColumns = React.useCallback(() => {
    if (state.selectedQuiz.generalMode === 'escape') {
      let a = [
        {
          name: '',
          cell: (row, index, column, id) => {
            if (!props.isAdmin) return <></>;
            return (
              <SimpleFontIcon
                onPress={() => {
                  setSelectedTeam(state.selectedQuiz.ranking[index]);
                  setSelectedTeamRank(index + 1);
                  setshowDetails(true);
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
          name: 'نام',
          selector: row => row.user,
          grow: 2,
          fontSize: 10,
        },
        {
          name: 'تعداد سوالات حل کرده',
          selector: row => row.solved,
          grow: 1,
          fontSize: 10,
        },
        {
          name: 'آیا کل چالش را پشت سر گذاشته؟',
          selector: row => (row.isComplete ? 'بله' : 'خیر'),
          grow: 1,
          fontSize: 10,
        },
        {
          name: 'زمان ثبت آخرین پاسخ صحیح',
          selector: row =>
            convertSecToMinWithOutSec(row.lastAnswer) + ' بعد از شروع آزمون',
          grow: 1,
          fontSize: 10,
        },
        {
          name: 'رتبه',
          selector: row => row.rank,
          grow: 1,
          fontSize: 10,
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
        state.selectedQuiz.generalMode === 'open' ||
          (props.isAdmin !== undefined && props.isAdmin)
          ? props.token
          : undefined,
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
          {state.selectedQuiz.generalMode !== 'open' &&
            !isInPhone &&
            !showDetails && (
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
          {state.selectedQuiz.generalMode !== 'open' &&
            !isInPhone &&
            showDetails && (
              <CommonButton
                title={'بازگشت'}
                theme={'orangeRed'}
                onPress={() => setshowDetails(false)}
              />
            )}
          {state.selectedQuiz.title !== undefined && (
            <FontIcon
              onPress={() =>
                showDetails ? setshowDetails(false) : props.setMode('list')
              }
              theme="rect"
              kind="normal"
              icon={faArrowLeft}
            />
          )}
        </PhoneView>
      }>
      {state.selectedQuiz !== undefined &&
        !showDetails &&
        columns !== undefined &&
        state.selectedQuiz.ranking !== undefined && (
          <CommonDataTable
            columns={columns}
            data={state.selectedQuiz.ranking}
            show_row_no={false}
            pagination={false}
            groupOps={[]}
            excel={
              isInPhone || state.selectedQuiz.generalMode === 'escape'
                ? false
                : state.selectedQuiz.title !== undefined
            }
          />
        )}

      {state.selectedQuiz !== undefined &&
        state.selectedQuiz.generalMode === 'escape' &&
        showDetails &&
        selectedTeam !== undefined && (
          <>
            <PhoneView style={{...styles.gap30}}>
              <SimpleText text={'نام: ' + selectedTeam.user} />
              <SimpleText
                text={'تعداد سوالات حل شده: ' + selectedTeam.solved}
              />
              <SimpleText text={'رتبه: ' + selectedTeamRank} />
            </PhoneView>

            <PhoneView style={{...styles.gap30}}>
              {selectedTeam.startAt !== undefined && (
                <SimpleText text={'زمان آغاز: ' + selectedTeam.startAt} />
              )}
              {selectedTeam.finishAt !== undefined && (
                <SimpleText text={'زمان پایان: ' + selectedTeam.finishAt} />
              )}
            </PhoneView>

            <SimpleText
              text={'سوالات حل شده'}
              style={{...styles.fontSize17, ...styles.BlueBold}}
            />
            <MyView>
              {selectedTeam.answers.map((e, index) => {
                return (
                  <PhoneView style={{...styles.gap50}}>
                    <SimpleText text={'سوال ' + (index + 1)} />

                    {selectedTeam.answers[index].answerAt === '' && (
                      <SimpleText text={'حل نشده'} />
                    )}
                    {selectedTeam.answers[index].answerAt !== '' && (
                      <SimpleText
                        text={
                          'زمان حل: ' +
                          convertSecToMin(
                            selectedTeam.answers[index].answerAt,
                          ) +
                          '  بعد از شروع آزمون'
                        }
                      />
                    )}
                    <SimpleText
                      text={'تعداد تلاش: ' + selectedTeam.answers[index].tries}
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
