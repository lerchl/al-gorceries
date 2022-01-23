import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Dishes } from './routes/dishes/Dishes';
import Index from './routes/Index';
import { Ingridients } from './routes/ingridients/Ingridients';
import Measurements from './routes/measurements/Measurements';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="" element={<Index />} />
            <Route path="measurements" element={<Measurements />} />
            <Route path="ingridients" element={<Ingridients />} />
            <Route path="dishes" element={<Dishes />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
