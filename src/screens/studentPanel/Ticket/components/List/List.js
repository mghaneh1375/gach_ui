import {View} from 'react-native-web';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import {Translate} from '../../Translate';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import Digest from '../Digest/Digest';
import Filter from '../../../../panel/ticket/components/ProSearch/Filter';
import {editItem} from '../../../../../services/Utility';

function List(props) {
  return (
    <MyView>
      <CommonWebBox
        header={Translate.sendRequest}
        addBtn={true}
        onAddClick={() => props.setMode('create')}></CommonWebBox>
      <CommonWebBox style={{marginTop: -5}}>
        <MyView style={{padding: 5}}>
          <Filter
            setTickets={props.setTickets}
            isAdmin={false}
            token={props.token}
            setLoading={props.setLoading}
          />
        </MyView>
      </CommonWebBox>
      {props.tickets !== undefined &&
        props.tickets.map((elem, index) => {
          return (
            <Digest
              ticket={elem}
              setSelectedTicket={props.setSelectedTicket}
              setMode={props.setMode}
              key={index}
              removeTicket={props.removeTicket}
              updateTicket={newItem =>
                editItem(props.tickets, props.setTickets, newItem)
              }
              token={props.token}
              setLoading={props.setLoading}
            />
          );
        })}
    </MyView>
  );
}

export default List;
