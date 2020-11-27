import styled from 'styled-components'
import { useState } from 'react'
import { frequentlyAskedQuestions } from './content'

const StyledFAQ = styled.section`
    padding-top: 8px;
    padding-bottom: 40px;
    background-color: #fff;
    margin-top: 20px;
`
const StyledQA = styled.div`
    border-bottom: solid 1px #EDEDED;
    width: calc(100% - 60px);
    margin: auto;
    padding: 10px 0;
    h5 {
        text-align: left;
        width: 100%;
        margin: 10px auto;
        /* padding: 10px; */
        color: #3c70e0;
        text-decoration: underline;
        cursor: pointer;
        font-size: 18px;
    }
    div {
        width: calc(100% - 20px);
        padding: 0px 20px 10px 0px;
        font-size: 16px;
        line-height: 24px;
        text-align: left;
    }
`


const FAQ = ({language}) => {
    const [faq, setFaq] = useState([...frequentlyAskedQuestions])
    const toggleFaq = (entry) => {
        let newFaq = [...faq]
        for (let en of newFaq) {
            if (JSON.stringify(en) === entry) en.visible = !en.visible
        }
        setFaq(newFaq)
    }
    return (
        <StyledFAQ>
            {faq.map(entry => 
                <StyledQA key={JSON.stringify(entry)}> 
                    <h5 onClick={() => toggleFaq(JSON.stringify(entry))}>
                        {entry[language].q}
                    </h5> 
                {entry.visible ? 
                    <div>
                        {entry[language].a()}
                    </div> : ""}
                </StyledQA>
            )}
        </StyledFAQ>
    )
}

export default FAQ