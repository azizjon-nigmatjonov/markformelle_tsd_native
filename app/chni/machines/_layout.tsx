import { Stack } from "expo-router";

export default function MachinesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="machine" options={{ headerShown: false }} />
    </Stack>
  );
}
