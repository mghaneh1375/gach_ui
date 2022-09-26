import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../App';
import StudentCard from '../../../components/web/StudentCard';
import {CommonWebBox, PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import {fetchRankingList} from './Utility';

function RankingList(props) {
  const navigate = props.navigate;
  const [isWorking, setIsWorking] = useState(false);
  const [data, setData] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (isWorking || data !== undefined) return;

    setIsWorking(true);
    dispatch({loading: true});

    Promise.all([fetchRankingList()]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, navigate, data]);

  return (
    <CommonWebBox>
      <PhoneView style={{...styles.gap10}}>
        {data !== undefined &&
          data.map((elem, index) => {
            return <StudentCard key={index} std={elem} />;
          })}
      </PhoneView>
    </CommonWebBox>
  );
}

export default RankingList;
