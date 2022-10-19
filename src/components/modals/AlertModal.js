import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native'

const AlertModal = ({ title, message, modalVisible, handlePress, requestClose }) => {
    return (
        <Modal
        transparent={true}
        animationType={'fade'}
        visible={modalVisible}
        onRequestClose={requestClose}
        >
        <TouchableOpacity style={styles.container} disabled={true} >
            <View style={styles.modal}>
                {
                    title && 
                        <Text style={styles.titleContainer}>{title}</Text>
                }
                {
                    message &&
                        <Text style={styles.messageContainer}>{message}</Text>
                }
                <View style={styles.lineContainer} />
                <TouchableOpacity
                    style={styles.confirmationContainer}
                    activeOpacity={0.6}
                    onPress={requestClose}
                >
                    <Text style={{color: '#0195f7'}}>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        alignItems: 'center',
        width: Dimensions.get('window').width-160,
        borderRadius: 10,
        backgroundColor: '#262626',
         
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 15,
        fontSize: 18,
        marginHorizontal: 60,
        textAlign: 'center',
        color: '#fafafa'
        
    },
    messageContainer: {
        color: '#a8a8a8',
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 35
    },
    lineContainer: {
        borderTopColor: '#a8a8a8',
        borderTopWidth: 0.2,
        width: '100%'
    },
    confirmationContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
    }
})

export default AlertModal ;