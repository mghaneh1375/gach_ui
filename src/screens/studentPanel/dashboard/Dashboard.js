import {View} from 'react-native';
import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
import {Translate} from './Translate';
import DashbordCard from './DashbordCard/DashbordCard';
import vars from '../../../styles/root';
function Dashboard(props) {
  return (
    <CommonWebBox header={Translate.youSee}>
      <PhoneView>
        <DashbordCard text={Translate.balance} theme={vars.ORANGE} />
        <DashbordCard text={Translate.testEnable} theme={vars.ORANGE_RED} />
        <DashbordCard text={Translate.testAll} theme={vars.DARK_BLUE} />
        <DashbordCard text={Translate.yourRank} background={vars.GRADIENT} />
      </PhoneView>
    </CommonWebBox>
  );
}

export default Dashboard;
