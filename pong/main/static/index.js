const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    // 404: "/pages/404.html",
	"/": "{% url 'index' %}",
	"/home": "{% url 'home' %}",
	"/signin": "{% url 'signin' %}",
	"/signup": "{% url 'signup' %}",
	"/confirm": "{% url 'confirm' %}",
	"/profile": "{% url 'profile' %}",
	"/match_history": "{% url 'match_history' %}",
	"/tournaments": "{% url 'tournaments' %}",
	"/settings": "{% url 'settings' %}",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();