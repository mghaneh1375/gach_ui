import {CommonWebBox} from '../../../../styles/Common';

function AddAll(props) {
  return (
    <CommonWebBox
      header={'اضافه کردن دسته جمعی دانش آموزان '}
      backBtn={true}
      onBackClick={() => props.setMode('create')}></CommonWebBox>
  );
}

export default AddAll;
