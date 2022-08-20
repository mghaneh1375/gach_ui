import React, {useState} from 'react';
import {CommonRadioButton} from '../../../../styles/Common';

function FilterItem(props) {
  const [status, setStatus] = useState(props.status);

  const changeStatus = () => {
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
    props.item.doFilter(props.idx);
  };

  return (
    <CommonRadioButton
      onPress={() => changeStatus()}
      status={status}
      text={props.item.label}
    />
  );
}

export default FilterItem;
