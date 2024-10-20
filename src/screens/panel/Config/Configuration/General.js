import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from './Translator';
import {dispatchStateContext} from '../../../../App';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import commonTranslator from '../../../../translator/Common';
import {showSuccess} from '../../../../services/Utility';

function General(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

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
  const [moneyRateCoef, setMoneyRateCoef] = useState();
  const [topInQuizForCert, setTopInQuizForCert] = useState();
  const [advisorOffPercent, setAdvisorOffPercent] = useState();
  const [maxStudentQuizPerDay, setMaxStudentQuizPerDay] = useState();
  const [quizPerStudentPrice, setQuizPerStudentPrice] = useState();
  const [minQuestionForCustomQuiz, setMinQuestionForCustomQuiz] = useState();
  const [giftPeriod, setGiftPeriod] = useState();
  const [maxQuestionPerQuiz, setMaxQuestionPerQuiz] = useState();
  const [minAdvicePrice, setMinAdvicePrice] = useState();
  const [maxVideoCallPerMonth, setMaxVideoCallPerMonth] = useState();
  const [hwPerStudentPrice, setHwPerStudentPrice] = useState();
  const [iryscTeachPercent, setIryscTeachPercent] = useState();
  const [iryscAdvicePercent, setIryscAdvicePercent] = useState();
  const [maxTeachCap, setMaxTeachCap] = useState();
  const [minTeachPrice, setMinTeachPrice] = useState();
  const [maxTeachPrice, setMaxTeachPrice] = useState();
  const [prePayAmount, setPrePayAmount] = useState();
  const [minAmountForSettlement, setMinAmountForSettlement] = useState();

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
      setMoneyRateCoef(data.moneyRateCoef);
      setTopInQuizForCert(data.topInQuizForCert);
      setAdvisorOffPercent(data.advisorOffPercent);
      setMaxStudentQuizPerDay(data.maxStudentQuizPerDay);
      setGiftPeriod(data.giftPeriod);
      setQuizPerStudentPrice(data.quizPerStudentPrice);
      setMaxQuestionPerQuiz(data.maxQuestionPerQuiz);
      setMinQuestionForCustomQuiz(data.minQuestionForCustomQuiz);
      setHwPerStudentPrice(data.hwPerStudentPrice);
      setMinAdvicePrice(data.minAdvicePrice);
      setMaxVideoCallPerMonth(data.maxVideoCallPerMonth);
      setMaxTeachCap(data.maxTeachCap);
      setIryscTeachPercent(data.iryscTeachPercent);
      setIryscAdvicePercent(data.iryscAdvicePercent);
      setMinTeachPrice(data.minTeachPrice);
      setMaxTeachPrice(data.maxTeachPrice);
      setPrePayAmount(data.prePayAmount);
      setMinAmountForSettlement(data.minAmountForSettlement);
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
          moneyRateCoef: moneyRateCoef,
          topInQuizForCert: topInQuizForCert,
          advisorOffPercent: advisorOffPercent,
          maxStudentQuizPerDay: maxStudentQuizPerDay,
          giftPeriod: giftPeriod,
          quizPerStudentPrice: quizPerStudentPrice,
          minQuestionForCustomQuiz: minQuestionForCustomQuiz,
          maxQuestionPerQuiz: maxQuestionPerQuiz,
          minAdvicePrice: minAdvicePrice,
          hwPerStudentPrice: hwPerStudentPrice,
          maxVideoCallPerMonth: maxVideoCallPerMonth,
          maxTeachCap: maxTeachCap,
          iryscTeachPercent: iryscTeachPercent,
          iryscAdvicePercent: iryscAdvicePercent,
          minTeachPrice: minTeachPrice,
          maxTeachPrice: maxTeachPrice,
          prePayAmount: prePayAmount,
          minAmountForSettlement: minAmountForSettlement,
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
    <MyView>
      <CommonWebBox>
        <PhoneView style={{gap: 15}}>
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
            float={true}
          />
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
            float={true}
          />
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
            float={true}
          />
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
            float={true}
          />
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
          <JustBottomBorderTextInput
            placeholder={translator.moneyRateCoef}
            subText={translator.moneyRateCoef}
            value={moneyRateCoef}
            float={true}
            onChangeText={e => setMoneyRateCoef(e)}
            justNum={true}
          />
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
          <JustBottomBorderTextInput
            placeholder={translator.maxStudentQuizPerDay}
            subText={translator.maxStudentQuizPerDay}
            value={maxStudentQuizPerDay}
            onChangeText={e => setMaxStudentQuizPerDay(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.maxQuestionPerQuiz}
            subText={translator.maxQuestionPerQuiz}
            value={maxQuestionPerQuiz}
            onChangeText={e => setMaxQuestionPerQuiz(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.quizPerStudentPrice}
            subText={translator.quizPerStudentPrice}
            value={quizPerStudentPrice}
            onChangeText={e => setQuizPerStudentPrice(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.giftPeriod}
            subText={translator.giftPeriod}
            value={giftPeriod}
            onChangeText={e => setGiftPeriod(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.minQuestionForCustomQuiz}
            subText={translator.minQuestionForCustomQuiz}
            value={minQuestionForCustomQuiz}
            onChangeText={e => setMinQuestionForCustomQuiz(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.hwPerStudentPrice}
            subText={translator.hwPerStudentPrice}
            value={hwPerStudentPrice}
            onChangeText={e => setHwPerStudentPrice(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.minAdvicePrice}
            subText={translator.minAdvicePrice}
            value={minAdvicePrice}
            onChangeText={e => setMinAdvicePrice(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.maxVideoCallPerMonth}
            subText={translator.maxVideoCallPerMonth}
            value={maxVideoCallPerMonth}
            onChangeText={e => setMaxVideoCallPerMonth(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.maxTeachCap}
            subText={translator.maxTeachCap}
            value={maxTeachCap}
            onChangeText={e => setMaxTeachCap(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.iryscTeachPercent}
            subText={translator.iryscTeachPercent}
            value={iryscTeachPercent}
            onChangeText={e => setIryscTeachPercent(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.iryscAdvicePercent}
            subText={translator.iryscAdvicePercent}
            value={iryscAdvicePercent}
            onChangeText={e => setIryscAdvicePercent(e)}
            justNum={true}
          />

          <JustBottomBorderTextInput
            placeholder={translator.minTeachPrice}
            subText={translator.minTeachPrice}
            value={minTeachPrice}
            onChangeText={e => setMinTeachPrice(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.maxTeachPrice}
            subText={translator.maxTeachPrice}
            value={maxTeachPrice}
            onChangeText={e => setMaxTeachPrice(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.prePayAmount}
            subText={translator.prePayAmount}
            value={prePayAmount}
            onChangeText={e => setPrePayAmount(e)}
            justNum={true}
          />
          <JustBottomBorderTextInput
            placeholder={translator.minAmountForSettlement}
            subText={translator.minAmountForSettlement}
            value={minAmountForSettlement}
            onChangeText={e => setMinAmountForSettlement(e)}
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

export default General;
