import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        width:'100%',
      
    },

    Profile:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        marginTop:10,
        backgroundColor:'#D3D3D3',
        padding:10

    },

    ProfileImage:{
        width:50,
        height:50,
        borderRadius:25,
    },

    Name:{
        marginLeft:15,
        color:'#000000',
        fontSize:15,
    },

    ImageBorder:{
        width:65,
        height:65,
        borderRadius:65,
        borderColor:'red',
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default styles