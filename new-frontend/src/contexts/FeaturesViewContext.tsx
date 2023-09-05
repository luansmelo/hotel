
"use client";
import * as React from 'react';

export enum FEATURES {
    MANAGEMENT,
    CREATE_PRODUCT,
    PRODUCT_LIST,
    PRODUCT_LIST_DETAILS,
    INPUT_LIST,
    CREATE_INPUT,
}

interface ThemeProviderProps {
    children: React.ReactNode;
}

interface IFeatureViewContext {
    currentPage: FEATURES;
    onChangeFeatureView: (newPage: FEATURES) => void;
}

export const FeatureViewContext = React.createContext<IFeatureViewContext>({});

const FeatureViewProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [currentPage, setCurrentPage] = React.useState(FEATURES.PRODUCT_LIST);

    const onChangeFeatureView = (newPage: FEATURES) => {
      setCurrentPage(newPage);
      return;
    };

    return (
        <FeatureViewContext.Provider value={{ currentPage, onChangeFeatureView }}>
        {children}
        </FeatureViewContext.Provider>
    );
};

export default FeatureViewProvider;