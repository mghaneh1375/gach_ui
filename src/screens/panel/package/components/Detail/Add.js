import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import Quizzes from '../../../../../components/web/Quizzes';
import {CommonButton} from '../../../../../styles/Common';
import {addQuizzesToPackage} from '../Utility';
import Translate from '../../Translate';
import commonTranslator from '../../../../../tranlates/Common';
import {showSuccess} from '../../../../../services/Utility';
import {dispatchQuizzesContext, quizzesContext} from './Utility';
import {generalRequest} from '../../../../../API/Utility';

function Add(props) {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [isWorking, setIsWorking] = useState(false);

  const useGlobalState = () => [
    React.useContext(quizzesContext),
    React.useContext(dispatchQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (isWorking || state.registrableQuizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.fetchIRYSCRegistrableQuizzes,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        dispatch({selectingQuiz: false});
        return;
      }

      dispatch({registrableQuizzes: res[0]});
      setIsWorking(false);
    });
  }, [props, isWorking, state, dispatch]);

  if (state.registrableQuizzes === undefined) return <></>;
  return (
    <Quizzes
      onBackClicked={() => dispatch({selectingQuiz: false})}
      quizzes={state.registrableQuizzes}
      setSelectedQuizzes={setSelectedQuizzes}>
      <CommonButton
        style={{alignSelf: 'flex-end'}}
        title={Translate.addToPackage}
        theme={'dark'}
        onPress={async () => {
          props.setLoading(true);
          let res = await addQuizzesToPackage(
            props.package.id,
            selectedQuizzes,
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess(commonTranslator.success);
            dispatch({quizzes: res, selectingQuiz: false});
            props.package.quizzesDoc = res;
            props.package.quizzes = res.length;
            props.setPackage(props.package);
            setSelectedQuizzes([]);
          }
        }}
      />
    </Quizzes>
  );
}

export default Add;
