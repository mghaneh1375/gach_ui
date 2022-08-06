import {CommonWebBox} from '../../../../styles/Common';
import commonTranslator from '../../../../tranlates/Common';

function Students(props) {
  return (
    <CommonWebBox
      header={commonTranslator.view + ' ' + commonTranslator.students}
      backBtn={true}
      onBackClick={() => props.setMode('list')}></CommonWebBox>
  );
}

export default Students;
