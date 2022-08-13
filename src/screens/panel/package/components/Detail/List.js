import React, {useState} from 'react';
import {View} from 'react-native';
import Quizzes from '../../../../../components/web/Quizzes';
import {showSuccess} from '../../../../../services/Utility';
import {
  BigBoldBlueText,
  CommonButton,
  MyView,
} from '../../../../../styles/Common';
import Translate from '../../Translate';
import {removeQuizzesFromPackage} from '../Utility';
import commonTranslator from '../../../../../tranlates/Common';
import {dispatchQuizzesContext, quizzesContext} from './Utility';

function List(props) {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const useGlobalState = () => [
    React.useContext(quizzesContext),
    React.useContext(dispatchQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <MyView>
      <BigBoldBlueText text={Translate.packageQuizzes} />
      {state.quizzes !== undefined && (
        <Quizzes
          setSelectedQuizzes={setSelectedQuizzes}
          quizzes={state.quizzes}>
          <CommonButton
            style={{alignSelf: 'flex-end'}}
            title={Translate.removeFromPackage}
            onPress={async () => {
              props.setLoading(true);
              let res = await removeQuizzesFromPackage(
                props.package.id,
                selectedQuizzes,
                props.token,
              );
              props.setLoading(false);
              if (res !== null) {
                showSuccess(commonTranslator.success);
                dispatch({quizzes: res});
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
