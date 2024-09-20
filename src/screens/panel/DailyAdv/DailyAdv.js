import React, {useEffect, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {useFilePicker} from 'use-file-picker';
import {fileRequest, generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {styles} from '../../../styles/Common/Styles';
import Card from './Card';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import JustBottomBorderDatePicker from '../../../styles/Common/JustBottomBorderDatePicker';
import {showError, showSuccess} from '../../../services/Utility';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';

function DailyAdv(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [advs, setAdvs] = useState();
  const [expireAt, setExpireAt] = useState();
  const [title, setTitle] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getAllDailyAdvs,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      setAdvs(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [openFileSelector, {filesContent, loading, clear}] = useFilePicker({
    maxFileSize: 25,
    accept: ['video/*'],
    readAs: 'DataURL',
    multiple: false,
  });

  return (
    <>
      <CommonWebBox header={'افزودن مورد جدید'}>
        <PhoneView style={{...styles.gap50}}>
          <PhoneView style={{...styles.alignItemsCenter}}>
            <SimpleText text={'فایل ویدیو تبلیغات'} />
            <SimpleFontIcon
              onPress={() => openFileSelector()}
              kind={'normal'}
              icon={faPaperclip}
            />
            {loading && <SimpleText text={'در حال بارگذاری فایل'} />}
            {filesContent && filesContent.length > 0 && (
              <SimpleText text={filesContent[0].name} />
            )}
          </PhoneView>
          <JustBottomBorderTextInput
            placeholder={'عنوان'}
            subText={'عنوان'}
            value={title}
            onChangeText={e => setTitle(e)}
          />
          <JustBottomBorderDatePicker
            value={expireAt}
            setter={setExpireAt}
            placeholder={'تاریخ انقضا'}
            subText={'تاریخ انقضا'}
          />
        </PhoneView>
        <CommonButton
          onPress={async () => {
            if (
              expireAt == undefined ||
              title === undefined ||
              title.length < 2 ||
              filesContent === undefined ||
              filesContent.length < 1
            ) {
              showError('لطفا تمام موارد را پر نمایید');
              return;
            }
            await fetch(filesContent[0].content)
              .then(res => res.blob())
              .then(async blob => {
                let formData = new FormData();
                formData.append('file', blob, filesContent[0].name);
                const params = new URLSearchParams();
                params.append('expireAt', expireAt);
                params.append('title', title);
                dispatch({loading: true});
                const res = await fileRequest(
                  routes.createDailyAdvs + params.toString(),
                  'post',
                  formData,
                  'data',
                  state.token,
                );
                dispatch({loading: false});
                if (res != null) {
                  showSuccess();
                  setAdvs([...advs, res]);
                  setTitle('');
                  clear();
                }
              });
          }}
          title={'ثبت'}
          theme={'dark'}
        />
      </CommonWebBox>
      <CommonWebBox header={'موارد افزوده شده'}>
        <PhoneView style={{...styles.gap100, ...{rowGap: '10px'}}}>
          {advs &&
            advs.map((e, index) => {
              return (
                <Card
                  url={e.path}
                  title={e.title}
                  expireAt={e.expireAt}
                  index={index + 1}
                  key={index}
                  onRemove={async () => {
                    dispatch({loading: true});
                    const res = await generalRequest(
                      routes.removeDailyAdvs + e.id,
                      'delete',
                      undefined,
                      undefined,
                      state.token,
                    );
                    dispatch({loading: false});
                    if (res !== null) {
                      setAdvs(advs.filter(itr => e.id !== itr.id));
                      showSuccess();
                    }
                  }}
                />
              );
            })}
        </PhoneView>
      </CommonWebBox>
    </>
  );
}

export default DailyAdv;
