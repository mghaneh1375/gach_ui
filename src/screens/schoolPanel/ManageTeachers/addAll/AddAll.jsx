import {CommonWebBox} from '@/styles/common.jsx';
function AddAll(props) {
  return (
    <CommonWebBox
      header={'اضافه کردن دسته جمعی دانش آموزان '}
      backBtn={true}
      onBackClick={() => props.setMode('create')}
    />
  );
}
export default AddAll;
