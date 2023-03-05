import React from 'react';
import styled from 'styled-components';

import HeaderButton from './HeaderButton';
import save from '../assets/save-60.png';
import line from '../assets/line-50.png';
import pencil from '../assets/pencil-50.png';
import drag from '../assets/drag-50.png';
import rectangle from '../assets/rectangular-48.png';
import { exportCanvasToPng } from '../controller';


const Header = () => {

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
                handler={exportCanvasToPng}/>
            <HeaderButton 
                label="Line" 
                imgPath={line}
                handler={() => {console.log("Line")}}/>
            <HeaderButton 
                label="Rectangle" 
                imgPath={rectangle}
                handler={() => {console.log("Rectangle")}}/>
            <HeaderButton 
                label="Select" 
                imgPath={drag}
                handler={() => {console.log("Select")}}/>
            <HeaderButton 
                label="Freehand"
                imgPath={pencil}
                handler={() => {console.log("Pencil")}}/>
        </HeaderContainer>
    )
}

export default Header;