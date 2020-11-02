import styled from 'styled-components'

const StyledSection = styled.section`
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 92px);
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
        p {
            width: calc(100% - 60px);
            height: auto;
            padding: 0px 30px;
            font-size: 14px;
            text-align: center;
            margin-top: -10px;
        }
    }
`

export default StyledSection