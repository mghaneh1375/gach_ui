import {View} from 'react-native';
import {CommonButton, CommonWebBox} from '../Common';
import translator from '../../tranlates/Common';
import {TextIcon} from './TextIcon';
import {faClose} from '@fortawesome/free-solid-svg-icons';

const modal = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(230,230,230,0.8)',
    height: '100vh',
    top: 0,
    left: 0,
    width: 'calc(100% + 200px)',
    position: 'absolute',
    zIndex: 2,
  },
  box: {
    position: 'absolute',
    left: 0,
    right: 200,
    top: 30,
  },
};

export const LargePopUp = props => {
  return (
    <View style={modal.container}>
      <CommonWebBox
        style={modal.box}
        child={
          <View>
            <TextIcon
              onPress={() => props.toggleShowPopUp()}
              text={props.title}
              icon={faClose}
            />
            {props.child}
            <View style={{flexDirection: 'row', marginTop: 20}}>
              {props.btns}
              <CommonButton
                onPress={() => props.toggleShowPopUp()}
                title={translator.cancel}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};
