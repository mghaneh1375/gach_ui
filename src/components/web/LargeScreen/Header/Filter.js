import React, {useState} from 'react';
import {Device} from '../../../../models/Device';
import {getDevice} from '../../../../services/Utility';
import {style} from './style';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import FilterItem from './FilterItem';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import {SimpleTextIcon} from '../../../../styles/Common/TextIcon';
import {faClose, faFilter} from '@fortawesome/free-solid-svg-icons';
import {Pressable} from 'react-native';

function Filter() {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;

  const [filters, setFilters] = useState();
  const [monthFilter, setMonthFilter] = useState();
  const [allActive, setAllActive] = useState(true);
  const [selected, setSelected] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [allAvailable, setAllAvailable] = useState(false);
  const [allAvailableMonth, setAllAvailableMonth] = useState(false);
  const [allActiveMonth, setAllActiveMonth] = useState(true);
  const [selectedKindQuiz, setSelectedKindQuiz] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const togglePrice = lbl => {
    setSelectedPrice(lbl);
    state.onChangePrice(lbl);
  };

  const toggleKindQuiz = lbl => {
    setSelectedKindQuiz(lbl);
    state.onChangeKindQuiz(lbl);
  };

  const toggleSelected = lbl => {
    let tmpIdx = selected.indexOf(lbl);
    let tmp = selected;
    if (tmpIdx === -1) tmp.push(lbl);
    else tmp.splice(tmpIdx, 1);
    if (allAvailable && allActive && tmp.length !== filters.length)
      setAllActive(false);
    setSelected(tmp);
    state.onChangeFilter(tmp);
  };

  const toggleMonthSelected = lbl => {
    let tmpIdx = selectedMonth.indexOf(lbl);
    let tmp = selectedMonth;
    if (tmpIdx === -1) tmp.push(lbl);
    else tmp.splice(tmpIdx, 1);
    if (
      allAvailableMonth &&
      allActiveMonth &&
      tmp.length !== monthFilter.length
    )
      setAllActiveMonth(false);
    setSelectedMonth(tmp);
    state.onChangeFilterMonth(tmp);
  };

  const setAllFilter = React.useCallback(() => {
    if (filters === undefined) return;

    if (!allAvailable || allActive) setSelected([]);
    dispatch({allFilter: allAvailable && allActive});
  }, [dispatch, allActive, filters, allAvailable]);

  React.useEffect(() => {
    setAllFilter();
  }, [allActive, setAllFilter]);

  React.useEffect(() => {
    if (state.month === undefined) return;
    setSelectedMonth([]);
    setAllAvailableMonth(true);
    setMonthFilter(
      state.month.map(e => {
        return {
          status: false,
          label: e,
        };
      }),
    );
  }, [state.month]);

  React.useEffect(() => {
    if (state.filters === undefined) return;
    if (state.filters instanceof Array) {
      setSelected(
        state.filters.map((e, index) => {
          return index;
        }),
      );

      setAllAvailable(true);
      setFilters(state.filters);
    } else if (state.filters instanceof Object) {
      let tmp = [];
      for (const [key, value] of Object.entries(state.filters)) {
        tmp.push({
          label: key,
          subCats: value,
        });
      }
      setFilters(tmp);
    }
  }, [state.filters]);

  const [showFilterBox, setShowFilterBox] = useState(isLargePage);

  return (
    <>
      {!isLargePage && (
        <Pressable
          onPress={() => {
            setShowFilterBox(true);
          }}
          style={{
            boxShadow: '0px 3px 16px 4px rgb(0 0 0 / 16%)',
            borderRadius: 10,
            padding: 10,
            backgroundColor: 'white',
            top: 0,
            height: 70,
            width: '100%',
            alignItems: 'stretch',
          }}>
          <SimpleTextIcon
            textStyle={{
              ...styles.alignSelfCenter,
              ...styles.fontSize20,
              ...styles.colorDarkBlue,
              ...styles.BlueBold,
            }}
            iconStyle={{...styles.alignSelfCenter, ...styles.colorDarkBlue}}
            text={'نمایش فیلترها'}
            icon={faFilter}
          />
        </Pressable>
      )}
      {showFilterBox && (
        <div
          className="menu-item-container filter"
          style={
            isLargePage
              ? style.MenuJustLarge
              : {
                  position: 'fixed',
                  top: -10,
                  zIndex: 10,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'white',
                  overflow: 'auto',
                }
          }>
          {isLargePage && (
            <SimpleText
              style={{
                ...styles.padding10,
                ...styles.margin15,
                ...styles.BlueBold,
                ...{
                  borderBottomWidth: 2,
                  borderColor: vars.DARK_BLUE,
                },
              }}
              text={'نتایج را بهینه کنید'}
            />
          )}
          {!isLargePage && (
            <SimpleTextIcon
              onPress={() => setShowFilterBox(false)}
              textStyle={{
                ...styles.alignSelfCenter,
                ...styles.fontSize20,
                ...styles.colorDarkBlue,
                ...styles.BlueBold,
              }}
              iconStyle={{...styles.alignSelfCenter, ...styles.colorDarkBlue}}
              text={'نتایج را بهینه کنید'}
              icon={faClose}
            />
          )}

          {state.selectableItems !== undefined && state.allItems !== undefined && (
            <SimpleText
              style={{
                ...styles.margin15,
                ...styles.BlueBold,
                ...{
                  borderBottomWidth: 2,
                  borderColor: vars.DARK_BLUE,
                  padding: isLargePage ? 10 : 30,
                },
              }}
              text={
                'نمایش ' +
                state.selectableItems +
                ' مورد از ' +
                state.allItems +
                ' مورد'
              }
            />
          )}

          <SimpleText
            style={{
              ...styles.padding10,
              ...styles.BlueBold,
              ...styles.marginRight15,
            }}
            text={'نوع آزمون'}
          />
          <MyView
            style={{
              ...{
                borderBottomWidth: 2,
                borderColor: vars.DARK_BLUE,
                margin: 10,
              },
            }}>
            <FilterItem
              item={{label: 'آزمون باز'}}
              status={selectedKindQuiz === 'open' ? 'checked' : 'unchecked'}
              onPress={label => toggleKindQuiz('open')}
            />
            <FilterItem
              item={{label: 'آزمون پشت میز'}}
              status={selectedKindQuiz === 'regular' ? 'checked' : 'unchecked'}
              onPress={label => toggleKindQuiz('regular')}
            />
            <FilterItem
              item={{label: 'همه'}}
              status={selectedKindQuiz === 'all' ? 'checked' : 'unchecked'}
              onPress={label => toggleKindQuiz('all')}
            />
          </MyView>

          <SimpleText
            style={{
              ...styles.paddingTop10,
              ...styles.marginLeft15,
              ...styles.marginRight15,
              ...styles.BlueBold,
            }}
            text={'رشته'}
          />
          <MyView
            style={{
              ...styles.marginLeft15,
              ...styles.marginRight15,
              ...styles.marginTop0,
              ...styles.gap10,
            }}>
            {filters !== undefined &&
              filters.map((elem, index) => {
                return (
                  <FilterItem
                    item={elem}
                    status={allActive ? 'unchecked' : undefined}
                    key={index}
                    onPress={label => toggleSelected(label)}
                  />
                );
              })}
          </MyView>

          {monthFilter !== undefined && (
            <>
              <SimpleText
                style={{
                  ...styles.paddingTop10,
                  ...styles.marginLeft15,
                  ...styles.marginRight15,
                  ...styles.BlueBold,
                }}
                text={'ماه برگزاری'}
              />
              <MyView
                style={{
                  ...styles.paddingTop10,
                  ...styles.marginLeft15,
                  ...styles.marginRight15,
                  ...styles.marginTop0,
                  ...styles.gap10,
                }}>
                {monthFilter !== undefined &&
                  monthFilter.map((elem, index) => {
                    return (
                      <FilterItem
                        item={elem}
                        status={allActiveMonth ? 'unchecked' : undefined}
                        key={index}
                        checkbox={true}
                        onPress={label => toggleMonthSelected(label)}
                      />
                    );
                  })}
              </MyView>
            </>
          )}

          {allAvailable && (
            <FilterItem
              item={{
                label: 'همه',
              }}
              onPress={() => {
                if (!allActive) setAllActive(true);
              }}
              status={allActive ? 'checked' : 'unchecked'}
              isAll={true}
            />
          )}

          <SimpleText
            style={{
              ...styles.padding10,
              ...styles.BlueBold,
              ...styles.marginRight15,
            }}
            text={'قیمت آزمون'}
          />
          <MyView
            style={{
              ...{
                borderBottomWidth: 2,
                borderColor: vars.DARK_BLUE,
                margin: 10,
              },
            }}>
            <FilterItem
              item={{label: 'رایگان'}}
              status={selectedPrice === 'free' ? 'checked' : 'unchecked'}
              onPress={label => togglePrice('free')}
            />
            <FilterItem
              item={{label: 'غیر رایگان'}}
              status={selectedPrice === 'nonFree' ? 'checked' : 'unchecked'}
              onPress={label => togglePrice('nonFree')}
            />
            <FilterItem
              item={{label: 'همه'}}
              status={selectedPrice === 'all' ? 'checked' : 'unchecked'}
              onPress={label => togglePrice('all')}
            />
          </MyView>
        </div>
      )}
    </>
  );
}

export default Filter;
