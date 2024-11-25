/*
Linkumori(URLs Purifier)
Copyright (C) 2024 Subham Mahesh

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
export const parameterRules = [
    {
        removeParams: [
            "Echobox", "__hsfp", "__hssc", "__hstc",
            "__s", "__twitter_impression", "_ga", "_gl",
            "_hsenc", "_openstat", "action_object_map", "action_type_map",
            "ceneo_spo", "cmpid", "dclid", "fb_action_ids",
            "fb_action_types", "fb_ref", "fb_source", "fbclid",
            "ga_campaign", "ga_content", "ga_medium", "ga_source",
            "ga_term", "gclid", "gs_l", "hmb_campaign",
            "hmb_medium", "hmb_source", "hsCtaTracking", "itm_campaign",
            "itm_medium", "itm_source", "mc_", "mc_cid",
            "mc_eid", "mc_tc", "mkt_tok", "ml_subscriber",
            "ml_subscriber_hash", "msclkid", "mtm_campaign", "mtm_cid",
            "mtm_content", "mtm_group", "mtm_keyword", "mtm_medium",
            "mtm_placement", "mtm_source", "oly_anon_id", "oly_enc_id",
            "os_ehash", "otm_campaign", "otm_content", "otm_medium",
            "otm_source", "otm_term", "rb_clickid", "s_cid",
            "spm", "tracking_source", "twclid", "utm_campaign",
            "utm_content", "utm_id", "utm_medium", "utm_name",
            "utm_referrer", "utm_source", "utm_term", "vero_conv",
            "vero_id", "vn_", "wickedid", "wt_mc",
            "wtrid", "yclid"
        ]
    },
    {
        domain: "1password.university",
        removeParams: [
            "utm_ref"
        ]
    },
    {
        domain: "3movs.com",
        removeParams: [
            "site_id"
        ]
    },
    {
        domain: "7net.omni7.jp",
        removeParams: [
            "intpr", "intpr2"
        ]
    },
    {
        domain: "9gag.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "academic.oup",
        removeParams: [
            "redirectedFrom"
        ]
    },
    {
        domain: "ad.admitad.com",
        removeParams: [
            "/^subid/"
        ]
    },
    {
        domain: "ad.doubleclick.net",
        removeParams: [
            "/^dc_trk_/"
        ]
    },
    {
        domain: "adguard.com",
        removeParams: [
            "clid"
        ]
    },
    {
        domain: "adj.st",
        removeParams: [
            "CollectionId", "adj_adgroup", "adj_adnomia_click_id", "adj_campaign",
            "adj_creative", "adj_deeplink", "adj_event_callback_dn2j7g_5mdnim", "adj_install_callback",
            "adjust_deeplink", "pd", "pfx", "pt"
        ]
    },
    {
        domain: "adjust.com",
        removeParams: [
            "adgroup"
        ]
    },
    {
        domain: "adorama.com",
        removeParams: [
            "bc_pid", "obem"
        ]
    },
    {
        domain: "ads.tiktok.com",
        removeParams: [
            "_source_", "cacheSDK", "region"
        ]
    },
    {
        domain: "adshares.net",
        removeParams: [
            "cid"
        ]
    },
    {
        domain: "adweek.com",
        removeParams: [
            "traffic_source"
        ]
    },
    {
        domain: "agata88.com",
        removeParams: [
            "source"
        ]
    },
    {
        domain: "agoda.com",
        removeParams: [
            "tag"
        ]
    },
    {
        domain: "airbnb.com",
        removeParams: [
            "federated_search_id", "search_type", "source", "source_impression_id"
        ]
    },
    {
        domain: "aktualne.cz",
        removeParams: [
            "dop_ab_variant", "dop_id", "dop_req_id", "dop_source_zone_name"
        ]
    },
    {
        domain: "aliexpress.com",
        removeParams: [
            "af", "aff_fcid", "aff_fsk", "aff_platform",
            "aff_request_id", "aff_short_key", "aff_trace_key", "algo_expid",
            "algo_pvid", "btsid", "curPageLogUid", "cv",
            "dp", "gps-id", "mall_affr", "pdp_npi",
            "pvid", "scm", "scm-url", "scm[_a-z-]*",
            "scm_id", "sk", "spm", "terminal_id",
            "utparam", "ws_ab_test"
        ]
    },
    {
        domain: "aliyun.com",
        removeParams: [
            "scm"
        ]
    },
    {
        domain: "allabout.co.jp",
        removeParams: [
            "FM"
        ]
    },
    {
        domain: "allegro.pl",
        removeParams: [
            "reco_id", "sid"
        ]
    },
    {
        domain: "allrecipes.com",
        removeParams: [
            "clickId", "internalSource", "referringContentType", "referringId"
        ]
    },
    {
        domain: "alternate.de",
        removeParams: [
            "campaign", "idealoid", "partner"
        ]
    },
    {
        domain: "alza.de",
        removeParams: [
            "kampan"
        ]
    },
    {
        domain: "am730.com.hk",
        removeParams: [
            "ncid"
        ]
    },
    {
        domain: "ameblo.jp",
        removeParams: [
            "adxarea", "frm_id"
        ]
    },
    {
        domain: "announcements.bybit.com",
        removeParams: [
            "pid", "sa_utm_channel", "sa_utm_ci", "sa_utm_tcn"
        ]
    },
    {
        domain: "app.5-delivery.ru",
        removeParams: [
            "c", "pid"
        ]
    },
    {
        domain: "app.adjust.com",
        removeParams: [
            "campaign", "creative", "install_callback", "ip_address",
            "nend_click_id", "user_agent"
        ]
    },
    {
        domain: "app.mi.com",
        removeParams: [
            "appClientId", "appSignature", "nonce", "ref"
        ]
    },
    {
        domain: "apple.com",
        removeParams: [
            "afid", "app", "cid", "ct",
            "ign-itsc[a-z]+", "pt"
        ]
    },
    {
        domain: "applesfera.com",
        removeParams: [
            "NID"
        ]
    },
    {
        domain: "approach.yahoo.co.jp",
        removeParams: [
            "code"
        ]
    },
    {
        domain: "arcelik.com.tr",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "argos.co.uk",
        removeParams: [
            "clickOrigin", "istBid", "istCompanyId", "istFeedId",
            "istItemId"
        ]
    },
    {
        domain: "arms-retcode.aliyuncs",
        removeParams: [
            "_v", "api", "begin", "behavior",
            "c2", "c3", "code", "ct",
            "dl", "enableLinkTrace", "enableSPA", "environment",
            "flag", "msg", "page", "pid",
            "post_res", "pv_id", "release", "sample",
            "sampling", "sr", "success", "tag",
            "traceId", "uid", "vp"
        ]
    },
    {
        domain: "asahi.com",
        removeParams: [
            "cid", "iref", "ref"
        ]
    },
    {
        domain: "atlassian.net",
        removeParams: [
            "atlOrigin"
        ]
    },
    {
        domain: "audible.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "aufast.co",
        removeParams: [
            "/^utm_/", "clickid"
        ]
    },
    {
        domain: "autoplus.fr",
        removeParams: [
            "dr_tracker", "hash", "idprob", "sending_id",
            "site_id"
        ]
    },
    {
        domain: "avira.com",
        removeParams: [
            "track"
        ]
    },
    {
        domain: "awaliwa.com",
        removeParams: [
            "acr", "bd_vid", "c", "lg",
            "old", "s", "z"
        ]
    },
    {
        domain: "awin1.com",
        removeParams: [
            "awinaffid", "clickref", "linkid"
        ]
    },
    {
        domain: "azby.fmworld.net",
        removeParams: [
            "mc_pc"
        ]
    },
    {
        domain: "backcountry.com",
        removeParams: [
            "CMP_ID", "CMP_SKU", "INT_ID", "MER",
            "fl", "iv_", "k_clickid", "mr:adType",
            "mr:device", "mr:trackingCode", "rmatt", "ti"
        ]
    },
    {
        domain: "bahn.de",
        removeParams: [
            "dbkanal_[0-9]{3}"
        ]
    },
    {
        domain: "baidu.com",
        removeParams: [
            "eqid", "rsv_pq", "rsv_t"
        ]
    },
    {
        domain: "bandcamp.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "banggood.com",
        removeParams: [
            "utmid"
        ]
    },
    {
        domain: "basketballking.jp",
        removeParams: [
            "cx_art"
        ]
    },
    {
        domain: "bbc.com",
        removeParams: [
            "at_[a-z_]+", "at_bbc_team", "facebook_page", "xtor"
        ]
    },
    {
        domain: "beacon-recommend.tower.jp",
        removeParams: [
            "tracking_id"
        ]
    },
    {
        domain: "belta.co.jp",
        removeParams: [
            "cid"
        ]
    },
    {
        domain: "bestbuy.com",
        removeParams: [
            "acampID", "intl", "irclickid", "irgwc",
            "loc", "mpid"
        ]
    },
    {
        domain: "bigfishgames.com",
        removeParams: [
            "npc", "npi", "npv[0-9]+", "pc"
        ]
    },
    {
        domain: "bild.de",
        removeParams: [
            "t_ref"
        ]
    },
    {
        domain: "bilibili.com",
        removeParams: [
            "buvid", "callback", "from", "from_source",
            "from_spm_id", "is_story_h5", "mid", "msource",
            "plat_id", "refer_from", "seid", "share_from",
            "share_medium", "share_plat", "share_session_id", "share_source",
            "share_tag", "spm_id_from", "timestamp", "unique_k",
            "up_id", "vd_source"
        ]
    },
    {
        domain: "billiger.de",
        removeParams: [
            "log", "p"
        ]
    },
    {
        domain: "bing.com",
        removeParams: [
            "PC", "adppc", "cvid", "form",
            "gs_lcrp", "qp", "qs", "sc",
            "sk", "sp"
        ]
    },
    {
        domain: "bizhint.jp",
        removeParams: [
            "trcd"
        ]
    },
    {
        domain: "bloculus.com",
        removeParams: [
            "tl_[a-z_]+"
        ]
    },
    {
        domain: "blog.twitch.tv",
        removeParams: [
            "web_only"
        ]
    },
    {
        domain: "blogmura.com",
        removeParams: [
            "p_cid"
        ]
    },
    {
        domain: "blogtrottr.com",
        removeParams: [
            "lctg"
        ]
    },
    {
        domain: "bloomberg.com",
        removeParams: [
            "in_source", "leadSource", "sref", "srnd"
        ]
    },
    {
        domain: "boards.greenhouse.io",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "boncharge.com",
        removeParams: [
            "shpxid"
        ]
    },
    {
        domain: "boomstore.de",
        removeParams: [
            "campaign"
        ]
    },
    {
        domain: "booster.osnova.io",
        removeParams: [
            "boosterUid", "place"
        ]
    },
    {
        domain: "boredpanda.com",
        removeParams: [
            "cexp_id", "cexp_var", "h"
        ]
    },
    {
        domain: "brazzers.com",
        removeParams: [
            "ats"
        ]
    },
    {
        domain: "bunte.de",
        removeParams: [
            "umt_source"
        ]
    },
    {
        domain: "buzzfeednews.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "cafepedagogique.net",
        removeParams: [
            "actCampaignType", "actId", "actSource"
        ]
    },
    {
        domain: "cam4.com",
        removeParams: [
            "act", "showSignupPopup", "suid"
        ]
    },
    {
        domain: "camcam.cc",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "campaigns-serving.cognativex.com",
        removeParams: [
            "device_code", "exc_ads", "history_adids", "history_postids"
        ]
    },
    {
        domain: "cancanlah.com",
        removeParams: [
            "click_id"
        ]
    },
    {
        domain: "carousell.sg",
        removeParams: [
            "t-id", "t-referrer_browse_type", "t-referrer_category_id", "t-referrer_page_type",
            "t-referrer_request_id", "t-referrer_search_query", "t-referrer_search_query_source", "t-referrer_sort_by",
            "t-referrer_source", "t-source", "t-tap_index"
        ]
    },
    {
        domain: "carseven.co.jp",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "cc.loginfra.com",
        removeParams: [
            "a", "bw", "nsc", "px",
            "py", "sx", "sy"
        ]
    },
    {
        domain: "cc.naver.com",
        removeParams: [
            "bw", "px", "py", "sx",
            "sy"
        ]
    },
    {
        domain: "cell.com",
        removeParams: [
            "_returnURL"
        ]
    },
    {
        domain: "ceneo.com",
        removeParams: [
            "tag"
        ]
    },
    {
        domain: "change.com",
        removeParams: [
            "psf_variant", "share_intent", "source_location"
        ]
    },
    {
        domain: "chemistwarehouse.com.au",
        removeParams: [
            "ranEAID", "ranMID", "ranSiteID"
        ]
    },
    {
        domain: "chitai-gorod.ru",
        removeParams: [
            "partnerId"
        ]
    },
    {
        domain: "cht.com.tw",
        removeParams: [
            "Identifier", "Source"
        ]
    },
    {
        domain: "chunichi.co.jp",
        removeParams: [
            "rct", "ref"
        ]
    },
    {
        domain: "cinematoday.jp",
        removeParams: [
            "g_clk"
        ]
    },
    {
        domain: "click.linksynergy.com",
        removeParams: [
            "u1", "u2"
        ]
    },
    {
        domain: "click.speee-ad.jp",
        removeParams: [
            "os", "ref", "sess_id", "slot_index",
            "v"
        ]
    },
    {
        domain: "clickfunnels.com",
        removeParams: [
            "aff_sub"
        ]
    },
    {
        domain: "clickserve.dartsearch.net",
        removeParams: [
            "ds_s_kwgid", "lid"
        ]
    },
    {
        domain: "cloud.baidu.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "cmswire.com",
        removeParams: [
            "source"
        ]
    },
    {
        domain: "cnbc.com",
        removeParams: [
            "__source", "par"
        ]
    },
    {
        domain: "cnet.com",
        removeParams: [
            "ftag"
        ]
    },
    {
        domain: "cnn.co.jp",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "coconala.com",
        removeParams: [
            "ref", "ref_kind", "ref_no"
        ]
    },
    {
        domain: "cod.bitrec.com",
        removeParams: [
            "externalVisitorId", "r", "visitorId"
        ]
    },
    {
        domain: "column.sp.baseball.findfriends.jp",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "comodo.com",
        removeParams: [
            "af", "key5sk1", "track"
        ]
    },
    {
        domain: "controld.com",
        removeParams: [
            "cid"
        ]
    },
    {
        domain: "coolapk.com",
        removeParams: [
            "shareFrom", "shareUid"
        ]
    },
    {
        domain: "coolblue.nl",
        removeParams: [
            "PHGref", "clickref", "cmt", "ref"
        ]
    },
    {
        domain: "cosse.de",
        removeParams: [
            "referer", "sPartner"
        ]
    },
    {
        domain: "coupang.com",
        removeParams: [
            "q", "searchId", "traceid", "wPcid",
            "wRef", "wTime"
        ]
    },
    {
        domain: "coursera.org",
        removeParams: [
            "siteID"
        ]
    },
    {
        domain: "creativecloud.adobe.com",
        removeParams: [
            "trackingid"
        ]
    },
    {
        domain: "crunchyroll.com",
        removeParams: [
            "referrer", "return_url", "srsltid"
        ]
    },
    {
        domain: "cyber-ad01.cc",
        removeParams: [
            "ip"
        ]
    },
    {
        domain: "cyber.sports.ru",
        removeParams: [
            "p_a", "p_c", "p_n"
        ]
    },
    {
        domain: "cyberlink.com",
        removeParams: [
            "affid"
        ]
    },
    {
        domain: "d-markets.net",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "d.odsyms15.com",
        removeParams: [
            "article_id", "ext.referrer", "uid.p"
        ]
    },
    {
        domain: "dailycodingproblem.com",
        removeParams: [
            "email"
        ]
    },
    {
        domain: "dailymail.co.uk",
        removeParams: [
            "ito"
        ]
    },
    {
        domain: "dailymotion.com",
        removeParams: [
            "ads_params", "origin"
        ]
    },
    {
        domain: "daohang.qq.com",
        removeParams: [
            "fr"
        ]
    },
    {
        domain: "darkfans.com",
        removeParams: [
            "af", "ref"
        ]
    },
    {
        domain: "dashboard.wedare.pl",
        removeParams: [
            "smc1", "smc2"
        ]
    },
    {
        domain: "deepl.com",
        removeParams: [
            "cta"
        ]
    },
    {
        domain: "deeplearning.com",
        removeParams: [
            "_hsenc", "_hsmi", "ecid"
        ]
    },
    {
        domain: "deezer.com",
        removeParams: [
            "deferredFl", "origin"
        ]
    },
    {
        domain: "defenseone.com",
        removeParams: [
            "oref"
        ]
    },
    {
        domain: "dell.com",
        removeParams: [
            "gacd"
        ]
    },
    {
        domain: "dengekionline.com",
        removeParams: [
            "osusume_banner"
        ]
    },
    {
        domain: "dhits.docomo.ne.jp",
        removeParams: [
            "affiliate"
        ]
    },
    {
        domain: "diepresse.com",
        removeParams: [
            "from", "xt_at", "xtor"
        ]
    },
    {
        domain: "dietpartner.jp",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "digikey.com",
        removeParams: [
            "/^utm_cid/"
        ]
    },
    {
        domain: "disq.us",
        removeParams: [
            "cuid"
        ]
    },
    {
        domain: "dmkt-sp.jp",
        removeParams: [
            "impressionId"
        ]
    },
    {
        domain: "dmm.co.jp",
        removeParams: [
            "dmmref", "i3_ord", "i3_ref"
        ]
    },
    {
        domain: "docs.yandex",
        removeParams: [
            "uid"
        ]
    },
    {
        domain: "doctolib.de",
        removeParams: [
            "utm_button", "utm_content-group", "utm_page-url", "utm_website"
        ]
    },
    {
        domain: "doda.jp",
        removeParams: [
            "fm", "from", "recommendID", "usrclk",
            "usrclk_searchListCassette"
        ]
    },
    {
        domain: "donation.yahoo.co.jp",
        removeParams: [
            "cpt_c", "cpt_m", "cpt_n", "cpt_s"
        ]
    },
    {
        domain: "donga.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "douban.com",
        removeParams: [
            "_i", "dt_platform"
        ]
    },
    {
        domain: "douyin.com",
        removeParams: [
            "extra_params", "previous_page"
        ]
    },
    {
        domain: "download.mozilla.org",
        removeParams: [
            "attribution_code", "attribution_sig"
        ]
    },
    {
        domain: "dragonquest.jp",
        removeParams: [
            "_bdld"
        ]
    },
    {
        domain: "duckduckgo.com",
        removeParams: [
            "ad_domain", "ad_provider", "ad_type", "parent_perf_id",
            "perf_id", "t", "vis"
        ]
    },
    {
        domain: "dvdfab.org",
        removeParams: [
            "ad", "c_ad", "c_app", "c_app_from",
            "c_bm", "c_dt", "c_ex", "c_id",
            "c_sys", "c_u", "c_ut", "c_ver",
            "c_wh", "client_e", "client_m", "client_t",
            "clientusertype", "soft", "trackid", "ver"
        ]
    },
    {
        domain: "dzen.ru",
        removeParams: [
            "clid", "persistent_id", "stid", "yredirect"
        ]
    },
    {
        domain: "easyfundraising.org.uk",
        removeParams: [
            "efr_campaign", "efr_medium", "efr_source"
        ]
    },
    {
        domain: "ebay",
        removeParams: [
            "_trkparms", "_trksid", "amdata", "campid",
            "mkcid", "mkevt", "mkrid", "ssspo",
            "sssrc", "ssuid"
        ]
    },
    {
        domain: "ebay.com",
        removeParams: [
            "_from", "_trkparms", "_trksid", "hash"
        ]
    },
    {
        domain: "edx.org",
        removeParams: [
            "source"
        ]
    },
    {
        domain: "ejje.weblio.jp",
        removeParams: [
            "erl"
        ]
    },
    {
        domain: "ejoker.de",
        removeParams: [
            "idealoid", "sPartner"
        ]
    },
    {
        domain: "electronic4you.de",
        removeParams: [
            "idealoid"
        ]
    },
    {
        domain: "elgato.com",
        removeParams: [
            "attribution_window", "contact_id", "link_id", "platform",
            "token"
        ]
    },
    {
        domain: "email.nationalgeographic.com",
        removeParams: [
            "__F__", "__dU__"
        ]
    },
    {
        domain: "email1.io",
        removeParams: [
            "aid"
        ]
    },
    {
        domain: "eonline.com",
        removeParams: [
            "content", "medium", "source"
        ]
    },
    {
        domain: "epicgames.com",
        removeParams: [
            "epic_affiliate", "epic_gameId"
        ]
    },
    {
        domain: "eplus.by",
        removeParams: [
            "de_utm_source"
        ]
    },
    {
        domain: "espn.com",
        removeParams: [
            "appsrc"
        ]
    },
    {
        domain: "etsy.com",
        removeParams: [
            "click_key", "click_sum", "organic_search_click", "ref"
        ]
    },
    {
        domain: "europe1.fr",
        removeParams: [
            "xtor"
        ]
    },
    {
        domain: "event.hoken-mammoth.jp",
        removeParams: [
            "s_mf"
        ]
    },
    {
        domain: "express.de",
        removeParams: [
            "cb"
        ]
    },
    {
        domain: "facebook.com",
        removeParams: [
            "_nc_x", "_rdr", "action_history", "app",
            "comment_tracking", "dti", "eav", "eid",
            "extid", "ftentidentifier", "hc_=", "idorvanity",
            "ls_ref", "mibextid", "padding", "pageid",
            "paipv", "rdc", "rdr", "ref",
            "referral_code", "referral_story_type", "sfnsn", "tn",
            "tracking", "video_source", "wtsid"
        ]
    },
    {
        domain: "faei.cz",
        removeParams: [
            "dop_ab_variant", "dop_id", "dop_req_id", "dop_source_zone_name",
            "sznclid"
        ]
    },
    {
        domain: "faphouse.com",
        removeParams: [
            "UserId", "login", "signature", "statsUID",
            "valid", "veb", "vep", "xhUserId"
        ]
    },
    {
        domain: "fashion-press.net",
        removeParams: [
            "media"
        ]
    },
    {
        domain: "fikfapcams.com",
        removeParams: [
            "affiliateId", "realDomain", "referrer"
        ]
    },
    {
        domain: "finance.yahoo.co.jp",
        removeParams: [
            "cpt_m", "cpt_n", "cpt_s"
        ]
    },
    {
        domain: "firefox.com",
        removeParams: [
            "context", "entrypoint", "form_type"
        ]
    },
    {
        domain: "fiverr.com",
        removeParams: [
            "context_referrer", "funnel", "ref_ctx_id", "source"
        ]
    },
    {
        domain: "flipkart.com",
        removeParams: [
            "/^affExtParam/", "/^otracker/", "[cilp]id", "_refId",
            "affid", "as", "as-pos", "as-searchtext",
            "as-type", "cid", "collection-tab-name", "fm",
            "iid", "lid", "marketplace", "otracker",
            "otracker1", "pageUID", "pid", "ppn",
            "ppt", "pwsvid", "qH", "requestId",
            "spotlightTagId", "srno", "ssid", "st",
            "store", "suggestionId", "uggestionId"
        ]
    },
    {
        domain: "fmworld.net",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "fon.bet",
        removeParams: [
            "affijet-click", "partner_id", "sub_1"
        ]
    },
    {
        domain: "foodpanda.com",
        removeParams: [
            "src"
        ]
    },
    {
        domain: "forbes.com",
        removeParams: [
            "sh"
        ]
    },
    {
        domain: "freebies.indiegala.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "galaxus.de",
        removeParams: [
            "idealoid", "pcscpId"
        ]
    },
    {
        domain: "game-i.daa.jp",
        removeParams: [
            "cmd"
        ]
    },
    {
        domain: "game.hiroba.dpoint.docomo.ne.jp",
        removeParams: [
            "mks_referer_event"
        ]
    },
    {
        domain: "gamersgate.com",
        removeParams: [
            "caff"
        ]
    },
    {
        domain: "gamesplanet.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "gamespot.com",
        removeParams: [
            "PostType", "ServiceType", "TheTime", "UniqueID",
            "ftag"
        ]
    },
    {
        domain: "gelocal.it",
        removeParams: [
            "cnt", "ref"
        ]
    },
    {
        domain: "get-express-vpns.com",
        removeParams: [
            "sxid", "ttorigin"
        ]
    },
    {
        domain: "get.adobe.com",
        removeParams: [
            "TRILIBIS_EMULATOR_UA", "browser_dist", "browser_type", "promoid",
            "type", "workflow"
        ]
    },
    {
        domain: "getir.com",
        removeParams: [
            "c", "deep_link_value", "is_retargeting", "shortlink"
        ]
    },
    {
        domain: "gillian-guide.github.io",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "giphy.com",
        removeParams: [
            "cid", "ct", "ref", "rid"
        ]
    },
    {
        domain: "github.com",
        removeParams: [
            "email_source", "email_token", "reference_location", "source"
        ]
    },
    {
        domain: "gitlab.com",
        removeParams: [
            "glm_content", "glm_source", "referrer_action"
        ]
    },
    {
        domain: "glami.cz",
        removeParams: [
            "/ga_id/"
        ]
    },
    {
        domain: "gmx.com",
        removeParams: [
            "p"
        ]
    },
    {
        domain: "gmx.com^",
        removeParams: [
            "mc"
        ]
    },
    {
        domain: "go.mysku.ru",
        removeParams: [
            "~r"
        ]
    },
    {
        domain: "go.redirectingat.com",
        removeParams: [
            "id", "sref", "xcust"
        ]
    },
    {
        domain: "go.skimresources.com",
        removeParams: [
            "id", "xcust"
        ]
    },
    {
        domain: "go.xliirdr.com",
        removeParams: [
            "campaignId", "p", "userId"
        ]
    },
    {
        domain: "gog.com",
        removeParams: [
            "link_id", "pp", "track_click"
        ]
    },
    {
        domain: "goodreads.com",
        removeParams: [
            "ac", "from_search", "from_srp", "qid",
            "rank", "ref"
        ]
    },
    {
        domain: "google.com",
        removeParams: [
            "_u", "aqs", "atyp", "bih",
            "biw", "cad", "cd", "client",
            "cshid", "dcr", "dpr", "ei",
            "esrc", "fbs", "gs_lcp", "gs_lcrp",
            "gs_lp", "gs_ssp", "hl", "i-would-rather-use-firefox",
            "ictx", "ie", "iflsig", "je",
            "ls_rcp", "oq", "pcampaignid", "rlz",
            "sa", "sca_esv", "sca_upv", "sclient",
            "sei", "site", "source", "sourceid",
            "sxsrf", "uact", "usg", "ved",
            "vet"
        ]
    },
    {
        domain: "gorodche.ru",
        removeParams: [
            "utm"
        ]
    },
    {
        domain: "gotanynudes.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "happymail.co.jp",
        removeParams: [
            "Log"
        ]
    },
    {
        domain: "hatalike.jp",
        removeParams: [
            "track"
        ]
    },
    {
        domain: "hatarako.net",
        removeParams: [
            "prelink"
        ]
    },
    {
        domain: "hbol.jp",
        removeParams: [
            "cx_clicks_art_mdl"
        ]
    },
    {
        domain: "hd.kinopoisk.ru",
        removeParams: [
            "from_block"
        ]
    },
    {
        domain: "headlines.peta.org",
        removeParams: [
            "en_txn7"
        ]
    },
    {
        domain: "healio.com",
        removeParams: [
            "ecp", "m_bt"
        ]
    },
    {
        domain: "hepsiburada.com",
        removeParams: [
            "shortlink", "url_src", "wt_af", "wt_ds",
            "wt_gl", "wt_inf", "wt_so"
        ]
    },
    {
        domain: "heraldcorp.com",
        removeParams: [
            "pos"
        ]
    },
    {
        domain: "hh.ru",
        removeParams: [
            "exp", "grpos", "plim", "ptl",
            "stl", "swnt", "t", "vss"
        ]
    },
    {
        domain: "hit.gemius.pl",
        removeParams: [
            "extra", "id"
        ]
    },
    {
        domain: "hitseller.de",
        removeParams: [
            "etcc_cmp", "etcc_med", "etcc_produkt", "idealoid",
            "sPartner"
        ]
    },
    {
        domain: "hog.com^",
        removeParams: [
            "ad"
        ]
    },
    {
        domain: "home.kingsoft.jp",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "homedepot.com",
        removeParams: [
            "fromReminder"
        ]
    },
    {
        domain: "hs.fi",
        removeParams: [
            "share"
        ]
    },
    {
        domain: "huffingtonpost.it",
        removeParams: [
            "cnt", "ref"
        ]
    },
    {
        domain: "humblebundle.com",
        removeParams: [
            "hmb_campaign", "hmb_medium", "hmb_source", "linkID",
            "mcID", "partner"
        ]
    },
    {
        domain: "idealo.com",
        removeParams: [
            "cancelUrl", "disc", "lcb", "leadOutUrl",
            "offerListId", "osId", "sid", "siteId",
            "src"
        ]
    },
    {
        domain: "idealo.de",
        removeParams: [
            "offerKey", "offerListId"
        ]
    },
    {
        domain: "ieagent.jp",
        removeParams: [
            "ct", "cv", "p", "ref"
        ]
    },
    {
        domain: "igromania.ru",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "iguru.gr",
        removeParams: [
            "_unique_id", "feed_id"
        ]
    },
    {
        domain: "ilsecoloxix.it",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "imdb.com",
        removeParams: [
            "pf_rd_i", "pf_rd_m", "pf_rd_p", "pf_rd_r",
            "pf_rd_s", "pf_rd_t", "ref_"
        ]
    },
    {
        domain: "immobilienscout24.de",
        removeParams: [
            "enteredFrom", "navigationServiceUrl", "referrer", "searchGeoPath",
            "searchId", "source"
        ]
    },
    {
        domain: "incogni.com",
        removeParams: [
            "aff_sub", "affiliate_id", "offer_id", "source",
            "transaction_id"
        ]
    },
    {
        domain: "indeed.com",
        removeParams: [
            "[a-z]*tk", "alid", "from"
        ]
    },
    {
        domain: "instagram.com",
        removeParams: [
            "ig_rid", "igsh", "igshid"
        ]
    },
    {
        domain: "investing.com",
        removeParams: [
            "smd", "udid"
        ]
    },
    {
        domain: "iotransfer.itopvpn.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "iprima.cz",
        removeParams: [
            "dop_ab_variant", "dop_id", "dop_req_id", "dop_source_zone_name",
            "sznclid"
        ]
    },
    {
        domain: "iqbroker.com",
        removeParams: [
            "aff_model", "afftrack", "clickid"
        ]
    },
    {
        domain: "iqiyi.com",
        removeParams: [
            "vfrm", "vfrmblk", "vfrmrst"
        ]
    },
    {
        domain: "japan.cnet.com",
        removeParams: [
            "tag"
        ]
    },
    {
        domain: "jasonsavard.com",
        removeParams: [
            "/cUrl|ref/"
        ]
    },
    {
        domain: "jetbrains.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "jiji.com",
        removeParams: [
            "m"
        ]
    },
    {
        domain: "jlcpcb.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "join.worldoftanks",
        removeParams: [
            "enctid", "pub_id", "sid", "xid"
        ]
    },
    {
        domain: "joshi-spa.jp",
        removeParams: [
            "cx_clicks_art_mdl", "cx_clicks_sldbox"
        ]
    },
    {
        domain: "jpsk.jp",
        removeParams: [
            "click"
        ]
    },
    {
        domain: "kahoot.com",
        removeParams: [
            "refer_method"
        ]
    },
    {
        domain: "kakaku.com",
        removeParams: [
            "lid"
        ]
    },
    {
        domain: "kamigame.jp",
        removeParams: [
            "kamigame_source"
        ]
    },
    {
        domain: "kaspersky.com",
        removeParams: [
            "icid"
        ]
    },
    {
        domain: "kitbag.com",
        removeParams: [
            "_ref", "ab"
        ]
    },
    {
        domain: "kitizawa.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "klook.com",
        removeParams: [
            "aid", "clickId", "spm"
        ]
    },
    {
        domain: "kmkk78.com",
        removeParams: [
            "agentId"
        ]
    },
    {
        domain: "kohls.com",
        removeParams: [
            "CID"
        ]
    },
    {
        domain: "ksta.de",
        removeParams: [
            "cb"
        ]
    },
    {
        domain: "kyujin.navitime.co.jp",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "lancasterarchery.com",
        removeParams: [
            "af_lnk", "dt_id"
        ]
    },
    {
        domain: "lcs.naver.com",
        removeParams: [
            "bh", "bw", "domComplete", "domContentLoadedEventEnd",
            "domContentLoadedEventStart", "domInteractive", "domLoading", "ln",
            "loadEventEnd", "loadEventStart", "ls", "navigationStart",
            "os", "pid", "requestStart", "responseEnd",
            "responseStart", "sr", "ts"
        ]
    },
    {
        domain: "lenta.ru",
        removeParams: [
            "es"
        ]
    },
    {
        domain: "lidl.de",
        removeParams: [
            "msktc"
        ]
    },
    {
        domain: "link.coupang.com",
        removeParams: [
            "lptag"
        ]
    },
    {
        domain: "linkedin.com",
        removeParams: [
            "li[a-z]{2}", "origin", "originalReferer", "original_referer",
            "refId", "trackingId", "trk", "trkInfo",
            "u"
        ]
    },
    {
        domain: "lite.qwant.com",
        removeParams: [
            "ad", "cachekey", "locale", "position",
            "query", "serp_position", "t", "tgp",
            "uri"
        ]
    },
    {
        domain: "live.bilibili.com",
        removeParams: [
            "broadcast_type", "is_room_feed", "session_id", "visit_id"
        ]
    },
    {
        domain: "live.nicovideo.jp",
        removeParams: [
            "ch_anime_ref"
        ]
    },
    {
        domain: "livedoor.biz",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "login.afreecatv.com",
        removeParams: [
            "szFrom"
        ]
    },
    {
        domain: "lotto.gmx.com^",
        removeParams: [
            "advertisementId", "partnerId"
        ]
    },
    {
        domain: "lotto.web.de",
        removeParams: [
            "advertisementId", "partnerId"
        ]
    },
    {
        domain: "lp.sophos.com",
        removeParams: [
            "elqTrackId"
        ]
    },
    {
        domain: "m.bilibili.com",
        removeParams: [
            "bbid", "ts"
        ]
    },
    {
        domain: "m.otenki.com",
        removeParams: [
            "af"
        ]
    },
    {
        domain: "m.weathercn.com",
        removeParams: [
            "id", "p_source", "p_type", "partner"
        ]
    },
    {
        domain: "mag2.com",
        removeParams: [
            "trflg"
        ]
    },
    {
        domain: "magento.com",
        removeParams: [
            "itm_campaign", "itm_medium", "itm_source", "itm_term"
        ]
    },
    {
        domain: "mailtrack.io",
        removeParams: [
            "userId"
        ]
    },
    {
        domain: "mall.kinarino.jp",
        removeParams: [
            "karea", "klay"
        ]
    },
    {
        domain: "manga.nicovideo.jp",
        removeParams: [
            "track"
        ]
    },
    {
        domain: "map.yahoo.co.jp",
        removeParams: [
            "from_srv"
        ]
    },
    {
        domain: "market.yandex",
        removeParams: [
            "clid", "do-waremd5", "mclid", "offerid",
            "show-uid", "uniqueId", "vid"
        ]
    },
    {
        domain: "marketing.net.idealo-partner.com",
        removeParams: [
            "amc", "etcc_cmp", "etcc_med", "etcc_produkt",
            "smc2", "smc5"
        ]
    },
    {
        domain: "marketscreener.com",
        removeParams: [
            "RewriteLast", "aComposeInputSearch", "add_mots", "countview",
            "lien", "mots", "noredirect", "type_recherche",
            "type_recherche_forum"
        ]
    },
    {
        domain: "marketwatch.com",
        removeParams: [
            "mod"
        ]
    },
    {
        domain: "marktjagd.de",
        removeParams: [
            "client"
        ]
    },
    {
        domain: "media.joj.sk",
        removeParams: [
            "ad_params", "ga_account", "gemius_identifier", "tracking_params"
        ]
    },
    {
        domain: "media01.eu",
        removeParams: [
            "trackid"
        ]
    },
    {
        domain: "mediamarkt.com.tr",
        removeParams: [
            "rbtc"
        ]
    },
    {
        domain: "medium.com",
        removeParams: [
            "source"
        ]
    },
    {
        domain: "meetup.com",
        removeParams: [
            "_xtd", "rv"
        ]
    },
    {
        domain: "mein.onlinekonto.de",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "mercadolibre.com",
        removeParams: [
            "DEAL_ID", "L", "S", "T",
            "V", "pdp_filters", "position", "search_layout",
            "tracking_id", "type"
        ]
    },
    {
        domain: "michaelkors.global",
        removeParams: [
            "ecid"
        ]
    },
    {
        domain: "microsoft.com",
        removeParams: [
            "ocid", "ranEAID", "ranSiteID"
        ]
    },
    {
        domain: "microsoft.msafflnk.net",
        removeParams: [
            "sharedid"
        ]
    },
    {
        domain: "minfin.com.ua",
        removeParams: [
            "mcr", "mpl", "mpr"
        ]
    },
    {
        domain: "mintj.com",
        removeParams: [
            "adv"
        ]
    },
    {
        domain: "mioga.de",
        removeParams: [
            "idealoid", "pl"
        ]
    },
    {
        domain: "mirror.co.uk",
        removeParams: [
            "int_source"
        ]
    },
    {
        domain: "mirtesen.ru",
        removeParams: [
            "ad", "bvuuid", "nvuuid"
        ]
    },
    {
        domain: "moffme.com",
        removeParams: [
            "campaign", "medium", "source"
        ]
    },
    {
        domain: "mofos.com",
        removeParams: [
            "ats"
        ]
    },
    {
        domain: "moosejaw.com",
        removeParams: [
            "cm_lm", "cm_mmc", "spJobID", "spMailingID",
            "spReportId", "spUserID", "webUserId"
        ]
    },
    {
        domain: "mootoon.co.kr",
        removeParams: [
            "in_id"
        ]
    },
    {
        domain: "mora.jp",
        removeParams: [
            "fmid"
        ]
    },
    {
        domain: "mozilla.org",
        removeParams: [
            "platform", "redirect_source", "src"
        ]
    },
    {
        domain: "mozillazine.org",
        removeParams: [
            "sid"
        ]
    },
    {
        domain: "mp.weixin.qq.com",
        removeParams: [
            "WBAPIAnalysisOriUICodes", "aid", "chksm", "devicetype",
            "exportkey", "from", "key", "launchid",
            "mpshare", "nettype", "scene", "srcid",
            "uin", "v_p"
        ]
    },
    {
        domain: "msn.com",
        removeParams: [
            "cvid", "ei", "ocid", "pc"
        ]
    },
    {
        domain: "music.apple.com",
        removeParams: [
            "itscg", "itsct"
        ]
    },
    {
        domain: "mvideo.ru",
        removeParams: [
            "/^=/"
        ]
    },
    {
        domain: "myoji-kamon.net",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "mypage.otsuka-shokai.co.jp",
        removeParams: [
            "oiid"
        ]
    },
    {
        domain: "myprotein.jp",
        removeParams: [
            "a8", "affil"
        ]
    },
    {
        domain: "nationalgeographic.com",
        removeParams: [
            "utm_rd"
        ]
    },
    {
        domain: "nesine.com",
        removeParams: [
            "adj_adgroup", "adj_creative", "adjust_t", "glid",
            "rlid", "trid", "xid_param_2"
        ]
    },
    {
        domain: "net-parade.it",
        removeParams: [
            "pl"
        ]
    },
    {
        domain: "netflix.com",
        removeParams: [
            "LanguageFilter", "al", "isLanguageFilter", "tctx",
            "trackId"
        ]
    },
    {
        domain: "netgames.de",
        removeParams: [
            "idealoid", "refID"
        ]
    },
    {
        domain: "netkeiba.com",
        removeParams: [
            "rf"
        ]
    },
    {
        domain: "news-postseven.com",
        removeParams: [
            "_from"
        ]
    },
    {
        domain: "news.yahoo.co.jp",
        removeParams: [
            "bt", "ctg", "date", "dv",
            "mid", "source"
        ]
    },
    {
        domain: "newspicks.com",
        removeParams: [
            "ref", "ref_t"
        ]
    },
    {
        domain: "newyorker.com",
        removeParams: [
            "bxid", "cndid", "esrc", "mbid",
            "source"
        ]
    },
    {
        domain: "nextgov.com",
        removeParams: [
            "oref"
        ]
    },
    {
        domain: "nicoebook.jp",
        removeParams: [
            "track"
        ]
    },
    {
        domain: "nicoft.io",
        removeParams: [
            "cmnhd_ref"
        ]
    },
    {
        domain: "nicovideo.jp",
        removeParams: [
            "cmnhd_ref", "news_ref", "ra", "rd",
            "ref", "rf", "rp", "transit_from",
            "transition_id", "transition_type"
        ]
    },
    {
        domain: "nikkansports.com",
        removeParams: [
            "nsgid"
        ]
    },
    {
        domain: "nikkei.co",
        removeParams: [
            "adid", "i_cid", "n_cid", "waad"
        ]
    },
    {
        domain: "nikkei.com",
        removeParams: [
            "i_cid", "n_cid"
        ]
    },
    {
        domain: "nikkeibp.co.jp",
        removeParams: [
            "i_cid"
        ]
    },
    {
        domain: "nishispo.nishinippon.co.jp",
        removeParams: [
            "rct"
        ]
    },
    {
        domain: "nitter.net",
        removeParams: [
            "referer"
        ]
    },
    {
        domain: "nordot.app",
        removeParams: [
            "ncmp"
        ]
    },
    {
        domain: "nordvpn.com",
        removeParams: [
            "data1"
        ]
    },
    {
        domain: "norml.org",
        removeParams: [
            "can_id", "email_referrer", "email_subject", "link_id",
            "source"
        ]
    },
    {
        domain: "novinky.cz",
        removeParams: [
            "dop_ab_variant", "dop_id", "dop_req_id", "dop_source_zone_name",
            "seq_no", "source"
        ]
    },
    {
        domain: "nuuvem.com",
        removeParams: [
            "ranEAID", "ranMID", "ranSiteID"
        ]
    },
    {
        domain: "nvidia.com",
        removeParams: [
            "jso"
        ]
    },
    {
        domain: "nypost.com",
        removeParams: [
            "__twitter_impression"
        ]
    },
    {
        domain: "nytimes.com",
        removeParams: [
            "impression_id", "referringSource", "sgrp", "smid"
        ]
    },
    {
        domain: "office.com",
        removeParams: [
            "ocid"
        ]
    },
    {
        domain: "oh-my-teeth.com",
        removeParams: [
            "clid"
        ]
    },
    {
        domain: "ojrq.net",
        removeParams: [
            "cid", "tpsync"
        ]
    },
    {
        domain: "olegmakarenko.ru",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "olx.com",
        removeParams: [
            "ad_reason_recommended_items"
        ]
    },
    {
        domain: "onet.pl",
        removeParams: [
            "srcc", "utm_medium", "utm_source", "utm_v"
        ]
    },
    {
        domain: "open.spotify.com",
        removeParams: [
            "referral"
        ]
    },
    {
        domain: "orbis.co.jp",
        removeParams: [
            "adid"
        ]
    },
    {
        domain: "oshiete.goo.ne.jp",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "ozon.ru",
        removeParams: [
            "advert", "asb", "asb2", "avtc",
            "avte", "avts", "from_sku", "from_url",
            "keywords", "partner"
        ]
    },
    {
        domain: "pcmag.com",
        removeParams: [
            "taid"
        ]
    },
    {
        domain: "peacocktv.com",
        removeParams: [
            "method", "orig_ref"
        ]
    },
    {
        domain: "perfo.salestube.pl",
        removeParams: [
            "aff_click_id"
        ]
    },
    {
        domain: "pixel.adsafeprotected.com",
        removeParams: [
            "anId", "sessionId", "slot", "sr",
            "url", "wr"
        ]
    },
    {
        domain: "pixiv.net",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "play.google.com",
        removeParams: [
            "pcampaignid"
        ]
    },
    {
        domain: "play.google.com^",
        removeParams: [
            "referrer"
        ]
    },
    {
        domain: "player.theplatform.com",
        removeParams: [
            "playeranalytics", "targetedlink"
        ]
    },
    {
        domain: "playstation.com",
        removeParams: [
            "emcid"
        ]
    },
    {
        domain: "plus.yandex.com^",
        removeParams: [
            "origin", "source", "state"
        ]
    },
    {
        domain: "plusgaming.yandex.ru",
        removeParams: [
            "clckid"
        ]
    },
    {
        domain: "podbean.com",
        removeParams: [
            "pbss", "referrer"
        ]
    },
    {
        domain: "politica.com.ua",
        removeParams: [
            "isUser"
        ]
    },
    {
        domain: "popin.cc",
        removeParams: [
            "info", "uid"
        ]
    },
    {
        domain: "porntube.com",
        removeParams: [
            "cid"
        ]
    },
    {
        domain: "pravda.com.ua",
        removeParams: [
            "pageviewCount"
        ]
    },
    {
        domain: "pricezilla.de",
        removeParams: [
            "bid"
        ]
    },
    {
        domain: "productcatalog.channeladvisor.com",
        removeParams: [
            "DeviceTypeId", "InteractionSessionId", "PCAT_vNextTracking_LocalWidget", "PCAT_vNextTracking_OnlineItrack",
            "PCAT_vNextTracking_OnlinePlrss", "PCAT_vNextTracking_RetailerScoring", "UniqueUserId", "profileId"
        ]
    },
    {
        domain: "promote.betcity.ru",
        removeParams: [
            "icm", "refcode", "widget_id"
        ]
    },
    {
        domain: "prothomalo.com",
        removeParams: [
            "uuid_v2"
        ]
    },
    {
        domain: "protonvpn.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "prvnizpravy.cz",
        removeParams: [
            "xid"
        ]
    },
    {
        domain: "qcplay.co.jp",
        removeParams: [
            "c", "pid", "shortlink"
        ]
    },
    {
        domain: "qianfan.cloud.baidu.com",
        removeParams: [
            "track"
        ]
    },
    {
        domain: "qjweb.jp",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "querie.me",
        removeParams: [
            "timestamp"
        ]
    },
    {
        domain: "quizangel.com",
        removeParams: [
            "utm_site_campaign", "utm_site_medium", "utm_site_source"
        ]
    },
    {
        domain: "quizlet.com",
        removeParams: [
            "funnelUUID"
        ]
    },
    {
        domain: "quora.com",
        removeParams: [
            "al_imp", "share", "uid"
        ]
    },
    {
        domain: "qzone.qq.com",
        removeParams: [
            "loginfrom"
        ]
    },
    {
        domain: "rac.co.uk",
        removeParams: [
            "cid"
        ]
    },
    {
        domain: "rakumachi.jp",
        removeParams: [
            "device_type", "uiaid"
        ]
    },
    {
        domain: "rakuten.co.jp",
        removeParams: [
            "sc2id", "trflg"
        ]
    },
    {
        domain: "rapidgator.net",
        removeParams: [
            "Referer", "referer"
        ]
    },
    {
        domain: "raretech.site",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "rdrtr.com",
        removeParams: [
            "aff_sub", "aff_sub2", "aff_sub3", "aff_sub4",
            "aff_sub5", "source"
        ]
    },
    {
        domain: "readdc.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "realestate.yahoo.co.jp",
        removeParams: [
            "sc_out"
        ]
    },
    {
        domain: "realitykings.com",
        removeParams: [
            "ats"
        ]
    },
    {
        domain: "realtor.com",
        removeParams: [
            "MID", "RID", "ex", "identityID"
        ]
    },
    {
        domain: "record.pt",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "reddit.app.link",
        removeParams: [
            "adblock", "compact_view", "dnt", "geoip_country",
            "referrer_domain", "referrer_url"
        ]
    },
    {
        domain: "reddit.com",
        removeParams: [
            "$deep_link", "$original_url", "%243p", "%24deep_link",
            "%24original_url", "?$deep_link", "_branch_match_id", "cId",
            "chainedPosts", "correlation_id", "iId", "post_fullname",
            "rdt", "ref", "ref_campaign", "ref_source",
            "share_id", "type"
        ]
    },
    {
        domain: "redfin.com",
        removeParams: [
            "riftinfo"
        ]
    },
    {
        domain: "redhotpawn.com",
        removeParams: [
            "cbqsid"
        ]
    },
    {
        domain: "redtube.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "researchgate.net",
        removeParams: [
            "_tp"
        ]
    },
    {
        domain: "respekt.cz",
        removeParams: [
            "dop_ab_variant", "dop_id", "dop_req_id", "dop_source_zone_name",
            "sznclid"
        ]
    },
    {
        domain: "reuters.com",
        removeParams: [
            "taid"
        ]
    },
    {
        domain: "revolut.com",
        removeParams: [
            "%243p", "%7Ecampaign_id", "%7Eclick_id", "%7Esecondary_publisher",
            "ext"
        ]
    },
    {
        domain: "roblox.com",
        removeParams: [
            "refPageId"
        ]
    },
    {
        domain: "roboform.com",
        removeParams: [
            "a", "affid", "c", "frm",
            "s1"
        ]
    },
    {
        domain: "samsung.com",
        removeParams: [
            "cid"
        ]
    },
    {
        domain: "savefrom.net",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "sbisec.co.jp",
        removeParams: [
            "waad"
        ]
    },
    {
        domain: "search.bilibili.com",
        removeParams: [
            "from_source"
        ]
    },
    {
        domain: "search.naver.com",
        removeParams: [
            "document", "i", "image", "p",
            "px", "py", "s", "sx",
            "sy", "time", "tqi"
        ]
    },
    {
        domain: "search.yahoo.co.jp",
        removeParams: [
            "fr"
        ]
    },
    {
        domain: "seiga.nicovideo.jp",
        removeParams: [
            "track"
        ]
    },
    {
        domain: "services.addons.mozilla.org",
        removeParams: [
            "telemetry-client-id"
        ]
    },
    {
        domain: "seznamzpravy.cz",
        removeParams: [
            "dop_ab_variant", "dop_id", "dop_req_id", "dop_source_zone_name",
            "seq_no", "source"
        ]
    },
    {
        domain: "shareasale-analytics.com",
        removeParams: [
            "afftrack", "lplid", "ref", "shrsl_analytics_sscid",
            "shrsl_analytics_sstid"
        ]
    },
    {
        domain: "shimotsuke.co.jp",
        removeParams: [
            "newsletter", "rankinghour", "ref", "relatedarticle",
            "top"
        ]
    },
    {
        domain: "shop.adidas.jp",
        removeParams: [
            "shortlink", "source_caller"
        ]
    },
    {
        domain: "shop.hololivepro.com",
        removeParams: [
            "pr_prod_strat", "pr_rec_id", "pr_rec_pid", "pr_ref_pid",
            "pr_seq"
        ]
    },
    {
        domain: "shopee.com",
        removeParams: [
            "publish_id", "sp_atk", "xptdk"
        ]
    },
    {
        domain: "shopping.gmx.com^",
        removeParams: [
            "origin"
        ]
    },
    {
        domain: "shopping.web.de",
        removeParams: [
            "origin"
        ]
    },
    {
        domain: "shutterstock.com",
        removeParams: [
            "src"
        ]
    },
    {
        domain: "similarweb.com",
        removeParams: [
            "from_ext"
        ]
    },
    {
        domain: "simplelogin.io",
        removeParams: [
            "slref"
        ]
    },
    {
        domain: "sincode.ai",
        removeParams: [
            "via"
        ]
    },
    {
        domain: "singtao.ca",
        removeParams: [
            "referid"
        ]
    },
    {
        domain: "skt.sh",
        removeParams: [
            "referer"
        ]
    },
    {
        domain: "slack.com",
        removeParams: [
            "t"
        ]
    },
    {
        domain: "slickdeals.net",
        removeParams: [
            "adobeRef", "sdfid", "sdpid", "sdtid",
            "sdtrk"
        ]
    },
    {
        domain: "smart-flash.jp",
        removeParams: [
            "rf"
        ]
    },
    {
        domain: "smartrecruiters.com",
        removeParams: [
            "km_adgroup", "km_matchtype", "km_partner"
        ]
    },
    {
        domain: "smotreshka.tv",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "snapchat.com",
        removeParams: [
            "sc_referrer", "sc_ua"
        ]
    },
    {
        domain: "so-net.ne.jp",
        removeParams: [
            "SmRcid"
        ]
    },
    {
        domain: "sohu.com",
        removeParams: [
            "_f", "_trans_", "pvid", "scm",
            "spm"
        ]
    },
    {
        domain: "sp.nicovideo.jp",
        removeParams: [
            "cnt_transit", "cp_in", "ss_id", "ss_pos",
            "viewing_source"
        ]
    },
    {
        domain: "spiegel.de",
        removeParams: [
            "b"
        ]
    },
    {
        domain: "sport.sky.it",
        removeParams: [
            "share_id", "social"
        ]
    },
    {
        domain: "sportbank.ua",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "sportsbull.jp",
        removeParams: [
            "vkTop"
        ]
    },
    {
        domain: "sportschosun.com",
        removeParams: [
            "f_url"
        ]
    },
    {
        domain: "spotify.com",
        removeParams: [
            "si"
        ]
    },
    {
        domain: "stacksocial.com",
        removeParams: [
            "aid", "partnerid", "rid"
        ]
    },
    {
        domain: "start.pm.by",
        removeParams: [
            "adtag"
        ]
    },
    {
        domain: "steampowered.com",
        removeParams: [
            "curator_clanid", "rdt_cid", "snr"
        ]
    },
    {
        domain: "streamable.com",
        removeParams: [
            "src_internal", "src_player"
        ]
    },
    {
        domain: "streamfab.com^",
        removeParams: [
            "_csrc_", "_cus_", "_cut_", "c_ad",
            "client_m", "client_t"
        ]
    },
    {
        domain: "streamfab.jp",
        removeParams: [
            "ad", "c_app", "c_app_from", "c_bm",
            "c_dt", "c_sys", "c_try", "c_ut",
            "c_ver", "c_wh", "soft", "trackid"
        ]
    },
    {
        domain: "stripchat.com",
        removeParams: [
            "affiliateId", "campaignId", "realDomain", "referrer",
            "sourceId"
        ]
    },
    {
        domain: "stvkr.com",
        removeParams: [
            "height", "rfr", "sa", "timezone",
            "widht"
        ]
    },
    {
        domain: "substack.com",
        removeParams: [
            "triedRedirect"
        ]
    },
    {
        domain: "swp.de",
        removeParams: [
            "source"
        ]
    },
    {
        domain: "t.adcell.com",
        removeParams: [
            "subId"
        ]
    },
    {
        domain: "t.myvisualiq.net",
        removeParams: [
            "~red"
        ]
    },
    {
        domain: "taobao.com",
        removeParams: [
            "_u", "abbucket", "abtest", "acm",
            "activityId", "algo_expid", "algo_pvid", "ali_refid",
            "ali_trackid", "app", "app_pvid", "bftRwd",
            "bftTag", "cpp", "impid", "lygClk",
            "mytmenu", "ns", "pos", "price",
            "ptl", "pvid", "scene", "scm",
            "scm[_a-z-]*", "share_crt_v", "shareurl", "short_name",
            "sourceType", "sp_tk", "spm", "suid",
            "traceId", "trackInfo", "turing_bucket", "un",
            "ut_sk", "utkn", "utparam", "xId"
        ]
    },
    {
        domain: "target.georiot.com",
        removeParams: [
            "tsid"
        ]
    },
    {
        domain: "tb.cn",
        removeParams: [
            "sm"
        ]
    },
    {
        domain: "tcgplayer.com",
        removeParams: [
            "source"
        ]
    },
    {
        domain: "tchibo.de",
        removeParams: [
            "wbdcd"
        ]
    },
    {
        domain: "techcrunch.com",
        removeParams: [
            "ncid", "sr", "sr_share"
        ]
    },
    {
        domain: "technikdirekt.de",
        removeParams: [
            "idealoid", "sPartner"
        ]
    },
    {
        domain: "teknosa.com",
        removeParams: [
            "adj_adgroup", "adj_campaign", "adj_creative", "adj_t",
            "adp_cid", "adp_oid", "aid", "campid",
            "cid", "crid", "plid", "shopId",
            "sid", "source"
        ]
    },
    {
        domain: "teletrader.com",
        removeParams: [
            "internal"
        ]
    },
    {
        domain: "temu.com",
        removeParams: [
            "_bg_fs", "_oak_freesia_scene", "_oak_gallery_order", "_oak_mp_inf",
            "_oak_page_source", "_oak_rec_ext_1", "_oak_region", "_p_jump_id",
            "_p_rfs", "_x_ads_channel", "_x_ads_sub_channel", "_x_campaign",
            "_x_channel_scene", "_x_channel_src", "_x_cid", "_x_sessn_id",
            "_x_vst_scene", "freesia_scene", "from_share", "g_ccy",
            "g_lg", "g_region", "g_site", "refer_page_el_sn",
            "refer_page_id", "refer_page_name", "refer_page_sn", "refer_share_channel",
            "refer_share_id", "refer_share_suin", "refer_source", "share_img",
            "sku_id", "spec_gallery_id", "top_gallery_url"
        ]
    },
    {
        domain: "theathletic.com",
        removeParams: [
            "login_source", "ref_page", "source"
        ]
    },
    {
        domain: "theguardian.com",
        removeParams: [
            "CMP"
        ]
    },
    {
        domain: "theregister.com",
        removeParams: [
            "td"
        ]
    },
    {
        domain: "thumbs4.redgifs.com",
        removeParams: [
            "for"
        ]
    },
    {
        domain: "thunderbird.net",
        removeParams: [
            "src"
        ]
    },
    {
        domain: "tiktok.com",
        removeParams: [
            "_d", "_r", "embed_source", "enter_method",
            "is_from_webapp", "preview_pb", "q", "refer",
            "referer_url", "sec_uid", "sender_device", "share_app_id",
            "share_app_name", "share_author_id", "share_iid", "share_link_id",
            "source", "t", "timestamp", "tt_from",
            "u_code", "user_id", "web_id"
        ]
    },
    {
        domain: "tinkoff.ru",
        removeParams: [
            "dsp_click_id"
        ]
    },
    {
        domain: "tmall.com",
        removeParams: [
            "abbucket", "abtest", "acm", "activity_id",
            "algo_expid", "algo_pvid", "ali_refid", "ali_trackid",
            "app", "bftRwd", "bftTag", "bxsign",
            "cpp", "impid", "lygClk", "mytmenu",
            "ns", "pos", "price", "pvid",
            "scene", "scm[_a-z-]*", "share_crt_v", "shareurl",
            "short_name", "sourceType", "sp_tk", "suid",
            "trackInfo", "turing_bucket", "un", "user_number_id",
            "ut_sk", "utkn", "utparam"
        ]
    },
    {
        domain: "tmz.com",
        removeParams: [
            "adid"
        ]
    },
    {
        domain: "tokopedia.com",
        removeParams: [
            "extParam", "refined", "src", "trkid",
            "whid"
        ]
    },
    {
        domain: "toku.yahoo.co.jp",
        removeParams: [
            "fr"
        ]
    },
    {
        domain: "tokyo-calendar.jp",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "tokyo-np.co.jp",
        removeParams: [
            "rct"
        ]
    },
    {
        domain: "toomics.com",
        removeParams: [
            "channel", "gen", "pid", "subpid"
        ]
    },
    {
        domain: "track.wargaming-aff.com",
        removeParams: [
            "ref_id"
        ]
    },
    {
        domain: "track.webgains.com",
        removeParams: [
            "clickref"
        ]
    },
    {
        domain: "tradingview.com",
        removeParams: [
            "aff_id", "aff_sub", "exchange", "source"
        ]
    },
    {
        domain: "travelist.pl",
        removeParams: [
            "MWID"
        ]
    },
    {
        domain: "trendyol.com",
        removeParams: [
            "adjust_t", "tyutm_campaign", "tyutm_medium", "tyutm_source",
            "utm_subaff"
        ]
    },
    {
        domain: "trib.al",
        removeParams: [
            "__tn__", "c_", "fbclid", "h"
        ]
    },
    {
        domain: "trk.mail.ru",
        removeParams: [
            "mt_click_id"
        ]
    },
    {
        domain: "tumblr.app.link",
        removeParams: [
            "_p"
        ]
    },
    {
        domain: "tumblr.com",
        removeParams: [
            "source"
        ]
    },
    {
        domain: "tutanota.com",
        removeParams: [
            "t-src"
        ]
    },
    {
        domain: "tweakers.net",
        removeParams: [
            "nb", "u"
        ]
    },
    {
        domain: "twitch.com",
        removeParams: [
            "tt_content", "tt_medium"
        ]
    },
    {
        domain: "twitter.com",
        removeParams: [
            "cn", "ref_src=", "ref_url", "refsrc=",
            "s", "src", "src=", "t"
        ]
    },
    {
        domain: "uber.com",
        removeParams: [
            "uclick_id"
        ]
    },
    {
        domain: "ubereats.com",
        removeParams: [
            "campaign", "marketing-visitor-id", "sub-campaign"
        ]
    },
    {
        domain: "upgrad.com",
        removeParams: [
            "UTM_MEDIUM"
        ]
    },
    {
        domain: "urlshare.cn",
        removeParams: [
            "apptype", "loginuin", "plateform", "src_uin",
            "srctype"
        ]
    },
    {
        domain: "uspoloassn.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "v.daum.net",
        removeParams: [
            "x_hk", "x_imp"
        ]
    },
    {
        domain: "v.youku.com",
        removeParams: [
            "ptag", "scm", "spm"
        ]
    },
    {
        domain: "vedomosti.ru",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "vercel.com",
        removeParams: [
            "redirected", "sfmc_activity_id", "sfmc_activity_name", "sfmc_activityid",
            "sfmc_asset_id", "sfmc_channel", "sfmc_journey_id", "sfmc_journey_name"
        ]
    },
    {
        domain: "versioncheck.addons.mozilla.org",
        removeParams: [
            "appID"
        ]
    },
    {
        domain: "video.laxd.com",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "vitamix.com",
        removeParams: [
            "_requestid", "bi", "cid", "di",
            "dl", "sd"
        ]
    },
    {
        domain: "vivaldi.com",
        removeParams: [
            "pk_campaign", "pk_kwd"
        ]
    },
    {
        domain: "vkplay.ru",
        removeParams: [
            "_1ld", "_1lp", "mt_adset", "mt_sub1",
            "mt_sub2"
        ]
    },
    {
        domain: "vodopad.ru",
        removeParams: [
            "sphrase_id"
        ]
    },
    {
        domain: "voicy.jp",
        removeParams: [
            "share.ref"
        ]
    },
    {
        domain: "voyeur-house.tv",
        removeParams: [
            "clickid"
        ]
    },
    {
        domain: "walmart.com",
        removeParams: [
            "ath[a-z]*", "from", "u1"
        ]
    },
    {
        domain: "weather.com",
        removeParams: [
            "par"
        ]
    },
    {
        domain: "web.de",
        removeParams: [
            "mc", "p"
        ]
    },
    {
        domain: "web.vstat.info",
        removeParams: [
            "guid", "user_agent"
        ]
    },
    {
        domain: "websearch.rakuten.co.jp",
        removeParams: [
            "ref"
        ]
    },
    {
        domain: "weibo.com",
        removeParams: [
            "dt_dapp", "weibo_id"
        ]
    },
    {
        domain: "weibo.com^",
        removeParams: [
            "dt_dapp", "weibo_id"
        ]
    },
    {
        domain: "wemakeprice.com",
        removeParams: [
            "refer"
        ]
    },
    {
        domain: "wetransfer.com",
        removeParams: [
            "amp;utm_campaign", "amp;utm_medium", "amp;utm_source", "trk"
        ]
    },
    {
        domain: "wetransfer.zendesk.com",
        removeParams: [
            "amp%3Btoken", "amp%3Btrk", "amp%3Butm_campaign", "amp%3Butm_medium",
            "amp%3Butm_source"
        ]
    },
    {
        domain: "whale.naver.com",
        removeParams: [
            "wpid"
        ]
    },
    {
        domain: "whistleout.com.au",
        removeParams: [
            "ARRAffinity", "ARRAffinitySameSite"
        ]
    },
    {
        domain: "wikihow.com",
        removeParams: [
            "utm_source"
        ]
    },
    {
        domain: "wikipedia.org",
        removeParams: [
            "wprov"
        ]
    },
    {
        domain: "windscribe.com",
        removeParams: [
            "pcpid", "temp_session"
        ]
    },
    {
        domain: "wired.co.uk",
        removeParams: [
            "mbid"
        ]
    },
    {
        domain: "wired.com",
        removeParams: [
            "intcid", "mbid"
        ]
    },
    {
        domain: "wise.com",
        removeParams: [
            "adref", "clickref", "partnerID", "partnerizecampaignID"
        ]
    },
    {
        domain: "wizcase.com",
        removeParams: [
            "clickout_id", "pageview_id", "vid"
        ]
    },
    {
        domain: "wkorea.com",
        removeParams: [
            "ddw", "ds_ch"
        ]
    },
    {
        domain: "woot.com",
        removeParams: [
            "ref_?"
        ]
    },
    {
        domain: "wowma.jp",
        removeParams: [
            "wadd"
        ]
    },
    {
        domain: "wps.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "wq.jd.com",
        removeParams: [
            "pvid"
        ]
    },
    {
        domain: "wsj.com",
        removeParams: [
            "reflink"
        ]
    },
    {
        domain: "wuzhuiso.com",
        removeParams: [
            "src"
        ]
    },
    {
        domain: "x.com",
        removeParams: [
            "cn", "ref_src", "ref_src=", "ref_url",
            "refsrc=", "s", "src", "src=",
            "t"
        ]
    },
    {
        domain: "xhamster.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "xkcd.com",
        removeParams: [
            "trk"
        ]
    },
    {
        domain: "xxvidsx.com",
        removeParams: [
            "ad", "site"
        ]
    },
    {
        domain: "yahoo.co.jp",
        removeParams: [
            "ikCo", "sc_e"
        ]
    },
    {
        domain: "yahoo.com",
        removeParams: [
            "ncid"
        ]
    },
    {
        domain: "yandex",
        removeParams: [
            "clid"
        ]
    },
    {
        domain: "yandex.com",
        removeParams: [
            "did", "from", "mlid", "msid",
            "persistent_id", "source-serpid", "stid", "suggest_reqid",
            "utm-term"
        ]
    },
    {
        domain: "yle.fi",
        removeParams: [
            "origin"
        ]
    },
    {
        domain: "yna.co.kr",
        removeParams: [
            "site"
        ]
    },
    {
        domain: "you.163.com",
        removeParams: [
            "from"
        ]
    },
    {
        domain: "youku.com",
        removeParams: [
            "tpa"
        ]
    },
    {
        domain: "youtu.be",
        removeParams: [
            "si"
        ]
    },
    {
        domain: "youtube.com",
        removeParams: [
            "pp"
        ]
    },
    {
        domain: "zapiska.substack.com",
        removeParams: [
            "isFreemail", "post_id", "publication_id", "r"
        ]
    },
    {
        domain: "zavvi.com",
        removeParams: [
            "affil", "sv_campaign_id"
        ]
    },
    {
        domain: "zenaps.com",
        removeParams: [
            "bId", "cookie"
        ]
    },
    {
        domain: "zerkalo.io",
        removeParams: [
            "tg", "vk"
        ]
    },
    {
        domain: "zestradar.com",
        removeParams: [
            "adclid"
        ]
    },
    {
        domain: "zillow.com",
        removeParams: [
            "rtoken"
        ]
    },
    {
        domain: "ziprecruiter.com",
        removeParams: [
            "zrclid"
        ]
    },
    {
        domain: "zoho.com",
        removeParams: [
            "iref"
        ]
    },
    {
        domain: "zozo.jp",
        removeParams: [
            "t"
        ]
    }
  ];

  export const urlPatternRules  = [ {
    regexPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?amazon(?:\\.[a-z]{2,}){1,}",
removeParams: [
   "pd_rd","pf_rd","qid","sr","srs","__mk","spIA","ms3_c","ie","refRID","colid","coliid","adId","qualifier","_encoding","smid","field-lbr_brands_browse-bin","ref","th","sprefix","crid","keywords","cv_ct_","linkCode","creativeASIN","ascsubtag","aaxitk","hsa_cr_id","sb-ci-","dchild","camp","creative","content-id","dib","dib_tag","sp_csd","tag","AssociateTag","c","hvadid","hvbmt","hvdev","hvlocphy","hvnetw","hvqmt","hvrand","hvtargid","hydadcr","initialIssue","ingress","linkId","pd_rd_i","pd_rd_r","pd_rd_w","pd_rd_wg","pf_rd_i","pf_rd_m","pf_rd_p","pf_rd_s","pf_rd_t","pf_rd_w","plattr","rdc","ts_id","visitId","vtr","store_ref","dib","ref_","pf_rd_r"
]
},
{ regexPattern: "^https?:\\/\\/(?:[a-z0-9-]+\\.)*?google(?:\\.[a-z]{2,}){1,}",
    removeParams: ["ls_rcp","gs_lcrp","gs_lcp","sca_esv","source","ei","oq","gs_lp","sclient","sourceid","ie","ved","uact","client","dpr","sei","je","usg","pcampaignid","cad","dcr","aqs","atyp","rlz","sxsrf","_u","vet","sa","esrc","cd","site","i-would-rather-use-firefox","gs_ssp","sca_upv","fbs","cshid","biw","bih","ictx","iflsig","hl"]
},
{regexFilter:"^https?:\\/\\/(?:[a-z0-9-]+\\.)*?lazda(?:\\.[a-z]{2,}){1,}",
removeParams:["clickTrackInfo","abid","pvid","ad_src","spm","src","from","scm","pa","pid_pvid","did","mp","cid","impsrc","pos"]},
{
    regexFilter:"^https?:\\/\\/(?:[a-z0-9-]+\\.)*?shopee(?:\\.[a-z]{2,}){1,}",
    removeParams:["publish_id","sp_atk","xptdk"]
}
];