import React, {useRef, useState} from 'react';
import {Image, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

import {
  MyScrollView,
  ScrollViewTextContainer,
  ScrollViewSubTitle,
  ScrollViewTitle,
  ScrollViewTitleAndroid,
  MyImage,
  ArrowStyleLeft,
  ArrowStyleRight,
} from '../styles/Common/ScrollView';
import {Device} from './../models/Device';
import {BlueTextInline, CommonButton, MyView} from '../styles/Common';
import {FontIcon, SimpleFontIcon} from '../styles/Common/FontIcon';

function BackgroundScrollView(props) {
  const [items, setItems] = useState();
  const [currentNode, setCurrentNode] = useState();
  const [active, setActive] = useState(0);

  React.useEffect(() => {
    const timeout = setTimeout(() => setActive((active + 1 + 3) % 3), 7000);

    return () => clearTimeout(timeout);
  }, [active]);

  React.useEffect(() => {
    if (items === undefined) return;
    setCurrentNode(items[active]);
  }, [active, items]);

  const isJustImage = props.isJustImage;

  const width = props.width - props.margins[0] - props.margins[2];
  const height = Number.isInteger(props.height)
    ? props.height - props.margins[1] - props.margins[3]
    : props.height;

  const isPhonePortSize =
    props.device.indexOf(Device.WebPort) !== -1 ||
    props.device.indexOf(Device.AppPort) !== -1;

  const widthImage =
    isJustImage || isPhonePortSize
      ? width
      : (width * (12 - props.textCol)) / 12;

  const widthText = isJustImage
    ? 0
    : isPhonePortSize
    ? width
    : (width * props.textCol) / 12;

  const imgHeight = props.imgHeight;

  React.useEffect(() => {
    if (items === undefined) return;
  }, [items]);

  const buildItems = React.useCallback(() => {
    let tmp = isJustImage
      ? props.images.map(i => (
          <Image key={i} source={i} style={{height, width}} />
        ))
      : props.images.map(i => (
          <MyScrollView
            isPhonePortSize={isPhonePortSize}
            key={i.idx}
            style={{height: height, width}}>
            <ScrollViewTextContainer style={{width: widthText}}>
              <Pressable style={ArrowStyleLeft}>
                <SimpleFontIcon
                  kind="full"
                  style={{color: 'white'}}
                  parentStyle={{padding: 5}}
                  onPress={() => setActive(active == 0 ? 2 : active - 1)}
                  icon={faAngleLeft}
                />
              </Pressable>
              <Pressable style={ArrowStyleRight}>
                <SimpleFontIcon
                  kind="full"
                  style={{color: 'white'}}
                  parentStyle={{padding: 5}}
                  onPress={() => setActive((active + 1 + 3) % 3)}
                  icon={faAngleRight}
                />
              </Pressable>

              <ScrollViewTitle isPhonePortSize={isPhonePortSize}>
                {i.title}
              </ScrollViewTitle>
              <ScrollViewSubTitle isPhonePortSize={isPhonePortSize}>
                {i.subTitle}
              </ScrollViewSubTitle>
              <BlueTextInline
                style={{fontSize: 16, marginTop: 10}}
                text={i.text}
              />
            </ScrollViewTextContainer>
            <Image
              source={i.src}
              resizeMode="contain"
              style={[MyImage, {width: widthImage, height: imgHeight}]}
            />
            <ScrollViewTitleAndroid isPhonePortSize={isPhonePortSize}>
              {i.title}
            </ScrollViewTitleAndroid>
          </MyScrollView>
        ));

    setItems(tmp);
  }, [
    isJustImage,
    props.images,
    imgHeight,
    height,
    isPhonePortSize,
    width,
    widthImage,
    widthText,
    active,
  ]);

  React.useEffect(() => {
    buildItems();
  }, [buildItems]);

  return (
    <MyView
      style={{
        marginLeft: props.margins[0],
        marginRight: props.margins[2],
        marginTop: props.margins[1],
        marginBottom: props.margins[3],
        overflow: 'hidden',
        minHeight: '80vh',
      }}>
      {currentNode !== undefined && <MyView>{currentNode}</MyView>}
    </MyView>
  );
}

export default BackgroundScrollView;
