import {
    Platform,
    Alert,
    ToastAndroid
} from 'react-native';
export default ShowAlert = (props) => {
    setTimeout(() => {
        if (isIOS()) {
            Alert.alert(props, null, [
                { text: "OK", onPress: () => { } }
            ])
        } else {
            ToastAndroid.showWithGravityAndOffset(
                props,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }

    }, 100)
}
export const isIOS = () => {
    var result = false
    Platform.OS === 'ios' ? result = true : result = false
    return result
}