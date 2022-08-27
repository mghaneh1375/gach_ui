import React, {useState} from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import commonTranslator from '../../../../tranlates/Common';
import columns from './TableStructure';
import Filter from './Fliter/Filter';

function List(props) {
  return (
    <CommonWebBox header={commonTranslator.transactionFinantial}>
      <Filter />
      <CommonDataTable
        columns={columns}
        data={props.transactions}
        groupOps={[]}
      />
    </CommonWebBox>
  );
}

export default List;
