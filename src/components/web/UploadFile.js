import {CommonButton, PhoneView, SimpleText} from '../../styles/Common';
import {LargePopUp} from '../../styles/Common/PopUp';
import commonTranslator from '../../tranlates/Common';
import {useFilePicker} from 'use-file-picker';
import {fileRequest} from '../../API/Utility';
import React, {useState} from 'react';
import CopyBox from '../CopyBox';

const UploadFile = props => {
  const [isWorking, setIsWorking] = useState(false);
  const [urls, setUrls] = useState([]);
  const [canUpload, setCanUpload] = useState(true);

  const [openFileSelector, {filesContent, loading, errors, clear}] =
    useFilePicker({
      maxFileSize: props.maxFileSize,
      accept: props.accept,
      readAs: 'ArrayBuffer',
    });

  React.useEffect(() => {
    if (!isWorking && filesContent.length === 1) {
      setIsWorking(true);

      let data = new FormData();
      var myblob = new Blob([new Uint8Array(filesContent[0].content)]);
      data.append('file', myblob, filesContent[0].name);

      console.log(myblob);

      Promise.all([
        fileRequest(props.url, 'post', data, props.expectedRes, props.token),
      ]).then(res => {
        if (res[0] !== null) {
          if (props.multi) {
            let urlsTmp = urls;
            urlsTmp.push({url: res[0], file: filesContent[0].name});
            setUrls(urlsTmp);
          } else {
            props.setResult(res[0]);
            setCanUpload(false);
          }
        }

        clear();
        setIsWorking(false);
      });
      // });
    }
  }, [filesContent, isWorking, props, urls, clear]);

  return (
    <LargePopUp
      toggleShowPopUp={props.toggleShow}
      btns={
        <CommonButton
          onPress={() => props.toggleShow()}
          theme={'dark'}
          title={commonTranslator.confirm}
        />
      }
      title={props.title}>
      <PhoneView>
        {canUpload && (
          <CommonButton
            theme={'dark'}
            title={commonTranslator.chooseFile}
            onPress={() => openFileSelector()}
          />
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
    </LargePopUp>
  );
};

export default UploadFile;
