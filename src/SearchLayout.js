import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import SearchBar from './SearchBar';
import Header from './Header';

export default class SearchLayout extends React.Component {
  static SearchBar = SearchBar;
  static Header = Header;

  static defaultProps = {
    debounce: 500,
    headerBackgroundColor: Platform.OS === 'ios' ? '#f7f7f7' : '#fff',
    headerTintColor: '#000',
  };

  state = {
    q: '',
  };

  _handleSubmit = q => {
    this.props.onSubmit && this.props.onSubmit(q);
  };

  // TODO: debounce
  _handleChangeQuery = q => {
    this.props.onChangeQuery && this.props.onChangeQuery(q);
    this.setState({ q });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={this.props.headerBackgroundColor}
          tintColor={this.props.headerTintColor}
          iconColor={this.props.headerIconColor}
          backButton={Platform.OS === 'android'}>
          <SearchBar
            onChangeQuery={this._handleChangeQuery}
            onSubmit={this._handleSubmit}
            placeholderTextColor={this.props.searchInputPlaceholderTextColor}
            textColor={this.props.searchInputTextColor}
            selectionColor={this.props.searchInputSelectionColor}
            underlineColorAndroid={
              this.props.searchInputUnderlineColorAndroid ||
              this.props.headerBackgroundColor
            }
            tintColor={
              this.props.searchInputTintColor || this.props.headerTintColor
            }
            iconColor={this.props.headerIconColor}
            onFocus={this.props.onSearchFocus}
            onBlur={this.props.onSearchBlur}
            value={this.props.value}
          />
        </Header>

        {this.props.renderResults
          ? this.props.renderResults(this.state.q)
          : this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
