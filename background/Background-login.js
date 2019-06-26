/*TODO: HACER EL LOGIN Y GUARDAR PROFILE EN LOCAL STORAGE*/
/*TODO: REVISAR SESSION? */

class BackgroundLogIn {
    constructor() {
    }

    static checkSession = () => {

        const token = Profile.getToken();

        /* TODO: HACER FETCH PARA VER SI EL TOKEN ES VALIDO Y/O SI HAY SESSION ACTIVA*/
        /* TODO: DEBERIAMOS ACTUALIZAR EL PROFILE Y SITES AVAILIBLES ?? */

        if (!token || !Profile.getUserProfile()) {
            BackgroundLogIn.updateIcons(false);
            BackgroundLogIn.sendSessionStatus({session:false});
        }
        else {
            BackgroundLogIn.updateIcons(true);
            BackgroundLogIn.sendSessionStatus({session:true});
        }


    }


    static sendSessionStatus = (status) => {

        if (!status.session) {
            /* INFORMAMOS AL POPUP QUE NO HAY SESSION*/
            chrome.runtime.sendMessage({
                target: 'popup',
                action: 'SESSION_AVAILABLE',
                value: false
            });

            /* INFORMAMOS A TODAS LAS TABS QUE NO HAY SESSION*/
            chrome.tabs.query({}, function (tabs) {
                tabs.forEach((tab, i) => {
                    chrome.tabs.sendMessage(tab.id, {
                        target: 'main-content',
                        action: 'SESSION_AVAILABLE',
                        value:false
                    });
                });
            });
        } else {

            /* INFORMAMOS AL POPUP QUE HAY SESSION*/
            chrome.runtime.sendMessage({
                target: 'popup',
                action: 'SESSION_AVAILABLE',
                value: true,
                username: Profile.getUserProfile().username
            });

            /* INFORMAMOS A TODAS LAS TABS QUE HAY SESSION*/
            //TODO: NO ESTA HECHO EL COMPORTAMIENTO EN mainContent.js
            chrome.tabs.query({}, function (tabs) {
                tabs.forEach((tab, i) => {
                    chrome.tabs.sendMessage(tab.id, {
                        target: 'main-content',
                        action: 'SESSION_AVAILABLE',
                        value: true,
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
            group: null,
            sites: [{
                site: 'instagram',
                script: 'instagram',
                siteRegexp: ['http.:\/\/www.instagram.com.*\/*'],
                availableActions: [
                    {
                        name: 'SEARCHES',
                        importName: 'hashtags',
                        hasMenu: true,
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
                        hasMenu: true,
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
                        hasMenu: true,
                        idMenu: 'reports_pulpou_menu',
                        idData: 'reports_sub_menu',
                        data: []

                    },
                    {
                        name: 'IMAGES',
                        importName: 'images',
                        hasMenu: true,
                        idMenu: 'images_pulpou_menu',
                        idData: 'images_sub_menu',
                        data: []
                    },
                    {
                        name: 'Gallery',
                        importName: 'gallery',
                        hasMenu: false,
                        idMenu: null,
                        idData: null,
                        data: []
                    }
                ]
            },
            {
                site: 'stackoverflow',
                script: 'stackoverflow',
                siteRegexp: ['http.:\/\/stackoverflow.com\/.*'],
                availableActions: [
                    {
                        name: 'Gallery',
                        importName: 'gallery',
                        hasMenu: false,
                        idMenu: null,
                        idData: null,
                        data: []
                    }
                ]
            },
            {
                site: 'mercadolibre',
                script: 'mercadolibre',
                siteRegexp: ['http.:\/\/www\.mercadoli[b|v]re\.com.*'],
                availableActions: [
                    {
                        name: 'BUSQUEDAS',
                        importName: 'hashtags',
                        hasMenu: true,
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
                    }
                ]
            }
            ]
        }

        Profile.setUserProfile(profile);
        Profile.setToken("abcdefghi");
        BackgroundLogIn.sendSessionStatus({session: true});
        BackgroundLogIn.updateIcons(true);
    }

    static logOut = () => {
        /* TODO: HACER FETCH PARA DESHABILITAR EL TOKEN*/

        BackgroundLogIn.updateIcons(false);

        /*REMOVEMOS TODA LA INFORMACION*/
        Profile.setToken(false);
        Profile.setUserProfile(false);

        BackgroundLogIn.sendSessionStatus({session:false});
    }

    static updateIcons = (loguedIn) => {

        console.log(`esta logueado?${loguedIn}`);

        if (loguedIn) {
            chrome.tabs.query({}, function (tabs) {

                tabs.forEach(tab => {
                    const matchSite = BackgroundLogIn.findSiteAvailible(tab.url);

                    if (matchSite) {
                        chrome.browserAction.setPopup({
                            tabId: tab.id,
                            popup: 'popup/popup.html'
                        });
                        chrome.browserAction.setIcon({ tabId: tab.id, path: { "128": "popup/images/get_pulpou128.png" } });
                    } else {
                        chrome.browserAction.setPopup({
                            tabId: tab.id,
                            popup: 'popup/popup_not_availible_site.html'
                        });
                        chrome.browserAction.setIcon({ tabId: tab.id, path: { "128": "popup/images/off.png" } });
                    }

                })


            });
        } else {

            chrome.tabs.query({}, function (tabs) {

                tabs.forEach(tab => {
                    chrome.browserAction.setPopup({
                        tabId: tab.id,
                        popup: 'popup/popup.html'
                    });
                    chrome.browserAction.setIcon({ tabId: tab.id, path: { "128": "popup/images/get_pulpou128_disabled.png" } });
                });

            });

        }

    }

    static findSiteAvailible = (siteURL) => {

        if (!Profile.getUserProfile()) return false;

        const sitesAvailibles = (Profile.getUserProfile().sites || []);

        return (sitesAvailibles
            .find(avs => avs.siteRegexp
                .find(s => {
                    let regex = new RegExp(s, "g");
                    return (regex.test(siteURL));
                }
                )) || false);


    }

}