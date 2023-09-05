"use client";
import styles from "./kitchen.module.css";
import Menu from "@/components/menu/Menu";
import Header from "@/components/header/Header";
import ProductList from "@/features/productList/ProductList";
import { useContext, useState } from "react";
import ProductDetails from "@/features/productDetails/productDetails";
import CreateProduct from "@/features/createProduct/createProduct";
import InputList from "@/features/inputList/InputList";
import CreateInput from "@/features/createInput/InputList";
import { FEATURES, FeatureViewContext } from "@/contexts/FeaturesViewContext";
import Management from "@/features/management/Management";

export default function Kitchen() {
  const { currentPage } = useContext(FeatureViewContext)

  const FeatureView = () => {
    switch (currentPage) {
      case FEATURES.PRODUCT_LIST:
        return <ProductList />;
      case FEATURES.PRODUCT_LIST_DETAILS:
        return <ProductDetails />;
      case FEATURES.INPUT_LIST:
        return <InputList />;
      case FEATURES.CREATE_INPUT:
        return <CreateInput />;
      case FEATURES.CREATE_PRODUCT:
        return <CreateProduct />;
      case FEATURES.MANAGEMENT:
        return <Management />
      default:
        return <ProductList />; // Ou retorne algum componente de erro, se desejar
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <Menu />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.headerView}>
          <Header />
        </div>

        <div className={styles.mainView}>
          <FeatureView />
        </div>
      </div>
    </div>
  );
}
