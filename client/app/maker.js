const handleCharacter = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("characterName").val() == '' || $("#characterAccount").val() == '') {
        handleError("All fields are required!");
        return false;
    }

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function() {
        loadCharactersFromServer();
    });

    return false;
};

const CharacterForm = (props) => {
    return (
        <form id="characterForm"
            onSubmit={handleCharacter}
            name="characterForm"
            action="/maker"
            method="POST"
            className="characterForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="characterName" type="text" name="name" placeholder="Character Name"/>
            <label htmlFor="age">Account: </label>
            <input id="characterAccount" type="text" name="account" placeholder="Parent Account"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCharSubmit" type="submit" value="Create" />
            <br></br>
            <label htmlFor="name" id="skillstag">Skills: </label>
            <br></br>
            <input id="skills" type="text" name="skills" placeholder="Amarr Carrier V, Missile Bombardment V, JDC V..."/>
        </form>
    );
};

const CharacterList = function(props) {
    if(props.characters.length === 0) {
        return (
            <div className="characterList">
                <h3 className="emptyCharacter">No Characters Added</h3>
            </div>
        );
    }

    const characterNodes = props.characters.map(function(character) {
        console.log(character);
        return (
            <div key={character._id} className="character">
                <img src="/assets/img/blankchar.jpg" alt="character portrait" className="charPortrait" />
                <h3 className="characterName"> Name: {character.name} </h3>
                <h3 className="characterAcc"> Account: {character.account} </h3>
                <h3 className="characterSkills"> Skills: {character.skills} </h3>
            </div>
        );
    });

    return (
        <div className="characterList">
            {characterNodes}
        </div>
    );
};

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />, document.querySelector("#characters")
        );
    });
};

const subscribePopup = () => {
    window.alert("Want to subscribe for unlimited character storage and automatic character fetching? Press OK to head to the store!");
}

const setup = function(csrf) {
    ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")
    );

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters")
    );

    const subButton = document.querySelector("#subscribe");
    subButton.addEventListener("click", (e) => {
        e.preventDefault();
        subscribePopup();
    });

    loadCharactersFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});