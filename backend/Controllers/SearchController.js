// controllers/searchController.js
import Product from '../Models/productModel.js';

// Handle search query
const searchProducts = async (req, res) => {
    try {
        const { query } = req.query; // Access query from URL params
        
        // Perform search: Match name or description
        const results = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive
                { description: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error processing search', error });
    }
};

export default { searchProducts };
