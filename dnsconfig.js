/*
   dnsconfig.js: dnscontrol configuration file for Aetf.
*/

// Providers
var REG_NONE = NewRegistrar('none');    // No registrar.
var CLOUDFLARE = NewDnsProvider('cloudflare');

// Static hosts
var IP_ARCHVPS = '45.77.144.92';
var IP_ABACUS = '141.212.111.192';
var IP_JIAHUI_GOOGLE_SITE = '173.194.206.121';

// ZeroTier hosts
var ZT_HOSTS = [
    ['Abacus', '10.144.94.148'],
    ['Aetf-Arch-XPS', '10.144.175.24'],
    ['Aetf-Arch-Mac', '10.144.70.238'],
    ['Aetf-MacbookPro', '10.144.232.243'],
    ['OnePlus6T', '10.144.160.97'],
    ['Aetf-Laptop', '10.144.127.147'],
    ['Aetf-Arch-VPS', '10.144.160.212'],
    ['Aetf-Arch-Homelab', '10.144.180.10'],
    ['haos', '10.144.84.129'],
].map(function(elem) {
    return A(elem[0] + '.zt', elem[1])
});

// Host constants
var ARCHVPS = 'archvps.hosts.unlimited-code.works.';
var ABACUS = 'abacus.hosts.unlimited-code.works.';

// email handling using Google Workspace
var EMAIL_SETTINGS = [
    // incoming router using Google Workspace
    MX('@', 1, 'ASPMX.L.GOOGLE.COM.', TTL('1h')),
    MX('@', 5, 'ALT1.ASPMX.L.GOOGLE.COM.', TTL('1h')),
    MX('@', 5, 'ALT2.ASPMX.L.GOOGLE.COM.', TTL('1h')),
    MX('@', 10, 'ALT3.ASPMX.L.GOOGLE.COM.', TTL('1h')),
    MX('@', 10, 'ALT4.ASPMX.L.GOOGLE.COM.', TTL('1h')),
    SPF_BUILDER({
        label: '@',
        overflow: "_spf%d",
        overhead1: "20",
        parts: [
            'v=spf1',
            // allow sending using google's SMTP server
            'include:_spf.google.com',
            '~all',
        ],
        flatten: [],
        ttl: '1h'
    }),
    // DKIM, the public key is generated in k8s
    TXT('k8s._domainkey', [
        'v=DKIM1; p=',
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuzTvyPAmNw5A3UK+60qy",
        "FZ1bxydUZPqZ93+Y/iTQdYPK8GjHs/RpnbBwCUMuHqjcjgm6c2pCKPxIGPjBSfzT",
        "cX4KaMb3dG+dios0H9g8wgXT8k1uimMibfIkCir7gxWxPS+hDnUA3/WSbaLHqJIF",
        "Du/Wi+QtthXY16gzIVU+V7Z0UwB97uKZTypBDOT8USlwJwqe8GFSsQenqJ2YiQFf",
        "IeVrnRIeaNuhyi6zGdNIXSXslvZL4FOENzELciJ2WHOSXHattqJ5G/FiOWiA9QI+",
        "66KRIFQ7Hjc5DtUOURyfTykH6HgDxDUXHMqMl4qfY5UV5S83K+rLITWCCZGbz2HJ",
        "rQIDAQAB",
    ].join('')),
    DMARC_BUILDER({
        policy: 'quarantine',
        alignmentSPF: 'strict',
        alignmentDKIM: 'strict',
        rua: [
            'mailto:dmarc-reports@unlimited-code.works',
        ]
    }),
];

