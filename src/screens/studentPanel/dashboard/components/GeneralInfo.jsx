import {formatPrice} from '@/services/utility';
import DashboardCard from '../dashboardCard/DashboardCard';
import {Translate} from './translate';
import {useNavigate} from 'react-router';
import commonTranslator from '@/translator/common';
import {routes} from '@/api/apiRoutes';
import vars from '@/styles/root';
import {generalRequest} from '@/api/utility';
import {
  faExchange,
  faEye,
  faIdCard,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {PhoneView} from '@/styles';

function GeneralInfo({
  isInPhone,
  exchangeOffers,
  data,
  setExchangeOffers,
  token,
  dispatch,
  setShowExchangeCoinToMoneyPopup,
  setCreateOff,
}) {
  const navigate = useNavigate();
  return (
    <>
      <PhoneView>
        <DashboardCard
          width={isInPhone ? '100%' : undefined}
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
          width={isInPhone ? '100%' : undefined}
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
              token,
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
          width={isInPhone ? '100%' : undefined}
          text={Translate.allQuizzes}
          theme={vars.DARK_BLUE}
          subtext={data.registrableQuizzes}
          btnColor={'blue'}
          borderRight={true}
          icon={faEye}
          onPress={() => navigate('/buy')}
          borderRightWidth={18}
        />

        <DashboardCard
          width={isInPhone ? '100%' : undefined}
          text={Translate.passedQuizzes}
          theme={vars.DARK_BLUE}
          subtext={data.passedQuizzes}
          btnColor={'blue'}
          borderRight={true}
          icon={faEye}
          onPress={() => navigate('/myIRYSCQuizzes/passed')}
          borderRightWidth={18}
        />

        <DashboardCard
          width={isInPhone ? '100%' : undefined}
          text={Translate.activeQuizzes}
          theme={vars.ORANGE_RED}
          btnColor={'orange'}
          subtext={data.activeQuizzes}
          borderRight={true}
          icon={faEye}
          onPress={() => navigate('/myIRYSCQuizzes/future')}
          borderRightWidth={18}
        />

        <DashboardCard
          width={isInPhone ? '100%' : undefined}
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
          width={isInPhone ? '100%' : undefined}
          text={Translate.yourRank}
          subtext={data.rank}
          background={vars.GRADIENT}
          padding={'38px 10px'}
          borderRight={false}
        />
        <DashboardCard
          width={isInPhone ? '100%' : undefined}
          text={Translate.yourGradeRank}
          subtext={data.gradeRank}
          background={vars.GRADIENT}
          fontSize={20}
          padding={'38px 10px'}
          borderRight={false}
        />
      </PhoneView>
    </>
  );
}

export default GeneralInfo;
