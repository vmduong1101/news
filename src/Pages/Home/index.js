import React from "react";
import Navigation from "../../Components/Navigation";
import Container from "../../Components/Container";
import Cart from "../Cart";
import { Routes, Route } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <Navigation />
            <Container />
        </div>
    )
}
export default Home