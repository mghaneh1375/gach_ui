import {useEffect, useState} from 'react';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import AttachBox from '../../ticket/components/show/attachBox/AttachBox.jsx';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import {fileRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import {showError} from '@/services/utility';
function Create(props) {
  const [title, setTitle] = useState();
  const [openFileSelector, {filesContent}] = useFilePicker({
    maxFileSize: 1,
    accept: ['image/*'],
    readAs: 'DataURL',
    multiple: false,
  });
  useEffect(() => {
    if (props.selectedLevel !== undefined) {
      setTitle(props.selectedLevel.title);
    }
  }, [props.selectedLevel]);
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={'ایجاد سطح جدید'}>
      <MyView
        style={{
          gap: '20px',
        }}>
        <PhoneView>
          <JustBottomBorderTextInput
            value={title}
            onChangeText={e => setTitle(e)}
            placeholder={'عنوان'}
          />
        </PhoneView>
        <PhoneView>
          <SimpleFontIcon
            onPress={() => openFileSelector()}
            kind={'normal'}
            icon={faPaperclip}
          />
          {props.selectedLevel?.icon && (
            <AttachBox filename={props.selectedLevel.icon} />
          )}
          {filesContent !== undefined && filesContent.length > 0 && (
            <PhoneView
              style={{
                marginTop: 20,
              }}>
              <AttachBox
                filename={filesContent[0].name}
                fileContent={filesContent[0].content}
              />
            </PhoneView>
          )}
        </PhoneView>
        <CommonButton
          title={'تایید'}
          theme={'dark'}
          onPress={async () => {
            if (title === undefined) {
              showError('لطفا عنوان را وارد نمایید');
              return;
            }
            if (
              props.selectedLevel === undefined &&
              (filesContent === undefined ||
                filesContent.length === 0 ||
                filesContent[0] === undefined ||
                filesContent[0] === null)
            ) {
              showError('لطفا آیکون مربوط به سطح را آپلود نمایید');
              return;
            }
            const formData = new FormData();
            if (
              filesContent !== undefined &&
              filesContent.length > 0 &&
              filesContent[0] !== undefined &&
              filesContent[0] !== null
            ) {
              const icon = await fetch(filesContent[0].content).then(res =>
                res.blob(),
              );
              formData.append('file', icon, filesContent[0].name);
            }
            formData.append(
              'data',
              JSON.stringify({
                title: title,
              }),
            );
            let res;
            if (props.selectedLevel === undefined) {
              res = await fileRequest(
                routes.storePackageLevel,
                'post',
                formData,
                'data',
                props.token,
              );
            } else {
              res = await fileRequest(
                routes.updatePackageLevel + props.selectedLevel.id,
                'post',
                formData,
                'data',
                props.token,
              );
            }
            if (res !== null) {
              props.setMode('list');
            }
          }}
        />
      </MyView>
    </CommonWebBox>
  );
}
export default Create;
