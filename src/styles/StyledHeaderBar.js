import styled from 'styled-components'

const StyledHeaderBar = styled.div`
    width: calc(100% - 40px);
    padding: 0 20px;
    height: 40px;
    background-color: transparent;
    color: #3c70e0;
    font-size: 14px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-family: 'Montserrat', sans-serif;
    cursor: pointer;
    h1 {
        margin: 0;
        padding: 0;
        width: calc(100% - 96px);
    }
        
`
export default StyledHeaderBar