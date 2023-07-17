import React, {useState} from 'react';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {
  VictoryLine,
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
} from 'victory-native';
import Tag from './Tag';
import {styles} from '../../../../styles/Common/Styles';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {
  faAngleDown,
  faAngleUp,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

function Lesson(props) {
  const [showPane, setShowPane] = useState(true);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <CommonWebBox
      btn={
        <PhoneView>
          <SimpleFontIcon
            style={{cursor: 'pointer'}}
            icon={showPane ? faAngleDown : faAngleUp}
            kind={'normal'}
            onPress={() => setShowPane(!showPane)}
          />
          <SimpleFontIcon
            style={{cursor: 'pointer'}}
            icon={faInfo}
            kind={'normal'}
            onPress={() => setShowDetail(!showDetail)}
          />
        </PhoneView>
      }
      header={props.data.lesson}>
      {showPane && (
        <EqualTwoTextInputs>
          <MyView>
            {props.data.totalStats.map((e, index) => {
              return (
                <PhoneView style={{gap: 30}}>
                  <SimpleText text={props.weeks[index]} />
                  <SimpleText
                    text={
                      'زمان انجام شده: ' +
                      props.data.doneStats[index] +
                      ' دقیقه'
                    }
                  />
                  <SimpleText text={'زمان تعریف شده: ' + e + ' دقیقه'} />
                </PhoneView>
              );
            })}
          </MyView>
          <MyView style={{width: 500}}>
            <VictoryChart
              height={300}
              width={350}
              theme={VictoryTheme.material}>
              <VictoryLine
                categories={{
                  x: props.weeks,
                }}
                style={{
                  data: {
                    stroke: '#c43a31',
                    strokeWidth: ({data}) => 1,
                  },
                }}
                domain={{
                  y: [
                    Math.min(
                      Math.min.apply(Math, props.data.totalStats),
                      Math.min.apply(Math, props.data.doneStats),
                    ) - 10,
                    Math.max(
                      Math.max.apply(Math, props.data.totalStats),
                      Math.max.apply(Math, props.data.doneStats),
                    ) + 100,
                  ],
                }}
                data={[0, ...props.data.totalStats]}
              />
              <VictoryLine
                categories={{
                  x: props.weeks,
                }}
                style={{
                  data: {
                    stroke: '#777777',
                    strokeWidth: ({data}) => 1,
                  },
                }}
                data={[0, ...props.data.doneStats]}
              />
              <VictoryAxis
                style={{
                  tickLabels: {
                    fontFamily: 'IRANSans',
                    fontSize: 8,
                    // dy: 10,
                    // dx: 20,
                  },
                  axisLabel: {
                    fontFamily: 'IRANSans',
                    fontSize: 8,
                    // dy: 10,
                    // dx: 20,
                  },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={x => x}
                style={{
                  tickLabels: {
                    fontFamily: 'IRANSans',
                    fontSize: 10,
                    dx: -10,
                  },
                  axisLabel: {
                    fontFamily: 'IRANSans',
                    fontSize: 10,
                    dx: -10,
                  },
                }}
              />
            </VictoryChart>
          </MyView>
        </EqualTwoTextInputs>
      )}
      {showDetail && (
        <>
          <SimpleText
            style={{...styles.BlueBold}}
            text={'آمار بر اساس تگ های مطالعه'}
          />
          <PhoneView style={{gap: 20}}>
            {props.data.tags !== undefined &&
              props.data.tags.map((e, index) => {
                return <Tag weeks={props.weeks} data={e} key={index} />;
              })}
          </PhoneView>
        </>
      )}
    </CommonWebBox>
  );
}

export default Lesson;
