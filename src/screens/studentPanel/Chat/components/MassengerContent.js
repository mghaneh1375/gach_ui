import React, {useState, useEffect} from 'react';
import {getFileType, makeDownload} from '../../../../services/Utility';

function MassengerContent(props) {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    let msg = props.msg;

    let files = [];
    if (msg.files && msg.files.length > 0) {
      files = msg.files.map(file => {
        let fileType = file.split('.');
        fileType = fileType[fileType.length - 1];

        let isPdf = fileType === 'pdf';
        return {
          file,
          isPdf,
        };
      });
    }

    msg.files = files;

    setMessage(msg);
  }, [props.msg]);

  let isFileImg = false;
  let isFileVoice = false;
  if (message.isFile) {
    if (getFileType(message?.file?.url) === 'img') {
      isFileImg = true;
    } else if (getFileType(message?.file?.url) === 'voice') {
      isFileVoice = true;
    }
  }

  const [showBio, setShowBio] = useState(false);

  return (
    <div className={`msgBox ${message.myMsg ? 'myBox' : 'otherBox'}`}>
      <div style={{position: 'relative'}} className="content">
        {props.needPic && (
          <div
            style={message.isForUser ? {} : {cursor: 'pointer'}}
            onClick={() => {
              if (message.isForUser || showBio) return;
              setShowBio(true);
            }}
            className="circlePic">
            {message.userPic !== '' && <img src={message.userPic} alt="img" />}
            {showBio && (
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  height: 150,
                  overflow: 'hidden',
                  width: 250,
                  zIndex: 10,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  padding: 10,
                  cursor: 'initial',
                  boxShadow: '10px 10px 90px 25px #aaaaaa',
                }}>
                <div style={{position: 'relative'}}>
                  <i
                    onClick={() => setShowBio(false)}
                    style={{
                      fontSize: 24,
                      position: 'absolute',
                      top: -10,
                      left: -6,
                      cursor: 'pointer',
                    }}
                    className={'fas fa-times'}></i>
                  <p
                    style={{
                      maxHeight: 130,
                      overflow: 'auto',
                    }}
                    className={'font-12'}
                    dangerouslySetInnerHTML={{
                      __html: message?.responder?.bio,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="sideBorder"></div>
        <div className="textSection">
          <div className="timeAndDate">
            <div>{message.name}</div>
          </div>
          {message.isFile ? (
            <div className="messRowFile">
              {isFileVoice && (
                <audio controls>
                  <source src={message?.file?.url} type="audio/ogg" />
                </audio>
              )}
              {isFileImg && (
                <a
                  className="thisIsImg"
                  href={message?.file?.url}
                  target="_blank"
                  rel="noreferrer">
                  <img src={message?.file?.url} alt="img" />
                </a>
              )}
              {!isFileVoice && !isFileImg && (
                <>
                  <a
                    className="downloadFileIcon"
                    href={message?.file?.url}
                    target="_blank"
                    rel="noreferrer"
                    download={message?.file?.name}>
                    <i className="fas fa-download"></i>
                  </a>
                  <div className="messRowFile_name" style={{direction: 'ltr'}}>
                    {message?.file?.name}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="text">{message.msg}</div>
          )}
          <div className="msgFooterTime">
            <div>{message.time}</div>
            <div>{message.date}</div>
          </div>
        </div>
      </div>
      {!(!message.files || message.files.length === 0) && (
        <div className="files">
          {message.files.map((file, index) => {
            if (file.isPdf) {
              return (
                <div
                  key={index}
                  className="file"
                  style={{cursor: 'pointer'}}
                  onClick={() => makeDownload(file.file)}>
                  <i className="fas fa-book"></i>
                </div>
              );
            } else {
              return (
                <a
                  key={index}
                  href={file.file}
                  className="file"
                  target="_blank"
                  rel="noreferrer">
                  <img src={file.file} alt="img" />
                </a>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

MassengerContent.defaultProps = {
  msg: {
    msg: '',
    name: '',
    userPic: '',
    myMsg: '',
    text: '',
    date: '',
    time: '',
    files: [],
    isFile: false,
    file: {
      url: '',
      name: '',
    },
  },
  needPic: true,
};

export default MassengerContent;
