

const getHealth = (req, res) => {
    res.json({
        success: true,
        message: "health api is working "
    })
}

export {getHealth} ;