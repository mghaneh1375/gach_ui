import {CommonWebBox} from '@/styles';
import CommonDataTable from '../../../../../../styles/common/CommonDataTable.jsx';
import columns from './tableStructure';
function Participants(props) {
  return (
    <CommonWebBox>
      <CommonDataTable
        columns={columns}
        show_row_no={false}
        pagination={false}
        groupOps={[]}
        data={props.data}
      />
    </CommonWebBox>
  );
}
export default Participants;
