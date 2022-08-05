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

ReactDOM.render(
    <Suspense fallback="Loading...">
        <Menubar />
        <BrowserRouter>
            <Routes>
                {/* NOT GUARDED */}
                <Route path="registration" element={<Registration />} />

                {/* GUARDED */}
                <Route path="" element={<Guard><Index /></Guard>} />
                <Route path="measurements" element={<Guard><Measurements /></Guard>} />
                <Route path="ingridients" element={<Guard><Ingridients /></Guard>} />
                <Route path="dishes" element={<Guard><Dishes /></Guard>} />
                <Route path="dishes/:id" element={<Guard><Dish /></Guard>} />
            </Routes>
        </BrowserRouter>
    </Suspense>
    ,
    document.getElementById('root')
);
