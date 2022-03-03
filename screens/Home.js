import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Animated,
    ScrollView,
    FlatList,
} from 'react-native';
import {dummyData,SIZES,COLORS,icons,images } from '../constants'
import { EvilIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {

    function renderHeader(){
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                paddingHorizontal:SIZES.padding,
                alignItems:'center'
            }}>

                {/* profile button  */}

                <TouchableOpacity 
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                        width:50,
                        height:50
                    }}
                    onPress={()=>alert('Profile')}
                >
                   <EvilIcons name="user" size={40} color='red' />

                </TouchableOpacity>

                {/* screen button  */}

                <TouchableOpacity
                    style={{
                        alignItems:'center',
                        justifyContent:'center',
                        width:50,
                        height:50
                    }}
                    onPress={()=>alert('screen play')}
                >
                    <Image 
                        source={icons.airplay}
                        style={{
                            width:25,
                            height:25,
                            tintColor:COLORS.primary
                        }}
                    />

                </TouchableOpacity>

            </View>
        )
    }

    return (
      <SafeAreaView
        style={{
            flex:1,
            backgroundColor:COLORS.black
        }}
      >
          {renderHeader()}

      </SafeAreaView>
    )
}

export default Home;