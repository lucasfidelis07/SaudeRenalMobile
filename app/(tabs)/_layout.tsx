import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Esconde o cabeçalho de todas as telas
      }}
    />
  );
}
