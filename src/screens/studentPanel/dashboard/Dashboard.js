import React, {useState} from 'react';
import {CommonWebBox, MyView, PhoneView} from '../../../styles/Common';
import {Translate} from './Translate';
import DashboardCard from './DashboardCard/DashboardCard';
import vars from '../../../styles/root';
import {faExchange, faEye, faPlus} from '@fortawesome/free-solid-svg-icons';
import {dispatchStateContext} from '../../../App';
import {getMySummary} from './Utility';
import commonTranslator from '../../../translator/Common';

function Dashboard(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [data, setData] = useState();
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
    });
  }, [navigate, props.token, dispatch]);

  return (
    <MyView>
      {/* <HomeBox color={'red'} number={1500} text={'آزمون در حال برگزرای'} /> */}
      <CommonWebBox header={Translate.youSee}>
        {data !== undefined && (
          <PhoneView>
            <DashboardCard
              text={Translate.money}
              theme={vars.ORANGE}
              subtext={data.money}
              btnColor={'yellow'}
              borderRight={true}
              icon={faPlus}
              onPress={() => props.navigate('/charge')}
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
              onPress={() => props.navigate('/myQuizzes')}
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
