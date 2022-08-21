import React from 'react';
import {CommonWebBox, PhoneView} from '../../../styles/Common';
import {Translate} from './Translate';
import DashboardCard from './DashboardCard/DashboardCard';
import vars from '../../../styles/root';

function Dashboard(props) {
  return (
    <CommonWebBox header={Translate.youSee}>
      <PhoneView>
        <DashboardCard
          text={Translate.balance}
          theme={vars.ORANGE}
          subtext={31}
          btnColor={'yellow'}
          borderRightWidth={'true'}
        />
        <DashboardCard
          text={Translate.testEnable}
          theme={vars.ORANGE_RED}
          btnColor={'orange'}
          subtext={6}
          borderRightWidth={'true'}
        />
        <DashboardCard
          text={Translate.testAll}
          theme={vars.DARK_BLUE}
          subtext={3}
          btnColor={'blue'}
          borderRightWidth={'true'}
        />
        <DashboardCard
          text={Translate.yourRank}
          subtext={100}
          backgroundColor={vars.ORANGE_RED}
        />
      </PhoneView>
    </CommonWebBox>
  );
}

export default Dashboard;
