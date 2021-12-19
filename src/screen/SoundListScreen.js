import React, { useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { Action } from '../reduxstore/modules/song'
import { connect } from 'react-redux';

const SoundListScreen = ({toggleTodo}) => {
    useEffect(() => {
        toggleTodo();
    }, []);
    return (
        <View >
            <Text>Hello</Text>
        </View>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      toggleTodo: () => dispatch(Action.init())
    }
  }

export default connect(null,mapDispatchToProps)(SoundListScreen);