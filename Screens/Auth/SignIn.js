import React from "react";
import {Text, Image,  SafeAreaView, TouchableOpacity, View, Keyboard,  StyleSheet,ScrollView, TextInput, Alert, ActivityIndicator} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
class SignIn extends React.Component{
    state = {
        showPass:true,
        email:"",
        password:'',
        isLoading:false,
       
    }


Login = ()=>{
    this.setState({isLoading:true})
    firestore()
    .collection('users')
    .where('email', '==', this.state.email).get()
    .then(res=>{
        if(res.size>0){

        res._docs.map(async(data)=>{
           
            if(data._data.password == this.state.password){
                console.log(data.id)
                this.setState({isLoading:false,email:'',password:''})
                const user = {
                    "name":data._data.name,
                    "profile_pic":data._data.profile_pic,
                    "email":data._data.email,
                    "age":data._data.age,
                    "gender":data._data.gender,
                    "interests":data._data.interests,
                    "id":data.id,
                    "major":data._data.major,
                    "facebook":data._data.facebook,
                    "instagram":data._data.instagram,
                    "is_admin":data._data.is_admin,



                }
                
                await AsyncStorage.setItem('user',JSON.stringify(user))
             
                    this.props.navigation.reset({
                        index: 0,
                        routes:[{name:'HomeScreens',screen:'Home'}],
                    });
              
                
            }else{
            this.setState({isLoading:false,})

                Alert.alert("Invalid Email or Password")
                return false
            }
        })
    }else{
        this.setState({isLoading:false})

        Alert.alert("Invalid Email or Password")
        return false
    }

    })
    .catch(err=>{
        this.setState({isLoading:false})
        Alert.alert("Something Went Wrong")
        return false
    })
}
 
    render(){
        return(
            <ScrollView style={styles.container}>
          
            <SafeAreaView style={{flex:1,}}>
                <View style={{alignSelf:'center',marginTop:30}}>
            <Image source={require('../../assets/Logo.png')} style={{  width:150,
                height:150,}}/>
                <Text style={{color:'black',textAlign:'center',fontSize:18}}>Terp Talk</Text>
              
                </View>


                <View style={styles.EnteringData}>
                    <TextInput style={styles.EmailInput} value={this.state.email} placeholderTextColor="#929292" onChangeText={(val)=>this.setState({email:val})} placeholder="Email"/>
                    
                <View style={styles.PasswordInput}>
                {this.state.showPass == true ? 
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../../assets/crosseye.png')} style={styles.CrossEyeIconStyle}/>
                </TouchableOpacity>
                }
                

                <TextInput  value={this.state.password} placeholderTextColor="#929292" secureTextEntry={this.state.showPass} onChangeText={(val)=>this.setState({password:val})} placeholder="Password" style={styles.InputField}/>

            </View>
            {this.state.isLoading?<ActivityIndicator size="large" color="gold"/>:null}
            <TouchableOpacity onPress={this.Login} style={styles.LoginButton}>
                    <Text style={styles.LoginButtonText}>Login</Text>
            </TouchableOpacity>
          
                </View>


               
            </SafeAreaView>

           
            <View style={styles.DontHaveAccount}>
                <Text style={styles.DontHaveAccountText}>Don't have an account?</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}  style={styles.SignUpLink}>
                    <Text style={styles.DontHaveAccountSignUpLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        padding:'5%'
    },

    EnteringData:{
        width:'100%',
        marginTop:40

    },

    EmailInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        color:'#929292',
        paddingLeft:10
        
    },

    PasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        marginTop:'3%',
        color:'#929292',
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    },

    imageStyle: {
        padding: 0,
        height: 24,
        width: 24,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    CrossEyeIconStyle: {
        padding: 0,
        height: 18.92,
        width: 19.93,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    InputField:{
        flex:1,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
    },

    LoginButton:{
        width:'100%',
        height:48,
        borderRadius:15,
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%'
    },

    LoginButtonText:{
        color:'#fff',
        fontSize:20
    },

    EyeButton:{
        margin:12,
        marginRight:20,
    },

    SignUpLink:{
        marginLeft:5
    },

    DontHaveAccount:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:130,
        marginBottom:'10%'
    },

    DontHaveAccountSignUpLink:{
        color:'green',
        fontSize:17
    },

    DontHaveAccountText:{
        fontSize:17
    },
    LogoBox:{
        width:'100%',
        height:'30%',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:'10%',
        marginTop:'5%'

    },

    Logo:{
        width:230,
        height:190
    }
})
export default SignIn;