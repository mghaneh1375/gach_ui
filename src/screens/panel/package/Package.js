import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {Button} from '../../../styles/Common/Button';
import {RoleCard} from '../../../styles/Common/RoleCard';
import {TinyTextIcon} from '../../../styles/Common/TextIcon';
import {CommonButtonTextStyleWeb} from '../../../styles/Common/Button';

function Package() {
  return (
    <View>
      <CommonWebBox>
        <SimpleText text={'اینچااااااااااا چه خبره'} />
        <CommonWebBox text={'سلام'} width={514} style={{height: 300}}>
          <View
            style={{
              width: 443,
              height: 40,
              backgroundColor: '#FFEFCE',
              alignSelf: 'center',
              margin: 7,
              borderRadius: 5,
              alignItems: 'center',
              // boxShadow: '0 3 6',
            }}>
            <SimpleText
              style={{
                width: '80%',
                height: 40,
                display: 'flex',
                alignItems: 'center',
                marginRight: 0,
              }}
              text={'توضیحاتی به عنوان مثال'}
            />
          </View>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              position: 'absolute',
              backgroundColor: 'orange',
              left: 50,
              top: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <SimpleText text={'% تا 30'}></SimpleText>
          </View>
          <View
            style={{
              width: 325,
              height: 55,
              marginRight: 40,
            }}>
            <SimpleText style={{fontSize: 13}} text="پایه تحصیلی : دبیرستان" />
            <SimpleText style={{fontSize: 13}} text="درس : فارسی" />
          </View>
          <View style={{width: '90%', height: 40, margin: '0 auto 0 auto'}}>
            <PhoneView style={{justifyContent: 'space-around'}}>
              <View>
                <TinyTextIcon style={{right: -50, top: 26}} />
                <SimpleText style={{fontSize: 11}} text={'مدت زمان'} />
                <SimpleText style={{fontSize: 15}} text={'25 دقیقه'} />
              </View>
              <View>
                <TinyTextIcon style={{right: -50, top: 26}} />
                <SimpleText style={{fontSize: 11}} text={'تعداد سوال'} />
                <SimpleText style={{fontSize: 15}} text={'7000'} />
              </View>
              <View>
                <TinyTextIcon style={{right: -50, top: 26}} />
                <SimpleText style={{fontSize: 11}} text={'درجه سختی'} />
                <SimpleText style={{fontSize: 15}} text={'بسیار دشوار'} />
              </View>
            </PhoneView>
          </View>
          <View style={{width: '90%', height: 40, margin: '0 auto 0 auto'}}>
            <PhoneView style={{justifyContent: 'space-around', marginTop: 15}}>
              <View>
                <TinyTextIcon style={{right: -50, top: 26}} />
                <SimpleText style={{fontSize: 11}} text={'مدت زمان'} />
                <SimpleText style={{fontSize: 15}} text={'25 دقیقه'} />
              </View>
              <View>
                <TinyTextIcon style={{right: -50, top: 26}} />
                <SimpleText style={{fontSize: 11}} text={'تعداد سوال'} />
                <SimpleText style={{fontSize: 15}} text={'7000'} />
              </View>
              <View>
                <TinyTextIcon style={{right: -50, top: 26}} />
                <SimpleText style={{fontSize: 11}} text={'درجه سختی'} />
                <SimpleText style={{fontSize: 15}} text={'بسیار دشوار'} />
              </View>
            </PhoneView>
          </View>
          <View>
            <PhoneView
              style={{
                marginTop: 40,
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <SimpleText text="تومان 30.000     10.000" />
              <CommonButton title={'شرکت در پکیج'} />
            </PhoneView>
          </View>
        </CommonWebBox>
      </CommonWebBox>
    </View>
  );
}

export default Package;
