/*TODO: HACER EL LOGIN Y GUARDAR PROFILE EN LOCAL STORAGE*/
/*TODO: REVISAR SESSION? */

class BackgroundLogIn {
    constructor() {
    }

    static checkSession = () => {

        const token = Profile.getToken();

        /* TODO: HACER FETCH PARA VER SI EL TOKEN ES VALIDO Y/O SI HAY SESSION ACTIVA*/
        /* TODO: DEBERIAMOS ACTUALIZAR EL PROFILE Y SITES AVAILIBLES ?? */

        if (!token || !Profile.getUserProfile() || !Profile.getSitesAvailibles()) {
            BackgroundLogIn.sendSessionStatus(false);
        }
        else {
            BackgroundLogIn.sendSessionStatus(true);
        }


    }


    static sendSessionStatus = (status) => {

        if (!status) {
            /* INFORMAMOS AL POPUP QUE NO HAY SESSION*/
            chrome.runtime.sendMessage({
                target: 'popup',
                action: 'LOGIN',
                value: 'show'
            });

            /* INFORMAMOS A TODAS LAS TABS QUE NO HAY SESSION*/
            //TODO: NO ESTA HECHO EL COMPORTAMIENTO EN mainContent.js
            chrome.tabs.query({}, function (tabs) {
                tabs.forEach((tab, i) => {
                    chrome.tabs.sendMessage(tab.id, {
                        target: 'main-content',
                        action: 'NO_SESSION'
                    });
                });
            });
        } else {

            /* INFORMAMOS AL POPUP QUE HAY SESSION*/
            chrome.runtime.sendMessage({
                target: 'popup',
                action: 'LOGIN',
                value: 'hide',
                username: Profile.getUserProfile().username
            });

            /* INFORMAMOS A TODAS LAS TABS QUE HAY SESSION*/
            //TODO: NO ESTA HECHO EL COMPORTAMIENTO EN mainContent.js
            chrome.tabs.query({}, function (tabs) {
                tabs.forEach((tab, i) => {
                    chrome.tabs.sendMessage(tab.id, {
                        target: 'main-content',
                        action: 'SESSION_AVAILIBLE'
                    });
                });
            });

        }
    }


    static logIn = async (username, password) => {

        // fetch('http://localhost:3000/get-menu')
        //     .then(function (response) {
        //         return response.json();
        //     })

        //     .then(function (myJson) {
        //         console.log(myJson);
        //     });

        const profile = {
            username: username,
            availibleActions: [
                {
                    name: '#HASHTAGS',
                    importName: 'hashtags',
                    idMenu: 'hashtag_pulpou_menu',
                    idData: 'hashtag_sub_menu',
                    data: [
                        {
                            name: '#joicobrazil',
                            type: null,
                            data: []
                        },
                        {
                            name: '#autosaescala',
                            type: null,
                            data: []
                        },
                        {
                            name: '#theflash',
                            type: null,
                            data: []
                        },
                        {
                            name: '#spacexploration',
                            type: null,
                            data: []
                        }
                    ]
                },
                {
                    name: 'SELLERS',
                    importName: 'sellers',
                    idMenu: 'sellers_pulpou_menu',
                    idData: 'sellers_sub_menu',
                    data: [{
                        name: 'WHITELIST',
                        type: 'table',
                        data: [1, 2, 3, 4, 5]
                    },
                    {
                        name: 'BLACKLIST',
                        type: 'table',
                        data: ["uno", "dos", "tres", "cuatro", "cinco"]
                    }]

                },
                {
                    name: 'REPORTS',
                    importName: 'reports',
                    idMenu: 'reports_pulpou_menu',
                    idData: 'reports_sub_menu',
                    data: []

                },
                {
                    name: 'IMAGES',
                    importName: 'images',
                    idMenu: 'images_pulpou_menu',
                    idData: 'images_sub_menu',
                    data: []
                }
            ]
        };

        const sitesAvailibles = [{
            siteRegexp: ['http.:\/\/www.instagram.com.*\/*'],
            script: 'instagram'
        },
        {
            siteRegexp: ['http.:\/\/stackoverflow.com\/.*'],
            script: 'stackoverflow'
        },
        {
            siteRegexp: ['http.:\/\/www\.mercadoli[b|v]re\.com.*'],
            script: 'mercadolibre'
        }];

        Profile.setSitesAvailibles(sitesAvailibles);
        Profile.setUserProfile(profile);
        Profile.setToken("abcdefghi");

        BackgroundLogIn.sendSessionStatus(true);
    }

    static logOut = () => {
        /* TODO: AGREGAR COMPORTAMIENTO*/
        /*REMOVEMOS PROFILE*/
        Profile.setToken(false);
        Profile.setSitesAvailibles(false);
        Profile.setUserProfile(false);
    }
}




chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.target === 'background-login') {

        switch (message.action) {
            case 'LOGIN':

                BackgroundLogIn.logIn(message.username, message.password);

                sendResponse('LOGIN SENT');

                break;

            case 'CHECK_SESSION':

                BackgroundLogIn.checkSession();

                break;

            default:
                break;
        }

    }

});