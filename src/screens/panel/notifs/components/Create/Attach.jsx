import {useFilePicker} from 'use-file-picker';
import {PhoneView, SimpleText} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import React from 'react';

export default function Attach({attaches, setFilesContent}) {
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['image/*', '.pdf', '.zip'],
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
        text={'پیوست'}
      />
      <SimpleFontIcon
        onPress={() => openFileSelector()}
        kind={'normal'}
        icon={faPaperclip}
      />

      <PhoneView style={{marginTop: 20}}>
        {attaches !== undefined &&
          attaches.map((elem, index) => {
            return <AttachBox key={index} filename={elem} />;
          })}

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
