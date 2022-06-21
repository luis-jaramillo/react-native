import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <FlatList 
      data={[
        {key:"1", name:"Luis"},
        {key:"2", name:"yuly"},
        {key:"3",name:"Salva"},
        {key:"4",name:"Nataly"},
        {key:"5",name:"Paula"},
        {key:"6",name:"Rosa"},
      ]}
      renderItem={({item})=><Text style={{padding:10, fontSize: 22, height: 50}} >{item.name}</Text>}>

      </FlatList>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

 