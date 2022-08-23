import {BigBoldBlueText, CommonWebBox} from '../../styles/Common';
import commonTranslator from '../../tranlates/Common';

function SuccessTransaction(props) {
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.back()}
      header={commonTranslator.transactionResult}>
      <BigBoldBlueText text={commonTranslator.successTransaction} />
    </CommonWebBox>
  );
}

export default SuccessTransaction;
