import {faAdd} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  convertSecToMinWithOutSec,
  f2e,
  removeItems,
} from '../../../../services/Utility';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Box from './Box';

function Day(props) {
  const [boxes, setBoxes] = useState();
  const [sum, setSum] = useState();
  const [sumLife, setSumLife] = useState();

  React.useEffect(() => {
    setBoxes(props.boxes);
    let lifeSum = 0;
    let scheduleSum = 0;

    props.boxes.forEach(e => {
      if (e.label !== undefined && e.label === 'life')
        lifeSum += parseInt(f2e(e.duration));
      else scheduleSum += parseInt(f2e(e.duration));
    });
    setSumLife(lifeSum);
    setSum(scheduleSum);
  }, [props.boxes]);

  return (
    <PhoneView style={{...styles.gap15, ...{flexWrap: 'nowrap'}}}>
      <MyView
        style={{
          backgroundColor: vars.DARK_BLUE,
          padding: 40,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          minWidth: 150,
          gap: 10,
        }}>
        <SimpleText
          text={
            props.date === undefined
              ? props.day
              : props.day + ' - ' + props.date
          }
          style={{fontSize: 18, color: 'white'}}
        />
        {sum !== undefined && sum !== 0 && (
          <SimpleText
            style={{
              fontSize: 12,
              color: 'white',
              maxWidth: 120,
              textAlign: 'center',
            }}
            text={
              'مجموع ساعات برنامه ریزی شده: ' +
              convertSecToMinWithOutSec(sum * 60)
            }
          />
        )}
        {sumLife !== undefined && sumLife !== 0 && (
          <SimpleText
            style={{
              fontSize: 12,
              color: 'white',
              maxWidth: 120,
              textAlign: 'center',
            }}
            text={
              'مجموع ساعات برنامه روزانه ثابت دانش آموز: ' +
              convertSecToMinWithOutSec(sumLife * 60)
            }
          />
        )}
      </MyView>
      <View
        style={{
          flexWrap: 'nowrap',
          flexDirection: 'row',
          overflow: 'auto',
          maxWidth: 'calc(100% - 300px)',
          gap: 20,
        }}>
        {boxes !== undefined &&
          boxes.map((e, index) => {
            return (
              <Box
                remove={
                  props.onRemove === undefined ||
                  (e.canEdit !== undefined && !e.canEdit)
                    ? undefined
                    : () => {
                        props.onRemove(e, () =>
                          removeItems(boxes, setBoxes, [e.id]),
                        );
                      }
                }
                key={index}
                item={e}
              />
            );
          })}
      </View>
      {props.canEdit && (
        <PhoneView
          style={{
            border: '1px dashed',
            width: 110,
            justifyContent: 'center',
          }}>
          <SimpleFontIcon
            onPress={() => props.addNewItem()}
            icon={faAdd}
            kind={'large'}
            style={{color: vars.ORANGE_RED, cursor: 'pointer'}}
          />
        </PhoneView>
      )}
    </PhoneView>
  );
}

export default Day;
