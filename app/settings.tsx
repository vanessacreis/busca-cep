import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { RadioButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { Container } from "@/src/components/Container";
import { useStorage } from "@/src/hooks/useStorage";

export default function SettingsScreen() {
	const { saveValue, getValue } = useStorage();
	const [value, setValue] = useState("true");

	useEffect(() => {
		const loadSetting = async () => {
			const storedValue = await getValue("save-log");
			if (storedValue !== null) {
				setValue(String(storedValue));
			}
		};

		loadSetting();
	}, [getValue]);

	return (
		<Container>
			<ThemedText type="default">
				Enviar logs das requisições para o Discord?
			</ThemedText>
			<View style={styles.radioGroup}>
				<View style={styles.button}>
					<RadioButton
						color="#0a7ea4"
						value="true"
						status={value === "true" ? "checked" : "unchecked"}
						onPress={() => {
							setValue("true");
							saveValue("save-log", "true");
						}}
					/>
					<ThemedText type="default">Sim</ThemedText>
				</View>
				<View style={styles.button}>
					<RadioButton
						color="#0a7ea4"
						value="false"
						status={value === "false" ? "checked" : "unchecked"}
						onPress={() => {
							setValue("false");
							saveValue("save-log", "false");
						}}
					/>
					<ThemedText type="default">Não</ThemedText>
				</View>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	radioGroup: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
	},
});
