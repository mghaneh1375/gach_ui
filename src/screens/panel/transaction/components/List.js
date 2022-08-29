import React from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import commonTranslator from '../../../../translator/Common';
import columns from './TableStructure';
import Filter from './Fliter/Filter';

function List(props) {
  return (
    <CommonWebBox header={commonTranslator.transactionFinantial}>
      <Filter
        token={props.token}
        setLoading={props.setLoading}
        setTransactions={props.setTransactions}
      />
      <CommonDataTable
        columns={columns}
        data={props.transactions}
        groupOps={[]}
      />
    </CommonWebBox>
  );
}

export default List;
