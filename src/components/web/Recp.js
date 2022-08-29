import React, {useRef, useCallback} from 'react';
import {
  CommonButton,
  CommonWebBox,
  MyViewWithRef,
  SimpleText,
} from '../../styles/Common';
import commonTranslator from '../../translator/Common';
import {jsPDF} from 'jspdf';
import {toPng} from 'html-to-image';
import {showError} from '../../services/Utility';

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
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        await pdf.save('download.pdf');
        props.setLoading(false);
      })
      .catch(err => {
        console.log(err);
        showError(commonTranslator.err);
        props.setLoading(false);
      });
  }, [ref, props]);

  return (
    <MyViewWithRef ref={ref}>
      <CommonWebBox
        header={commonTranslator.recp}
        backBtn={true}
        onBackClick={() => props.onBackClick()}>
        <CommonButton
          theme={'dark'}
          onPress={() => print()}
          title={commonTranslator.downloadRecp}
        />
        <SimpleText text={props.user.firstName + ' ' + props.user.lastName} />
        {props.recp.for !== undefined && <SimpleText text={props.recp.for} />}
        {props.recp.paid !== undefined && <SimpleText text={props.recp.paid} />}
        {props.recp.createdAt !== undefined && (
          <SimpleText text={props.recp.createdAt} />
        )}
        {props.recp.refId !== undefined && (
          <SimpleText text={props.recp.refId} />
        )}
      </CommonWebBox>
    </MyViewWithRef>
  );
}

export default Recp;
