import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {generalRequest} from '../../API/Utility';
import Card from '../../screens/panel/quiz/components/Card/Card';
import {MyView, PhoneView} from '../../styles/Common';
import {FontIcon} from '../../styles/Common/FontIcon';
import Basket from './Basket';
import {globalStateContext, dispatchStateContext} from '../../App';

function Quizzes(props) {
  const [quizzes, setQuizzes] = useState(props.quizzes);
  const [selectable, setSelectable] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const toggleSelectedItems = id => {
    let idx = selectedItems.indexOf(id);
    let allSelectedItems = selectedItems;

    if (idx === -1) allSelectedItems.push(id);
    else allSelectedItems.splice(idx, 1);

    setSelectedItems(allSelectedItems);
    props.setSelectedQuizzes(allSelectedItems);
    setQuizzes(
      quizzes.map(elem => {
        elem.isSelected = selectedItems.indexOf(elem.id) !== -1;
        return elem;
      }),
    );
  };

  React.useEffect(() => {
    if (isWorking || quizzes !== undefined) return;

    if (props.fetchUrl === undefined && props.quizzes !== undefined) {
      dispatch({isRightMenuVisible: false, isFilterMenuVisible: true});
      setQuizzes(props.quizzes);
      return;
    }

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(props.fetchUrl, 'get', undefined, 'data', props.token),
    ]).then(res => {
      props.setLoading(false);
      setIsWorking(false);

      if (res[0] === null) {
        if (props.fail !== undefined) props.fail();
        return;
      }

      setQuizzes(res[0].items);
      dispatch({
        isRightMenuVisible: false,
        isFilterMenuVisible: true,
        filters: res[0].tags.map((elem, index) => {
          return {
            label: elem,
            index: index,
            doFilter: selectedIndices => console.log(selectedIndices),
          };
        }),
      });
      if (props.setQuizzes !== undefined) props.setQuizzes(res[0].items);
    });
  }, [props, isWorking, quizzes, dispatch]);

  return (
    <MyView style={{padding: 10, marginBottom: 120}}>
      {props.onBackClicked !== undefined && (
        <FontIcon
          icon={faAngleLeft}
          theme={'rect'}
          kind={'normal'}
          parentStyle={{alignSelf: 'flex-end', margin: 20}}
          onPress={props.onBackClicked}
        />
      )}
      <PhoneView style={{gap: 15}}>
        {quizzes !== undefined &&
          quizzes.map((quiz, index) => {
            return (
              <Card onClick={toggleSelectedItems} quiz={quiz} key={index} />
            );
          })}
      </PhoneView>
      <Basket total={quizzes.length} selectedLength={selectedItems.length}>
        {props.children}
      </Basket>
    </MyView>
  );
}

export default Quizzes;
