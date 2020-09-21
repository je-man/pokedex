var pokemonRepository = (function () {
  var pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";

  // Create a AJAX/Promise
  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function getAll(pokemon) {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    //let pokeList = document.querySelector(".pokemon-list");
    let pokeList = $(".pokemon-list");
    //let listItem = document.createElement("li");
    let listItem = $("<li></li>");
    //let button = document.createElement("button");
    let button = $("<button>" + pokemon.name + "</button>");
    //button.innerText = pokemon.name;
    //button.classList.add("buttonStyle");
    button.addClass("buttonStyle");
    //listItem.appendChild(button);
    listItem.append(button);
    //pokeList.appendChild(listItem);
    pokeList.append(listItem);
    //button.addEventListener("click", function (event) {
    button.on("click", function (event) {
      showDetails(pokemon);
    });
  }

  //add event listener for each button just created
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(item) {
    //let modalContainer = document.querySelector("#modal-container");
    let modalContainer = $("#modal-container");
    //modalContainer.innerHTML = "";
    modalContainer.empty();
    //let modal = document.createElement("div");
    let modal = $("<div></div>");
    //modal.classList.add("modal");
    modal.addClass("modal");
    //let closeButtonElement = document.createElement("button");
    let closeButtonElement = $("<button>Close</button>");
    //closeButtonElement.classList.add("modal-close");
    closeButtonElement.addClass("modal-close");
    //closeButtonElement.innerText = "Close";
    closeButtonElement.on("click", hideModal);
    //let nameElement = document.createElement("h1");
    let nameElement = $("<h1>" + item.name + "</h1>");
    nameElement.addClass("name-class");
    //nameElement.innerText = item.name;
    //let imageElement = document.createElement("img");
    let imageElement = $("<img></img>");
    //imageElement.classList.add("modal-image");
    imageElement.addClass("modal-image");
    imageElement.attr("src", item.imageUrl);
    //let heightElement = document.createElement("p");
    let heightElement = $("<p>" + "Height: " + item.height + '"' + "</p>");
    //heightElement.innerText = "Height: " + item.height + '"';
    //let typesElement = document.createElement("p");
    let typesElement = $("<p>" + "Type: " + item.types + "</p>");
    typesElement.addClass("types-class");
    //typesElement.innerText = "Type: " + item.types;
    //let abilityElement = document.createElement("p");
    let abilityElement = $("<p>" + "Abilities: " + item.abilities + "</p>");
    //abilityElement.innerText = "Abilities: " + item.abilities;
    //Append
    //modal.appendChild(closeButtonElement);
    modal.append(closeButtonElement);
    // modal.appendChild(nameElement);
    modal.append(nameElement);
    // modal.appendChild(imageElement);
    modal.append(imageElement);
    // modal.appendChild(heightElement);
    modal.append(heightElement);
    // modal.appendChild(typesElement);
    modal.append(typesElement);
    // modal.appendChild(abilityElement);
    modal.append(abilityElement);
    // modalContainer.appendChild(modal);
    modalContainer.append(modal);
    // modalContainer.classList.add("is-visible");
    modalContainer.addClass("is-visible");
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        // item.types = details.types;
        item.types = [];
        details.types.forEach(function (itemType) {
          item.types.push(itemType.type.name);
        });

        if (item.types.includes("grass")) {
          $(".name-class").css("background-color", "rgb(120, 200, 80)");
        } else if (item.types.includes("fire")) {
          $(".name-class").css("background-color", "rgb(240, 128, 48)");
        } else if (item.types.includes("poison")) {
          $(".name-class").css("background-color", "rgb(168, 144, 240)");
        } else if (item.types.includes("water")) {
          $(".name-class").css("background-color", "rgb(104, 144, 240)");
        } else if (item.types.includes("bug")) {
          $(".name-class").css("background-color", "rgb(168, 184, 32)");
        } else if (item.types.includes("water")) {
          $(".name-class").css("background-color", "rgb(69, 120, 237)");
        } else if (item.types.includes("ice")) {
          $(".name-class").css("background-color", "rgb(66, 174, 174)");
        } else if (item.types.includes("electric")) {
          $(".name-class").css("background-color", "rgb(252, 234, 161)");
        } else if (item.types.includes("ground")) {
          $(".name-class").css("background-color", "rgb(219, 181, 77)");
        } else if (item.types.includes("fairy")) {
          $(".name-class").css("background-color", "rgb(232, 120, 144)");
        } else if (item.types.includes("ghost")) {
          $(".name-class").css("background-color", "rgb(100, 78, 136)");
        }

        item.abilities = [];
        details.abilities.forEach(function (itemAbility) {
          item.abilities.push(itemAbility.ability.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //hides modal when clicked on close button
  function hideModal() {
    //let modalContainer = document.querySelector("#modal-container");
    let modalContainer = $("#modal-container");
    //modalContainer.classList.remove("is-visible");
    modalContainer.removeClass("is-visible");
  }

  //hides modal when clicked on ESC on keyboard
  jQuery(window).on("keydown", (e) => {
    //let modalContainer = document.querySelector("#modal-container");
    let modalContainer = $("modal-container");
    if (e.key === "Escape" && modalContainer.hasClass("is-visible")) {
      hideModal();
    }
  });

  //let modalContainer = document.querySelector("#modal-container");
  let modalContainer = $("#modal-container");
  modalContainer.on("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})(); //IIFE wrap

//loadList method will fetch data from API then add each Pokemon in the fetched date to pokemonList with the add function
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
