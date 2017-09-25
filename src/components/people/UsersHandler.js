import React, { Component } from 'react';
import { connect } from 'react-redux';
  import {
  View,
  StyleSheet
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {
  requestTournament,
  requestDivisions,
  selectedDivision,
  selectedTournament } from './actions';
import { C_NAV_MENU, C_DEFAULT_TEXT_COLOR, C_ACCENT } from '../types';
import UsersList from './UsersList';

class UsersHandler extends Component {
//prerenderingSiblingsNumber={2}
  render() {
    return (
      //space for the bottomNavBar
      <ScrollableTabView
        style={styles.scrollableTab}
        scrollWithoutAnimation
        initialPage={0}
        prerenderingSiblingsNumber={2}
        tabBarPosition="top"
        renderTabBar={
          () =>
          <DefaultTabBar
              activeTextColor={C_ACCENT}
              inactiveTextColor={C_DEFAULT_TEXT_COLOR}
              textStyle={styles.tabTextStyle}
              underlineStyle={styles.underLineStyle}
              style={styles.tabBar}
          />
          }
      >
        {this.props.rows}
      </ScrollableTabView>
    );
  }
}

//Making a stylesheet from a style object makes it possible to refer to it by ID
//instead of creating a new style object every time.
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    marginBottom: 50,
    backgroundColor: C_NAV_MENU
  },
  scrollableTab: {
    flex: 1,
    backgroundColor: C_NAV_MENU
  },
  underLineStyle: {
    backgroundColor: C_ACCENT
  },
  tabTextStyle: {
   fontSize: 16,
   fontWeight: '500'
 },
 tabBar: {
   borderBottomColor: C_NAV_MENU,
   backgroundColor: C_NAV_MENU,
   borderWidth: 0
 }
});

const mapStateToProps = (state) => {
  //transform object into key, value
    const {
      loading,
      error } = state.leadsInfo;

  const rows = [];
  const localLabels = ['Goles', 'T. Amarillas', 'T. Rojas'];
  let i = 0;
  localLabels.forEach(label => {
    i++;
    rows.push(
          <View
            tabLabel={label}
            key={i}
            style={styles.tabView}
          >
            <UsersList
              label={label}
              division={state.calendarInfo.division}
              tournament={state.calendarInfo.tournament}
            />
          </View>
          );
  });

  return {
    error,
    loading,
    rows,
    tournament: state.calendarInfo.tournament,
    division: state.calendarInfo.division };
};
export default connect(mapStateToProps,
  { requestTournament, requestDivisions, selectedTournament, selectedDivision })(UsersHandler);