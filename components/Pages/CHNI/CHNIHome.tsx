import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ListHeader } from "@/components/UI/ListHeader";
import { ListTemplate } from "@/components/UI/ListTemplate";
import { GridTemplate } from "@/components/UI/GridTemplate";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { documentsService, machinesService } from "@/api/services";
import { machinesKeys } from "@/hooks/useMachines";

const CHNIHome = () => {
  const [gridType, setGridType] = useState("list");
  const router: any = useRouter();
  const queryClient = useQueryClient();

  // Opportunistically prefetch data when home page loads
  // This ensures data is ready before user even clicks
  useEffect(() => {
    // Prefetch documents
    queryClient.prefetchQuery({
      queryKey: ["documents"],
      queryFn: () => documentsService.getAll(),
      staleTime: 5 * 60 * 1000,
    });

    // Prefetch machines
    queryClient.prefetchQuery({
      queryKey: machinesKeys.all,
      queryFn: () => machinesService.getAll(),
      staleTime: 5 * 60 * 1000,
    });
  }, [queryClient]);

  const CategoriesList = [
    {
      title: "Список документов",
      image: require("../../../assets/trash/list.png"),
      description: "Список ваших маршрутных листов",
      link: "/chni/documents",
    },
    {
      title: "Список машин",
      image: require("../../../assets/trash/knitting-machine.png"),
      description: "Список ваших машин",
      link: `/chni/machines`,
    },
    {
      title: "Сканирование машины",
      image: require("../../../assets/icons/scan.png"),
      description: "Сканирование машины по штрих-коду",
      link: `/chni/machines/machine`,
    },
  ];

  const handleNavigate = async (link: string) => {
    // Prefetch data before navigation to prevent UI freeze
    if (link === "/chni/documents") {
      await queryClient.prefetchQuery({
        queryKey: ["documents"],
        queryFn: () => documentsService.getAll(),
        staleTime: 5 * 60 * 1000,
      });
    } else if (link === "/chni/machines") {
      await queryClient.prefetchQuery({
        queryKey: machinesKeys.all,
        queryFn: () => machinesService.getAll(),
        staleTime: 5 * 60 * 1000,
      });
    }

    router.push(link);
  };

  return (
    <View>
      <View style={styles.header}>
        <ListHeader type={gridType} setType={setGridType} />
      </View>
      {gridType === "list" ? (
        <ListTemplate list={CategoriesList} hanldeClick={handleNavigate} />
      ) : (
        <GridTemplate list={CategoriesList} hanldeClick={handleNavigate} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    marginVertical: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CHNIHome;
