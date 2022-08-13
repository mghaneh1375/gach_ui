import {View} from 'react-native';
import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
import {Translate} from './Translate';
import DashboardCard from './DashboardCard/DashboardCard';
import {styleJustifyContentEnd} from './DashboardCard/style';
import vars from '../../../styles/root';
import {color} from 'react-native-reanimated';

function Dashboard(props) {
  return (
    <CommonWebBox header={Translate.youSee}>
      <PhoneView>
        <DashboardCard
          text={Translate.balance}
          theme={vars.ORANGE}
          subtext={31}
          btnColor={'yellow'}
        />
        <DashboardCard
          text={Translate.testEnable}
          theme={vars.ORANGE_RED}
          btnColor={'orange'}
          subtext={6}
        />
        <DashboardCard
          text={Translate.testAll}
          theme={vars.DARK_BLUE}
          subtext={3}
          btnColor={'blue'}
        />
        <DashboardCard
          text={Translate.yourRank}
          subtext={100}
          background={vars.GRADIENT}
        />
      </PhoneView>
    </CommonWebBox>
  );
}

export default Dashboard;
