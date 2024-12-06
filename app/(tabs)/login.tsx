import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../firebaseConfig'; 
import { Link } from 'expo-router'; 
import { LinearGradient } from 'expo-linear-gradient';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Conta criada com sucesso', `Bem-vindo, ${name}!`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro ao criar conta', error.message);
      } else {
        Alert.alert('Erro ao criar conta', 'Ocorreu um erro desconhecido.');
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

      <Text style={styles.title}>Crie uma Conta</Text>
      <Text style={styles.subtitle}>Preencha os campos abaixo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#555"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirme a Senha"
          placeholderTextColor="#555"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.eyeButton}
        >
          <Text style={styles.eyeText}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <Link href="/(tabs)/" style={styles.signInLink}>
        <Text style={styles.signInText}>Você já tem uma conta? Acessar</Text>
      </Link>
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
  },
  subtitle: {
    fontSize: 16,
    color: '#005BB5',
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
  signInLink: {
    marginTop: 20,
  },
  signInText: {
    color: '#004AAD',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
