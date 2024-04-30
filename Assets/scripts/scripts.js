//mostrar todos os filmes
//mostrar filmes por categoria
//pesquisar os filmes
//adicionar filme à lista do usuario
//Mostrar o botão de remover
//Notificaçoes
//adicionar filme aos favoritos
//remover todos os filmes da lista
//nao mostrar o botao de remover
//exibir as notificaçoes
//home mostrando todos os filmes
//mudar categoria no seletor de categoria
//clique no botao de pesquisa
//pressionar enter no campo de pesquisa
//clique nos botões de adicionar à lista
//clique nos botões de adicionar aos favoritos
//clique no botão de remover todos os filmes da lista
//clique nos botões de reproduzir vídeo

document.addEventListener("DOMContentLoaded", function() 
{
    function showAllMovies() 
    {
        var movies = document.querySelectorAll(".box");
        movies.forEach(function(movie) 
        {
            movie.style.display = "block";
            movie.classList.remove("filtered-by-category");
        });
    }
    
    function showMoviesByCategory(category) 
    {
        var movies = document.querySelectorAll(".box");
        movies.forEach(function(movie) 
        {
            var movieCategory = movie.getAttribute("data-categori");
            if (movieCategory.toLowerCase() === category.toLowerCase()) 
            {
                movie.style.display = "block";
                movie.classList.remove("filtered-by-category");
            } else 
            {
                movie.style.display = "none";
                movie.classList.add("filtered-by-category");
            }
        });
    }

    function searchMovies(query) 
    {
        var movies = document.querySelectorAll(".box");
            movies.forEach(function(movie) 
    {
               var movieTitle = movie.querySelector(".overlay h3").textContent.toLowerCase();
        if (movieTitle.includes(query.toLowerCase())) 
        {
            movie.style.display = "block";
            movie.classList.remove("filtered-by-category");
        } else 
        {
            movie.style.display = "none";
            movie.classList.add("filtered-by-category");
        }
    });
}

    function addMovieToList(movie) 
    {
        var listaArea = document.querySelector(".listaArea .box-area");
        var clone = movie.cloneNode(true);
        var addButton = clone.querySelector("#btnAddList");
        addButton.remove();
        listaArea.appendChild(clone);

        
        var removeButtonContainer = document.getElementById("btnRemov");
        removeButtonContainer.style.display = "block";

        
        showNotification("Filme adicionado à lista!");
    }

    function addMovieToFavorites() 
    {
        
        showNotification("Filme favoritado.");
    }

    function removeAllMoviesFromList() 
    {
        var listaArea = document.querySelector(".listaArea .box-area");
        listaArea.innerHTML = "";

        
        var removeButtonContainer = document.getElementById("btnRemov");
        removeButtonContainer.style.display = "none";
    }

    function showNotification(message) 
    {
        var notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = message;
        document.body.appendChild(notification);

        
        setTimeout(function() 
        {
            notification.style.display = "none";
        }, 3000);
    }

    var selectCategoria = document.getElementById("selectCategoria");
    selectCategoria.addEventListener("change", function() 
    {
        var selectedCategory = selectCategoria.value;
        if (selectedCategory === "") 
        {
            showAllMovies();
        } else 
        {
            showMoviesByCategory(selectedCategory);
        }
    });

    var searchInput = document.getElementById("searchInput");
    var searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", function() 
    {
        var searchTerm = searchInput.value.trim();
        if (searchTerm !== "") 
        {
            searchMovies(searchTerm);
        } else 
        {
            showAllMovies();
        }
    });

    searchInput.addEventListener("keyup", function(event) 
    {
        if (event.keyCode === 13) 
        {
            searchButton.click();
        }
    });

    var addListButtons = document.querySelectorAll(".box .icon#btnAddList, .box .icon#btnAddFavorit");
    addListButtons.forEach(function(button) 
    {
        button.addEventListener("click", function(event) 
        {
            var movieBox = event.target.closest(".box");
            if (movieBox) 
            {
                if (button.id === "btnAddList") 
                {
                    addMovieToList(movieBox);
                } else if (button.id === "btnAddFavorit") 
                {
                    addMovieToFavorites(movieBox);
                }
            }
        });
    });

    var removeListButton = document.getElementById("btnRemov");
    removeListButton.addEventListener("click", function() 
    {
        removeAllMoviesFromList();
    });

    var playButtons = document.querySelectorAll(".box .icon#btnView");
    playButtons.forEach(function(button) 
    {
        button.addEventListener("click", function(event) 
        {
            var movieBox = event.target.closest(".box");
            if (movieBox) 
            {
                var video = movieBox.querySelector("video");
                if (video) 
                {
                    video.style.display = "block"; 
                    video.play(); 
                }
            }
        });
    });
});