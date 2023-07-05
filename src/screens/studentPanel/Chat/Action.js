export const updateSideBarChatRows_Redux = rowIds => {
  return {
    type: 'UPDATE_SIDEBAR_ROW_ID',
    sideBarRowIds: rowIds,
  };
};
export const updateSideBarChatRowsNOTIFY_Redux = (rowId, notifCount) => {
  return {
    type: 'UPDATE_SIDEBAR_ROW_NOTIFY',
    sideBarRowUpdateNotif: rowId,
    notifCount,
  };
};
