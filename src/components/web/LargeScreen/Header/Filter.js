import React, {useState} from 'react';
import {Device} from '../../../../models/Device';
import {getDevice} from '../../../../services/Utility';
import {style} from './style';
import {globalStateContext} from '../../../../App';
import {CommonRadioButton} from '../../../../styles/Common';
import FilterItem from './FilterItem';

function Filter(props) {
  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

  const device = getDevice();
  const isLargePage = device.indexOf(Device.Large) !== -1;

  const [filters, setFilters] = useState();
  const [selectedList, setSelectedList] = useState([]);

  React.useEffect(() => {
    setFilters(state.filters);
  }, [state.filters]);

  if (isLargePage) {
    return (
      <div className="menu-item-container filter" style={style.MenuJustLarge}>
        {filters !== undefined &&
          filters.map((elem, index) => {
            return (
              <FilterItem
                idx={index}
                item={elem}
                status={'unckecked'}
                key={index}
              />
            );
          })}
      </div>
    );
  }

  return <></>;
}

export default Filter;
