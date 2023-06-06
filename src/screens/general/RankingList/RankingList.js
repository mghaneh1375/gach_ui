import React, {useState} from 'react';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import Card from '../../panel/quiz/components/Card/Card';
import ProgressCard from '../../studentPanel/‌MyOffs/ProgressCard/ProgressCard';
import BoxRanking from '../BoxRanking/BoxRanking';
import Filter from './Filter';
import {fetchFinishedQuizzes, fetchRankingList} from './Utility';

function RankingList(props) {
  const navigate = props.navigate;
  const [isWorking, setIsWorking] = useState(false);
  const [data, setData] = useState();
  const [grades, setGrades] = useState();
  const [useFilter, setUseFilter] = useState(false);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('generalRanking');
  const [quizzes, setQuizzes] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    if (isWorking || data !== undefined) return;

    setIsWorking(true);
    dispatch({loading: true});

    Promise.all([
      fetchRankingList(),
      generalRequest(routes.fetchBranches, 'get', undefined, 'data'),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null || res[1] === null) {
        navigate('/');
        return;
      }

      setData(res[0]);
      setGrades(res[1]);
      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, navigate, data]);

  const prepareIRYSCQuizzes = React.useCallback(() => {
    if (quizzes !== undefined) {
      setMode('quizRanking');
      return;
    }

    dispatch({loading: true});

    Promise.all([fetchFinishedQuizzes()]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        setQuizzes([]);
        setMode('quizRanking');
        return;
      }

      setQuizzes(res[0]);
      setMode('quizRanking');
    });
  }, [dispatch, quizzes]);

  const [viewableItems, setViewableItems] = useState();

  React.useEffect(() => {
    if (quizzes === undefined) return;
    setViewableItems(quizzes.slice(0, 9));
  }, [quizzes]);

  return (
    <MyView>
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(./assets/images/back3.png)',
        }}></div>

      <MyView style={{marginBottom: 20}}>
        <PhoneView style={{...styles.alignSelfCenter, ...styles.marginTop20}}>
          <ProgressCard
            header={'رتبه بندی کلی'}
            theme={vars.ORANGE}
            color={mode === 'generalRanking' ? vars.WHITE : vars.DARK_BLUE}
            width={250}
            percent={mode === 'generalRanking' ? '90%' : '10%'}
            onPress={() => {
              if (mode === 'generalRanking') return;
              setMode('generalRanking');
            }}
            style={{...styles.cursor_pointer}}
          />
          <ProgressCard
            header={'رتبه بندی آزمون ها'}
            theme={vars.ORANGE_RED}
            color={mode === 'quizRanking' ? vars.WHITE : vars.DARK_BLUE}
            width={250}
            percent={mode === 'quizRanking' ? '90%' : '10%'}
            onPress={() => {
              if (mode === 'quizRanking') return;
              prepareIRYSCQuizzes();
            }}
            style={{...styles.cursor_pointer}}
          />
        </PhoneView>
        {mode === 'quizRanking' && (
          <>
            <PhoneView
              style={
                state.isInPhone
                  ? {
                      ...styles.gap30,
                      ...styles.padding10,
                      ...styles.justifyContentCenter,
                      ...{marginBottom: 100},
                    }
                  : {...styles.gap30, ...styles.justifyContentCenter}
              }>
              {viewableItems !== undefined &&
                viewableItems.map((elem, index) => {
                  return (
                    <Card
                      onSelect={quizId => {
                        window.open(
                          '/ranking/' +
                            elem.generalMode +
                            '/' +
                            quizId +
                            '/' +
                            elem.title,
                          '_blank',
                        );
                      }}
                      selectText={'مشاهده رتبه بندی'}
                      key={index}
                      quiz={elem}
                    />
                  );
                })}
            </PhoneView>
            {viewableItems !== undefined &&
              viewableItems.length < quizzes.length && (
                <SimpleText
                  text={'نمایش بیشتر'}
                  style={{
                    ...styles.alignSelfCenter,
                    ...styles.cursor_pointer,
                    ...styles.BlueBold,
                    ...styles.fontSize20,
                    ...styles.margin25,
                  }}
                  onPress={() => {
                    setViewableItems(
                      quizzes.slice(
                        0,
                        Math.min(viewableItems.length + 6, quizzes.length),
                      ),
                    );
                  }}
                />
              )}
          </>
        )}
        {mode === 'generalRanking' && (
          <MyView style={state.isInPhone ? {marginBottom: 100} : {}}>
            <CommonWebBox
              style={styles.alignSelfCenter}
              width={
                state.isRightMenuVisible || state.isInPhone
                  ? '100%'
                  : vars.LEFT_SECTION_WIDTH
              }>
              <Filter
                setUseFilter={setUseFilter}
                useFilter={useFilter}
                setLoading={setLoading}
                setData={setData}
                grades={grades}
              />
            </CommonWebBox>
            <PhoneView style={styles.justifyContentCenter}>
              {data !== undefined &&
                data.map((elem, index) => {
                  return (
                    <PhoneView
                      key={index}
                      style={{
                        marginRight: state.isInPhone ? 50 : 70,
                        marginTop: 20,
                        gap: 50,
                      }}>
                      <BoxRanking
                        school={elem.student.school}
                        grade={elem.student.grade}
                        name={elem.student.name}
                        city={elem.student.city}
                        valScore={elem.cumSum}
                        valQuiz={elem.totalQuizzes}
                        field={elem.student.branches}
                        rank={elem.student.rank}
                        pic={elem.student.pic}
                        useFilter={useFilter}
                      />
                    </PhoneView>
                  );
                })}
            </PhoneView>
          </MyView>
        )}
      </MyView>
    </MyView>
  );
}

export default RankingList;
