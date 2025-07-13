const { queryDB } = require("./DBquery");
const bcrypt = require("bcryptjs");

const DBinit = async () => {
        try {
                // 1. Borrar tablas (orden importa por las FK)
                await queryDB(`DROP TABLE IF EXISTS detalle_pedido`);
                await queryDB(`DROP TABLE IF EXISTS plantillas`);
                await queryDB(`DROP TABLE IF EXISTS productos`);
                await queryDB(`DROP TABLE IF EXISTS categoria_pdto`);
                await queryDB(`DROP TABLE IF EXISTS pedidos`);
                await queryDB(`DROP TABLE IF EXISTS promocion`);
                await queryDB(`DROP TABLE IF EXISTS users`);
                // 2. Crear tablas (igual que tu archivo DBcreate.js)
                await queryDB(`
                        CREATE TABLE IF NOT EXISTS users (
                                user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                name VARCHAR(120) NOT NULL,
                                email VARCHAR(120) UNIQUE NOT NULL,
                                password VARCHAR(200) NOT NULL,
                                direccion VARCHAR(200),
                                telefono VARCHAR(9),
                                role VARCHAR(60) 
                        );

                        CREATE TABLE IF NOT EXISTS categoria_pdto (
                                cat_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                categoria_name VARCHAR(120) NOT NULL
                        );

                        CREATE TABLE IF NOT EXISTS plantillas (
                                planti_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                cat_id INTEGER REFERENCES categoria_pdto(cat_id) ON DELETE CASCADE,
                                plantilla_name VARCHAR(120) NOT NULL,
                                tag VARCHAR(120) NOT NULL,
                                plantilla_url VARCHAR(300) NOT NULL,
                                tipo_plantilla VARCHAR(120) NOT NULL
                        );

                        CREATE TABLE IF NOT EXISTS productos (
                                pdto_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                cat_id INTEGER REFERENCES categoria_pdto(cat_id) ON DELETE CASCADE,
                                producto_name VARCHAR(120) NOT NULL,
                                dimension VARCHAR(120) NOT NULL,
                                descripcion VARCHAR(600),
                                color VARCHAR(120) NOT NULL,
                                precio NUMERIC(10, 2) NOT NULL
                        );

                        CREATE TABLE IF NOT EXISTS promocion (
                                promo_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                promocion_name VARCHAR(120) NOT NULL,
                                descripcion VARCHAR(600),
                                descuento NUMERIC(10, 2) NOT NULL
                        );

                        CREATE TABLE IF NOT EXISTS pedidos (
                                pedi_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                                promo_id INTEGER REFERENCES promocion(promo_id) ON DELETE CASCADE,
                                fecha DATE NOT NULL,
                                precio_total NUMERIC(10, 2) NOT NULL
                        );

                        CREATE TABLE IF NOT EXISTS detalle_pedido (
                                deta_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                                pedi_id INTEGER REFERENCES pedidos(pedi_id) ON DELETE CASCADE,
                                pdto_id INTEGER REFERENCES productos(pdto_id) ON DELETE CASCADE,
                                promo_id INTEGER REFERENCES promocion(promo_id) ON DELETE CASCADE,
                                planti_id INTEGER REFERENCES plantillas(planti_id) ON DELETE CASCADE,
                                cantidad NUMERIC(10) NOT NULL,
                                precio_subtotal NUMERIC(10, 2) NOT NULL
                        );
                `);

                // 3. Hashear contraseñas
                const password1 = await bcrypt.hash("User1234", 10);
                const password2 = await bcrypt.hash("Admin123", 10);
                // 4. Insertar datos ficticios
                //USERS
                await queryDB(`INSERT INTO users(name, email, password,direccion, telefono, role)
                       VALUES
                ('Ana', 'ana@gmail.com', $1, 'calle falsa 1', '654789654', 'user'),
                ('Abel', 'abel@gmail.com', $2, 'calle ola 3', '654321123', 'admin')`,
                        [password1, password2]
                );
                //CATEGORIA_PDTO
                await queryDB(`INSERT INTO categoria_pdto(categoria_name)
                        VALUES
                        ('Taza'),('Bidon'),('Camiseta')
                `);
                //PLANTILLAS
                await queryDB(`INSERT INTO plantillas(plantilla_name,cat_id,tag,plantilla_url,tipo_plantilla) 
                        VALUES
                        ('CorazonHuesos',1,'perro mascota', 'https://example.com/hueso.jpg', '200mmX90mm'),
                        ('HuellaHuesos',1,'perro mascota', 'https://example.com/huella.jpg', '200mmX90mm'),
                        ('Estrella',1,'estrella cielo noche', 'https://example.com/estrella.jpg', '200mmX90mm'),
                        ('Bandera',1,'cuba bandera', 'https://example.com/cuba.jpg', '200mmX90mm'),
                        ('CorazonHuesos',2,'perro mascota', 'https://example.com/hueso.jpg', '200mmX150mm')
                `);
                //PRODUCTOS
                await queryDB(`INSERT INTO productos(producto_name,cat_id,dimension,descripcion,color,precio) 
                        VALUES
                        ('Taza blanca brillo AA',1,'24 x 9,5 cm', 'Taza para sublimación de alta calidad AA con recubrimiento ORCA acabado brillo','Blanca Brillo',12.00),
                        ('Taza blanca mate AA',1,'24 x 9,5 cm', 'Taza para sublimación de alta calidad AA con recubrimiento ORCA acabado mate','Blanca Mate',12.00),
                        ('Taza blanca brillo AAA',1,'24 x 9,5 cm', 'Taza para sublimación de cerámica y de máxima calidad AAA con recubrimiento ORCA acabado brillo','Blanca Brillo',12.50),
                        ('Taza blanca con interior y asa de color',1,'23 x 9,2 cm', 'Tazas bicolor de 11 oz con acabado brillo calidad AA con recubrimiento Orca','Blanca (Amarillo ocre)',12.50),
                        ('Taza blanca con interior y asa de color',1,'23 x 9,2 cm', 'Tazas bicolor de 11 oz con acabado brillo calidad AA con recubrimiento Orca','Blanca (Rosa)',12.50),
                        ('Taza blanca con interior y asa de color',1,'23 x 9,2 cm', 'Tazas bicolor de 11 oz con acabado brillo calidad AA con recubrimiento Orca','Blanca (Negro)',12.50),
                        ('Taza blanca con interior y asa de color',1,'23 x 9,2 cm', 'Tazas bicolor de 11 oz con acabado brillo calidad AA con recubrimiento Orca','Blanca (Granate)',12.50),
                        ('Taza blanca con interior y asa de color',1,'23 x 9,2 cm', 'Tazas bicolor de 11 oz con acabado brillo calidad AA con recubrimiento Orca','Blanca (Azul marino)',12.50),

                        ('Tazas mágicas brillo',1,'23,5 x 9,7 cm', 'Tazas de 11 oz. El color negro desaparace gradualmente dejando ver la imagen sublimada cuando se agrega líquido caliente en su interior.', 'Negro Brillo',14.95),
                        ('Tazas mágicas mate',1,'23,5 x 9,7 cm', 'Tazas de 11 oz. El color negro desaparace gradualmente dejando ver la imagen sublimada cuando se agrega líquido caliente en su interior.', 'Negro Mate',14.95),
                        ('Bidones de aluminio',2,'Ø6,5 x 17,5', 'Botellas de agua reutilizables con tapón de rosca y mosquetón, personalizables por sublimación.', 'Blanco',15.00)
                `);
                //PROMOCION
                await queryDB(`INSERT INTO promocion(promocion_name,descripcion,descuento) 
                        VALUES
                        ('Promoción 3 tazas', 'Por la compra de tres tazas descuento del 10%', 0.90),
                        ('Promoción 6 tazas', 'Por la compra de seis tazas descuento del 15%', 0.85),
                        ('Promoción gasto de 100 €','Por la compra con un gasto superior a 100€ descuento de 20%', 0.80)        
                `);
                //PEDIDOS
                await queryDB(`INSERT INTO pedidos(user_id,promo_id,fecha,precio_total) 
                        VALUES
                        (1, 1 ,'2025-07-10', 20 ),
                        (1, 2 ,'2025-07-12', 30 ),
                        (1, 3 ,'2025-07-14', 35 ),
                        (1, 1 ,'2025-07-15', 15 )
                `);
                //DETALLE_PEDIDO
                await queryDB(`INSERT INTO detalle_pedido(pedi_id,pdto_id,promo_id,planti_id,cantidad,precio_subtotal) 
                        VALUES
                        (1, 10, 1, 1, 2, 20),
                        (2, 2, 2, 3, 3, 30),
                        (3, 5, 2, 4, 3, 35),
                        (4, 1, 1, 2, 1, 15)
                `);

                console.log("Base de datos reiniciada con éxito");

        } catch (error) {
                console.log("Error al inicializar la base de datos:", error);
        }
}


DBinit();