import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { Colors } from "@/src/constants/Colors";
import { TabBarIcon } from "@/src/components/navigation/TabBarIcon";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Tabs
					screenOptions={{
						tabBarActiveTintColor:
							Colors[colorScheme ?? "light"].tabIconSelected,
					}}
				>
					<Tabs.Screen
						name="(index)"
						options={{
							title: "CEP",
							headerShown: false,
							tabBarIcon: ({ color, focused }) => (
								<TabBarIcon
									name={focused ? "location" : "location-outline"}
									color={color}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name="settings"
						options={{
							headerShown: true,
							headerStyle: { backgroundColor: "#ffe600" },
							headerTintColor: Colors[colorScheme ?? "light"].tint,
							headerTitleStyle: {
								fontWeight: "bold",
							},
							title: "Configurações",
							tabBarIcon: ({ color, focused }) => (
								<TabBarIcon
									name={focused ? "settings" : "settings-outline"}
									color={color}
								/>
							),
						}}
					/>
				</Tabs>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
