import React, {useState} from 'react';
import {Device} from '../../../../models/Device';
import {getDevice} from '../../../../services/Utility';
import {style} from './style';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import FilterItem from './FilterItem';

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
