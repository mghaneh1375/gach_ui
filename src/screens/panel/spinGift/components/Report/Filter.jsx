import React, {useState} from 'react';
import {CommonButton, MyView, PhoneView} from '@/styles';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker.jsx';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import {styles} from '@/styles/common/styles';
import {filter} from './utility';
function Filter(props) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [gift, setGift] = useState();
  const [repeat, setRepeat] = useState();
  const search = async () => {
    props.setLoading(true);
    const res = await filter(props.token, from, to, gift, repeat);
    props.setLoading(false);
    if (res !== null) props.setUsers(res.data);
  };
  const repeatKeyVals = [
    {
      id: 'first',
      item: 'اول',
    },
    {
      id: 'second',
      item: 'دوم',
    },
    {
      id: 'third',
      item: 'سوم',
    },
    {
      id: 'forth',
      item: 'چهارم',
    },
    {
      id: 'fifth',
      item: 'پنجم',
    },
  ];
  return (
    <MyView>
      <PhoneView
        style={{
          ...styles.gap15,
        }}>
        <JustBottomBorderDatePicker
          placeholder={'از'}
          subText={'از'}
          setter={setFrom}
          value={from}
        />
        <JustBottomBorderDatePicker
          placeholder={'تا'}
          subText={'تا'}
          setter={setTo}
          value={to}
        />
        <JustBottomBorderSelect
          placeholder={'مرتبه'}
          subText={'مرتبه'}
          setter={setRepeat}
          values={repeatKeyVals}
          value={
            repeat === undefined
              ? undefined
              : repeatKeyVals.find(elem => {
                  return elem.id === repeat;
                })
          }
        />
        {props.gifts !== undefined && (
          <JustBottomBorderSelect
            subText={'جایزه موردنظر'}
            placeholder={'جایزه موردنظر'}
            setter={setGift}
            value={
              gift === undefined
                ? undefined
                : props.gifts.find(elem => {
                    return elem.id === gift;
                  })
            }
            values={props.gifts}
          />
        )}
      </PhoneView>

      <CommonButton
        onPress={() => search()}
        theme={'dark'}
        title={'اعمال فیلتر'}
      />
    </MyView>
  );
}
export default Filter;
