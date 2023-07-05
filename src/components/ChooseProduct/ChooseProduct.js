import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { categories } from '../helpres/categories/categories'
import ChooseCategorie from '../ChooseCategorie/ChooseCategorie'

const ChooseProduct = ({ openedMenu, setOpenedMenu, categoryId, setCategoryId, singlePage }) => {

    const Item = ({item, onPress, backgroundColor, color}) => (
        <TouchableOpacity disabled={singlePage} style={[styles.item, {backgroundColor}]} onPress={onPress}>
            <Text style={[styles.title, {color: color}]}>{item.name}</Text>
        </TouchableOpacity>
    )

    const renderItem = ({item}) => {
        const color = item.id === categoryId ? '#1B1B1B' : '#595959'
        const backgroundColor = item.id === categoryId && '#E5E5EA'

        const chooseCategorie = () => {
            setCategoryId(item.id)
        }
        
        return (
            <Item
                item={item}
                onPress={chooseCategorie}
                backgroundColor={backgroundColor}
                color={color}
            />
        );
    };

    const openMenu = () => {
        setOpenedMenu(!openedMenu)
    }

    return (
        <View style={[styles.container, openedMenu && styles.activeMenu]}>
            <View style={styles.navigation}>
                <TouchableOpacity onPress={openMenu} disabled={singlePage}>
                    <Image source={require('../../../public/images/openMenu.png')}/>
                </TouchableOpacity>
                <FlatList
                    data={categories}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    showsHorizontalScrollIndicator={false}
                    extraData={categoryId}
                />
            </View>
            {
                openedMenu && 
                <TouchableOpacity style={styles.moveUpBar} activeOpacity={1} >
                    <ChooseCategorie 
                        appData={categories} 
                        state={openedMenu} 
                        setState={setOpenedMenu}
                        id={categoryId}
                        setId={setCategoryId}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

export default ChooseProduct

const styles = StyleSheet.create({
    container: {
        flex: 0.1,

    },
    navigation: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        paddingLeft: 12,
    },
    list: {
        gap: 8
    },
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 13
    },
    title: {
        color: '#595959',
        fontSize: 14,
        fontWeight: 'bold',
    },
    moveUpBar: {
        height: 466,
    },
    activeMenu: {
        position: 'relative',
        zIndex: 30,
    }
})