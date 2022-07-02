import {CommonButton, PhoneView, SimpleText} from '../styles/Common';
import {useState} from 'react';
import commonTranslator from '../tranlates/Common';

const CopyBox = props => {
  const [copying, setCopying] = useState(false);

  const doCopy = () => {
    navigator.clipboard.writeText(props.text);
    setCopying(true);
    setTimeout(function () {
      setCopying(false);
    }, 1300);
  };

  return (
    <PhoneView>
      <SimpleText
        style={{border: '1px solid', padding: 10}}
        text={props.text}
      />
      <CommonButton
        onPress={() => doCopy()}
        title={commonTranslator.copyLink}
      />
      {copying && (
        <SimpleText
          style={{alignSelf: 'center'}}
          text={commonTranslator.copied}
        />
      )}
    </PhoneView>
  );
};

export default CopyBox;
