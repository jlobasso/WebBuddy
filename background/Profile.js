

class Profile {
    constructor() {
    }

    static setToken = (token) => {
        localStorage.setItem('web-buddy-token', token);
    }

    static getToken = () => {
        return (localStorage['web-buddy-token'] || null);
    }

    static setUserProfile = (profile) => {
        localStorage.setItem('web-buddy-profile', JSON.stringify(profile));
    }

    static getUserProfile = () => {
        if (localStorage.hasOwnProperty('web-buddy-profile')) {
            return JSON.parse(localStorage['web-buddy-profile']);
        } else {
            return null;
        }
    }
}

