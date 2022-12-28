import React, {useState} from 'react';
import {useParams} from 'react-router';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {getDevice} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import {downloadCert} from '../../panel/certificate/Utility';

function CheckCert(props) {
  const params = useParams();
  const [isWorking, setIsWorking] = useState(false);
  const [certId, setCertId] = useState();
  const [NID, setNID] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [res, setRes] = useState();

  const fetchData = React.useCallback(() => {
    if (isWorking || res !== undefined) return;

    if (params.certId === undefined) {
      props.navigate('/');
      return;
    }

    setIsWorking(true);
    dispatch({loading: true});

    Promise.all([
      generalRequest(
        routes.checkCert + params.certId,
        'get',
        undefined,
        'data',
        undefined,
      ),
    ]).then(r => {
      dispatch({loading: false});
      if (r[0] == null) {
        setRes('گواهی موردنظر نامعتبر است.');
        return;
      }

      setNID(r[0].NID);
      setCertId(r[0].certId);
      setRes(
        'گواهی موردنظر برای کدملی ' +
          r[0].NID +
          ' در تاریخ ' +
          r[0].issueAt +
          ' صادر شده است. برای مشاهده گواهی بر روی لینک زیر کلیک کنید.',
      );
    });
  }, [isWorking, res, props, params, dispatch]);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  React.useEffect(() => {
    fetchData();
  }, [params, fetchData]);

  return (
    <MyView>
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(https://e.irysc.com/assets/images/back3.png)',
        }}></div>

      <CommonWebBox
        width={isInPhone ? '100%' : '80%'}
        style={{...styles.alignSelfCenter}}
        header={'بررسی گواهی'}>
        {res !== undefined && (
          <MyView>
            <SimpleText text={res} />
            {NID !== undefined && certId !== undefined && (
              <CommonButton
                onPress={() => downloadCert(certId, NID)}
                theme={'transparent'}
                title={'دانلود'}
              />
            )}
          </MyView>
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default CheckCert;
