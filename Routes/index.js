import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import {View,Text,TouchableOpacity, Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import SignIn from '../Screens/Auth/SignIn';
import SignUp from '../Screens/Auth/Signup';
import Splash from '../Screens/Splash';
import Home from '../Screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage'
import storage from '@react-native-firebase/storage'
import Profile from '../Screens/Profile';
import ViewUser from '../Screens/ViewUser';

const Stack = createStackNavigator()

export default class Routes extends React.Component {
state = {
    profile_pic:'',
   
}




header_right = (navigation)=>{
    
     return(
         <View style={{marginRight:20}}>
    


     <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
         <Image source={this.state.profile_pic?{uri:this.state.profile_pic}:require('../assets/ProfileImage.png')} style={{ width:40,height:40,borderRadius:40 }}/>
     </TouchableOpacity>

     </View>
     )
 }

 getUserInfo = async()=>{
    const user = await AsyncStorage.getItem('user')
    const parse = JSON.parse(user)
  
    
    storage()
    .ref('profile_pics/' +parse.profile_pic) //name in storage in firebase console
    .getDownloadURL()
    .then((url) => {
    this.setState({profile_pic:url});
       
    })
    .catch((e) => console.log('Errors while downloading => ', e));
}



 HomeStack = ({navigation})=>(
     <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerRight:()=>this.header_right(navigation)}}/>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="User" component={ViewUser} options={{headerRight:()=>this.header_right(navigation)}}/>

     </Stack.Navigator>
 )
 
componentDidMount(){
    this.getUserInfo()
}


render(){
    
    
    return(
        <NavigationContainer >
            <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name="Signin" component={SignIn} options={{headerShown:false}}/>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="HomeScreens" component={this.HomeStack} options={{headerShown:false}}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}

}