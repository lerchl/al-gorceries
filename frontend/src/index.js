import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { React, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from './Footer';
import Menubar from "./Menubar";
import "./localization/i18n";
import { Dish } from './routes/dishes/Dish';
import { Dishes } from './routes/dishes/Dishes';
import { Household } from './routes/household/Household';
import { Index } from './routes/index/Index';
import { Ingredients } from './routes/ingredients/Ingredients';
import { Measurements } from "./routes/measurements/Measurements";
import { Registration } from './routes/registration/Registration';
import { Seasons } from './routes/seasons/Seasons';
import { Guard } from "./security/Guard";

ReactDOM.render(
    <Suspense fallback="">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Menubar />
            <BrowserRouter>
                <Routes>
                    {/* NOT GUARDED */}
                    <Route path="registration" element={<Registration />} />

                    {/* GUARDED */}
                    <Route path="" element={<Guard><Index /></Guard>} />
                    <Route path="dishes" element={<Guard><Dishes /></Guard>} />
                    <Route path="dishes/:id" element={<Guard><Dish /></Guard>} />
                    <Route path="ingredients" element={<Guard><Ingredients /></Guard>} />
                    <Route path="measurements" element={<Guard><Measurements /></Guard>} />
                    <Route path="seasons" element={<Guard><Seasons /></Guard>} />
                    <Route path="household" element={<Guard><Household /></Guard>} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </LocalizationProvider>
    </Suspense>,
    document.getElementById('root')
);
