import React, {useRef, useState} from 'react';
import {Image} from 'react-native';
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
import {BlueTextInline, MyView} from '../styles/Common';

const delay = 7000;
const scrollable = 3;

function BackgroundScrollView(props) {
  const scrollView = useRef();
  const [items, setItems] = useState();

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

  const [scrollValue, setScrollValue] = useState();
  const [currentNode, setCurrentNode] = useState();

  // let calcScrollValue = React.useCallback(() => {
  //   if (scrollView === undefined || scrollView === null) return;

  //   if (scrollValue >= width * (scrollable - 1)) setScrollValue(0);
  //   else setScrollValue(scrollValue + width);
  // }, [scrollView, scrollValue, width]);

  // const _scroll_ = React.useCallback(() => {
  //   if (
  //     scrollView === undefined ||
  //     scrollView === null ||
  //     scrollView.current === undefined
  //   )
  //     return;
  //   console.log('scrollValue is ' + scrollValue);
  //   // console.log(scrollView.current);
  //   scrollView.current.scrollTo({x: scrollValue});
  // }, [scrollView, scrollValue]);

  let setCurrNod = React.useCallback(() => {
    if (items === undefined) return;

    setCurrentNode(items[scrollValue]);

    setTimeout(() => {
      setScrollValue(scrollValue === scrollable - 1 ? 0 : scrollValue + 1);
    }, delay);
  }, [items, scrollValue]);

  React.useEffect(() => {
    if (scrollValue === undefined) return;
    setCurrNod();
  }, [scrollValue, setCurrNod]);

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

    setItems(tmp);
    setScrollValue(0);
  }, [
    isJustImage,
    props.images,
    imgHeight,
    height,
    isPhonePortSize,
    width,
    widthImage,
    widthText,
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
      }}>
      {currentNode !== undefined && (
        <MyView>{currentNode}</MyView>
        // <ScrollView
        //   contentContainerStyle={{flexGrow: 1}}
        //   ref={scrollView}
        //   horizontal={true}
        //   scrollEnabled={false}
        //   style={{overflow: 'hidden'}}
        //   pagingEnabled={true}>
        //   {items}
        // </ScrollView>
      )}
    </MyView>
  );
}

export default BackgroundScrollView;
