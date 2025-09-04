import RadioButtonYesOrNo from '@/components/web/RadioButtonYesOrNo.jsx';
import {useState} from 'react';
function MultiSentenceYesOrNo(props) {
  const [status, setStatus] = useState(props.status);
  return (
    <RadioButtonYesOrNo
      label={'پاسخ گزاره ' + (props.index + 1)}
      selected={status}
      setSelected={newStatus => {
        setStatus(newStatus);
        props.update(props.index, newStatus);
      }}
    />
  );
}
export default MultiSentenceYesOrNo;
