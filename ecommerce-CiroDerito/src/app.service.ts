// app.service.ts
export class AppService {
  getHello(): string {
    return `
      <html>
        <head>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-image: url("https://images.unsplash.com/photo-1506645292803-579c17d4ba6a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb");
              background-size: cover;
              background-position: center;
              font-family: Arial, sans-serif;
              color: #555;
            }
            .overlay {
              position: absolute; /* Posicionar en el fondo */
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(255, 255, 255, 0.3); 
              z-index: 0; 
            }
            h1 {
              font-size: 48px;
              color: #111;
              position: relative; /* Para asegurarse de que esté por encima del overlay */
              z-index: 1; /* Asegurarse de que el texto esté por encima */
            }
            p {
              font-size: 20px;
              color: #111;
              position: relative; /* Para asegurarse de que esté por encima del overlay */
              z-index: 1; /* Asegurarse de que el texto esté por encima */
            }
            div {
              text-align: center;
              position: relative; /* Para que el contenido esté por encima del overlay */
              z-index: 1; /* Asegúrate de que el contenedor esté por encima del overlay */
              padding: 20px;
              border-radius: 10px;
            }
          </style>
        </head>
        <body>
          <div class="overlay"></div>
          <div>
            <h1>Welcome to My E-Commerce!</h1>
            <p>Thank you for visiting my page! Explore our wide range of products and enjoy an easy and protected shopping experience. 😎</p>
          </div>
        </body>
      </html>
    `;
  }
}
