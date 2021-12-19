import React, {useState, useEffect} from 'react';
import GameGrid from './GameGrid';
import {FormControl, 
    FormLabel, ToggleButtonGroup, ToggleButton, Button, TextField} from '@mui/material';

import axios from "axios";

const baseUrl = "http://jservice.io/api";
const siteUrl = 'http://localhost:3001';

export default function GameSetup()
{
    const [gameType, setGameType] = useState("");
    const [categoryChoice, setCategoryChoice] = useState("");
    const [inSetup, setInSetup] = useState(true);
    const [inGame, setInGame] = useState(false);
    const [categories, setCategories] = useState([]);
    const [catSearch, setCatSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    //should we set up game stuff/get things from cache/api here or in the grid component itself?

    useEffect(() =>
    {
        async function fun()
        {
            if (categoryChoice === 'random' && inSetup) 
            {
                let cats = await setRandomCategories();
                setCategories(cats);
            }
        }
        fun();
    }, [categoryChoice])
    
    const handleGameTypeChange = (e, newGameType) =>
    {
        setGameType(newGameType);
        //set the game type
        //make the category choice appear
    }

    const handleCategoryChoiceChange = (e) =>
    {
        setCategoryChoice(e.target.value);
        if (e.target.value === 'custom') 
        {
            setCategories([]);
        }
    }

    const handleSearchChange = (e) =>
    {
        setCatSearch(e.target.value);
    }

    const handleFormSubmit = async (e) =>
    {
        setInSetup(false);
        categories.forEach(async ({id, title}) =>
        {
            let questionObjArr = [];
            let values = [200, 400, 600, 800, 1000]
            for (let i = 0; i < 5; i++)
            {
                let questionObj = {}
                const { data } = await axios.get(`${baseUrl}/clues/?category=${id}&value=${values[i]}`);
                if (!data) throw 'UNCAUGHT ERROR';
                
            }
        })
        setInGame(true);
    }

    const setRandomCategories = async () =>
    {
        let returnVal = [];
        while (returnVal.length < 6)
        {
            const { data } = await axios.get(`${baseUrl}/random`);
            returnVal.push({id: data[0].category.id, title: data[0].category.title.toUpperCase()});
        }
        return returnVal;
    }

    const CategoryForm = (props) =>
    {
        return (
            <div>
                <TextField onChange={handleSearchChange}></TextField>
                <Button></Button>
            </div>
        );
    }

    const SearchResultsList = (props) =>
    {

    }

    return(
        <div id="gamePlay">
            {inSetup ?
            <FormControl id="gameSetupForm" component="fieldset">
                <FormLabel>What kind of game are you looking to play?</FormLabel>
                <ToggleButtonGroup exclusive value={gameType} onChange={handleGameTypeChange}>
                    <ToggleButton value="solo">Solo</ToggleButton>
                    <ToggleButton value="friends">With Friends</ToggleButton>
                </ToggleButtonGroup>
                <br/>
                {
                    gameType !== "" ? 
                    <>
                        <FormLabel>What kind of categories would you like to play with?</FormLabel>
                        <ToggleButtonGroup exclusive value={categoryChoice}>
                            <ToggleButton value="random" onClick={handleCategoryChoiceChange}>Random</ToggleButton>
                            <ToggleButton value="custom" onClick={handleCategoryChoiceChange}>Custom</ToggleButton>
                        </ToggleButtonGroup>
                    </> : <></>
                }
                {
                    categoryChoice !== "" && gameType !== "" ? 
                    (categoryChoice === 'custom' ? 
                    <div>
                        <CategoryForm />
                        <SearchResultsList results={searchResults}/>
                    </div> : 
                    <><span>Categories</span><ul>
                        {categories.map((category) => <li key={category.title}>{category.title}</li>)}
                    </ul></>) : <></>
                }

                {categoryChoice !== '' && gameType !== '' && categories.length === 6 || categoryChoice === 'custom' ? <Button type="submit" onClick={handleFormSubmit}>Start Game</Button> : <></>}
            </FormControl>
            : <div></div>
            }
            {inGame ?
            <GameGrid id="grid" categories={categories}></GameGrid> : <div></div>
            }
        </div>    
    );
}