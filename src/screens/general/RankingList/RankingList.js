import React, {useState} from 'react';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext} from '../../../App';
import {CommonWebBox, MyView, PhoneView} from '../../../styles/Common';
import BoxRanking from '../BoxRanking/BoxRanking';
import Filter from './Filter';
import {fetchRankingList} from './Utility';

function RankingList(props) {
  const navigate = props.navigate;
  const [isWorking, setIsWorking] = useState(false);
  const [data, setData] = useState();
  const [grades, setGrades] = useState();
  const [useFilter, setUseFilter] = useState(false);

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    if (isWorking || data !== undefined) return;

    setIsWorking(true);
    dispatch({loading: true});

    Promise.all([
      fetchRankingList(),
      generalRequest(routes.fetchGrades, 'get', undefined, 'data'),
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

  return (
    <MyView>
      <CommonWebBox>
        <Filter
          setUseFilter={setUseFilter}
          useFilter={useFilter}
          setLoading={setLoading}
          setData={setData}
          grades={grades}
        />
      </CommonWebBox>
      <PhoneView>
        {data !== undefined &&
          data.map((elem, index) => {
            return (
              <PhoneView style={{marginRight: 70, marginTop: 20, gap: 50}}>
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
  );
}

export default RankingList;
