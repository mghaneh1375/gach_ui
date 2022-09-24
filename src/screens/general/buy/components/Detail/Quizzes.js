import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import Basket from '../../../../../components/web/Basket';
import {MyView, PhoneView} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {styles} from '../../../../../styles/Common/Styles';
import Card from '../../../../panel/quiz/components/Card/Card';
import {packagesContext, dispatchPackagesContext} from '../Context';

function Quizzes(props) {
  const [quizzes, setQuizzes] = useState();

  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    setQuizzes(props.quizzes);
  }, [props.quizzes]);

  const toggleSelectedItems = id => {
    let idx =
      state.wantedQuizzes === undefined ? -1 : state.wantedQuizzes.indexOf(id);
    let allSelectedItems = [];
    if (state.wantedQuizzes !== undefined) {
      state.wantedQuizzes.forEach(elem => {
        allSelectedItems.push(elem);
      });
    }

    if (idx === -1) allSelectedItems.push(id);
    else allSelectedItems.splice(idx, 1);

    dispatch({wantedQuizzes: allSelectedItems});

    setQuizzes(
      quizzes.map(elem => {
        elem.isSelected = allSelectedItems.indexOf(elem.id) !== -1;
        return elem;
      }),
    );
  };

  return (
    <MyView
      style={{
        padding: 10,
        marginBottom:
          props.marginBottom !== undefined ? props.marginBottom : 120,
        ...styles.alignItemsStart,
      }}>
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
      <PhoneView style={{gap: 15}}>
        {quizzes !== undefined &&
          quizzes.map((quiz, index) => {
            return (
              <Card onClick={toggleSelectedItems} quiz={quiz} key={index} />
            );
          })}
      </PhoneView>
      <Basket
        total={undefined}
        fullWidth={props.fullWidth}
        label={props.label}
        calculation={props.calculation}
        selectAll={undefined}
        selectedLength={props.selectedItemsCount}>
        {props.children}
      </Basket>
    </MyView>
  );
}

export default Quizzes;
