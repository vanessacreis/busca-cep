import type { PropsWithChildren } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";

export function Container({
	children,
	style,
}: { style?: StyleProp<ViewStyle> } & PropsWithChildren) {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.content}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: "hidden",
		alignItems: "center",
	},
	content: {
		width: "90%",
		padding: 6,
		gap: 30,
		justifyContent: "space-between",
		marginVertical: 24,
	},
});