// Domains
D("unlimited-code.works", REG_NONE, DnsProvider(CLOUDFLARE),
    // all host records
    A('archvps.hosts', IP_ARCHVPS),
    A('abacus.hosts', IP_ABACUS),

    ZT_HOSTS,

    // auth portal
    CNAME('auth', ARCHVPS, CF_PROXY_ON),

    // k8s portal
    CNAME('k8s', ARCHVPS, CF_PROXY_ON),
    // k8s monitoring
    CNAME('mon', ARCHVPS, CF_PROXY_ON),

    // photos service
    CNAME('photos', ARCHVPS, CF_PROXY_ON),

    // stats records
    CNAME('archvps.stats', ARCHVPS),

    // for web server
    A('@', IP_ARCHVPS, CF_PROXY_ON),
    CNAME('www', ARCHVPS, CF_PROXY_ON),

    // qbitorrent UI
    CNAME('bt', ARCHVPS, CF_PROXY_ON),

    // management console
    //CNAME('cockpit', ARCHVPS, CF_PROXY_ON),

    // nextcloud
    CNAME('files', ARCHVPS, CF_PROXY_ON),
    CNAME('dav', ARCHVPS, CF_PROXY_ON),

    // jupyter, handled by archvps, but backend is at abacus
    CNAME('jupyter', ARCHVPS, CF_PROXY_ON),

    // minecraft server, which uses non http ports so no cf proxy
    CNAME('mc', ARCHVPS),
    CNAME('mcmap', ARCHVPS),

    // SSO login page
    CNAME('login', ARCHVPS, CF_PROXY_ON),

    // syncthing, in addition to the web ui, this is also used by discover and relay server
    // which are on other ports
    CNAME('sync', ARCHVPS, CF_PROXY_ON),
    CNAME('syncapi', ARCHVPS),

    // matrix home server related
    CNAME('matrix', ARCHVPS),
    SRV('_matrix-identity._tcp', 10, 0, 443, 'matrix.unlimited-code.works.'),

    // test
    CNAME('test', ARCHVPS),

    // Home assistant
    CNAME('haos', ARCHVPS, CF_PROXY_ON),

    // Jellyfin
    CNAME('tube', ARCHVPS, CF_PROXY_ON),

    // Email settings, google domainkey must be unique for each domain
    EMAIL_SETTINGS,
    TXT('google._domainkey', [
        'v=DKIM1; k=rsa; p=',
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCB9A/w8c0RjwW3q75z2gKp36XdkSJw/76R',
        'EGqcowEvFZMysz3JTsjCnErawdQytLTzs9a6Tz3i0Lgx1z9uCOD+xHIiE2zbTyY3Wyb8YZiX',
        '4K6nAbgjUoxtTS4BwiMrRpHjvtWJ3Kq4hAZyr9wyWaJ5Coglk4SQAhFW8DFz550HyQIDAQAB',
    ].join('')),

    // for google analysis
    TXT('@', 'google-site-verification=u5QSDhgnrgdr-ojW6yDGKD9fM3jJIzFnYxElzH9DNDI', TTL(3600)),
    // for google workspace
    TXT('@', 'google-site-verification=ITwgKBtamT013cCC7wPlM0N2Rloca0feIiYV4Q11dyI', TTL(3600))
);

D("unlimitedcodeworks.xyz", REG_NONE, DnsProvider(CLOUDFLARE),
    // web server
    A('@', '45.77.144.92', CF_PROXY_ON),
    CNAME('www', ARCHVPS, CF_PROXY_ON),

    // syncthing
    CNAME('btsync', ARCHVPS),

    // misc
    CNAME('games', ARCHVPS, CF_PROXY_ON),
    CNAME('game', ARCHVPS, CF_PROXY_ON),

    // email settings shared between unlimitedcodeworks.xyz and unlimited-code.works
    // google domainkey must be unique for each domain
    EMAIL_SETTINGS,
    TXT('google._domainkey', [
        'v=DKIM1; k=rsa; p=',
        'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCOPxdlkUm47Ee6y/Y4Icg5OtwU0MzQhe/K',
        'g0eI8crEXiOwFw1pMmBBXwhaEdHGwj3dQJhsdvZzUGLgaSu6bK0zCZOGEISF8zUDrJD7SL9c',
        '+1hspRFvzzdrOnRnVsqz3ijxeg4Z6iIjLbdTvApAVZCWo05eZIDm4CZ8syLpnjYi5QIDAQAB',
    ].join('')),

    // for google analysis
    TXT('@', 'google-site-verification=N74Krrj_GYGUYgHSXUBX735CRdKwNKw736bDUnE-V2U', TTL(3600)),
    // for google workspace
    TXT('@', 'google-site-verification=UtkDDgsgiGtS-w7Fg4DyiaFFVQOgmM5nJvLnRbCFXjc', TTL(3600))
);

