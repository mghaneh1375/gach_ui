import React, {useState} from 'react';
import {Device} from '../../../../models/Device';
import {getDevice} from '../../../../services/Utility';
import {style} from './style';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import FilterItem from './FilterItem';
import {MyView, SimpleText} from '../../../../styles/Common';
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
  const [selectedKindTag, setSelectedKindTag] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const togglePrice = lbl => {
    setSelectedPrice(lbl);

    dispatch({loading: true});

    state.onChangePrice(lbl);
    setTimeout(() => {
      dispatch({loading: false});
    }, 3000);
  };

  const toggleKindQuiz = lbl => {
    setSelectedKindQuiz(lbl);
    dispatch({loading: true});
    state.onChangeKindQuiz(lbl);
    setTimeout(() => {
      dispatch({loading: false});
    }, 3000);
  };

  const toggleSelected = lbl => {
    let tmpIdx = selected.indexOf(lbl);
    let tmp = selected;
    if (tmpIdx === -1) tmp.push(lbl);
    else tmp.splice(tmpIdx, 1);
    if (allAvailable && allActive && tmp.length !== filters.length)
      setAllActive(false);
    setSelected(tmp);

    dispatch({loading: true});

    state.onChangeFilter(tmp);

    setTimeout(() => {
      dispatch({loading: false});
    }, 3000);
  };

  const changeKindTag = lbl => {
    let tmpArr;
    if (lbl === 'all') tmpArr = allFilters;
    else if (lbl === 'hosh')
      tmpArr = allFilters.filter(e => {
        return e.indexOf('هوش') !== -1;
      });
    else if (lbl === 'olympiad')
      tmpArr = allFilters.filter(e => {
        return e.indexOf('المپیاد') !== -1;
      });

    dispatch({loading: true});

    setSelected(tmpArr);
    state.onChangeFilter(tmpArr);

    setTimeout(() => {
      dispatch({loading: false});
    }, 3000);

    setFilters([
      {
        subCats: tmpArr,
        label: 'تگ ها',
      },
    ]);
    setSelectedKindTag(lbl);
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

  const [allFilters, setAllFilters] = useState();

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
      setAllFilters(state.filters);
    } else if (state.filters instanceof Object) {
      let tmp = [];
      for (const [key, value] of Object.entries(state.filters)) {
        tmp.push({
          label: key,
          subCats: value,
        });
      }

      setAllFilters(tmp[0].subCats);
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
              ...styles.paddingTop10,
              ...styles.marginLeft15,
              ...styles.marginRight15,
              ...styles.BlueBold,
            }}
            text={'دنبال چه آزمونی می‌گردی؟'}
          />
          <MyView
            style={{
              ...{
                borderBottomWidth: 2,
                borderColor: vars.DARK_BLUE,
                margin: 3,
              },
            }}>
            <FilterItem
              item={{label: 'هوش'}}
              status={selectedKindTag === 'hosh' ? 'checked' : 'unchecked'}
              onPress={label => changeKindTag('hosh')}
            />
            <FilterItem
              item={{label: 'المپیاد'}}
              status={selectedKindTag === 'olympiad' ? 'checked' : 'unchecked'}
              onPress={label => changeKindTag('olympiad')}
            />
            <FilterItem
              item={{label: 'همه رو ببینم'}}
              status={selectedKindTag === 'all' ? 'checked' : 'unchecked'}
              onPress={label => changeKindTag('all')}
            />
          </MyView>

          <SimpleText
            style={{
              ...styles.padding10,
              ...styles.BlueBold,
              ...styles.marginRight15,
            }}
            text={'میخوای چه زمانی باشه؟'}
          />
          <MyView
            style={{
              ...{
                borderBottomWidth: 2,
                borderColor: vars.DARK_BLUE,
                margin: 3,
              },
            }}>
            <FilterItem
              item={{label: 'آزمون باز (تاریخ آزاده)'}}
              status={selectedKindQuiz === 'open' ? 'checked' : 'unchecked'}
              onPress={label => toggleKindQuiz('open')}
            />
            <FilterItem
              item={{label: 'آزمون پشت میز (تاریخ مشخصه)'}}
              status={selectedKindQuiz === 'regular' ? 'checked' : 'unchecked'}
              onPress={label => toggleKindQuiz('regular')}
            />

            <FilterItem
              item={{label: 'آزمون فرار'}}
              status={selectedKindQuiz === 'escape' ? 'checked' : 'unchecked'}
              onPress={label => toggleKindQuiz('escape')}
            />

            {/* <FilterItem
              item={{label: 'آزمون پای تخته (تاریخ مشخصه)'}}
              status={
                selectedKindQuiz === 'onlineStanding' ? 'checked' : 'unchecked'
              }
              onPress={label => toggleKindQuiz('onlineStanding')}
            /> */}

            <FilterItem
              item={{label: 'همه رو ببینم'}}
              status={selectedKindQuiz === 'all' ? 'checked' : 'unchecked'}
              onPress={label => toggleKindQuiz('all')}
            />
          </MyView>

          <SimpleText
            style={{
              ...styles.padding10,
              ...styles.BlueBold,
              ...styles.marginRight15,
            }}
            text={'مربوط به چی باشه؟'}
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

          {/* {monthFilter !== undefined && (
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
          )} */}

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
            text={'آزمون رایگان باشه یا پولی؟'}
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
