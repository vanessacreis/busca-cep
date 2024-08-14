import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function HomeLayout() {
	const colorScheme = useColorScheme();

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "CEP",
					headerStyle: { backgroundColor: "#ffe600" },
					headerTintColor: Colors[colorScheme ?? "light"].tint,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
			<Stack.Screen
				name="[cep]"
				options={({ route }) => ({
					title: route.params ? route.params.cep : "CEP",
					headerStyle: { backgroundColor: "#ffe600" },
					headerTintColor: Colors[colorScheme ?? "light"].tint,
					headerTitleStyle: {
						fontWeight: "bold",
					},
				})}
			/>
		</Stack>
	);
}
