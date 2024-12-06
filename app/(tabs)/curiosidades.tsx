import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRse6UVu8Ki6BVw86RbdcwXEbL5muJehk",
  authDomain: "tccapp-64309.firebaseapp.com",
  projectId: "tccapp-64309",
  storageBucket: "tccapp-64309.appspot.com",
  messagingSenderId: "832883484186",
  appId: "1:832883484186:web:ca8b02af43e591c3a413a3",
  measurementId: "G-JY220DLYBF",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

const CuriositiesScreen = () => {
  const [curiosities, setCuriosities] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCuriositiesFromFirebase = async () => {
    try {
      const curiositiesRef = dbRef(database, 'curiosidades');
      onValue(curiositiesRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedCuriosities = await Promise.all(
            Object.values(data).map(async (curiosity: any) => {
              const imageUrl = await getDownloadURL(ref(storage, curiosity.imagePath));
              return {
                title: curiosity.title,
                description: curiosity.description,
                image: imageUrl,
              };
            })
          );
          setCuriosities(fetchedCuriosities);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Erro ao buscar dados do Firebase:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCuriositiesFromFirebase();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#004AAD" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#CCFED9', '#96BBFE']} style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.headerText}>Curiosidades</Text>
      <Text style={styles.description}>Explore informações interessantes sobre diferentes aspectos da hemodiálise.</Text>

      {/* Modal para exibir a imagem em tamanho maior */}
      <Modal
        transparent={true}
        visible={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setSelectedImage(null)}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />
          )}
        </TouchableOpacity>
      </Modal>

      {/* Conteúdo principal */}
      <ScrollView style={styles.scrollView}>
        {curiosities.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => setSelectedImage(item.image)}>
              <Image source={{ uri: item.image }} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFED9',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#003A7A',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '80%',
  },
});

export default CuriositiesScreen;
