import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';

function List(props) {
  return (
    <CommonWebBox>
      <CommonDataTable
        columns={columns}
        data={props.transactions}
        groupOps={[]}
      />
    </CommonWebBox>
  );
}

export default List;
