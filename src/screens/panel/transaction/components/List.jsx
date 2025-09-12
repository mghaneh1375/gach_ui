import React, {useState} from 'react';
import {CommonWebBox, PhoneView, SimpleText} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import commonTranslator from '@/translator/common';
import columns from './tableStructure';
import Filter from './fliter/Filter.jsx';
import Translate from '../translate';
import {styles} from '@/styles/common/styles';
function List(props) {
  const [items, setItems] = useState();
  React.useEffect(() => {
    setItems(props.transactions);
  }, [props.transactions]);
  return (
    <CommonWebBox header={commonTranslator.transactionFinantial}>
      <Filter
        token={props.token}
        setLoading={props.setLoading}
        setTransactions={props.setTransactions}
        setAccountMoneySum={props.setAccountMoneySum}
        setSum={props.setSum}
      />
      <PhoneView
        style={{
          ...styles.gap30,
        }}>
        <SimpleText
          text={Translate.amountSum + commonTranslator.col + props.sum}
        />
        <SimpleText
          text={
            Translate.accountMoneySum +
            commonTranslator.col +
            props.accountMoneySum
          }
        />
      </PhoneView>
      {items !== undefined && (
        <CommonDataTable columns={columns} data={items} groupOps={[]} />
      )}
    </CommonWebBox>
  );
}
export default List;
