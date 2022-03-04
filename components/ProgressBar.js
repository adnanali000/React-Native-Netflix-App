import React from 'react';
import {View,Text} from 'react-native';
import {SIZES,COLORS} from '../constants';

const ProgressBar = ({barStyle , containerStyle , barPercentage})=>{
    return(
        <View style={{...containerStyle}}>
            <View
                style={{
                    position:'absolute',
                    left:0,
                    bottom:0,
                    width:"100%",
                    marginTop:SIZES.base,
                    backgroundColor:COLORS.gray,
                    ...barStyle
                }}
            >

            </View>

            <View
                style={{
                    position:'absolute',
                    left:0,
                    bottom:0,
                    width:barPercentage,
                    marginTop:SIZES.padding,
                    backgroundColor:COLORS.primary,
                    ...barStyle

                }}
            >

            </View>
        </View>
    )
}


export default ProgressBar;
