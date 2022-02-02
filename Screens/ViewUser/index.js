import React from 'react'
import {View,Text,TouchableOpacity, ScrollView, Image } from 'react-native'
import storage from '@react-native-firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
export default class ViewUser extends React.Component {
    state = {
        profile_pic:'',
        data:''
      
    }

    getUserInfo = ()=>{
       
        firestore().collection("users").doc(this.props.route.params.id).get()
        .then(res=>{
           
            this.setState({data:res._data})
            storage()
            .ref('profile_pics/' + res._data.profile_pic) //name in storage in firebase console
            .getDownloadURL()
            .then((url) => {
               
             this.setState({profile_pic:url})
            })
            .catch((e) => console.log('Errors while downloading => ', e));
        })
       
    }

  
    
    
    componentDidMount(){
        this.getUserInfo()
       
        
    }
   
    render(){
        return (
            <ScrollView style={{padding:'5%',flex:1,}}>
                <View style={{alignItems: 'center',paddingBottom:50}}>
                <Image source={this.state.profile_pic?{uri:this.state.profile_pic}:require('../../assets/ProfileImage.png')} style={{width:100,height:100,borderRadius:100}} />

                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Name : </Text>
                    <Text style={{color:'white',}} selectable>{this.state.data.name}</Text>
                </View>

               

                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}} >Email : </Text>
                    <Text style={{color:'white',}} selectable>{this.state.data.email}</Text>
                </View>

             
                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Gender : </Text>
                    <Text style={{color:'white',}}>{this.state.data.gender}</Text>
                </View>


                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Facebook ID : </Text>
                    <Text style={{color:'white',}} selectable>{this.state.data.facebook}</Text>
                </View>


                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Instagram ID : </Text>
                    <Text style={{color:'white',}} selectable> {this.state.data.instagram}</Text>
                </View>


                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Age : </Text>
                    <Text style={{color:'white',}} >{this.state.data.age}</Text>
                </View>

               
                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Interests : </Text>
                    <Text style={{color:'white',}}>{this.state.data.interests}</Text>
                </View>
               
                <View style={{width:'95%',borderRadius:10,borderColor:'black',backgroundColor:'black',padding:10,flexDirection:'row',marginTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Major : </Text>
                    <Text style={{color:'white',}}>{this.state.data.major}</Text>
                </View>


                </View>

            </ScrollView>
        )
    }
}