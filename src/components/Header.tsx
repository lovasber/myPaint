import React from 'react';
import styled from 'styled-components';

import HeaderButton from './HeaderButton';
import save from '../assets/save-60.png';
import line from '../assets/line-50.png';
import pencil from '../assets/pencil-50.png';
import drag from '../assets/drag-50.png';
import rectangle from '../assets/rectangular-48.png';
import { actionName, shape } from '../interfaces/Enums';


type prop = {
    setToolName: (toolName:string)=>void,
    setCursor: (toolName:string)=>void
}

const Header = ({ setToolName, setCursor }: prop) => {

    const handleLineButtonClick = () => {
        setCursor('default')
        setToolName(shape.LINE)
    }

    const handleRectangleButtonClick = () => {
        setCursor('default')
        setToolName(shape.RECTANGLE)
    }

    const handleSelectButtonClick = () => {
        setCursor('grab')
        setToolName(actionName.SELECTING)
    }

    const HeaderContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 0 20px;
        margin: 0 20%;
        heihgt: 75px;
    `;

    return (
        <HeaderContainer>
            <HeaderButton 
                label="Save" 
                imgPath={save} 
                handler={()=>{}}/>
            <HeaderButton 
                label="Line" 
                imgPath={line}
                handler={handleLineButtonClick}/>
            <HeaderButton 
                label="Rectangle" 
                imgPath={rectangle}
                handler={handleRectangleButtonClick}/>
            <HeaderButton 
                label="Select" 
                imgPath={drag}
                handler={handleSelectButtonClick}/>
        </HeaderContainer>
    )
}

export default Header;