import React from 'react';
import {View,Text,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default class Splash extends React.Component {
    state = {
        isLoggedIn:false,
      
      }

    isLoggedIn = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
      
        if(parse == null){
          this.setState({isLoggedIn:false})
        }else{
          this.setState({isLoggedIn:true})
        }

        if(this.state.isLoggedIn){
           
                this.props.navigation.reset({
                    index: 0,
                    routes:[{name:'HomeScreens'}],
                });
           
            
        }else{
            this.props.navigation.reset({
                index: 0,
                routes:[{name:'Signin'}],
            });
        }

        
        }

        componentDidMount(){
            setTimeout(()=>{
              this.isLoggedIn()
          
            },1000)
              
          }


    render(){
        return(
            <View style={{ flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <Image source={require('../../assets/Logo.png')} style={{  width:300,
                height:300,}}/>
                <Text style={{color:'black',fontSize:20}}>Terp Talk</Text>

            </View>
        )
    }
}