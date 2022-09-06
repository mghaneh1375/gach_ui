import React, {useState} from 'react';
import RadioButtonYesOrNo from '../../../../components/web/RadioButtonYesOrNo';
import {changeText} from '../../../../services/Utility';
import {CommonWebBox, MyView, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import certTranslator from '../Translator';

function Create(props) {
  const [certName, setCertName] = useState();
  const [qrSize, setQrSize] = useState();
  const [transverseDistance, setTransverseDistance] = useState();
  const [longitudinalDistance, setLongitudinalDistance] = useState();
  const [radioCert, setRadioCert] = useState();
  const [selectParameters, setSelectParameters] = useState();
  const [normalOrBold, setNormalOrBold] = useState();
  const [matchingWord, setMatchingWord] = useState();
  const [fromRightScreen, setFromRightScreen] = useState();
  const [fromTopScreen, setFromTopScreen] = useState();
  const [offset, setOffset] = useState();
  const [radioOffset, setRadioOffset] = useState();

  return (
    <MyView>
      <CommonWebBox header={certTranslator.createNewCert}>
        <PhoneView style={{...styles.gap15}}>
          <JustBottomBorderTextInput
            onChangeText={text => changeText(text, setCertName)}
            placeholder={certTranslator.certName}
            subText={certTranslator.certName}
            value={certName}
          />
          <RadioButtonYesOrNo
            label={certTranslator.certType}
            text1={certTranslator.vertical}
            text2={certTranslator.horizontal}
            selected={radioCert}
            setSelected={setRadioCert}
          />
        </PhoneView>
        <MyView>
          <PhoneView style={{...styles.gap15}}>
            <JustBottomBorderTextInput
              placeholder={certTranslator.qrSize}
              subText={certTranslator.qrSize}
              value={qrSize}
              onChangeText={text => changeText(text, setQrSize)}
            />
            <JustBottomBorderTextInput
              placeholder={certTranslator.transverseDistance}
              subText={certTranslator.transverseDistance}
              value={transverseDistance}
              onChangeText={text => changeText(text, setTransverseDistance)}
            />
            <JustBottomBorderTextInput
              placeholder={certTranslator.longitudinalDistance}
              subText={certTranslator.longitudinalDistance}
              value={longitudinalDistance}
              onChangeText={text => changeText(text, setLongitudinalDistance)}
            />
          </PhoneView>
        </MyView>
      </CommonWebBox>
      <CommonWebBox header={certTranslator.dynamicParameters}>
        <PhoneView style={{...styles.gap15}}>
          <JustBottomBorderTextInput
            placeholder={certTranslator.selectParameters}
            subText={certTranslator.selectParameters}
            value={selectParameters}
            onChangeText={text => changeText(text, setSelectParameters)}
          />
          <JustBottomBorderTextInput
            placeholder={certTranslator.normalOrBold}
            subText={certTranslator.normalOrBold}
            value={normalOrBold}
            onChangeText={text => changeText(text, setNormalOrBold)}
          />
          <JustBottomBorderTextInput
            placeholder={certTranslator.matchingWord}
            subText={certTranslator.matchingWord}
            value={matchingWord}
            onChangeText={text => changeText(text, setMatchingWord)}
          />
          <JustBottomBorderTextInput
            placeholder={certTranslator.fromRightScreen}
            subText={certTranslator.fromRightScreen}
            value={fromRightScreen}
            onChangeText={text => changeText(text, setFromRightScreen)}
          />
          <JustBottomBorderTextInput
            placeholder={certTranslator.fromTopScreen}
            subText={certTranslator.fromTopScreen}
            value={fromTopScreen}
            onChangeText={text => changeText(text, setFromTopScreen)}
          />
          <JustBottomBorderTextInput
            placeholder={certTranslator.selectParameters}
            subText={certTranslator.selectParameters}
            value={selectParameters}
            onChangeText={text => changeText(text, setSelectParameters)}
          />
          <RadioButtonYesOrNo
            text1={certTranslator.rightDistance}
            text2={certTranslator.center}
            text={certTranslator.rightDistance}
            selected={radioOffset}
            setSelected={setRadioOffset}
            textInput={true}
            inputText={certTranslator.offset}
            onChangeText={text => changeText(text, setOffset)}
            subText={certTranslator.offset}
            value={certTranslator.offset}
          />
        </PhoneView>
      </CommonWebBox>
    </MyView>
  );
}

export default Create;
