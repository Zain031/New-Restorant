const {
    Op,
    Model,
    where
} = require("sequelize")
const {
    Product,
    Category
} = require("../models")




class productController {
    static async getAll(req, res, next) {
        try {
            const data = await Product.findAll({
                include: {
                    model: Category
                }
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);

        }
    }
    static async getProductById(req, res, next) {
        try {
            let {
                id
            } = req.params

            let data = await Product.findOne({
                where: {
                    id: id
                },
                include: {
                    model: Category
                }

            })
            if (!data) throw {
                name: "Noi Found"
            }
           
            res.status(200).json(data)

        } catch (error) {
            next(error)

        }
    }
    static async getProductByCateoryId(req, res, next) {
        try {
            const data = await Product.findAll({
                where: {
                    categoryId: req.params.id
                },
                include: {
                    model: Category
                }
            })

if (data != []) {
    
    res.status(200).json(data)
}else(
    res.status(200).json("Product not found")
)

        } catch (error) {

        }
    }




    static async search(req, res, next) {
        try {
            const {
                search
            } = req.query

            const data = await Product.findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${search}%`
                    }
                },include: {
                    model: Category
                }

            })
      
            res.status(200).json({
                data
            })
        } catch (error) {
            next(error)

        }
    }

}

module.exports = productController