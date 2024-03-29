import {Image, TouchableOpacity} from 'react-native';

import {useNavigate} from 'react-router-dom';
import {MyView} from '../../styles/Common';

const TopNavBar = () => {
  const navigate = useNavigate();

  return (
    <MyView
      style={{
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 10,
        elevation: 3,
        backgroundColor: 'white',
        height: 60,
      }}>
      <TouchableOpacity style={{height: 60}} onPress={() => navigate('/')}>
        <Image
          style={{width: '100%', height: '90%'}}
          resizeMode="contain"
          source={require('./../../images/irysc.png')}
        />
      </TouchableOpacity>
    </MyView>
  );
};

export default TopNavBar;
