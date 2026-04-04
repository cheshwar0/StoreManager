// mobile/screens/OwnerDashboard.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function OwnerDashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Store Insights</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>₹42,500</Text>
          <Text style={styles.statLab}>Total Sales</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statVal}>12</Text>
          <Text style={styles.statLab}>Live Orders</Text>
        </View>
      </View>

      <Text style={styles.subHeader}>Critical Stock Alerts</Text>
      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>⚠️ Rice (1kg) is low</Text>
        <Text style={styles.alertDesc}>Only 4 units left. Predicted stock-out: Tomorrow.</Text>
      </View>
      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>⚠️ Milk (1L) is low</Text>
        <Text style={styles.alertDesc}>Current stock: 2. High demand area.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 15, marginBottom: 30 },
  statBox: { flex: 1, backgroundColor: '#000', padding: 20, borderRadius: 15 },
  statVal: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLab: { color: '#888', fontSize: 12 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  alertCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  alertTitle: { fontWeight: 'bold', color: '#d9534f' },
  alertDesc: { fontSize: 12, color: '#666', marginTop: 4 }
});
