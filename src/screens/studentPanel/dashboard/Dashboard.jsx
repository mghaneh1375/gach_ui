import {
  faExchange,
  faEye,
  faIdCard,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {fetchUser, setCacheItem} from '../../../api/user';
import {generalRequest} from '../../../api/utility';
import {globalStateContext, dispatchStateContext} from '@/App';
import CopyBox from '../../../components/CopyBox';
import {formatPrice, showError, showSuccess} from '../../../services/utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/CommonComponents.jsx';
import JustBottomBorderTextInput from '../../../styles/common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../styles/common/PopUp';
import {styles} from '../../../styles/common/styles';
import vars from '../../../styles/root';
import commonTranslator from '../../../translator/common';
import ProgressCard from '../myOffs/progressCard/ProgressCard';
import DashboardCard from './dashboardCard/DashboardCard';
import ExchangeOffer from './ExchangeOffer';
import {Translate} from './translate';
import {getMySummary} from './utility';
function Dashboard(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [exchangeOffers, setExchangeOffers] = useState();
  const [data, setData] = useState();
  const [exchangeCoinToMoneyRate, setExchangeCoinToMoneyRate] = useState();
  const [createOff, setCreateOff] = useState(false);
  const [state, dispatch] = useGlobalState();
  const navigate = props.navigate;
  React.useEffect(() => {
    dispatch({
      loading: true,
    });
    Promise.all([getMySummary(state.token)]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setExchangeCoinToMoneyRate(res[0].coinToMoneyExchange);
    });
  }, [navigate, state.token, dispatch]);
  const [showExchangeCoinToMoneyPopup, setShowExchangeCoinToMoneyPopup] =
    useState(false);
  const [mode, setMode] = useState('coin');
  const [offCodeAmount, setOffCodeAmount] = useState();
  const [code, setCode] = useState();
  const check = React.useCallback(() => {
    if (data === undefined || offCodeAmount === undefined) return;
    if (mode === 'coin' && offCodeAmount > data.coin) {
      setOffCodeAmount(undefined);
      showError(
        'موجودی شما ' + data.coin + ' ' + commonTranslator.coin + ' می باشد',
      );
    } else if (mode === 'charge' && offCodeAmount > data.money) {
      setOffCodeAmount(undefined);
      showError(
        'موجودی شما ' +
          data.money +
          ' ' +
          commonTranslator.priceUnit +
          ' می باشد',
      );
    }
  }, [data, mode, offCodeAmount]);
  React.useEffect(() => {
    if (offCodeAmount !== undefined) check();
  }, [offCodeAmount, check]);
  return (
    <MyView>
      {createOff && (
        <LargePopUp
          toggleShowPopUp={() => setCreateOff(false)}
          btns={
            code !== undefined ? undefined : (
              <CommonButton
                theme={'dark'}
                onPress={async () => {
                  if (offCodeAmount === undefined) {
                    showError('لطفا مقدار موردنظر خود را وارد نمایید');
                    return;
                  }
                  dispatch({
                    loading: true,
                  });
                  const res = await generalRequest(
                    routes.createOff,
                    'post',
                    {
                      amount: offCodeAmount,
                      mode: mode,
                    },
                    'data',
                    state.token,
                  );
                  if (res !== null) {
                    setCode(res);
                    await setCacheItem('user', undefined);
                    await fetchUser(state.token, user => {
                      dispatch({
                        loading: false,
                      });
                      showSuccess();
                      const tmp = data;
                      tmp.coin = user.user.coin;
                      tmp.money = user.user.money;
                      setData(data);
                    });
                    // setCreateOff(false);
                  } else {
                    dispatch({
                      loading: false,
                    });
                  }
                }}
                title={'ساخت کد تخفیف'}
              />
            )
          }>
          <PhoneView
            style={{
              ...styles.alignSelfCenter,
              ...styles.marginTop20,
            }}>
            <ProgressCard
              header={'استفاده از ایکس پول'}
              theme={vars.ORANGE}
              color={mode === 'coin' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'coin' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'coin') return;
                setMode('coin');
              }}
              style={{
                ...styles.cursor_pointer,
              }}
            />
            <ProgressCard
              header={'استفاده از اعتبار'}
              theme={vars.ORANGE_RED}
              color={mode === 'charge' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'charge' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'charge') return;
                setMode('charge');
              }}
              style={{
                ...styles.cursor_pointer,
              }}
            />
          </PhoneView>

          {mode === 'coin' && (
            <MyView>
              <EqualTwoTextInputs>
                <SimpleText
                  text={
                    'نرخ تبدیل ' +
                    commonTranslator.coin +
                    ' به پول: ' +
                    'هر ایکس پول معادل است با ' +
                    formatPrice(exchangeCoinToMoneyRate) +
                    ' ' +
                    commonTranslator.priceUnit
                  }
                />
                <SimpleText
                  text={
                    'موجودی فعلی شما: ' +
                    data.coin +
                    ' ' +
                    commonTranslator.coin
                  }
                />
              </EqualTwoTextInputs>

              <JustBottomBorderTextInput
                placeholder={'مقدار ' + commonTranslator.coin + ' مورد نظر'}
                subText={'مقدار ' + commonTranslator.coin + ' مورد نظر'}
                value={offCodeAmount}
                onChangeText={e => setOffCodeAmount(e)}
              />
            </MyView>
          )}

          {mode === 'charge' && (
            <MyView>
              <SimpleText
                text={
                  'موجودی فعلی شما: ' +
                  formatPrice(data.money) +
                  ' ' +
                  commonTranslator.priceUnit
                }
              />

              <JustBottomBorderTextInput
                placeholder={'مقدار ' + commonTranslator.money + ' مورد نظر'}
                subText={'مقدار ' + commonTranslator.money + ' مورد نظر'}
                value={offCodeAmount}
                onChangeText={e => setOffCodeAmount(e)}
              />
            </MyView>
          )}
          {code !== undefined && (
            <PhoneView
              style={{
                ...styles.alignSelfCenter,
                ...styles.marginTop20,
              }}>
              <EqualTwoTextInputs>
                <SimpleText
                  style={{
                    ...styles.alignSelfCenter,
                  }}
                  text={'کد تخفیف: ' + code}
                />
                <CopyBox url={code} />
              </EqualTwoTextInputs>
            </PhoneView>
          )}
        </LargePopUp>
      )}
      {showExchangeCoinToMoneyPopup && (
        <LargePopUp
          header={'موجودی فعلی شما: ' + data.coin + ' ' + commonTranslator.coin}
          toggleShowPopUp={() => setShowExchangeCoinToMoneyPopup(false)}>
          <PhoneView
            style={{
              gap: '10px',
            }}>
            {exchangeOffers &&
              exchangeOffers.map((e, index) => {
                return (
                  <ExchangeOffer
                    onPress={async () => {
                      dispatch({
                        loading: true,
                      });
                      const res = await generalRequest(
                        routes.getReward + e.id,
                        'post',
                        undefined,
                        undefined,
                        state.token,
                      );
                      if (res !== null) {
                        if (e.section !== 'تبدیل به پول')
                          showSuccess(
                            'کدتخفیف شما با موفقیت ساخته شد. برای رویت کدهای تخفیف خود از قسمت تخفیف و جایزه اقدام فرمایید',
                          );
                        else showSuccess();
                        await setCacheItem('user', undefined);
                        await fetchUser(state.token, user => {
                          dispatch({
                            loading: false,
                          });
                          const tmp = data;
                          tmp.coin = user.user.coin;
                          tmp.money = user.user.money;
                          setData(data);
                        });
                        setShowExchangeCoinToMoneyPopup(false);
                      } else {
                        dispatch({
                          loading: false,
                        });
                      }
                    }}
                    key={index}
                    offer={e}
                  />
                );
              })}
          </PhoneView>
        </LargePopUp>
      )}

      <CommonWebBox header={Translate.youSee}>
        {data !== undefined && (
          <PhoneView>
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.money}
              theme={vars.ORANGE}
              subtext={formatPrice(data.money)}
              btnColor={'yellow'}
              borderRight={true}
              borderRightWidth={18}
              icon={faPlus}
              onPress={() => navigate('/charge')}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={commonTranslator.coin}
              theme={vars.GREEN}
              subtext={data.coin}
              btnColor={'blue'}
              borderRight={true}
              icon={faExchange}
              onPress={async () => {
                if (exchangeOffers) {
                  setShowExchangeCoinToMoneyPopup(true);
                  return;
                }
                dispatch({
                  loading: true,
                });
                const res = await generalRequest(
                  routes.exchangeOffers,
                  'get',
                  undefined,
                  'data',
                  state.token,
                );
                dispatch({
                  loading: false,
                });
                if (res != null) {
                  setExchangeOffers(res);
                  setShowExchangeCoinToMoneyPopup(true);
                }
              }}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.allQuizzes}
              theme={vars.DARK_BLUE}
              subtext={data.registrableQuizzes}
              btnColor={'blue'}
              borderRight={true}
              icon={faEye}
              onPress={() => props.navigate('/buy')}
              borderRightWidth={18}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.passedQuizzes}
              theme={vars.DARK_BLUE}
              subtext={data.passedQuizzes}
              btnColor={'blue'}
              borderRight={true}
              icon={faEye}
              onPress={() => props.navigate('/myIRYSCQuizzes/passed')}
              borderRightWidth={18}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.activeQuizzes}
              theme={vars.ORANGE_RED}
              btnColor={'orange'}
              subtext={data.activeQuizzes}
              borderRight={true}
              icon={faEye}
              onPress={() => props.navigate('/myIRYSCQuizzes/future')}
              borderRightWidth={18}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.createOff}
              theme={'purple'}
              subtext={'در فروشگاه کتاب آیریسک!'}
              subFontSize={15}
              btnColor={'purple'}
              borderRight={true}
              icon={faIdCard}
              onPress={() => setCreateOff(true)}
              borderRightWidth={18}
            />

            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.yourRank}
              subtext={data.rank}
              background={vars.GRADIENT}
              padding={'38px 10px'}
              borderRight={false}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.yourGradeRank}
              subtext={data.gradeRank}
              background={vars.GRADIENT}
              fontSize={20}
              padding={'38px 10px'}
              borderRight={false}
            />
          </PhoneView>
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default Dashboard;
