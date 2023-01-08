import React, {useRef, useState} from 'react';
import WheelComponent from 'react-wheel-of-prizes';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {getDevice, getWidthHeight} from '../../../../services/Utility';
import {MyView, MyViewWithRef, SimpleText} from '../../../../styles/Common';
import Confetti from 'react-confetti';
import vars from '../../../../styles/root';
import {styles} from '../../../../styles/Common/Styles';
// import 'react-wheel-of-prizes/dist/index.css';

function Spinner(props) {
  const ref1 = useRef();
  // const ref2 = useRef();
  const [spins, setSpins] = useState();
  const [selectedSpin, setSelectedSpin] = useState();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showWheelComponent, setShowWheelComponent] = useState(true);
  const [award, setAward] = useState();

  const fetchSpins = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.buildSpinner + props.id + '?mode=site',
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setSpins(
        res[0].spins.map(elem => {
          return elem.label;
        }),
      );
      let now = Date.now();
      console.log(
        res[0].spins.find(elem => now - elem.created_at > 300000).label,
      );
      setSelectedSpin(
        res[0].spins.find(elem => now - elem.created_at > 300000).label,
      );
    });
  }, [props]);

  useEffectOnce(() => {
    fetchSpins();
  }, [fetchSpins]);

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

  const onFinished = async gift => {
    props.setLoading(true);
    let res = await generalRequest(
      routes.giveMyGift + '?gift=' + props.id,
      'post',
      undefined,
      undefined,
      props.token,
    );

    props.setLoading(false);
    if (res[0] === null) return;

    setShowCongratulations(true);
    setShowWheelComponent(false);
    setAward(gift);
  };

  // const {width, height} = useWindowSize();
  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  React.useEffect(() => {
    if (ref1 === undefined || ref1.current === undefined || !isInPhone) return;

    ref1.current.children[0].children[0].style.width = '480px';
    ref1.current.children[0].children[0].style.marginRight = '-131px';
  }, [ref1, isInPhone]);

  React.useEffect(() => {
    if (ref1 === undefined || ref1.current === undefined || isInPhone) return;

    let w = getWidthHeight()[0] - vars.RIGHT_MENU_WIDTH;
    console.log(w + 'px');
    let h = 0.8 * w;

    // ref1.current.children[0].children[0].style.width = w + 'px';
    // ref1.current.children[0].children[0].style.height = h + 'px';
    // ref1.current.children[0].children[0].style.marginRight = '-131px';
  }, [ref1, isInPhone]);

  // React.useEffect(() => {
  //   if (ref2 === undefined || !isInPhone) return;
  //   ref2.current.style.width = '21%';
  // }, [ref2, isInPhone]);

  return (
    <>
      {/* <div
        ref={ref2}
        className="divRight"
        style={{
          height: '100%',
          width: '30%',
          position: 'fixed',
          zIndex: '1',
        }}></div> */}
      {spins !== undefined && (
        <MyViewWithRef ref={ref1}>
          {showCongratulations && (
            <MyView>
              <SimpleText
                text={`تبریک شما برنده ${award} شدید`}
                style={{
                  ...styles.BlueBold,
                  ...styles.alignSelfCenter,
                  ...styles.fontSize25,
                  ...styles.colorGreen,
                  ...{marginTop: '200px'},
                }}
              />
              <SimpleText
                text={' برای مشاهده جزییات کلیک کنید'}
                style={{
                  ...styles.BlueBold,
                  ...styles.alignSelfCenter,
                  ...styles.fontSize20,
                  ...styles.colorGreen,
                }}
                onPress={() => props.navigate('/myOffs')}
              />
            </MyView>
          )}
          {showCongratulations && (
            <Confetti
              numberOfPieces={500}
              width={getWidthHeight()[0] - vars.RIGHT_MENU_WIDTH}
              height={'1000'}
            />
          )}
          {showWheelComponent && selectedSpin !== undefined && (
            <WheelComponent
              segments={spins}
              segColors={segColors}
              winningSegment={selectedSpin}
              onFinished={async winner => await onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="چرخنده"
              isOnlyOnce={true}
              size={260}
              upDuration={600}
              downDuration={10000}
              fontFamily="IRANSans"
            />
          )}
        </MyViewWithRef>
      )}
    </>
  );
}
export default Spinner;
