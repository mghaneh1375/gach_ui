import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {generalRequest} from '../../API/Utility';
import Card from '../../screens/panel/quiz/components/Card/Card';
import {getScreenHeight} from '../../services/Utility';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../styles/Common';
import {FontIcon} from '../../styles/Common/FontIcon';
import vars from '../../styles/root';
import commonTranslator from './../../tranlates/Common';

function Quizzes(props) {
  const [quizzes, setQuizzes] = useState(props.quizzes);
  const [isWorking, setIsWorking] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

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
    if (isWorking || (quizzes !== undefined && props.fetchUrl !== undefined))
      return;

    if (props.fetchUrl === undefined && props.quizzes !== undefined) {
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

      setQuizzes(res[0]);
      if (props.setQuizzes !== undefined) props.setQuizzes(res[0]);
    });
  }, [props, isWorking, quizzes]);

  return (
    <View style={{height: getScreenHeight() + 50}}>
      {props.onBackClicked !== undefined && (
        <FontIcon
          icon={faAngleLeft}
          theme={'rect'}
          kind={'normal'}
          parentStyle={{alignSelf: 'flex-end', margin: 20}}
          onPress={props.onBackClicked}
        />
      )}
      <PhoneView>
        {quizzes !== undefined &&
          quizzes.map((quiz, index) => {
            return (
              <Card onClick={toggleSelectedItems} quiz={quiz} key={index} />
            );
          })}
      </PhoneView>
      <CommonWebBox
        style={{
          position: 'absolute',
          bottom: 0,
          width: '96%',
          right: '2%',
          height: 70,
        }}>
        <EqualTwoTextInputs>
          <View>
            <PhoneView>
              <SimpleText
                style={{color: vars.DARK_BLUE, fontWeight: 600, fontSize: 17}}
                text={'?????????? ??????????'}
              />
              <SimpleText
                style={{
                  color: vars.YELLOW,
                  fontSize: 13,
                  marginTop: 5,
                  marginRight: 5,
                }}
                text={commonTranslator.selectAll}
              />
            </PhoneView>
            {quizzes !== undefined && (
              <PhoneView>
                <SimpleText
                  style={{color: vars.YELLOW, fontSize: 15}}
                  text={selectedItems.length}
                />
                <SimpleText
                  style={{color: vars.DARK_BLUE, fontSize: 15}}
                  text={' ???? ' + quizzes.length + ' ?????????? ?????????? '}
                />
              </PhoneView>
            )}
          </View>
          {props.children}
        </EqualTwoTextInputs>
      </CommonWebBox>
    </View>
  );
}

export default Quizzes;
