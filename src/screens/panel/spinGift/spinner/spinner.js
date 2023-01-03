// import {dispatchStateContext, globalStateContext} from '../../../App';
import React, {useRef, useState} from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import {getDevice} from '../../../../services/Utility';
import {MyViewWithRef} from '../../../../styles/Common';
// import 'react-wheel-of-prizes/dist/index.css';
// import {SpinnerProvider} from './component/contex';
// import List from './components/List';
// import Create from './components/Create';

function Spinner(props) {
  const ref1 = useRef();
  const segments = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher',
    'mmd',
    'ali',
    'محمد حسین',
    'mmd',
  ];
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
    '#34A24F',
  ];
  const onFinished = winner => {
    console.log(winner);
  };

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  React.useEffect(() => {
    if (ref1 === undefined) return;
    if (isInPhone) ref1.current.children[0].children[0].style.width = '300px';
  }, [ref1, isInPhone]);
  return (
    <MyViewWithRef ref={ref1}>
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment="محمد حسین"
        onFinished={winner => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="چرخنده"
        isOnlyOnce={true}
        size={260}
        upDuration={600}
        downDuration={10000}
        fontFamily="IRANSans"
      />
    </MyViewWithRef>
  );
}
export default Spinner;
