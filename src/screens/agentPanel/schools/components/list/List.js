import {CommonWebBox, SimpleText} from '../../../../../styles/Common';
import commonTranslate from '../../../../../tranlates/Common';

function List(props) {
  return (
    <CommonWebBox
      header={commonTranslate.access + ' ' + commonTranslate.agent}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <SimpleText text={'hello'} />
    </CommonWebBox>
  );
}

export default List;
