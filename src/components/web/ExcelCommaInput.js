import React, {useState} from 'react';
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
  const [additionalData, setAdditionalData] = useState();
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
        ['excepts', 'doneIds'],
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
    props.afterAddingCallBack(res.doneIds);

    if (showUploadPopUp) setShowUploadPopUp(false);

    setResult(res.excepts);
  };

  React.useEffect(() => {
    setAdditionalData(props.additionalData);
  }, [props.additionalData]);

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
          expectedRes={['excepts', 'doneIds']}
          setResult={localAfterCallBack}
          title={props.popUpHeader}
          additionalData={additionalData}
          mandatoryFields={props.mandatoryFields}
        />
      )}

      <PhoneView>
        <View
          style={{
            width: '80%',
            height: 75,
            justifyContent: 'center',
            marginRight: 20,
          }}>
          <JustBottomBorderTextInput
            style={{minWidth: '95%'}}
            onChangeText={e => changeInput(e)}
            placeholder={props.placeholder}
            subText={props.help}
            value={codes}
          />
        </View>

        <FontIcon
          onPress={() => addItems()}
          kind={'normal'}
          theme={'rect'}
          back={vars.YELLOW}
          parentStyle={{marginTop: -15}}
          icon={faPlus}
        />
        <CommonButton
          onPress={() => toggleShowUploadPopUp()}
          style={{marginRight: 20, marginTop: -5, alignSelf: 'center'}}
          title={commonTranslator.upload}
          theme={'dark'}
        />
      </PhoneView>
      {result !== undefined && (
        <SimpleText style={{marginTop: 20}} text={result} />
      )}
    </View>
  );
};

export default ExcelComma;
