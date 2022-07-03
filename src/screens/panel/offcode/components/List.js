import {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import Ops from './Ops';
import commonTranslator from '../../../../tranlates/Common';
import translator from '../Translator';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const List = props => {
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const changeMode = newMode => {
    props.setMode(newMode);
  };

  const columns = [
    {
      name: 'نام کاربر',
      selector: row => row.user,
      grow: 1,
    },
    {
      name: 'مقدار',
      selector: row => row.amount,
      grow: 1,
    },
    {
      name: 'نوع',
      selector: row => (row.type === 'value' ? 'مقداری' : 'درصدی'),
      grow: 1,
    },
    {
      name: 'زمان ایجاد',
      selector: row => row.createdAt,
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.createdAt - b.createdAt;
      },
    },
    {
      name: 'زمان انقضا',
      selector: row => row.expireAt,
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.expireAt - b.expireAt;
      },
    },
    {
      name: 'زمان استفاده',
      selector: row => row.usedAt,
      grow: 4,
      wrap: true,
      style: {
        minWidth: '200px !important',
      },
      sortable: true,
      sortFunction: (a, b) => {
        return a.usedAt - b.usedAt;
      },
    },
  ];

  const handleOp = idx => {
    props.setSelectedOff(props.offs[idx]);
    toggleShowOpPopUp();
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          off={props.selectedOff}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          updateOff={props.updateOff}
          setMode={props.setMode}
          removeOffs={props.removeOffs}
        />
      )}
      <CommonWebBox
        child={
          <View>
            <TextIcon
              onPress={() => changeMode('create')}
              theme={'rect'}
              text={translator.offs}
              icon={faPlus}
            />
            <CommonDataTable
              columns={columns}
              data={props.offs}
              handleOp={handleOp}
            />
          </View>
        }
      />
    </View>
  );
};

export default List;
