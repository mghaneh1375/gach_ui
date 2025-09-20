import {View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import CustomLegend from './CustomLegend';

function DrawPieChart({data}) {
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <PieChart
          accessor="value"
          data={data}
          width={1000}
          height={300}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          hasLegend={false}
          backgroundColor="transparent"
          absolute
          style={{
            marginVertical: 8,
            borderRadius: 16,
            fontFamily: 'IRANSans',
          }}
        />
        <CustomLegend data={data} />
      </View>
    </>
  );
}

export default DrawPieChart;
