import React, {useState} from 'react';
import {Image} from 'react-native';
import {getDevice} from '../../../../../services/Utility';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import RenderHTML from 'react-native-render-html';
import {styles} from '../../../../../styles/Common/Styles';
import {dispatchPackagesContext, packagesContext} from '../Context';

function Detail(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [item, setItem] = useState();
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;
  const [img, setImg] = useState();
  const [isWorking, setIsWorking] = useState();

  const back = React.useCallback(() => {
    props.setMode('list');
  }, [props]);

  const fetchPackageLocal = React.useCallback(() => {}, [props]);

  React.useEffect(() => {
    if (state.selectedPackage !== undefined) return;
    back();
  }, [back, state.selectedPackage]);

  React.useEffect(() => {
    if (item !== undefined) setImg(item.img);
  }, [item]);

  React.useEffect(() => {
    if (state.selectedPackage !== undefined) {
      setItem(state.selectedPackage);
      return;
    }
    fetchPackageLocal();
  }, [state.selectedPackage, fetchPackageLocal]);

  return (
    <>
      {state.selectedPackage === undefined && <></>}
      {state.selectedPackage !== undefined && (
        <MyView>
          <CommonWebBox
            header={state.selectedPackage.title}
            onBackClick={() => dispatch({selectedPackage: undefined})}
            backBtn={true}></CommonWebBox>
          <CommonWebBox width={isInPhone ? '100%' : '70%'}>
            <PhoneView>
              <Image
                source={img}
                resizeMode={'cover'}
                style={{width: isInPhone ? '100%' : '60%', height: 300}}
              />
              <MyView style={{...styles.padding20, ...styles.gap10}}>
                <SimpleText
                  style={{...styles.BlueBold}}
                  text={'توضیحات دوره'}
                />
                <RenderHTML
                  contentWidth={'100%'}
                  source={{
                    html: state.selectedPackage.description,
                  }}
                />
              </MyView>
            </PhoneView>
          </CommonWebBox>
        </MyView>
      )}
    </>
  );
}

export default Detail;
