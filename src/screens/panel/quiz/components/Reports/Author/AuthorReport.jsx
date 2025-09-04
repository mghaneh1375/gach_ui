import {CommonWebBox} from '@/styles';
import CommonDataTable from '../../../../../../styles/common/CommonDataTable.jsx';
import columns from './tableStructure';
function AuthorReport(props) {
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
    //         <PieChart
    //   data={data}
    //   width={screenWidth}
    //   height={220}
    //   chartConfig={chartConfig}
    //   accessor={"population"}
    //   backgroundColor={"transparent"}
    //   paddingLeft={"15"}
    //   center={[10, 50]}
    //   absolute
    // />
  );
}
export default AuthorReport;
