import React, {useState} from 'react';
import {Device} from '../../../../models/Device';
import {getDevice} from '../../../../services/Utility';
import {style} from './style';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import FilterItem from './FilterItem';

function Filter(props) {
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

  const toggleSelected = idx => {
    let tmpIdx = selected.indexOf(idx);
    let tmp = selected;
    if (tmpIdx === -1) tmp.push(idx);
    else tmp.splice(tmpIdx, 1);
    if (allActive && tmp.length !== filters.length) setAllActive(false);
    setSelected(tmp);
    state.onChangeFilter(tmp);
  };

  const setAllFilter = React.useCallback(() => {
    if (filters === undefined) return;
    if (allActive)
      setSelected(
        filters.map((e, index) => {
          return index;
        }),
      );
    dispatch({allFilter: allActive});
  }, [dispatch, allActive, filters]);

  React.useEffect(() => {
    setAllFilter();
  }, [allActive, setAllFilter]);

  React.useEffect(() => {
    if (state.filters === undefined) return;

    setSelected(
      state.filters.map((e, index) => {
        return index;
      }),
    );
    setFilters(state.filters);
  }, [state.filters]);

  if (isLargePage) {
    return (
      <div className="menu-item-container filter" style={style.MenuJustLarge}>
        {filters !== undefined &&
          filters.map((elem, index) => {
            return (
              <FilterItem
                item={elem}
                status={allActive ? 'checked' : undefined}
                key={index}
                onPress={() => toggleSelected(index)}
              />
            );
          })}
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
      </div>
    );
  }

  return <></>;
}

export default Filter;
