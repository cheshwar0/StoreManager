// mobile/App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import ShopScreen from './screens/ShopScreen';
import OwnerDashboard from './screens/OwnerDashboard';
import DeliveryScreen from './screens/DeliveryScreen';

export default function App() {
  const [role, setRole] = useState('Customer'); // Roles: Customer, Owner, Delivery

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>Sri Lakshmi</Text>
          <Text style={styles.subLogo}>MOBILE PORTAL</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.roleBadge}>{role}</Text>
        </View>
      </View>

      <View style={styles.roleSelector}>
        {['Customer', 'Owner', 'Delivery'].map(r => (
          <TouchableOpacity 
            key={r}
            style={[styles.roleBtn, role === r && styles.roleBtnActive]} 
            onPress={() => setRole(r)}
          >
            <Text style={[styles.roleBtnText, role === r && styles.roleBtnTextActive]}>{r}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {role === 'Customer' && <ShopScreen />}
        {role === 'Owner' && <OwnerDashboard />}
        {role === 'Delivery' && <DeliveryScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { 
    padding: 24, 
    paddingTop: 50,
    backgroundColor: '#000', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  subLogo: { color: '#28a745', fontSize: 10, letterSpacing: 2, fontWeight: 'bold' },
  badge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 },
  roleBadge: { color: '#fff', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  roleSelector: { flexDirection: 'row', gap: 10, padding: 20, backgroundColor: '#fff', marginHorizontal: 20, marginTop: -25, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  roleBtn: { flex: 1, padding: 12, borderRadius: 15, backgroundColor: '#f8f9fa', alignItems: 'center' },
  roleBtnActive: { backgroundColor: '#28a745' },
  roleBtnText: { color: '#666', fontWeight: 'bold', fontSize: 12 },
  roleBtnTextActive: { color: '#fff' },
  content: { flex: 1, marginTop: 10 }
});
