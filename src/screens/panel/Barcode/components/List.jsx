import {CommonWebBox} from '@/styles/common.jsx';
function List(props) {
  return (
    <CommonWebBox
      header={'بارکدهای تعریف شده'}
      addBtn={true}
      onAddClick={() => props.setMode('create')}
    />
  );
}
export default List;
