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
import Loader from '../components/Loader'
import { Searchbar } from 'react-native-paper';
import Category from '../components/Category';
import SongList from '../components/SongList';

const SoundListScreen = ({ getSounds, list }) => {
    useEffect(() => {
        getSounds();
    }, []);
    const [searchQuery, setSearchQuery] = React.useState('');
    const data = [
        { id: 1, title: 'Apple' },
        { id: 2, title: 'Samsung' },
        { id: 3, title: 'Sony' },
        { id: 4, title: 'Nokia' },
        { id: 5, title: 'HTC' },
        { id: 6, title: 'LG' }
    ];


    const onChangeSearch = query => setSearchQuery(query);
    return (
        <SafeAreaView >
            
            <Loader loading={list.loading} color="#ff66be" />
           
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {list?.songList?.songList?.genres && <Category
                data={list.songList.songList.genres}
                itemSelected={(item) => console.log(item)}
                itemText={'name'}  //set attribule of object show in item category
            />}
       {list?.songList?.songList?.genres &&  <SongList DATA={list?.songList?.songList.videos}/>}

            <Text>Hello {JSON.stringify(list?.songList?.songList?.genres)}</Text>
       
        </SafeAreaView>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSounds: () => dispatch(Action.init())
    }
}

const mapStateToProps = (state) => ({
    network: state.network,
    list: state.song
})

export default connect(mapStateToProps, mapDispatchToProps)(SoundListScreen);