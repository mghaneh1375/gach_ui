import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import React, {useState} from 'react';
import {styles} from '../../../../styles/Common/Styles';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {barcodeContext, dispatchBarcodeContext} from './Context';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import columns from './TableStructure';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(barcodeContext),
    React.useContext(dispatchBarcodeContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [title, setTitle] = useState();
  const values = [
    {id: 1, item: 'salam'},
    {id: 2, item: 'chetori'},
  ];

  const [isWorking, setIsWorking] = useState(false);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.barcodes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.fetchAllCertificate,
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

      dispatch({barcodes: res[0]});
      setIsWorking(false);
    });
  }, [props, isWorking, dispatch, state.barcodes]);

  React.useEffect(() => {
    if (state.barcodes !== undefined) return;
    fetchData();
  }, [state.barcodes, fetchData]);

  const handleOp = idx => {
    console.log(idx);
    // toggleShowOpPopUp();
  };

  return (
    <CommonWebBox
      header={'افزودن بارکد جدید'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <MyView>
        <SimpleText style={{...styles.BlueBold}} text={'sada'} />
        <JustBottomBorderTextInput
          isHalf={true}
          placehoder={'عنوان آزمون'}
          subText={'عنوان آزمون'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          placehoder={'عنوان آزمون'}
          subText={'عنوان آزمون'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
      </MyView>
      <PhoneView style={{...styles.gap10}}>
        <JustBottomBorderTextInput
          placehoder={'عنوان آزمون'}
          subText={'عنوان آزمون'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
        <JustBottomBorderTextInput
          placehoder={'عنوان آزمون'}
          subText={'عنوان آزمون'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
      </PhoneView>
      <EqualTwoTextInputs>
        <JustBottomBorderTextInput
          placehoder={'عنوان آزمون'}
          subText={'عنوان آزمون'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
        <JustBottomBorderTextInput
          placehoder={'عنوان آزمون'}
          subText={'عنوان آزمون'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
      </EqualTwoTextInputs>

      <FontIcon kind={'normal'} theme="rect" back={'yellow'} icon={faPlus} />

      <SimpleFontIcon kind={'normal'} icon={faPlus} />
      <JustBottomBorderSelect
        placehoder={'عنوان آزمون'}
        subText={'عنوان آزمون'}
        values={values}
        setter={setTitle}
        value={
          title === undefined
            ? undefined
            : values.find(elem => elem.id === title)
        }
      />

      {state.barcodes !== undefined && (
        <CommonDataTable
          removeUrl={routes.removeCertificate}
          handleOp={handleOp}
          columns={columns}
          data={state.barcodes}
        />
      )}
    </CommonWebBox>
  );
}

export default Create;
