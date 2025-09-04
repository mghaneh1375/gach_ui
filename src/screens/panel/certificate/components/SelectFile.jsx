import React from 'react';
import JustBottomBorderTextInput from '../../../../styles/common/JustBottomBorderTextInput.jsx';
import certTranslator from '../translator';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFolderOpen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {SimpleText} from '../../../../styles/Common.jsx';
// import './Style.css';

const SelectFile = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <JustBottomBorderTextInput
        subText={certTranslator.formate}
        placeholder={certTranslator.fileNotSelect}
      />
      <FontAwesomeIcon
        icon={faFolderOpen}
        style={{
          color: '#707070',
          marginRight: '10px',
          marginLeft: '10px',
        }}
      />
      <FontAwesomeIcon
        icon={faTrash}
        style={{
          color: '#ff6600',
          marginLeft: '10px',
        }}
      />
      <div className="progressContainer">
        <div className="progressBar" />
      </div>
      <SimpleText
        text={certTranslator.fortyPercent}
        style={{
          margin: '5px 5px 0 0',
        }}
      />
    </div>
  );
};
export default SelectFile;
