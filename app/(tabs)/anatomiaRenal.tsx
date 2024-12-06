import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

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

const AnatomiaRenalScreen = () => {
  const router = useRouter();
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);

  // Função para buscar vídeos diretamente do Firebase Storage
  const fetchVideosFromStorage = async () => {
    try {
      const storageRef = ref(storage, 'videos/anatomiarenal/');
      const videoList = await listAll(storageRef);

      const urls = await Promise.all(
        videoList.items.map(async (videoRef) => {
          const videoUrl = await getDownloadURL(videoRef);
          return videoUrl;
        })
      );

      setVideoUrls(urls);
    } catch (error) {
      console.error("Erro ao buscar vídeos do Storage:", error);
    } finally {
      setLoading(false);
    }
  };

  // Detecta a rotação da tela
  const handleOrientationChange = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setIsLandscape(
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    );
  };

  useEffect(() => {
    fetchVideosFromStorage();

    // Listener para mudanças na orientação da tela
    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    return () => ScreenOrientation.removeOrientationChangeListener(subscription);
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
      {/* Botão de Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Adicionando a imagem do rim */}
      <Image
        source={require('../../images/rim.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.logo}>SAÚDE RENAL</Text>
      <View style={styles.divider} />

      <Text style={styles.title}>ANATOMIA RENAL</Text>
      <View style={styles.divider} />

      <Text style={styles.description}>
        Assista aos vídeos abaixo para aprender mais sobre a anatomia renal.
      </Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {videoUrls.length > 0 ? (
          videoUrls.map((videoUrl, index) => (
            <View key={index} style={styles.videoCard}>
              <Text style={styles.videoTitle}>Vídeo {index + 1}</Text>
              <Video
                source={{ uri: videoUrl }}
                useNativeControls
                resizeMode={isLandscape ? ResizeMode.STRETCH : ResizeMode.CONTAIN}
                style={[
                  styles.video,
                  isLandscape && {
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  },
                ]}
              />
            </View>
          ))
        ) : (
          <Text style={styles.errorText}>Nenhum vídeo disponível</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3f51b5',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFED9',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  logo: {
    fontSize: 24,
    color: '#004AAD',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#003A7A',
    marginVertical: 15,
  },
  title: {
    fontSize: 22,
    color: '#003A7A',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
  },
  videoCard: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    marginTop: 20,
  },
});

export default AnatomiaRenalScreen;
