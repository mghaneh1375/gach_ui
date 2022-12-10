import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {CommonButton, MyView, SimpleText} from '../styles/Common';

function ChunkUpload(props) {
  const [showProgress, setShowProgress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState({});
  const [progress, setProgress] = useState(0);
  const [fileGuid, setFileGuid] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const chunkSize = 1048576 * 3;

  const getFileContext = () => {
    resetChunkProperties();
    const _file = props.file;
    console.log(_file);
    setFileSize(_file.size);
    console.log(_file.size);
    const _totalCount =
      _file.size % chunkSize == 0
        ? _file.size / chunkSize
        : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
    console.log(_totalCount);
    const _fileID = '12221321312.mp4';
    setFileGuid(_fileID);
    fileUpload(counter, _totalCount, _fileID, 0, chunkSize);
  };

  const resetChunkProperties = () => {
    setProgress(0);
  };
  const fileUpload = (
    counter,
    chunkCount,
    filename,
    beginingOfTheChunk,
    endOfTheChunk,
  ) => {
    console.log(counter);
    console.log(chunkCount);
    if (counter <= chunkCount) {
      var chunk = props.file.slice(beginingOfTheChunk, endOfTheChunk);
      console.log(chunk);
      uploadChunk(counter, chunkCount, filename, endOfTheChunk, chunk);
    }
  };

  const uploadChunk = async (
    counter,
    chunkCount,
    filename,
    endOfTheChunk,
    chunk,
  ) => {
    try {
      const response = await axios.post(
        'http://localhost:8081/api/package_content/manage/setSessionVideo/' +
          props.contentId +
          '/' +
          props.sessionId +
          '/' +
          counter,
        chunk,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + props.token,
          },
        },
      );
      const data = response.data;
      if (data.isSuccess) {
        if (counter == chunkCount) {
          console.log('Process is complete, counter', counter);
          await uploadCompleted();
        } else {
          var percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
          fileUpload(
            counter + 1,
            chunkCount,
            filename,
            endOfTheChunk,
            endOfTheChunk + chunkSize,
          );
        }
      } else {
        console.log('Error Occurred:', data.errorMessage);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const uploadCompleted = async () => {
    var formData = new FormData();
    formData.append('fileName', fileGuid);
    const response = await axios.post(
      'http://localhost:8081/api/package_content/manage/setSessionVideo/' +
        props.contentId +
        '/' +
        props.sessionId,
      {},
      {
        params: {
          fileName: fileGuid,
        },
        data: formData,
      },
    );
    const data = response.data;
    if (data.isSuccess) {
      setProgress(100);
    }
  };

  return (
    <MyView>
      <CommonButton title="salam" onPress={async () => getFileContext()} />
      <SimpleText text={progress} />
    </MyView>
  );
}

export default ChunkUpload;
