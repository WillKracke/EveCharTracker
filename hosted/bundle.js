"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("domoName").val() == '' || $("#domoAge").val() == '') {
    handleError("All fields are required!");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var DomoForm = function DomoForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "domoForm",
    onSubmit: handleDomo,
    name: "domoForm",
    action: "/maker",
    method: "POST",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "domoName",
    type: "text",
    name: "name",
    placeholder: "Domo Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "domoAge",
    type: "text",
    name: "age",
    placeholder: "Domo Age"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Make Domo"
  }));
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos Yet"));
  }

  var domoNodes = props.domos.map(function (domo) {
    return /*#__PURE__*/React.createElement("div", {
      key: domo._id,
      className: "domo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/domoface.jpeg",
      alt: "domo face",
      className: "domoFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "domoName"
    }, " Name: ", domo.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "domoAge"
    }, " Age: ", domo.age, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "domoList"
  }, domoNodes);
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#domos"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: csrf
  }), document.querySelector("#makeDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: []
  }), document.querySelector("#domos"));
  loadDomosFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("characterName").val() == '' || $("#characterAccount").val() == '') {
    handleError("All fields are required!");
    return false;
  }

  sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
};

var CharacterForm = function CharacterForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "characterForm",
    onSubmit: handleCharacter,
    name: "characterForm",
    action: "/maker",
    method: "POST",
    className: "characterForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "name",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Account: "), /*#__PURE__*/React.createElement("input", {
    id: "characterAccount",
    type: "text",
    name: "account",
    placeholder: "Parent Account"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeCharSubmit",
    type: "submit",
    value: "Create"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "name",
    id: "skillstag"
  }, "Skills: "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    id: "skills",
    type: "text",
    name: "skills",
    placeholder: "Amarr Carrier V, Missile Bombardment V, JDC V..."
  }));
};

var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCharacter"
    }, "No Characters Added"));
  }

  var characterNodes = props.characters.map(function (character) {
    console.log(character);
    return /*#__PURE__*/React.createElement("div", {
      key: character._id,
      className: "character"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/blankchar.jpg",
      alt: "character portrait",
      className: "charPortrait"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "characterName"
    }, " Name: ", character.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "characterAcc"
    }, " Account: ", character.account, " "), /*#__PURE__*/React.createElement("h3", {
      className: "characterSkills"
    }, " Skills: ", character.skills, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "characterList"
  }, characterNodes);
};

var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: data.characters
    }), document.querySelector("#characters"));
  });
};

var subscribePopup = function subscribePopup() {
  window.alert("Want to subscribe for unlimited character storage and automatic character fetching? Press OK to head to the store!");
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
    csrf: csrf
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters"));
  var subButton = document.querySelector("#subscribe");
  subButton.addEventListener("click", function (e) {
    e.preventDefault();
    subscribePopup();
  });
  loadCharactersFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#userMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#userMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
