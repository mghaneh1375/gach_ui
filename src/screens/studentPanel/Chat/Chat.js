import moment from 'jalali-moment';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SockJsClient from 'react-stomp';

import {
  updateSideBarChatRows_Redux,
  updateSideBarChatRowsNOTIFY_Redux,
} from './Action';
import {
  GetStudentsMessengerApi,
  GetFilesOfChatApi,
  GetMessagesOfChatApi,
  GetMessengerTokenApi,
  SendFileToMessenger,
} from './components/MessangerApi';
import MassengerContent from './components/MassengerContent';
import MesSideBar from './components/SideBar';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {isUserAdvisor} from '../../../services/Utility';
import {MyView} from '../../../styles/Common';

function Messenger_Page() {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch2] = useGlobalState();

  const setLoading = new_status => {
    dispatch2({loading: new_status});
  };

  const {userInfo} = useSelector(state => state.AuthReducer);
  const chatBox = useRef(null);

  const dispatch = useDispatch();

  const [openSidePopUp, setOpenSidePopUp] = useState(null);
  const [socketToken, setSocketToken] = useState(null);

  const [scrollFromBottom, setScrollFromBottom] = useState(null);
  const [heartTimer, setHeartTimer] = useState(1000);
  const [sendHeart, setSendHeart] = useState(null);
  const [updateScroll, setUpdateScroll] = useState(0);
  const [removeText, setRemoveText] = useState(0);

  const [allChats, setAllChats] = useState({});
  const [showChats, setShowChats] = useState(null);
  const [groups, setGroups] = useState([]);
  const [chatIdSeleceted, setChatIdSeleceted] = useState(null);
  const [groupSelected, setGroupSelected] = useState(null);
  const [socketState, setSocketState] = useState(null);
  const [socketChatState, setSocketChatState] = useState(null);

  const [myStudents, setMyStudents] = useState();

  const sendMessage = message => {
    if (showChats && socketChatState && message.trim().length > 0) {
      var chatMessage = {
        chatId: showChats.chatId,
        token: socketToken,
        content: message,
        type: 'send',
      };
      socketChatState.sendMessage('/app/chat', JSON.stringify(chatMessage));

      setRemoveText(prev => prev + 1);
    }
  };

  const sendFile = file => {
    if (file && groupSelected.id) {
      SendFileToMessenger(file.file, groupSelected.id, socketToken)
        .then(res => {})
        .catch(err => {});
    }
  };

  const handleSendVoice = file => {
    if (file && groupSelected.id) {
      SendFileToMessenger(file, groupSelected.id, socketToken)
        .then(res => {})
        .catch(err => {});
    }
  };

  const handleRecieveMessage = message => {
    let checkHasGet = allChats[message.chatId];

    dispatch(updateSideBarChatRows_Redux(message.senderId));

    if (message?.type === 'NOTIF') {
      dispatch(
        updateSideBarChatRowsNOTIFY_Redux(message.senderId, message.count),
      );
    }

    if (checkHasGet) {
      let newChat = {};
      if (message?.chatMessage) {
        newChat = message.chatMessage;
      } else {
        newChat = message;
      }

      let mom = moment(newChat.timestamp);

      let file = {};
      let isFile = newChat.file;

      if (isFile) {
        file = {
          url: newChat.content,
          name: newChat.originalFilename,
        };
      }

      let newArrChat = {
        amISender: newChat.sender === userInfo.completeName,
        content: newChat.content,
        createdAt: newChat.timestamp,
        id: newChat.senderId,
        sender: newChat.sender,
        date: mom.format('jYYYY/jMM/jDD'),
        time: mom.format('HH:mm'),
        file,
        isFile,
      };

      if (!checkHasGet) {
        checkHasGet = {
          chatId: newChat.chatId,
          hasGet: false,
          chats: [],
        };
      }

      checkHasGet.chats.push(newArrChat);
      setAllChats(prev => {
        return {
          ...prev,
          [newChat.chatId]: {
            ...checkHasGet,
          },
        };
      });
    }
  };

  const getMessages = async chat => {
    let checkHasGet = allChats[chat.chatId];
    if (!checkHasGet || checkHasGet?.hasGet === false) {
      setLoading(true);
      let res = GetMessagesOfChatApi(chat.id, socketToken);
      setLoading(false);

      res.chats = reFormatChats(res.chats);

      res = {
        ...chat,
        ...checkHasGet,
        ...res,
      };

      setShowChats(res);
      setAllChats(prev => ({
        ...prev,
        [res.chatId]: {
          ...res,
          hasGet: true,
          getFiles: false,
          files: [],
          students: [],
        },
      }));

      setGroups(prev => {
        return prev.map(item => {
          if (item.id === chat.id) {
            item.chatId = res.chatId;
          }
          return item;
        });
      });

      setChatIdSeleceted(res.chatId);
    } else {
      setChatIdSeleceted(checkHasGet.chatId);
      setShowChats(checkHasGet);
    }
  };

  const reFormatChats = chats => {
    return chats.map(item => {
      let mom = moment(item.createdAt);

      let file = {};
      let isFile = item.file;
      if (isFile) {
        file = {
          url: item.content,
          name: item.originalFilename,
        };
      }

      return {
        ...item,
        isFile,
        file,
        date: mom.format('jYYYY/jMM/jDD'),
        time: mom.format('HH:mm'),
      };
    });
  };

  const onScroll = () => {
    let scrollTop = chatBox.current.scrollTop;

    if (scrollTop <= 100 && groupSelected?.id) {
      let chat = groups.find(group => group.id === groupSelected?.id);
      let allChatsOne = allChats[chat.chatId];

      if (!(allChatsOne.chats.length < allChatsOne.totalMsgs)) {
        return;
      }

      let createdAt = allChatsOne.chats[0].createdAt;

      // scroll position from bottom chatBox
      let scrollHeight = chatBox.current.scrollHeight;
      let clientHeight = chatBox.current.clientHeight;
      let scrollPosition = scrollHeight - clientHeight - scrollTop;
      setScrollFromBottom(scrollPosition);

      GetMessagesOfChatApi(chat.mode, chat.id, socketToken, createdAt)
        .then(res => {
          res.chats = reFormatChats(res.chats);

          setAllChats(prev => {
            let newChats = [...res.chats, ...prev[res.chatId].chats];

            setShowChats({
              ...chat,
              ...res,
              chats: newChats,
            });

            return {
              ...prev,
              [res.chatId]: {
                ...prev[res.chatId],
                chats: [...newChats],
              },
            };
          });
        })
        .catch(err => {});
    }
  };

  const handleUnselectGroup = () => {
    setGroupSelected(null);
    setChatIdSeleceted(null);
    setShowChats(null);
    setStudentOfClass([]);
  };

  const handleClickMenu = event => {
    setOpenSidePopUp('menu');
  };
  const handleCloseMenu = () => {
    setOpenSidePopUp(null);
  };

  const showStudentClasses = async () => {
    if (isUserAdvisor(state.user)) {
      if (myStudents === undefined) {
        let res = await GetStudentsMessengerApi(socketToken);

        let studentList = res.map((item, index) => {
          return {
            id: item.id,
            mode: 'PEER',
            name: item.name,
            newMsgs: 0,
            notReadMessage: 0,
            order: index - res.length,
            pic: item.targetPic,
            receiverId: item.id,
            receiverName: item.name,
          };
        });
        setMyStudents(studentList);
        setAllChats(prev => {
          return {
            ...prev,
            [chatIdSeleceted]: {
              ...prev[chatIdSeleceted],
              students: studentList,
            },
          };
        });
      } else {
        setMyStudents(allChats[chatIdSeleceted].students);
      }
    } else {
      setMyStudents([]);
    }
  };

  const showFileList = () => {
    if (!allChats[chatIdSeleceted]) return;

    if (allChats[chatIdSeleceted].getFiles) {
      setOpenSidePopUp('fileList');
    } else {
      GetFilesOfChatApi(chatIdSeleceted, socketToken)
        .then(res => {
          setOpenSidePopUp('fileList');
          setAllChats(prev => {
            return {
              ...prev,
              [chatIdSeleceted]: {
                ...prev[chatIdSeleceted],
                files: res,
                getFiles: true,
              },
            };
          });
        })
        .catch(() => {});
    }
  };

  const getNewToken = async () => {
    let lastToken = localStorage.getItem('socketToken');
    let lastExpireToken = localStorage.getItem('socketToken_expire');

    if (
      !lastToken ||
      !lastExpireToken ||
      (lastExpireToken && lastExpireToken < new Date().getTime())
    ) {
      setLoading(true);
      let res = await GetMessengerTokenApi(state.token, setLoading);

      let time = new Date().getTime() + res.reminder - 20000;
      localStorage.setItem('socketToken', res.token);
      localStorage.setItem('socketToken_expire', time);
      localStorage.setItem('socketToken_heartBeatTime', res.heartBeatInterval);

      setLoading(false);

      setHeartTimer(res.heartBeatInterval);
      setSocketToken(res.token);
    } else {
      let heartBeatInterval = localStorage.getItem('socketToken_heartBeatTime');

      setHeartTimer(heartBeatInterval);
      setSocketToken(lastToken);
    }
  };

  const startToChat = studentId => {
    setGroups(prev => {
      let student = studentOfClass.find(item => item.id === studentId);
      let exist = prev.find(item => item.id === studentId);
      if (!exist) {
        exist = {
          chatId: null,
          id: student.id,
          mode: 'PEER',
          name: student.name,
          newMsgs: 0,
          notReadMessage: 0,
          order: prev.length + 1,
          pic: student.targetPic,
          receiverId: student.id,
          receiverName: student.name,
        };
        prev.push(exist);
      }

      setGroupSelected(exist);

      return prev;
    });
  };

  React.useEffect(() => {
    const destroyListener = createScrollStopListener(chatBox.current, () =>
      setUpdateScroll(prev => prev + 1),
    );
    setInterval(getNewToken, 2000);

    return () => destroyListener(); // when App component is unmounted
  }, []);

  React.useEffect(onScroll, [updateScroll]);

  React.useEffect(() => {
    if (sendHeart && socketState) {
      var msg = {
        token: socketToken,
        type: 'heart',
      };
      if (showChats) {
        msg.chatId = showChats.chatId;
      }

      socketState.sendMessage('/app/chat', JSON.stringify(msg));
      setTimeout(() => {
        setSendHeart(prev => prev + 1);
      }, heartTimer);
    }
  }, [sendHeart]);

  useEffect(() => {
    setOpenSidePopUp(null);
    setScrollFromBottom(0);
    let chat = groups.find(group => group.id === groupSelected?.id);
    if (chat) {
      getMessages(chat);
    } else if (groupSelected === null) {
      handleUnselectGroup();
    } else {
      setStudentOfClass(prev => {
        let student = studentOfClass.find(item => item.id === groupSelected);
        let exist = prev.find(item => item.id === groupSelected);
        if (exist) {
          getMessages({
            chatId: null,
            id: student.id,
            mode: 'PEER',
            name: student.name,
            newMsgs: 0,
            notReadMessage: 0,
            order: prev.length + 1,
            pic: student.targetPic,
            receiverId: student.id,
            receiverName: student.name,
          });
        }
        return [];
      });
    }
  }, [groupSelected]);

  useEffect(() => {
    if (chatBox) {
      let scrollHeight = chatBox.current.scrollHeight;
      let clientHeight = chatBox.current.clientHeight;
      let scrollPosition = scrollHeight - clientHeight - scrollFromBottom;

      chatBox.current.scrollTo(0, scrollPosition);
    }
  }, [showChats]);

  useEffect(() => {
    if (chatIdSeleceted) {
      showStudentClasses();
    }
  }, [chatIdSeleceted]);

  return (
    <MyView>
      {socketToken && (
        <MesSideBar
          sideBarList={studentOfClass}
          socketToken={socketToken}
          selectedGroup={groupSelected}
          changePerson={setGroupSelected}
          updateGroups={setGroups}
        />
      )}
      <div className="panel-main messengerPanel">
        {socketToken && (
          <>
            <SockJsClient
              url={`${process.env.REACT_APP_SOCKET}/ws`}
              topics={[`/chat/${state.user.user.id}`]}
              subscribeHeaders={{'self-subscribe': true, token: socketToken}}
              debug={false}
              autoReconnect={false}
              // heartbeat={61000}
              // heartbeatIncoming={61000}
              // heartbeatOutgoing={61000}
              onConnect={() => setSendHeart(1)}
              onMessage={handleRecieveMessage}
              ref={setSocketState}
              onError={() => {
                console.log('onError');
              }}
              onDisconnect={() => {
                setSocketState(null);
              }}
            />
            {showChats?.chatId && (
              <SockJsClient
                url={`http://192.168.0.106:8088/ws`}
                topics={[`/chat/${showChats?.chatId}`]}
                subscribeHeaders={{'group-subscribe': true, token: socketToken}}
                debug={false}
                autoReconnect={false}
                onMessage={handleRecieveMessage}
                ref={setSocketChatState}
                onError={() => {
                  console.log('onError');
                }}
                onDisconnect={err => {
                  console.log(err, 'disconnect');
                  setSocketChatState(null);
                }}
              />
            )}
          </>
        )}

        {groupSelected && (
          <div className="whiteBox headerMessSelect">
            <div className="font-weight-bold">{groupSelected.name}</div>
            <div className="d-flex align-items-center">
              <button className="btn" onClick={handleClickMenu}>
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <button
                className="ml-3 redButton showOnMobile"
                onClick={handleUnselectGroup}
                style={{borderRadius: '50%', height: '30px', width: '30px'}}>
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
          </div>
        )}

        <div className="whiteBox mesMainMes pb-5" ref={chatBox}>
          {showChats?.chats?.map((item, index) => (
            <MassengerContent
              key={`${item.id}__${index}`}
              msg={{
                name: !item.amISender && (item?.sender ?? ''),
                myMsg: item.amISender,
                msg: item.content,
                date: item.date,
                time: item.time,
                isFile: item.isFile,
                file: item.file,
                files: [],
              }}
              needPic={false}
            />
          ))}
        </div>

        {/* {showChats && (
          <div className="whiteBox messengerFooter studentFooterMsgSection inMessenger">
            <FooterInputWithFileUpload
              text={''}
              removeFileAfterOnChage={true}
              showUploadFileText={false}
              submitWithEnter={true}
              inputLabel="بارگذاری فایل"
              getFile={true}
              userPic={userInfo.pic}
              removeText={removeText}
              onSubmit={sendMessage}
              onFileChange={sendFile}
              showVoiceRecorder={true}
              getVoice={handleSendVoice}
            />
          </div>
        )} */}
      </div>

      {/* {openSidePopUp === 'menu' && (
        <SidePopUp close={handleCloseMenu}>
          <BasicSide>
            <div className="actionButtons">
              <Link to="#" onClick={showFileList}>
                فایل ها
              </Link>
            </div>
          </BasicSide>
        </SidePopUp>
      )} */}
      {/* {openSidePopUp === 'studentList' && (
        <SidePopUp close={() => setOpenSidePopUp('menu')}>
          <BasicSide>
            <div>
              {studentOfClass.map(item => (
                <div className="d-flex align-items-center justify-content-between p-3 color-white border-bottom">
                  <div>{item.name}</div>
                  <div className="font-12">
                    <button
                      className="redButton"
                      onClick={() => {
                        setOpenSidePopUp(null);
                        startToChat(item.id);
                      }}>
                      ارسال پیام
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </BasicSide>
        </SidePopUp>
      )} */}
      {/* {openSidePopUp === 'fileList' && (
        <SidePopUp close={() => setOpenSidePopUp('menu')}>
          <BasicSide whiteTitle={`فایل های ${groupSelected.name}`}>
            <div className="fileListSide">
              {allChats[chatIdSeleceted].files.map(item => (
                <a
                  className="file"
                  href={item.content}
                  target="_blank"
                  rel="noreferrer"
                  download={item.originalFilename}>
                  {getFileType(item.content) === 'img' ? (
                    <img src={item.content} alt="img" />
                  ) : (
                    <div className="notImgFile">{item.originalFilename}</div>
                  )}
                </a>
              ))}
            </div>
          </BasicSide>
        </SidePopUp>
      )} */}
    </MyView>
  );
}

const createScrollStopListener = (element, callback, timeout) => {
  let removed = false;
  let handle = null;
  const onScroll = () => {
    if (handle) {
      clearTimeout(handle);
    }
    handle = setTimeout(callback, timeout || 200); // default 200 ms
  };
  element.addEventListener('scroll', onScroll);
  return () => {
    if (removed) {
      return;
    }
    removed = true;
    if (handle) {
      clearTimeout(handle);
    }
    element.removeEventListener('scroll', onScroll);
  };
};

export default Chat;
