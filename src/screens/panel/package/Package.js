import {View} from 'react-native';
import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
import {RoleCard} from '../../../styles/Common/RoleCard';
import {TextIcon} from '../../../styles/Common/TextIcon';

function Package() {
  return (
    <View>
      <CommonWebBox>
        <SimpleText text={'hello'} />
        <CommonWebBox text={'سلام'} width={514} style={{height: 300}}>
          <PhoneView
            style={{
              width: 443,
              height: 40,
              backgroundColor: '#FFEFCE',
              alignSelf: 'center',
              margin: 7,
              borderRadius: 5,
              alignItem: 'center',
              // boxShadow: '0 3 6',
            }}>
            <SimpleText
              style={{alignSelf: 'center', marginRight: 10}}
              text={'توضیحاتی به عنوان مثال'}
            />
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                position: 'absolute',
                backgroundColor: 'orange',
                left: 15,
                top: -10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SimpleText text={'% تا 30'}></SimpleText>
            </View>
          </PhoneView>
        </CommonWebBox>
      </CommonWebBox>
    </View>
  );
}

export default Package;
