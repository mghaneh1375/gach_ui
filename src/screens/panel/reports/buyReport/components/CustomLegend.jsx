import {formatPrice} from '@/services/utility';
import {SimpleText} from '@/styles';
import {StyleSheet, View} from 'react-native';

function CustomLegend({data}) {
  const styles = StyleSheet.create({
    legendContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 10,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 5,
      gap: '10px',
    },
    legendColor: {
      width: 20,
      height: 20,
      marginRight: 5,
    },
    legendText: {
      fontSize: 14,
      color: '#000',
    },
  });

  return (
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, {backgroundColor: item.color}]} />
          <SimpleText
            text={item.name + ' - ' + formatPrice(item.value)}
            style={styles.legendText}
          />
        </View>
      ))}
    </View>
  );
}

export default CustomLegend;
