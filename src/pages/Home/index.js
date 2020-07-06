import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.styl';

const Home = () => {
    return(
        <>
        <div id="home">
            <div id="bg-home">
                <div className="overlay"></div>
                <div className="image"></div>
                <div className="content">
                    <h1>Motoristas Brasileiros</h1>
                    <p>Nosso sistema permite o cadastro de motoristas de todo o Brasil.</p>
                    <Button color="primary"><Link to={`/register`}>Cadastrar Motorista</Link></Button>                
                </div>
            </div>
        </div>
        </>
    )
};

export default Home;