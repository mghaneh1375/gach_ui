import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {generalRequest} from '../../API/Utility';
import Card from '../../screens/panel/quiz/components/Card/Card';
import {MyView, PhoneView} from '../../styles/Common';
import {FontIcon} from '../../styles/Common/FontIcon';
import Basket from './Basket';
import {dispatchStateContext} from '../../App';
import {styles} from '../../styles/Common/Styles';
import {getDevice} from '../../services/Utility';

function Quizzes(props) {
  const [quizzes, setQuizzes] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  React.useEffect(() => {
    if (props.quizzes !== undefined) setQuizzes(props.quizzes);
    else fetchQuizzes();
  }, [props.quizzes, fetchQuizzes]);

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

  const selectAll = () => {
    let allSelectedItems = quizzes.map(elem => {
      return elem.id;
    });

    setSelectedItems(allSelectedItems);
    props.setSelectedQuizzes(allSelectedItems);
    setQuizzes(
      quizzes.map(elem => {
        elem.isSelected = true;
        return elem;
      }),
    );
  };

  const fetchQuizzes = React.useCallback(() => {
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
    <MyView
      style={
        isInPhone
          ? {
              width: '100%',
              padding: 10,
              marginBottom:
                props.marginBottom !== undefined ? props.marginBottom : 120,
              ...styles.alignItemsStart,
            }
          : {
              padding: 10,
              marginBottom:
                props.marginBottom !== undefined ? props.marginBottom : 120,
              ...styles.alignItemsStart,
            }
      }>
      <PhoneView style={{...styles.alignSelfEnd}}>
        {props.onBackClicked !== undefined && (
          <FontIcon
            icon={faAngleLeft}
            theme={'rect'}
            kind={'normal'}
            parentStyle={{alignSelf: 'flex-end', margin: 20}}
            onPress={props.onBackClicked}
          />
        )}
      </PhoneView>
      <PhoneView style={isInPhone ? {width: '100%', gap: 10} : {gap: 15}}>
        {quizzes !== undefined &&
          quizzes.map((quiz, index) => {
            return (
              <Card onClick={toggleSelectedItems} quiz={quiz} key={index} />
            );
          })}
      </PhoneView>
      <Basket
        total={
          props.noSelectAll !== undefined && props.noSelectAll
            ? undefined
            : quizzes === undefined
            ? 0
            : quizzes.length
        }
        fullWidth={props.fullWidth}
        label={props.label}
        calculation={props.calculation}
        selectAll={() =>
          props.noSelectAll !== undefined && props.noSelectAll
            ? undefined
            : selectAll()
        }
        selectedLength={
          props.noSelectAll !== undefined && props.noSelectAll
            ? props.selectedItemsCount
            : selectedItems.length
        }>
        {props.children}
      </Basket>
    </MyView>
  );
}

export default Quizzes;
