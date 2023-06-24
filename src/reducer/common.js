const initialValue = {
  shareData: {},
  shareType: null,
  gridApi: null,

  sideBar: '',
  notifications: [],
  sideBarMenu: [],

  sideBarComponent: null,
};

export const CommonReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'UPDATE_SIDEBAR_ROW_ID':
      return {
        ...state,
        sideBarRowIds: action.sideBarRowIds,
      };
    case 'UPDATE_SIDEBAR_ROW_NOTIFY':
      return {
        ...state,
        notReadMessageInfo: {
          sideBarRowUpdateNotif: action.sideBarRowUpdateNotif,
          notifCount: action.notifCount,
        },
      };
    default:
      return state;
  }
};
