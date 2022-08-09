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
  const [selectedCategory, setSelected] = useState<ICategory | null>(null);
  const [categories, setCategory] = useState<ICategoryRes[]>([]);
  const [pageAction, setPageAction] = useState<string | null>(null);

  const selectedMenus = useMemo(() => {
    const category = categories.find((category) => category.name === selectedCategory?.name);

    if (!category) return [];

    return category.menus;
  }, [selectedCategory, categories]);

  const getCategories = useCallback(async () => {
    const data = await requestGetCategories();
    const category = data?.[0];

    if (!category) return;

    setCategory(data);
    setSelected({ id: category.id, name: category.name });
  }, []);

  const onSelectCategory = useCallback(
    (category: ICategory) => {
      const prevCategory = selectedCategory;

      if (prevCategory && category.id > prevCategory.id) {
        setPageAction("next");
      }
      if (prevCategory && category.id < prevCategory.id) {
        setPageAction("prev");
      }

      setSelected({ id: category.id, name: category.name });
    },
    [selectedCategory],
  );

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <AppLayout>
        {categories && (
          <Header
            selectedCategory={selectedCategory}
            categories={categories}
            onSelectCategory={onSelectCategory}
          />
        )}
        <MainContent pageAction={pageAction}>
          <MenuList menus={selectedMenus} />
        </MainContent>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
