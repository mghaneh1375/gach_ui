import {useFilePicker} from 'use-file-picker';
import {PhoneView, SimpleText} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import React from 'react';

export default function Excel({setFilesContent}) {
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['.xlsx', '.xlx'],
      readAs: 'ArrayBuffer',
      multiple: false,
    });

  const removeAttach = index => {
    remove(index);
  };

  React.useEffect(() => {
    setFilesContent(filesContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent]);

  return (
    <PhoneView style={{...styles.gap15}}>
      <SimpleText
        style={{...styles.alignSelfCenter, ...styles.BlueBold}}
        text={'فایل اکسل لیست دریافت کنندگان'}
      />
      <SimpleFontIcon
        onPress={() => openFileSelector()}
        kind={'normal'}
        icon={faPaperclip}
      />

      <PhoneView style={{marginTop: 20}}>
        {filesContent !== undefined &&
          filesContent.length > 0 &&
          filesContent.map((elem, index) => {
            return (
              <AttachBox
                key={index}
                filename={elem.name}
                fileContent={elem.content}
                removeAttach={() => {
                  removeAttach(index);
                }}
              />
            );
          })}
      </PhoneView>
    </PhoneView>
  );
}
