import React from 'react';
import {globalStateContext} from '../../../../App.jsx';
import {isUserAdmin} from '@/services/utility';
import {MyView} from '@/styles';
import Filter from './Filter.jsx';
import AdminMenu from './menus/AdminMenu.jsx';
import AdvisorMenu from './menus/AdvisorMenu.jsx';
import Agent from './menus/Agent.jsx';
import ContentMenu from './menus/ContentMenu.jsx';
import EditorMenu from './menus/EditorMenu.jsx';
import SchoolMenu from './menus/SchoolMenu.jsx';
import StudentMenu from './menus/Student.jsx';
import Teacher from './menus/Teacher.jsx';
const Menu = props => {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();
  return (
    <MyView
      style={{
        width: state.isInPhone ? '100%' : 'unset',
      }}>
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
