// mobile/screens/ShopScreen.js
import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const products = [
  { id: '1', name: 'Basmati Rice', price: '₹60', cat: 'Grains' },
  { id: '2', name: 'Fresh Milk', price: '₹50', cat: 'Dairy' },
  { id: '3', name: 'Pure Sugar', price: '₹45', cat: 'Groceries' },
];

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Search groceries..." />
      <FlatList 
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.cat}>{item.cat}</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnTxt}>{item.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  search: { backgroundColor: '#eee', padding: 12, borderRadius: 25, marginBottom: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 10 },
  name: { fontWeight: 'bold', fontSize: 16 },
  cat: { color: '#888', fontSize: 12 },
  btn: { backgroundColor: '#28a745', padding: 8, borderRadius: 20 },
  btnTxt: { color: '#fff', fontWeight: 'bold' }
});
