import {CommonButton, PhoneView, SimpleText} from '../styles/Common';
import {useState} from 'react';
import commonTranslator from '../translator/Common';

const CopyBox = props => {
  const [copying, setCopying] = useState(false);

  const doCopy = () => {
    navigator.clipboard.writeText(props.url);
    setCopying(true);
    setTimeout(function () {
      setCopying(false);
    }, 1300);
  };

  return (
    <PhoneView style={{height: 'max-content', alignSelf: 'flex-end'}}>
      {/* <SimpleText
        style={{border: '1px solid', padding: 10}}
        text={props.text}
      /> */}
      <CommonButton
        onPress={() => doCopy()}
        title={commonTranslator.copyLink}
      />
      {copying && (
        <SimpleText
          style={{
            width: 50,
            position: 'absolute',
            left: 'calc(50% - 25px)',
            top: -20,
          }}
          text={commonTranslator.copied}
        />
      )}
    </PhoneView>
  );
};

export default CopyBox;
