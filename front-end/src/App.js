import React from 'react';
import { Routes } from './Routes';
import { styles } from './App.style';

export function App() {
    return (
        <div css={styles.pageContainer}>
            <Routes />
        </div>
    );
}
