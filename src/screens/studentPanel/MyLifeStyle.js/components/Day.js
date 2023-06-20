import {faAdd} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {removeItems} from '../../../../services/Utility';
import {PhoneView, SimpleText} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import {removeItemFromDay} from '../Utility';
import Box from './Box';

function Day(props) {
  const [boxes, setBoxes] = useState();

  React.useEffect(() => {
    setBoxes(props.boxes);
  }, [props.boxes]);

  return (
    <PhoneView style={{...styles.gap15, ...{flexWrap: 'nowrap'}}}>
      <PhoneView
        style={{
          backgroundColor: vars.DARK_BLUE,
          padding: 40,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          minWidth: 150,
        }}>
        <SimpleText
          text={
            props.date === undefined
              ? props.day
              : props.day + ' - ' + props.date
          }
          style={{fontSize: 18, color: 'white'}}
        />
      </PhoneView>
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
                  !props.canEdit
                    ? undefined
                    : async () => {
                        props.setLoading(true);
                        let res = await removeItemFromDay(
                          {
                            tag: e.tag,
                            day: props.day,
                          },
                          props.token,
                        );
                        props.setLoading(false);
                        if (res != null) {
                          removeItems(boxes, setBoxes, [e.id]);
                        }
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
