import React, {useRef, useCallback} from 'react';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  MyViewWithRef,
  PhoneView,
  SimpleText,
} from '../../styles/Common';
import commonTranslator from '../../translator/Common';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';
import {formatPrice, showError} from '../../services/Utility';
import {FontIcon} from '../../styles/Common/FontIcon';
import {faArrowLeft, faPrint} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../styles/Common/Styles';
import vars from '../../styles/root';
import {Image} from 'react-native';

function Recp(props) {
  const ref = useRef();

  const print = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    props.setLoading(true);

    toPng(ref.current, {cacheBust: true})
      .then(async dataUrl => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 50;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 25, 25, pdfWidth, pdfHeight);
        await pdf.save('download.pdf');
        props.setLoading(false);
      })
      .catch(err => {
        console.log(err);
        showError(commonTranslator.err);
        props.setLoading(false);
      });
  }, [ref, props]);

  const recpStyle = {
    label: {
      fontSize: 15,
      minWidth: 110,
      maxWidth: 110,
      textAlign: 'right',
      alignSelf: 'center',
    },
    value: {
      // fontSize: 18,
      marginBottom: 15,
      marginRight: 10,
      borderBottomWidth: 1,
      borderColor: vars.LIGHT_SILVER,
      minWidth: 150,
      textAlign: 'center',
      borderStyle: 'dashed',
      width: 'calc(100% - 120px)',
    },
    pair: {
      marginTop: 20,
      width: 'calc(50% - 5px)',
      alignItems: 'center',
    },
    fullPair: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
    },
  };

  return (
    <MyView>
      <CommonWebBox
        header={commonTranslator.recp}
        btn={
          <PhoneView style={(styles.alignItemsCenter, styles.gap15)}>
            <FontIcon
              onPress={() => print()}
              back={'blue'}
              theme="rect"
              kind="normal"
              icon={faPrint}
            />
            {props.onBackClick !== undefined && (
              <FontIcon
                onPress={() => props.onBackClick()}
                theme="rect"
                kind="normal"
                icon={faArrowLeft}
              />
            )}
          </PhoneView>
        }>
        <MyViewWithRef
          ref={ref}
          style={{
            borderWidth: 4,
            borderColor: vars.ORANGE_RED,
            maxWidth: 700,
            width: '100%',
            alignSelf: 'center',
            padding: 40,
          }}>
          <EqualTwoTextInputs>
            <SimpleText
              style={{marginTop: 20, fontSize: 20, color: vars.DARK_BLUE}}
              text={'رسید پرداخت'}
            />
            <Image
              source={require('../../images/irysc.png')}
              style={{
                width: 104,
                height: 60,
                marginBottom: 20,
              }}
            />
          </EqualTwoTextInputs>
          <PhoneView style={styles.gap5}>
            <PhoneView style={recpStyle.pair}>
              <SimpleText style={recpStyle.label} text={'پرداخت کننده'} />
              <SimpleText
                text={props.user.firstName + ' ' + props.user.lastName}
                style={recpStyle.value}
              />
            </PhoneView>

            <PhoneView style={recpStyle.pair}>
              <SimpleText style={recpStyle.label} text={'مبلغ پرداختی'} />
              <SimpleText
                text={formatPrice(props.recp.paid) + ' تومان'}
                style={recpStyle.value}
              />
            </PhoneView>

            <PhoneView style={recpStyle.pair}>
              <SimpleText style={recpStyle.label} text={'تاریخ پرداخت'} />
              <SimpleText
                text={
                  props.recp.createdAt === undefined ? '' : props.recp.createdAt
                }
                style={recpStyle.value}
              />
            </PhoneView>

            {props.recp.refId !== undefined && props.recp.refId !== '' && (
              <PhoneView style={recpStyle.pair}>
                <SimpleText style={recpStyle.label} text={'شناسه پرداخت'} />
                <SimpleText text={props.recp.refId} style={recpStyle.value} />
              </PhoneView>
            )}

            {props.recp.offAmount !== undefined && props.recp.offAmount !== 0 && (
              <PhoneView style={recpStyle.pair}>
                <SimpleText style={recpStyle.label} text={'مقدار تخفیف'} />
                <SimpleText
                  text={formatPrice(props.recp.offAmount) + ' تومان'}
                  style={recpStyle.value}
                />
              </PhoneView>
            )}

            {props.recp.account !== undefined && props.recp.account !== 0 && (
              <PhoneView style={recpStyle.fullPair}>
                <SimpleText
                  style={{fontSize: 15, width: 200, alignSelf: 'center'}}
                  text={'مقدار کسر شده از حساب کاربری'}
                />
                <SimpleText
                  text={formatPrice(props.recp.account) + ' تومان'}
                  style={{
                    marginBottom: 15,
                    marginRight: 10,
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: vars.LIGHT_SILVER,
                    textAlign: 'center',
                    width: 'calc(100% - 210px)',
                  }}
                />
              </PhoneView>
            )}

            <PhoneView style={recpStyle.fullPair}>
              <SimpleText
                style={{fontSize: 15, width: 50, alignSelf: 'center'}}
                text={'بابت'}
              />
              <SimpleText
                text={props.recp.for === undefined ? '' : props.recp.for}
                style={{
                  marginBottom: 15,
                  marginRight: 10,
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: vars.LIGHT_SILVER,
                  textAlign: 'center',
                  width: 'calc(100% - 60px)',
                }}
              />
            </PhoneView>

            <PhoneView
              style={{
                ...styles.alignItemsCenter,
                ...styles.marginTop40,
                ...styles.width100,
              }}>
              <SimpleText
                style={{fontSize: 15, width: 80}}
                text={'مهر و امضا'}
              />
              <SimpleText
                text={''}
                style={{
                  marginRight: 10,
                  borderBottomWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: vars.LIGHT_SILVER,
                  width: 'calc(100% - 90px)',
                }}
              />
            </PhoneView>
          </PhoneView>
        </MyViewWithRef>
      </CommonWebBox>
    </MyView>
  );
}

export default Recp;
