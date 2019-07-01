

class Profile {
    constructor() {
    }

    static setUserToken = (token) => {
        chrome.storage.sync.set({ 'web-buddy-token': token });
    }

    static getUserToken = async () => {
        const token = await new Promise(function (resolve) {
            chrome.storage.sync.get('web-buddy-token', function (result) {
                resolve(result);
            });
        });

        return token['web-buddy-token'];
    }

    static setUserProfile = (profile) => {
        chrome.storage.sync.set({ 'web-buddy-profile': profile });
    }

    static getUserProfile = async () => {
        const profile = await new Promise(function (resolve) {
            chrome.storage.sync.get('web-buddy-profile', function (result) {
                resolve(result);
            });
        })
        return profile['web-buddy-profile'];
    }

}

