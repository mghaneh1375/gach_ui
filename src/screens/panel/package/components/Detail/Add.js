import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import Quizzes from '../../../../../components/web/Quizzes';
import {CommonButton} from '../../../../../styles/Common';
import {addQuizzesToPackage} from '../Utility';
import Translate from '../../Translate';
import commonTranslator from '../../../../../translator/Common';
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
    if (isWorking || state.allItems !== undefined) return;

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
        props.setMode('list');
        return;
      }

      let filtersTmp = res[0].tags.map((elem, index) => {
        return {
          label: elem,
          index: index,
        };
      });

      console.log(res[0].items);

      dispatch({
        allItems: res[0].items,
        filters: {
          items: filtersTmp,
          onChangeFilter: selectedIndices => {
            dispatch({
              checkedFilterIndices: selectedIndices,
              needUpdateFilters: true,
            });
          },
        },
      });
      setIsWorking(false);
    });
  }, [props, isWorking, state, dispatch]);

  if (state.selectableQuizzes === undefined) return <></>;
  return (
    <Quizzes
      onBackClicked={() => dispatch({selectingQuiz: false})}
      quizzes={state.selectableQuizzes}
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
