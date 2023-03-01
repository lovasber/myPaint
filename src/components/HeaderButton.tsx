import React from 'react';
import styled from 'styled-components';

const HeaderButton = (prop: {
    label: string | undefined;
    imgPath: string | undefined; 
    handler: React.MouseEventHandler<HTMLButtonElement> | undefined; 
}) => {

    const ButtonContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        margin: 0 auto;
        height: 30px;
    `;

    const imageStyle = {
        width: '30px',
        height: '30px',
    }

    return (
        <ButtonContainer>
            <button onClick={prop.handler} title={prop.label}>
                <img src={prop.imgPath} style={imageStyle}/>
            </button>
        </ButtonContainer>
    )
}

export default HeaderButton;