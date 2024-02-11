document.addEventListener('DOMContentLoaded', function () {
    // Al cargar la página, obtener y mostrar comentarios
    getComments();

    // Agregar controlador de eventos para el envío del formulario
    const commentForm = document.getElementById('commentForm');
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        // Crear objeto JSON con los valores del formulario
        const formData = {
            name: name,
            comment: comment
        };

        // Enviar solicitud POST al servidor
        fetch('https://api-vanced.replit.app/comments/lu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar el comentario.');
            }
            return response.json();
        })
        .then(data => {
            showMessage('Comentario enviado correctamente.', 'success');
            getComments();
            document.getElementById('name').value = '';
            document.getElementById('comment').value = '';
        })
        .catch(error => {
            console.error('Error al enviar comentario:', error);
            showMessage('Error al enviar el comentario. Por favor, inténtalo de nuevo más tarde.', 'error');
        });
    });
});

function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
    messageContainer.className = `message ${type}`;
}

function getComments() {
    fetch('https://api-vanced.replit.app/comments/lu')
        .then(response => response.json())
        .then(data => {
            const comments = data.comments || []; // Obtener la lista de comentarios o un array vacío si no hay comentarios

            const commentsContainer = document.getElementById('commentsContainer');
            commentsContainer.innerHTML = ''; // Limpiar el contenido del contenedor de comentarios

            if (comments.length > 0) {
                // Si hay comentarios, agregar cada comentario al contenedor
                comments.forEach(comment => {
                    addCommentToContainer(commentsContainer, comment);
                });
            } else {
                // Si no hay comentarios, mostrar un mensaje indicando que no hay comentarios disponibles
                commentsContainer.innerHTML = '<p class="no-comments-message">Sé el primero en comentar, deja tu opinión aquí abajo</p>';
            }
        })
        .catch(error => {
            console.error('Error al obtener comentarios:', error);
            displayMessage('Error al conectarse al servidor. Por favor, inténtalo de nuevo más tarde.');
        });
}

function addCommentToContainer(container, comment) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    // Contenido del comentario
    const commentContentDiv = document.createElement('div');
    commentContentDiv.classList.add('comment-content');

    const infoUserDiv = document.createElement('div');
    infoUserDiv.classList.add('info-user');

    const nameUserSpan = document.createElement('span');
    nameUserSpan.classList.add('name-user');
    nameUserSpan.textContent = comment.name;
    infoUserDiv.appendChild(nameUserSpan);

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('comment-date');
    dateSpan.textContent = new Date(comment.timestamp).toLocaleString(); // Mostrar la fecha de publicación del comentario
    infoUserDiv.appendChild(dateSpan);

    commentContentDiv.appendChild(infoUserDiv);

    const commentTextSpan = document.createElement('span');
    commentTextSpan.classList.add('comment-text');
    commentTextSpan.textContent = comment.comment;
    commentContentDiv.appendChild(commentTextSpan);

    commentDiv.appendChild(commentContentDiv);
    container.appendChild(commentDiv);

}



function submitComment() {
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name === '' || comment === '') {
        alert('Por favor, ingresa tu nombre y comentario.');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('comment', comment);

    fetch('https://api-vanced.replit.app/comments/lu', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 200) {
            // Comentario enviado con éxito, refrescar la lista de comentarios
            getComments();
            // Limpiar los campos del formulario
            nameInput.value = '';
            commentInput.value = '';
        } else {
            alert('Error al enviar el comentario. Por favor, inténtalo de nuevo más tarde.');
        }
    })
    .catch(error => {
        console.error('Error al enviar el comentario:', error);
        alert('Error al enviar el comentario. Por favor, inténtalo de nuevo más tarde.');
    });
}