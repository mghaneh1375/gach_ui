import {CommonWebBox} from '../../../../../../styles/Common';
import CommonDataTable from '../../../../../../styles/Common/CommonDataTable';
import columns from './TableStructure';

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
