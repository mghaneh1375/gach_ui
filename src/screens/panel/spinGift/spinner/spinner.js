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
  const ref2 = useRef();
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
  console.log(ref2.style);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  React.useEffect(() => {
    if (ref1 === undefined || !isInPhone) return;
    ref1.current.children[0].children[0].style.width = '480px';
    ref1.current.children[0].children[0].style.marginRight = '-131px';
  }, [ref1, isInPhone]);

  React.useEffect(() => {
    if (ref2 === undefined || !isInPhone) return;
    ref2.current.style.width = '21%';
  }, [ref2, isInPhone]);
  return (
    <>
      <div
        ref={ref2}
        className="divRight"
        style={{
          height: '100%',
          width: '30%',
          position: 'fixed',
          zIndex: '1',
        }}></div>
      <MyViewWithRef ref={ref1}>
        <WheelComponent
          segments={segments}
          segColors={segColors}
          winningSegment="محمد حسین"
          onFinished={winner => onFinished(winner)}
          primaryColor="black"
          contrastColor="white"
          buttonText="چرخنده"
          isOnlyOnce={false}
          size={260}
          upDuration={600}
          downDuration={10000}
          fontFamily="IRANSans"
        />
      </MyViewWithRef>
    </>
  );
}
export default Spinner;
