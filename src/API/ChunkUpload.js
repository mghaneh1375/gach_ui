import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {CommonButton, MyView, SimpleText} from '../styles/Common';
import {videoGeneralRequest} from './Utility';
import {routes} from './APIRoutes';

function ChunkUpload(props) {
  const [progress, setProgress] = useState(0);
  const chunkSize = 1048576 * 3;

  const getFileContext = () => {
    resetChunkProperties();
    const _totalCount =
      props.file.size % chunkSize == 0
        ? props.file.size / chunkSize
        : Math.floor(props.file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file

    getGrantForUpload(_totalCount);
  };

  const getGrantForUpload = _totalCount => {
    Promise.all([
      videoGeneralRequest(
        routes.setSessionVideo +
          props.contentId +
          '/' +
          props.sessionId +
          '/' +
          props.file.size,
        'post',
        undefined,
        'filename',
        props.token,
      ),
    ]).then(res => {
      if (res[0] != null) {
        fileUpload(0, _totalCount, res[0], 0, chunkSize);
      }
    });
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
    if (counter <= chunkCount) {
      var chunk = props.file.slice(beginingOfTheChunk, endOfTheChunk);
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
        'http://localhost:8086/api/package_content/manage/sessionVideoChunkFile/' +
          filename,
        chunk,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + props.token,
          },
        },
      );
      const data = response.data;
      if (data.status === 'ok') {
        if (counter == chunkCount - 1) {
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
    const response = await axios.post(
      'http://localhost:8086/api/package_content/manage/completeUploadSessionVideo/' +
        props.contentId +
        '/' +
        props.sessionId,
      undefined,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + props.token,
        },
      },
    );
    const data = response.data;
    if (data.status == 'ok') {
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
