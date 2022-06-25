import React from 'react';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {RadioButton} from 'react-native-paper';
import {PhoneView, SimpleText, BigBoldBlueText} from '../../../styles/Common';
import certTranslator from '../Translator';
import translator from '../../../tranlates/Common';

const DynamicParameters = () => {
  return (
    <>
      <BigBoldBlueText text={certTranslator.dynamicParameters} />
      <div style={{display: 'flex', flexDirection: 'row', margin: '15px 0px'}}>
        <JustBottomBorderTextInput
          placeholder={certTranslator.selectParameters}
        />
        <JustBottomBorderTextInput
          subText={certTranslator.normalOrBold}
          placeholder={certTranslator.fontType}
        />
        <JustBottomBorderTextInput
          subText={certTranslator.matchingWord}
          placeholder={certTranslator.fontSize}
        />
        <JustBottomBorderTextInput
          subText={certTranslator.fromRightScreen}
          placeholder={certTranslator.transverseDistance}
        />
        <JustBottomBorderTextInput
          subText={certTranslator.fromTopScreen}
          placeholder={certTranslator.longitudinalDistance}
        />
        <PhoneView>
          <SimpleText text={translator.horizontal} style={{marginTop: 5}} />
          <RadioButton
          //   value={props.value}
          //   status={props.status}
          //   onPress={props.onPress}
          />
        </PhoneView>
        <JustBottomBorderTextInput
          subText={certTranslator.matchingWord}
          placeholder={certTranslator.fontSize}
        />
        <PhoneView>
          <SimpleText text={translator.horizontal} style={{marginTop: 5}} />
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
