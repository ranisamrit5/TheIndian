import React from 'react';
import {View, Text, Switch} from 'react-native';
import {appStyles} from "../../../themes/styles";

class AddMediaScreen extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={appStyles.container}>
                <View>
                    <Text>My Device</Text>
                </View>
            </View>
        );
    }
}

export default AddMediaScreen;