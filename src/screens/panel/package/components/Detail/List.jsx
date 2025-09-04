import React, {useState} from 'react';
import Quizzes from '../../../../../components/web/Quizzes.jsx';
import {showSuccess} from '@/services/utility';
import {BigBoldBlueText, CommonButton, MyView} from '@/styles';
import Translate from '../../translate';
import {removeQuizzesFromPackage} from '../utility';
import commonTranslator from '@/translator/common';
import {dispatchQuizzesContext, quizzesContext} from './Utility.jsx';
function List(props) {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const useGlobalState = () => [
    React.useContext(quizzesContext),
    React.useContext(dispatchQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();
  return (
    <MyView
      style={{
        padding: 10,
      }}>
      <BigBoldBlueText text={Translate.packageQuizzes} />
      {state.quizzes !== undefined && (
        <Quizzes
          setSelectedQuizzes={setSelectedQuizzes}
          quizzes={state.quizzes}>
          <CommonButton
            style={{
              alignSelf: 'flex-end',
            }}
            title={Translate.removeFromPackage}
            onPress={async () => {
              props.setLoading(true);
              const res = await removeQuizzesFromPackage(
                props.package.id,
                selectedQuizzes,
                props.token,
              );
              props.setLoading(false);
              if (res !== null) {
                showSuccess(commonTranslator.success);
                dispatch({
                  quizzes: res,
                });
                props.package.quizzesDoc = res;
                props.package.quizzes = res.length;
                props.setPackage(props.package);
                setSelectedQuizzes([]);
              }
            }}
          />
        </Quizzes>
      )}
    </MyView>
  );
}
export default List;
