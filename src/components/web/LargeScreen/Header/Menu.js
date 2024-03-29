import React from 'react';
import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';
import Agent from './Menus/Agent';
import SchoolMenu from './Menus/SchoolMenu';
import Teacher from './Menus/Teacher';
import {globalStateContext} from '../../../../App';
import Filter from './Filter';
import {MyView} from '../../../../styles/Common';
import {isUserAdmin} from '../../../../services/Utility';
import AdvisorMenu from './Menus/AdvisorMenu';
import ContentMenu from './Menus/ContentMenu';
import EditorMenu from './Menus/EditorMenu';

const Menu = props => {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <MyView style={{width: state.isInPhone ? '100%' : 'unset'}}>
      {state.isRightMenuVisible && props.accesses !== null && (
        <>
          {props.accesses.indexOf('student') !== -1 && (
            <StudentMenu selected={props.selected} navigate={props.navigate} />
          )}

          {props.accesses.indexOf('teacher') !== -1 && (
            <Teacher selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('agent') !== -1 && (
            <Agent selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('school') !== -1 && (
            <SchoolMenu selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('advisor') !== -1 && (
            <AdvisorMenu selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('content') !== -1 && (
            <ContentMenu selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('editor') !== -1 && (
            <EditorMenu selected={props.selected} navigate={props.navigate} />
          )}
        </>
      )}

      {state.isRightMenuVisible && isUserAdmin(state.user) && (
        <AdminMenu selected={props.selected} navigate={props.navigate} />
      )}
      {props.isFilterAvailable &&
        !state.isRightMenuVisible &&
        state.isFilterMenuVisible && <Filter />}
    </MyView>
  );
};

export default Menu;
