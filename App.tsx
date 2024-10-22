import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

const App = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (data: any) => {
        console.log(data);
        if (data.length > 0) {
          // Set the image URI to show in the app
          setImageUri(data[0].filePath);
          console.log('Image Path:', data[0].filePath);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
  }, []);

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image
          source={{ uri: `file://${imageUri}` }} // Prepend "file://" to load the local image
          style={styles.image}
        />
      ) : (
        <Text>No Image Shared</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default App;
