import { Container } from "@/src/components/Container";
import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, Button, View } from "react-native";

export default function HomeScreen() {
	const colorScheme = useColorScheme();
	const router = useRouter();

	const [cep, setCep] = useState("");
	const [error, setError] = useState(false);

	const handleCepChange = (value: string) => {
		let formattedCep = value.replace(/\D/g, "");

		if (formattedCep.length > 5) {
			formattedCep = `${formattedCep.substring(0, 5)}-${formattedCep.substring(
				5,
				8,
			)}`;
		}
		setCep(formattedCep);
	};

	const navigateToInfo = () => {
		if (cep.length === 9) {
			setError(false);
			router.push(`/${cep}`);
			setCep("");
		} else setError(true);
	};

	return (
		<Container>
			<ThemedText type="subtitle">Digite o CEP</ThemedText>
			<View>
				<TextInput
					style={[styles.input, { color: Colors[colorScheme ?? "light"].text }]}
					underlineColorAndroid={Colors[colorScheme ?? "light"].tint}
					maxLength={9}
					keyboardType="number-pad"
					value={cep}
					onChangeText={handleCepChange}
					placeholder="Ex.: 34343-000"
					placeholderTextColor={Colors[colorScheme ?? "light"].text}
				/>
				{error && (
					<ThemedText type="error">Por favor, digite um CEP válido,</ThemedText>
				)}
			</View>

			<Button
				onPress={navigateToInfo}
				color={Colors[colorScheme ?? "light"].tint}
				title="Consultar CEP"
				accessibilityLabel="Consultar CEP"
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderEndWidth: 1,
		borderRadius: 6,
		padding: 8,
	},
});
