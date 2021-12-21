import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
} from 'react-native';
import { Action } from '../reduxstore/modules/song'
import { connect } from 'react-redux';
import Loader from '../components/Loader'
import { Searchbar } from 'react-native-paper';
import Category from '../components/Category';
import SongList from '../components/SongList';

const SoundListScreen = ({ getSounds, filter, search, id, searchReset, list }) => {
    useEffect(() => {
        getSounds();
    }, []);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery === "") {
            if (id !== undefined) { searchReset(id) }
        } else {
            search(searchQuery)
        }
    }, [searchQuery])

    const onChangeSearch = query => {
        setSearchQuery(query);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <Loader loading={list.loading} color="#ff66be" />

            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <View style={{ height: 50 }}>
                {list?.songList?.songList?.genres &&
                    <Category
                        data={list.songList.songList.genres}
                        itemSelected={(item) => {
                            if (item.id !== undefined)
                                filter(item.id)
                        }}
                        itemText={'name'}  //set attribule of object show in item category
                    />}
            </View>
            <View>
                {(list?.songList?.songList || list.songFilteredList) && <SongList DATA={list.songFilteredList != null ? list.songFilteredList : list?.songList?.songList.videos} />}
            </View>
        </SafeAreaView>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getSounds: () => dispatch(Action.init()),
        filter: (genreId) => dispatch(Action.songListFilter(genreId)),
        search: (query) => dispatch(Action.search(query)),
        searchReset: (genreId) => dispatch(Action.searchReset(genreId))
    }
}

const mapStateToProps = (state) => ({
    network: state.network,
    list: state.song,
    id: state.song.genre_id
})

export default connect(mapStateToProps, mapDispatchToProps)(SoundListScreen);