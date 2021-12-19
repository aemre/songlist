import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import SongCard from './SongCard';


const SongList = ({ DATA }) => {
    console.log('DATA', DATA)
    const Item = ({ title, artist, image_url }) => (
        <View style={styles.item}>
            <SongCard title={title} artist={artist} image_url={image_url} />

        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} artist={item.artist} image_url={item.image_url} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                numColumns={1}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 400
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default SongList;