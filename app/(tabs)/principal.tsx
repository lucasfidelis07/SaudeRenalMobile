import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const KidneyInfoScreen = () => {
  const router = useRouter();

  type Option = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    href: string;
  };

  const options: Option[] = [
    { label: "Anatomia Renal", icon: "heart-outline", href: "/(tabs)/anatomiaRenal" },
    { label: "Fisiologia Renal", icon: "pulse", href: "/(tabs)/fisiologiaRenal" },
    { label: "Função Renal", icon: "medkit", href: "/(tabs)/funcaoRenal" },
    { label: "Sintomas da DRC", icon: "warning", href: "/(tabs)/sintomasDrc" },
    { label: "Prevenção da DRC", icon: "shield-checkmark", href: "/(tabs)/prevencaoDrc" },
    { label: "Cuidados ao Paciente Transplantado", icon: "person-add", href: "/(tabs)/cuidadosTransplantado" },
    { label: "Cuidados ao Paciente em Diálise", icon: "bed", href: "/(tabs)/cuidadosDialise" },
    { label: "Curiosidades", icon: "bulb-outline", href: "/(tabs)/curiosidades" },
  ];

  // Função para abrir o chatbot no navegador
  const openBlipChat = async () => {
    const blipChatUrl = 'https://chatbot-saude-renal-d7vh6.chat.blip.ai/?appKey=Y2hhdGJvdDMwNTplOTFhMTg0Yi04MTFkLTQxOGMtYWI0Ni05OGE3YmVlYzRjYTI=';
    const supported = await Linking.canOpenURL(blipChatUrl);

    if (supported) {
      await Linking.openURL(blipChatUrl);
    } else {
      alert('Não foi possível abrir o link do chatbot.');
    }
  };

  return (
    <LinearGradient
      colors={['#CCFED9', '#96BBFE']}
      style={styles.container}
    >
      {/* Botão de Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Adicionando a imagem */}
      <Image
        source={require('../../images/rim.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.headerText}>SAÚDE RENAL</Text>
      <View style={styles.divider} />

      <Text style={styles.subHeaderText}>OPÇÕES GERAIS</Text>
      <View style={styles.divider} />

      <Text style={styles.description}>
        Deseja aprender algo mais? Escolha uma das opções abaixo:
      </Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionBox} 
              onPress={() => router.push(option.href)}
            >
              <Ionicons name={option.icon} size={24} color="#D3A4F5" />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Botão Blip Chat */}
      <TouchableOpacity 
        style={styles.blipChatButton} 
        onPress={openBlipChat}
      >
        <Ionicons name="chatbubbles-outline" size={30} color="#FFF" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 40,
    paddingHorizontal: 20,
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
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004AAD',
    marginBottom: 10,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#003A7A',
    marginVertical: 15,
  },
  subHeaderText: {
    fontSize: 20,
    color: '#003A7A',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#003A7A',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollView: {
    width: '100%',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionBox: {
    height: 90,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#444',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left',
    marginLeft: 15,
  },
  blipChatButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3f51b5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default KidneyInfoScreen;
