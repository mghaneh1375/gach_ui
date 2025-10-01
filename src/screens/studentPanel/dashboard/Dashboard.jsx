import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import CopyBox from '@/components/CopyBox.jsx';
import Notif from '@/screens/advisorPanel/dashboard/components/Notif';
import {formatPrice, showError, showSuccess} from '@/services/utility';
import {FontIcon} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import {styles} from '@/styles/common/styles';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles/CommonComponents.jsx';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {fetchUser, setCacheItem} from '../../../api/user';
import ProgressCard from '../myOffs/progressCard/ProgressCard.jsx';
import Config from './components/Config';
import GeneralInfo from './components/GeneralInfo';
import {Translate} from './components/translate';
import ExchangeOffer from './ExchangeOffer.jsx';
import {getMySummary} from './utility';
import AdviceRequest from '@/screens/advisorPanel/dashboard/components/AdviceRequest';
import MyAdvisor from './components/MyAdvisor';
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
  const [showConfig, setShowConfig] = useState(false);
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

      <CommonWebBox
        btn={
          <FontIcon
            onPress={() => setShowConfig('config')}
            back={'blue'}
            theme="rect"
            kind="normal"
            icon={faCog}
          />
        }
        header={Translate.youSee}>
        {showConfig && (
          <Config onClose={() => setShowConfig(false)} token={state.token} />
        )}
        {!showConfig && data && (
          <>
            {data.adviceRequests &&
              data.adviceRequests !== null &&
              data.adviceRequests.length > 0 && (
                <>
                  <SimpleText
                    style={{
                      color: vars.DARK_BLUE,
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderBottom: `2px solid ${vars.DARK_BLUE}`,
                      paddingBottom: '8px',
                    }}
                    text={Translate.adviceRequests}
                  />
                  {data.adviceRequests.map((request, index) => (
                    <AdviceRequest
                      key={index}
                      dashbaordMode="student"
                      firstname={request.user.firstname}
                      lastname={request.user.lastname}
                      price={request.planDigest.price}
                      title={request.planDigest.title}
                      requestAt={request.requestAt}
                      answerAt={request.answerAt}
                      status={request.status}
                    />
                  ))}
                </>
              )}
            {data.lastNotifs &&
              data.lastNotifs !== null &&
              data.lastNotifs.length > 0 && (
                <>
                  <SimpleText
                    style={{
                      color: vars.DARK_BLUE,
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderBottom: `2px solid ${vars.DARK_BLUE}`,
                      paddingBottom: '8px',
                    }}
                    text={commonTranslator.lastNotifs}
                  />
                  {data.lastNotifs.map((notif, index) => (
                    <Notif
                      key={index}
                      createdAt={notif.createdAt}
                      title={notif.title}
                      id={notif.id}
                    />
                  ))}
                </>
              )}
            {data.myAdvisors &&
              data.myAdvisors !== null &&
              data.myAdvisors.length > 0 && (
                <>
                  <SimpleText
                    style={{
                      color: vars.DARK_BLUE,
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderBottom: `2px solid ${vars.DARK_BLUE}`,
                      paddingBottom: '8px',
                    }}
                    text={Translate.myAdvisors}
                  />
                  {data.myAdvisors.map((advisor, index) => (
                    <MyAdvisor
                      key={index}
                      advisor={advisor.advisor}
                      rate={advisor.rate}
                      isInPhone={state.isInPhone}
                    />
                  ))}
                </>
              )}
            {data.activeTeachers && data.activeTeachers !== null && (
              <GeneralInfo
                isInPhone={state.isInPhone}
                data={data}
                exchangeOffers={exchangeOffers}
                setExchangeOffers={setExchangeOffers}
                token={state.token}
                dispatch={dispatch}
                setShowExchangeCoinToMoneyPopup={
                  setShowExchangeCoinToMoneyPopup
                }
                setCreateOff={setCreateOff}
              />
            )}
          </>
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default Dashboard;
