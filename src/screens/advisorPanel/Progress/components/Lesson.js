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
import vars from '../../../../styles/root';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';

function Lesson(props) {
  const [selectedTagReport, setSelectedTagReport] = useState();
  const [tagReports, setTagReports] = useState();

  React.useEffect(() => {
    if (props.data?.tags === undefined) return;

    setTagReports(
      props.data?.tags.map(e => {
        return {
          id: e.tag,
          item: e.tag,
        };
      }),
    );
  }, [props.data?.tags]);

  return (
    <CommonWebBox header={props.data.lesson}>
      <EqualTwoTextInputs>
        <MyView>
          <PhoneView
            style={{gap: 5, padding: 7, backgroundColor: vars.DARK_BLUE}}>
            <SimpleText
              text={'تاریخ'}
              style={{
                color: 'white',
                width: props.isInPhone ? 100 : 120,
                textAlign: 'center',
              }}
            />
            <SimpleText
              style={{color: 'white', width: props.isInPhone ? 100 : 150}}
              text={'زمان تعریف شده (دقیقه)'}
            />
            <SimpleText
              style={{color: 'white', width: props.isInPhone ? 100 : 150}}
              text={'زمان انجام شده (دقیقه)'}
            />
          </PhoneView>
          {props.data.totalStats.map((e, index) => {
            return (
              <PhoneView
                style={{
                  gap: 5,
                  padding: 7,
                  backgroundColor:
                    index % 2 == 0 ? 'white' : 'rgb(138 168 160)',
                }}>
                <SimpleText
                  style={{
                    color: vars.DARK_BLUE,
                    width: props.isInPhone ? 100 : 120,
                    textAlign: 'center',
                  }}
                  text={props.weeks[index]}
                />
                <SimpleText
                  style={{
                    color: vars.DARK_BLUE,
                    width: props.isInPhone ? 100 : 120,
                    textAlign: 'center',
                  }}
                  text={e}
                />
                <SimpleText
                  style={{
                    color: vars.DARK_BLUE,
                    width: props.isInPhone ? 100 : 120,
                    textAlign: 'center',
                  }}
                  text={props.data.doneStats[index]}
                />
              </PhoneView>
            );
          })}
        </MyView>
        <MyView style={{width: props.isInPhone ? '100%' : 500}}>
          <VictoryChart height={300} width={350} theme={VictoryTheme.material}>
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

      <MyView
        style={{marginBottom: selectedTagReport === undefined ? 200 : 10}}>
        <SimpleText style={{...styles.BlueBold}} text={'آمار بر اساس تگ ها'} />
        {tagReports !== undefined && (
          <JustBottomBorderSelect
            isHalf={!props.isInPhone}
            values={tagReports}
            setter={setSelectedTagReport}
            value={tagReports.find(e => e.id === selectedTagReport)}
            placeholder={'تگ موردنظر'}
            subText={'تگ موردنظر'}
          />
        )}
      </MyView>

      {props.data.tags !== undefined &&
        props.data.tags.map((e, index) => {
          if (e.tag !== selectedTagReport) return;
          return (
            <Tag
              isInPhone={props.isInPhone}
              weeks={props.weeks}
              data={e}
              key={index}
            />
          );
        })}
    </CommonWebBox>
  );
}

export default Lesson;
