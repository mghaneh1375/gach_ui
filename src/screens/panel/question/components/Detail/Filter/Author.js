import React from 'react';
import {View} from 'react-native';
import {
  CommonRadioButton,
  PhoneView,
  SimpleText,
} from '../../../../../../styles/Common';
import {questionContext, dispatchQuestionContext} from '../Context';

function Author(props) {
  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  const toggleSelect = author => {
    let allAuthors = state.authors;
    let tmp = allAuthors.find(elem => elem.author === author);
    tmp.selected = !tmp.selected;

    props.localFilter(
      state.showEasy,
      state.showMid,
      state.showHard,
      state.showTest,
      state.showShortAnswer,
      state.showMultiSentence,
      state.showTashrihi,
      allAuthors,
    );
    dispatch({authors: allAuthors});
  };

  return (
    <PhoneView style={{gap: 50, flexWrap: 'wrap'}}>
      {state.authors !== undefined &&
        state.authors.map((elem, index) => {
          return (
            <PhoneView style={{minWidth: 200}} key={index}>
              <CommonRadioButton
                value={elem.author}
                status={elem.selected ? 'checked' : 'unchecked'}
                onPress={() => toggleSelect(elem.author)}
                text={''}
              />
              <View>
                <SimpleText text={elem.author} />
                <SimpleText
                  style={{fontSize: 11}}
                  text={'تعداد سوالات طراحی شده: ' + elem.qNo}
                />
              </View>
            </PhoneView>
          );
        })}
    </PhoneView>
  );
}

export default Author;