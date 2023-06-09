import {useEffectOnce} from 'usehooks-ts';
import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {useParams} from 'react-router';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {MyView} from '../../../styles/Common';
import OnlineStanding from './OnlineStanding';
import Team from './Team';
import {getDevice, isUserAdmin} from '../../../services/Utility';
import TeamDetail from './TeamDetail';
import vars from '../../../styles/root';

function Ranking(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const isAdmin = isUserAdmin(state.user);
  const params = useParams();
  const [quiz, setQuiz] = useState();
  const [desc, setDesc] = useState();

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchQuizRanking + 'onlineStanding/' + params.quizId,
        'get',
        undefined,
        'data',
        isAdmin ? state.token : undefined,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setDesc(res[0].description);
      let tmp = res[0];
      tmp.description = undefined;
      setQuiz(tmp);
    });
  }, [dispatch, params, props, isAdmin, state.token]);

  useEffectOnce(() => {
    fetchData();
  });

  const [selectedTeam, setSelectedTeam] = useState();
  const [selectedRank, setSelectedRank] = useState();

  const isLogin = state.user !== undefined && state.user !== null;

  return (
    <MyView
      style={
        isLogin || isInPhone
          ? {}
          : {width: vars.LEFT_SECTION_WIDTH, alignSelf: 'center'}
      }>
      {selectedTeam === undefined && (
        <MyView style={{marginBottom: isInPhone ? 200 : 100}}>
          <OnlineStanding
            height={230}
            onBackClick={() =>
              state.user === undefined || state.user === null
                ? navigate('/rankinglist')
                : isAdmin
                ? navigate('/quiz/onlineStanding')
                : navigate('/myIRYSCQuizzes')
            }
            quiz={quiz}
            desc={desc}
          />

          {quiz !== undefined &&
            quiz.teams !== undefined &&
            quiz.teams.length > 0 && (
              <Team
                setSelectedItem={(t, r) => {
                  setSelectedTeam(t);
                  setSelectedRank(r);
                }}
                isRankingNeed={true}
                quiz={quiz}
              />
            )}
        </MyView>
      )}

      {selectedTeam !== undefined && (
        <TeamDetail
          back={() => setSelectedTeam(undefined)}
          rank={selectedRank}
          team={selectedTeam}
        />
      )}
    </MyView>
  );
}

export default Ranking;
