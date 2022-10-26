import React, {useState} from 'react';
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {generalRequest} from '../../API/Utility';
import {CommonButton, MyView, PhoneView} from '../../styles/Common';
import {FontIcon} from '../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../translator/Common';
import UploadFile from './UploadFile';
import {showSuccess} from '../../services/Utility';
import {styles} from '../../styles/Common/Styles';

const ExcelComma = props => {
  const [codes, setCodes] = useState('');
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);
  const [additionalData, setAdditionalData] = useState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (
      isWorking ||
      props.newItems === undefined ||
      props.newItems === null ||
      props.newItems.length === 0
    )
      return;

    setIsWorking(true);
    let ids;
    if (codes == undefined) ids = [];
    else {
      ids = codes.replaceAll(' ', '');
      ids = ids.split(',');
      ids = ids.filter(n => n);
    }

    let removeDuplicates = props.newItems.filter(elem => {
      return ids.indexOf(elem) === -1;
    });

    let newArr = ids.concat(removeDuplicates);
    setCodes(newArr.join(','));

    props.setNewItems([]);
    setIsWorking(false);
  }, [codes, props, isWorking]);

  const toggleShowUploadPopUp = () => {
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

    showSuccess(res.excepts);
    setCodes('');
  };

  React.useEffect(() => {
    setAdditionalData(props.additionalData);
  }, [props.additionalData]);

  return (
    <MyView>
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
          helps={props.helps}
          mandatoryFields={props.mandatoryFields}
        />
      )}
      <PhoneView style={{gap: 15}}>{props.children}</PhoneView>
      <PhoneView>
        <MyView
          style={{
            width: '80%',
            height: 75,
            justifyContent: 'center',
          }}>
          <JustBottomBorderTextInput
            style={{minWidth: '80%'}}
            onChangeText={e => changeInput(e)}
            placeholder={props.placeholder}
            subText={props.help}
            value={codes}
          />
        </MyView>

        {props.onSearchClick !== undefined && (
          <FontIcon
            onPress={() => props.onSearchClick()}
            kind={'normal'}
            theme={'rect'}
            back={'orange'}
            parentStyle={{
              gap: 15,
              marginTop: 15,
              marginLeft: 10,
              marginRight: 15,
            }}
            icon={faSearch}
          />
        )}
        <FontIcon
          onPress={() => addItems()}
          kind={'normal'}
          theme={'rect'}
          back={'yellow'}
          parentStyle={{marginTop: 15}}
          icon={faPlus}
        />
      </PhoneView>
      <PhoneView style={styles.justifyContentEnd}>
        <CommonButton
          onPress={() => toggleShowUploadPopUp()}
          style={{marginRight: 20, marginTop: -5, alignSelf: 'center'}}
          title={commonTranslator.upload}
          theme={'dark'}
        />
      </PhoneView>
    </MyView>
  );
};

export default ExcelComma;
