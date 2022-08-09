import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@emotion/react";

import GlobalStyle from "src/theme/GlobalStyles";
import { theme } from "src/theme";

import Header from "src/components/UI/organisms/Header";
import AppLayout from "src/components/UI/template/AppLayout";

import { requestGetCategories } from "src/apis/category";

import { ICategory, ICategoryRes } from "src/types/category";
import MenuList from "./components/UI/organisms/MenuList";
import MainContent from "./components/UI/organisms/MainContent";

function App() {
  const [selected, setSelected] = useState<ICategory | null>(null);
  const [categories, setCategory] = useState<ICategoryRes[]>([]);
  const selectedMenus = useMemo(() => {
    const category = categories.find((category) => category.name === selected?.name);

    if (!category) return [];

    return category.menus;
  }, [selected, categories]);

  const getCategories = useCallback(async () => {
    const data = await requestGetCategories();
    const category = data?.[0];

    if (!category) return;

    setCategory(data);
    setSelected({ id: category.id, name: category.name });
  }, []);

  const onSelectCategory = useCallback((category: ICategory) => {
    setSelected(category);
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <AppLayout>
        <Header selected={selected} categories={categories} onSelectCategory={onSelectCategory} />
        <MainContent>
          <MenuList menus={selectedMenus} />
        </MainContent>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
