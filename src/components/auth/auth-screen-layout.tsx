import { ThemedText } from "@/components/themed-text";
import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AuthScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthScreenLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthScreenLayoutProps) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-auto w-full max-w-sm">
            <View className="mb-8 items-center">
              <ThemedText type="title" style={{ fontSize: 36, lineHeight: 40 }}>
                HoE
              </ThemedText>
              <ThemedText
                type="subtitle"
                style={{ fontSize: 24, lineHeight: 32, marginTop: 4 }}
              >
                {title}
              </ThemedText>
              {subtitle ? (
                <ThemedText
                  type="small"
                  style={{ color: "#64748B", marginTop: 8, textAlign: "center" }}
                >
                  {subtitle}
                </ThemedText>
              ) : null}
            </View>

            <View className="rounded-2xl border border-border bg-card p-6 shadow-sm gap-4">
              {children}
            </View>

            {footer ? <View className="mt-6 items-center">{footer}</View> : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
