import React, {useState} from 'react';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import {courseContext, dispatchCourseContext} from './Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(courseContext),
    React.useContext(dispatchCourseContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [title, setTitle] = useState();
  const values = [
    {id: 1, item: 'salam'},
    {id: 2, item: 'chetori'},
  ];

  return (
    <CommonWebBox
      header={'افزودن جلسه مشاوره جدید'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <MyView>
        <JustBottomBorderTextInput
          isHalf={true}
          placehoder={'1عنوان جلسه'}
          subText={'عنوان جلسه'}
          value={title}
          onChangeText={e => setTitle(e)}
        />
      </MyView>
      {/*<PhoneView style={{...styles.gap10}}>
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
      /> */}

      {/* {state.barcodes !== undefined && (
        <CommonDataTable
          removeUrl={routes.removeCertificate}
          handleOp={handleOp}
          columns={columns}
          data={state.barcodes}
        />
      )} */}
    </CommonWebBox>
  );
}

export default Create;
