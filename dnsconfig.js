/*
   dnsconfig.js: dnscontrol configuration file for ORGANIZATION NAME.
*/

// Providers:

var REG_NONE = NewRegistrar('none', 'NONE');    // No registrar.
var CLOUDFLARE = NewDnsProvider('cloudflare','CLOUDFLAREAPI');

// HOSTS
var IP_ARCHVPS = '45.77.144.92';
var IP_ABACUS = 'abacus.eecs.umich.edu';

var ARCHVPS = 'archvps.hosts.unlimited-code.works.';
var ABACUS = 'abacus.hosts.unlimited-code.works.';

// Domains:

D("unlimited-code.works", REG_NONE, DnsProvider(CLOUDFLARE),
    // all host records
    A('archvps.hosts', '45.77.144.92'),
    CNAME('abacus.hosts', 'abacus.eecs.umich.edu.'),

    // stats records
    CNAME('archvps.stats', 'archvps.hosts.unlimited-code.works.', CF_PROXY_ON),

    // for web server
    A('@', '45.77.144.92', CF_PROXY_ON),
    CNAME('www', 'archvps.hosts.unlimited-code.works.', CF_PROXY_ON),

    CNAME('bt', 'archvps.hosts.unlimited-code.works.', CF_PROXY_ON),
    CNAME('cockpit', 'archvps.hosts.unlimited-code.works.', CF_PROXY_ON),
    CNAME('dav', 'archvps.hosts.unlimited-code.works.'),
    CNAME('files', 'archvps.hosts.unlimited-code.works.', CF_PROXY_ON),
    CNAME('jupyter', 'archvps.hosts.unlimited-code.works.', CF_PROXY_ON),
    CNAME('login', 'archvps.hosts.unlimited-code.works.', CF_PROXY_ON),
    CNAME('matrix', 'archvps.hosts.unlimited-code.works.'),
    CNAME('sync', 'archvps.hosts.unlimited-code.works.'),

    MX('@', 20, 'mx2.improvmx.com.'),
    MX('@', 10, 'mx1.improvmx.com.'),
    TXT('@', 'v=spf1 include:spf.improvmx.com ~all'),

    SRV('_matrix-identity._tcp', 10, 0, 443, 'matrix.unlimited-code.works.'),

    TXT('krs._domainkey', 'k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1dtf/Wj14BOMNtFjhWQcO0DmHh5E7YQJ7mEMiC3JwRWT1fPSMNtr2EQVwQuMOdU5hOzG3ni7aurG0CAohWTemp3W3OzuAan3GZkjbZ8jjJWWt6cvl7zBaFse45uuBwCa0ieY282NwzGmoUl/hu0l1U68WdxPhm5KIRG8k/4tmSrvxIgvXeRC411iZzG/BuY5c2+z4OUYwZLDs9NmrKyC/SZb7psqKODRwxDKyBiJnhw60OHjegmHhRnpbkA2NN8GIcHDZtnY2rZEFGstyso022exqd2vf0AVDvxqosKLAAJbULZD1cdzV0k5J8DKH0Yq8o0iJuz4Mjy2hDAdX3dWmQIDAQAB')
);

D("unlimitedcodeworks.xyz", REG_NONE, DnsProvider(CLOUDFLARE),
        A('archvps', '45.77.144.92'),
        A('@', '45.77.144.92', CF_PROXY_ON),
        CNAME('btsync', 'archvps.unlimitedcodeworks.xyz.'),
        CNAME('bt', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
        CNAME('dav', 'archvps.unlimitedcodeworks.xyz.'),
        CNAME('files', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
        CNAME('games', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
        CNAME('game', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
        CNAME('gift', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
        CNAME('static', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
        CNAME('stats.archvps', 'archvps.unlimitedcodeworks.xyz.'),
        CNAME('test', 'archvps.unlimitedcodeworks.xyz.', CF_PROXY_ON),
        CNAME('vpn', 'archvps.unlimitedcodeworks.xyz.'),
        CNAME('www', 'unlimitedcodeworks.xyz.', CF_PROXY_ON),
        MX('@', 20, 'mx2.improvmx.com.'),
        MX('@', 10, 'mx1.improvmx.com.'),
        TXT('@', 'v=spf1 include:spf.improvmx.com ~all'),
        TXT('@', 'google-site-verification=N74Krrj_GYGUYgHSXUBX735CRdKwNKw736bDUnE-V2U')
);

D("jiahui.id", REG_NONE,
        DnsProvider(CLOUDFLARE),
        A('@', '45.77.144.92'),
        A('www', '173.194.206.121'),
        MX('@', 10, 'eforward3.registrar-servers.com.'),
        MX('@', 15, 'eforward4.registrar-servers.com.'),
        MX('@', 10, 'eforward1.registrar-servers.com.'),
        MX('@', 10, 'eforward2.registrar-servers.com.'),
        MX('@', 20, 'eforward5.registrar-servers.com.'),
        TXT('@', 'v=spf1 include:spf.efwd.registrar-servers.com ~all'),
        TXT('@', 'google-site-verification=PyY9W6ikS_voZGQE3i_JGRNPvMUw5o2QNyGxpnRxSoU'),
        TXT('@', 'google-site-verification=y6Df9QsIorwAdC8bsyCBMtlu3HpzPqppgM7syZsBTyo')
);

D("jiahui.love", REG_NONE,
        DnsProvider(CLOUDFLARE),
        A('@', IP_ARCHVPS, CF_PROXY_ON),

        CNAME('www', 'jiahui.love.', CF_PROXY_ON),
        CNAME('gift', 'jiahui.love.', CF_PROXY_ON),
        CNAME('ji', 'jiahui.love.', CF_PROXY_ON),
        CNAME('peifeng', 'jiahui.love.', CF_PROXY_ON)
);
