import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {Translate} from './Translate';
import DashboardCard from './DashboardCard/DashboardCard';
import vars from '../../../styles/root';
import {faExchange, faEye, faPlus} from '@fortawesome/free-solid-svg-icons';
import {dispatchStateContext} from '../../../App';
import {getMySummary} from './Utility';
import commonTranslator from '../../../translator/Common';
import {formatPrice, showSuccess} from '../../../services/Utility';
import {LargePopUp} from '../../../styles/Common/PopUp';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {fetchUser, setCacheItem} from '../../../API/User';

function Dashboard(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [data, setData] = useState();
  const [exchangeCoinToMoneyRate, setExchangeCoinToMoneyRate] = useState();
  const [exchangeMoneyToCoinRate, setExchangeMoneyToCoinRate] = useState();
  const [dispatch] = useGlobalState();
  const navigate = props.navigate;

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getMySummary(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setExchangeCoinToMoneyRate(res[0].coinToMoneyExchange);
      setExchangeMoneyToCoinRate(res[0].moneyToCoinExchange);
    });
  }, [navigate, props.token, dispatch]);

  const [showExchangeCoinToMoneyPopup, setShowExchangeCoinToMoneyPopup] =
    useState(false);

  const [showExchangeMoneyToCoinPopup, setShowExchangeMoneyToCoinPopup] =
    useState(false);

  const [wantedCoinToExchange, setWantedCoinToExchange] = useState();
  const [wantedMoneyToExchange, setWantedMoneyToExchange] = useState();

  return (
    <MyView>
      {showExchangeCoinToMoneyPopup && (
        <LargePopUp
          toggleShowPopUp={() => setShowExchangeCoinToMoneyPopup(false)}
          btns={
            <CommonButton
              theme={'dark'}
              onPress={async () => {
                dispatch({loading: true});
                let res = await generalRequest(
                  routes.exchange,
                  'post',
                  {
                    amount: wantedCoinToExchange,
                    mode: 'coin_to_money',
                  },
                  undefined,
                  props.token,
                );
                if (res !== null) {
                  await setCacheItem('user', undefined);
                  await fetchUser(props.token, user => {
                    dispatch({loading: false});
                    showSuccess();
                    let tmp = data;
                    tmp.coin = user.user.coin;
                    tmp.money = user.user.money;
                    setData(data);
                  });
                  setShowExchangeCoinToMoneyPopup(false);
                } else {
                  dispatch({loading: false});
                }
              }}
              title={'انجام معامله'}
            />
          }>
          <EqualTwoTextInputs>
            <SimpleText
              text={
                'نرخ تبدیل ' +
                commonTranslator.coin +
                ' به پول: ' +
                'هر سکه معادل است با ' +
                formatPrice(exchangeCoinToMoneyRate) +
                ' ' +
                commonTranslator.priceUnit
              }
            />
            <SimpleText
              text={
                'موجودی فعلی شما: ' + data.coin + ' ' + commonTranslator.coin
              }
            />
          </EqualTwoTextInputs>
          <JustBottomBorderTextInput
            placeholder={'مقدار ' + commonTranslator.coin + ' مورد نظر'}
            subText={'مقدار ' + commonTranslator.coin + ' مورد نظر'}
            value={wantedCoinToExchange}
            onChangeText={e => setWantedCoinToExchange(e)}
          />
        </LargePopUp>
      )}
      {showExchangeMoneyToCoinPopup && (
        <LargePopUp
          toggleShowPopUp={() => setShowExchangeMoneyToCoinPopup(false)}
          btns={
            <CommonButton
              theme={'dark'}
              onPress={async () => {
                dispatch({loading: true});
                let res = await generalRequest(
                  routes.exchange,
                  'post',
                  {
                    amount: wantedMoneyToExchange,
                    mode: 'money_to_coin',
                  },
                  undefined,
                  props.token,
                );
                if (res !== null) {
                  await setCacheItem('user', undefined);
                  await fetchUser(props.token, user => {
                    dispatch({loading: false});
                    showSuccess();
                    let tmp = data;
                    tmp.coin = user.user.coin;
                    tmp.money = user.user.money;
                    setData(data);
                  });
                  setShowExchangeMoneyToCoinPopup(false);
                } else {
                  dispatch({loading: false});
                }
              }}
              title={'انجام معامله'}
            />
          }>
          <EqualTwoTextInputs>
            <SimpleText
              text={
                'نرخ تبدیل هر 10000 تومان به  ' +
                commonTranslator.coin +
                ' معادل است با ' +
                formatPrice(exchangeMoneyToCoinRate)
              }
            />
            <SimpleText
              text={
                'موجودی فعلی شما: ' +
                data.money +
                ' ' +
                commonTranslator.priceUnit
              }
            />
          </EqualTwoTextInputs>
          <JustBottomBorderTextInput
            placeholder={'مبلغ موردنظر '}
            subText={'مبلغ موردنظر '}
            value={wantedMoneyToExchange}
            onChangeText={e => setWantedMoneyToExchange(e)}
          />
        </LargePopUp>
      )}
      {/* <HomeBox color={'red'} number={1500} text={'آزمون در حال برگزرای'} /> */}
      <CommonWebBox header={Translate.youSee}>
        {data !== undefined && (
          <PhoneView>
            <DashboardCard
              text={Translate.money}
              theme={vars.ORANGE}
              subtext={formatPrice(data.money)}
              btnColor={'yellow'}
              borderRight={true}
              icon={faExchange}
              onPress={() => setShowExchangeMoneyToCoinPopup(true)}
              borderRightWidth={18}
            />

            <DashboardCard
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
              text={Translate.passedQuizzes}
              theme={vars.DARK_BLUE}
              subtext={data.passedQuizzes}
              btnColor={'blue'}
              borderRight={true}
              icon={faEye}
              onPress={() => props.navigate('/myQuizzes')}
              borderRightWidth={18}
            />

            <DashboardCard
              text={Translate.activeQuizzes}
              theme={vars.ORANGE_RED}
              btnColor={'orange'}
              subtext={data.activeQuizzes}
              borderRight={true}
              icon={faEye}
              onPress={() => props.navigate('/myQuizzes')}
              borderRightWidth={18}
            />
            <DashboardCard
              text={commonTranslator.coin}
              theme={vars.GREEN}
              subtext={data.coin}
              btnColor={'blue'}
              borderRight={true}
              icon={faExchange}
              onPress={() => setShowExchangeCoinToMoneyPopup(true)}
              borderRightWidth={18}
            />
            <DashboardCard
              text={Translate.yourRank}
              subtext={data.rank}
              background={vars.GRADIENT}
              padding={'38px 10px'}
              borderRight={false}
            />
            {/* <DashboardCard
              text={Translate.yourBranchRank}
              subtext={data.branchRank}
              background={vars.GRADIENT}
              padding={'38px 10px'}
              borderRight={false}
            /> */}
            <DashboardCard
              text={Translate.yourGradeRank}
              subtext={data.gradeRank}
              background={vars.GRADIENT}
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
