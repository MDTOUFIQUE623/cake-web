import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Birthday Cakes",
        menu_image: menu_1
    },
    {
        menu_name: "Wedding Cakes",
        menu_image: menu_2
    },
    {
        menu_name: "Cupcakes",
        menu_image: menu_3
    },
    {
        menu_name: "Designer Cakes",
        menu_image: menu_4
    },
    {
        menu_name: "Cheesecakes",
        menu_image: menu_5
    },
    {
        menu_name: "Vegan Cakes",
        menu_image: menu_6
    },
    {
        menu_name: "Pastries",
        menu_image: menu_7
    },
    {
        menu_name: "Seasonal Cakes",
        menu_image: menu_8
    }]

const importImage = (imagePath) => {
    try {
        return require(imagePath);
    } catch (error) {
        console.warn(`Failed to load image: ${imagePath}`);
        return ''; // Return empty string or a default image path
    }
}

export const food_list = [
    {
        _id: "1",
        name: "Chocolate Layer Cake",
        image: food_1,
        price: 45,
        description: "Rich chocolate layers with smooth ganache and chocolate shavings",
        category: "Birthday Cakes"
    },
    {
        _id: "2",
        name: "Vanilla Birthday Cake",
        image: food_2,
        price: 40,
        description: "Classic vanilla cake with rainbow sprinkles and buttercream",
        category: "Birthday Cakes"
    },
    {
        _id: "3",
        name: "Three-Tier Wedding Cake",
        image: food_3,
        price: 299,
        description: "Elegant white fondant cake with edible pearls and flowers",
        category: "Wedding Cakes"
    },
    {
        _id: "4",
        name: "Rustic Wedding Cake",
        image: food_4,
        price: 250,
        description: "Naked cake with fresh berries and floral decorations",
        category: "Wedding Cakes"
    },
    {
        _id: "5",
        name: "Red Velvet Cupcakes",
        image: food_5,
        price: 24,
        description: "Classic red velvet with cream cheese frosting, box of 12",
        category: "Cupcakes"
    },
    {
        _id: "6",
        name: "Chocolate Cupcakes",
        image: food_6,
        price: 22,
        description: "Rich chocolate cupcakes with chocolate buttercream, box of 12",
        category: "Cupcakes"
    },
    {
        _id: "7",
        name: "Unicorn Cake",
        image: food_7,
        price: 65,
        description: "Magical rainbow cake with unicorn decorations and gold accents",
        category: "Designer Cakes"
    },
    {
        _id: "8",
        name: "Spider-Man Cake",
        image: food_8,
        price: 60,
        description: "Superhero themed cake with web designs and fondant decorations",
        category: "Designer Cakes"
    },
    {
        _id: "9",
        name: "Classic Cheesecake",
        image: food_9,
        price: 40,
        description: "New York style cheesecake with graham cracker crust",
        category: "Cheesecakes"
    },
    {
        _id: "10",
        name: "Strawberry Cheesecake",
        image: food_10,
        price: 45,
        description: "Creamy cheesecake topped with fresh strawberry compote",
        category: "Cheesecakes"
    },
    {
        _id: "11",
        name: "Vegan Chocolate Cake",
        image: food_11,
        price: 48,
        description: "Plant-based chocolate cake with dairy-free frosting",
        category: "Vegan Cakes"
    },
    {
        _id: "12",
        name: "Vegan Carrot Cake",
        image: food_12,
        price: 46,
        description: "Moist carrot cake with vegan cream cheese frosting",
        category: "Vegan Cakes"
    },
    {
        _id: "13",
        name: "Fruit Danish",
        image: food_13,
        price: 4,
        description: "Flaky pastry filled with seasonal fruits and vanilla custard",
        category: "Pastries"
    },
    {
        _id: "14",
        name: "Chocolate Croissant",
        image: food_14,
        price: 4,
        description: "Buttery croissant filled with dark chocolate",
        category: "Pastries"
    },
    {
        _id: "15",
        name: "Pumpkin Spice Cake",
        image: food_15,
        price: 42,
        description: "Fall favorite with cream cheese frosting and caramel drizzle",
        category: "Seasonal Cakes"
    },
    {
        _id: "16",
        name: "Christmas Fruit Cake",
        image: food_16,
        price: 38,
        description: "Traditional fruit cake with festive decorations",
        category: "Seasonal Cakes"
    },
    {
        _id: "17",
        name: "Black Forest Cake",
        image: food_17,
        price: 50,
        description: "Chocolate layers with cherries and whipped cream",
        category: "Birthday Cakes"
    },
    {
        _id: "18",
        name: "Lemon Drizzle Cake",
        image: food_18,
        price: 35,
        description: "Light lemon cake with citrus glaze",
        category: "Birthday Cakes"
    },
    {
        _id: "19",
        name: "Tiramisu Cake",
        image: food_19,
        price: 48,
        description: "Coffee-soaked layers with mascarpone cream",
        category: "Designer Cakes"
    },
    {
        _id: "20",
        name: "Opera Cake",
        image: food_20,
        price: 52,
        description: "French almond sponge cake with coffee and chocolate",
        category: "Designer Cakes"
    },
    {
        _id: "21",
        name: "Oreo Cheesecake",
        image: food_21,
        price: 46,
        description: "Creamy cheesecake loaded with Oreo cookies",
        category: "Cheesecakes"
    },
    {
        _id: "22",
        name: "Blueberry Cheesecake",
        image: food_22,
        price: 44,
        description: "Classic cheesecake with blueberry topping",
        category: "Cheesecakes"
    },
    {
        _id: "23",
        name: "Vegan Red Velvet",
        image: food_23,
        price: 49,
        description: "Plant-based red velvet with vegan cream cheese frosting",
        category: "Vegan Cakes"
    },
    {
        _id: "24",
        name: "Vegan Fruit Cake",
        image: food_24,
        price: 45,
        description: "Dairy-free fruit cake with natural sweeteners",
        category: "Vegan Cakes"
    },
    {
        _id: "25",
        name: "Éclair",
        image: food_25,
        price: 5,
        description: "Choux pastry filled with cream and topped with chocolate",
        category: "Pastries"
    },
    {
        _id: "26",
        name: "Mille-feuille",
        image: food_26,
        price: 6,
        description: "Layered puff pastry with vanilla cream",
        category: "Pastries"
    },
    {
        _id: "27",
        name: "Easter Bunny Cake",
        image: food_27,
        price: 55,
        description: "Festive spring cake with bunny decorations",
        category: "Seasonal Cakes"
    },
    {
        _id: "28",
        name: "Valentine's Heart Cake",
        image: food_28,
        price: 58,
        description: "Heart-shaped cake with romantic decorations",
        category: "Seasonal Cakes"
    },
    {
        _id: "29",
        name: "Rainbow Cake",
        image: food_29,
        price: 60,
        description: "Six colorful layers with vanilla buttercream",
        category: "Birthday Cakes"
    },
    {
        _id: "30",
        name: "Marble Cake",
        image: food_30,
        price: 40,
        description: "Swirled vanilla and chocolate cake with ganache",
        category: "Birthday Cakes"
    },
    {
        _id: "31",
        name: "Nutella Cake",
        image: food_31,
        price: 54,
        description: "Hazelnut chocolate cake with Nutella frosting",
        category: "Designer Cakes"
    },
    {
        _id: "32",
        name: "Mirror Glaze Cake",
        image: food_32,
        price: 62,
        description: "Stunning mirror glaze cake with modern design",
        category: "Designer Cakes"
    }
]

export default {
    assets,
    menu_list,
    food_list
};
