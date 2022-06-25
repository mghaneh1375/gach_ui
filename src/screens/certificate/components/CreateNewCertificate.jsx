import React from 'react';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {RadioButton} from 'react-native-paper';
import {PhoneView, SimpleText, BigBoldBlueText} from '../../../styles/Common';
import certTranslator from '../Translator';
import translator from '../../../tranlates/Common';

const CreateNewCertificate = () => {
  return (
    <>
      <BigBoldBlueText text={certTranslator.createNewCert} />
      <div style={{display: 'flex', flexDirection: 'row', margin: '15px 0px'}}>
        <JustBottomBorderTextInput placeholder={certTranslator.certName} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <SimpleText
            text={certTranslator.certType}
            style={{marginTop: 5, marginLeft: '10px'}}
          />
          <PhoneView>
            <SimpleText text={translator.vertical} style={{marginTop: 5}} />
            <RadioButton
            //   value={props.value}
            //   status={props.status}
            //   onPress={props.onPress}
            />
          </PhoneView>
          <PhoneView>
            <SimpleText text={translator.horizontal} style={{marginTop: 5}} />
            <RadioButton
            //   value={props.value}
            //   status={props.status}
            //   onPress={props.onPress}
            />
          </PhoneView>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', margin: '15px 0px'}}>
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
