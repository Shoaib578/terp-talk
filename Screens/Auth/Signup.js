import React from "react";
import {Text, Image,  SafeAreaView, TouchableOpacity, StyleSheet,View, Keyboard, TouchableWithoutFeedback, ScrollView, TextInput, Alert, ActivityIndicator} from 'react-native'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from "react-native-image-picker"
import SelectDropdown from 'react-native-select-dropdown'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import validator from "validator";





class SignUp extends React.Component{

    gender = ["Male", "Female"]

    
    state = {
        showPass:true,
        email:'',
        password:'',
        name:'',
        age:'',
        major:'',
        interests:'',
        gender:'',
       
        imageName:'',
        profile_pic:'',
        facebook:'',
        instagram:'',
        isLoading:false
    }

    choosePhoto(){
    
        const options = {
          noData:true
        };
        
        ImagePicker.launchImageLibrary(options, response => {
          console.log("response", response);
          if(response.assets){
            
            response.assets.map(data=>{
           console.log(data);
   
            this.setState({profile_pic:data,uri: data.uri,imageName:data.fileName});
           })
           
         }
        });
      }

    upload_image = async()=>{
       try{
        await storage().ref('profile_pics/'+this.state.imageName).putFile(this.state.uri)
        .then(res=>{
            console.log("Image has been Uploads")
        })

       }catch(e){
        Alert.alert("Something Went Wrong")
        return false
       }
       
    }  


