import Product from "./../models/Product.js";
const postProducts = async (req, res) => {

    const { name,
        shortDescription,
        longDescription,
        price,
        currentPrice,
        categories,
        images,
        tags } = req.body


    const mandatoryFeilds = [name, shortDescription, longDescription, price, currentPrice, categories, images, tags]

    for (const fields of mandatoryFeilds) {
        if (!fields) {
            return res.status(400).json({
                success: false,
                message: 'All fields are mandatory'
            })
        }
    }

    try {
        const newProduct = new Product({
            name,
            shortDescription,
            longDescription,
            price,
            currentPrice,
            categories,
            images,
            tags
        })



        const savedProduct = await newProduct.save();

        return res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        })

    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export { postProducts }