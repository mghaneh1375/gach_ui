import React, {useState} from 'react';
import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import Slider from '@material-ui/core/Slider';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {allTrueFalseValues} from '../../../../services/Utility';
import {styles} from '../../../../styles/Common/Styles';

function Filter(props) {
  const [value, setValue] = React.useState([props.min, props.max]);
  const [tag, setTag] = useState();
  const [hasCert, setHasCert] = useState();

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <MyView>
      <PhoneView style={{...styles.gap10}}>
        {props.min !== undefined && props.max !== props.min && (
          <PhoneView style={{width: 300}}>
            <Slider
              max={props.max}
              min={props.min}
              value={value}
              onChange={rangeSelector}
              valueLabelDisplay="auto"
            />
          </PhoneView>
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
          />
        )}
        <JustBottomBorderSelect
          values={allTrueFalseValues}
          setter={setHasCert}
          value={allTrueFalseValues.find(elem => elem.id === hasCert)}
          placeholder={'گواهی داشته باشد؟'}
        />
      </PhoneView>
      <CommonButton title={'اعمال فیلتر'} />
    </MyView>
  );
}

export default Filter;
