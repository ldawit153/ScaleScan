import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera'; // Assuming you have installed this library

const App = () => {
  const [email, setEmail] = useState('');
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    // This function will be triggered when the user wants to scan
    setIsScanning(true);
  };

  const onBarcodeRead = ({ data }: { data: string }) => {
    // This is called when a QR code or barcode is read
    setScannedData(data);
    setIsScanning(false);
    Alert.alert("Scan Successful", "Weight ticket scanned successfully.");
  };

  const handleSendEmail = () => {
    if (!email || !scannedData) {
      Alert.alert("Error", "Please scan a ticket and enter an email.");
      return;
    }

    // Here, add your logic to send an email with scannedData
    Alert.alert("Email Sent", `Weight ticket sent to ${email}.`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>ScaleScan</Text>

      {isScanning ? (
        <RNCamera
          style={{ width: '100%', height: '60%' }}
          onBarCodeRead={onBarcodeRead}
          captureAudio={false}
        />
      ) : (
        <>
          <Button title="Scan Weight Ticket" onPress={handleScan} />
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              width: '80%',
              marginVertical: 20,
              padding: 8,
              borderRadius: 5,
            }}
            keyboardType="email-address"
          />
          <Button title="Send Ticket" onPress={handleSendEmail} />
        </>
      )}
    </View>
  );
};

export default App;
