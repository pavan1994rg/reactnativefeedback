import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

const style = {
    backgroundColor: '#585859',
    flex: 1
};

export default class Menu extends Component {
    goTo(routeName) {
        const { navigator } = this.props;
        navigator.push({ name: routeName });
    }
    render() {
        return (
            <View style={style}>
                <Text>Menu</Text>
                <Button
                    title="Show list employees"
                    onPress={() => this.goTo('LIST')}
                />
                <Button
                    title="Add new employee"
                    onPress={() => this.goTo('ADD')}
                />
                <Button
                    title="Check an image"
                    onPress={() => this.goTo('CHECK')}
                />
            </View>
        );
    }
}

