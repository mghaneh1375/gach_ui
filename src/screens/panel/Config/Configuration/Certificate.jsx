import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {dispatchStateContext} from '@/App.jsx';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../styles/CommonComponents.jsx';
import JustBottomBorderSelect from '../../../../styles/common/JustBottomBorderSelect.jsx';
import {styles} from '../../../../styles/common/styles';
import translator from './translator';
import commonTranslator from '@/translator/common';
import {showSuccess} from '../../../../services/utility';
function Certificate(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const [certs, setCerts] = useState();
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [forth, setForth] = useState();
  const [fifth, setFifth] = useState();
  React.useEffect(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.getCertConfiguration,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] == null) {
        navigate('/');
        return;
      }
      const data = res[0];
      setCerts(data.all);
      setFirst(data.first === '' ? undefined : data.first);
      setSecond(data.second === '' ? undefined : data.second);
      setThird(data.third === '' ? undefined : data.third);
      setForth(data.forth === '' ? undefined : data.forth);
      setFifth(data.fifth === '' ? undefined : data.fifth);
    });
  }, [navigate, props.token, dispatch]);
  const update = () => {
    dispatch({
      loading: true,
    });
    const data = {};
    if (first !== undefined) data.firstRankCertId = first;
    if (second !== undefined) data.secondRankCertId = second;
    if (third !== undefined) data.thirdRankCertId = third;
    if (forth !== undefined) data.forthRankCertId = forth;
    if (fifth !== undefined) data.fifthRankCertId = fifth;
    Promise.all([
      generalRequest(
        routes.updateConfiguration,
        'put',
        data,
        undefined,
        props.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] !== null) {
        showSuccess();
      }
    });
  };
  return (
    <CommonWebBox>
      <MyView>
        <PhoneView style={styles.gap10}>
          {certs !== undefined && (
            <JustBottomBorderSelect
              value={
                first === undefined
                  ? {}
                  : certs.filter(element => {
                      return element.id === first;
                    })[0]
              }
              placeholder={translator.firstRankCert}
              subText={translator.firstRankCert}
              setter={setFirst}
              values={certs}
            />
          )}
          {certs !== undefined && (
            <JustBottomBorderSelect
              value={
                second === undefined
                  ? {}
                  : certs.filter(element => {
                      return element.id === second;
                    })[0]
              }
              placeholder={translator.secondRankCert}
              subText={translator.secondRankCert}
              setter={setSecond}
              values={certs}
            />
          )}
          {certs !== undefined && (
            <JustBottomBorderSelect
              value={
                third === undefined
                  ? {}
                  : certs.filter(element => {
                      return element.id === third;
                    })[0]
              }
              placeholder={translator.thirdRankCert}
              subText={translator.thirdRankCert}
              setter={setThird}
              values={certs}
            />
          )}
          {certs !== undefined && (
            <JustBottomBorderSelect
              value={
                forth === undefined
                  ? {}
                  : certs.filter(element => {
                      return element.id === forth;
                    })[0]
              }
              placeholder={translator.forthRankCert}
              subText={translator.forthRankCert}
              setter={setForth}
              values={certs}
            />
          )}
          {certs !== undefined && (
            <JustBottomBorderSelect
              value={
                fifth === undefined
                  ? {}
                  : certs.filter(element => {
                      return element.id === fifth;
                    })[0]
              }
              placeholder={translator.fifthRankCert}
              subText={translator.fifthRankCert}
              setter={setFifth}
              values={certs}
            />
          )}
        </PhoneView>
        <CommonButton
          onPress={() => update()}
          title={commonTranslator.confirm}
        />
      </MyView>
    </CommonWebBox>
  );
}
export default Certificate;
