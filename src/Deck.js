import React, {Component} from 'react';
import {
    View, 
    Text, 
    Animated, 
    PanResponder
} from 'react-native'

class Deck extends Component {

    constructor(props){
        super(props)
        this.position  = new Animated.ValueXY()
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                //console.log(gestureState)
                this.position.setValue({x: gestureState.dx, y: gestureState.dy})
            },
            onPanResponderRelease: () => {}
        })
    }

    getCardStyle(){
        
        const rotate = this.position.x.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: ['-120deg', '0deg', '120deg']
        })
        console.log(this.position)
        return {
            ...this.position.getLayout(),
            transform: [{rotate}]
        }
    }

    renderCards(){
        return this.props.data.map((item, idx) => {
            if(idx === 0){
                return (
                <Animated.View
                    key={item.id}
                    style={this.getCardStyle()} 
                    {...this._panResponder.panHandlers}
                >
                    {this.props.renderCard(item)}
                </Animated.View>

                )
            }
            return this.props.renderCard(item)
        })
    }

    render(){
        console.log(this._panResponder.panHandlers)
        return(
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

export default Deck;