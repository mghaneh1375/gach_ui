import React, {useState} from 'react';
import {CommonRadioButton} from '../../../../styles/Common';

function FilterItem(props) {
  const [status, setStatus] = useState();

  React.useEffect(() => {
    if (props.status === undefined) return;
    setStatus(props.status);
  }, [props.status]);

  const changeStatus = () => {
    if (props.isAll !== undefined && status === 'checked') return;
    setStatus(status === 'checked' ? 'unchecked' : 'checked');
    props.onPress();
  };

  if (status === undefined) return <></>;

  return (
    <CommonRadioButton
      onPress={() => changeStatus()}
      status={status}
      text={props.item.label}
    />
  );
}

export default FilterItem;
