import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.push('/(tabs)/principal');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro ao fazer login', error.message);
      } else {
        Alert.alert('Erro desconhecido', 'Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#CCFED9', '#96BBFE']}
      style={styles.container}
    >
      {/* Adicionando a imagem */}
      <Image
        source={require('../../images/rim.png')} // Caminho da imagem
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.logo}>SAÚDE RENAL</Text>

      <Text style={styles.title}>Área de Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#555"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#555"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acessar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push('/(tabs)/login')}
      >
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
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
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    color: '#003A7A',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#003A7A',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    marginLeft: -35,
    marginBottom: 15,
  },
  eyeText: {
    color: '#003A7A',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#004AAD',
    borderRadius: 8,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#004AAD',
    borderRadius: 8,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
