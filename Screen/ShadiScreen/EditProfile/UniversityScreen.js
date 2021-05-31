import React from 'react';
import {View, Text, Switch, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {appStyles, shadow} from "../../../themes/styles";
import HeaderComponent from "../../../components/HeaderComponent";
import {WHITE} from "../../../themes/colors";

class UniversityScreen extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            university: 'Add university',
        }
    }

    render() {
        const { university } = this.state;
        return (
            <View style={appStyles.container}>
                <HeaderComponent
                    title={'Edit university info'}
                    leftPress={()=>this.props.navigation.pop()}
                />
                <View style={styles.mainView}>
                    <TouchableWithoutFeedback onPress={()=>{}}>
                        <View style={styles.universityView}>
                            <Text style={styles.text}>{university}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

export default UniversityScreen;

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginTop: 10
    },
    universityView: {
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        marginTop: 5,
        backgroundColor: WHITE,
        justifyContent: 'center',
        ...shadow(5)
    },
    text: {
        fontSize: 16
    },
})