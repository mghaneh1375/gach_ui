import {
  faPaperclip,
  faPlus,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import RadioButtonYesOrNo from '../../../../components/web/RadioButtonYesOrNo';
import {
  changeText,
  showError,
  trueFalseValues,
} from '../../../../services/Utility';
import {
  CommonButton,
  CommonRadioButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import AttachBox from '../../ticket/components/Show/AttachBox/AttachBox';
import Translate from '../Translator';
import columns from './TableStructure';
import {useFilePicker} from 'use-file-picker';
import {addCertificate} from '../Utility';
import NextButtons from '../components/NextButtons';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import QuizGeneralInfo from '../../quiz/components/Create/QuizGeneralInfo';
import {fileRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

function Create(props) {
  const [certName, setCertName] = useState();
  const [qrSize, setQrSize] = useState();
  const [qrHorizontalDistance, setQrHorizontalDistance] = useState();
  const [qrVerticalDistance, setQrVerticalDistance] = useState();
  const [isLandscape, setIsLandscape] = useState(true);
  const [paramName, setParamName] = useState();
  const [fontSize, setFontSize] = useState();
  const [isBold, setIsBold] = useState(true);
  const [fromRightScreen, setFromRightScreen] = useState();
  const [fromTopScreen, setFromTopScreen] = useState();
  const [offset, setOffset] = useState();
  const [isCenter, setIsCenter] = useState(true);
  const [xMode, setXMode] = useState('fromRight');
  const [tableData, setTableData] = useState([]);

  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['image/*'],
      readAs: 'DataURL',
      multiple: false,
    });

  const removeAttach = index => {
    remove(index);
  };
  const clearData = React.useCallback(() => {
    setParamName('');
    setFontSize('');
    setIsBold(false);
    setFromRightScreen('');
    setFromTopScreen('');
    setOffset('');
    setIsCenter('');
    setXMode('fromRight');
  }, []);

  const addToData = React.useCallback(() => {
    if (
      ((fontSize === undefined || fontSize.length === '') &&
        paramName === undefined) ||
      (paramName.length === '' && fromTopScreen === undefined)
    ) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    if (
      xMode === 'fromRight' &&
      (fromRightScreen === undefined || fromRightScreen === '')
    ) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    if (xMode !== 'fromRight' && (offset === undefined || offset === ''))
      setOffset(0);

    let data = {
      fontSize: fontSize,
      paramName: paramName,
      isBold: isBold,
      fromRightScreen: fromRightScreen,
      fromTopScreen: fromTopScreen,
      offset: offset,
      isCenter: isCenter,
      xMode: xMode,
    };

    clearData();

    let tableDataTmp = [];

    tableDataTmp.push(data);
    tableData.forEach(elem => {
      tableDataTmp.push(elem);
    });

    setTableData(tableDataTmp);
  }, [
    paramName,
    offset,
    isBold,
    xMode,
    isCenter,
    fromRightScreen,
    fromTopScreen,
    fontSize,
    tableData,
    clearData,
  ]);

  return (
    <MyView>
      <CommonWebBox
        header={Translate.createNewCert}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView style={{...styles.gap15}}>
          <JustBottomBorderTextInput
            onChangeText={text => changeText(text, setCertName)}
            placeholder={Translate.certName}
            subText={Translate.certName}
            value={certName}
          />
          <SimpleText
            style={{...styles.alignSelfCenter}}
            text={Translate.certType}
          />
          <CommonRadioButton
            status={isLandscape === true ? 'checked' : 'unchecked'}
            onPress={() => setIsLandscape(true)}
            text={Translate.vertical}
          />
          <CommonRadioButton
            status={isLandscape === false ? 'checked' : 'unchecked'}
            onPress={() => setIsLandscape(false)}
            text={Translate.horizontal}
          />
        </PhoneView>
        <MyView>
          <PhoneView style={{...styles.gap15}}>
            <JustBottomBorderTextInput
              placeholder={Translate.qrSize}
              subText={Translate.qrSize}
              value={qrSize}
              onChangeText={text => changeText(text, setQrSize)}
            />
            <JustBottomBorderTextInput
              placeholder={Translate.horizontalDistance}
              subText={Translate.horizontalDistance}
              value={qrHorizontalDistance}
              justNum={true}
              onChangeText={text => changeText(text, setQrHorizontalDistance)}
            />
            <JustBottomBorderTextInput
              placeholder={Translate.verticalDistance}
              subText={Translate.verticalDistance}
              value={qrVerticalDistance}
              justNum={true}
              onChangeText={text => changeText(text, setQrVerticalDistance)}
            />
          </PhoneView>
        </MyView>
      </CommonWebBox>
      <CommonWebBox header={Translate.dynamicParameters}>
        <PhoneView style={{...styles.gap15}}>
          <CommonRadioButton
            status={xMode === 'fromRight' ? 'checked' : 'unchecked'}
            onPress={() => setXMode('fromRight')}
            text={Translate.rightDistance}
          />
          <CommonRadioButton
            status={xMode === 'center' ? 'checked' : 'unchecked'}
            onPress={() => setXMode('center')}
            text={Translate.center}
          />
          <JustBottomBorderTextInput
            placeholder={Translate.paramName}
            subText={Translate.paramName}
            value={paramName}
            onChangeText={text => changeText(text, setParamName)}
          />
          <JustBottomBorderSelect
            placeholder={Translate.isBold}
            subText={Translate.normalOrBold}
            value={trueFalseValues.find(elem => elem.id === isBold)}
            values={trueFalseValues}
            setter={setIsBold}
          />
          <JustBottomBorderTextInput
            placeholder={Translate.fontSize}
            subText={Translate.matchingWord}
            value={fontSize}
            onChangeText={text => changeText(text, setFontSize)}
          />
          {xMode === 'fromRight' && (
            <JustBottomBorderTextInput
              placeholder={Translate.horizontalDistance}
              subText={Translate.fromRightScreen}
              value={fromRightScreen}
              onChangeText={text => changeText(text, setFromRightScreen)}
            />
          )}

          <JustBottomBorderTextInput
            placeholder={Translate.verticalDistance}
            subText={Translate.fromTopScreen}
            value={fromTopScreen}
            onChangeText={text => changeText(text, setFromTopScreen)}
          />

          {xMode === 'center' && (
            <JustBottomBorderTextInput
              onChangeText={props.onChangeText}
              justNum={true}
              placeholder={Translate.offset}
              subText={Translate.offset}
              value={props.offset}
              setOffset={props.setOffset}
            />
          )}
        </PhoneView>
        <MyView style={{...styles.alignItemsEnd}}>
          <PhoneView style={{...styles.gap15}}>
            <FontIcon
              theme="rect"
              type={'rect'}
              kind={'normal'}
              icon={faRotateRight}
              onPress={() => clearData()}
            />
            <FontIcon
              theme="rect"
              type={'rect'}
              kind={'normal'}
              back={'yellow'}
              onPress={() => addToData()}
              icon={faPlus}
            />
          </PhoneView>
        </MyView>
        <CommonDataTable
          onRowSelect={selectedRows => {}}
          columns={columns}
          data={tableData}
          groupOps={[]}
        />
      </CommonWebBox>
      <CommonWebBox>
        <PhoneView style={{...styles.gap15}}>
          <SimpleText
            style={{...styles.alignSelfCenter, ...styles.BlueBold}}
            text={Translate.selectFiles}
          />
          <SimpleFontIcon
            onPress={() => openFileSelector()}
            kind={'normal'}
            icon={faPaperclip}
          />
          {filesContent !== undefined && filesContent.length > 0 && (
            <PhoneView style={{marginTop: 20}}>
              {filesContent.map((file, index) => {
                return (
                  <AttachBox
                    filename={file.name}
                    fileContent={file.content}
                    removeAttach={removeAttach}
                  />
                );
              })}
            </PhoneView>
          )}
        </PhoneView>
      </CommonWebBox>
      <NextButtons
        onNext={async () => {
          //   props.setLoading(true);
          if (
            tableData === undefined ||
            tableData.length === 0 ||
            filesContent === undefined ||
            filesContent.length === 0
          ) {
            showError(commonTranslator.pleaseFillAllFields);
            return;
          }

          let data = {
            title: certName,
            isLandscape: isLandscape,
            qrX: qrHorizontalDistance,
            qrY: qrVerticalDistance,
            qrSize: qrSize,
            params: tableData.map(elem => {
              elem.isCenter = undefined;
              elem.title = elem.paramName;
              elem.y = elem.fromTopScreen;
              if (elem.xMode === 'fromRight') {
                elem.x = elem.fromRightScreen;
              } else {
                elem.isCenter = true;
                elem.centerOffset = elem.offset;
              }

              elem.paramName = undefined;
              elem.xMode = undefined;
              elem.offset = undefined;
              elem.fromRightScreen = undefined;
              elem.fromTopScreen = undefined;
              return elem;
            }),
          };

          let res = await addCertificate(data, props.token);
          if (res !== null) {
            data.id = res;

            let formData = new FormData();
            var myblob = new Blob([new Uint8Array(filesContent[0].content)]);
            formData.append('file', myblob, filesContent[0].name);

            res = await fileRequest(
              routes.setCertificateImg + res,
              'put',
              formData,
              'url',
              props.token,
            );

            if (res !== null) {
              data.img = res;

              props.addItem(data);
              props.setMode('list');
            }
          }

          //   props.setLoading(false);
          //   props.addItem(res);
          //   props.setMode('list');
        }}
      />
    </MyView>
  );
}

export default Create;