import React, { useCallback } from 'react';
import { Animated, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import SongCard from './SongCard';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SongList = ({ DATA }) => {
    const Item = ({ item, y, index }) => (
        <View style={styles.item}>
            <SongCard title={item.title} artist={item.artist} image_url={item.image_url} y={y} index={index} release_year={item.release_year} />
        </View>
    );

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <Item item={item} y={y} index={index} />
            )
        }
    )

    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
        useNativeDriver: true,
    });
    return (
        <View style={styles.container}>
            <AnimatedFlatList
                scrollEventThrottle={16}
                bounces={false}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                {...{ onScroll }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 100
    },
    item: {
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default SongList;