import React from 'react';
import {PhoneView, MyView} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {kindQuizKeyVals} from '../KeyVals';
import {dispatchQuizContext, quizContext} from './../Context';

const QuizGeneralInfo = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const changeInput = (label, text) => {
    if (label === 'name') props.setName(text);
    else if (label === 'desc') props.setDesc(text);
  };

  return (
    <MyView>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderTextInput
          placeholder={translator.name}
          onChangeText={e => changeInput('name', e)}
          value={props.name}
          subText={translator.name}
        />
        <JustBottomBorderSelect
          value={
            props.kind === undefined
              ? {}
              : kindQuizKeyVals.filter(element => {
                  return element.id === props.kind;
                })[0]
          }
          placeholder={translator.kind}
          subText={translator.kind}
          setter={props.setKind}
          values={kindQuizKeyVals}
        />
        <JustBottomBorderTextInput
          multi={true}
          addNotFound={true}
          resultPane={true}
          setSelectedItem={item => {
            props.setTags(
              item.map(elem => {
                return elem.name;
              }),
            );
            let tmp = state.tags;
            item.forEach(itr => {
              if (state.tags.find(elem => elem.id === itr.id) === undefined) {
                tmp.push(itr);
              }
            });
            dispatch({tags: tmp});
          }}
          values={state.tags}
          reset={false}
          placeholder={translator.tag}
          subText={translator.tag}
        />
      </PhoneView>

      <PhoneView
        style={{marginTop: 20, marginRight: 10, flexDirection: 'column'}}>
        <JustBottomBorderTextInput
          placeholder={commonTranslator.desc}
          subText={commonTranslator.desc}
          value={props.desc}
          onChangeText={e => changeInput('desc', e)}
          multiline={true}
        />
      </PhoneView>
    </MyView>
  );
};

export default QuizGeneralInfo;
