import React from "react";
import { BackButton } from "@/components/UI/BackButton";
import DocumentCreateForm from "./Form";
import HeaderUI from "@/components/UI/Header";
import { ThemedView } from "@/components/ThemedView";

const DocumentCreateScreen = () => {
  return (
    <ThemedView>
      <HeaderUI place="Создание документ" extra={<BackButton link="home" />} />
      <DocumentCreateForm />
    </ThemedView>
  );
};

export default DocumentCreateScreen;
