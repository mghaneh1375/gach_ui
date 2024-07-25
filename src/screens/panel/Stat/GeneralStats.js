import React, {useState} from 'react';
import {CommonWebBox, PhoneView} from '../../../styles/Common';
import DashboardCard from '../../studentPanel/dashboard/DashboardCard/DashboardCard';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Translate from './Translate';
import {faChartBar} from '@fortawesome/free-solid-svg-icons';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {useEffectOnce} from 'usehooks-ts';
import vars from '../../../styles/root';

function GeneralStats(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const navigate = props.navigate;
  const [data, setData] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.GetGeneralStats,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setData(res[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffectOnce(() => {
    fetchData();
  }, []);

  return (
    <CommonWebBox>
      {data && (
        <>
          <PhoneView style={{gap: '20px', justifyContent: 'center'}}>
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.bankExam}
              theme={vars.DARK_BLUE}
              subtext={data.bankExam}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.bankExamLast24}
              theme={vars.DARK_BLUE}
              subtext={data.bankExamLast24}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.bankExamLastWeek}
              theme={vars.DARK_BLUE}
              subtext={data.bankExamLastWeek}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
          </PhoneView>
          <PhoneView style={{gap: '20px', justifyContent: 'center'}}>
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.gachExam}
              theme={vars.GREEN}
              subtext={data.gachExam}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.gachExamLast24}
              theme={vars.GREEN}
              subtext={data.gachExamLast24}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.gachExamLastWeek}
              theme={vars.GREEN}
              subtext={data.gachExamLastWeek}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
          </PhoneView>
          <PhoneView style={{gap: '20px', justifyContent: 'center'}}>
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.content}
              theme={vars.ORANGE}
              subtext={data.content}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.contentLast24}
              theme={vars.ORANGE}
              subtext={data.contentLast24}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.contentLastWeek}
              theme={vars.ORANGE}
              subtext={data.contentLastWeek}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
          </PhoneView>
          <PhoneView style={{gap: '20px', justifyContent: 'center'}}>
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.registry}
              theme={vars.ORANGE_RED}
              subtext={data.registry}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.registryLast24}
              theme={vars.ORANGE_RED}
              subtext={data.registryLast24}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.registryLastWeek}
              theme={vars.ORANGE_RED}
              subtext={data.registryLastWeek}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
          </PhoneView>
          <PhoneView style={{gap: '20px', justifyContent: 'center'}}>
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.advisorRequest}
              theme="purple"
              subtext={data.advisorRequest}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.advisorRequestLast24}
              theme="purple"
              subtext={data.advisorRequestLast24}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
            <DashboardCard
              width={state.isInPhone ? '100%' : undefined}
              text={Translate.advisorRequestLastWeek}
              theme="purple"
              subtext={data.advisorRequestLastWeek}
              borderRight={true}
              icon={faChartBar}
              borderRightWidth={18}
            />
          </PhoneView>
        </>
      )}
    </CommonWebBox>
  );
}

export default GeneralStats;
