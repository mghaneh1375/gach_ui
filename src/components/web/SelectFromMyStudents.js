import React, {useState} from 'react';
import {getAllStudent} from '../../screens/schoolPanel/ManageStudents/Utility';
import CommonDataTable from '../../styles/Common/CommonDataTable';
import {LargePopUp} from '../../styles/Common/PopUp';
import commonTranslator from '../../translator/Common';

function SelectFromMyStudents(props) {
  const [data, setData] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const fetchStudents = React.useCallback(() => {
    if (isWorking || props.myStudents !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([getAllStudent(props.token)]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.setMyStudents([]);
        setData([]);
        // dispatch({myStudents: []});
        return;
      }

      setData(res[0]);
      props.setMyStudents(res[0]);
      setIsWorking(false);
      //   dispatch({myStudents: res[0]});
    });
  }, [props, isWorking]);

  React.useEffect(() => {
    if (data !== undefined) return;
    if (props.myStudents === undefined) fetchStudents();
    else setData(props.myStudents);
  }, [data, props.myStudents, fetchStudents]);

  const columns = [
    {
      name: commonTranslator.name + ' و ' + commonTranslator.lastname,
      selector: row => row.name,
      grow: 1,
    },
    {
      name: commonTranslator.NID,
      selector: row => row.NID,
      grow: 1,
      center: true,
    },
  ];

  return (
    <LargePopUp toggleShowPopUp={props.toggleShowPopUp} title={props.title}>
      {data !== undefined && (
        <CommonDataTable
          groupOps={[
            {
              key: 'select',
              label: commonTranslator.select,
              warning: 'آیا از انتخاب دانش آموزان انتخاب شده اطمینان دارید؟',
              afterFunc: arr => {
                if (props.selectedStudents !== undefined) {
                  let tmp = [];
                  arr.forEach(elem => {
                    if (
                      props.selectedStudents.find(e => e.id === elem.id) ===
                      undefined
                    )
                      tmp.push(elem);
                  });

                  let tmp2 = [];
                  props.selectedStudents.forEach(elem => {
                    tmp2.push(elem);
                  });

                  tmp.forEach(e => {
                    tmp2.push(e);
                  });

                  props.setSelectedStudents(tmp2);
                  //   dispatch({selectedStudents: tmp2});
                } else {
                  props.setSelectedStudents(arr);
                  //   dispatch({selectedStudents: arr});
                }

                props.toggleShowPopUp();
              },
            },
          ]}
          excel={false}
          columns={columns}
          pagination={false}
          data={data}
        />
      )}
    </LargePopUp>
  );
}

export default SelectFromMyStudents;
