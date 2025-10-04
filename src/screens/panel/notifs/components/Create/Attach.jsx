import {useFilePicker} from 'use-file-picker';
import {PhoneView, SimpleText, SimpleFontIcon} from '@/styles';
import AttachBox from '../../../ticket/components/show/attachBox/AttachBox.jsx';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {styles} from '@/styles/common/styles';
import React from 'react';
export default function Attach({setFilesContent}) {
  const [openFileSelector, {filesContent, clear}] = useFilePicker({
    maxFileSize: 6,
    accept: ['image/*', '.pdf', '.zip'],
    readAs: 'DataURL',
    multiple: false,
  });
  const removeAttach = () => {
    clear();
  };
  React.useEffect(() => {
    setFilesContent(filesContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent]);
  return (
    <PhoneView
      style={{
        ...styles.gap15,
      }}>
      <SimpleText
        style={{
          ...styles.alignSelfCenter,
          ...styles.BlueBold,
        }}
        text={'پیوست'}
      />
      <SimpleFontIcon
        onPress={() => openFileSelector()}
        kind={'normal'}
        icon={faPaperclip}
      />

      <PhoneView
        style={{
          marginTop: 20,
        }}>
        {/* {attaches &&
          attaches.map((elem, index) => {
            return <AttachBox key={index} filename={elem} />;
          })} */}

        {filesContent &&
          filesContent.length > 0 &&
          filesContent.map((elem, index) => {
            return (
              <AttachBox
                key={index}
                filename={elem.name}
                fileContent={elem.content}
                removeAttach={removeAttach}
              />
            );
          })}
      </PhoneView>
    </PhoneView>
  );
}
