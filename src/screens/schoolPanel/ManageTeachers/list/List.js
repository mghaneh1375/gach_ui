import React, {useState} from 'react';
import {CommonWebBox, PhoneView, MyView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from '../../ManageTeachers/list/TableStructure';
import Ops from '../list/Ops/Ops';
import Translate from '../Translate';

function List(props) {
  const [selectedId, setSelectedId] = useState();
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = idx => {
    props.setSelectedTeacher(props.data[idx]);
    setSelectedId(props.data[idx].id);
    toggleShowOpPopUp();
  };
  return (
    <MyView>
      {showOpPopUp && (
        <Ops
          selectedId={selectedId}
          data={props.data}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={props.setLoading}
          edit={props.edit}
          remove={props.remove}
          setMode={props.setMode}
        />
      )}
      <CommonWebBox
        header={Translate.managementTeacher}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <CommonDataTable
          columns={columns}
          data={props.data}
          setData={props.setData}
          handleOp={handleOp}
        />
      </CommonWebBox>
      {/* <PhoneView>
        <MiniCard
          remove={ids => props.remove(ids)}
          src={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/800px-Orange-Whole-%26-Split.jpg'
          }
          header={'سلام دانشجو'}
          text={'توضیحات متن'}
        />
        <MiniCard
          data={props.data}
          setData={props.setData}
          src={
            'https://images.unsplash.com/photo-1598646319019-0001e1300494?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80'
          }
          header={'سلام دبیر'}
          text={'مثال متن'}
        />
        <MiniCard
          data={props.data}
          setData={props.setData}
          src={
            'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          }
          header={'سلام دانش آموز'}
          text={'توضیحات '}
        />
        <MiniCard />
      </PhoneView> */}
    </MyView>
  );
}

export default List;
