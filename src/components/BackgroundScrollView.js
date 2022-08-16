import React, {useRef, useState} from 'react';
import {ScrollView, Image, InteractionManager} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

import {
  MyScrollView,
  ScrollViewTextContainer,
  ScrollViewSubTitle,
  ScrollViewTitle,
  ScrollViewTitleAndroid,
  ScrollViewText,
  MyImage,
  ArrowStyleLeft,
  ArrowStyleRight,
} from '../styles/Common/ScrollView';
import {Device} from './../models/Device';
import {BlueTextInline, MyView} from '../styles/Common';

const delay = 7000;
const scrollable = 3;

function BackgroundScrollView(props) {
  const scrollView = useRef();

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

  const [scrollValue, setScrollValue] = useState(0);

  let calcScrollValue = React.useCallback(() => {
    if (
      scrollView === undefined ||
      scrollView === null ||
      scrollable === undefined ||
      scrollValue === undefined
    )
      return;

    if (scrollValue >= width * (scrollable - 1)) setScrollValue(0);
    else setScrollValue(scrollValue + width);
  }, [scrollView, scrollValue, width]);

  const _scroll_ = React.useCallback(() => {
    if (scrollView === undefined || scrollView === null) return;
    scrollView.current.scrollTo({x: scrollValue});
  }, [scrollView, scrollValue]);

  React.useEffect(() => {
    console.log(scrollValue);
    _scroll_();
    setTimeout(() => {
      calcScrollValue();
    }, delay);
  }, [scrollValue, calcScrollValue, _scroll_]);

  const items = isJustImage
    ? props.images.map(i => (
        <Image key={i} source={i} style={{height, width}} />
      ))
    : props.images.map(i => (
        <MyScrollView
          isPhonePortSize={isPhonePortSize}
          key={i.idx}
          style={{height: height, width}}>
          <ScrollViewTextContainer style={{width: widthText}}>
            <FontAwesomeIcon icon={faAngleLeft} style={ArrowStyleLeft} />
            <FontAwesomeIcon icon={faAngleRight} style={ArrowStyleRight} />
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

  return (
    <MyView
      style={{
        marginLeft: props.margins[0],
        marginRight: props.margins[2],
        marginTop: props.margins[1],
        marginBottom: props.margins[3],
        overflow: 'hidden',
      }}>
      <ScrollView
        ref={scrollView}
        horizontal={true}
        scrollEnabled={false}
        style={{overflow: 'hidden'}}
        pagingEnabled={true}>
        {items}
      </ScrollView>
    </MyView>
  );
}

export default BackgroundScrollView;
