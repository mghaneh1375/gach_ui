import React, {useState} from 'react';
import {MyView} from '../../../../../styles/Common';
import {fetchPackageQuizzes} from '../Utility';

import Add from './Add';
import Info from './Info';
import List from './List';
import {dispatchQuizzesContext, quizzesContext} from './Utility';

function Detail(props) {
  const useGlobalState = () => [
    React.useContext(quizzesContext),
    React.useContext(dispatchQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking || state.quizzes !== undefined) return;

    if (props.package.quizzesDoc !== undefined) {
      dispatch({quizzes: props.package.quizzesDoc});
      return;
    }

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([fetchPackageQuizzes(props.token, props.package.id)]).then(
      res => {
        props.setLoading(false);
        if (res[0] === null) {
          props.setMode('list');
          return;
        }
        dispatch({quizzes: res[0]});
        props.package.quizzesDoc = res[0];
        props.setPackage(props.package);
        setIsWorking(false);
      },
    );
  }, [props, isWorking, dispatch, state.quizzes]);

  return (
    <MyView>
      {state.selectingQuiz && (
        <Add
          setMode={props.setMode}
          token={props.token}
          setLoading={props.setLoading}
          package={props.package}
          setPackage={props.setPackage}
        />
      )}

      {!state.selectingQuiz && (
        <MyView>
          <Info setMode={props.setMode} package={props.package} />
          {state.quizzes !== undefined && (
            <List
              token={props.token}
              setLoading={props.setLoading}
              package={props.package}
              setPackage={props.setPackage}
            />
          )}
        </MyView>
      )}
    </MyView>
  );
}

export default Detail;
