import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';

export const typeText = {
    upper: 'UPPER',
    lower: 'LOWER',
    capitalize: 'CAPITALIZE'
};

const Category = (props) => {
    const [datas, setData] = useState([]);
    const [category, setcategory] = useState(null);
    const data = useRef(null);
    const [indexSelected, setSelected] = useState(0);
    useEffect(() => {
        let arrCategory = [];
        try {
            props.data.map((item, index) => {
                let newObject;
                index === props.indexSelected ?
                    newObject = Object.assign({ isSelected: true }, item) :
                    newObject = Object.assign({ isSelected: false }, item);
                arrCategory.push(newObject);
            });
            if (data.current == null)
                props.itemSelected(1);
            setData([...arrCategory]);
            data.current = arrCategory;
            setSelected(props.isSelected || 0);
            setcategory(data.current[indexSelected]);
        } catch (error) {
            console.error('Data not set - Please set data for Category component: ', error);
        }
    }, []);

    const handleItemCategoryClick = (category, rowID) => {
        category.isSelected = !category.isSelected;
        const dataClone = data.current;
        const unSelected = data.current[indexSelected];
        unSelected.isSelected = !unSelected.isSelected;
        dataClone[indexSelected] = unSelected;
        dataClone[rowID] = category;
        data.current = dataClone
        setSelected(rowID)
        setcategory(data.current[indexSelected]);
        setData(dataClone)
        category && props.itemSelected(category);
    }

    const renderTextCategory = (text) => {
        const type = typeText[props.textType];
        text = text.toString();
        switch (type) {
            case 'UPPER':
                return text.toUpperCase();
                break;
            case 'LOWER':
                return text.toLowerCase();
                break;
            case 'CAPITALIZE':
                return text.charAt(0).toUpperCase() + text.slice(1);
            default:
                return text;
        }
    }
    const renderItemCategory = ({ item, index }) => {
        const colorTextSelected = item.isSelected ? props.colorTextSelected : props.colorTextDefault;
        return (
            <Chip selected={item.isSelected} onPress={() => handleItemCategoryClick(item, index)} mode={'outlined'} style={{ marginRight: 10, backgroundColor: '#CDF2CA' }}>
                <Text style={[styles.textItemStyles, { color: colorTextSelected }]}>
                    {renderTextCategory(item[props.itemText])}
                </Text>
            </Chip>
        );
    }
    return (
        <FlatList
            style={[styles.categoryStyles, props.style]}
            contentContainerStyle={styles.flatListStyles}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            bounces={props.bounces}
            keyExtractor={(item, index) => index}
            renderItem={renderItemCategory}
            data={data.current}
        />
    );
}

const styles = StyleSheet.create({
    categoryStyles: {
        height: 250
    },

    flatListStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 0
    },

    itemStyles: {
        paddingLeft: 8,
        marginRight: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textItemStyles: {
        textAlign: 'center'
    }
});
export default Category;