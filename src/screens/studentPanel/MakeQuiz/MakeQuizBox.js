import {faTrash} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {changeText} from '../../../services/Utility';
import {
  BigBoldBlueTextInline,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import commonTranslator from '../../../translator/Common';
import SymbolsFace from './SymbolsFace';
import Translate from './Translate';

function MakeQuizBox(props) {
  const [count, setCount] = useState();
  const [numberOfQuiz, setNumberOfQuiz] = useState();
  const [detail, setDetail] = useState();
  const ToggleDetail = () => {
    setDetail(!detail);
  };

  return (
    <MyView
      style={{
        ...styles.boxShadow,
        ...styles.borderRadius10,
      }}>
      {props.header !== undefined && (
        <PhoneView
          style={{
            ...styles.gap15,
            ...styles.alignItemsCenter,
            ...styles.padding10,
            ...styles.justifyContentSpaceBetween,
          }}>
          <PhoneView
            style={{
              ...styles.positionAbsolute,
              ...styles.top0,
              ...styles.right0,
              width: 40,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              height: '100%',
              backgroundColor: vars.ORANGE,
            }}>
            <SimpleText
              // onPress={() => ToggleDetail()}
              style={{
                ...styles.fontSize25,
                color: vars.WHITE,
                ...styles.alignSelfCenter,
                ...styles.paddingRight15,
                marginTop: 3,
              }}
              text={props.index}
            />
          </PhoneView>
          <EqualTwoTextInputs
            style={{marginRight: 40, width: 'calc(100% - 40px)'}}>
            <BigBoldBlueTextInline
              style={{
                color: props.color !== undefined ? props.color : vars.DARK_BLUE,
              }}
              text={props.header}
            />
            <PhoneView style={styles.gap10}>
              <SimpleText text={'تعداد:' + props.count} />
              <SimpleText
                text={
                  props.level === 'easy'
                    ? 'سطح سختی: ساده'
                    : props.level === 'mid'
                    ? 'سطح سختی: متوسط'
                    : 'سطح سختی: دشوار'
                }
              />
              <SimpleText
                onPress={() => {
                  props.onRemove(props.index - 1);
                }}
                style={{
                  color: vars.RED,
                  cursor: 'pointer',
                  ...styles.justifySelfEnd,
                }}
                text={commonTranslator.delete}
              />
            </PhoneView>
          </EqualTwoTextInputs>
        </PhoneView>
      )}
      {/* </Pressable> */}
      {detail && (
        <MyView
          style={{
            ...styles.width100,
            ...styles.padding10,
            ...styles.positionAbsolute,
            backgroundColor: vars.WHITE,
            ...styles.boxShadow,
            ...styles.borderRadius10,
            ...styles.marginTop50,
          }}>
          <SymbolsFace />
          <EqualTwoTextInputs
            style={{
              ...styles.gap15,
            }}>
            <JustBottomBorderTextInput
              text={Translate.count}
              onChangeText={text => changeText(text, setCount)}
              placeholder={Translate.count}
              subText={Translate.count}
              value={count}
              justNum={true}
            />
            <Pressable style={{...styles.alignSelfCenter}}>
              <PhoneView>
                <SimpleText
                  style={{...styles.colorOrangeRed, ...styles.alignSelfCenter}}
                  text={commonTranslator.delete}
                />
                <SimpleFontIcon
                  kind={'normal'}
                  icon={faTrash}
                  style={{...styles.colorOrangeRed}}
                />
              </PhoneView>
            </Pressable>
          </EqualTwoTextInputs>
          <PhoneView style={{...styles.gap15, ...styles.marginTop20}}>
            <SimpleText
              style={{...styles.BlueBold, ...styles.alignSelfCenter}}
              text={Translate.transBack}
            />
            <JustBottomBorderTextInput
              text={Translate.numberOfQuiz}
              onChangeText={text => changeText(text, setNumberOfQuiz)}
              placeholder={Translate.numberOfQuiz}
              subText={Translate.numberOfQuiz}
              value={numberOfQuiz}
              justNum={true}
            />
          </PhoneView>
        </MyView>
      )}
    </MyView>
  );
}

export default MakeQuizBox;
