/*
   dnsconfig.js: dnscontrol configuration file for Aetf.
*/

// Providers:

var REG_NONE = NewRegistrar('none', 'NONE');    // No registrar.
var CLOUDFLARE = NewDnsProvider('cloudflare','CLOUDFLAREAPI');

// HOSTS
var IP_ARCHVPS = '45.77.144.92';
var IP_ABACUS = '141.212.111.192';

var ARCHVPS = 'archvps.hosts.unlimited-code.works.';
var ABACUS = 'abacus.hosts.unlimited-code.works.';

// Domains:

D("unlimited-code.works", REG_NONE, DnsProvider(CLOUDFLARE),
    // all host records
    A('archvps.hosts', IP_ARCHVPS),
    A('abacus.hosts', IP_ABACUS),

    // stats records
    CNAME('archvps.stats', ARCHVPS, CF_PROXY_ON),

    // for web server
    A('@', IP_ARCHVPS, CF_PROXY_ON),
    CNAME('www', ARCHVPS, CF_PROXY_ON),

    // qbitorrent UI
    CNAME('bt', ARCHVPS, CF_PROXY_ON),

    // management console
    CNAME('cockpit', ARCHVPS, CF_PROXY_ON),

    // nextcloud
    CNAME('files', ARCHVPS, CF_PROXY_ON),
    CNAME('dav', ARCHVPS, CF_PROXY_ON),

    // jupyter, handled by archvps, but backend is at abacus
    CNAME('jupyter', ARCHVPS, CF_PROXY_ON),

    // SSO login page
    CNAME('login', ARCHVPS, CF_PROXY_ON),

    // syncthing, in addition to the web ui, this is also used by discover and relay server
    // which are on other ports
    CNAME('sync', ARCHVPS),

    // matrix home server related
    CNAME('matrix', ARCHVPS),
    SRV('_matrix-identity._tcp', 10, 0, 443, 'matrix.unlimited-code.works.'),

    // email handling using improvmx.com
    MX('@', 20, 'mx2.improvmx.com.'),
    MX('@', 10, 'mx1.improvmx.com.'),
    TXT('@', 'v=spf1 include:spf.improvmx.com ~all'),

    // left over for mailgun
    TXT('krs._domainkey', 'k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1dtf/Wj14BOMNtFjhWQcO0DmHh5E7YQJ7mEMiC3JwRWT1fPSMNtr2EQVwQuMOdU5hOzG3ni7aurG0CAohWTemp3W3OzuAan3GZkjbZ8jjJWWt6cvl7zBaFse45uuBwCa0ieY282NwzGmoUl/hu0l1U68WdxPhm5KIRG8k/4tmSrvxIgvXeRC411iZzG/BuY5c2+z4OUYwZLDs9NmrKyC/SZb7psqKODRwxDKyBiJnhw60OHjegmHhRnpbkA2NN8GIcHDZtnY2rZEFGstyso022exqd2vf0AVDvxqosKLAAJbULZD1cdzV0k5J8DKH0Yq8o0iJuz4Mjy2hDAdX3dWmQIDAQAB')
);

D("unlimitedcodeworks.xyz", REG_NONE, DnsProvider(CLOUDFLARE),
    // host records
    A('archvps', '45.77.144.92'),
    // stats
    CNAME('stats.archvps', 'archvps.unlimitedcodeworks.xyz.'),

    // web server
    A('@', '45.77.144.92', CF_PROXY_ON),
    CNAME('www', 'unlimitedcodeworks.xyz.', CF_PROXY_ON),

    // syncthing
    CNAME('btsync', 'archvps.unlimitedcodeworks.xyz.'),
    // syncthing ui
    CNAME('bt', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),

    // nextcloud
    CNAME('dav', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
    CNAME('files', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),

    // misc
    CNAME('games', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
    CNAME('game', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
    CNAME('gift', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
    CNAME('test', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),

    // TODO: remove this
    CNAME('static', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),

    CNAME('vpn', 'archvps.unlimitedcodeworks.xyz.'),

    // email handling by improvmx.com
    MX('@', 20, 'mx2.improvmx.com.'),
    MX('@', 10, 'mx1.improvmx.com.'),
    TXT('@', 'v=spf1 include:spf.improvmx.com ~all'),

    // for google analysis
    TXT('@', 'google-site-verification=N74Krrj_GYGUYgHSXUBX735CRdKwNKw736bDUnE-V2U')
);

D("jiahui.id", REG_NONE, DnsProvider(CLOUDFLARE),
    // unused
    A('@', '45.77.144.92'),

    // forward to google site
    A('www', '173.194.206.121'),
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
