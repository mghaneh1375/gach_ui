import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import Quizzes from '@/components/web/Quizzes';
import {showSuccess} from '@/services/utility';
import {CommonButton} from '@/styles';
import commonTranslator from '@/translator/common';
import Translate from '../../translate';
import {addQuizzesToPackage} from '../utility';
import {dispatchQuizzesContext, quizzesContext} from './Utility';
function AddOpenQuiz(props) {
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  // const [pageIndex, setPageIndex] = useState(1);
  // const pageSize = useMemo(() => 20, []);

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
        routes.fetchOpenQuizzes,
        // +
        //   '?pageIndex=' +
        //   pageIndex +
        //   '&pageSize=' +
        //   pageSize,
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
      const filtersTmp = res[0].tags.map((elem, index) => {
        return {
          label: elem,
          index: index,
        };
      });
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
      onBackClicked={() =>
        dispatch({
          selectingQuiz: false,
        })
      }
      quizzes={state.selectableQuizzes}
      setSelectedQuizzes={setSelectedQuizzes}>
      <CommonButton
        style={{
          alignSelf: 'flex-end',
        }}
        title={Translate.addToPackage}
        theme={'dark'}
        onPress={async () => {
          props.setLoading(true);
          const res = await addQuizzesToPackage(
            props.package.id,
            selectedQuizzes,
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess(commonTranslator.success);
            dispatch({
              quizzes: res,
              selectingQuiz: false,
            });
            props.package.quizzesDoc = res;
            props.package.quizzes = res.length;
            props.setPackage(props.package);
            dispatch({
              selectableQuizzes: state.selectableQuizzes.map(elem => {
                elem.isSelected = false;
                return elem;
              }),
            });
            setSelectedQuizzes([]);
          }
        }}
      />
    </Quizzes>
  );
}
export default AddOpenQuiz;
