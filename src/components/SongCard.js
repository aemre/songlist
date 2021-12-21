import * as React from 'react';
import { Card, Text, Title, Paragraph, Surface } from 'react-native-paper';
import { Animated, Dimensions, StyleSheet, View } from "react-native";
export const MARGIN = 16;
export const CARD_HEIGHT = 300 + MARGIN * 3;
const { height: wHeight, width } = Dimensions.get("window");
const height = wHeight + 10;
const SongCard = ({ title, artist, image_url, y, index, release_year }) => {
    const position = Animated.subtract(index * CARD_HEIGHT, y);
    const isDisappearing = -CARD_HEIGHT;
    const isTop = 0;
    const isBottom = height - CARD_HEIGHT;
    const isAppearing = height;
    const translateY = Animated.add(
        Animated.add(
            y,
            y.interpolate({
                inputRange: [0, 0.0000001 + index * CARD_HEIGHT],
                outputRange: [0, -index * CARD_HEIGHT],
                extrapolateRight: "clamp",
            })
        ),
        position.interpolate({
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -CARD_HEIGHT / 2],
            extrapolate: "clamp",
        })
    );
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp",
    });
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    });
    return (<Animated.View
        style={[styles.card, { opacity, transform: [{ translateY }, { scale }] }]}
        key={index}>
        <Card style={{ height: 290, width: width - 20, }}>
            <Card.Cover source={{ uri: image_url }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Card.Content>
                    <Title>{title}</Title>
                    <Paragraph>{artist}</Paragraph>
                </Card.Content>
                <Text>{release_year}</Text>
            </View>
        </Card>
    </Animated.View>)
};
const styles = StyleSheet.create({
    card: {
        height: 290,
        marginVertical: MARGIN,
        alignSelf: "center",
    },
});

export default SongCard;