D("jiahui.id", REG_NONE, DnsProvider(CLOUDFLARE),
    // forward to google site
    A('@', IP_JIAHUI_GOOGLE_SITE),
    A('www', IP_JIAHUI_GOOGLE_SITE),
    TXT('@', 'google-site-verification=PyY9W6ikS_voZGQE3i_JGRNPvMUw5o2QNyGxpnRxSoU'),
    TXT('@', 'google-site-verification=y6Df9QsIorwAdC8bsyCBMtlu3HpzPqppgM7syZsBTyo'),

    // email handling by namecheap
    MX('@', 10, 'eforward3.registrar-servers.com.'),
    MX('@', 15, 'eforward4.registrar-servers.com.'),
    MX('@', 10, 'eforward1.registrar-servers.com.'),
    MX('@', 10, 'eforward2.registrar-servers.com.'),
    MX('@', 20, 'eforward5.registrar-servers.com.'),
    TXT('@', 'v=spf1 include:spf.efwd.registrar-servers.com ~all')
);

D("jiahui.love", REG_NONE, DnsProvider(CLOUDFLARE),
    // forward everything to archvps
    A('@', IP_ARCHVPS, CF_PROXY_ON),

    CNAME('www', 'jiahui.love.', CF_PROXY_ON),
    CNAME('gift', 'jiahui.love.', CF_PROXY_ON),
    CNAME('ji', 'jiahui.love.', CF_PROXY_ON),
    CNAME('peifeng', 'jiahui.love.', CF_PROXY_ON)
);

['peifeng.phd', 'ucw.phd'].forEach(function(domain) {
    D(domain, REG_NONE, DnsProvider(CLOUDFLARE),
        // all host records
        A('archvps.hosts', IP_ARCHVPS),
        A('abacus.hosts', IP_ABACUS),

        ZT_HOSTS,

        // auth portal
        CNAME('auth', ARCHVPS, CF_PROXY_ON),

        // k8s portal
        CNAME('k8s', ARCHVPS, CF_PROXY_ON),
        // k8s monitoring
        CNAME('mon', ARCHVPS, CF_PROXY_ON),

        // photos service
        CNAME('photos', ARCHVPS, CF_PROXY_ON),

        // for web server
        A('@', IP_ARCHVPS, CF_PROXY_ON),
        CNAME('www', ARCHVPS, CF_PROXY_ON),

        // qbitorrent UI
        CNAME('bt', ARCHVPS, CF_PROXY_ON),

        // management console
        //CNAME('cockpit', ARCHVPS, CF_PROXY_ON),

        // nextcloud
        CNAME('files', ARCHVPS, CF_PROXY_ON),
        CNAME('dav', ARCHVPS, CF_PROXY_ON),

        // jupyter, handled by archvps, but backend is at abacus
        CNAME('jupyter', ARCHVPS, CF_PROXY_ON),

        // minecraft server, which uses non http ports so no cf proxy
        CNAME('mc', ARCHVPS),
        CNAME('mcmap', ARCHVPS),

        // SSO login page
        CNAME('login', ARCHVPS, CF_PROXY_ON),

        // syncthing, in addition to the web ui, this is also used by discover and relay server
        // which are on other ports
        CNAME('sync', ARCHVPS, CF_PROXY_ON),
        CNAME('syncapi', ARCHVPS),

        // matrix home server related
        CNAME('matrix', ARCHVPS),
        SRV('_matrix-identity._tcp', 10, 0, 443, 'matrix.unlimited-code.works.'),

        // test
        CNAME('test', ARCHVPS),

        // Home assistant
        CNAME('haos', ARCHVPS, CF_PROXY_ON),

        // Jellyfin
        CNAME('tube', ARCHVPS, CF_PROXY_ON)
    );
});
