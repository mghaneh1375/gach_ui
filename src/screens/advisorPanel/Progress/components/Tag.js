import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {
  VictoryLine,
  VictoryTheme,
  VictoryChart,
  VictoryAxis,
} from 'victory-native';

function Tag(props) {
  return (
    <MyView style={{width: 500, border: '1px solid', padding: 5}}>
      <SimpleText text={props.data.tag} />
      <MyView>
        {props.data.total.map((e, index) => {
          return (
            <PhoneView style={{gap: 30}}>
              <SimpleText text={props.weeks[index]} />
              {props.isForTest === undefined && (
                <SimpleText
                  text={'زمان انجام شده: ' + props.data.done[index] + ' دقیقه'}
                />
              )}
              {props.isForTest !== undefined && (
                <SimpleText
                  text={'تعداد تست انجام شده: ' + props.data.done[index]}
                />
              )}
              {props.isForTest === undefined && (
                <SimpleText text={'زمان تعریف شده: ' + e + ' دقیقه'} />
              )}

              {props.isForTest !== undefined && (
                <SimpleText text={'تعداد تست تعریف شده: ' + e} />
              )}
            </PhoneView>
          );
        })}
      </MyView>
      <MyView style={{width: 500}}>
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
    </MyView>
  );
}

export default Tag;
