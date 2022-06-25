import React from 'react';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {RadioButton} from 'react-native-paper';
import {PhoneView, SimpleText, BigBoldBlueText} from '../../../styles/Common';
import certTranslator from '../Translator';
import translator from '../../../tranlates/Common';
import './Style.css';

const DynamicParameters = () => {
  return (
    <>
      <BigBoldBlueText text={certTranslator.dynamicParameters} />
      <div className="rowContaine">
        <JustBottomBorderTextInput
          placeholder={certTranslator.selectParameters}
        />
        <JustBottomBorderTextInput
          style={{width: '100px', marginLeft: '10px'}}
          subText={certTranslator.normalOrBold}
          placeholder={certTranslator.fontType}
        />
        <JustBottomBorderTextInput
          style={{width: '100px', marginLeft: '10px'}}
          subText={certTranslator.matchingWord}
          placeholder={certTranslator.fontSize}
        />
        <JustBottomBorderTextInput
          style={{width: '100px', marginLeft: '10px'}}
          subText={certTranslator.fromRightScreen}
          placeholder={certTranslator.transverseDistance}
        />
        <JustBottomBorderTextInput
          style={{width: '100px', marginLeft: '10px'}}
          subText={certTranslator.fromTopScreen}
          placeholder={certTranslator.longitudinalDistance}
        />
        <PhoneView>
          <SimpleText
            text={certTranslator.rightDistance}
            style={{marginTop: '5px'}}
          />
          <RadioButton
          //   value={props.value}
          //   status={props.status}
          //   onPress={props.onPress}
          />
        </PhoneView>
        <JustBottomBorderTextInput
          style={{width: '100px', marginLeft: '10px'}}
          subText={certTranslator.rightDistance}
          placeholder={certTranslator.offset}
        />
        <PhoneView>
          <SimpleText text={translator.center} style={{marginTop: '5px'}} />
          <RadioButton
          //   value={props.value}
          //   status={props.status}
          //   onPress={props.onPress}
          />
        </PhoneView>
      </div>
    </>
  );
};

export default DynamicParameters;
