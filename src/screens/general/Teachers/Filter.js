import {Slider} from '@material-ui/core';
import {getDevice} from '../../../services/Utility';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';

import React, {useMemo, useState} from 'react';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';

function Filter(props) {
  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  const [rate, setRate] = useState([1, 5]);
  const [valueAge, setValueAge] = useState([props.minAge, props.maxAge]);
  const [justHasFreeSchedule, setJustHasFreeSchedule] = useState('all');
  const [wantedGrade, setWantedGrade] = useState();
  const [wantedBranch, setWantedBranch] = useState();
  const [wantedLesson, setWantedLesson] = useState();

  const [tag, setTag] = useState();

  const rangeSelectorRate = (event, newValue) => {
    setRate(newValue);
  };

  const rangeSelectorAge = (event, newValue) => {
    setValueAge(newValue);
  };

  const clear = React.useCallback(() => {
    setTag(undefined);
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

    if (valueAge !== undefined && props.minAge !== valueAge[0])
      query.append('minAge', valueAge[0]);

    if (valueAge !== undefined && props.maxAge !== valueAge[1])
      query.append('maxAge', valueAge[1]);

    if (rate !== undefined && 1 !== rate[0]) query.append('minRate', rate[0]);

    if (rate !== undefined && 5 !== rate[1]) query.append('maxRate', rate[1]);

    if (sort !== undefined) query.append('sortBy', sort);

    if (justHasFreeSchedule !== undefined && justHasFreeSchedule !== 'all')
      query.append('justHasFreeSchedule', justHasFreeSchedule);

    if (wantedBranch !== undefined && wantedBranch !== 'all')
      query.append('branchId', wantedBranch);

    if (wantedGrade !== undefined && wantedGrade !== 'all')
      query.append('gradeId', wantedGrade);

    query.append('returnFilters', false);
    props.setLoading(true);

    let res = await generalRequest(
      routes.getAllTeachers + '?' + query.toString(),
      'get',
      undefined,
      'data',
      undefined,
    );

    props.setLoading(false);

    if (res != null) props.setSelectableItems(res);
  };

  const sortByValues = useMemo(() => {
    [
      {id: 'rate', item: 'امتیاز'},
      {id: 'student', item: 'دانش آموزان'},
      {id: 'age', item: 'سن'},
    ];
  }, []);

  const justHasFreeScheduleValues = [
    {id: 'all', item: 'همه'},
    {id: 'true', item: 'تنها آنهایی که جلسه آزاد دارند'},
  ];

  const [sort, setSort] = useState();

  return (
    <MyView>
      <PhoneView style={{...styles.gap30}}>
        {props.maxAge !== props.minAge && (
          <MyView style={{width: isInPhone ? 260 : 300}}>
            <SimpleText style={{...styles.alignSelfCenter}} text={'سن دبیر'} />
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
            text={'امتیاز دبیر'}
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
          values={props.branches}
          setter={setWantedBranch}
          value={
            wantedBranch === undefined
              ? undefined
              : props.branches.find(elem => elem.id === wantedBranch)
          }
          placeholder={'رشته مدنظر'}
          subText={'رشته مدنظر'}
        />

        {props.branches !== undefined && (
          <JustBottomBorderSelect
            values={props.branches}
            setter={setWantedBranch}
            value={
              wantedBranch === undefined
                ? undefined
                : props.branches.find(elem => elem.id === wantedBranch)
            }
            placeholder={'رشته مدنظر'}
            subText={'رشته مدنظر'}
          />
        )}

        {props.grades !== undefined && (
          <JustBottomBorderSelect
            values={props.grades}
            setter={setWantedGrade}
            value={
              wantedGrade === undefined
                ? undefined
                : props.grades.find(elem => elem.id === wantedGrade)
            }
            placeholder={'مقطع مدنظر'}
            subText={'مقطع مدنظر'}
          />
        )}

        {props.lessons !== undefined && (
          <JustBottomBorderSelect
            values={props.lessons}
            setter={setWantedLesson}
            value={
              wantedLesson === undefined
                ? undefined
                : props.lessons.find(elem => elem.id === wantedLesson)
            }
            placeholder={'درس مدنظر'}
            subText={'درس مدنظر'}
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

        <JustBottomBorderSelect
          values={justHasFreeScheduleValues}
          setter={setJustHasFreeSchedule}
          value={
            justHasFreeSchedule === undefined
              ? undefined
              : justHasFreeScheduleValues.find(
                  elem => elem.id === justHasFreeSchedule,
                )
          }
          placeholder={'برنامه\u200Cهای تدریس'}
          subText={'برنامه\u200Cهای تدریس'}
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
