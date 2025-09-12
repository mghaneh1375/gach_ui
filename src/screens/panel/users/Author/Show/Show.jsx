import {CommonWebBox, MyView} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import Translate from '../translator';
import columns from './tansactionTableStructure';
import React, {useState} from 'react';
import {getLastTransaction, getTransations} from '../list/utility';
import {routes} from '@/api/apiRoutes';
function Show(props) {
  const [isWorking, setIsWorking] = useState(false);
  React.useEffect(() => {
    if (isWorking || props.author.transactions !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([getTransations(props.author.id, props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] !== undefined) props.author.transactions = res[0];
      else props.author.transactions = [];
      props.updateAuthor(props.author);
      setIsWorking(false);
    });
  }, [props, isWorking]);
  const setTransactions = async items => {
    props.author.transactions = items;
    const res = await getLastTransaction(props.author.id, props.token);
    if (res !== null) {
      props.author.sumPayment = res.sumPayment;
      props.author.lastTransaction = res.lastTransaction;
    }
    props.updateAuthor(props.author);
  };
  return (
    <CommonWebBox
      header={Translate.showAuthor}
      addBtn={true}
      onAddClick={() => props.setMode('createTransaction')}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <MyView>
        {props.author.transactions !== undefined && (
          <CommonDataTable
            columns={columns}
            data={props.author.transactions}
            setData={setTransactions}
            groupOps={[]}
            removeUrl={routes.removeAuthorTransactions + props.author.id}
            token={props.token}
            setLoading={props.setLoading}
          />
        )}
      </MyView>
    </CommonWebBox>
  );
}
export default Show;
