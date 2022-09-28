import React, {useState} from 'react';
import {Device} from '../../../../models/Device';
import {getDevice} from '../../../../services/Utility';
import {style} from './style';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import FilterItem from './FilterItem';
import {MyView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';

function Filter() {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;

  const [filters, setFilters] = useState();
  const [allActive, setAllActive] = useState(true);
  const [selected, setSelected] = useState();
  const [allAvailable, setAllAvailable] = useState(false);

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

  const setAllFilter = React.useCallback(() => {
    if (filters === undefined) return;

    if (!allAvailable || allActive) setSelected([]);
    dispatch({allFilter: allAvailable && allActive});
  }, [dispatch, allActive, filters, allAvailable]);

  React.useEffect(() => {
    setAllFilter();
  }, [allActive, setAllFilter]);

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

  if (isLargePage) {
    return (
      <div className="menu-item-container filter" style={style.MenuJustLarge}>
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

        {state.selectableItems !== undefined && state.allItems !== undefined && (
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
            ...styles.marginLeft15,
            ...styles.marginRight15,
            ...styles.BlueBold,
          }}
          text={'رشته'}
        />
        <MyView
          style={{
            ...styles.padding10,
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
      </div>
    );
  }

  return <></>;
}

export default Filter;
