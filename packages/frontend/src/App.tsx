import React, { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";

import GlobalStyle from "src/theme/GlobalStyles";
import { theme } from "src/theme";

import Header from "src/components/UI/organisms/Header";
import AppLayout from "src/components/UI/template/AppLayout";

import { requestGetCategories } from "src/apis/category";
import { requestGetMenusByCategoryId } from "src/apis/menu";

import { ICategory, ICategoryRes } from "src/types/category";
import { IMenusRes } from "src/types/menu";

function App() {
  const [selected, setSelected] = useState("");
  const [menus, setMenus] = useState<IMenusRes[]>([]);
  const [categories, setCategory] = useState<ICategoryRes[]>([]);

  const getCategories = useCallback(async () => {
    const data = await requestGetCategories();

    setCategory(data);
  }, []);

  const getMenus = useCallback(async (category: ICategory) => {
    const data = await requestGetMenusByCategoryId(category.id);

    setSelected(category.name);
    setMenus(data);
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (menus.length || !categories.length) return;

    getMenus(categories[0]);
  }, [categories]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <AppLayout>
        <Header selected={selected} categories={categories} getMenus={getMenus} />
        <div>다른거</div>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
