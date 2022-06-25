import React from 'react';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {RadioButton} from 'react-native-paper';
import {PhoneView, SimpleText, BigBoldBlueText} from '../../../styles/Common';
import certTranslator from '../Translator';
import translator from '../../../tranlates/Common';
import './Style.css';

const CreateNewCertificate = () => {
  return (
    <>
      <BigBoldBlueText text={certTranslator.createNewCert} />
      <div className="rowContaine">
        <JustBottomBorderTextInput placeholder={certTranslator.certName} />
        <div className="container">
          <SimpleText
            text={certTranslator.certType}
            style={{marginTop: '5px', marginLeft: '10px'}}
          />
          <PhoneView>
            <SimpleText text={translator.vertical} style={{marginTop: '5px'}} />
            <RadioButton
            //   value={props.value}
            //   status={props.status}
            //   onPress={props.onPress}
            />
          </PhoneView>
          <PhoneView>
            <SimpleText
              text={translator.horizontal}
              style={{marginTop: '5px'}}
            />
            <RadioButton
            //   value={props.value}
            //   status={props.status}
            //   onPress={props.onPress}
            />
          </PhoneView>
        </div>
      </div>
      <div className="container2">
        <JustBottomBorderTextInput placeholder={certTranslator.qrSize} />
        <JustBottomBorderTextInput
          subText={certTranslator.fromRightScreen}
          placeholder={certTranslator.transverseDistance}
        />
        <JustBottomBorderTextInput
          subText={certTranslator.fromTopScreen}
          placeholder={certTranslator.longitudinalDistance}
        />
      </div>
    </>
  );
};

export default CreateNewCertificate;
