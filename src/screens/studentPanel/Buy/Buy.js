import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {CommonWebBox, SimpleText} from '../../../styles/Common';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {Translate} from './Translate';
import {useState} from 'react';
import List from './components/List/List';

function Buy(props) {
  const [mode, setMode] = useState('list');
  return (
    <View style={{zIndex: 10}}>
      {mode === 'list' && <List setMode={setMode} token={props.token} />}
    </View>
  );
}

export default Buy;
