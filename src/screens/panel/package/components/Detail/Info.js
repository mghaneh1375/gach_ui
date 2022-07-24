import React from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {TinyTextIcon} from '../../../../../styles/Common/TextIcon';
import Translate from '../../Translate';
import {
  styleFontSize11,
  styleFontSize13,
  styleFontSize15,
  styleItem,
  styleItemsGrandParent,
  styleItemsParent,
} from './../../card/Style';
import commonTranslator from '../../../../../tranlates/Common';
import {quizzesContext, dispatchQuizzesContext} from './Utility';

function Info(props) {
  const useGlobalState = () => [
    React.useContext(quizzesContext),
    React.useContext(dispatchQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <CommonWebBox
      header={props.package.title}
      onBackClick={() => props.setMode('list')}
      backBtn={true}>
      <View style={{marginTop: 20}}>
        <SimpleText
          style={{...styleFontSize13}}
          text={commonTranslator.grade + ' : ' + props.package.grade.name}
        />
        <SimpleText
          style={{...styleFontSize13}}
          text={commonTranslator.lesson + ' : ' + props.package.lesson.name}
        />
        <View style={{...styleItemsGrandParent}}>
          <PhoneView style={{...styleItemsParent}}>
            <PhoneView style={{...styleItem}}>
              <TinyTextIcon />
              <View>
                <SimpleText
                  style={{...styleFontSize11}}
                  text={Translate.quizCount}
                />
                <SimpleText
                  style={{...styleFontSize15}}
                  text={props.package.quizzes}
                />
              </View>
            </PhoneView>

            <PhoneView style={{...styleItem}}>
              <TinyTextIcon />
              <View>
                <SimpleText
                  style={{...styleFontSize11}}
                  text={Translate.minSelect}
                />
                <SimpleText
                  style={{...styleFontSize15}}
                  text={props.package.minSelect}
                />
              </View>
            </PhoneView>

            <PhoneView style={{...styleItem}}>
              <TinyTextIcon />
              <View>
                <SimpleText
                  style={{...styleFontSize11}}
                  text={Translate.buyersCount}
                />
                <SimpleText
                  style={{...styleFontSize15}}
                  text={props.package.buyers}
                />
              </View>
            </PhoneView>
          </PhoneView>
        </View>

        <CommonButton
          title={Translate.addQuiz}
          theme={'dark'}
          onPress={() => dispatch({selectingQuiz: true})}
        />
      </View>
    </CommonWebBox>
  );
}

export default Info;
