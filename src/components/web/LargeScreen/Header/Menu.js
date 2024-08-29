import React from 'react';
import {globalStateContext} from '../../../../App';
import {isUserAdmin} from '../../../../services/Utility';
import {MyView} from '../../../../styles/Common';
import Filter from './Filter';
import AdminMenu from './Menus/Admin';
import AdvisorMenu from './Menus/AdvisorMenu';
import Agent from './Menus/Agent';
import ContentMenu from './Menus/ContentMenu';
import EditorMenu from './Menus/EditorMenu';
import SchoolMenu from './Menus/SchoolMenu';
import StudentMenu from './Menus/Student';
import Teacher from './Menus/Teacher';

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
          {props.accesses.indexOf('agent') !== -1 && (
            <Agent selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('school') !== -1 && (
            <SchoolMenu selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('advisor') !== -1 && (
            <AdvisorMenu
              hasTeacherAccess={props.accesses.indexOf('teacher') !== -1}
              selected={props.selected}
              navigate={props.navigate}
            />
          )}
          {props.accesses.indexOf('content') !== -1 && (
            <ContentMenu selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.indexOf('editor') !== -1 && (
            <EditorMenu selected={props.selected} navigate={props.navigate} />
          )}
          {props.accesses.length === 1 &&
            props.accesses.indexOf('teacher') !== -1 && (
              <Teacher selected={props.selected} navigate={props.navigate} />
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
