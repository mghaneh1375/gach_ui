import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from './Translator';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import commonTranslator from '../../../../tranlates/Common';
import {showSuccess} from '../../../../services/Utility';

function General(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [initMoney, setInitMoney] = useState();
  const [initCoin, setInitCoin] = useState();
  const [inviteMoney, setInviteMoney] = useState();
  const [inviteCoin, setInviteCoin] = useState();
  const [completeInfoMoney, setCompleteInfoMoney] = useState();
  const [completeInfoCoin, setCompleteInfoCoin] = useState();
  const [quizMoney, setQuizMoney] = useState();
  const [quizCoin, setQuizCoin] = useState();
  const [agentOffPercent, setAgentOffPercent] = useState();
  const [schoolOffPercent, setSchoolOffPercent] = useState();
  const [minRequestMoney, setMinRequestMoney] = useState();
  const [coinRateCoef, setCoinRateCoef] = useState();
  const [topInQuizForCert, setTopInQuizForCert] = useState();
  const [advisorOffPercent, setAdvisorOffPercent] = useState();

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

      setInitMoney(data.initMoney);
      setInitCoin(data.initCoin);
      setInviteMoney(data.inviteMoney);
      setInviteCoin(data.inviteCoin);
      setCompleteInfoMoney(data.completeInfoMoney);
      setCompleteInfoCoin(data.completeInfoCoin);
      setQuizMoney(data.quizMoney);
      setQuizCoin(data.quizCoin);
      setAgentOffPercent(data.agentOffPercent);
      setSchoolOffPercent(data.schoolOffPercent);
      setMinRequestMoney(data.minRequestMoney);
      setCoinRateCoef(data.coinRateCoef);
      setTopInQuizForCert(data.topInQuizForCert);
      setAdvisorOffPercent(data.advisorOffPercent);
    });
  }, [navigate, props.token, dispatch]);

  const update = () => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.updateConfiguration,
        'put',
        {
          initMoney: initMoney,
          initCoin: initCoin,
          inviteMoney: inviteMoney,
          inviteCoin: inviteCoin,
          completeInfoMoney: completeInfoMoney,
          completeInfoCoin: completeInfoCoin,
          quizMoney: quizMoney,
          quizCoin: quizCoin,
          agentOffPercent: agentOffPercent,
          schoolOffPercent: schoolOffPercent,
          minRequestMoney: minRequestMoney,
          coinRateCoef: coinRateCoef,
          topInQuizForCert: topInQuizForCert,
          advisorOffPercent: advisorOffPercent,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] !== null) {
        showSuccess(commonTranslator.success);
      }
    });
  };

  return (
    <View>
      <CommonWebBox>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={translator.initMoney}
            subText={translator.initMoney}
            value={initMoney}
            onChangeText={e => setInitMoney(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.initCoin}
            subText={translator.initCoin}
            value={initCoin}
            onChangeText={e => setInitCoin(e)}
            justNum={true}
          />
        </PhoneView>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={translator.inviteMoney}
            subText={translator.inviteMoney}
            value={inviteMoney}
            onChangeText={e => setInviteMoney(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.inviteCoin}
            subText={translator.inviteCoin}
            value={inviteCoin}
            onChangeText={e => setInviteCoin(e)}
            justNum={true}
          />
        </PhoneView>

        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={translator.completeInfoMoney}
            subText={translator.completeInfoMoney}
            value={completeInfoMoney}
            onChangeText={e => setCompleteInfoMoney(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.completeInfoCoin}
            subText={translator.completeInfoCoin}
            value={completeInfoCoin}
            onChangeText={e => setCompleteInfoCoin(e)}
            justNum={true}
          />
        </PhoneView>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={translator.quizMoney}
            subText={translator.quizMoney}
            value={quizMoney}
            onChangeText={e => setQuizMoney(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.quizCoin}
            subText={translator.quizCoin}
            value={quizCoin}
            onChangeText={e => setQuizCoin(e)}
            justNum={true}
          />
        </PhoneView>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={translator.agentOffPercent}
            subText={translator.agentOffPercent}
            value={agentOffPercent}
            onChangeText={e => setAgentOffPercent(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.schoolOffPercent}
            subText={translator.schoolOffPercent}
            value={schoolOffPercent}
            onChangeText={e => setSchoolOffPercent(e)}
            justNum={true}
          />
        </PhoneView>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={translator.minRequestMoney}
            subText={translator.minRequestMoney}
            value={minRequestMoney}
            onChangeText={e => setMinRequestMoney(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.coinRateCoef}
            subText={translator.coinRateCoef}
            value={coinRateCoef}
            float={true}
            onChangeText={e => setCoinRateCoef(e)}
            justNum={true}
          />
        </PhoneView>
        <PhoneView>
          <JustBottomBorderTextInput
            placeholder={translator.topInQuizForCert}
            subText={translator.topInQuizForCert}
            value={topInQuizForCert}
            onChangeText={e => setTopInQuizForCert(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.advisorOffPercent}
            subText={translator.advisorOffPercent}
            value={advisorOffPercent}
            onChangeText={e => setAdvisorOffPercent(e)}
            justNum={true}
          />
        </PhoneView>

        <CommonButton
          onPress={() => update()}
          title={commonTranslator.update}
        />
      </CommonWebBox>
    </View>
  );
}

export default General;
