import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {LargePopUp} from '../../../../../styles/Common/PopUp';

import React, {useState} from 'react';
import {CommonButton, MyView, PhoneView} from '../../../../../styles/Common';
import {
  removeItems,
  sexKeyVals,
  showError,
} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';
import {notifContext, dispatchNotifContext} from '../Context';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(notifContext),
    React.useContext(dispatchNotifContext),
  ];

  const [state, dispatch] = useGlobalState();

  const filters = [
    {item: 'پایه تحصیلی', id: 'grades'},
    {item: 'رشته المپیادی', id: 'branches'},
    {item: 'استان', id: 'states'},
    {item: 'شهر', id: 'cities'},
    {item: 'آزمون', id: 'quizzes'},
    {item: 'جنسیت', id: 'sex'},
    {item: 'مدرسه', id: 'schools'},
    {item: 'ایکس پول', id: 'coin'},
    {item: 'پول', id: 'money'},
    {item: 'کدملی', id: 'nids'},
    {item: 'شماره همراه', id: 'phones'},
    {item: 'سطح دسترسی', id: 'accesses'},
    {item: 'رتبه در سایت', id: 'rank'},
    {item: 'بسته آموزشی', id: 'packages'},
  ];

  const accesses = [
    {item: 'مدارس', id: 'school'},
    {item: 'دانش آموزان', id: 'student'},
    {item: 'دبیران', id: 'teacher'},
    {item: 'مشاوران', id: 'advisor'},
    {item: 'نمایندگی ها', id: 'agent'},
  ];

  const [selectedFilter, setSelectedFilter] = useState();
  const [items, setItems] = useState();
  const [selectedVal, setSelectedVal] = useState();
  const [itemType, setItemType] = useState();
  const [allSelectedVals, setAllSelectedVals] = useState();

  const changeItems = wanted => {
    if (
      wanted === 'grades' ||
      wanted === 'schools' ||
      wanted === 'quizzes' ||
      wanted === 'states' ||
      wanted === 'cities' ||
      wanted === 'branches' ||
      wanted === 'packages'
    )
      setItemType('searchable');
    else if (wanted === 'sex' || wanted === 'accesses') setItemType('select');
    else if (wanted === 'coin' || wanted === 'money' || wanted === 'rank')
      setItemType('minMax');
    else if (wanted === 'nids' || wanted === 'phones') setItemType('multiText');
    if (wanted === 'grades') {
      setItems(state.grades);
    } else if (wanted === 'schools') setItems(state.schools);
    else if (wanted === 'states') setItems(state.states);
    else if (wanted === 'cities') setItems(state.cities);
    else if (wanted === 'branches') setItems(state.branches);
    else if (wanted === 'packages') setItems(state.packages);
    else if (wanted === 'quizzes') setItems(state.quizzes);
    else if (wanted === 'sex') setItems(sexKeyVals);
    else if (wanted === 'accesses') setItems(accesses);
  };

  React.useEffect(() => {
    if (
      selectedFilter !== undefined &&
      (selectedFilter.id === 'coin' ||
        selectedFilter.id === 'money' ||
        selectedFilter.id === 'rank')
    ) {
      setSelectedVal({min: undefined, max: undefined});
    } else setSelectedVal(undefined);
  }, [selectedFilter]);

  const addToSelected = selected => {
    if (allSelectedVals === undefined) setAllSelectedVals([selected]);
    else {
      let tmp = [];
      allSelectedVals.forEach(e => {
        tmp.push(e);
      });
      tmp.push(selected);
      setAllSelectedVals(tmp);
    }

    setSelectedVal(undefined);
  };

  const returnFilter = () => {
    if (selectedFilter === undefined) {
      props.toggleShowPopUp();
      return;
    }

    if (
      selectedVal === undefined &&
      (allSelectedVals === undefined || allSelectedVals.length === 0)
    ) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    let id;

    if (itemType === 'minMax') {
      if (selectedVal.min === undefined && selectedVal.max === undefined) {
        showError(commonTranslator.pleaseFillAllFields);
        return;
      }
      if (selectedVal.min !== undefined)
        props.setFilter({
          id: selectedFilter.id + '_min',
          key:
            'min' +
            selectedFilter.id.charAt(0).toUpperCase() +
            selectedFilter.id.slice(1),
          value: selectedVal.min,
          label: 'مینیمم - ' + selectedFilter.item,
          valueText: selectedVal.min,
        });
      if (selectedVal.max !== undefined)
        props.setFilter({
          id: selectedFilter.id + '_max',
          key:
            'max' +
            selectedFilter.id.charAt(0).toUpperCase() +
            selectedFilter.id.slice(1),
          value: selectedVal.max,
          label: 'ماکزیمم - ' + selectedFilter.item,
          valueText: selectedVal.max,
        });

      props.toggleShowPopUp();
      return;
    }

    if (itemType === 'multiText') id = selectedFilter.id;
    else if (selectedVal !== undefined)
      id = selectedFilter.id + '_' + selectedVal.id;
    else id = selectedFilter.id + '_' + allSelectedVals[0].id;

    props.setFilter({
      id: id,
      key: selectedFilter.id,
      value:
        itemType === 'multiText'
          ? selectedVal.split(',')
          : selectedFilter.id === 'accesses'
          ? [selectedVal.id]
          : allSelectedVals !== undefined && allSelectedVals.length > 0
          ? allSelectedVals.map(e => {
              return e.id;
            })
          : selectedVal.id,
      label: selectedFilter.item,
      valueText:
        itemType === 'multiText' ||
        (allSelectedVals !== undefined && allSelectedVals.length > 1)
          ? undefined
          : allSelectedVals !== undefined && allSelectedVals.length > 0
          ? allSelectedVals[0].name
          : itemType === 'searchable'
          ? selectedVal.name
          : selectedVal.item,
    });

    props.toggleShowPopUp();
  };

  return (
    <LargePopUp
      btns={
        <CommonButton
          theme={'dark'}
          title={commonTranslator.confirm}
          onPress={() => returnFilter()}
        />
      }
      toggleShowPopUp={() => props.toggleShowPopUp()}>
      <MyView style={{minHeight: 200}}>
        <JustBottomBorderSelect
          setter={selected => {
            setSelectedFilter(filters.find(e => e.id === selected));
            changeItems(selected);
          }}
          isHalf={true}
          value={
            selectedFilter === undefined
              ? undefined
              : filters.find(elem => elem.id === selectedFilter.id)
          }
          placeholder={'نوع فیلتر'}
          subText={'لطفا نوع فیلتر خود را مشخص کنید'}
          values={filters}
        />
        {selectedFilter !== undefined &&
          items !== undefined &&
          itemType === 'select' && (
            <JustBottomBorderSelect
              setter={selected => {
                setSelectedVal(items.find(e => e.id === selected));
              }}
              isHalf={true}
              value={
                selectedVal === undefined
                  ? undefined
                  : items.find(elem => {
                      return elem.id === selectedVal.id;
                    })
              }
              placeholder={selectedFilter.item}
              values={items}
            />
          )}
        {selectedFilter !== undefined &&
          items !== undefined &&
          itemType === 'searchable' && (
            <JustBottomBorderTextInput
              setSelectedItem={selected => {
                if (selected !== undefined) {
                  setSelectedVal(selected);
                  addToSelected(selected);
                }
              }}
              isHalf={true}
              resultPane={true}
              value={
                selectedVal === undefined
                  ? undefined
                  : items.find(elem => elem.id === selectedVal.id).name
              }
              placeholder={selectedFilter.item}
              values={items}
            />
          )}
        {selectedFilter !== undefined && itemType === 'multiText' && (
          <JustBottomBorderTextInput
            onChangeText={e => setSelectedVal(e)}
            value={selectedVal}
            placeholder={selectedFilter.item}
            justNum={true}
            acceptComma={true}
            subText={
              selectedFilter.item + ' (با علامت , مقادیر را از هم جدا کنید) '
            }
          />
        )}

        {selectedFilter !== undefined &&
          selectedVal !== undefined &&
          itemType === 'minMax' && (
            <PhoneView>
              <JustBottomBorderTextInput
                onChangeText={e =>
                  setSelectedVal({
                    min: e,
                    max: selectedVal.max,
                  })
                }
                value={selectedVal.min}
                justNum={true}
                float={selectedFilter.id === 'coin' ? true : undefined}
                placeholder={'حداقل ' + selectedFilter.item}
                subText={'حداقل ' + selectedFilter.item}
              />
              <JustBottomBorderTextInput
                onChangeText={e =>
                  setSelectedVal({
                    max: e,
                    min: selectedVal.min,
                  })
                }
                value={selectedVal.max}
                justNum={true}
                float={selectedFilter.id === 'coin' ? true : undefined}
                placeholder={'حداکثر ' + selectedFilter.item}
                subText={'حداکثر ' + selectedFilter.item}
              />
            </PhoneView>
          )}

        <PhoneView style={{...styles.marginTop20, ...styles.gap10}}>
          {allSelectedVals !== undefined &&
            allSelectedVals.map((elem, index) => {
              return (
                <CommonButton
                  onPress={() => {
                    removeItems(allSelectedVals, setAllSelectedVals, [elem.id]);
                  }}
                  icon={faClose}
                  theme={'dark'}
                  key={index}
                  iconDir={'left'}
                  title={elem.name}
                />
              );
            })}
        </PhoneView>
      </MyView>
    </LargePopUp>
  );
}

export default Filter;
