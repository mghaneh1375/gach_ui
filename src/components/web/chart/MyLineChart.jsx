import {LineChart} from 'react-native-chart-kit';

function MyLineChart({labels, data, width, height}) {
  return (
    <>
      {labels && data && (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={width} // from react-native
          height={height}
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
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            fontFamily: 'IRANSans',
          }}
        />
      )}
    </>
  );
}

export default MyLineChart;
