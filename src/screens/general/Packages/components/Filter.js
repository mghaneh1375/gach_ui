import React, {useState} from 'react';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import Slider from '@material-ui/core/Slider';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {
  allTrueFalseValues,
  convertSecToMinWithOutSecAndDay,
  formatPrice,
  getDevice,
} from '../../../../services/Utility';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';
import {filter} from './Utility';
import {packagesContext, dispatchPackagesContext} from './Context';

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];

  const [state, dispatch] = useGlobalState();

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  const [value, setValue] = useState([props.min, props.max]);
  const [valueDuration, setValueDuration] = useState([
    props.minDuration,
    props.maxDuration,
  ]);

  const [tag, setTag] = useState();
  const [teacher, setTeacher] = useState();
  const [hasCert, setHasCert] = useState();

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  const rangeSelectorDuration = (event, newValue) => {
    setValueDuration(newValue);
  };

  const clear = React.useCallback(() => {
    setTag(undefined);
    setTeacher(undefined);
    setHasCert(undefined);
    setValue([props.min, props.max]);
    setValueDuration([props.minDuration, props.maxDuration]);

    props.setClearFilter(false);
  }, [props]);

  React.useEffect(() => {
    clear();
  }, [props.clearFilter, clear]);

  return (
    <MyView>
      <PhoneView style={{...styles.gap30}}>
        {props.max !== props.min && (
          <MyView style={{width: isInPhone ? 260 : 300}}>
            <SimpleText
              style={{...styles.alignSelfCenter}}
              text={'هزینه دوره'}
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
        {props.maxDuration !== props.minDuration && (
          <MyView style={{width: isInPhone ? 260 : 300}}>
            <SimpleText style={{...styles.alignSelfCenter}} text={'مدت دوره'} />
            <Slider
              max={props.maxDuration}
              min={props.minDuration}
              value={valueDuration}
              valueLabelDisplay={'off'}
              onChange={rangeSelectorDuration}
            />
            <EqualTwoTextInputs>
              <SimpleText
                text={convertSecToMinWithOutSecAndDay(valueDuration[1])}
              />
              <SimpleText
                text={convertSecToMinWithOutSecAndDay(valueDuration[0])}
              />
            </EqualTwoTextInputs>
          </MyView>
        )}
        {props.tags !== undefined && props.tags.length > 0 && (
          <JustBottomBorderSelect
            values={props.tags}
            setter={setTag}
            value={
              tag === undefined
                ? undefined
                : props.tags.find(elem => elem.id === tag)
            }
            placeholder={'موضوع'}
            subText={'موضوع'}
          />
        )}
        {props.teachers !== undefined && props.teachers.length > 0 && (
          <JustBottomBorderSelect
            values={props.teachers}
            setter={setTeacher}
            value={
              teacher === undefined
                ? undefined
                : props.teachers.find(elem => elem.id === teacher)
            }
            placeholder={'استاد'}
            subText={'استاد'}
          />
        )}
        <JustBottomBorderSelect
          values={allTrueFalseValues}
          setter={setHasCert}
          value={allTrueFalseValues.find(elem => elem.id === hasCert)}
          placeholder={'گواهی داشته باشد؟'}
          subText={'گواهی داشته باشد؟'}
        />
      </PhoneView>
      <CommonButton
        onPress={async () => {
          let res = await filter(
            tag,
            teacher,
            value[0],
            value[1],
            valueDuration[0],
            valueDuration[1],
            hasCert,
            props.token,
          );
          dispatch({
            selectableItems: res,
          });
          if (isInPhone) props.close();
        }}
        title={'اعمال فیلتر'}
      />
    </MyView>
  );
}

export default Filter;
