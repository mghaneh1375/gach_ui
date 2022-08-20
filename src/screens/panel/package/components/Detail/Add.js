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
        props.setMode('list');
        return;
      }

      let filters = res[0].tags.map((elem, index) => {
        return {
          label: elem,
          index: index,
          doFilter: idx => {
            let tmpIdx = state.checkedFilterIndices.indexOf(idx);

            if (tmpIdx === -1) state.checkedFilterIndices.push(idx);
            else state.checkedFilterIndices.splice(tmpIdx, 1);

            if (state.checkedFilterIndices.length === 0)
              dispatch({
                checkedFilterIndices: state.checkedFilterIndices,
                needUpdateFilters: true,
              });
          },
        };
      });

      filters.push({
        label: commonTranslator.all,
        index: -1,
        doFilter: idx => {
          let tmpIdx = state.checkedFilterIndices.indexOf(idx);

          if (tmpIdx === -1) state.checkedFilterIndices.push(idx);
          else state.checkedFilterIndices.splice(tmpIdx, 1);

          if (state.checkedFilterIndices.indexOf(-1) !== -1)
            state.checkedFilterIndices = [-1];

          dispatch({
            checkedFilterIndices: state.checkedFilterIndices,
            needUpdateFilters: true,
          });
        },
      });

      dispatch({
        registrableQuizzes: res[0].items,
        selectableQuizzes: res[0].items,
        checkedFilterIndices: [],
        filters: filters,
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
