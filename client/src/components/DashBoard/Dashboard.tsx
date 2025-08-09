import React, { useEffect, useState } from 'react'
import "./Dashboard.scss";

import { FaSignal, FaRss, FaPlugCircleXmark, FaLocationDot, FaSistrix, FaCircle } from "react-icons/fa6";
import { IconContext } from 'react-icons';

function Dashboard() {

    const [info, setInfo] = useState<React.ReactNode[]>([]);
    const [dataCards, setDataCards] = useState<React.ReactNode[]>([]);
    const [input, setInput] = useState<string>("")

    const infoDisplay = (title: string, value: number, IconComponent: React.ComponentType, iconColor: string) => {

        return (
            <div className='overviewContainer_overview'>
                {title}
                <div className='details'>
                    <span> {value} </span>
                    <div>
                        <IconContext.Provider value={{
                            className: 'chart-icons',
                            color: iconColor
                        }}
                        >
                            <IconComponent />
                        </IconContext.Provider>
                    </div>

                </div>
            </div>
        )

    }

    const SearchComponent = () => {
        return (
            <div className='searchContainer'>
                <div>

                    <IconContext.Provider value={{
                        className: 'chart-icons',
                        color: 'gray'
                    }}
                    >
                        <FaSistrix />
                    </IconContext.Provider>
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        style={{ width: '75%' }}
                        placeholder="Search sensor boxes by name or location"
                    />
                </div>
            </div>
        )
    }

    const dataCard = (sensorName: string, building: string, isOn: boolean, co2: number, pm: number, lastPing: number) => {
        return (
            <div className='dataCardContainer_dataCard'>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{sensorName}</span>
                    <IconContext.Provider value={{
                        className: 'chart-icons',
                        color: isOn ? 'green' : 'red'
                    }}
                    >
                        <FaCircle />
                    </IconContext.Provider>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <IconContext.Provider value={{
                        className: 'chart-icons',
                        color: 'gray'
                    }}
                    >
                        <FaLocationDot />
                    </IconContext.Provider>

                    <span style={{ fontSize: 'small', color: 'gray', width: '85%', paddingLeft: '0.5em' }}>{building}</span>
                </div>

                <div style={{ fontSize: 'small', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'gray' }}>CO2</span>
                        <span style={{ fontWeight: 'bold' }}>{co2}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'gray' }}>PM2.5</span>
                        <span style={{ fontWeight: 'bold' }}>{pm}</span>
                    </div>
                </div>

                <span style={{ color: 'gray', fontSize: 'small' }}>{(lastPing / 1000) / Math.pow(60, 2)}h ago</span>
            </div>
        )
    }

    useEffect(() => {

        /*
            This is for demo purposes. When we hook up the backend, we can 
            alter the data dynamically.
        */
        setInfo([
            infoDisplay('Total Sensors', 4, FaRss, 'blue'),
            infoDisplay('Online', 3, FaSignal, 'green'),
            infoDisplay('Offine', 1, FaPlugCircleXmark, 'red'),
            infoDisplay('Locations', 4, FaLocationDot, 'CornflowerBlue')
        ]);

        /*
            The data cards are similar
        */


        setDataCards([
            dataCard("Pi1049", "Building A - Floor 2", true, 420, 8.5, 2 * 3600000),
            dataCard("Pi1050", "Building A - Floor 3", true, 380, 12.1, 3600000),
            dataCard("Pi1051", "Building A - Floor 1", false, 450, 15.3, 3 * 3600000),
            dataCard("Pi1052", "Building A - Floor 2", true, 395, 7.8, 2 * 3600000),
        ])


    }, [])

    return (
        <div>
            <div style={{ padding: '1em' }}>
                <h1 style={{ fontFamily: 'Courier New, Courier, monospace' }}>Environmental Monitoring Dashboard</h1>
                <span style={{ color: 'gray', fontFamily: 'Courier New, Courier, monospace' }}>Monitor air quality and environmental conditions across all sensor locations</span>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    gap: '1em'
                }}>
                    <div className='overviewContainer'> {info} </div>
                    <SearchComponent />
                    <div className='dataCardContainer'> {dataCards} </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
