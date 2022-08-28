import {faExpand} from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-native';
import {
  CommonRadioButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import Bookmark from './Bookmark';

function Question(props) {
  return (
    <MyView>
      <Bookmark />
      <CommonWebBox header={Translate.description} style={{padding: 15}}>
        <Image
          style={{
            width: '100%',
            height: 200,
            ...styles.boxShadow,
            borderRadius: 5,
          }}
          source={require('./../../../images/slider.jpg')}></Image>
        <FontIcon
          icon={faExpand}
          style={{
            ...styles.colorOrange,
            position: 'absolute',
            bottom: 20,
            left: 15,
          }}
        />
      </CommonWebBox>
      <CommonWebBox header={Translate.res}>
        <MyView>
          <PhoneView
            style={{
              ...styles.gap50,
            }}>
            <PhoneView
              style={{
                ...styles.justifyContentCenter,
                ...styles.alignItemsCenter,
              }}>
              <CommonRadioButton />
              <SimpleText text={Translate.frist} />
            </PhoneView>
            <PhoneView
              style={{
                ...styles.justifyContentCenter,
                ...styles.alignItemsCenter,
              }}>
              <CommonRadioButton />
              <SimpleText text={Translate.two} />
            </PhoneView>
            <PhoneView
              style={{
                ...styles.justifyContentCenter,
                ...styles.alignItemsCenter,
              }}>
              <CommonRadioButton />
              <SimpleText text={Translate.three} />
            </PhoneView>
            <PhoneView
              style={{
                ...styles.justifyContentCenter,
                ...styles.alignItemsCenter,
              }}>
              <CommonRadioButton />
              <SimpleText text={Translate.four} />
            </PhoneView>
            <PhoneView
              style={{
                ...styles.justifyContentCenter,
                ...styles.alignItemsCenter,
              }}>
              <CommonRadioButton />
              <SimpleText text={Translate.five} />
            </PhoneView>
          </PhoneView>
          <CommonTextInput
            placeholder={Translate.resInput}
            subText={Translate.resInput}
            // value={title}
            // onChangeText={e => changeText(e, setTitle)}
            parentStyle={{width: '100%'}}
            style={{backgroundColor: '#efefef', border: 0}}
          />
          <CommonTextInput
            multiline={true}
            placeholder={Translate.resInput}
            subText={Translate.resInput}
            //   value={desc}
            //   onChangeText={text => setDesc(text)}
            parentStyle={{width: '100%'}}
            style={{
              height: 200,
              maxWidth: '100%',
              backgroundColor: '#efefef',
              border: 0,
            }}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}

export default Question;
