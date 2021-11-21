import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ImageRetrive from './ImageRetrive';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


function DataRetrive() {

    
    const [pokemon, setPokemon] = useState([]);
    const [pokemonfilter, setPokemonfilter] = useState([]);
    const [filterswitch, setFilterswitch]= useState();


    //Getting 150 Pokemon data and render in the UI.
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
        .then(res => {
            setPokemon(res.data.results);
            setFilterswitch(false);
        })
    }, [])

    //Filtering Data and rerender in the UI.
    const baseAPIURL= 'https://pokeapi.co/api/v2/type/';
    const typeArr = ['bug','grass', 'fire','water','electric','normal','poison','ground','psychic','fighting','rock','fairy','ice','dragon','ghost']
    var filteredData= [];
    async function getFilterdata(url){
        setFilterswitch(true);
        const response = await fetch(baseAPIURL+url);
        const data = await response.json();
        filteredData = data.pokemon;
        setPokemon(filteredData);
        setPokemonfilter(filteredData);

    }


    if (filterswitch===false){

    return (
        <div>

            <div className="container-sm">
                <div className="card">
                    <div className="card-header">
                    <button type="button" className="btn btn-outline-danger" style={{ width: '6rem', float: 'left' }}>Select Filter</button>

                            <Form>
                            {typeArr.map(typeName=>(
                                <Card style={{ width: '6rem', float: 'left' }}>
                                <Form.Check 
                                    type="checkbox"
                                    id={typeName}
                                    label={typeName}
                                    value={typeName}
                                    onChange={(e)=>{getFilterdata(e.target.value)}}
                                    />
                                    </Card>
                                    ))}
                            </Form>
                    </div>
                    <div className="card-body">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {pokemon.map(pokemon => (
                                <div className="col" key={pokemon.name}>
                                    <div className="card h-100">
                                        <ImageRetrive id={pokemon.name} />
                                        <div className="card-body">
                                            <h5 data-tip data-for="registerTip" className="card-title">{pokemon.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )

                            }
    else {
        return (
            <div>
    
                <div className="container-sm">
                    <div className="card">
                        <div className="card-header">
                        <button type="button" className="btn btn-outline-danger" style={{ width: '6rem', float: 'left' }}>Select Filter</button>
    
                                <Form>
                                {typeArr.map(typeName=>(
                                    <Card style={{ width: '6rem', float: 'left' }}>
                                    <Form.Check 
                                        type="checkbox"
                                        id={typeName}
                                        label={typeName}
                                        value={typeName}
                                        onChange={(e)=>{getFilterdata(e.target.value)}}
                                        />
                                        </Card>
                                        ))}
                                </Form>
                        </div>
                        <div className="card-body">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                        {pokemonfilter.map(pok => (
                                <div className="col" key={pok.pokemon.name}>
                                    <div className="card h-100">
                                        <ImageRetrive id={pok.pokemon.name} />
                                        <div className="card-body">
                                            <h5 data-tip data-for="registerTip" className="card-title">{pok.pokemon.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        ) }
}

export default DataRetrive;