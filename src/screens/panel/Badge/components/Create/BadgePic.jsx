import {useFilePicker} from 'use-file-picker';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {useEffect} from 'react';
import {PhoneView} from '../../../../../styles/Common';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';

function BadgePic(props) {
  const [openFileSelector, {filesContent}] = useFilePicker({
    maxFileSize: 1,
    accept: ['image/*'],
    readAs: 'DataURL',
    multiple: false,
  });

  useEffect(() => {
    if (filesContent && filesContent.length > 0 && filesContent[0])
      props.onChange(filesContent[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent]);

  return (
    <>
      <SimpleFontIcon
        onPress={() => openFileSelector()}
        kind={'normal'}
        icon={faPaperclip}
      />
      {props.img && <AttachBox filename={props.img} />}
      {filesContent !== undefined && filesContent.length > 0 && (
        <PhoneView style={{marginTop: 20}}>
          <AttachBox
            filename={filesContent[0].name}
            fileContent={filesContent[0].content}
          />
        </PhoneView>
      )}
    </>
  );
}

export default BadgePic;
