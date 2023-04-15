import React, {useState} from 'react';
import {useParams} from 'react-router';
import {getDevice, showError} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import {verifyCert} from '../../panel/certificate/Utility';
import {dispatchStateContext} from '../../../App';

function CheckCert(props) {
  const params = useParams();
  const [certId, setCertId] = useState();
  const [NID, setNID] = useState();

  const isInPhone = getDevice().indexOf('WebPort') !== -1;
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    if (
      params.certId === undefined ||
      params.certId === null ||
      params.certId === '' ||
      params.NID === undefined ||
      params.NID === null ||
      params.NID === ''
    ) {
      navigate('/');
      return;
    }
    setCertId(params.certId);
    setNID(params.NID);
  }, [params, navigate]);

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
        <SimpleText text="برای اطمینان از اصالت گواهی ای که در دست دارید مراحل زیر را انجام دهید." />
        <SimpleText text="۱- اطمینان پیدا کنید که این آدرس با e.irysc.ir شروع می شود." />
        <SimpleText text="۲- گواهی را از طریق لینک زیر دانلود کنید." />
        <SimpleText text="۳- نسخه دانلود شده را با نسخه خودتان مطابقت دهید." />
        <CommonButton
          onPress={async () => {
            setLoading(true);
            let res = await verifyCert(certId, NID);

            if (!res) showError('گواهی مدنظر نامعتبر است');

            setLoading(false);
          }}
          title={'دانلود گواهی'}
          theme={'dark'}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default CheckCert;
