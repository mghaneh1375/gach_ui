import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../styles/Common';
import translator from './Translator';
import commonTranslator from '../../../../tranlates/Common';
import {showSuccess} from '../../../../services/Utility';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';

function Ravan(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [hermans, setHermans] = useState();
  const [cattell, setCattell] = useState();
  const [LASSI, setLASSI] = useState();
  const [beckDep, setBeckDep] = useState();
  const [beckAnx, setBeckAnx] = useState();
  const [CDI, setCDI] = useState();
  const [MBTI, setMBTI] = useState();
  const [standardRaven, setStandardRaven] = useState();
  const [proRaven, setProRaven] = useState();
  const [childRaven, setChildRaven] = useState();
  const [gardner, setGardner] = useState();
  const [izenk, setIzenk] = useState();
  const [haland, setHaland] = useState();
  const [neo, setNeo] = useState();
  const [cannor, setCannor] = useState();
  const [GHQ, setGHQ] = useState();
  const [RCMAS, setRCMAS] = useState();

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getAllConfiguration,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] == null) {
        navigate('/');
        return;
      }

      const data = res[0];

      setHermans(data.hermans);
      setCattell(data.cattell);
      setLASSI(data.LASSI);
      setBeckDep(data.beckDep);
      setBeckAnx(data.beckAnx);
      setCDI(data.CDI);
      setMBTI(data.MBTI);
      setStandardRaven(data.standardRaven);
      setProRaven(data.proRaven);
      setChildRaven(data.childRaven);
      setGardner(data.gardner);
      setIzenk(data.izenk);
      setHaland(data.haland);
      setNeo(data.neo);
      setCannor(data.cannor);
      setGHQ(data.GHQ);
      setRCMAS(data.RCMAS);
    });
  }, [navigate, props.token, dispatch]);

  const update = () => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.updateConfiguration,
        'put',
        {
          hermans: hermans,
          cattell: cattell,
          LASSI: LASSI,
          beckDep: beckDep,
          beckAnx: beckAnx,
          CDI: CDI,
          MBTI: MBTI,
          standardRaven: standardRaven,
          proRaven: proRaven,
          childRaven: childRaven,
          gardner: gardner,
          izenk: izenk,
          haland: haland,
          neo: neo,
          cannor: cannor,
          GHQ: GHQ,
          RCMAS: RCMAS,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] !== undefined) showSuccess(commonTranslator.success);
    });
  };

  return (
    <MyView>
      <CommonWebBox>
        <PhoneView style={{gap: 15}}>
          <JustBottomBorderTextInput
            placeholder={translator.beckDep}
            subText={translator.beckDep}
            value={beckDep}
            onChangeText={e => setBeckDep(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.beckAnx}
            subText={translator.beckAnx}
            value={beckAnx}
            onChangeText={e => setBeckAnx(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.CDI}
            subText={translator.CDI}
            value={CDI}
            onChangeText={e => setCDI(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.MBTI}
            subText={translator.MBTI}
            value={MBTI}
            onChangeText={e => setMBTI(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.standardRaven}
            subText={translator.standardRaven}
            value={standardRaven}
            onChangeText={e => setStandardRaven(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.proRaven}
            subText={translator.proRaven}
            value={proRaven}
            onChangeText={e => setProRaven(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.childRaven}
            subText={translator.childRaven}
            value={childRaven}
            onChangeText={e => setChildRaven(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.cattell}
            subText={translator.cattell}
            value={cattell}
            onChangeText={e => setCattell(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.hermans}
            subText={translator.hermans}
            value={hermans}
            onChangeText={e => setHermans(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.LASSI}
            subText={translator.LASSI}
            value={LASSI}
            onChangeText={e => setLASSI(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.gardner}
            subText={translator.gardner}
            value={gardner}
            onChangeText={e => setGardner(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.izenk}
            subText={translator.izenk}
            value={izenk}
            onChangeText={e => setIzenk(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.haland}
            subText={translator.haland}
            value={haland}
            onChangeText={e => setHaland(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.neo}
            subText={translator.neo}
            value={neo}
            onChangeText={e => setNeo(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.cannor}
            subText={translator.cannor}
            value={cannor}
            onChangeText={e => setCannor(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.GHQ}
            subText={translator.GHQ}
            value={GHQ}
            onChangeText={e => setGHQ(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.RCMAS}
            subText={translator.RCMAS}
            value={RCMAS}
            onChangeText={e => setRCMAS(e)}
            justNum={true}
          />
        </PhoneView>
        <CommonButton
          onPress={() => update()}
          title={commonTranslator.update}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default Ravan;
