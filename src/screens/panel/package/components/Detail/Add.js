import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import Quizzes from '../../../../../components/web/Quizzes';
import {CommonButton} from '../../../../../styles/Common';
import {addQuizzesToPackage} from '../Utility';
import Translate from '../../Translate';
import commonTranslator from '../../../../../tranlates/Common';
import {showSuccess} from '../../../../../services/Utility';
import {dispatchQuizzesContext, quizzesContext} from './Utility';

function Add(props) {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const useGlobalState = () => [
    React.useContext(quizzesContext),
    React.useContext(dispatchQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <Quizzes
      onBackClicked={() => dispatch({selectingQuiz: false})}
      fetchUrl={routes.fetchIRYSCRegistrableQuizzes}
      token={props.token}
      setSelectedQuizzes={setSelectedQuizzes}
      setLoading={props.setLoading}>
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
          }
        }}
      />
    </Quizzes>
  );
}

export default Add;
