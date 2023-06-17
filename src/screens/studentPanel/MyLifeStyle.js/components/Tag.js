import React, {useState} from 'react';
import {CommonButton} from '../../../../styles/Common';

function Tag(props) {
  const [isSelected, setIsSelected] = useState(false);

  React.useEffect(() => {
    setIsSelected(props.selectedTag === props.id);
  }, [props.selectedTag, props.id]);

  return (
    <CommonButton
      onPress={() => props.onClick()}
      theme={isSelected ? 'dark' : 'transparent'}
      title={props.label}
    />
  );
}

export default Tag;
