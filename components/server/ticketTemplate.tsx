import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    padding: 10,
  },
  ticket: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 15,
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a5f7a',
  },
  subHeader: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  label: {
    fontSize: 8,
    color: '#666',
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  passengerList: {
    marginTop: 5,
    marginBottom: 5,
  },
  passenger: {
    fontSize: 8,
    marginBottom: 2,
  },
  totalPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a5f7a',
    marginTop: 5,
    textAlign: 'right',
  },
  footer: {
    marginTop: 10,
    fontSize: 6,
    color: '#666',
    textAlign: 'center',
  },
});

const TicketTemplate = ({ ticketDetails }:any) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View style={styles.ticket}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="/api/placeholder/40/40"
          />
          <Text style={styles.companyName}>SAI TRAVELS</Text>
        </View>
        <Text style={styles.subHeader}>Bus Ticket</Text>
        
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Ticket ID</Text>
            <Text style={styles.value}>{ticketDetails._id}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Booking Date</Text>
            <Text style={styles.value}>{new Date(ticketDetails.bookingTime).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Passenger Name</Text>
            <Text style={styles.value}>{ticketDetails.user.fullName}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Contact</Text>
            <Text style={styles.value}>{ticketDetails.user.phone}</Text>
          </View>
        </View>

        <View style={styles.passengerList}>
          <Text style={styles.label}>Passengers:</Text>
          {ticketDetails.passangers.map((passenger:any, index:any) => (
            <Text key={index} style={styles.passenger}>
              {`${index + 1}. ${passenger.fullName} (${passenger.age}, ${passenger.gender})`}
            </Text>
          ))}
        </View>

        <View style={styles.passengerList}>
          <Text style={styles.label}>Sleeper Details:</Text>
          {ticketDetails.sleepers.map((sleeper:any, index:any) => (
            <Text key={index} style={styles.passenger}>
              {`${sleeper.sleeperName} - ${sleeper.busNumber}`}
            </Text>
          ))}
        </View>

        <Text style={styles.totalPrice}>
          Total: ₹{ticketDetails.totalAmount}
        </Text>

        <Text style={styles.footer}>
          Thank you for choosing SAI TRAVELS! For inquiries, call us at: 123-456-7890
        </Text>
      </View>
    </Page>
  </Document>
);

export default TicketTemplate;