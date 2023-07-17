import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {downloadRequest, generalRequest} from '../../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import RenderHTML from 'react-native-render-html';
import {
  answerTypes,
  convertSecToMinWithOutSec,
  convertTimestamp,
  getDevice,
  showSuccess,
  simpleConvertTimestamp,
  systemFonts,
  tagsStyles,
} from '../../../../services/Utility';
import Row from './Row';
import UploadFile from '../../../../components/web/UploadFile';

function DoHW(props) {
  const [hw, setHw] = useState();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const params = useParams();
  const [showUploadPane, setShowUploadPane] = useState(false);

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});

    Promise.all([
      generalRequest(
        routes.getMyHW + params.hwId,
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

      setHw(res[0]);
    });
  }, [dispatch, params, state.token, props]);

  useEffectOnce(() => {
    if (params.hwId === undefined) {
      props.navigate('/');
      return;
    }
    fetchData();
  });

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  return (
    <CommonWebBox
      header={hw !== undefined ? hw.title : ''}
      backBtn={true}
      onBackClick={() => props.navigate('/mySchool/hw')}>
      {showUploadPane && (
        <UploadFile
          url={routes.uploadHW + hw.id}
          expectedRes={'data'}
          token={state.token}
          maxFileSize={hw.maxUploadSize}
          accept={hw.validExt}
          toggleShow={() => setShowUploadPane(false)}
          title={'آپلود فایل پاسخ تمرین'}
          multi={false}
          setResult={res => {
            if (res) {
              showSuccess();
              setShowUploadPane(false);
              setHw(res);
            }
          }}
        />
      )}
      {hw !== undefined && (
        <>
          <RenderHTML
            source={{
              html: hw.desc,
            }}
            tagsStyles={tagsStyles}
            systemFonts={systemFonts}
          />

          {hw.attaches !== undefined &&
            hw.attaches.map((elem, index) => {
              return (
                <SimpleText
                  style={{
                    cursor: 'pointer',
                    color: '#0000EE',
                    textDecoration: 'underline',
                  }}
                  onPress={() => {
                    let tmp = elem.split('/');
                    downloadRequest(
                      elem,
                      undefined,
                      undefined,
                      undefined,
                      tmp[tmp.length - 1],
                    );
                  }}
                  text={'فایل ضمیمه ' + (index + 1)}
                />
              );
            })}

          <SimpleText
            text={'وضعیت تحویل تمرین'}
            style={{...styles.fontSize20, ...styles.textCenter}}
          />

          <MyView
            style={{
              ...styles.alignItemsCenter,
            }}>
            <MyView
              style={{
                ...styles.alignSelfCenter,
                ...{width: isInPhone ? '100%' : 700, borderWidth: 1},
              }}>
              <Row
                title={'وضعیت تحویل تمرین'}
                isInPhone={isInPhone}
                answer={
                  hw.uploadAt === undefined
                    ? 'تحویل داده نشده'
                    : 'تحویل داده شده'
                }
                silver={true}
              />
              <Row
                silver={false}
                isInPhone={isInPhone}
                title={'وضعیت نمره'}
                answer={
                  hw.mark === undefined ? 'نمره داده نشده' : hw.mark + ' / 100'
                }
              />

              <Row
                silver={true}
                isInPhone={isInPhone}
                title={'مهلت انجام تمرین'}
                answer={
                  'از ' +
                  simpleConvertTimestamp(hw.start) +
                  ' تا ' +
                  simpleConvertTimestamp(hw.end)
                }
              />

              <Row
                silver={false}
                isInPhone={isInPhone}
                title={'زمان باقی مانده'}
                answer={convertSecToMinWithOutSec(hw.reminder)}
              />

              <Row
                silver={true}
                isInPhone={isInPhone}
                title={'آخرین بارگذاری شما'}
                answer={
                  hw.uploadAt !== undefined ? hw.uploadAt : '1400/01/01 - 12:00'
                }
                style={hw.uploadAt === undefined ? {visibility: 'hidden'} : {}}
              />

              <Row
                silver={false}
                isInPhone={isInPhone}
                title={'فایل آپلود شده'}
                answer={
                  hw.filename !== undefined ? hw.filename : 'ssssssss.zip'
                }
                style={
                  hw.uploadAt === undefined
                    ? {visibility: 'hidden'}
                    : {
                        cursor: 'pointer',
                        color: '#0000ee',
                        textDecoration: 'underline',
                      }
                }
                onPress={
                  hw.uploadAt === undefined
                    ? undefined
                    : () =>
                        downloadRequest(
                          routes.downloadHW + hw.id,
                          undefined,
                          state.token,
                          undefined,
                          hw.filename,
                        )
                }
              />

              <Row
                silver={true}
                isInPhone={isInPhone}
                title={'فایل مجاز برای آپلود'}
                answer={
                  answerTypes.find(e => e.id === hw.answerType).item +
                  ' - حداکثر حجم: ' +
                  hw.maxUploadSize +
                  'MB'
                }
              />

              {hw.markDesc !== undefined && (
                <Row
                  silver={false}
                  isInPhone={isInPhone}
                  title={'توضیح مصحح'}
                  answer={hw.markDesc}
                />
              )}
            </MyView>
            {hw.delayEnd !== undefined && (
              <SimpleText
                style={{
                  ...styles.BlueBold,
                  ...styles.textCenter,
                  ...styles.margin30,
                  ...styles.red,
                }}
                text={
                  'این تمرین تا ' +
                  convertTimestamp(hw.delayEnd) +
                  ' با جریمه ' +
                  hw.delayPenalty +
                  ' درصد به ازای هر روز قابل تحویل است.'
                }
              />
            )}

            {hw.canUpload && (
              <CommonButton
                onPress={() => setShowUploadPane(true)}
                style={{...styles.justifyContentCenter}}
                title={'بارگذاری تمرین'}
                theme={'dark'}
              />
            )}
          </MyView>
          {hw.descAfter !== undefined && (
            <RenderHTML
              source={{
                html: hw.descAfter,
              }}
              tagsStyles={tagsStyles}
              systemFonts={systemFonts}
            />
          )}
        </>
      )}
    </CommonWebBox>
  );
}

export default DoHW;
