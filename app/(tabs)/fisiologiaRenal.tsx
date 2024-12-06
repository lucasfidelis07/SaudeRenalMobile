import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRse6UVu8Ki6BVw86RbdcwXEbL5muJehk",
  authDomain: "tccapp-64309.firebaseapp.com",
  projectId: "tccapp-64309",
  storageBucket: "tccapp-64309.appspot.com",
  messagingSenderId: "832883484186",
  appId: "1:832883484186:web:ca8b02af43e591c3a413a3",
  measurementId: "G-JY220DLYBF"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

const VideoScreen = () => {
  const router = useRouter();
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideoUrls = async () => {
    try {
      const storage = getStorage(app);
      const videoListRef = ref(storage, 'videos/fisiologiarenal/');
      const videoList = await listAll(videoListRef);

      const urls = await Promise.all(
        videoList.items.map(async (video) => {
          const url = await getDownloadURL(video);
          return url;
        })
      );

      setVideoUrls(urls);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoUrls();

    // Atualiza a lista de vídeos a cada 5 minutos
    const intervalId = setInterval(fetchVideoUrls, 300000); // 300000ms = 5 minutos
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
        source={require('../../images/rim.png')} // Substitua pelo caminho correto da imagem
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.logo}>SAÚDE RENAL</Text>
      <View style={styles.divider} />

      <Text style={styles.title}>FISIOLOGIA RENAL</Text>
      <View style={styles.divider} />

      <Text style={styles.description}>
        Assista aos vídeos abaixo para aprender mais sobre a fisiologia renal.
      </Text>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {videoUrls.length > 0 ? (
          videoUrls.map((videoUrl, index) => (
            <View key={index} style={styles.videoCard}>
              <Text style={styles.videoTitle}>Vídeo {index + 1}</Text>
              <Video
                source={{ uri: videoUrl }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                style={styles.video}
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
    paddingTop: 80, // Adiciona mais espaço no topo
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
    marginBottom: 20, // Espaço entre a imagem e o texto "SAÚDE RENAL"
  },
  logo: {
    fontSize: 24,
    color: '#004AAD',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#003A7A',
    marginVertical: 20, // Espaçamento acima e abaixo da linha divisória
  },
  title: {
    fontSize: 22,
    color: '#003A7A',
    fontWeight: 'bold',
    marginBottom: 10,
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

export default VideoScreen;
