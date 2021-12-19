import * as React from 'react';
import { Card, Button, Title, Paragraph } from 'react-native-paper';

const SongCard = ({ title, artist, image_url }) => (
    <Card>
        <Card.Cover source={{ uri: image_url }} />
        <Card.Content>
            <Title>{title}</Title>
            <Paragraph>{artist}</Paragraph>
        </Card.Content>
    </Card>
);

export default SongCard;