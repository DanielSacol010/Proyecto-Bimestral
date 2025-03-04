'use strict'
import Category from "./category.model.js";
import Product from "../product/product.model.js";

export const initializeDefaultCategories = async () => {
    try {
        const defaultCategories = await Category.findOne({name: "Default"});
        if(!defaultCategories){
            const defaultCategory = await Category.create({
                name: "Default",
                description: "Default category"
            })
            const newDefaultCategory = new Category(defaultCategory);
            await newDefaultCategory.save();
            console.log("Default category created successfully");

        }
    } catch (err) {
        console.log("Error initializing default categories", err);
    }
};

initializeDefaultCategories();
export const createCategory = async (req, res) => {
    try {
        const data  = req.body;
        const category = await Category.create(data);
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error creating category",
        });
    }
}

export const getCategories = async (req, res) => {
    try{
        const {limit = 10, desde = 0} = req.query;
        
        const [total, categories] = await Promise.all([
            Category.countDocuments(),
            Category.find()
            .skip(Number(desde))
            .limit(Number(limit))
        ])
        
        res.status(200).json({
            success: true,
            message: "Categories retrieved successfully",
            total,
            categories  
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error getting categories",
        });
    }
}

export const editCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const category = await Category.findByIdAndUpdate(id, data, {new: true});
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error updating category",
        });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        
        const deletedCategory = await Category.findById({_id: id});
        if(!deletedCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        const defaultCategory = await Category.findOne({name: "Default"});
        if(!defaultCategory){
            return res.status(404).json({
                success: false,
                message: "Default category not found",
            });
        }

        await Product.updateMany({category: id}, {category: defaultCategory._id});

        
        await Category.findByIdAndUpdate(id, {status: false});

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting category",
        });
    }
}

