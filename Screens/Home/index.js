import React from "react";
import { SafeAreaView, Text, FlatList, Image, View, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from './styles';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import User from "./User";
let users = []
class Home extends React.Component{

    state = {
        data:'',
        isLoading:true,
        netwok_error:false,
        user:''
    }

    getUserInfo = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({user:parse})
    }

    getAllusers = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        
        firestore().collection("users").get()
        .then(res=>{
          res._docs.filter(i=>{
              console.log(i)
              if(i.id != parse.id && i.is_admin != 1){
                  users.push(i)
                  console.log(users)
                this.setState({data:users})

              }
          }) 
          this.setState({isLoading:false})
        })
    }
    handleRefresh  =()=>{
        users = []
        this.setState({isLoading:true},()=>{
            this.getAllusers()
        })
    }

    get_all_users_on_delete = ()=>{
        users = []
        this.setState({data:users})
        this.getAllusers()
    }

    componentDidMount(){
        users=[]
        this.getAllusers()
        this.getUserInfo()
    }

    render(){
        if(this.state.isLoading == false){

        return(
            <View>
                {this.state.user.is_admin == 1?<Text style={{color:'black',fontWeight:'bold',fontSize:20,marginTop:20,textAlign:'center'}}>Admin</Text>:null}
                <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.container}
                data={this.state.data}
                keyExtractor={item=>item.id}
                refreshing={this.state.isLoading}
                onRefresh={this.handleRefresh}
                renderItem={({item}) => (
                     <User id={item.id} get_all_users={this.get_all_users_on_delete} navigation={this.props.navigation} data={item._data}/>
                )}
                />
           </View>
        )
    }else{
        return <ActivityIndicator size="large" color="gold" style={{ marginTop:50 }}/>
    }

    }
}

export default Home;