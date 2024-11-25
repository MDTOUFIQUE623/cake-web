import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image"
            });
        }

        const image_filename = req.file.filename;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.status(201).json({
            success: true,
            message: "Food Added Successfully"
        });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({
            success: false,
            message: "Error adding food item"
        });
    }
}

// list all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({
            success: true,
            data: foods,
            message: "Foods fetched successfully"
        });
    } catch (error) {
        console.error("Error listing foods:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching food items"
        });
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const { id } = req.body;
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        // Delete the image file if it exists
        if (food.image) {
            const imagePath = `uploads/${food.image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await foodModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Food item deleted successfully"
        });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({
            success: false,
            message: "Error deleting food item"
        });
    }
}

export { addFood, listFood, removeFood }