document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario');
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const celular = document.getElementById('celular');

    const showError = (input, message) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    };

    const showSuccess = (input) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    };

    const checkRequired = (inputArray) => {
        let isValid = true;
        inputArray.forEach(input => {
            if(input.value.trim() === '') {
                showError(input, `${getFieldName(input)} é obrigatório`);
                isValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isValid;
    };

    const checkEmail = (input) => {
        const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\.,;:\s@"]+\.)+[^<>()\[\]\.,;:\s@"]{2,})$/i;
        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email inválido');
        }
    };

    const checkPhone = (input) => {
        const re = /\([0-9]{2}\) [0-9]{5}-[0-9]{4}/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Celular inválido');
        }
    };

    const getFieldName = (input) => {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (checkRequired([nome, email, celular])) {
            checkEmail(email);
            checkPhone(celular);
            const formData = new FormData(form);

            fetch('/index.html', { // Substitua pela URL do seu endpoint
                method: 'POST',
                body: formData,
            })
            .then(response => {
                // Simular uma resposta de sucesso
                return { status: 'ok' };
            })
            .then(data => {
                console.log('Success:', data);
                alert('Formulário enviado com sucesso!');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Ocorreu um erro ao enviar o formulário.');
            });
        }
    });

    const ofertas = document.querySelectorAll('.oferta-imagem-destaque, .oferta-quatro-imagens figure');
    ofertas.forEach(oferta => {
        oferta.addEventListener('click', function() {
            const figcaption = this.querySelector('figcaption');
            figcaption.classList.toggle('visible');
        });
    });

    const featuredImage = document.querySelector('.oferta-imagem-destaque img');
    const images = [
        'imagens/rio.jpg',
        'imagens/manaus.jpg',
        'imagens/niteroi.jpg',
        'imagens/saopaulo.jpg',
        'imagens/maranhao.jpg'
    ];
    let currentImageIndex = 0;

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        featuredImage.src = images[currentImageIndex];
    }, 5000);
});
