import React from 'react';
import styled from 'styled-components';

import HeaderButton from './HeaderButton';
import save from '../assets/save-60.png';
import line from '../assets/line-50.png';
import pencil from '../assets/pencil-50.png';
import drag from '../assets/drag-50.png';
import rectangle from '../assets/rectangular-48.png';
import { handleSaveButtonClick,
         handleSelectButtonClick, 
         handleFreeHandButtonClick 
} from '../controller';

type prop = {
    setShapeName: (shapeName:string)=>void
}

const Header = ({ setShapeName }: prop) => {

    const handleLineButtonClick = () => {
        setShapeName("line")
    }

    const handleRectangleButtonClick = () => {
        setShapeName("rectangle")
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
                handler={handleSaveButtonClick}/>
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
            <HeaderButton 
                label="Freehand"
                imgPath={pencil}
                handler={handleFreeHandButtonClick}/>
        </HeaderContainer>
    )
}

export default Header;