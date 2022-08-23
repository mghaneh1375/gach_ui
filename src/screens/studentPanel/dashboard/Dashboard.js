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
          text={Translate.money}
          theme={vars.ORANGE}
          subtext={props.user.user.money}
          btnColor={'yellow'}
          borderRight={true}
        />
        <DashboardCard
          text={Translate.testEnable}
          theme={vars.ORANGE_RED}
          btnColor={'orange'}
          subtext={6}
          borderRight={true}
        />
        <DashboardCard
          text={Translate.testAll}
          theme={vars.DARK_BLUE}
          subtext={3}
          btnColor={'blue'}
          borderRight={true}
        />
        <DashboardCard
          text={Translate.yourRank}
          subtext={100}
          background={vars.GRADIENT}
          padding={'38px 10px'}
        />
      </PhoneView>
    </CommonWebBox>
  );
}

export default Dashboard;
