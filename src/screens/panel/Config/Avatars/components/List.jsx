import {CommonWebBox} from '../../../../../styles/Common';
import Show from './Show';

function List(props) {
  return (
    <CommonWebBox backBtn={true} onBackClick={() => props.setMode('list')}>
      {props.avatars !== undefined &&
        props.avatars.map((elem, index) => {
          return <Show key={index} avatar={elem} />;
        })}
    </CommonWebBox>
  );
}

export default List;
