import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Corporate Blog API",
      version: "1.0.0",
      description: "API documentation for Corporate Blog Backend",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Local development server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        Post: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "clx123abc456",
            },
            title: {
              type: "string",
              example: "My First Blog",
            },
            content: {
              type: "string",
              example: "This is my first corporate blog post",
            },
            slug: {
              type: "string",
              example: "my-first-blog",
            },
            status: {
              type: "string",
              example: "PUBLISHED",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);