import React,{useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList,Modal, Pressable, Image, Alert } from 'react-native';
 
export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userSelected,setUserSelected] = useState ({name: {title: "", first: "", last: ""}});
  useEffect(()=>{
    fetch('https://randomuser.me/api/?results=100')
    .then(response=> response.json())
    .then(data=>{

      setUsers(data.results)
      setLoading(false)
    })
  },[]);

  if(loading){
    return <View style={styles.center}  >
      <ActivityIndicator size="large" color="#0000ff" ><Text>loading...</Text></ActivityIndicator>
    </View>
  }
  return ( 
    <View style={styles.container}>
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>  {userSelected.name.title} {userSelected.name.first} {userSelected.name.last} </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => { 
                setModalVisible(!modalVisible) ;
                 Alert.alert("Alert","Message")
                }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <FlatList
          data={users}
          renderItem={({item})=> userItem(item) }
          keyExtractor = {item=> String(item.login.uuid)}
          ></FlatList>
        
         
    </View>
  );

 
   function userItem(user) {

    return  <View  style={ styles.itemContainer} >
    <Pressable
        onPress={() => { 
          setModalVisible(!modalVisible) ;
          setUserSelected(user);
          }}
      >
      <Image 
        style = {styles.photo}
        source = {{uri:user.picture.thumbnail}}
        />
    </Pressable>

    <Text  style={styles.item} >
      {user.name.title} {user.name.first} {user.name.last}
    </Text>
 
  </View>
 }

}
const styles = StyleSheet.create({

  itemContainer:{
    height:80,
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    padding:10,
    alignItems: 'center',
    flexDirection: "row",
  },
  
  photo:{
    height:60,
    width:60,
 
  },
  item: {
    fontSize: 22,
    paddingLeft:10,
    alignContent:'center',
    alignItems:'center'
  },
 
  center:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop:22
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
