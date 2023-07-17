import {Slider} from '@material-ui/core';
import {formatPrice, getDevice} from '../../../services/Utility';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import commonTranslator from '../../../translator/Common';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';

import React, {useState} from 'react';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';

function Filter(props) {
  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  const [rate, setRate] = useState([1, 5]);
  const [value, setValue] = useState([props.min, props.max]);
  const [valueAge, setValueAge] = useState([props.minAge, props.maxAge]);

  const [tag, setTag] = useState();

  const rangeSelectorRate = (event, newValue) => {
    setRate(newValue);
  };

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  const rangeSelectorAge = (event, newValue) => {
    setValueAge(newValue);
  };

  const clear = React.useCallback(() => {
    setTag(undefined);
    setValue([props.min, props.max]);
    setValueAge([props.minAge, props.maxAge]);
    setRate([1, 5]);

    props.setClearFilter(false);
  }, [props]);

  React.useEffect(() => {
    if (props.clearFilter) clear();
  }, [props.clearFilter, clear]);

  const filter = async () => {
    let query = new URLSearchParams();

    if (tag !== undefined && tag !== 'all') query.append('tag', tag);

    if (value[0] !== undefined && props.min !== value[0])
      query.append('minPrice', value[0]);

    if (value[1] !== undefined && props.max !== value[1])
      query.append('maxPrice', value[1]);

    if (valueAge !== undefined && props.minAge !== valueAge[0])
      query.append('minAge', valueAge[0]);

    if (valueAge !== undefined && props.maxAge !== valueAge[1])
      query.append('maxAge', valueAge[1]);

    if (rate !== undefined && 1 !== rate[0]) query.append('minRate', rate[0]);

    if (rate !== undefined && 5 !== rate[1]) query.append('maxRate', rate[1]);

    if (sort !== undefined) query.append('sortBy', sort);

    query.append('returnFilters', false);

    props.setLoading(true);

    let res = await generalRequest(
      routes.getAllAdvisors + '?' + query.toString(),
      'get',
      undefined,
      'data',
      undefined,
    );

    props.setLoading(false);

    if (res != null) {
      props.setSelectableItems(res);
    }
  };

  const sortByValues = [
    {id: 'rate', item: 'امتیاز'},
    {id: 'student', item: 'دانش آموزان'},
    {id: 'age', item: 'سن'},
  ];

  const [sort, setSort] = useState();

  return (
    <MyView>
      <PhoneView style={{...styles.gap30}}>
        {props.max !== props.min && (
          <MyView style={{width: isInPhone ? 260 : 300}}>
            <SimpleText
              style={{...styles.alignSelfCenter}}
              text={'هزینه مشاوره'}
            />
            <Slider
              max={props.max}
              min={props.min}
              value={value}
              valueLabelDisplay={'off'}
              onChange={rangeSelector}
            />
            <EqualTwoTextInputs>
              <SimpleText
                text={formatPrice(value[1]) + ' ' + commonTranslator.priceUnit}
              />
              <SimpleText
                text={formatPrice(value[0]) + ' ' + commonTranslator.priceUnit}
              />
            </EqualTwoTextInputs>
          </MyView>
        )}
        {props.maxAge !== props.minAge && (
          <MyView style={{width: isInPhone ? 260 : 300}}>
            <SimpleText
              style={{...styles.alignSelfCenter}}
              text={'سن مشاوره'}
            />
            <Slider
              max={props.maxAge}
              min={props.minAge}
              value={valueAge}
              valueLabelDisplay={'off'}
              onChange={rangeSelectorAge}
            />
            <EqualTwoTextInputs>
              <SimpleText text={valueAge[1]} />
              <SimpleText text={valueAge[0]} />
            </EqualTwoTextInputs>
          </MyView>
        )}

        <MyView style={{width: isInPhone ? 260 : 150}}>
          <SimpleText
            style={{...styles.alignSelfCenter}}
            text={'امتیاز مشاور'}
          />
          <Slider
            max={5}
            min={1}
            value={rate}
            valueLabelDisplay={'off'}
            onChange={rangeSelectorRate}
          />
          <EqualTwoTextInputs>
            <SimpleText text={rate[1]} />
            <SimpleText text={rate[0]} />
          </EqualTwoTextInputs>
        </MyView>

        {props.tags !== undefined && props.tags.length > 0 && (
          <JustBottomBorderSelect
            values={props.tags}
            setter={setTag}
            value={
              tag === undefined
                ? undefined
                : props.tags.find(elem => elem.id === tag)
            }
            placeholder={'تگ'}
            subText={'تگ'}
          />
        )}

        <JustBottomBorderSelect
          values={sortByValues}
          setter={setSort}
          value={
            sort === undefined
              ? undefined
              : sortByValues.find(elem => elem.id === sort)
          }
          placeholder={'مرتب سازی بر اساس'}
          subText={'مرتب سازی بر اساس'}
        />
      </PhoneView>
      <CommonButton
        onPress={async () => {
          await filter();

          if (isInPhone) props.close();
        }}
        title={'اعمال فیلتر'}
      />
    </MyView>
  );
}

export default Filter;
