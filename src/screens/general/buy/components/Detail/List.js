import React, {useState} from 'react';
import Quizzes from '../../../../../components/web/Quizzes';
import {BigBoldBlueText, MyView} from '../../../../../styles/Common';
import {dispatchPackagesContext, packagesContext} from '../Context';

function List(props) {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <MyView style={{padding: 10}}>
      <BigBoldBlueText text={'sa'} />

      {state.package !== undefined && state.package.quizzesDoc !== undefined && (
        <Quizzes
          setSelectedQuizzes={setSelectedQuizzes}
          quizzes={state.package.quizzesDoc}>
          {/* <CommonButton
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
          /> */}
        </Quizzes>
      )}
    </MyView>
  );
}

export default List;
