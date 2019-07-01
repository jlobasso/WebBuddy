/*TODO: HACER EL LOGIN Y GUARDAR PROFILE EN LOCAL STORAGE*/
/*TODO: REVISAR SESSION? */

class BackgroundLogIn {
    constructor() {
    }

    static checkSession = async () => {

        this.userToken = await Profile.getUserToken();
        this.userProfile = await Profile.getUserProfile();

        if (!userToken || !userProfile) {
            BackgroundLogIn.updateIcons(false);
            BackgroundLogIn.sendSessionStatus({ session: false });
        }
        else {
            BackgroundLogIn.updateIcons(true);
            BackgroundLogIn.sendSessionStatus({ session: true });
        }

    }

    static sendSessionStatus = async (status) => {

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
                        value: false
                    });
                });
            });
        } else {

            const profile = await Profile.getUserProfile();

            /* INFORMAMOS AL POPUP QUE HAY SESSION*/
            chrome.runtime.sendMessage({
                target: 'popup',
                action: 'SESSION_AVAILABLE',
                value: true,
                username: profile.username
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

        //TODO: REEMPLAZAR PROFILE Y TOKEN POR UNO VERDADERO
        Profile.setUserProfile(profile);
        Profile.setUserToken("abcdefghi");
        BackgroundLogIn.sendSessionStatus({ session: true });
        BackgroundLogIn.updateIcons(true);
    }

    static logOut = () => {
        /* TODO: HACER FETCH PARA DESHABILITAR EL TOKEN*/

        BackgroundLogIn.updateIcons(false);

        /*REMOVEMOS TODA LA INFORMACION*/
        Profile.setUserToken(false);
        Profile.setUserProfile(false);

        BackgroundLogIn.sendSessionStatus({ session: false });
    }

    static updateIcons = (loguedIn) => {

        if (loguedIn) {
            chrome.tabs.query({}, function (tabs) {

                tabs.forEach(async (tab) => {
                    const matchSite = await BackgroundLogIn.findSiteAvailible(tab.url);

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

    //TODO HAY QUE HACER ESTA FUNCION NO ASINCRONA.

    static findSiteAvailible = async (siteURL) => {

        const profile = await Profile.getUserProfile();

        if (!profile) return false;

        const sitesAvailibles = (profile.sites || []);

        return (sitesAvailibles
            .find(avs => avs.siteRegexp
                .find(s => {
                    let regex = new RegExp(s, "g");
                    return (regex.test(siteURL));
                }
                )) || false);


    }

}