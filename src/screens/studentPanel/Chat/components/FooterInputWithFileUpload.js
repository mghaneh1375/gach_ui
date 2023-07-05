import React, {useState, useEffect, useRef} from 'react';

import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {
  faEnvelope,
  faPaperclip,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {PhoneView} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';

function FooterInputWithFileUpload(props) {
  const inputRef = useRef(null);

  const [answer, setAnswer] = useState('');
  const [file, setFile] = useState({
    code: Math.floor(Math.random() * 10000),
    name: '',
    url: null,
    file: null,
  });

  const doDeleteFile = () => {
    inputRef.current.value = null;
    setFile({...file, name: '', url: null, file: null});
  };

  const handleUploadFile = e => {
    let uFile = e.target.files[0];

    file.file = uFile;
    file.name = uFile.name;
    file.url = URL.createObjectURL(uFile);

    props.onFileChange(file);

    if (props.removeFileAfterOnChage) {
      doDeleteFile();
    } else {
      setFile({...file});
    }
  };

  const handleSubmit = () => {
    props.onSubmit(answer, file.file);
  };

  useEffect(() => {
    if (props.removeText) {
      setAnswer('');
    }
  }, [props.removeText]);

  return (
    <div className="footer" style={{flexDirection: 'column'}}>
      <div className="protestTextDiv" style={{width: '100%'}}>
        <PhoneView style={{...styles.gap7}}>
          <div className="circlePic">
            <img src={props.userPic} alt="img" />
          </div>
          <div style={{width: 'calc(100% - 170px)'}}>
            <JustBottomBorderTextInput
              placeholder={props.text}
              subText={props.text}
              value={answer}
              onEnter={() => handleSubmit()}
              onChangeText={e => setAnswer(e)}
            />
          </div>
          <PhoneView style={{...styles.alignItemsCenter, ...styles.gap10}}>
            {props.getFile && (
              <>
                <label htmlFor="file_input_footer" className="attachFileIcon">
                  <FontIcon
                    icon={faPaperclip}
                    kind={'normal'}
                    theme={'rect'}
                    back={'yellow'}
                  />
                </label>
                <input
                  id="file_input_footer"
                  type="file"
                  ref={inputRef}
                  className="hidden"
                  onChange={handleUploadFile}
                />
              </>
            )}
            <FontIcon
              kind={'normal'}
              theme={'rect'}
              back={'blue'}
              icon={faPaperPlane}
              onPress={() => handleSubmit()}
            />
          </PhoneView>
        </PhoneView>

        {/* {props.showVoiceRecorder && (
          <VoiceRecorder
            className="voiceInFooter width35"
            classAfterRecord="fullLeftVoice"
            label={props.voiceLabel}
            audio={props.audio}
            getVoice={props.getVoice}
            showInput={props.showVoiceInput}
          />
        )} */}
      </div>

      <div className={`d-flex align-items-center row`}></div>
    </div>
  );
}

FooterInputWithFileUpload.defaultProps = {
  text: 'پاسخ شما',
  userPic: '',
  inputLabel: null,
  voiceLabel: 'ضبط صدا',
  getFile: true,
  showUploadFileText: true,

  showVoiceRecorder: false,
  showVoiceInput: false,

  onSubmit: (text, file) => {},
  onFileChange: file => {},
  getVoice: file => {},

  removeText: null,
  removeFileAfterOnChage: false,
  submitWithEnter: false,
};

export default FooterInputWithFileUpload;
