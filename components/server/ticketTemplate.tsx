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
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A', // Blue-900 color
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: 10,
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
    fontSize: 10,
    color: '#666',
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  passengerList: {
    marginTop: 5,
    marginBottom: 5,
  },
  passenger: {
    fontSize: 10,
    marginBottom: 2,
  },
  footer: {
    marginTop: 10,
    fontSize: 8,
    color: '#666',
    textAlign: 'center',
  },
});

const TicketTemplate = ({ ticketDetails }: any) => (
  <Document>
    <Page size="A6" style={styles.page}>
      <View style={styles.ticket}>
        {/* Centered Logo */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="/api/placeholder/60/60" // Adjust the logo source as needed
            
          />
        </View>
        {/* SAI TRAVELS in all caps and blue-900 color */}
        <Text style={styles.companyName}>SAI TRAVELS</Text>
        
        {/* Ticket ID on the left side */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Ticket ID</Text>
            <Text style={styles.value}>{ticketDetails._id}</Text>
          </View>
        </View>

        {/* All passengers' names */}
        <View style={styles.passengerList}>
          <Text style={styles.label}>Passengers:</Text>
          {ticketDetails.passangers.map((passenger: any, index: any) => (
            <Text key={index} style={styles.passenger}>
              {`${index + 1}. ${passenger.fullName}`}
            </Text>
          ))}
        </View>

        {/* Sleeper Details */}
        <View style={styles.passengerList}>
          <Text style={styles.label}>Sleeper Details:</Text>
          {ticketDetails.sleepers.map((sleeper: any, index: any) => (
            <Text key={index} style={styles.passenger}>
              {`${sleeper.sleeperName} - ${sleeper.busNumber}`}
            </Text>
          ))}
        </View>

        {/* Booking Date and Total Price in a single horizontal line */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Booking Date</Text>
            <Text style={styles.value}>{new Date(ticketDetails.bookingTime).toLocaleDateString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Total Price</Text>
            <Text style={styles.value}>₹{ticketDetails.totalAmount}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for choosing SAI TRAVELS! For inquiries, call us at: 123-456-7890
        </Text>
      </View>
    </Page>
  </Document>
);

export default TicketTemplate;
