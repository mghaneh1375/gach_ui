import React from 'react';
import vars from '../../../../styles/root';
import translator from '../../../../tranlates/Common';
import {CommonButton} from '../../../../styles/Common';
// import './Style.css';

const Buttons = () => {
  return (
    <div className="rowContainer">
      <CommonButton className="cancleBtn" title={translator.cancel} />
      <CommonButton
        style={{backgroundColor: vars.DARK_BLUE}}
        title={translator.nextStep}
      />
    </div>
  );
};

export default Buttons;
