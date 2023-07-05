import {StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Cities from '../../src/components/City/Cities'
import ChooseProduct from '../../src/components/ChooseProduct/ChooseProduct'
import '../../Firebase/firebase'
import app from '../../Firebase/firebase'
import { ref, getDatabase, get } from 'firebase/database'
import ProductList from '../../src/components/ProductList/ProductList'

const StartShop = () => {
    const [appData, setAppData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [choice, setChoice] = useState(false)
    const [openedMenu, setOpenedMenu] = useState(false)
    const [cityId, setCityId] = useState(0)
    const [categorieId, setCategorieId] = useState(0)
    const [singlePage, setSinglePage] = useState(false)

    const database = getDatabase(app)

    const getData = async () => {
        const citiesRef = ref(database, '/cities');

        try {
            const snapshotValue = await get(citiesRef)
            const data = snapshotValue.val()
            setAppData(data)
            setIsLoading(!isLoading)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <TouchableOpacity 
            style={[styles.container, choice && styles.activeTab, openedMenu && styles.activeTab, singlePage && styles.activeTab]} 
            activeOpacity={1}>
            {
                isLoading ? (<ActivityIndicator size='large' style={styles.indicatorPosition} />) :
                    (<>
                        <Cities
                            appData={appData}
                            choice={choice}
                            setChoice={setChoice}
                            cityId={cityId}
                            setCityId={setCityId}
                            singlePage={singlePage}
                        />
                        <ChooseProduct
                            appData={appData}
                            openedMenu={openedMenu}
                            setOpenedMenu={setOpenedMenu}
                            categoryId={categorieId}
                            setCategoryId={setCategorieId}
                            singlePage={singlePage}
                        />
                        <ProductList
                            cityId={cityId}
                            categorieId={categorieId}
                            singlePage={singlePage}
                            setSinglePage={setSinglePage}
                        />
                    </>)
            }
        </TouchableOpacity>
    )
}

export default StartShop

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
        position: 'relative',
        zIndex: 40,
    },
    indicatorPosition: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
})