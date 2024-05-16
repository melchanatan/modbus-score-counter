import React, { useEffect, useState } from 'react'
import '../index.css';

const boardSize = 2
const tileSize = 100
const backendPort = 3001;

const MoleBoard = () => {
    var maxActiveMoles = 3;
    const [activeMoles, setActiveMoles] = useState([]);
    const [tilesArray, setTilesArray] = useState([1, 2, 3, 4])
    const [highscore, setHighscore] = useState(0);

    function getRandomInt() {
        return Math.floor(Math.random() * boardSize ** 2);
    }

    const addActiveMoles = (moleNumber) => {
        const buffer = activeMoles
        if (activeMoles.length > maxActiveMoles) {
            buffer.shift()
            buffer.pop()
        }
        buffer.push(moleNumber)
        setActiveMoles(buffer)
        setTilesArray([1, 2, 3, 4])
    }

    const removeActiveMoles = (moleNumber) => {
        const index = activeMoles.indexOf(moleNumber);
        if (index > -1) { // only splice array when item is found
            activeMoles.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    const hitMole = (moleNumber) => {
        if (activeMoles.includes(moleNumber)) {
            removeActiveMoles(moleNumber)
            setTilesArray([1, 2, 3, 4])
            setHighscore(prev => prev + 1)
        }
    }

    useEffect(() => {
        const moleSpawnerInterval = setInterval(() => {
            if (activeMoles.length < maxActiveMoles / 2) {
                addActiveMoles(getRandomInt())
            }
            addActiveMoles(getRandomInt())
        }, 700);
        
        return () => clearInterval(moleSpawnerInterval);
    }, [activeMoles])

    const readButtonInput = async () => {
        const response = await fetch(`http://localhost:${backendPort}/read`)
        const data = await response.json();

        const buttonPressed = data.message
        buttonPressed.forEach(index => {
            hitMole(index+1);
        });
    }

    useEffect(() => {
        const readInputInterval = setInterval(() => {
            readButtonInput();
        }, 100);
        
        return () => clearInterval(readInputInterval);
    }, [])
    return (
        <>
            <p>High score</p>
            <label>{highscore}</label>
            <button onClick={() => hitMole(10)}> hit</button>
            <div className='relative grid'
                style={{
                    gridTemplateColumns: `repeat(${boardSize*2}, 1fr)`,
                }}
            >
                {
                    tilesArray.map(index => {
                        console.log(activeMoles.includes(index))
                        return <MoleTile active={activeMoles.includes(index)} text={index} />
                    })
                }
            </div>
        </>
    )
}

const MoleTile = ({ active, text }) => {
    return (
        <div className="bg-green-600 border-4 border-green-800"
            style={{
                width: tileSize,
                height: tileSize
            }}
        >
            {active &&
                <div>{text}</div>
            }
        </div>
    )
}
export default MoleBoard