import React, { Component } from 'react';
import { View, Button, ScrollView } from 'react-native';
import Employee from './Employee';

export default class List extends Component {
    state = { arrayEmployee: [] }
    componentDidMount() {
        fetch('https://groupkhoapham.herokuapp.com/listEmployee')
        .then(res => res.json())
        .then(list => this.setState({ ...this.state, arrayEmployee: list }));
    }
    
    getRenderedList() {
        return this.state.arrayEmployee.map(e => <Employee info={e} key={e.id} />);
    }

    backToMenu() {
        const { navigator } = this.props;
        navigator.pop();
    }

    render() {
        return (
            <View style={style}>
                <ScrollView>
                {this.getRenderedList()}
                <Button 
                    title="Back to Menu"
                    onPress={this.backToMenu.bind(this)}
                />
                </ScrollView>
            </View>
        );
    }
}

const style = {
    backgroundColor: '#0F7DD6',
    flex: 1
};
