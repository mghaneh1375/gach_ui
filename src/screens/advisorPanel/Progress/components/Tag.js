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
import vars from '../../../../styles/root';
import {styles} from '../../../../styles/Common/Styles';

function Tag(props) {
  return (
    <CommonWebBox header={props.header}>
      <EqualTwoTextInputs>
        <MyView>
          {props.header === undefined && (
            <SimpleText text={props.data.tag} style={{...styles.margin15}} />
          )}

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
              text={
                props.isForTest === undefined
                  ? 'زمان تعریف شده (دقیقه)'
                  : 'تعداد تست تعریف شده'
              }
            />
            <SimpleText
              style={{color: 'white', width: props.isInPhone ? 100 : 150}}
              text={
                props.isForTest === undefined
                  ? 'زمان انجام شده (دقیقه)'
                  : 'تعداد تست انجام شده'
              }
            />
          </PhoneView>
          {props.data.total.map((e, index) => {
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
                    width: props.isInPhone ? 100 : 150,
                    textAlign: 'center',
                  }}
                  text={e}
                />

                <SimpleText
                  style={{
                    color: vars.DARK_BLUE,
                    width: props.isInPhone ? 100 : 150,
                    textAlign: 'center',
                  }}
                  text={props.data.done[index]}
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
                    Math.min.apply(Math, props.data.total),
                    Math.min.apply(Math, props.data.done),
                  ) - 10,
                  Math.max(
                    Math.max.apply(Math, props.data.total),
                    Math.max.apply(Math, props.data.done),
                  ) + 100,
                ],
              }}
              data={[0, ...props.data.total]}
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
              data={[0, ...props.data.done]}
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
    </CommonWebBox>
  );
}

export default Tag;
