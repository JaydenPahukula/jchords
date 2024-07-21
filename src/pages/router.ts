import aboutTemplate from './about.html?raw'
import homeTemplate from './home.html?raw'
import notFoundTemplate from './notfound.html?raw'

const routes: {
    [key: string]: { template: string },
} = {
    '/': {
        template: homeTemplate,
    },
    '/about': {
        template: aboutTemplate,
    },
};

const root = document.body;

function renderContent(route: string) {
    root.innerHTML = (route in routes ?
        routes[route].template :
        notFoundTemplate 
    );
}

export function renderInitialContent() {
    const route = location.pathname;
    renderContent(route);
}
