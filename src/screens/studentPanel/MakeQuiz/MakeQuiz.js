import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {changeText} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import MakeQuizBox from './MakeQuizBox';
import SymbolsFace from './SymbolsFace';
import Translate from './Translate';

function MakeQuiz(props) {
  const [count, setCount] = useState();
  const [line, setLine] = useState();
  return (
    <MyView>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        header={Translate.makeQuiz}
      />
      <CommonWebBox rowId={1} header={Translate.chooseAndAdd}>
        <PhoneView style={{...styles.gap15}}>
          <JustBottomBorderTextInput
            text={Translate.line}
            onChangeText={text => changeText(text, setLine)}
            placeholder={Translate.line}
            subText={Translate.line}
            value={line}
          />
          <JustBottomBorderTextInput
            text={Translate.count}
            onChangeText={text => changeText(text, setCount)}
            placeholder={Translate.count}
            subText={Translate.count}
            value={count}
            justNum={true}
          />
          <PhoneView>
            <SimpleText
              text={Translate.difficulty}
              style={{...styles.alignSelfCenter}}
            />
            {/* componnent symbol */}
            <SymbolsFace />
          </PhoneView>
          <CommonButton
            icon={faPlus}
            style={{...styles.justifySelfCenter}}
            padding={'unset'}
          />
        </PhoneView>
      </CommonWebBox>
      <CommonWebBox rowId={2} header={Translate.sortQuiz}>
        <MakeQuizBox
          width={290}
          theme={vars.ORANGE}
          header={'سوالات آزمون شیمی'}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default MakeQuiz;
