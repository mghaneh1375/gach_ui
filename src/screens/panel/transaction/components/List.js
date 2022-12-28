import React, {useState} from 'react';
import {CommonWebBox, PhoneView, SimpleText} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import commonTranslator from '../../../../translator/Common';
import columns from './TableStructure';
import Filter from './Fliter/Filter';
import Translate from '../Translate';
import {styles} from '../../../../styles/Common/Styles';

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
      <PhoneView style={{...styles.gap30}}>
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
