import React, {Component} from 'react';
import {View, ScrollView, Image, InteractionManager} from 'react-native';
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
} from '../styles/ScrollView';
import {Device} from './../models/Device';
import fontawesome from '@fortawesome/fontawesome';

var _scrollView;

class BackgroundScrollView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let scrollValue = 0;

    InteractionManager.runAfterInteractions(() => {
      const width = this.props.width;
      const scrollable = this.props.scrollable - 1;
      const scrollDelay = this.props.scrollDelay;
      // setInterval(function () {
      //   if (scrollValue >= width * scrollable) scrollValue = 0;
      //   else scrollValue = scrollValue + width; // width = screen width
      //   _scrollView.scrollTo({x: scrollValue});
      // }, scrollDelay);
    });
  }

  render() {
    const isJustImage = this.props.isJustImage;

    const width =
      this.props.width - this.props.margins[0] - this.props.margins[2];

    const height = Number.isInteger(this.props.height)
      ? this.props.height - this.props.margins[1] - this.props.margins[3]
      : this.props.height;

    const device = this.props.device;

    const widthImage =
      isJustImage || device === Device.PhonePort
        ? width
        : (width * (12 - this.props.textCol)) / 12;

    const widthText = isJustImage
      ? 0
      : device === Device.PhonePort
      ? width
      : (width * this.props.textCol) / 12;

    const imgHeight = this.props.imgHeight;

    const items = isJustImage
      ? this.props.images.map(i => (
          <Image key={i} source={i} style={{height, width}} />
        ))
      : this.props.images.map(i => (
          <MyScrollView
            device={device}
            key={i.idx}
            style={{height: height, width}}>
            <ScrollViewTextContainer style={{width: widthText}}>
              <FontAwesomeIcon icon={faAngleLeft} style={ArrowStyleLeft} />
              <FontAwesomeIcon icon={faAngleRight} style={ArrowStyleRight} />
              <ScrollViewTitle device={device}>{i.title}</ScrollViewTitle>
              <ScrollViewSubTitle device={device}>
                {i.subTitle}
              </ScrollViewSubTitle>
              <ScrollViewText>{i.text}</ScrollViewText>
            </ScrollViewTextContainer>
            <Image
              source={i.src}
              style={[MyImage, {width: widthImage, height: imgHeight}]}
            />
            <ScrollViewTitleAndroid device={device}>
              {i.title}
            </ScrollViewTitleAndroid>
          </MyScrollView>
        ));

    return (
      <View
        style={{
          marginLeft: this.props.margins[0],
          marginRight: this.props.margins[2],
          marginTop: this.props.margins[1],
          marginBottom: this.props.margins[3],
          overflow: 'hidden',
        }}>
        <ScrollView
          ref={ref => (_scrollView = ref)}
          horizontal={true}
          scrollEnabled={false}
          style={{overflow: 'hidden'}}
          pagingEnabled={true}>
          {items}
        </ScrollView>
      </View>
    );
  }
}

export default BackgroundScrollView;