    SignUp = ()=> {
        if(this.state.profile_pic.length<1){
            Alert.alert("Please Select Profile Picture")
            return false

        }


        if(validator.isEmail(this.state.email) == false){
            Alert.alert("Invalid Email")
            return false
        }

        if(this.state.password.length<5){
            Alert.alert("Password Must Be at least 5 characters")
            return false
        }

        if(this.state.name.length<1){
            Alert.alert("Please Enter Your Name")
            return false
        }

        if(this.state.interests.length<1){
            Alert.alert("Interests Field is Required")
            return false
        }

        if(this.state.major.length<1){
            Alert.alert("Gender Field is Required")
            return false
        }

        if(this.state.age.length<1){
            Alert.alert("Age Field is Required")
            return false
        }

     




        
        this.setState({isLoading:true})
        firestore().collection('users').where("email",'==',this.state.email).get()
        .then(res=>{
            if(res.size <1){
                this.upload_image()
                .then(i=>{
                    firestore().collection('users')
                    .add({
                      
                        name:this.state.name,
                        profile_pic:this.state.imageName,
                        email:this.state.email,
                        password:this.state.password,
                        age:this.state.age,
                        major:this.state.major,
                        interests:this.state.interests,
                        gender:this.state.gender,
                        facebook:this.state.facebook,
                        instagram:this.state.instagram,
                        is_admin:0
                      
     
                    })
                    .then(res=>{
                        this.setState({isLoading:false,
                            email:'',
                            password:'',
                            name:'',
                            age:'',
                            major:'',
                            interests:'',
                            gender:'',
                           
                            imageName:'',
                            profile_pic:'',
                            facebook:'',
                            instagram:'',
                            
                        })
                        
                        Alert.alert("Registered Successfully")
                    })
                    .catch(err=>{
                        this.setState({isLoading:false})
                        Alert.alert("Something Went Wrong")
                    })
                })
              
            }else{
                this.setState({isLoading:false})

                Alert.alert("Email Already Exist Please Try Another One")
                return false
            }
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    render(){
        return(
            
                <ScrollView  style={styles.container}>
           
            
               
                <TouchableOpacity onPress={() => this.choosePhoto()} style={styles.ProfileImage}>
                {this.state.profile_pic.uri?<Image style={[styles.ProfileImageIcon,{borderRadius:80}]} source={{uri: this.state.profile_pic.uri}}/>:<Image  style={styles.ProfileImageIcon} source={require('../../assets/ProfileImage.png')}/>}

                
                </TouchableOpacity>
                <View style={styles.EnteringData}>
                    <TextInput style={styles.EmailInput} value={this.state.email} onChangeText={(val)=>this.setState({email:val})} placeholderTextColor="#929292" placeholder="Email"/>

                    <TextInput onChangeText={(val)=>this.setState({name:val})} value={this.state.name} style={styles.NameInput} placeholderTextColor="#929292" placeholder="Name"/>
                    <TextInput style={styles.NameInput} onChangeText={(val)=>this.setState({age:val})} keyboardType="numeric"  value={this.state.age} placeholderTextColor="#929292" placeholder="Age"/>
                    <TextInput onChangeText={(val)=>this.setState({facebook:val})} value={this.state.facebook} style={styles.NameInput} placeholderTextColor="#929292" placeholder="Facebook ID"/>
                    <TextInput onChangeText={(val)=>this.setState({instagram:val})} value={this.state.instagram} style={styles.NameInput} placeholderTextColor="#929292" placeholder="Instagram ID"/>

                    <TextInput onChangeText={(val)=>this.setState({major:val})} value={this.state.major} style={styles.NameInput} placeholderTextColor="#929292" placeholder="Major"/>
                    <TextInput onChangeText={(val)=>this.setState({interests:val})} value={this.state.interests} style={styles.NameInput} placeholderTextColor="#929292" placeholder="Interests"/>
                    
                <View style={styles.PasswordInput}>
                {this.state.showPass == true ? 
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../../assets/crosseye.png')} style={styles.CrossEyeIconStyle}/>
                </TouchableOpacity>
                }
                
                <TextInput placeholderTextColor="#929292" value={this.state.password} onChangeText={(val)=>this.setState({password:val})} secureTextEntry={this.state.showPass} placeholder="Password" style={styles.InputField}/>

            </View>
            <SelectDropdown
                renderDropdownIcon={() => (
                    <MIcon name="keyboard-arrow-down" color="#7C7C7C" size={23} />
                )}
                 defaultButtonText="Gender"
                 buttonStyle={styles.dropDown}
	             data={this.gender}
	             onSelect={(selectedItem, index) => {
		         this.setState({gender:selectedItem})
	             }}
	            buttonTextAfterSelection={(selectedItem, index) => {
		        
		        return selectedItem
	            }}
	            rowTextForSelection={(item, index) => {
		        // text represented for each item in dropdown
		        // if data array is an array of objects then return item.property to represent item in dropdown
		        return item
	            }}
                />
                {this.state.isLoading?<ActivityIndicator size="large" color="gold" style={{ alignSelf: "center" }}/>:null}
                <TouchableOpacity onPress={this.SignUp}  style={styles.LoginButton}>
                        <Text style={styles.LoginButtonText}>Sign Up</Text>
                </TouchableOpacity>
          
                </View>
                
             

                    <View style={styles.AlreadyHaveAccount}>
                    <Text style={styles.DontHaveAccountText}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signin")} style={styles.SignInLink}>
                        <Text style={styles.AlreadyHaveAccountSignInLink}>Login</Text>
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
        paddingRight:'5%',
        paddingLeft:'5%'
    },

    BackArrow:{
        width:8.49,
        height:14
    },

    BackText:{
        color:'#5FA7C0',
        fontSize:16,
        marginLeft:5
    },

    Back:{
        flexDirection:'row',
        alignItems:'center',
        width:'15%'
    },

    EnteringData:{
        width:'100%',
        marginTop:20

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

    NameInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        color:'#929292',
        paddingLeft:10,
        marginTop:'3%',
        
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

    SignInLink:{
        marginLeft:5
    },

    AlreadyHaveAccount:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:50,
        marginBottom:'10%'
    },

    AlreadyHaveAccountSignInLink:{
        color:'green',
        fontSize:17
    },

    DontHaveAccountText:{
        fontSize:17
    },


    Logo:{
        width:230,
        height:121
    },

    ProfileImage:{
        width:80,
        height:80,
        backgroundColor:'green',
        borderRadius:40,
        alignSelf:'center',
        marginTop:20
       
    },

    ProfileImageIcon:{
        width:'100%',
        height:'100%'
    },

    dropDown:{
        marginTop:'3%',
        width:'100%',
        backgroundColor:'#FFFFFF',
        borderBottomColor:'#7C7C7C',
        borderBottomWidth:0.7,
      }
})
export default SignUp;