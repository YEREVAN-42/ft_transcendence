function fromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;
    if (!html) return null;
  
    // Then set up a new template element.
	const fragment = document.createDocumentFragment();
	fragment.innerHTML = html;
	const container3 = fragment.getElementsByClassName("container");
	console.log(container3);
    const template = document.createElement('template');
    template.innerHTML = html;
	const container2 = template.content.getElementsByClassName("container");
	const container = template.getElementsByClassName("container");
	console.log(container);
    const result = template.content.children;
  
    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    if (result.length === 1) return result[0];
    return result;
}

function turnOnEventListeners(path) {
	if (path === '/login') {
		loginPageTurnOnLiseners();
	}
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

// const routes = {
//     // 404: "{% url 'error' %}",
// 	"/": "{% url 'index' %}",
// 	"/home": "{% url 'home' %}",
// 	"/signin": "{% url 'signin' %}",
// 	"/signup": "{% url 'signup' %}",
// 	"/confirm": "{% url 'confirm' %}",
// 	"/fa_confirm": "{% url 'fa_confirm' %}",
// 	"/intra": "{% url 'intra' %}",
// 	"/profile": "{% url 'profile' %}",
// 	"/local_game": "{% url 'local_game' %}",
// 	"/match_history": "{% url 'match_history' %}",
// 	"/tournaments": "{% url 'tournaments' %}",
// 	"/settings": "{% url 'settings' %}",
// };

const handleLocation = async () => {
	console.log("window.location.pathname", window.location.pathname);
	// await new Promise(r => setTimeout(r, 2000));
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
	// const DOMObj = fromHTML(html);
	let parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const container = doc.getElementById("container");
	console.log(container);
	// const container = DOMObj.getElementsByClassName("container");
	const domContainer =  document.getElementById("container");
	domContainer.innerHTML = container.innerHTML;
	turnOnEventListeners(path);
	const buttons = Array.from(document.querySelectorAll("input").values());
	console.log("buttons = ", buttons);
	if (buttons.length === 0) {
		return;
	}

	const elems = buttons.filter((el) => {
		return el.type == "submit";
	})

	console.log("elems = ", elems);	
	// const elem = $("button").filter(function(i, el) {
	// 	return !el.value && !el.name
	//   });

	//   console.log("elem = ", elem);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();



function turnOnEventListeners(path) {
    if (path === '/login') {
        loginPageTurnOnLiseners();
    }

	console.log("document.querySelectorAll('a')", document.querySelectorAll('a'));
    document.querySelectorAll('a').forEach(link => {
		console.log("link", link);
        link.addEventListener('click', event => {
            event.preventDefault();
			if (event.target.parentElement.href === undefined) {
				return;
			}
            const path = "/" + event.target.parentElement.href.split("/").pop();
            window.history.pushState({}, path, path === '/' ? '/' : path);
			handleLocation();
            // loadContent(path === '/' ? '/' : path);
            turnOnEventListeners(path);
        });
    });
	const buttons = Array.from(document.querySelectorAll("input").values());
	console.log("buttons = ", buttons);
	if (buttons.length === 0) {
		return;
	}

	const elems = buttons.filter((el) => {
		return el.type == "submit";
	})

	console.log("elems = ", elems);	
    // elems.forEach(link => {
	// 	console.log("link", link);
    //     link.addEventListener('click', event => {
	// 		debugger;
    //         event.preventDefault();
	// 		if (event.target.parentElement.href === undefined) {
	// 			return;
	// 		}
    //         const path = "/" + event.target.parentElement.href.split("/").pop();
    //         window.history.pushState({}, path, path === '/' ? '/' : path);
	// 		handleLocation();
    //         // loadContent(path === '/' ? '/' : path);
    //         turnOnEventListeners(path);
    //     });
    // });
};


async function loadContent(path) {
    const contentDiv = document.getElementsByClassName('container')[0];
    const head = document.head;


    const route = routes[path] || routes['/'];

    try {
        const response = await fetch(route);
        if (!response.ok) throw new Error('Network response was not ok');
        const content = await response.text();
        contentDiv.innerHTML = content;
        // document.title = route.title;

        // removeExistingStyles();
        // await loadCSS(route.css);

        // Load specific scripts for certain pages
        // if (path === '/index') {
        //     const script = document.createElement('script');
        //     script.src = './index.js';
        //     document.body.appendChild(script);
        // }
        // if (path === '/login') {
        //     const script = document.createElement('script');
        //     script.src = './login.js';
        //     document.body.appendChild(script);
        // }
    } catch (error) {
        contentDiv.innerHTML = '<h1>404</h1><p>Page not found.</p>';
        document.title = 'Pong Game - 404';
        // removeExistingStyles();
    }
}
