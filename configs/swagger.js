import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "API Gestor de ventas en linea",
            version: "1.0.0",
            description: "API para sistema de ventas en linea",
            contact:{
                name: "Daniel Sacol",
                email: "dsacol-2023010@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/onlineSales/v1"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }