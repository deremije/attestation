const ExecuteButtons = ({ buttons, english, attemptPDF, setShowInfo }) => {
    return (
        <div className='execute-buttons'>
            {buttons.map(b => 
                <button>
                    <div onClick={() => attemptPDF(b.reason)}>
                        {b.emoji}
                    </div>
                    <div onClick={() => attemptPDF(b.reason)}>
                        {english ? b.english : b.french}
                    </div>
                    <div>
                        <div className='info' onClick={() => setShowInfo(b.french)}>i</div>
                    </div>
                </button>
            )}
        </div>
    )
}

export default ExecuteButtons