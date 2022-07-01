import {CommonButton, PhoneView, SimpleText} from '../../styles/Common';
import {LargePopUp} from '../../styles/Common/PopUp';
import commonTranslator from '../../tranlates/Common';
import {useFilePicker} from 'use-file-picker';
import {fileRequest} from '../../API/Utility';
import React, {useState} from 'react';
import CopyBox from '../CopyBox';
import {SimpleFontIcon} from '../../styles/Common/FontIcon';
import {faFolder, faTrash} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import JustBottomBorderTextInput from '../../styles/Common/JustBottomBorderTextInput';
import vars from '../../styles/root';

const UploadFile = props => {
  const [isWorking, setIsWorking] = useState(false);
  const [urls, setUrls] = useState([]);
  const [canUpload, setCanUpload] = useState(true);
  const [finalMsg, setFinalMsg] = useState(undefined);

  const [openFileSelector, {filesContent, loading, errors, clear}] =
    useFilePicker({
      maxFileSize: props.maxFileSize,
      accept: props.accept,
      readAs: 'ArrayBuffer',
    });

  const doUpload = () => {
    if (!isWorking && filesContent.length === 1) {
      setIsWorking(true);

      let data = new FormData();
      var myblob = new Blob([new Uint8Array(filesContent[0].content)]);
      data.append('file', myblob, filesContent[0].name);

      Promise.all([
        fileRequest(props.url, 'post', data, props.expectedRes, props.token),
      ]).then(res => {
        if (res[0] !== null) {
          if (props.multi) {
            let urlsTmp = urls;
            urlsTmp.push({url: res[0], file: filesContent[0].name});
            setUrls(urlsTmp);
          } else {
            if (props.setResult !== undefined) props.setResult(res[0]);
            else setFinalMsg(commonTranslator.success);
            setCanUpload(false);
          }
        }

        clear();
        setIsWorking(false);
      });
    }
  };
  return (
    <LargePopUp
      toggleShowPopUp={props.toggleShow}
      btns={
        canUpload && (
          <CommonButton
            onPress={() => doUpload()}
            theme={'dark'}
            title={commonTranslator.confirmChanges}
          />
        )
      }
      title={props.title}>
      <PhoneView style={{marginBottom: 20}}>
        {canUpload && (
          <PhoneView>
            <JustBottomBorderTextInput
              style={{minWidth: 250}}
              disable={true}
              placeholder={
                filesContent.length > 0
                  ? filesContent[filesContent.length - 1].name
                  : commonTranslator.notChooseFile
              }
              subText={
                commonTranslator.maxSize +
                props.maxFileSize +
                '  مگابایت   - ' +
                commonTranslator.format +
                ' ' +
                props.accept
              }
            />
            <View style={{width: 40, height: 40, marginRight: 10}}>
              <SimpleFontIcon
                onPress={() => openFileSelector()}
                icon={faFolder}
              />
            </View>
            <View style={{width: 40, height: 40}}>
              <SimpleFontIcon
                onPress={() => clear()}
                style={{color: vars.ORANGE_RED}}
                icon={faTrash}
              />
            </View>
          </PhoneView>
        )}

        {errors.length > 0 &&
          errors[0].fileSizeTooSmall &&
          'File size is too small!'}
        {errors.length > 0 &&
          errors[0].fileSizeToolarge &&
          'File size is too large!'}
        {errors.length > 0 &&
          errors[0].readerError &&
          'Problem occured while reading file!'}
        {errors.length > 0 && errors[0].maxLimitExceeded && 'Too many files'}
        {errors.length > 0 &&
          errors[0].minLimitNotReached &&
          'Not enought files'}
      </PhoneView>
      {isWorking &&
        filesContent.map((file, index) => (
          <div key={index}>
            <SimpleText
              text={
                commonTranslator.uploading +
                ' ' +
                file.name +
                ' ' +
                commonTranslator.pleaseWait
              }
            />
          </div>
        ))}
      {props.multi &&
        urls.map((url, index) => (
          <div key={index}>
            <SimpleText
              text={commonTranslator.fileAdressFor + ' ' + url.file}
            />
            <CopyBox text={url.url} />
          </div>
        ))}

      {props.finalMsg !== undefined && <SimpleText text={props.finalMsg} />}
      {finalMsg !== undefined && <SimpleText text={finalMsg} />}
    </LargePopUp>
  );
};

export default UploadFile;
