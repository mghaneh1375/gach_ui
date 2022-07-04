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
  const [codes, setCodes] = useState('ads_23,ads_41');
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);

  const [result, setResult] = useState();

  const toggleShowUploadPopUp = () => {
    // if (!showUploadPopUp) setFinalMsg(undefined);
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

    props.setLoading(true);

    Promise.all([
      generalRequest(
        props.url,
        'put',
        {items: ids, ...props.additionalData},
        ['excepts', 'addedItems'],
        props.token,
        props.mandatoryFields,
      ),
    ])
      .then(res => {
        if (res[0] !== null) localAfterCallBack(res[0]);

        props.setLoading(false);
      })
      .catch(() => {
        props.setLoading(false);
      });
  };

  const localAfterCallBack = res => {
    props.afterAddingCallBack(res.addedItems);

    if (showUploadPopUp) setShowUploadPopUp(false);

    setResult(res.excepts);
  };

  return (
    <View style={{zIndex: 2}}>
      {showUploadPopUp && (
        <UploadFile
          toggleShow={toggleShowUploadPopUp}
          maxFileSize={2}
          accept={['.xls', '.xlsx']}
          multi={false}
          url={props.uploadUrl}
          token={props.token}
          expectedRes={['excepts', 'addedItems']}
          setResult={localAfterCallBack}
          title={props.popUpHeader}
          additionalData={props.additionalData}
          mandatoryFields={props.mandatoryFields}
        />
      )}

      <CommonWebBox
        header={props.header}
        btn={
          props.backFunc !== undefined && (
            <CommonButton
              onPress={() => props.backFunc()}
              title={commonTranslator.cancel}
            />
          )
        }
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
                  value={codes}
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
            {result !== undefined && (
              <SimpleText style={{marginTop: 20}} text={result} />
            )}
          </View>
        }
      />
    </View>
  );
};

export default ExcelComma;
