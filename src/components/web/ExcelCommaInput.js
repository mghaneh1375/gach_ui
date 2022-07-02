import {useState} from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {generalRequest} from '../../API/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../styles/Common';
import {FontIcon} from '../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../styles/Common/JustBottomBorderTextInput';
import vars from '../../styles/root';
import commonTranslator from '../../tranlates/Common';
import UploadFile from './UploadFile';

const ExcelComma = props => {
  const [codes, setCodes] = useState();
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);

  const [result, setResult] = useState();
  const [finalMsg, setFinalMsg] = useState();

  const toggleShowUploadPopUp = () => {
    if (!showUploadPopUp) setFinalMsg(undefined);
    setShowUploadPopUp(!showUploadPopUp);
  };

  const changeInput = text => {
    setCodes(text);
  };

  const addItems = () => {
    if (codes === undefined || codes.length === 0) return;

    let ids = codes.replaceAll(' ', '');
    ids = ids.split(',');
    ids = ids.filter(n => n);
    let allIds = [];
    ids.forEach(element => {
      allIds.push({
        id: element,
      });
    });

    props.setLoading(true);

    Promise.all([
      generalRequest(props.url, 'put', {items: allIds}, 'excepts', props.token),
    ]).then(res => {
      if (res[0] !== null) {
        setResult(res[0]);
        props.afterAddingCallBack();
      } else {
        props.setLoading(false);
      }
    });
  };

  const afterUploadingCallBack = result => {
    props.afterAddingCallBack();
    setFinalMsg(result);
  };

  return (
    <View>
      {showUploadPopUp && (
        <UploadFile
          toggleShow={toggleShowUploadPopUp}
          maxFileSize={2}
          accept={['.xls', '.xlsx']}
          multi={false}
          url={props.uploadUrl}
          token={props.token}
          expectedRes={'excepts'}
          setResult={afterUploadingCallBack}
          finalMsg={finalMsg}
          title={props.popUpHeader}
        />
      )}
      <CommonWebBox
        header={props.header}
        child={
          <View>
            {props.preChild}
            <PhoneView>
              <View style={{width: '80%'}}>
                <JustBottomBorderTextInput
                  style={{minWidth: '95%'}}
                  onChangeText={e => changeInput(e)}
                  placeholder={props.placeholder}
                  subText={props.help}
                />
              </View>
              <View style={{width: 30, height: 30, alignSelf: 'center'}}>
                <FontIcon
                  onPress={() => addItems()}
                  parentStyle={{borderRadius: 7, backgroundColor: vars.YELLOW}}
                  icon={faPlus}
                />
              </View>
              <CommonButton
                onPress={() => toggleShowUploadPopUp()}
                title={commonTranslator.upload}
                theme={'dark'}
              />
            </PhoneView>
            {result !== undefined && <SimpleText text={result} />}
          </View>
        }
      />
    </View>
  );
};

export default ExcelComma;
