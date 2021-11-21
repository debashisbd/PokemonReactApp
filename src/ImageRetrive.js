import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { ProgressBar } from 'react-bootstrap';

function ImageRetrive(props) {

    //Getting individual Pokemon data and image without looping.
    const [pokemonWeight, setPokemonWeight] = useState([]);
    const [pokemonObject, setPokemonObject] = useState([]);
    const [pokemonType, setPokemonType] = useState([]);
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
    const pokemonParam = props.id;
    useEffect(() => {
        axios.get(baseURL+pokemonParam)
        .then(res => {
            setPokemonObject(res.data.sprites.front_default);
            setPokemonType(res.data.types[0].type.name);
            setPokemonWeight(res.data.weight);
        })
    }, [])

    return (
        <div>
            <div className="container-lg">
                <img src={pokemonObject} className="img-fluid rounded-start" alt="Pokemoon Image"/>
                <p>Type : {pokemonType}</p>
                <ProgressBar variant="success" now={pokemonWeight} />
            </div>
        </div>
    )
}

export default ImageRetrive;
