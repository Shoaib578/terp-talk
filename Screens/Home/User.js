import React from 'react';
import {View,Text,TouchableOpacity,Image, Dimensions,Alert} from 'react-native';
import styles from './styles';
import storage from '@react-native-firebase/storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'

export default class User extends React.Component {
    state = {
        profile_pic_url:'',
        user:''
    }

    getImage = ()=>{
      
        storage()
        .ref('profile_pics/' +this.props.data.profile_pic) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
        this.setState({profile_pic_url:url});
           
        })
        .catch((e) => console.log('Errors while downloading => ', e));

    }

    getUserInfo = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({user:parse})

    }

    Delete_User = ()=>{
        storage()
            .refFromURL(this.state.profile_pic_url).delete()
            .then(()=>{
                firestore().collection("users").doc(this.props.id).delete()
                .then(res=>{
                    
                    this.props.get_all_users()
                })
                .catch(err=>{
                    Alert.alert("Something Went Wrong")
                })
            })
            .catch(err=>{
                Alert.alert("Something Went Wrong")
            })
    }

    componentDidMount(){
     
        this.getImage()
        this.getUserInfo()
    }

    render(){
        return(
            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('User',{id:this.props.id})} style={styles.Profile}>
                
            <Image style={styles.ImageBorder} source={this.state.profile_pic_url?{uri:this.state.profile_pic_url}:require('../../assets/ProfileImage.png')} />
           
           
            <Text style={styles.Name}>{this.props.data.name}</Text>
            

            <View style={{ marginLeft:'30%',}}>
           


           {this.state.user.is_admin == 1?<TouchableOpacity style={{left:20}} onPress={this.Delete_User}>

            <FontAwesome name="trash" color="red" size={25}/>

            </TouchableOpacity>:null}
            </View>
            
           


            
        </TouchableOpacity>
        )
    }
}