const routes = {
    '/index': {
        title: 'Pong Game',
        content: './index.html',
        // css: './index.css'
    },
    
    '/': {
        title: 'Pong Game - Home',
        content: './home.html',
        // css: './home.css'
    },

    '/login': {
        title: 'Pong Game - Sign In',
        content: './login.html',
        // css: './login.css'
    },
    // Add more routes as needed
};


async function loadContent(path) {
    const contentDiv = document.getElementById('content');
    const head = document.head;


    const route = routes[path] || routes['/'];
    debugger;

    try {
        const response = await fetch(route.content);
        if (!response.ok) throw new Error('Network response was not ok');
        const content = await response.text();
        contentDiv.innerHTML = content;
        document.title = route.title;

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



document.addEventListener('DOMContentLoaded', async () => {
    

    

    function removeExistingStyles() {
        const existingStyles = document.querySelectorAll('link[data-dynamic-style]');
        existingStyles.forEach(style => style.remove());
    }

    function loadCSS(path) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            link.setAttribute('data-dynamic-style', '');
            link.onload = resolve;
            link.onerror = reject;
            head.appendChild(link);
        });
    }

    

    window.onpopstate = () => {
        debugger;
        preventDefault();
        loadContent(window.location.pathname);
    };

    loadContent(window.location.pathname);
    turnOnEventListeners(path);
    
    // document.querySelectorAll('nav a, .nav-link').forEach(link => {
    //     link.addEventListener('click', event => {
    //         debugger;
    //         event.preventDefault();
    //         const path = event.target.getAttribute('data-path');
    //         window.history.pushState({}, path, path === '/' ? '/' : path);
    //         loadContent(path === '/' ? '/' : path);
    //         turnOnEventListeners(path);
    //     });
    // });

});


function turnOnEventListeners(path) {
    if (path === '/login') {
        loginPageTurnOnLiseners();
    }


    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', event => {
            debugger;
            event.preventDefault();
            const path = event.target.getAttribute('data-path');
            window.history.pushState({}, path, path === '/' ? '/' : path);
            loadContent(path === '/' ? '/' : path);
            turnOnEventListeners(path);
        });
    });
};
