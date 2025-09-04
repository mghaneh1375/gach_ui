import {ProgressChart} from 'react-native-chart-kit';

function MyProgressChart(props) {
  return (
    <ProgressChart
      data={{
        labels: props.labels,
        data: props.data,
      }}
      width={300} // from react-native
      height={220}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      }}
      strokeWidth={16}
      radius={32}
      hideLegend={false}
      style={{
        marginVertical: 8,
        borderRadius: 16,
        fontFamily: 'IRANSans',
      }}
    />
  );
}

export default MyProgressChart;
