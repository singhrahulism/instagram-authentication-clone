import React, { useState } from 'react'
import { Text, View, StyleSheet, Modal } from 'react-native'

import AlertModal from '../../components/modals/AlertModal'

const TestScreen = () => {

    const [modalVisible, setModalVisible] = useState(true)

    const handleModalVisible = () => {
        console.log('handleModalVisible() called...');
    }

    return <View style={styles.container}>
            <AlertModal
                title={'This email address is on another account'}
                message={'You can log in to the account associated with that email address or you can use that email address to create a new account.'}
                modalVisible={modalVisible}
                handlePress={handleModalVisible}
            />
    </View>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50
    }
})

export default TestScreen ;