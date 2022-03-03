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
import {dummyData,SIZES,COLORS,icons,images, FONTS } from '../constants'
import {Profiles} from '../components'
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
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            height:60,
                                            width:"100%",
                                            paddingHorizontal:SIZES.radius,
                                            marginBottom:SIZES.radius,
                                        }}
                                    >

                                        {/* play now  */}

                                        <View
                                            style={{
                                                flex:1,
                                                flexDirection:'row',
                                                alignItems:'center'
                                            }}
                                        >
                                            <View 
                                                style={{
                                                    justifyContent:'center',
                                                    alignItems:'center',
                                                    height:40,
                                                    width:40,
                                                    borderRadius:20,
                                                    backgroundColor:COLORS.transparentWhite

                                                }}
                                            >
                                                <Image 
                                                    source={icons.play}
                                                    resizeMode="contain"
                                                    style={{
                                                        width:15,
                                                        height:15,
                                                        tintColor:COLORS.white
                                                    }}
                                                />

                                            </View>
                                            
                                            <Text style={{marginLeft:SIZES.base,color:COLORS.white,...FONTS.h3}}>Play Now</Text>
                                        </View>


                                        {/* still watching  */}
                                        {item.stillWatching.length > 0 && 
                                            <View 
                                                style={{
                                                    justifyContent:'center'
                                                }}
                                            >
                                                <Text style={{color:COLORS.white,...FONTS.h3,}}>Still Watching</Text>
                                                
                                                <Profiles 
                                                    profiles={item.stillWatching}
                                                />

                                            </View>

                                        }

                                    </View>

                                </ImageBackground>


                            </View>

                        </TouchableWithoutFeedback>
                    )
                }}
            
            />
        )
    }

    function renderDots(){

        const dotPosition = Animated.divide(newSeasonScrollX,SIZES.width)

        return(
            <View
                style={{
                    marginTop:SIZES.padding,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                {dummyData.newSeason.map((item,index)=>{

                    const opacity = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[0.3,1,0.3],
                        extrapolate:"clamp"
                    })

                    const dotWidth = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[6,20,6],
                        extrapolate:"clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange:[index-1,index,index+1],
                        outputRange:[COLORS.lightGray,COLORS.primary,COLORS.lightGray],
                        extrapolate:"clamp"
                    })



                    return(
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                borderRadius:SIZES.radius,
                                marginHorizontal:3,
                                width:dotWidth,
                                height:6,
                                backgroundColor:dotColor
                            }}
                        >

                        </Animated.View>
                    )
                })}

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

          <ScrollView
            contentContainerStyle={{
                paddingBottom:100
            }} 
          >
              {renderNewSeason()}
              {renderDots()}

          </ScrollView>

      </SafeAreaView>
    )
}

export default Home;