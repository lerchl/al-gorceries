import { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menubar from "./Menubar";
import { Dish } from './routes/dishes/Dish';
import { Dishes } from './routes/dishes/Dishes';
import { Index } from './routes/index/Index';
import { Ingridients } from './routes/ingridients/Ingridients';
import { Measurements } from "./routes/measurements/Measurements";
import { Registration } from './routes/registration/Registration';
import { Guard } from "./security/Guard";
import "./localization/i18n";
import { Seasons } from './routes/seasons/Seasons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

ReactDOM.render(
    <Suspense fallback="Loading...">
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
                    <Route path="ingridients" element={<Guard><Ingridients /></Guard>} />
                    <Route path="measurements" element={<Guard><Measurements /></Guard>} />
                    <Route path="seasons" element={<Guard><Seasons /></Guard>} />
                </Routes>
            </BrowserRouter>
        </LocalizationProvider>
    </Suspense>,
    document.getElementById('root')
);
