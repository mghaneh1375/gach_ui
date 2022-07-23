import {View} from 'react-native';
import {PhoneView} from '../../../../../styles/Common';
import Card from '../../card/Card';

function List(props) {
  return (
    <View>
      <PhoneView style={{flexWrap: 'wrap'}}>
        {props.packages !== undefined &&
          props.packages.map((package_, index) => {
            return (
              <Card isAdmin={props.isAdmin} key={index} package={package_} />
            );
          })}
      </PhoneView>
    </View>
  );
}

export default List;
