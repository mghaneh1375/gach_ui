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
import {style} from '../../ticket/components/Show/AttachBox/style';
// import 'react-wheel-of-prizes/dist/index.css';

function Spinner(props) {
  const [spins, setSpins] = useState();
  const [selectedSpin, setSelectedSpin] = useState();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showWheelComponent, setShowWheelComponent] = useState(true);
  const [award, setAward] = useState();
  const [repeat, setRepeat] = useState();

  function incRepeat() {
    if (repeat === undefined) setRepeat('second');
    else if (repeat === 'second') setRepeat('third');
    else if (repeat === 'third') setRepeat('forth');
    else if (repeat === 'forth') setRepeat('fifth');
  }

  const [coinForSecondTime, setCoinForSecondTime] = useState();
  const [coinForThirdTime, setCoinForThirdTime] = useState();
  const [coinForForthTime, setCoinForForthTime] = useState();
  const [coinForFifthTime, setCoinForFifthTime] = useState();

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

      setSelectedSpin(
        res[0].spins.find(elem => now - elem.created_at > 300000).label,
      );

      if (res[0].coinForSecondTime !== undefined)
        setCoinForSecondTime(res[0].coinForSecondTime);

      if (res[0].coinForThirdTime !== undefined)
        setCoinForThirdTime(res[0].coinForThirdTime);

      if (res[0].coinForForthTime !== undefined)
        setCoinForForthTime(res[0].coinForForthTime);

      if (res[0].coinForFifthTime !== undefined)
        setCoinForFifthTime(res[0].coinForFifthTime);
    });
  }, [props]);

  useEffectOnce(() => {
    fetchSpins();
  }, [fetchSpins]);

  const rotateAgain = async r => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.buildSpinnerAgain + props.id + `?mode=site&repeat=${r}`,
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

      setSelectedSpin(
        res[0].spins.find(elem => now - elem.created_at > 300000).label,
      );

      setShowCongratulations(false);
      setShowWheelComponent(true);
    });
  };

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
      repeat === undefined
        ? routes.giveMyGift + '?id=' + props.id
        : routes.giveMyGift + '?id=' + props.id + `&repeat=${repeat}`,
      'post',
      undefined,
      repeat === undefined ? undefined : 'data',
      props.token,
    );

    if (res === null) {
      props.setLoading(false);
      return;
    }

    if (repeat !== undefined) {
      props.setLoading(false);
      if (res.coinForThirdTime !== undefined)
        setCoinForThirdTime(res.coinForThirdTime);
      else setCoinForThirdTime(undefined);

      if (res.coinForForthTime !== undefined)
        setCoinForForthTime(res.coinForForthTime);
      else setCoinForForthTime(undefined);

      if (res.coinForFifthTime !== undefined)
        setCoinForFifthTime(res.coinForFifthTime);
      else setCoinForFifthTime(undefined);
    } else {
      res = await generalRequest(
        routes.getMyAlerts,
        'get',
        undefined,
        'data',
        props.token,
      );

      props.setLoading(false);

      if (res !== null) props.updateAlerts(res);
      else props.updateAlerts([]);
    }

    incRepeat();
    setShowCongratulations(true);
    setShowWheelComponent(false);
    setAward(gift);
  };

  return (
    <>
      {spins !== undefined && (
        <MyViewWithRef style={{...styles.alignItemsCenter}}>
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
                  ...styles.cursor_pointer,
                }}
                onPress={() => props.navigate('/myOffs')}
              />
              {((repeat === 'second' && coinForSecondTime !== undefined) ||
                (repeat === 'third' && coinForThirdTime !== undefined) ||
                (repeat === 'forth' && coinForForthTime !== undefined) ||
                (repeat === 'fifth' && coinForFifthTime !== undefined)) && (
                <MyView style={{...styles.marginTop50}}>
                  <SimpleText
                    style={{
                      ...styles.BlueBold,
                      ...styles.alignSelfCenter,
                      ...styles.fontSize20,
                      ...styles.colorGreen,
                    }}
                    text={'آیا می خواهید در گردونه شانس مجددا شرکت کنید؟'}
                  />
                  <SimpleText
                    style={{
                      ...styles.BlueBold,
                      ...styles.alignSelfCenter,
                      ...styles.fontSize20,
                      ...styles.colorGreen,
                    }}
                    text={
                      'فقط کافیه ' +
                      (repeat === 'second'
                        ? coinForSecondTime
                        : repeat === 'third'
                        ? coinForThirdTime
                        : repeat === 'forth'
                        ? coinForForthTime
                        : coinForFifthTime) +
                      ' ایکس پول بدهید'
                    }
                  />
                  <SimpleText
                    style={{
                      ...styles.BlueBold,
                      ...styles.alignSelfCenter,
                      ...styles.fontSize20,
                      ...styles.colorGreen,
                      ...styles.cursor_pointer,
                    }}
                    onPress={() => {
                      rotateAgain(repeat);
                    }}
                    text={'بزن بریم!!'}
                  />
                </MyView>
              )}
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
              onFinished={winner =>
                setTimeout(() => {
                  onFinished(winner);
                }, 1000)
              }
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
