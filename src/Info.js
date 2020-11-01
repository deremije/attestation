const Info = ({ showInfo, info, setShowInfo }) => {
    return (
        <div className="modal">
            <h1>{showInfo}</h1>
            <p>
                Je certifie que mon déplacement est lié au motif suivant (cocher la case) autorisé par le décret n°2020-1310 du 29 octobre 2020 prescrivant les mesures générales nécessaires pour faire face à l'épidémie de Covid19 dans le cadre de l'état d'urgence sanitaire :
            </p>
            <p className='uniqueInfo'>{info[showInfo]}</p>
            <button type="button" onClick={() => setShowInfo("")}>Back</button> 
        </div>
    )
}

export default Info