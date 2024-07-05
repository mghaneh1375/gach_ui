import {faClose} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {BigBoldBlueText, MyView, PhoneView} from '../../../styles/Common';
import {FontIcon} from '../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import {fetchRankingList} from './Utility';

function Filter(props) {
  const [grade, setGrade] = useState();

  const setSelectedGrade = async item => {
    if (item === undefined) return;
    setGrade(item);
    props.setLoading(true);
    let res = await fetchRankingList(item.id);
    props.setLoading(false);
    if (res !== null) {
      props.setUseFilter(true);
      props.setData(res);
    }
  };

  const removeFilter = async () => {
    if (!props.useFilter) return;

    setGrade(undefined);
    props.setLoading(true);
    let res = await fetchRankingList();
    props.setLoading(false);
    if (res !== null) {
      props.setUseFilter(false);
      props.setData(res);
    }
  };

  return (
    <MyView>
      <PhoneView style={{gap: 15}}>
        <BigBoldBlueText text={'رتبه‌های برتر'} />
        <JustBottomBorderTextInput
          isHalf={true}
          placeholder={'بر اساس پایه تحصیلی'}
          resultPane={true}
          setSelectedItem={setSelectedGrade}
          values={props.grades}
          value={grade !== undefined ? grade.name : ''}
          reset={false}
        />
        <FontIcon
          onPress={() => removeFilter()}
          icon={faClose}
          kind={'full'}
          parentStyle={{
            width: 25,
            height: 25,
            alignSelf: 'center',
            marginTop: 8,
            marginRight: -40,
          }}
        />
      </PhoneView>
    </MyView>
  );
}

export default Filter;
