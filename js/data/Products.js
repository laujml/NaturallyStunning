// Base de datos de productos - Naturally Stunning
// Basado en Totemica Beauty

const productsData = {
    skincare: [
        {
            id: 'sk001',
            name: 'Desmaquillante de Aceite de Arroz',
            category: 'skincare',
            price: 22.00,
            originalPrice: null,
            description: 'Limpiador ligero y vegano que combina aceite de salvado de arroz, beta-glucano y aceite de camelia. Disuelve fácilmente el maquillaje, las impurezas y los puntos negros.',
            benefits: ['Limpieza profunda', 'Vegano', 'Para todo tipo de piel', 'Elimina maquillaje'],
            ingredients: ['Aceite de salvado de arroz', 'Beta-glucano', 'Aceite de camelia'],
            image: 'img/productos/1.png',
            stock: 25,
            featured: true,
            bestSeller: true
        },
        {
            id: 'sk002',
            name: 'Gel Limpiador Antipolución',
            category: 'skincare',
            price: 20.00,
            originalPrice: null,
            description: 'Elimina suavemente las impurezas, el exceso de grasa y los restos de maquillaje. Ideal para uso diario.',
            benefits: ['Limpieza suave', 'Control de grasa', 'Antipolución', 'Uso diario'],
            ingredients: ['Extractos naturales', 'Agentes limpiadores suaves'],
            image: 'img/productos/cleansing-gel.png',
            stock: 30,
            featured: false,
            bestSeller: false
        },
        {
            id: 'sk003',
            name: 'Tónico Facial Refrescante',
            category: 'skincare',
            price: 19.00,
            originalPrice: null,
            description: 'Tónico sin alcohol con ácido hialurónico, extracto de regaliz, aloe vera y agua de rosas. Equilibra, tonifica y prepara la piel.',
            benefits: ['Hidratación profunda', 'Sin alcohol', 'Calma la piel', 'Todo tipo de piel'],
            ingredients: ['Ácido hialurónico', 'Extracto de regaliz', 'Aloe vera', 'Agua de rosas', 'Hamamelis'],
            image: 'img/productos/toner.png',
            stock: 28,
            featured: false,
            bestSeller: false
        },
        {
            id: 'sk004',
            name: 'Sérum Antioxidante',
            category: 'skincare',
            price: 20.00,
            originalPrice: null,
            description: 'Ilumina, restaura y protege tu piel. Formulado con vitamina C, extracto de cacay, té verde y regaliz para combatir el envejecimiento prematuro.',
            benefits: ['Anti-edad', 'Iluminador', 'Protección antioxidante', 'Textura luminosa'],
            ingredients: ['Vitamina C', 'Extracto de cacay', 'Té verde', 'Regaliz'],
            image: 'img/productos/serum.png',
            stock: 22,
            featured: true,
            bestSeller: false
        },
        {
            id: 'sk005',
            name: 'Gel Hidratante Anti-Edad',
            category: 'skincare',
            price: 22.00,
            originalPrice: null,
            description: 'Gel hidratante con niacinamida, ácido hialurónico y péptidos. Nutre, hidrata y suaviza tu piel combatiendo los signos del envejecimiento.',
            benefits: ['Anti-edad', 'Hidratación intensa', 'Firmeza', 'Textura ligera'],
            ingredients: ['Niacinamida', 'Ácido hialurónico', 'Péptidos'],
            image: 'img/productos/moisturizer.png',
            stock: 26,
            featured: false,
            bestSeller: false
        },
        {
            id: 'sk006',
            name: 'Elixir Iluminador con Aceite de Jojoba',
            category: 'skincare',
            price: 20.00,
            originalPrice: null,
            description: 'Elixir ligero de rápida absorción con aceite de jojoba natural. Hidrata profundamente, equilibra y nutre tu piel sin obstruir los poros.',
            benefits: ['Hidratación profunda', 'Rápida absorción', 'Balance natural', 'Todo tipo de piel'],
            ingredients: ['Aceite de jojoba', 'Péptidos', 'Extractos botánicos'],
            image: 'img/productos/jojoba-elixir.png',
            stock: 20,
            featured: true,
            bestSeller: true
        },
        {
            id: 'sk007',
            name: 'Exfoliante Enzimático Facial',
            category: 'skincare',
            price: 18.00,
            originalPrice: null,
            description: 'Polvo exfoliante enzimático con ácido málico, enzima de piña, avena coloidal, niacinamida y caolín. Revela una piel más suave y radiante.',
            benefits: ['Exfoliación suave', 'Regeneración', 'Iluminador', 'Textura mejorada'],
            ingredients: ['Ácido málico', 'Enzima de piña', 'Avena coloidal', 'Niacinamida', 'Caolín'],
            image: 'img/productos/scrub.png',
            stock: 18,
            featured: false,
            bestSeller: false
        },
        {
            id: 'sk008',
            name: 'PR BOX Cuidado Completo 5 Pasos',
            category: 'skincare',
            price: 99.00,
            originalPrice: 142.00,
            description: 'Kit completo de cuidado facial en 5 pasos. Incluye: Gel Limpiador, Tónico, Sérum, Gel Hidratante y Elixir de Jojoba. Rutina minimalista para vida social activa.',
            benefits: ['Rutina completa', 'Ahorro 30%', 'Todos los esenciales', 'Vida activa'],
            ingredients: ['Ver productos individuales'],
            image: 'img/productos/pr-box.png',
            stock: 15,
            featured: true,
            bestSeller: true,
            bundle: true
        }
    ],
    
    makeup: [
        {
            id: 'mk001',
            name: 'Paleta 16 Tonos Nude de Miami',
            category: 'makeup',
            price: 29.99,
            originalPrice: null,
            description: 'Paleta profesional con 16 tonos nude diseñada para realzar la belleza de todos los tonos de piel. Incluye 10 sombras en acabados mate y shimmer.',
            benefits: ['16 tonos versátiles', 'Todo tipo de piel', 'Mate y shimmer', 'Alta pigmentación'],
            ingredients: ['Pigmentos minerales', 'Fórmula vegana'],
            image: 'img/productos/nude-palette.png',
            stock: 20,
            featured: true,
            bestSeller: true
        },
        {
            id: 'mk002',
            name: 'Aceite Labial Translúcido',
            category: 'makeup',
            price: 9.60,
            originalPrice: 12.00,
            description: 'Aceite labial de lujo que proporciona un velo translúcido de color. Hidrata profundamente mientras aporta brillo natural.',
            benefits: ['Hidratación intensa', 'Brillo natural', 'Translúcido', 'Fórmula ligera'],
            ingredients: ['Aceites naturales', 'Vitamina E'],
            colors: ['Intense Red', 'Intense Purple', 'Cherry', 'Light Red'],
            image: 'img/productos/3.png',
            stock: 35,
            featured: true,
            bestSeller: true
        },
        {
            id: 'mk003',
            name: 'Contorno en Barra Enigmatic Goddess',
            category: 'makeup',
            price: 7.20,
            originalPrice: null,
            description: 'Barra de contorno para esculpir y definir. Fácil de aplicar y difuminar para un acabado natural y profesional.',
            benefits: ['Definición facial', 'Fácil aplicación', 'Acabado natural', 'Larga duración'],
            ingredients: ['Pigmentos minerales', 'Ceras naturales'],
            colors: ['Light', 'Medium', 'Deep', 'Universal'],
            image: 'img/productos/4.png',
            stock: 28,
            featured: false,
            bestSeller: true
        },
        {
            id: 'mk004',
            name: 'Set de Brochas Profesionales',
            category: 'makeup',
            price: 27.00,
            originalPrice: null,
            description: 'Colección de brochas para rostro y ojos. Herramientas definitivas para lograr looks de belleza impecables con precisión y perfección.',
            benefits: ['Profesionales', 'Rostro y ojos', 'Alta calidad', 'Versátiles'],
            ingredients: ['Cerdas sintéticas premium'],
            image: 'img/productos/brushes.png',
            stock: 15,
            featured: false,
            bestSeller: false
        },
        {
            id: 'mk005',
            name: 'Set Esenciales de Maquillaje',
            category: 'makeup',
            price: 89.00,
            originalPrice: null,
            description: 'Lo mejor de Naturally Stunning en un set completo. Incluye bolsa cosmética y productos esenciales para tu rutina de maquillaje diaria.',
            benefits: ['Set completo', 'Incluye bolsa', 'Esenciales diarios', 'Regalo perfecto'],
            ingredients: ['Ver productos individuales'],
            image: 'img/productos/makeup-set.png',
            stock: 12,
            featured: true,
            bestSeller: false,
            bundle: true
        }
    ],
    
    accessories: [
        {
            id: 'ac001',
            name: 'Diademas Ajustables para Spa',
            category: 'accessories',
            price: 5.00,
            originalPrice: null,
            description: 'Diademas ajustables diseñadas para cubrir toda la cabeza durante tu rutina de cuidado facial. Mantienen tu cabello perfectamente recogido.',
            benefits: ['Cobertura total', 'Ajustables', 'Ultra suaves', 'Lavables'],
            colors: ['Rosa', 'Blanco', 'Leopardo', 'Negro'],
            image: 'img/productos/2.png',
            stock: 50,
            featured: false,
            bestSeller: true
        },
        {
            id: 'ac002',
            name: 'Almohadillas Reutilizables EcoSoft',
            category: 'accessories',
            price: 12.00,
            originalPrice: null,
            description: 'Pack de 2 almohadillas reutilizables con estuche. Perfectas para limpieza facial profunda y suave. Material ultra absorbente.',
            benefits: ['Reutilizables', 'Eco-friendly', 'Suaves', 'Incluye estuche'],
            image: 'img/productos/eco-pads.png',
            stock: 40,
            featured: false,
            bestSeller: false
        },
        {
            id: 'ac003',
            name: 'Diademas CloudSoft para Skincare',
            category: 'accessories',
            price: 8.00,
            originalPrice: null,
            description: 'Diademas de material ultra suave tipo nube. Diseñadas para mantener tu cabello recogido durante tu rutina de cuidado sin esfuerzo.',
            benefits: ['Material nube', 'Ultra suaves', 'Sin esfuerzo', 'Cómodas'],
            colors: ['Rosa', 'Blanco', 'Leopardo'],
            image: 'img/productos/cloudsoft.png',
            stock: 45,
            featured: false,
            bestSeller: false
        }
    ]
};

// Función helper para obtener todos los productos
function getAllProducts() {
    return [
        ...productsData.skincare,
        ...productsData.makeup,
        ...productsData.accessories
    ];
}

// Función para obtener productos por categoría
function getProductsByCategory(category) {
    return productsData[category] || [];
}

// Función para obtener producto por ID
function getProductById(id) {
    const allProducts = getAllProducts();
    return allProducts.find(product => product.id === id);
}

// Función para obtener productos destacados
function getFeaturedProducts() {
    return getAllProducts().filter(product => product.featured);
}

// Función para obtener best sellers
function getBestSellers() {
    return getAllProducts().filter(product => product.bestSeller);
}

// Función para obtener productos en promoción
function getPromotionProducts() {
    return getAllProducts().filter(product => product.originalPrice !== null);
}

// Función para buscar productos
function searchProducts(query) {
    const allProducts = getAllProducts();
    const lowerQuery = query.toLowerCase();
    
    return allProducts.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
}