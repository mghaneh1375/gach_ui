import React, {useState, useEffect} from 'react';
import {faClock, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {
  convertSecToMinWithOutHour,
  getDevice,
} from '../../../../../services/Utility';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {styles} from '../../../../../styles/Common/Styles';
import Video from '../../../../panel/Video';

function SessionDetail(props) {
  const isInPhone = getDevice().indexOf('WebPort') !== -1;
  const [showAdvertising, setShowAdvertising] = useState(true);

  return (
    <MyView>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.toggleShow()}
        btn={
          <PhoneView style={styles.gap15}>
            {props.session.attachesCount !== undefined &&
              props.session.attachesCount > 0 && (
                <PhoneView style={{...styles.gap5, ...styles.marginLeft15}}>
                  <SimpleFontIcon kind={'med'} icon={faPaperclip} />
                  <SimpleText
                    style={styles.alignSelfCenter}
                    text={props.session.attachesCount}
                  />
                </PhoneView>
              )}
            <SimpleFontIcon kind={'med'} icon={faClock} />
            <SimpleText
              style={styles.alignSelfCenter}
              text={convertSecToMinWithOutHour(props.session.duration) + '"'}
            />
          </PhoneView>
        }
        header={props.session.title}></CommonWebBox>
      <PhoneView>
        <CommonWebBox width={isInPhone ? '100%' : '70%'}>
          {showAdvertising && (
            <Video
              onFinish={() => setShowAdvertising(false)}
              disableSeekbar={true}
              src={props.adv}
            />
          )}
          {!showAdvertising && (
            <Video disableSeekbar={false} src={props.session.video} />
          )}
        </CommonWebBox>
      </PhoneView>
    </MyView>
  );
}

export default SessionDetail;
