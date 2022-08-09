import {View} from 'react-native';
import {LargePopUp} from '../../../../styles/Common/PopUp';

function ShowPic(props) {
  const link =
    'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
  return (
    <View style={{zIndex: '10'}}>
      <LargePopUp>
        <img src={window.open(link)}></img>
      </LargePopUp>
    </View>
  );
}

export default ShowPic;
