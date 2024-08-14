import { View, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/src/components/ThemedText";
import { Container } from "@/src/components/Container";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { useStorage } from "@/src/hooks/useStorage";

const InfoScreen = () => {
	const { cep } = useLocalSearchParams();
	const { getValue, saveValue } = useStorage();

	const { error, data, isLoading } = useQuery({
		queryKey: ["repoData"],
		queryFn: async () => {
			const saveLog = await getValue("save-log");
			const cachedCep = await getValue(cep.toString());

			if (cachedCep) {
				if (saveLog) {
					mutate({ data: JSON.stringify(cachedCep) });
				}
				return cachedCep;
			}
			const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
			const value = await res.json();
			if (value.erro) {
				throw value.erro;
			}
			if (saveLog) {
				mutate({ data: JSON.stringify(value) });
			}
			await saveValue(cep.toString(), value);
			return value;
		},
	});

	const {
		mutate,
		error: discordError,
		isSuccess,
	} = useMutation({
		mutationFn: async ({ data }: { data: string }) => {
			await fetch(
				`https://discord.com/api/webhooks/${process.env.WEBHOOK_ID}/${process.env.WEBHOOK_TOKEN}`,
				{
					method: "POST",
					body: `{ content: ${data} }`,
				},
			);
		},
	});

	if (discordError) {
		Alert.alert("Erro", "Ocorreu um erro ao enviar log para o Discord.");
	}
	if (isSuccess) {
		Alert.alert("Log enviado", "Informações enviadas para o Discord.");
	}

	return (
		<Container
			style={{
				justifyContent: isLoading ? "center" : "flex-start",
			}}
		>
			{isLoading && <ActivityIndicator size="large" color="#ffe600" />}
			{error && (
				<View style={styles.errorMessage}>
					<Ionicons size={28} name="close-circle-outline" color="#FF0000" />
					<ThemedText type="defaultSemiBold">
						Ops... Cep não encontrado.
					</ThemedText>
				</View>
			)}
			{data && (
				<View style={styles.address}>
					<View>
						<ThemedText type="defaultSemiBold">CEP:</ThemedText>
						<ThemedText type="default">{data.cep}</ThemedText>
					</View>
					<View>
						<ThemedText type="defaultSemiBold">Logradouro:</ThemedText>
						<ThemedText type="default">{data.localidade}</ThemedText>
					</View>
					<View>
						<ThemedText type="defaultSemiBold">Bairro:</ThemedText>
						<ThemedText type="default">{data.bairro}</ThemedText>
					</View>
					<View>
						<ThemedText type="defaultSemiBold">Cidade:</ThemedText>
						<ThemedText type="default">{data.localidade}</ThemedText>
					</View>
					<View>
						<ThemedText type="defaultSemiBold">UF:</ThemedText>
						<ThemedText type="default">{data.uf}</ThemedText>
					</View>
					<View>
						<ThemedText type="defaultSemiBold">Cod IBGE:</ThemedText>
						<ThemedText type="default">{data.ibge}</ThemedText>
					</View>
				</View>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	errorMessage: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 8,
	},
	address: {
		gap: 14,
	},
});

export default InfoScreen;
