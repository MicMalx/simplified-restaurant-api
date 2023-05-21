const getMeals = async (req, res, next) => {
    const meals = [
        {
            description: "lazur cheese, stuffed mushroom, potato pancake, port sauce, pepper, zucchini, onion",
            name: "Beef Steak",
            price: 18,
            type: "mainCourse",
        },
        {
            description: "prawns, Cod sirloin, clams",
            name: "Bouillabaisse",
            price: 9,
            type: "soups",
        },
        {
            description: "fries, cucumber salad",
            name: "Chicken Breast Nuggets",
            price: 7.5,
            type: "kidsMenu",
        },
        {
            description: "pasta, carrot, parsley",
            name: "Chicken Soup",
            price: 5.5,
            type: "soups",
        },
        {
            description: "passion fruit mousse, forest fruits, raspberries, chocolate ground",
            name: "Meringue with Mascarpone Cream",
            price: 7,
            type: "desserts",
        },
        {
            description: "ice cream, whipped cream, mascarpone",
            name: "Pancakes with Apples and Mascarpone",
            price: 9,
            type: "desserts",
        },
        {
            description: "croutons with basil pesto",
            name: "Pepper tomato Cream",
            price: 6.5,
            type: "soups",
        },
        {
            description: "potato pancake, broccoli, bacon, chanterelle sauce, onion in tempura, carrots",
            name: "Pork Tenderloin",
            price: 15,
            type: "mainCourse",
        },
        {
            description: "beef, tomato, basil",
            name: "Spaghetti Bolognese",
            price: 8,
            type: "kidsMenu",
        },
        {
            description: "ice cream, nut meringue",
            name: "White Chocolate Mousse Covered with Hot Forest Fruits",
            price: 7,
            type: "desserts",
        },
    ]
    res.json({ meals: meals });
};

exports.getMeals = getMeals;