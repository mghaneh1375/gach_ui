import React, {useEffect, useState} from 'react';

import {chatContext, dispatchChatContext} from './Context';
import {GetChatsApi} from './MessangerApi';

function SideBar(props) {
  const useGlobalState = () => [
    React.useContext(chatContext),
    React.useContext(dispatchChatContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [users, setUsers] = useState([]);
  const [showUser, setShowUser] = useState(null);

  const [userListToShow, setUserListToShow] = useState([]);

  const getUsers = async () => {
    props.setLoading(true);
    let res = await GetChatsApi(props.socketToken);
    props.setLoading(false);
    res
      .sort((a, b) => b.newMsgs - a.newMsgs)
      .map((item, index) => {
        let name = item.receiverName;

        return {
          ...item,
          id: item.receiverId,
          name,
          notReadMessage: item.newMsgs,
          order: -(res.length - index),
        };
      });

    props.updateGroups(res);
    setUserListToShow(res);
    setUsers(res);
  };

  const changePerson = id => {
    setShowUser(id);

    setUsers(prev => {
      let updated = prev.map(item => {
        if (item.id === id) {
          item.notReadMessage = 0;
          props.changePerson(item);
        }
        return {...item};
      });

      setUserListToShow([...updated]);
      return [...updated];
    });
  };

  useEffect(() => {
    if (state.sideBarRowIds) {
      let minOrder = 0;
      users.forEach(item => {
        minOrder = Math.min(minOrder, item.order);
      });
      minOrder -= 2;

      let newUsers = users.map(item => {
        if (item.id === state.sideBarRowIds) {
          item.order = minOrder;
        }

        if (showUser === item.id) {
          item.notReadMessage = 0;
        }

        return {...item};
      });

      setUserListToShow(newUsers);
      setUsers(newUsers);
      dispatch({sideBarRowIds: null});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sideBarRowIds]);

  // useEffect(() => {
  //   changePerson(props.selectedGroup);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.selectedGroup]);

  // useEffect(() => {
  //   getUsers();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (state.notReadMessageInfo?.sideBarRowUpdateNotif) {
      let newUsers = users.map(item => {
        if (item.id === state.notReadMessageInfo?.sideBarRowUpdateNotif) {
          item.notReadMessage = state.notReadMessageInfo?.notifCount;
        }

        return {...item};
      });

      setUserListToShow(newUsers);
      setUsers(newUsers);

      dispatch({
        notReadMessageInfo: {sideBarRowUpdateNotif: null, notifCount: 0},
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.notReadMessageInfo]);

  useEffect(() => {
    if (props.sideBarList?.length > 0) {
      props.updateGroups(props.sideBarList);
      setUsers(props.sideBarList);
      setUserListToShow(props.sideBarList);
    } else {
      setUserListToShow(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sideBarList]);

  return (
    <div
      className={`mesenger_userList ${
        props.selectedGroup !== null && 'notOpen'
      }`}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {userListToShow.map(item => {
          return (
            <div
              key={item.id}
              className={`mesUserSide ${
                props.selectedGroup?.id === item.id ? 'selected' : ''
              }`}
              onClick={() => {
                changePerson(item.id);
              }}
              style={{order: item.order}}>
              <div className="img">
                <img src={item.pic} />
              </div>
              <div className="nameBox">
                <div className="name singleRow">{item.name}</div>
                <div className="mesLastMes singleRow">{item.lastMessage}</div>
              </div>
              {item.notReadMessage > 0 && (
                <div className="mesNotRead">{item.notReadMessage}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// SideBar.defaultProps = {
//   sideBarList: [],
//   socketToken: null,
//   selectedGroup: null,
//   changePerson: id => {},
//   updateGroups: groups => {},
// };

export default SideBar;
