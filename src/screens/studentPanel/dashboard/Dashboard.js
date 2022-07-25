import {View} from 'react-native';
import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
import {Translate} from './Translate';
import MiniCard from './miniCard/miniCard';
import vars from '../../../styles/root';
function Dashboard(props) {
  return (
    <CommonWebBox header={Translate.youSee}>
      <PhoneView>
        <MiniCard text={Translate.balance} theme={vars.ORANGE} />
        <MiniCard text={Translate.testEnable} theme={vars.ORANGE_RED} />
        <MiniCard text={Translate.testAll} theme={vars.DARK_BLUE} />
        <MiniCard text={Translate.yourRank} background={vars.GRADIENT} />
      </PhoneView>
    </CommonWebBox>
  );
}

export default Dashboard;
