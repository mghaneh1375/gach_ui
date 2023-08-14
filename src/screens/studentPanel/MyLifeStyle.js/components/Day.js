import {faAdd} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {f2e, removeItems} from '../../../../services/Utility';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Box from './Box';

function Day(props) {
  const [boxes, setBoxes] = useState();
  const [sum, setSum] = useState();
  const [sumLife, setSumLife] = useState();

  React.useEffect(() => {
    setBoxes(
      props.boxes.sort((a, b) => {
        if (a.startAt === undefined || b.startAt === undefined) return 1;
        return (
          parseInt(a.startAt.replace(':', '')) -
          parseInt(b.startAt.replace(':', ''))
        );
      }),
    );
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
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          minHeight: 200,
          gap: 10,
        }}>
        <SimpleText
          text={
            props.date === undefined
              ? props.day
              : props.day + ' - ' + props.date
          }
          style={{fontSize: 18, color: 'white', writingMode: 'tb-rl'}}
        />
        {/* {sum !== undefined && sum !== 0 && (
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
        )} */}
        {/* {sumLife !== undefined && sumLife !== 0 && (
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
        )} */}
      </MyView>
      <View
        style={{
          flexWrap: 'nowrap',
          flexDirection: 'row',
          overflow: 'auto',
          maxWidth: props.canEdit
            ? props.isInPhone
              ? 'calc(100% - 120px)'
              : 'calc(100% - 260px)'
            : 'calc(100% - 100px)',
          gap: 20,
        }}>
        {boxes !== undefined &&
          boxes.map((e, index) => {
            if (
              e.advisor !== undefined &&
              props.selectedAdvisors !== undefined &&
              props.selectedAdvisors.find(ee => ee.name === e.advisor.name) ===
                undefined
            )
              return;
            return (
              <Box
                remove={
                  props.onRemove === undefined ||
                  e.owner === undefined ||
                  !e.owner ||
                  (e.canEdit !== undefined && !e.canEdit)
                    ? undefined
                    : () => {
                        props.onRemove(e, () =>
                          removeItems(boxes, setBoxes, [e.id]),
                        );
                      }
                }
                onDone={
                  props.onDone === undefined ||
                  (e.canEdit !== undefined && !e.canEdit)
                    ? undefined
                    : () => {
                        props.onDone(e);
                      }
                }
                key={index}
                item={e}
              />
            );
          })}
      </View>
      {props.canEdit && (
        <>
          {props.isInPhone && (
            <FontIcon
              onPress={() => props.addNewItem()}
              icon={faAdd}
              back={'blue'}
              kind={'large'}
              parentStyle={{marginRight: 'auto'}}
            />
          )}
          {!props.isInPhone && (
            <CommonWebBox width={200}>
              <MyView
                style={{
                  ...styles.justifyContentSpaceBetween,
                  ...{height: 160},
                }}>
                <FontIcon
                  onPress={() => props.addNewItem()}
                  icon={faAdd}
                  back={'blue'}
                  kind={'large'}
                  parentStyle={{marginRight: 'auto'}}
                />
                {!props.isInPhone && (
                  <SimpleText
                    onPress={() => props.addNewItem()}
                    text={'ایجاد برنامه جدید'}
                    style={{
                      ...styles.dark_blue_color,
                      ...styles.bold,
                      ...styles.cursor_pointer,
                    }}
                  />
                )}
              </MyView>
            </CommonWebBox>
          )}
        </>
      )}
    </PhoneView>
  );
}

export default Day;
