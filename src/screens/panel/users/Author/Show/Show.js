import {View} from 'react-native';
import {CommonWebBox} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Translate from '../Translator';
import columns from './TansactionTableStructure';
import React, {useState} from 'react';
import {getLastTransaction, getTransations} from '../List/Utility';
import {routes} from '../../../../../API/APIRoutes';

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
    let res = await getLastTransaction(props.author.id, props.token);
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
      <View style={{zIndex: 'unset'}}>
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
      </View>
    </CommonWebBox>
  );
}

export default Show;
