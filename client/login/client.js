const handleLogin = (e) => {
    e.preventDefault();

    $("#userMessage").animate({width:'hide'}, 350);

    if($("#user").val() == '' || $("#pass").val() == '') {
        handleError("Username or password is empty!");
        return false;
    }

    console.log($("input[name=_csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    $("#userMessage").animate({width:'hide'}, 350);

    if($("#user").val() == '' || $("#pass") == '' || $("#pass2").val() == '') {
        handleError("All fields are required!");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match!");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

const handlePassChange = (e) => {
    e.preventDefault();

    $("#userMessage").animate({width:'hide'}, 350);

    if($("#user").val() == '' || $("#pass") == '' || $("#pass2").val() == '') {
        handleError("All fields are required!");
        return false;
    }

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
}

const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Sign In" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm" name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

const PassWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm"
            onSubmit={handlePassChange}
            action="/passchange"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="oldPass">Old: </label>
            <input id="pass" type="password" name="pass" placeholder="old password"/>
            <label htmlFor="newPass">New: </label>
            <input id="pass2" type="password" name="pass2" placeholder="new password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Change" />
        </form>
    );
}

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createPassWindow = (csrf) => {
    ReactDOM.render(
        <PassWindow csrf={csrf} />,
        document.querySelector("#content")
    )
}

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const changePassButton = document.querySelector("#changePassButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    changePassButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPassWindow(csrf);
        return false;
    })

    createLoginWindow(csrf);
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});