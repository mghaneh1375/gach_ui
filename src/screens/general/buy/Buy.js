import React, {useState} from 'react';
import {MyView, PhoneView} from '../../../styles/Common';
import Card from '../../panel/package/card/Card';
import QuizCard from '../../panel/quiz/components/Card/Card';
import {fetchRegistrablePackages} from './components/Utility';
import {dispatchStateContext} from '../../../App';

function Buy(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({loading: status});
  };

  const [packages, setPackages] = useState();
  const [quizzes, setQuizzes] = useState();
  const [selected, setSelected] = useState();

  React.useEffect(() => {
    dispatch({
      loading: true,
      isFilterMenuVisible: true,
      isRightMenuVisible: false,
    });
    Promise.all([fetchRegistrablePackages()]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setPackages(res[0].packages);
      setQuizzes(res[0].quizzes);
      dispatch({
        filters: res[0].tags,
        onChangeFilter: selectedIndices => {
          dispatch({
            checkedFilterIndices: selectedIndices,
            needUpdateFilters: true,
          });
        },
      });
    });
  }, [navigate, dispatch]);

  return (
    <MyView>
      <PhoneView style={{gap: 15, padding: 10}}>
        {packages !== undefined &&
          packages.map((package_, index) => {
            return (
              <Card
                isAdmin={false}
                key={index}
                package={package_}
                setLoading={props.setLoading}
                token={props.token}
                setSelected={props.setSelected}
              />
            );
          })}
        {quizzes !== undefined &&
          quizzes.map((quiz, index) => {
            return <QuizCard onClick={() => {}} quiz={quiz} key={index} />;
          })}
      </PhoneView>
    </MyView>
  );
}

export default Buy;
