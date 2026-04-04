import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, SafeAreaView } from 'react-native';
import { getAssignedOrders, updateOrderStatus } from '../data/MockStorage';

export default function DeliveryScreen() {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = () => {
    // In this demo, we assume the user represents 'Ramesh'
    const data = getAssignedOrders('Ramesh (Laxmi Partner)');
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchTasks();
      setRefreshing(false);
    }, 1000);
  };

  const handleMarkDelivered = (id) => {
    updateOrderStatus(id, 'Delivered');
    fetchTasks();
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskCard}>
      <View style={styles.cardHeader}>
        <View style={styles.badgeContainer}>
           <Text style={styles.idText}>Order #{item.id.slice(-6).toUpperCase()}</Text>
           <View style={[styles.statusBadge, item.status === 'Delivered' ? styles.statusDelivered : styles.statusAssigned]}>
              <Text style={styles.statusText}>{item.status === 'Assigned' ? '📦 TO PACK' : item.status.toUpperCase()}</Text>
           </View>
        </View>
        <Text style={styles.amtText}>₹{item.totalAmount}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: '#28a745' }]}>CUSTOMER</Text>
        <Text style={styles.custName}>{item.customerName}</Text>
        <Text style={styles.custPhone}>☏ {item.customerPhone}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.label, { color: '#007bff' }]}>DELIVERY ADDRESS</Text>
        <Text style={styles.addrText}>{item.address}</Text>
      </View>

      <View style={styles.itemSummary}>
        <Text style={styles.itemCountText}>📦 {item.items.length} Items to Deliver</Text>
      </View>

      {item.status !== 'Delivered' && (
        <TouchableOpacity 
          style={styles.deliveryBtn} 
          onPress={() => handleMarkDelivered(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deliveryBtnText}>MARK AS DELIVERED ✅</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Delivery Queue</Text>
        <Text style={styles.subHeader}>You have {tasks.filter(t => t.status !== 'Delivered').length} active tasks</Text>
      </View>

      <FlatList 
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#28a745" />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyText}>All caught up! No pending deliveries.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  headerSection: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 20 },
  header: { fontSize: 28, fontWeight: '900', color: '#1a1a1a', letterSpacing: -0.5 },
  subHeader: { fontSize: 14, color: '#666', marginTop: 4 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  taskCard: { 
    backgroundColor: '#fff', 
    borderRadius: 24, 
    padding: 24, 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.08, 
    shadowRadius: 15, 
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  badgeContainer: { gap: 6 },
  idText: { fontSize: 12, fontWeight: '700', color: '#999', letterSpacing: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  statusAssigned: { backgroundColor: '#fff8e1' },
  statusDelivered: { backgroundColor: '#e8f5e9' },
  statusText: { fontSize: 10, fontWeight: '800', color: '#f57c00' },
  amtText: { fontSize: 22, fontWeight: '900', color: '#28a745' },
  divider: { height: 1.5, backgroundColor: '#f0f0f0', marginBottom: 20 },
  infoRow: { marginBottom: 18 },
  label: { fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 6 },
  custName: { fontSize: 18, fontWeight: '700', color: '#1a1a1a' },
  custPhone: { fontSize: 13, color: '#666', marginTop: 2 },
  addrText: { fontSize: 15, color: '#444', lineHeight: 22, fontWeight: '500' },
  itemSummary: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 12, marginBottom: 20 },
  itemCountText: { fontSize: 13, fontWeight: '600', color: '#666', textAlign: 'center' },
  deliveryBtn: { 
    backgroundColor: '#000', 
    paddingVertical: 18, 
    borderRadius: 18, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 }
  },
  deliveryBtnText: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 1 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80 },
  emptyEmoji: { fontSize: 60, marginBottom: 20 },
  emptyText: { color: '#999', fontSize: 16, textAlign: 'center', fontWeight: '600' }
});
