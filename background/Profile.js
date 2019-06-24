

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
            return false;
        }
    }

    static setSitesAvailibles = (sitesAvailibles) => {
        localStorage.setItem('web-buddy-sites-availibles', JSON.stringify(sitesAvailibles));
    }

    static getSitesAvailibles = () => {
        if (localStorage.hasOwnProperty('web-buddy-sites-availibles')) {
            return JSON.parse(localStorage['web-buddy-sites-availibles']);
        }
        else {
            return false;
        }
    }
}

