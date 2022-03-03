import React,{useRef} from 'react';
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

    const newSeasonScrollX = useRef(new Animated.Value(0)).current;

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


    function renderNewSeason(){
        return(
            <Animated.FlatList 
                horizontal
                snapToAlignment="center"
                pagingEnabled
                snapToInterval={SIZES.width}
                decelerationRate={0}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop:SIZES.radius
                }}
                data={dummyData.newSeason}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([
                    {nativeEvent:{contentOffset:{x:newSeasonScrollX}}}
                ],{useNativeDriver:false})}
                renderItem={({item,index}) => {
                    return(
                        <TouchableWithoutFeedback
                            onPress={()=>navigation.navigate('MovieDetail',{selectedMovie:item})}
                        >
                            <View 
                                style={{
                                    width:SIZES.width,
                                    alignItems:'center',
                                    justifyContent:'center',
                                }}
                            >
                                {/* thumbnail  */}
                                <ImageBackground
                                    source={item.thumbnail}
                                    resizeMode="cover"
                                    style={{
                                        width:SIZES.width * 0.85,
                                        height:SIZES.width * 0.85,
                                        justifyContent:'flex-end'
                                    }}
                                    imageStyle={{
                                        borderRadius:40
                                    }}
                                >

                                </ImageBackground>


                            </View>

                        </TouchableWithoutFeedback>
                    )
                }}
            
            />
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

          <ScrollView
            contentContainerStyle={{
                paddingBottom:100
            }} 
          >
              {renderNewSeason()}

          </ScrollView>

      </SafeAreaView>
    )
}

export default Home;