import React, {useState} from 'react';
import {CommonWebBox, MyView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';

function List(props) {
  const [title, setTitle] = useState();

  // const columns = [
  //   {
  //     name: 'عنوان',
  //     selector: 'mmd',
  //     grow: 3,
  //     center: true,
  //   },
  //   {
  //     name: 'تاریخ ایجاد',
  //     selector: 'mmd',
  //     grow: 2,
  //     center: true,
  //   },
  // ];
  return (
    <CommonWebBox
      header={' جلسات مشاوره '}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <MyView>
        <JustBottomBorderTextInput
          isHalf={true}
          placehoder={'عنوان جلسه'}
          subText={'عنوان جلسه'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
      </MyView>
      <MyView>
        <JustBottomBorderTextInput
          isHalf={true}
          placehoder={'عنوان جلسه'}
          subText={'عنوان جلسه'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
      </MyView>
      <CommonDataTable
      // removeUrl={routes.removeCertificate}
      // handleOp={handleOp}
      // columns={columns}
      // data={state.barcodes}
      />
    </CommonWebBox>
  );
}

export default List;
