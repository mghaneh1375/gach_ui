import {faDownload} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
import {globalStateContext, dispatchStateContext} from '@/App';
import {getDevice} from '../../../services/utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
} from '../../../styles/CommonComponents.jsx';
import CommonDataTable from '../../../styles/common/CommonDataTable';
import {SimpleFontIcon} from '../../../styles/common/FontIcon';
import JustBottomBorderTextInput from '../../../styles/common/JustBottomBorderTextInput';
import {styles} from '../../../styles/common/styles';
import {downloadCert} from '../../panel/certificate/utility';
import commonTranslator from '../../../translator/common';
function MyCerts(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [NID, setNID] = useState();
  const [NIDTmp, setNIDTmp] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [certs, setCerts] = useState();
  const columns = [
    {
      name: 'عملیات',
      cell: (row, index, column, id) => {
        return (
          <SimpleFontIcon
            kind={'med'}
            onPress={async () => {
              dispatch({
                loading: true,
              });
              await downloadCert(certs[index].id, NID);
              dispatch({
                loading: false,
              });
            }}
            icon={faDownload}
          />
        );
      },
      minWidth: '100px',
      maxWidth: '100px',
      center: true,
    },
    {
      name: 'عنوان گواهی',
      selector: row => row.title,
      grow: 3,
      center: true,
    },
    {
      name: 'زمان صدور',
      selector: row => row.createdAt,
      grow: 3,
      center: true,
    },
  ];
  React.useEffect(() => {
    if (state.user === undefined || state.user === null) {
      setNID(null);
      return;
    }
    setNID(state.user.user.NID);
  }, [state.user]);
  const fetchData = React.useCallback(() => {
    if (isWorking || certs !== undefined || NID === undefined || NID === null)
      return;
    setIsWorking(true);
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(routes.getMyCerts + NID, 'get', undefined, 'data'),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        props.navigate();
        return;
      }
      setCerts(res[0]);
      setIsWorking(false);
    });
  }, [isWorking, certs, props, dispatch, NID]);
  React.useEffect(() => {
    if (NID === undefined) return;
    if (NID !== null) fetchData();
  }, [NID, fetchData]);
  const isInPhone = getDevice().indexOf('WebPort') !== -1;
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
          background: 'url(./assets/images/back3.png)',
        }}
      />
      {certs !== undefined && (
        <CommonWebBox
          width={isInPhone ? '100%' : '80%'}
          style={{
            ...styles.alignSelfCenter,
          }}
          header={'گواهی‌های من'}>
          <CommonDataTable
            excel={false}
            pagination={false}
            columns={columns}
            data={certs}
          />
        </CommonWebBox>
      )}
      {NID === null && (
        <CommonWebBox
          width={isInPhone ? '100%' : 400}
          style={{
            ...styles.alignSelfCenter,
          }}>
          <JustBottomBorderTextInput
            placeholder={commonTranslator.NID}
            subText={commonTranslator.NID}
            justNum={true}
            value={NIDTmp}
            onChangeText={e => setNIDTmp(e)}
          />
          <CommonButton
            onPress={() => setNID(NIDTmp)}
            title={commonTranslator.confirm}
          />
        </CommonWebBox>
      )}
    </MyView>
  );
}
export default MyCerts;
