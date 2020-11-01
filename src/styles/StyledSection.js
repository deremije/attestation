import styled from 'styled-components'

const StyledSection = styled.section`
    position: absolute;
    top: 40px;
    left: 0px;
    width: 100%;
    height: calc(100% - 72px);
    padding-bottom: 20px;
    background-color: #eee;
    overflow-y: auto;
    p {
        width: calc(100% - 20px);
        padding: 0px 10px;
        font-size: 14px;
        text-align: left; 
        img {
            position: relative;
            vertical-align: middle;
        }
    }
    form {
        width: calc(100% - 60px);
        margin: auto;
        label {
            display: block;
            margin: 10px auto 5px;
            text-align: left;
            font-size: 14px;
            font-family: 'Montserrat', sans-serif;
            input[type="text"] {
                display: block;
                width: calc(100% - 10px);
                padding: 0 5px;
                margin-top: 2px;
                height: 28px;
                border-color: #BBB;
                font-size: 18px;
                font-family: 'Merriweather', sans-serif;
            }
        }
    }
`

export default StyledSection