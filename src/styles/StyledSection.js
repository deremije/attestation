import styled from 'styled-components'

const StyledSection = styled.section`
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 112px);
    padding-bottom: 0px;
    background-color: #eee;
    overflow-y: auto;
    p {
        width: calc(100% - 40px);
        padding: 10px 20px;
        font-size: 16px;
        line-height: 24px;
        text-align: left; 
        font-family: "Montserrat", sans-serif;
        img {
            position: relative;
            vertical-align: middle;
        }
    }
    .indent {
        padding: 0px 30px;
        width: calc(100% - 60px);
        margin-top: -10px;
        text-align: center;
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
            input[type="text"],
            input[type="number"] {
                display: block;
                width: calc(100% - 10px);
                padding: 0 5px;
                margin-top: 2px;
                margin-left: -2px;
                height: 28px;
                border-color: #BBB;
                font-size: 18px;
                font-family: 'Merriweather', sans-serif;
                position: relative;
            }
            .error {
                background-color: lightpink;
                border-color: red;
            }
        }
    }
`

export default StyledSection