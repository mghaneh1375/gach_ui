import React, {useState} from 'react';
import {View} from 'react-native';
import {filter} from '../Utility';
import Question from './Question';

function Detail(props) {
  const [isWorking, setIsWorking] = useState();

  React.useEffect(() => {
    if (isWorking || props.subject.questions !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      filter(
        props.token,
        undefined,
        undefined,
        props.subject.subject.id,
        undefined,
        undefined,
        true,
      ),
    ]).then(res => {
      props.setLoading(false);
      setIsWorking(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      props.setSubject(res[0][0]);
    });
  }, [props, isWorking]);

  return (
    <View>
      {props.subject.questions !== undefined &&
        props.subject.questions.map((elem, index) => {
          return <Question question={elem} key={index} />;
        })}
    </View>
  );
}

export default Detail;
