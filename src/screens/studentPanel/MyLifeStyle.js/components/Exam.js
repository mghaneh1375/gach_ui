import React, {useState} from 'react';
import {CommonButton} from '../../../../styles/Common';

function Exam(props) {
  const [isSelected, setIsSelected] = useState(false);

  React.useEffect(() => {
    setIsSelected(props.selectedExams.indexOf(props.id) !== -1);
  }, [props.selectedExams, props.id]);

  return (
    <CommonButton
      onPress={() => props.onClick()}
      theme={isSelected ? 'dark' : 'transparent'}
      title={props.label}
    />
  );
}

export default Exam;
