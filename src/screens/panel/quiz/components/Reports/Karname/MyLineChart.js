import {LineChart} from 'react-native-chart-kit';

function MyLineChart(props) {
  return (
    <LineChart
      data={{
        labels: props.labels,
        datasets: [
          {
            data: props.data,
          },
        ],
      }}
      width={props.width} // from react-native
      height={600}
      withVerticalLabels={true}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      xLabelsOffset={-10}
      yLabelsOffset={30}
      segments={10}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        fontFamily: 'IRANSans',
      }}
    />
  );
}

export default MyLineChart;
