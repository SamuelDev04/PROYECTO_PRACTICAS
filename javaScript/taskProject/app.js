//Clase para definir los campos de producto
class Product {
    //Se crea un metodo constructor y se requieren el nombre, precio y año
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//Clase User Interface (Para la vista del usuario)
class UI {
    //Metodo de añadir producto, y le enviamos un parametro (product)
    addProduct(product) {
        //Obtenemos la lista del producto mediante el id
        const productList = document.getElementById('product-list');
        //Creamos un elemento (div)
        const element = document.createElement('div');
        //Dentro del elemento estara el nombre, precio y año
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name};
                    <strong>Product Price</strong>: ${product.price};
                    <strong>Product Year</strong>: ${product.year};
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;

        //Ponemos el elemento como un hijo de la lista de productos
        productList.appendChild(element);
        //Llamamos el metodo para resetear el formulario
        this.resetForm();
    }

    //Metodo para resetear el formulario
    resetForm() {
        //Llamo el el formulario por medio del id
        document.getElementById('product-form').reset();
    }

    //Metodo para eliminar producto y le envio un elemento
    deleteProduct(element) {
        if (element.name == 'delete') {
            //parentElement es para coger el elemento padre del anterior
            element.parentElement.parentElement.parentElement.remove();
            //Se muestra un mensaje de confirmacion
            this.showMessage('Product Deleted Successfuly', 'info');
        }
    }

    //Metodo para crear mensajes
    showMessage(message, cssClass) {
        //Se crea una constante para crear posteriormente un elemento (div)
        const div = document.createElement('div');
        //Se le asignan clases al div creado anteriormente
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //Mostrando en el DOM
        //Se crea una constante que me trae todo lo que haya dentro del container
        const container = document.querySelector('.container');
        //Se crea una constante que me trae todo lo que haya dentro de app
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        //Se define el tiempo que se muestre el aviso
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

 /*DOM EVENTS (Document Object Model)
    Eventos del aplicativo
    Se llama el formulario*/
document.getElementById('product-form')
    //Con esta funcion se traen los valores ingresados
    .addEventListener('submit', function(e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        //Se crea un nuevo producto y se le envian los parametros necesarios
        const product =  new Product(name,price,year);

        //Se crea una nueva UI
        const ui =  new UI();
        //Se evalua si los campos están vacios
        if (name === '' || price === '' || year === '') {
            //Si estan vacios, retorna un mensaje
            return ui.showMessage('Complete Fields', 'danger');
        }

        //Se añade el producto
        ui.addProduct(product);
        //Mensaje si se añade el producto
        ui.showMessage('Product Added Successfuly','success');

        //Esta funcion es para que no se recargue al enviar el formulario
        e.preventDefault();
    });

//Se llama a la lista de productos
document.getElementById('product-list')
    //Se escucha el evento click
    .addEventListener('click', function(e) {
        //Se crea una nueva UI
        const ui = new UI();
        /*Se llama el metodo para eliminar producto
            Y se le envian los datos del event*/
        ui.deleteProduct(e.target);
    });