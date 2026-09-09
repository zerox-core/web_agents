import {
  hasWebAgentWindowsAbsolutePath,
  WEB_AGENT_EXPLICIT_PATH_INTENT_TTL_MS,
  webAgentIntentCoversPermission,
} from "./permission-intent.js";

var ju = Object.defineProperty;
var qu = (e, t, r) => t in e ? ju(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var J = (e, t, r) => qu(e, typeof t != "symbol" ? t + "" : t, r);
function Ga(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Tn = { exports: {} }, Du = Tn.exports, Js;
function xu() {
  return Js || (Js = 1, function(e, t) {
    (function(r, n) {
      n(e);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Du, function(r) {
      if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id))
        throw new Error("This script should only be loaded in a browser extension.");
      if (globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)
        r.exports = globalThis.browser;
      else {
        const n = "The message port closed before a response was received.", o = (s) => {
          const i = {
            alarms: {
              clear: {
                minArgs: 0,
                maxArgs: 1
              },
              clearAll: {
                minArgs: 0,
                maxArgs: 0
              },
              get: {
                minArgs: 0,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            bookmarks: {
              create: {
                minArgs: 1,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getChildren: {
                minArgs: 1,
                maxArgs: 1
              },
              getRecent: {
                minArgs: 1,
                maxArgs: 1
              },
              getSubTree: {
                minArgs: 1,
                maxArgs: 1
              },
              getTree: {
                minArgs: 0,
                maxArgs: 0
              },
              move: {
                minArgs: 2,
                maxArgs: 2
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeTree: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            browserAction: {
              disable: {
                minArgs: 0,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              enable: {
                minArgs: 0,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              getBadgeBackgroundColor: {
                minArgs: 1,
                maxArgs: 1
              },
              getBadgeText: {
                minArgs: 1,
                maxArgs: 1
              },
              getPopup: {
                minArgs: 1,
                maxArgs: 1
              },
              getTitle: {
                minArgs: 1,
                maxArgs: 1
              },
              openPopup: {
                minArgs: 0,
                maxArgs: 0
              },
              setBadgeBackgroundColor: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setBadgeText: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            browsingData: {
              remove: {
                minArgs: 2,
                maxArgs: 2
              },
              removeCache: {
                minArgs: 1,
                maxArgs: 1
              },
              removeCookies: {
                minArgs: 1,
                maxArgs: 1
              },
              removeDownloads: {
                minArgs: 1,
                maxArgs: 1
              },
              removeFormData: {
                minArgs: 1,
                maxArgs: 1
              },
              removeHistory: {
                minArgs: 1,
                maxArgs: 1
              },
              removeLocalStorage: {
                minArgs: 1,
                maxArgs: 1
              },
              removePasswords: {
                minArgs: 1,
                maxArgs: 1
              },
              removePluginData: {
                minArgs: 1,
                maxArgs: 1
              },
              settings: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            commands: {
              getAll: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            contextMenus: {
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeAll: {
                minArgs: 0,
                maxArgs: 0
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            cookies: {
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 1,
                maxArgs: 1
              },
              getAllCookieStores: {
                minArgs: 0,
                maxArgs: 0
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              set: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            devtools: {
              inspectedWindow: {
                eval: {
                  minArgs: 1,
                  maxArgs: 2,
                  singleCallbackArg: !1
                }
              },
              panels: {
                create: {
                  minArgs: 3,
                  maxArgs: 3,
                  singleCallbackArg: !0
                },
                elements: {
                  createSidebarPane: {
                    minArgs: 1,
                    maxArgs: 1
                  }
                }
              }
            },
            downloads: {
              cancel: {
                minArgs: 1,
                maxArgs: 1
              },
              download: {
                minArgs: 1,
                maxArgs: 1
              },
              erase: {
                minArgs: 1,
                maxArgs: 1
              },
              getFileIcon: {
                minArgs: 1,
                maxArgs: 2
              },
              open: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              pause: {
                minArgs: 1,
                maxArgs: 1
              },
              removeFile: {
                minArgs: 1,
                maxArgs: 1
              },
              resume: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              },
              show: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            extension: {
              isAllowedFileSchemeAccess: {
                minArgs: 0,
                maxArgs: 0
              },
              isAllowedIncognitoAccess: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            history: {
              addUrl: {
                minArgs: 1,
                maxArgs: 1
              },
              deleteAll: {
                minArgs: 0,
                maxArgs: 0
              },
              deleteRange: {
                minArgs: 1,
                maxArgs: 1
              },
              deleteUrl: {
                minArgs: 1,
                maxArgs: 1
              },
              getVisits: {
                minArgs: 1,
                maxArgs: 1
              },
              search: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            i18n: {
              detectLanguage: {
                minArgs: 1,
                maxArgs: 1
              },
              getAcceptLanguages: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            identity: {
              launchWebAuthFlow: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            idle: {
              queryState: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            management: {
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              getSelf: {
                minArgs: 0,
                maxArgs: 0
              },
              setEnabled: {
                minArgs: 2,
                maxArgs: 2
              },
              uninstallSelf: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            notifications: {
              clear: {
                minArgs: 1,
                maxArgs: 1
              },
              create: {
                minArgs: 1,
                maxArgs: 2
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              getPermissionLevel: {
                minArgs: 0,
                maxArgs: 0
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            },
            pageAction: {
              getPopup: {
                minArgs: 1,
                maxArgs: 1
              },
              getTitle: {
                minArgs: 1,
                maxArgs: 1
              },
              hide: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setIcon: {
                minArgs: 1,
                maxArgs: 1
              },
              setPopup: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              setTitle: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              },
              show: {
                minArgs: 1,
                maxArgs: 1,
                fallbackToNoCallback: !0
              }
            },
            permissions: {
              contains: {
                minArgs: 1,
                maxArgs: 1
              },
              getAll: {
                minArgs: 0,
                maxArgs: 0
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              request: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            runtime: {
              getBackgroundPage: {
                minArgs: 0,
                maxArgs: 0
              },
              getPlatformInfo: {
                minArgs: 0,
                maxArgs: 0
              },
              openOptionsPage: {
                minArgs: 0,
                maxArgs: 0
              },
              requestUpdateCheck: {
                minArgs: 0,
                maxArgs: 0
              },
              sendMessage: {
                minArgs: 1,
                maxArgs: 3
              },
              sendNativeMessage: {
                minArgs: 2,
                maxArgs: 2
              },
              setUninstallURL: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            sessions: {
              getDevices: {
                minArgs: 0,
                maxArgs: 1
              },
              getRecentlyClosed: {
                minArgs: 0,
                maxArgs: 1
              },
              restore: {
                minArgs: 0,
                maxArgs: 1
              }
            },
            storage: {
              local: {
                clear: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              },
              managed: {
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                }
              },
              sync: {
                clear: {
                  minArgs: 0,
                  maxArgs: 0
                },
                get: {
                  minArgs: 0,
                  maxArgs: 1
                },
                getBytesInUse: {
                  minArgs: 0,
                  maxArgs: 1
                },
                remove: {
                  minArgs: 1,
                  maxArgs: 1
                },
                set: {
                  minArgs: 1,
                  maxArgs: 1
                }
              }
            },
            tabs: {
              captureVisibleTab: {
                minArgs: 0,
                maxArgs: 2
              },
              create: {
                minArgs: 1,
                maxArgs: 1
              },
              detectLanguage: {
                minArgs: 0,
                maxArgs: 1
              },
              discard: {
                minArgs: 0,
                maxArgs: 1
              },
              duplicate: {
                minArgs: 1,
                maxArgs: 1
              },
              executeScript: {
                minArgs: 1,
                maxArgs: 2
              },
              get: {
                minArgs: 1,
                maxArgs: 1
              },
              getCurrent: {
                minArgs: 0,
                maxArgs: 0
              },
              getZoom: {
                minArgs: 0,
                maxArgs: 1
              },
              getZoomSettings: {
                minArgs: 0,
                maxArgs: 1
              },
              goBack: {
                minArgs: 0,
                maxArgs: 1
              },
              goForward: {
                minArgs: 0,
                maxArgs: 1
              },
              highlight: {
                minArgs: 1,
                maxArgs: 1
              },
              insertCSS: {
                minArgs: 1,
                maxArgs: 2
              },
              move: {
                minArgs: 2,
                maxArgs: 2
              },
              query: {
                minArgs: 1,
                maxArgs: 1
              },
              reload: {
                minArgs: 0,
                maxArgs: 2
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              removeCSS: {
                minArgs: 1,
                maxArgs: 2
              },
              sendMessage: {
                minArgs: 2,
                maxArgs: 3
              },
              setZoom: {
                minArgs: 1,
                maxArgs: 2
              },
              setZoomSettings: {
                minArgs: 1,
                maxArgs: 2
              },
              update: {
                minArgs: 1,
                maxArgs: 2
              }
            },
            topSites: {
              get: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            webNavigation: {
              getAllFrames: {
                minArgs: 1,
                maxArgs: 1
              },
              getFrame: {
                minArgs: 1,
                maxArgs: 1
              }
            },
            webRequest: {
              handlerBehaviorChanged: {
                minArgs: 0,
                maxArgs: 0
              }
            },
            windows: {
              create: {
                minArgs: 0,
                maxArgs: 1
              },
              get: {
                minArgs: 1,
                maxArgs: 2
              },
              getAll: {
                minArgs: 0,
                maxArgs: 1
              },
              getCurrent: {
                minArgs: 0,
                maxArgs: 1
              },
              getLastFocused: {
                minArgs: 0,
                maxArgs: 1
              },
              remove: {
                minArgs: 1,
                maxArgs: 1
              },
              update: {
                minArgs: 2,
                maxArgs: 2
              }
            }
          };
          if (Object.keys(i).length === 0)
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          class a extends WeakMap {
            constructor(S, T = void 0) {
              super(T), this.createItem = S;
            }
            get(S) {
              return this.has(S) || this.set(S, this.createItem(S)), super.get(S);
            }
          }
          const c = (y) => y && typeof y == "object" && typeof y.then == "function", l = (y, S) => (...T) => {
            s.runtime.lastError ? y.reject(new Error(s.runtime.lastError.message)) : S.singleCallbackArg || T.length <= 1 && S.singleCallbackArg !== !1 ? y.resolve(T[0]) : y.resolve(T);
          }, d = (y) => y == 1 ? "argument" : "arguments", m = (y, S) => function(O, ...F) {
            if (F.length < S.minArgs)
              throw new Error(`Expected at least ${S.minArgs} ${d(S.minArgs)} for ${y}(), got ${F.length}`);
            if (F.length > S.maxArgs)
              throw new Error(`Expected at most ${S.maxArgs} ${d(S.maxArgs)} for ${y}(), got ${F.length}`);
            return new Promise((M, U) => {
              if (S.fallbackToNoCallback)
                try {
                  O[y](...F, l({
                    resolve: M,
                    reject: U
                  }, S));
                } catch (q) {
                  console.warn(`${y} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, q), O[y](...F), S.fallbackToNoCallback = !1, S.noCallback = !0, M();
                }
              else S.noCallback ? (O[y](...F), M()) : O[y](...F, l({
                resolve: M,
                reject: U
              }, S));
            });
          }, g = (y, S, T) => new Proxy(S, {
            apply(O, F, M) {
              return T.call(F, y, ...M);
            }
          });
          let w = Function.call.bind(Object.prototype.hasOwnProperty);
          const k = (y, S = {}, T = {}) => {
            let O = /* @__PURE__ */ Object.create(null), F = {
              has(U, q) {
                return q in y || q in O;
              },
              get(U, q, H) {
                if (q in O)
                  return O[q];
                if (!(q in y))
                  return;
                let Y = y[q];
                if (typeof Y == "function")
                  if (typeof S[q] == "function")
                    Y = g(y, y[q], S[q]);
                  else if (w(T, q)) {
                    let ke = m(q, T[q]);
                    Y = g(y, y[q], ke);
                  } else
                    Y = Y.bind(y);
                else if (typeof Y == "object" && Y !== null && (w(S, q) || w(T, q)))
                  Y = k(Y, S[q], T[q]);
                else if (w(T, "*"))
                  Y = k(Y, S[q], T["*"]);
                else
                  return Object.defineProperty(O, q, {
                    configurable: !0,
                    enumerable: !0,
                    get() {
                      return y[q];
                    },
                    set(ke) {
                      y[q] = ke;
                    }
                  }), Y;
                return O[q] = Y, Y;
              },
              set(U, q, H, Y) {
                return q in O ? O[q] = H : y[q] = H, !0;
              },
              defineProperty(U, q, H) {
                return Reflect.defineProperty(O, q, H);
              },
              deleteProperty(U, q) {
                return Reflect.deleteProperty(O, q);
              }
            }, M = Object.create(y);
            return new Proxy(M, F);
          }, _ = (y) => ({
            addListener(S, T, ...O) {
              S.addListener(y.get(T), ...O);
            },
            hasListener(S, T) {
              return S.hasListener(y.get(T));
            },
            removeListener(S, T) {
              S.removeListener(y.get(T));
            }
          }), h = new a((y) => typeof y != "function" ? y : function(T) {
            const O = k(T, {}, {
              getContent: {
                minArgs: 0,
                maxArgs: 0
              }
            });
            y(O);
          }), f = new a((y) => typeof y != "function" ? y : function(T, O, F) {
            let M = !1, U, q = new Promise((Te) => {
              U = function(oe) {
                M = !0, Te(oe);
              };
            }), H;
            try {
              H = y(T, O, U);
            } catch (Te) {
              H = Promise.reject(Te);
            }
            const Y = H !== !0 && c(H);
            if (H !== !0 && !Y && !M)
              return !1;
            const ke = (Te) => {
              Te.then((oe) => {
                F(oe);
              }, (oe) => {
                let Ve;
                oe && (oe instanceof Error || typeof oe.message == "string") ? Ve = oe.message : Ve = "An unexpected error occurred", F({
                  __mozWebExtensionPolyfillReject__: !0,
                  message: Ve
                });
              }).catch((oe) => {
                console.error("Failed to send onMessage rejected reply", oe);
              });
            };
            return ke(Y ? H : q), !0;
          }), u = ({
            reject: y,
            resolve: S
          }, T) => {
            s.runtime.lastError ? s.runtime.lastError.message === n ? S() : y(new Error(s.runtime.lastError.message)) : T && T.__mozWebExtensionPolyfillReject__ ? y(new Error(T.message)) : S(T);
          }, p = (y, S, T, ...O) => {
            if (O.length < S.minArgs)
              throw new Error(`Expected at least ${S.minArgs} ${d(S.minArgs)} for ${y}(), got ${O.length}`);
            if (O.length > S.maxArgs)
              throw new Error(`Expected at most ${S.maxArgs} ${d(S.maxArgs)} for ${y}(), got ${O.length}`);
            return new Promise((F, M) => {
              const U = u.bind(null, {
                resolve: F,
                reject: M
              });
              O.push(U), T.sendMessage(...O);
            });
          }, v = {
            devtools: {
              network: {
                onRequestFinished: _(h)
              }
            },
            runtime: {
              onMessage: _(f),
              onMessageExternal: _(f),
              sendMessage: p.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: p.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          }, b = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          return i.privacy = {
            network: {
              "*": b
            },
            services: {
              "*": b
            },
            websites: {
              "*": b
            }
          }, k(s, v, i);
        };
        r.exports = o(chrome);
      }
    });
  }(Tn)), Tn.exports;
}
xu();
var Cr;
(function(e) {
  e.Local = "local", e.Sync = "sync", e.Managed = "managed", e.Session = "session";
})(Cr || (Cr = {}));
var Mo;
(function(e) {
  e.ExtensionPagesOnly = "TRUSTED_CONTEXTS", e.ExtensionPagesAndContentScripts = "TRUSTED_AND_UNTRUSTED_CONTEXTS";
})(Mo || (Mo = {}));
const Ye = globalThis.chrome, Ks = async (e, t) => {
  const r = (o) => typeof o == "function", n = (o) => o instanceof Promise;
  return r(e) ? (n(e), e(t)) : e;
};
let Bs = !1;
function Gs(e) {
  if (Ye && Ye.storage[e] === void 0)
    throw new Error(`Check your storage permission in manifest.json: ${e} is not defined`);
}
function Uu(e, t, r) {
  var _, h;
  let n = null, o = !1, s = [];
  const i = (r == null ? void 0 : r.storageEnum) ?? Cr.Local, a = ((_ = r == null ? void 0 : r.serialization) == null ? void 0 : _.serialize) ?? ((f) => f), c = ((h = r == null ? void 0 : r.serialization) == null ? void 0 : h.deserialize) ?? ((f) => f);
  Bs === !1 && i === Cr.Session && (r == null ? void 0 : r.sessionAccessForContentScripts) === !0 && (Gs(i), Ye == null || Ye.storage[i].setAccessLevel({
    accessLevel: Mo.ExtensionPagesAndContentScripts
  }).catch((f) => {
    console.warn(f), console.warn("Please call setAccessLevel into different context, like a background script.");
  }), Bs = !0);
  const l = async () => {
    Gs(i);
    const f = await (Ye == null ? void 0 : Ye.storage[i].get([e]));
    return f ? c(f[e]) ?? t : t;
  }, d = () => {
    s.forEach((f) => f());
  }, m = async (f) => {
    o || (n = await l()), n = await Ks(f, n), await (Ye == null ? void 0 : Ye.storage[i].set({ [e]: a(n) })), d();
  }, g = (f) => (s = [...s, f], () => {
    s = s.filter((u) => u !== f);
  }), w = () => n;
  l().then((f) => {
    n = f, o = !0, d();
  });
  async function k(f) {
    if (f[e] === void 0)
      return;
    const u = c(f[e].newValue);
    n !== u && (n = await Ks(u, n), d());
  }
  return Ye == null || Ye.storage[i].onChanged.addListener(k), {
    get: l,
    set: m,
    getSnapshot: w,
    subscribe: g
  };
}
const Qs = Uu("theme-storage-key", "light", {
  storageEnum: Cr.Local
}), Fu = {
  ...Qs,
  toggle: async () => {
    await Qs.set((e) => e === "light" ? "dark" : "light");
  }
};
var St = /* @__PURE__ */ ((e) => (e[e.DEBUG = 0] = "DEBUG", e[e.INFO = 1] = "INFO", e[e.WARN = 2] = "WARN", e[e.ERROR = 3] = "ERROR", e[e.NONE = 4] = "NONE", e))(St || {});
const Lu = "mcp_logger_config";
class Zu {
  constructor(t = Lu) {
    J(this, "storageKey");
    this.storageKey = t;
  }
  /**
   * Get the global log level from storage
   */
  async getLevel() {
    try {
      if (typeof chrome > "u" || !chrome.storage)
        return null;
      const r = (await chrome.storage.local.get(this.storageKey))[this.storageKey];
      return r && typeof r.level == "number" ? r.level : null;
    } catch (t) {
      return console.error("[LoggerStorage] Failed to get level:", t), null;
    }
  }
  /**
   * Set the global log level in storage
   */
  async setLevel(t) {
    try {
      if (typeof chrome > "u" || !chrome.storage)
        return;
      const n = (await chrome.storage.local.get(this.storageKey))[this.storageKey] || {};
      n.level = t, await chrome.storage.local.set({ [this.storageKey]: n });
    } catch (r) {
      console.error("[LoggerStorage] Failed to set level:", r);
    }
  }
  /**
   * Get component-specific log levels from storage
   */
  async getComponentLevels() {
    try {
      if (typeof chrome > "u" || !chrome.storage)
        return {};
      const r = (await chrome.storage.local.get(this.storageKey))[this.storageKey];
      return r && r.componentLevels ? r.componentLevels : {};
    } catch (t) {
      return console.error("[LoggerStorage] Failed to get component levels:", t), {};
    }
  }
  /**
   * Set a component-specific log level in storage
   */
  async setComponentLevel(t, r) {
    try {
      if (typeof chrome > "u" || !chrome.storage)
        return;
      const o = (await chrome.storage.local.get(this.storageKey))[this.storageKey] || {};
      o.componentLevels || (o.componentLevels = {}), o.componentLevels[t] = r, await chrome.storage.local.set({ [this.storageKey]: o });
    } catch (n) {
      console.error("[LoggerStorage] Failed to set component level:", n);
    }
  }
  /**
   * Clear all logger configuration from storage
   */
  async clear() {
    try {
      if (typeof chrome > "u" || !chrome.storage)
        return;
      await chrome.storage.local.remove(this.storageKey);
    } catch (t) {
      console.error("[LoggerStorage] Failed to clear storage:", t);
    }
  }
}
const Vu = { BASE_URL: "/", CEB_GA_API_SECRET: "I0PHa_CWTbuTlXSb3T-kXg", CEB_GA_MEASUREMENT_ID: "G-6ENY3Y3H9X", DEV: !0, MODE: "production", PROD: !1, SSR: !1, VITE_USER_NODE_ENV: "development" };
function Xs(e) {
  return typeof e == "number" ? e : St[e];
}
class ds {
  constructor(t = "", r) {
    J(this, "level");
    J(this, "componentLevels");
    J(this, "namespace");
    J(this, "storage");
    J(this, "defaultLevel");
    J(this, "isInitialized", !1);
    this.namespace = t, this.componentLevels = /* @__PURE__ */ new Map();
    const n = this.isProductionEnvironment();
    this.defaultLevel = n ? St.ERROR : St.DEBUG, this.level = St.ERROR, r != null && r.componentLevels && Object.entries(r.componentLevels).forEach(([o, s]) => {
      this.componentLevels.set(o, s);
    }), this.storage = (r == null ? void 0 : r.persist) !== !1 ? new Zu(r == null ? void 0 : r.storageKey) : null, this.storage && this.initializeFromStorage();
  }
  /**
   * Detect if running in production environment
   */
  isProductionEnvironment() {
    try {
      if (typeof import.meta < "u" && Vu)
        return !1;
    } catch {
    }
    if (typeof chrome < "u" && chrome.runtime)
      try {
        return !chrome.runtime.getURL("").includes("dev");
      } catch {
      }
    return !0;
  }
  /**
   * Initialize logger settings from Chrome Storage
   */
  async initializeFromStorage() {
    if (this.storage)
      try {
        const t = await this.storage.getLevel();
        t !== null && (this.level = t);
        const r = await this.storage.getComponentLevels();
        Object.entries(r).forEach(([n, o]) => {
          this.componentLevels.set(n, o);
        }), this.isInitialized = !0;
      } catch (t) {
        console.error("[Logger] Failed to initialize from storage:", t);
      }
  }
  /**
   * Get the effective log level for this logger instance
   */
  getEffectiveLevel() {
    return this.namespace && this.componentLevels.has(this.namespace) ? this.componentLevels.get(this.namespace) : this.level;
  }
  /**
   * Check if a message should be logged based on current level
   */
  shouldLog(t) {
    return t >= this.getEffectiveLevel();
  }
  /**
   * Format the log message with namespace prefix
   */
  formatMessage(...t) {
    return this.namespace ? [`[${this.namespace}]`, ...t] : t;
  }
  /**
   * Log a debug message
   */
  debug(...t) {
    this.shouldLog(St.DEBUG) && console.debug(...this.formatMessage(...t));
  }
  /**
   * Log an info message
   */
  info(...t) {
    this.shouldLog(St.INFO) && console.info(...this.formatMessage(...t));
  }
  /**
   * Log a warning message
   */
  warn(...t) {
    this.shouldLog(St.WARN) && console.warn(...this.formatMessage(...t));
  }
  /**
   * Log an error message
   */
  error(...t) {
    this.shouldLog(St.ERROR) && console.error(...this.formatMessage(...t));
  }
  /**
   * Set the global log level
   */
  setLevel(t) {
    this.level = Xs(t), this.storage && this.storage.setLevel(this.level).catch((r) => {
      console.error("[Logger] Failed to persist level:", r);
    });
  }
  /**
   * Get the current global log level
   */
  getLevel() {
    return this.level;
  }
  /**
   * Set a component-specific log level
   */
  setComponentLevel(t, r) {
    const n = Xs(r);
    this.componentLevels.set(t, n), this.storage && this.storage.setComponentLevel(t, n).catch((o) => {
      console.error("[Logger] Failed to persist component level:", o);
    });
  }
  /**
   * Get a component-specific log level
   */
  getComponentLevel(t) {
    return this.componentLevels.get(t);
  }
  /**
   * Reset all log levels to environment defaults
   */
  resetToDefaults() {
    this.level = this.defaultLevel, this.componentLevels.clear(), this.storage && this.storage.clear().catch((t) => {
      console.error("[Logger] Failed to clear storage:", t);
    });
  }
  /**
   * Create a child logger with a specific namespace
   */
  child(t) {
    return new ds(t, {
      level: this.level,
      componentLevels: Object.fromEntries(this.componentLevels),
      persist: !1
      // Child loggers don't persist independently
    });
  }
  /**
   * Wait for storage initialization to complete
   */
  async waitForInitialization() {
    if (!this.storage) return;
    const t = 2e3, r = Date.now();
    for (; !this.isInitialized && Date.now() - r < t; )
      await new Promise((n) => setTimeout(n, 50));
  }
}
let lo = null;
function nt(e, t) {
  return lo || (lo = new ds("", t)), lo.child(e);
}
const Ee = nt("FirebaseRemoteConfigAPI");
class Hu {
  constructor() {
    J(this, "projectConfig");
    J(this, "cachedConfig", {});
    J(this, "lastFetchTime", 0);
    J(this, "minimumFetchInterval", 36e5);
    // 1 hour in production
    J(this, "fetchTimeout", 6e4);
    // 60 seconds
    // Default configuration values
    J(this, "defaultConfig", {
      notifications_enabled: "true",
      max_notifications_per_day: "3",
      notification_cooldown_hours: "4",
      features: JSON.stringify({
        sidebar_v2: { enabled: !1, rollout: 0, schema_version: 1 },
        ai_tools_enhanced: { enabled: !0, rollout: 100, schema_version: 1 },
        notification_system: { enabled: !0, rollout: 100, schema_version: 1 }
      }),
      config_version: "1.0.0",
      schema_version: "1",
      last_updated: (/* @__PURE__ */ new Date()).toISOString(),
      privacy_policy_version: "1.0.0",
      data_collection_consent_required: "true",
      active_notifications: JSON.stringify([]),
      update_notifications: JSON.stringify({
        enabled: !0,
        min_version_gap: "0.1.0",
        channels: ["in-app", "badge"],
        schema_version: 1
      })
    });
    {
      Ee.debug("[FirebaseRemoteConfigAPI] Remote Config is DISABLED - using defaults only"), this.projectConfig = { projectId: "", apiKey: "", appId: "" }, this.minimumFetchInterval = 0;
      return;
    }
  }
  async initialize() {
    Ee.debug("[FirebaseRemoteConfigAPI] Initializing Remote Config API...");
    {
      Ee.debug("[FirebaseRemoteConfigAPI] Remote Config DISABLED - initializing with defaults only"), this.initializeWithDefaults(), Ee.debug("[FirebaseRemoteConfigAPI] Remote Config API initialized with defaults only");
      return;
    }
  }
  async fetchAndActivate(t = !1) {
    return Ee.debug("[FirebaseRemoteConfigAPI] Remote Config DISABLED - skipping fetch, using defaults only"), !1;
  }
  async fetchRemoteConfig() {
    try {
      const t = await this.getInstallationId(), r = `https://firebaseremoteconfig.googleapis.com/v1/projects/${this.projectConfig.projectId}/namespaces/firebase:fetch`, n = {
        appId: this.projectConfig.appId,
        appInstanceId: t,
        appInstanceIdToken: "",
        // Would need Firebase Installations API for this
        languageCode: "en-US",
        platformVersion: chrome.runtime.getManifest().version,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }, o = new AbortController(), s = setTimeout(() => o.abort(), this.fetchTimeout);
      Ee.debug("[FirebaseRemoteConfigAPI] Making request to:", r), Ee.debug("[FirebaseRemoteConfigAPI] Request body:", JSON.stringify(n, null, 2));
      const i = await fetch(r, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": this.projectConfig.apiKey
        },
        body: JSON.stringify(n),
        signal: o.signal
      });
      if (clearTimeout(s), Ee.debug("[FirebaseRemoteConfigAPI] Response status:", i.status, i.statusText), Ee.debug("[FirebaseRemoteConfigAPI] Content-Type:", i.headers.get("content-type")), !i.ok) {
        const c = await i.text();
        throw Ee.error("[FirebaseRemoteConfigAPI] Error response body:", c), new Error(`HTTP ${i.status}: ${i.statusText} - ${c}`);
      }
      const a = await i.json();
      if (Ee.debug("[FirebaseRemoteConfigAPI] Raw Firebase response:", JSON.stringify(a, null, 2)), a.entries) {
        const c = {};
        Object.entries(a.entries).forEach(([d, m]) => {
          c[d] = {
            value: m,
            source: "remote"
          };
        });
        const l = {};
        for (const [d, m] of Object.entries(this.defaultConfig))
          l[d] = {
            value: m,
            source: "default"
          };
        Object.assign(l, c), this.cachedConfig = l, Ee.debug(`Updated config with ${Object.keys(a.entries).length} remote values, removed deleted keys`), Ee.debug("[FirebaseRemoteConfigAPI] Fetched configuration details:"), Object.entries(c).forEach(([d, m]) => {
          const g = m.value, w = m.source;
          let k = g;
          try {
            if (g && typeof g == "string") {
              const _ = JSON.parse(g);
              k = JSON.stringify(_, null, 2);
            }
          } catch {
          }
          Ee.debug(`  ${d} (${w}):`, k);
        });
      } else
        Ee.warn("[FirebaseRemoteConfigAPI] No entries found in response:", a);
      return !0;
    } catch (t) {
      return t instanceof Error && t.name === "AbortError" ? Ee.error("[FirebaseRemoteConfigAPI] Fetch timeout") : Ee.error("[FirebaseRemoteConfigAPI] Fetch failed:", t), !1;
    }
  }
  getValue(t) {
    return this.cachedConfig[t] ? this.cachedConfig[t] : this.defaultConfig[t] ? {
      value: this.defaultConfig[t],
      source: "default"
    } : {
      value: "",
      source: "static"
    };
  }
  getAll() {
    const t = {};
    for (const [r, n] of Object.entries(this.defaultConfig))
      t[r] = {
        value: n,
        source: "default"
      };
    for (const [r, n] of Object.entries(this.cachedConfig))
      t[r] = n;
    return t;
  }
  initializeWithDefaults() {
    for (const [t, r] of Object.entries(this.defaultConfig))
      this.cachedConfig[t] || (this.cachedConfig[t] = {
        value: r,
        source: "default"
      });
  }
  async loadCachedConfig() {
    try {
      const t = await chrome.storage.local.get(["firebaseRemoteConfig", "firebaseRemoteConfigLastFetch"]);
      t.firebaseRemoteConfig && (this.cachedConfig = t.firebaseRemoteConfig), t.firebaseRemoteConfigLastFetch && (this.lastFetchTime = t.firebaseRemoteConfigLastFetch);
    } catch (t) {
      Ee.error("[FirebaseRemoteConfigAPI] Failed to load cached config:", t);
    }
  }
  async saveCachedConfig() {
    try {
      await chrome.storage.local.set({
        firebaseRemoteConfig: this.cachedConfig,
        firebaseRemoteConfigLastFetch: this.lastFetchTime
      });
    } catch (t) {
      Ee.error("[FirebaseRemoteConfigAPI] Failed to save cached config:", t);
    }
  }
  async getInstallationId() {
    try {
      const t = await chrome.storage.local.get(["firebaseInstallationId"]);
      if (t.firebaseInstallationId)
        return t.firebaseInstallationId;
      const r = this.generateInstallationId();
      return await chrome.storage.local.set({ firebaseInstallationId: r }), r;
    } catch (t) {
      return Ee.error("[FirebaseRemoteConfigAPI] Failed to get installation ID:", t), this.generateInstallationId();
    }
  }
  generateInstallationId() {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let r = "";
    for (let n = 0; n < 22; n++)
      r += t.charAt(Math.floor(Math.random() * t.length));
    return r;
  }
  /**
   * Clear cached config and force a fresh fetch
   * Useful when dealing with deleted Firebase keys
   */
  async clearCacheAndRefetch() {
    return Ee.debug("[FirebaseRemoteConfigAPI] Remote Config DISABLED - skipping cache clear, using defaults only"), !1;
  }
}
const fo = (e) => {
  if (!e || typeof e != "object")
    return !1;
  try {
    return !(e.features && typeof e.features != "object" || e.notifications && !Array.isArray(e.notifications));
  } catch (t) {
    return Ee.error("[FirebaseRemoteConfigAPI] Validation error:", t), !1;
  }
}, He = new Hu(), te = nt("RemoteConfigManager");
class Wu {
  constructor() {
    J(this, "isInitialized", !1);
    J(this, "fetchInterval", null);
    J(this, "lastFetchTime", null);
    J(this, "retryCount", 0);
    J(this, "maxRetries", 3);
  }
  async initialize() {
    try {
      te.debug("[RemoteConfigManager] Initializing Remote Config Manager..."), await He.initialize(), await this.fetchConfig(!0), this.startPeriodicFetch(), this.isInitialized = !0, te.debug("[RemoteConfigManager] Remote Config Manager initialized successfully");
    } catch (t) {
      throw te.error("[RemoteConfigManager] Failed to initialize:", t), t;
    }
  }
  async fetchConfig(t = !1) {
    try {
      const r = Date.now();
      if (!t && this.lastFetchTime && r - this.lastFetchTime < 36e5) {
        te.debug("[RemoteConfigManager] Skipping fetch due to minimum interval");
        return;
      }
      te.debug("[RemoteConfigManager] Fetching remote config..."), await He.fetchAndActivate(t), await this.processConfiguration(), this.lastFetchTime = r, await this.setLastFetchTime(r), this.retryCount = 0, te.debug("[RemoteConfigManager] Remote config fetched successfully");
      const o = He.getAll(), s = Object.values(o).filter((a) => a.source === "remote").length, i = Object.values(o).filter((a) => a.source === "default").length;
      te.debug(`Config summary: ${s} remote values, ${i} default values`);
    } catch (r) {
      this.retryCount++;
      const n = r instanceof Error ? r.message : String(r);
      if (te.error("[RemoteConfigManager] Failed to fetch config:", n), this.retryCount <= this.maxRetries) {
        const o = Math.pow(2, this.retryCount) * 1e3;
        setTimeout(() => this.fetchConfig(t), o);
      }
      throw r;
    }
  }
  async processConfiguration() {
    try {
      const t = He.getAll();
      te.debug("[RemoteConfigManager] Processing configuration. Available configs:"), Object.entries(t).forEach(([r, n]) => {
        const o = n.value, s = n.source;
        let i = o;
        try {
          const a = JSON.parse(o);
          i = JSON.stringify(a, null, 2);
        } catch {
        }
        te.debug(`  ${r} (${s}):`, i);
      }), await this.processFeatureFlags(t), await this.processNotifications(t), await this.processAdapterConfigurations(t), await this.processVersionConfigurations(t);
    } catch (t) {
      throw te.error("[RemoteConfigManager] Failed to process configuration:", t), t;
    }
  }
  async processFeatureFlags(t) {
    try {
      const n = He.getValue("features").value;
      if (n) {
        const o = JSON.parse(n);
        fo({ features: o }) && (await this.broadcastFeatureFlags(o), te.debug(`Updated ${Object.keys(o).length} feature flags`));
      }
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to process feature flags:", r);
    }
  }
  async processNotifications(t) {
    try {
      const n = He.getValue("active_notifications").value;
      if (n) {
        const o = JSON.parse(n);
        fo({ notifications: o }) && (await this.broadcastNotifications(o), te.debug(`Processed ${o.length} notifications`));
      }
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to process notifications:", r);
    }
  }
  async processAdapterConfigurations(t) {
    try {
      let r = {}, n = !1;
      const s = He.getValue("adapter_configs").value;
      if (s)
        try {
          const a = JSON.parse(s);
          r = { ...a }, n = !0, te.debug(`Found unified adapter_configs with ${Object.keys(a).length} adapters`);
        } catch (a) {
          te.warn("[RemoteConfigManager] Failed to parse unified adapter_configs:", a);
        }
      const i = Object.keys(t).filter((a) => a.endsWith("_adapter_config"));
      if (i.length > 0) {
        te.debug(`Found ${i.length} individual adapter config parameters:`, i);
        for (const a of i)
          try {
            const c = He.getValue(a);
            if (c.value) {
              const l = JSON.parse(c.value), d = a.replace("_adapter_config", "");
              r[d] = l, n = !0, te.debug(`Loaded individual config for adapter: ${d}`);
            }
          } catch (c) {
            te.warn(`Failed to parse ${a}:`, c);
          }
      }
      n && Object.keys(r).length > 0 ? this.validateAdapterConfigs(r) ? (await this.broadcastAdapterConfigs(r), te.debug(`Processed and broadcasted ${Object.keys(r).length} adapter configurations`)) : te.warn("[RemoteConfigManager] Adapter configs validation failed") : te.debug("[RemoteConfigManager] No adapter configurations found");
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to process adapter configurations:", r);
    }
  }
  validateAdapterConfigs(t) {
    if (!t || typeof t != "object")
      return te.warn("[RemoteConfigManager] Invalid adapter configs structure"), !1;
    for (const [r, n] of Object.entries(t)) {
      if (!n || typeof n != "object") {
        te.warn(`Invalid config for adapter: ${r}`);
        continue;
      }
      const o = n;
      if (!o.selectors || !o.ui) {
        te.warn(`Missing required fields for adapter: ${r}`);
        continue;
      }
    }
    return !0;
  }
  async processVersionConfigurations(t) {
    try {
      const n = `version_config_${chrome.runtime.getManifest().version.replace(/\./g, "_")}`, s = He.getValue(n).value;
      if (s) {
        const i = JSON.parse(s);
        fo(i) && (await this.broadcastVersionConfig(i), te.debug("[RemoteConfigManager] Applied version-specific configuration"));
      }
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to process version configurations:", r);
    }
  }
  async broadcastFeatureFlags(t) {
    try {
      const r = await chrome.tabs.query({ active: !0 });
      for (const n of r)
        if (n.id)
          try {
            await chrome.tabs.sendMessage(n.id, {
              type: "remote-config:feature-flags-updated",
              data: {
                flags: t,
                timestamp: Date.now()
              }
            });
          } catch {
            te.debug("[RemoteConfigManager] Could not send message to tab:", n.id);
          }
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to broadcast feature flags:", r);
    }
  }
  async broadcastNotifications(t) {
    try {
      const r = await chrome.tabs.query({ active: !0 });
      for (const n of r)
        if (n.id)
          try {
            await chrome.tabs.sendMessage(n.id, {
              type: "remote-config:notifications-received",
              data: {
                notifications: t,
                timestamp: Date.now()
              }
            });
          } catch {
            te.debug("[RemoteConfigManager] Could not send message to tab:", n.id);
          }
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to broadcast notifications:", r);
    }
  }
  async broadcastAdapterConfigs(t) {
    try {
      const r = await chrome.tabs.query({});
      let n = 0;
      for (const o of r)
        if (o.id && o.url && !o.url.startsWith("chrome://") && !o.url.startsWith("chrome-extension://"))
          try {
            await chrome.tabs.sendMessage(o.id, {
              type: "remote-config:adapter-configs-updated",
              data: {
                adapterConfigs: t,
                timestamp: Date.now()
              }
            }), n++;
          } catch (s) {
            te.debug(`Could not send adapter config message to tab ${o.id}:`, s instanceof Error ? s.message : String(s));
          }
      te.debug(`Broadcasted adapter configs to ${n} tabs`);
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to broadcast adapter configurations:", r);
    }
  }
  async broadcastVersionConfig(t) {
    try {
      const r = await chrome.tabs.query({ active: !0 });
      for (const n of r)
        if (n.id)
          try {
            await chrome.tabs.sendMessage(n.id, {
              type: "remote-config:version-config-updated",
              data: {
                config: t,
                timestamp: Date.now()
              }
            });
          } catch {
            te.debug("[RemoteConfigManager] Could not send message to tab:", n.id);
          }
    } catch (r) {
      te.error("[RemoteConfigManager] Failed to broadcast version config:", r);
    }
  }
  //development
  //   private startPeriodicFetch(): void {
  //     // Fetch every 5 sec
  //     this.fetchInterval = setInterval(() => {
  //       this.fetchConfig(true);
  //     }, 5000);
  //     logger.debug('[RemoteConfigManager] Started periodic config fetching');
  //   }
  startPeriodicFetch() {
    this.fetchInterval = setInterval(() => {
      this.fetchConfig(!1);
    }, 12 * 60 * 60 * 1e3), te.debug("[RemoteConfigManager] Started periodic config fetching");
  }
  stopPeriodicFetch() {
    this.fetchInterval && (clearInterval(this.fetchInterval), this.fetchInterval = null, te.debug("[RemoteConfigManager] Stopped periodic config fetching"));
  }
  async setLastFetchTime(t) {
    await chrome.storage.local.set({ remoteConfigLastFetch: t });
  }
  async getLastFetchTime() {
    const t = await chrome.storage.local.get(["remoteConfigLastFetch"]);
    return (t == null ? void 0 : t.remoteConfigLastFetch) || null;
  }
  async getFeatureFlag(t) {
    try {
      const n = He.getValue("features").value;
      return n && JSON.parse(n)[t] || null;
    } catch (r) {
      return te.error("[RemoteConfigManager] Failed to get feature flag:", r), null;
    }
  }
  async getAllConfig() {
    try {
      return He.getAll();
    } catch (t) {
      return te.error("[RemoteConfigManager] Failed to get all config:", t), {};
    }
  }
  async getSpecificConfig(t) {
    try {
      const r = He.getAll();
      if (t.includes("adapter_config")) {
        const o = He.getValue("adapter_configs").value;
        if (o) {
          const i = JSON.parse(o);
          if (t.endsWith("_adapter_config")) {
            const a = t.replace("_adapter_config", "");
            return { [t]: i[a] || null };
          }
        }
        const s = He.getValue(t);
        if (s.value)
          try {
            return { [t]: JSON.parse(s.value) };
          } catch {
            return { [t]: s.value };
          }
        return { [t]: null };
      }
      if (r[t]) {
        const n = r[t];
        try {
          return { [t]: JSON.parse(n.value) };
        } catch {
          return { [t]: n.value };
        }
      }
      return { [t]: null };
    } catch (r) {
      return te.error(`Failed to get specific config for key ${t}:`, r), { [t]: null };
    }
  }
  async cleanup() {
    this.stopPeriodicFetch(), this.isInitialized = !1, this.lastFetchTime = null, this.retryCount = 0, te.debug("[RemoteConfigManager] Cleaned up");
  }
  get initialized() {
    return this.isInitialized;
  }
  async getLastFetchTimePublic() {
    return this.getLastFetchTime();
  }
  /**
   * Clear cache and force refresh - useful for handling deleted Firebase keys
   */
  async clearCacheAndRefresh() {
    try {
      te.debug("[RemoteConfigManager] Clearing cache and forcing refresh...");
      const t = await He.clearCacheAndRefetch();
      return t && (await this.processConfiguration(), te.debug("[RemoteConfigManager] Cache cleared and config refreshed successfully")), t;
    } catch (t) {
      return te.error("[RemoteConfigManager] Failed to clear cache and refresh:", t), !1;
    }
  }
}
const Ju = Object.freeze({
  status: "aborted"
});
function z(e, t, r) {
  function n(a, c) {
    if (a._zod || Object.defineProperty(a, "_zod", {
      value: {
        def: c,
        constr: i,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), a._zod.traits.has(e))
      return;
    a._zod.traits.add(e), t(a, c);
    const l = i.prototype, d = Object.keys(l);
    for (let m = 0; m < d.length; m++) {
      const g = d[m];
      g in a || (a[g] = l[g].bind(a));
    }
  }
  const o = (r == null ? void 0 : r.Parent) ?? Object;
  class s extends o {
  }
  Object.defineProperty(s, "name", { value: e });
  function i(a) {
    var c;
    const l = r != null && r.Parent ? new s() : this;
    n(l, a), (c = l._zod).deferred ?? (c.deferred = []);
    for (const d of l._zod.deferred)
      d();
    return l;
  }
  return Object.defineProperty(i, "init", { value: n }), Object.defineProperty(i, Symbol.hasInstance, {
    value: (a) => {
      var c, l;
      return r != null && r.Parent && a instanceof r.Parent ? !0 : (l = (c = a == null ? void 0 : a._zod) == null ? void 0 : c.traits) == null ? void 0 : l.has(e);
    }
  }), Object.defineProperty(i, "name", { value: e }), i;
}
class sr extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Qa extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const Xa = {};
function At(e) {
  return Xa;
}
function Ya(e) {
  const t = Object.values(e).filter((n) => typeof n == "number");
  return Object.entries(e).filter(([n, o]) => t.indexOf(+n) === -1).map(([n, o]) => o);
}
function jo(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Jn(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function fs(e) {
  return e == null;
}
function hs(e) {
  const t = e.startsWith("^") ? 1 : 0, r = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, r);
}
function Ku(e, t) {
  const r = (e.toString().split(".")[1] || "").length, n = t.toString();
  let o = (n.split(".")[1] || "").length;
  if (o === 0 && /\d?e-\d?/.test(n)) {
    const c = n.match(/\d?e-(\d?)/);
    c != null && c[1] && (o = Number.parseInt(c[1]));
  }
  const s = r > o ? r : o, i = Number.parseInt(e.toFixed(s).replace(".", "")), a = Number.parseInt(t.toFixed(s).replace(".", ""));
  return i % a / 10 ** s;
}
const Ys = Symbol("evaluating");
function fe(e, t, r) {
  let n;
  Object.defineProperty(e, t, {
    get() {
      if (n !== Ys)
        return n === void 0 && (n = Ys, n = r()), n;
    },
    set(o) {
      Object.defineProperty(e, t, {
        value: o
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Jt(e, t, r) {
  Object.defineProperty(e, t, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function It(...e) {
  const t = {};
  for (const r of e) {
    const n = Object.getOwnPropertyDescriptors(r);
    Object.assign(t, n);
  }
  return Object.defineProperties({}, t);
}
function ei(e) {
  return JSON.stringify(e);
}
function Bu(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const ec = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Tr(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Gu = Jn(() => {
  var e;
  if (typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) != null && e.includes("Cloudflare")))
    return !1;
  try {
    const t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function ur(e) {
  if (Tr(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const r = t.prototype;
  return !(Tr(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function tc(e) {
  return ur(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const Qu = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function lr(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ot(e, t, r) {
  const n = new e._zod.constr(t ?? e._zod.def);
  return (!t || r != null && r.parent) && (n._zod.parent = e), n;
}
function K(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if ((t == null ? void 0 : t.message) !== void 0) {
    if ((t == null ? void 0 : t.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function Xu(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const Yu = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function el(e, t) {
  const r = e._zod.def, n = r.checks;
  if (n && n.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const s = It(e._zod.def, {
    get shape() {
      const i = {};
      for (const a in t) {
        if (!(a in r.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && (i[a] = r.shape[a]);
      }
      return Jt(this, "shape", i), i;
    },
    checks: []
  });
  return Ot(e, s);
}
function tl(e, t) {
  const r = e._zod.def, n = r.checks;
  if (n && n.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const s = It(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape };
      for (const a in t) {
        if (!(a in r.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && delete i[a];
      }
      return Jt(this, "shape", i), i;
    },
    checks: []
  });
  return Ot(e, s);
}
function rl(e, t) {
  if (!ur(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const r = e._zod.def.checks;
  if (r && r.length > 0) {
    const s = e._zod.def.shape;
    for (const i in t)
      if (Object.getOwnPropertyDescriptor(s, i) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const o = It(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape, ...t };
      return Jt(this, "shape", s), s;
    }
  });
  return Ot(e, o);
}
function nl(e, t) {
  if (!ur(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const r = It(e._zod.def, {
    get shape() {
      const n = { ...e._zod.def.shape, ...t };
      return Jt(this, "shape", n), n;
    }
  });
  return Ot(e, r);
}
function ol(e, t) {
  const r = It(e._zod.def, {
    get shape() {
      const n = { ...e._zod.def.shape, ...t._zod.def.shape };
      return Jt(this, "shape", n), n;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Ot(e, r);
}
function sl(e, t, r) {
  const o = t._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const i = It(t._zod.def, {
    get shape() {
      const a = t._zod.def.shape, c = { ...a };
      if (r)
        for (const l in r) {
          if (!(l in a))
            throw new Error(`Unrecognized key: "${l}"`);
          r[l] && (c[l] = e ? new e({
            type: "optional",
            innerType: a[l]
          }) : a[l]);
        }
      else
        for (const l in a)
          c[l] = e ? new e({
            type: "optional",
            innerType: a[l]
          }) : a[l];
      return Jt(this, "shape", c), c;
    },
    checks: []
  });
  return Ot(t, i);
}
function il(e, t, r) {
  const n = It(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, s = { ...o };
      if (r)
        for (const i in r) {
          if (!(i in s))
            throw new Error(`Unrecognized key: "${i}"`);
          r[i] && (s[i] = new e({
            type: "nonoptional",
            innerType: o[i]
          }));
        }
      else
        for (const i in o)
          s[i] = new e({
            type: "nonoptional",
            innerType: o[i]
          });
      return Jt(this, "shape", s), s;
    }
  });
  return Ot(t, n);
}
function tr(e, t = 0) {
  var r;
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (((r = e.issues[n]) == null ? void 0 : r.continue) !== !0)
      return !0;
  return !1;
}
function rr(e, t) {
  return t.map((r) => {
    var n;
    return (n = r).path ?? (n.path = []), r.path.unshift(e), r;
  });
}
function Dr(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function Rt(e, t, r) {
  var o, s, i, a, c, l;
  const n = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const d = Dr((i = (s = (o = e.inst) == null ? void 0 : o._zod.def) == null ? void 0 : s.error) == null ? void 0 : i.call(s, e)) ?? Dr((a = t == null ? void 0 : t.error) == null ? void 0 : a.call(t, e)) ?? Dr((c = r.customError) == null ? void 0 : c.call(r, e)) ?? Dr((l = r.localeError) == null ? void 0 : l.call(r, e)) ?? "Invalid input";
    n.message = d;
  }
  return delete n.inst, delete n.continue, t != null && t.reportInput || delete n.input, n;
}
function ps(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Pr(...e) {
  const [t, r, n] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: r,
    inst: n
  } : { ...t };
}
const rc = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, jo, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, nc = z("$ZodError", rc), oc = z("$ZodError", rc, { Parent: Error });
function al(e, t = (r) => r.message) {
  const r = {}, n = [];
  for (const o of e.issues)
    o.path.length > 0 ? (r[o.path[0]] = r[o.path[0]] || [], r[o.path[0]].push(t(o))) : n.push(t(o));
  return { formErrors: n, fieldErrors: r };
}
function cl(e, t = (r) => r.message) {
  const r = { _errors: [] }, n = (o) => {
    for (const s of o.issues)
      if (s.code === "invalid_union" && s.errors.length)
        s.errors.map((i) => n({ issues: i }));
      else if (s.code === "invalid_key")
        n({ issues: s.issues });
      else if (s.code === "invalid_element")
        n({ issues: s.issues });
      else if (s.path.length === 0)
        r._errors.push(t(s));
      else {
        let i = r, a = 0;
        for (; a < s.path.length; ) {
          const c = s.path[a];
          a === s.path.length - 1 ? (i[c] = i[c] || { _errors: [] }, i[c]._errors.push(t(s))) : i[c] = i[c] || { _errors: [] }, i = i[c], a++;
        }
      }
  };
  return n(e), r;
}
const ms = (e) => (t, r, n, o) => {
  const s = n ? Object.assign(n, { async: !1 }) : { async: !1 }, i = t._zod.run({ value: r, issues: [] }, s);
  if (i instanceof Promise)
    throw new sr();
  if (i.issues.length) {
    const a = new ((o == null ? void 0 : o.Err) ?? e)(i.issues.map((c) => Rt(c, s, At())));
    throw ec(a, o == null ? void 0 : o.callee), a;
  }
  return i.value;
}, gs = (e) => async (t, r, n, o) => {
  const s = n ? Object.assign(n, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: r, issues: [] }, s);
  if (i instanceof Promise && (i = await i), i.issues.length) {
    const a = new ((o == null ? void 0 : o.Err) ?? e)(i.issues.map((c) => Rt(c, s, At())));
    throw ec(a, o == null ? void 0 : o.callee), a;
  }
  return i.value;
}, Kn = (e) => (t, r, n) => {
  const o = n ? { ...n, async: !1 } : { async: !1 }, s = t._zod.run({ value: r, issues: [] }, o);
  if (s instanceof Promise)
    throw new sr();
  return s.issues.length ? {
    success: !1,
    error: new (e ?? nc)(s.issues.map((i) => Rt(i, o, At())))
  } : { success: !0, data: s.value };
}, sc = /* @__PURE__ */ Kn(oc), Bn = (e) => async (t, r, n) => {
  const o = n ? Object.assign(n, { async: !0 }) : { async: !0 };
  let s = t._zod.run({ value: r, issues: [] }, o);
  return s instanceof Promise && (s = await s), s.issues.length ? {
    success: !1,
    error: new e(s.issues.map((i) => Rt(i, o, At())))
  } : { success: !0, data: s.value };
}, ul = /* @__PURE__ */ Bn(oc), ll = (e) => (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return ms(e)(t, r, o);
}, dl = (e) => (t, r, n) => ms(e)(t, r, n), fl = (e) => async (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return gs(e)(t, r, o);
}, hl = (e) => async (t, r, n) => gs(e)(t, r, n), pl = (e) => (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return Kn(e)(t, r, o);
}, ml = (e) => (t, r, n) => Kn(e)(t, r, n), gl = (e) => async (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return Bn(e)(t, r, o);
}, _l = (e) => async (t, r, n) => Bn(e)(t, r, n), yl = /^[cC][^\s-]{8,}$/, vl = /^[0-9a-z]+$/, wl = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, bl = /^[0-9a-vA-V]{20}$/, $l = /^[A-Za-z0-9]{27}$/, Sl = /^[a-zA-Z0-9_-]{21}$/, kl = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, El = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, ti = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Cl = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Tl = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Pl() {
  return new RegExp(Tl, "u");
}
const Al = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Rl = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Il = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Ol = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, zl = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ic = /^[A-Za-z0-9_-]*$/, Nl = /^\+[1-9]\d{6,14}$/, ac = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", Ml = /* @__PURE__ */ new RegExp(`^${ac}$`);
function cc(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function jl(e) {
  return new RegExp(`^${cc(e)}$`);
}
function ql(e) {
  const t = cc({ precision: e.precision }), r = ["Z"];
  e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const n = `${t}(?:${r.join("|")})`;
  return new RegExp(`^${ac}T(?:${n})$`);
}
const Dl = (e) => {
  const t = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, xl = /^-?\d+$/, uc = /^-?\d+(?:\.\d+)?$/, Ul = /^(?:true|false)$/i, Fl = /^null$/i, Ll = /^[^A-Z]*$/, Zl = /^[^a-z]*$/, tt = /* @__PURE__ */ z("$ZodCheck", (e, t) => {
  var r;
  e._zod ?? (e._zod = {}), e._zod.def = t, (r = e._zod).onattach ?? (r.onattach = []);
}), lc = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, dc = /* @__PURE__ */ z("$ZodCheckLessThan", (e, t) => {
  tt.init(e, t);
  const r = lc[typeof t.value];
  e._zod.onattach.push((n) => {
    const o = n._zod.bag, s = (t.inclusive ? o.maximum : o.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < s && (t.inclusive ? o.maximum = t.value : o.exclusiveMaximum = t.value);
  }), e._zod.check = (n) => {
    (t.inclusive ? n.value <= t.value : n.value < t.value) || n.issues.push({
      origin: r,
      code: "too_big",
      maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: n.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), fc = /* @__PURE__ */ z("$ZodCheckGreaterThan", (e, t) => {
  tt.init(e, t);
  const r = lc[typeof t.value];
  e._zod.onattach.push((n) => {
    const o = n._zod.bag, s = (t.inclusive ? o.minimum : o.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > s && (t.inclusive ? o.minimum = t.value : o.exclusiveMinimum = t.value);
  }), e._zod.check = (n) => {
    (t.inclusive ? n.value >= t.value : n.value > t.value) || n.issues.push({
      origin: r,
      code: "too_small",
      minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: n.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), Vl = /* @__PURE__ */ z("$ZodCheckMultipleOf", (e, t) => {
  tt.init(e, t), e._zod.onattach.push((r) => {
    var n;
    (n = r._zod.bag).multipleOf ?? (n.multipleOf = t.value);
  }), e._zod.check = (r) => {
    if (typeof r.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof r.value == "bigint" ? r.value % t.value === BigInt(0) : Ku(r.value, t.value) === 0) || r.issues.push({
      origin: typeof r.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Hl = /* @__PURE__ */ z("$ZodCheckNumberFormat", (e, t) => {
  var i;
  tt.init(e, t), t.format = t.format || "float64";
  const r = (i = t.format) == null ? void 0 : i.includes("int"), n = r ? "int" : "number", [o, s] = Yu[t.format];
  e._zod.onattach.push((a) => {
    const c = a._zod.bag;
    c.format = t.format, c.minimum = o, c.maximum = s, r && (c.pattern = xl);
  }), e._zod.check = (a) => {
    const c = a.value;
    if (r) {
      if (!Number.isInteger(c)) {
        a.issues.push({
          expected: n,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: c,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(c)) {
        c > 0 ? a.issues.push({
          input: c,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: n,
          inclusive: !0,
          continue: !t.abort
        }) : a.issues.push({
          input: c,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: n,
          inclusive: !0,
          continue: !t.abort
        });
        return;
      }
    }
    c < o && a.issues.push({
      origin: "number",
      input: c,
      code: "too_small",
      minimum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), c > s && a.issues.push({
      origin: "number",
      input: c,
      code: "too_big",
      maximum: s,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), Wl = /* @__PURE__ */ z("$ZodCheckMaxLength", (e, t) => {
  var r;
  tt.init(e, t), (r = e._zod.def).when ?? (r.when = (n) => {
    const o = n.value;
    return !fs(o) && o.length !== void 0;
  }), e._zod.onattach.push((n) => {
    const o = n._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (n._zod.bag.maximum = t.maximum);
  }), e._zod.check = (n) => {
    const o = n.value;
    if (o.length <= t.maximum)
      return;
    const i = ps(o);
    n.issues.push({
      origin: i,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Jl = /* @__PURE__ */ z("$ZodCheckMinLength", (e, t) => {
  var r;
  tt.init(e, t), (r = e._zod.def).when ?? (r.when = (n) => {
    const o = n.value;
    return !fs(o) && o.length !== void 0;
  }), e._zod.onattach.push((n) => {
    const o = n._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (n._zod.bag.minimum = t.minimum);
  }), e._zod.check = (n) => {
    const o = n.value;
    if (o.length >= t.minimum)
      return;
    const i = ps(o);
    n.issues.push({
      origin: i,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Kl = /* @__PURE__ */ z("$ZodCheckLengthEquals", (e, t) => {
  var r;
  tt.init(e, t), (r = e._zod.def).when ?? (r.when = (n) => {
    const o = n.value;
    return !fs(o) && o.length !== void 0;
  }), e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (n) => {
    const o = n.value, s = o.length;
    if (s === t.length)
      return;
    const i = ps(o), a = s > t.length;
    n.issues.push({
      origin: i,
      ...a ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Gn = /* @__PURE__ */ z("$ZodCheckStringFormat", (e, t) => {
  var r, n;
  tt.init(e, t), e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.format = t.format, t.pattern && (s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(t.pattern));
  }), t.pattern ? (r = e._zod).check ?? (r.check = (o) => {
    t.pattern.lastIndex = 0, !t.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: o.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (n = e._zod).check ?? (n.check = () => {
  });
}), Bl = /* @__PURE__ */ z("$ZodCheckRegex", (e, t) => {
  Gn.init(e, t), e._zod.check = (r) => {
    t.pattern.lastIndex = 0, !t.pattern.test(r.value) && r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: r.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), Gl = /* @__PURE__ */ z("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = Ll), Gn.init(e, t);
}), Ql = /* @__PURE__ */ z("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = Zl), Gn.init(e, t);
}), Xl = /* @__PURE__ */ z("$ZodCheckIncludes", (e, t) => {
  tt.init(e, t);
  const r = lr(t.includes), n = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${r}` : r);
  t.pattern = n, e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(n);
  }), e._zod.check = (o) => {
    o.value.includes(t.includes, t.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: o.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Yl = /* @__PURE__ */ z("$ZodCheckStartsWith", (e, t) => {
  tt.init(e, t);
  const r = new RegExp(`^${lr(t.prefix)}.*`);
  t.pattern ?? (t.pattern = r), e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(r);
  }), e._zod.check = (n) => {
    n.value.startsWith(t.prefix) || n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), ed = /* @__PURE__ */ z("$ZodCheckEndsWith", (e, t) => {
  tt.init(e, t);
  const r = new RegExp(`.*${lr(t.suffix)}$`);
  t.pattern ?? (t.pattern = r), e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(r);
  }), e._zod.check = (n) => {
    n.value.endsWith(t.suffix) || n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), td = /* @__PURE__ */ z("$ZodCheckOverwrite", (e, t) => {
  tt.init(e, t), e._zod.check = (r) => {
    r.value = t.tx(r.value);
  };
});
class rd {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const n = t.split(`
`).filter((i) => i), o = Math.min(...n.map((i) => i.length - i.trimStart().length)), s = n.map((i) => i.slice(o)).map((i) => " ".repeat(this.indent * 2) + i);
    for (const i of s)
      this.content.push(i);
  }
  compile() {
    const t = Function, r = this == null ? void 0 : this.args, o = [...((this == null ? void 0 : this.content) ?? [""]).map((s) => `  ${s}`)];
    return new t(...r, o.join(`
`));
  }
}
const nd = {
  major: 4,
  minor: 3,
  patch: 5
}, ge = /* @__PURE__ */ z("$ZodType", (e, t) => {
  var o;
  var r;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = nd;
  const n = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && n.unshift(e);
  for (const s of n)
    for (const i of s._zod.onattach)
      i(e);
  if (n.length === 0)
    (r = e._zod).deferred ?? (r.deferred = []), (o = e._zod.deferred) == null || o.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const s = (a, c, l) => {
      let d = tr(a), m;
      for (const g of c) {
        if (g._zod.def.when) {
          if (!g._zod.def.when(a))
            continue;
        } else if (d)
          continue;
        const w = a.issues.length, k = g._zod.check(a);
        if (k instanceof Promise && (l == null ? void 0 : l.async) === !1)
          throw new sr();
        if (m || k instanceof Promise)
          m = (m ?? Promise.resolve()).then(async () => {
            await k, a.issues.length !== w && (d || (d = tr(a, w)));
          });
        else {
          if (a.issues.length === w)
            continue;
          d || (d = tr(a, w));
        }
      }
      return m ? m.then(() => a) : a;
    }, i = (a, c, l) => {
      if (tr(a))
        return a.aborted = !0, a;
      const d = s(c, n, l);
      if (d instanceof Promise) {
        if (l.async === !1)
          throw new sr();
        return d.then((m) => e._zod.parse(m, l));
      }
      return e._zod.parse(d, l);
    };
    e._zod.run = (a, c) => {
      if (c.skipChecks)
        return e._zod.parse(a, c);
      if (c.direction === "backward") {
        const d = e._zod.parse({ value: a.value, issues: [] }, { ...c, skipChecks: !0 });
        return d instanceof Promise ? d.then((m) => i(m, a, c)) : i(d, a, c);
      }
      const l = e._zod.parse(a, c);
      if (l instanceof Promise) {
        if (c.async === !1)
          throw new sr();
        return l.then((d) => s(d, n, c));
      }
      return s(l, n, c);
    };
  }
  fe(e, "~standard", () => ({
    validate: (s) => {
      var i;
      try {
        const a = sc(e, s);
        return a.success ? { value: a.data } : { issues: (i = a.error) == null ? void 0 : i.issues };
      } catch {
        return ul(e, s).then((c) => {
          var l;
          return c.success ? { value: c.data } : { issues: (l = c.error) == null ? void 0 : l.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), _s = /* @__PURE__ */ z("$ZodString", (e, t) => {
  var r;
  ge.init(e, t), e._zod.pattern = [...((r = e == null ? void 0 : e._zod.bag) == null ? void 0 : r.patterns) ?? []].pop() ?? Dl(e._zod.bag), e._zod.parse = (n, o) => {
    if (t.coerce)
      try {
        n.value = String(n.value);
      } catch {
      }
    return typeof n.value == "string" || n.issues.push({
      expected: "string",
      code: "invalid_type",
      input: n.value,
      inst: e
    }), n;
  };
}), we = /* @__PURE__ */ z("$ZodStringFormat", (e, t) => {
  Gn.init(e, t), _s.init(e, t);
}), od = /* @__PURE__ */ z("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = El), we.init(e, t);
}), sd = /* @__PURE__ */ z("$ZodUUID", (e, t) => {
  if (t.version) {
    const n = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (n === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = ti(n));
  } else
    t.pattern ?? (t.pattern = ti());
  we.init(e, t);
}), id = /* @__PURE__ */ z("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = Cl), we.init(e, t);
}), ad = /* @__PURE__ */ z("$ZodURL", (e, t) => {
  we.init(e, t), e._zod.check = (r) => {
    try {
      const n = r.value.trim(), o = new URL(n);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || r.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: r.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol) || r.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: r.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? r.value = o.href : r.value = n;
      return;
    } catch {
      r.issues.push({
        code: "invalid_format",
        format: "url",
        input: r.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), cd = /* @__PURE__ */ z("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = Pl()), we.init(e, t);
}), ud = /* @__PURE__ */ z("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = Sl), we.init(e, t);
}), ld = /* @__PURE__ */ z("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = yl), we.init(e, t);
}), dd = /* @__PURE__ */ z("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = vl), we.init(e, t);
}), fd = /* @__PURE__ */ z("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = wl), we.init(e, t);
}), hd = /* @__PURE__ */ z("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = bl), we.init(e, t);
}), pd = /* @__PURE__ */ z("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = $l), we.init(e, t);
}), md = /* @__PURE__ */ z("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = ql(t)), we.init(e, t);
}), gd = /* @__PURE__ */ z("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = Ml), we.init(e, t);
}), _d = /* @__PURE__ */ z("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = jl(t)), we.init(e, t);
}), yd = /* @__PURE__ */ z("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = kl), we.init(e, t);
}), vd = /* @__PURE__ */ z("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = Al), we.init(e, t), e._zod.bag.format = "ipv4";
}), wd = /* @__PURE__ */ z("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = Rl), we.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (r) => {
    try {
      new URL(`http://[${r.value}]`);
    } catch {
      r.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: r.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), bd = /* @__PURE__ */ z("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = Il), we.init(e, t);
}), $d = /* @__PURE__ */ z("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = Ol), we.init(e, t), e._zod.check = (r) => {
    const n = r.value.split("/");
    try {
      if (n.length !== 2)
        throw new Error();
      const [o, s] = n;
      if (!s)
        throw new Error();
      const i = Number(s);
      if (`${i}` !== s)
        throw new Error();
      if (i < 0 || i > 128)
        throw new Error();
      new URL(`http://[${o}]`);
    } catch {
      r.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: r.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
});
function hc(e) {
  if (e === "")
    return !0;
  if (e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const Sd = /* @__PURE__ */ z("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = zl), we.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (r) => {
    hc(r.value) || r.issues.push({
      code: "invalid_format",
      format: "base64",
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function kd(e) {
  if (!ic.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (n) => n === "-" ? "+" : "/"), r = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return hc(r);
}
const Ed = /* @__PURE__ */ z("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = ic), we.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (r) => {
    kd(r.value) || r.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Cd = /* @__PURE__ */ z("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = Nl), we.init(e, t);
});
function Td(e, t = null) {
  try {
    const r = e.split(".");
    if (r.length !== 3)
      return !1;
    const [n] = r;
    if (!n)
      return !1;
    const o = JSON.parse(atob(n));
    return !("typ" in o && (o == null ? void 0 : o.typ) !== "JWT" || !o.alg || t && (!("alg" in o) || o.alg !== t));
  } catch {
    return !1;
  }
}
const Pd = /* @__PURE__ */ z("$ZodJWT", (e, t) => {
  we.init(e, t), e._zod.check = (r) => {
    Td(r.value, t.alg) || r.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), pc = /* @__PURE__ */ z("$ZodNumber", (e, t) => {
  ge.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? uc, e._zod.parse = (r, n) => {
    if (t.coerce)
      try {
        r.value = Number(r.value);
      } catch {
      }
    const o = r.value;
    if (typeof o == "number" && !Number.isNaN(o) && Number.isFinite(o))
      return r;
    const s = typeof o == "number" ? Number.isNaN(o) ? "NaN" : Number.isFinite(o) ? void 0 : "Infinity" : void 0;
    return r.issues.push({
      expected: "number",
      code: "invalid_type",
      input: o,
      inst: e,
      ...s ? { received: s } : {}
    }), r;
  };
}), Ad = /* @__PURE__ */ z("$ZodNumberFormat", (e, t) => {
  Hl.init(e, t), pc.init(e, t);
}), Rd = /* @__PURE__ */ z("$ZodBoolean", (e, t) => {
  ge.init(e, t), e._zod.pattern = Ul, e._zod.parse = (r, n) => {
    if (t.coerce)
      try {
        r.value = !!r.value;
      } catch {
      }
    const o = r.value;
    return typeof o == "boolean" || r.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: o,
      inst: e
    }), r;
  };
}), Id = /* @__PURE__ */ z("$ZodNull", (e, t) => {
  ge.init(e, t), e._zod.pattern = Fl, e._zod.values = /* @__PURE__ */ new Set([null]), e._zod.parse = (r, n) => {
    const o = r.value;
    return o === null || r.issues.push({
      expected: "null",
      code: "invalid_type",
      input: o,
      inst: e
    }), r;
  };
}), Od = /* @__PURE__ */ z("$ZodAny", (e, t) => {
  ge.init(e, t), e._zod.parse = (r) => r;
}), zd = /* @__PURE__ */ z("$ZodUnknown", (e, t) => {
  ge.init(e, t), e._zod.parse = (r) => r;
}), Nd = /* @__PURE__ */ z("$ZodNever", (e, t) => {
  ge.init(e, t), e._zod.parse = (r, n) => (r.issues.push({
    expected: "never",
    code: "invalid_type",
    input: r.value,
    inst: e
  }), r);
});
function ri(e, t, r) {
  e.issues.length && t.issues.push(...rr(r, e.issues)), t.value[r] = e.value;
}
const Md = /* @__PURE__ */ z("$ZodArray", (e, t) => {
  ge.init(e, t), e._zod.parse = (r, n) => {
    const o = r.value;
    if (!Array.isArray(o))
      return r.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), r;
    r.value = Array(o.length);
    const s = [];
    for (let i = 0; i < o.length; i++) {
      const a = o[i], c = t.element._zod.run({
        value: a,
        issues: []
      }, n);
      c instanceof Promise ? s.push(c.then((l) => ri(l, r, i))) : ri(c, r, i);
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
});
function On(e, t, r, n, o) {
  if (e.issues.length) {
    if (o && !(r in n))
      return;
    t.issues.push(...rr(r, e.issues));
  }
  e.value === void 0 ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
function mc(e) {
  var n, o, s, i;
  const t = Object.keys(e.shape);
  for (const a of t)
    if (!((i = (s = (o = (n = e.shape) == null ? void 0 : n[a]) == null ? void 0 : o._zod) == null ? void 0 : s.traits) != null && i.has("$ZodType")))
      throw new Error(`Invalid element at key "${a}": expected a Zod schema`);
  const r = Xu(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(r)
  };
}
function gc(e, t, r, n, o, s) {
  const i = [], a = o.keySet, c = o.catchall._zod, l = c.def.type, d = c.optout === "optional";
  for (const m in t) {
    if (a.has(m))
      continue;
    if (l === "never") {
      i.push(m);
      continue;
    }
    const g = c.run({ value: t[m], issues: [] }, n);
    g instanceof Promise ? e.push(g.then((w) => On(w, r, m, t, d))) : On(g, r, m, t, d);
  }
  return i.length && r.issues.push({
    code: "unrecognized_keys",
    keys: i,
    input: t,
    inst: s
  }), e.length ? Promise.all(e).then(() => r) : r;
}
const jd = /* @__PURE__ */ z("$ZodObject", (e, t) => {
  ge.init(e, t);
  const r = Object.getOwnPropertyDescriptor(t, "shape");
  if (!(r != null && r.get)) {
    const a = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const c = { ...a };
        return Object.defineProperty(t, "shape", {
          value: c
        }), c;
      }
    });
  }
  const n = Jn(() => mc(t));
  fe(e._zod, "propValues", () => {
    const a = t.shape, c = {};
    for (const l in a) {
      const d = a[l]._zod;
      if (d.values) {
        c[l] ?? (c[l] = /* @__PURE__ */ new Set());
        for (const m of d.values)
          c[l].add(m);
      }
    }
    return c;
  });
  const o = Tr, s = t.catchall;
  let i;
  e._zod.parse = (a, c) => {
    i ?? (i = n.value);
    const l = a.value;
    if (!o(l))
      return a.issues.push({
        expected: "object",
        code: "invalid_type",
        input: l,
        inst: e
      }), a;
    a.value = {};
    const d = [], m = i.shape;
    for (const g of i.keys) {
      const w = m[g], k = w._zod.optout === "optional", _ = w._zod.run({ value: l[g], issues: [] }, c);
      _ instanceof Promise ? d.push(_.then((h) => On(h, a, g, l, k))) : On(_, a, g, l, k);
    }
    return s ? gc(d, l, a, c, n.value, e) : d.length ? Promise.all(d).then(() => a) : a;
  };
}), qd = /* @__PURE__ */ z("$ZodObjectJIT", (e, t) => {
  jd.init(e, t);
  const r = e._zod.parse, n = Jn(() => mc(t)), o = (g) => {
    var p;
    const w = new rd(["shape", "payload", "ctx"]), k = n.value, _ = (v) => {
      const b = ei(v);
      return `shape[${b}]._zod.run({ value: input[${b}], issues: [] }, ctx)`;
    };
    w.write("const input = payload.value;");
    const h = /* @__PURE__ */ Object.create(null);
    let f = 0;
    for (const v of k.keys)
      h[v] = `key_${f++}`;
    w.write("const newResult = {};");
    for (const v of k.keys) {
      const b = h[v], y = ei(v), S = g[v], T = ((p = S == null ? void 0 : S._zod) == null ? void 0 : p.optout) === "optional";
      w.write(`const ${b} = ${_(v)};`), T ? w.write(`
        if (${b}.issues.length) {
          if (${y} in input) {
            payload.issues = payload.issues.concat(${b}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${y}, ...iss.path] : [${y}]
            })));
          }
        }
        
        if (${b}.value === undefined) {
          if (${y} in input) {
            newResult[${y}] = undefined;
          }
        } else {
          newResult[${y}] = ${b}.value;
        }
        
      `) : w.write(`
        if (${b}.issues.length) {
          payload.issues = payload.issues.concat(${b}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${y}, ...iss.path] : [${y}]
          })));
        }
        
        if (${b}.value === undefined) {
          if (${y} in input) {
            newResult[${y}] = undefined;
          }
        } else {
          newResult[${y}] = ${b}.value;
        }
        
      `);
    }
    w.write("payload.value = newResult;"), w.write("return payload;");
    const u = w.compile();
    return (v, b) => u(g, v, b);
  };
  let s;
  const i = Tr, a = !Xa.jitless, l = a && Gu.value, d = t.catchall;
  let m;
  e._zod.parse = (g, w) => {
    m ?? (m = n.value);
    const k = g.value;
    return i(k) ? a && l && (w == null ? void 0 : w.async) === !1 && w.jitless !== !0 ? (s || (s = o(t.shape)), g = s(g, w), d ? gc([], k, g, w, m, e) : g) : r(g, w) : (g.issues.push({
      expected: "object",
      code: "invalid_type",
      input: k,
      inst: e
    }), g);
  };
});
function ni(e, t, r, n) {
  for (const s of e)
    if (s.issues.length === 0)
      return t.value = s.value, t;
  const o = e.filter((s) => !tr(s));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: r,
    errors: e.map((s) => s.issues.map((i) => Rt(i, n, At())))
  }), t);
}
const _c = /* @__PURE__ */ z("$ZodUnion", (e, t) => {
  ge.init(e, t), fe(e._zod, "optin", () => t.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0), fe(e._zod, "optout", () => t.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), fe(e._zod, "values", () => {
    if (t.options.every((o) => o._zod.values))
      return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
  }), fe(e._zod, "pattern", () => {
    if (t.options.every((o) => o._zod.pattern)) {
      const o = t.options.map((s) => s._zod.pattern);
      return new RegExp(`^(${o.map((s) => hs(s.source)).join("|")})$`);
    }
  });
  const r = t.options.length === 1, n = t.options[0]._zod.run;
  e._zod.parse = (o, s) => {
    if (r)
      return n(o, s);
    let i = !1;
    const a = [];
    for (const c of t.options) {
      const l = c._zod.run({
        value: o.value,
        issues: []
      }, s);
      if (l instanceof Promise)
        a.push(l), i = !0;
      else {
        if (l.issues.length === 0)
          return l;
        a.push(l);
      }
    }
    return i ? Promise.all(a).then((c) => ni(c, o, e, s)) : ni(a, o, e, s);
  };
}), Dd = /* @__PURE__ */ z("$ZodDiscriminatedUnion", (e, t) => {
  t.inclusive = !1, _c.init(e, t);
  const r = e._zod.parse;
  fe(e._zod, "propValues", () => {
    const o = {};
    for (const s of t.options) {
      const i = s._zod.propValues;
      if (!i || Object.keys(i).length === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(s)}"`);
      for (const [a, c] of Object.entries(i)) {
        o[a] || (o[a] = /* @__PURE__ */ new Set());
        for (const l of c)
          o[a].add(l);
      }
    }
    return o;
  });
  const n = Jn(() => {
    var i;
    const o = t.options, s = /* @__PURE__ */ new Map();
    for (const a of o) {
      const c = (i = a._zod.propValues) == null ? void 0 : i[t.discriminator];
      if (!c || c.size === 0)
        throw new Error(`Invalid discriminated union option at index "${t.options.indexOf(a)}"`);
      for (const l of c) {
        if (s.has(l))
          throw new Error(`Duplicate discriminator value "${String(l)}"`);
        s.set(l, a);
      }
    }
    return s;
  });
  e._zod.parse = (o, s) => {
    const i = o.value;
    if (!Tr(i))
      return o.issues.push({
        code: "invalid_type",
        expected: "object",
        input: i,
        inst: e
      }), o;
    const a = n.value.get(i == null ? void 0 : i[t.discriminator]);
    return a ? a._zod.run(o, s) : t.unionFallback ? r(o, s) : (o.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: t.discriminator,
      input: i,
      path: [t.discriminator],
      inst: e
    }), o);
  };
}), xd = /* @__PURE__ */ z("$ZodIntersection", (e, t) => {
  ge.init(e, t), e._zod.parse = (r, n) => {
    const o = r.value, s = t.left._zod.run({ value: o, issues: [] }, n), i = t.right._zod.run({ value: o, issues: [] }, n);
    return s instanceof Promise || i instanceof Promise ? Promise.all([s, i]).then(([c, l]) => oi(r, c, l)) : oi(r, s, i);
  };
});
function qo(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (ur(e) && ur(t)) {
    const r = Object.keys(t), n = Object.keys(e).filter((s) => r.indexOf(s) !== -1), o = { ...e, ...t };
    for (const s of n) {
      const i = qo(e[s], t[s]);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [s, ...i.mergeErrorPath]
        };
      o[s] = i.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const r = [];
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = t[n], i = qo(o, s);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [n, ...i.mergeErrorPath]
        };
      r.push(i.data);
    }
    return { valid: !0, data: r };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function oi(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  let o;
  for (const a of t.issues)
    if (a.code === "unrecognized_keys") {
      o ?? (o = a);
      for (const c of a.keys)
        n.has(c) || n.set(c, {}), n.get(c).l = !0;
    } else
      e.issues.push(a);
  for (const a of r.issues)
    if (a.code === "unrecognized_keys")
      for (const c of a.keys)
        n.has(c) || n.set(c, {}), n.get(c).r = !0;
    else
      e.issues.push(a);
  const s = [...n].filter(([, a]) => a.l && a.r).map(([a]) => a);
  if (s.length && o && e.issues.push({ ...o, keys: s }), tr(e))
    return e;
  const i = qo(t.value, r.value);
  if (!i.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`);
  return e.value = i.data, e;
}
const Ud = /* @__PURE__ */ z("$ZodRecord", (e, t) => {
  ge.init(e, t), e._zod.parse = (r, n) => {
    const o = r.value;
    if (!ur(o))
      return r.issues.push({
        expected: "record",
        code: "invalid_type",
        input: o,
        inst: e
      }), r;
    const s = [], i = t.keyType._zod.values;
    if (i) {
      r.value = {};
      const a = /* @__PURE__ */ new Set();
      for (const l of i)
        if (typeof l == "string" || typeof l == "number" || typeof l == "symbol") {
          a.add(typeof l == "number" ? l.toString() : l);
          const d = t.valueType._zod.run({ value: o[l], issues: [] }, n);
          d instanceof Promise ? s.push(d.then((m) => {
            m.issues.length && r.issues.push(...rr(l, m.issues)), r.value[l] = m.value;
          })) : (d.issues.length && r.issues.push(...rr(l, d.issues)), r.value[l] = d.value);
        }
      let c;
      for (const l in o)
        a.has(l) || (c = c ?? [], c.push(l));
      c && c.length > 0 && r.issues.push({
        code: "unrecognized_keys",
        input: o,
        inst: e,
        keys: c
      });
    } else {
      r.value = {};
      for (const a of Reflect.ownKeys(o)) {
        if (a === "__proto__")
          continue;
        let c = t.keyType._zod.run({ value: a, issues: [] }, n);
        if (c instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof a == "string" && uc.test(a) && c.issues.length && c.issues.some((m) => m.code === "invalid_type" && m.expected === "number")) {
          const m = t.keyType._zod.run({ value: Number(a), issues: [] }, n);
          if (m instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          m.issues.length === 0 && (c = m);
        }
        if (c.issues.length) {
          t.mode === "loose" ? r.value[a] = o[a] : r.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((m) => Rt(m, n, At())),
            input: a,
            path: [a],
            inst: e
          });
          continue;
        }
        const d = t.valueType._zod.run({ value: o[a], issues: [] }, n);
        d instanceof Promise ? s.push(d.then((m) => {
          m.issues.length && r.issues.push(...rr(a, m.issues)), r.value[c.value] = m.value;
        })) : (d.issues.length && r.issues.push(...rr(a, d.issues)), r.value[c.value] = d.value);
      }
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
}), Fd = /* @__PURE__ */ z("$ZodEnum", (e, t) => {
  ge.init(e, t);
  const r = Ya(t.entries), n = new Set(r);
  e._zod.values = n, e._zod.pattern = new RegExp(`^(${r.filter((o) => Qu.has(typeof o)).map((o) => typeof o == "string" ? lr(o) : o.toString()).join("|")})$`), e._zod.parse = (o, s) => {
    const i = o.value;
    return n.has(i) || o.issues.push({
      code: "invalid_value",
      values: r,
      input: i,
      inst: e
    }), o;
  };
}), Ld = /* @__PURE__ */ z("$ZodLiteral", (e, t) => {
  if (ge.init(e, t), t.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const r = new Set(t.values);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${t.values.map((n) => typeof n == "string" ? lr(n) : n ? lr(n.toString()) : String(n)).join("|")})$`), e._zod.parse = (n, o) => {
    const s = n.value;
    return r.has(s) || n.issues.push({
      code: "invalid_value",
      values: t.values,
      input: s,
      inst: e
    }), n;
  };
}), Zd = /* @__PURE__ */ z("$ZodTransform", (e, t) => {
  ge.init(e, t), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      throw new Qa(e.constructor.name);
    const o = t.transform(r.value, r);
    if (n.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((i) => (r.value = i, r));
    if (o instanceof Promise)
      throw new sr();
    return r.value = o, r;
  };
});
function si(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const yc = /* @__PURE__ */ z("$ZodOptional", (e, t) => {
  ge.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", fe(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), fe(e._zod, "pattern", () => {
    const r = t.innerType._zod.pattern;
    return r ? new RegExp(`^(${hs(r.source)})?$`) : void 0;
  }), e._zod.parse = (r, n) => {
    if (t.innerType._zod.optin === "optional") {
      const o = t.innerType._zod.run(r, n);
      return o instanceof Promise ? o.then((s) => si(s, r.value)) : si(o, r.value);
    }
    return r.value === void 0 ? r : t.innerType._zod.run(r, n);
  };
}), Vd = /* @__PURE__ */ z("$ZodExactOptional", (e, t) => {
  yc.init(e, t), fe(e._zod, "values", () => t.innerType._zod.values), fe(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (r, n) => t.innerType._zod.run(r, n);
}), Hd = /* @__PURE__ */ z("$ZodNullable", (e, t) => {
  ge.init(e, t), fe(e._zod, "optin", () => t.innerType._zod.optin), fe(e._zod, "optout", () => t.innerType._zod.optout), fe(e._zod, "pattern", () => {
    const r = t.innerType._zod.pattern;
    return r ? new RegExp(`^(${hs(r.source)}|null)$`) : void 0;
  }), fe(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (r, n) => r.value === null ? r : t.innerType._zod.run(r, n);
}), Wd = /* @__PURE__ */ z("$ZodDefault", (e, t) => {
  ge.init(e, t), e._zod.optin = "optional", fe(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      return t.innerType._zod.run(r, n);
    if (r.value === void 0)
      return r.value = t.defaultValue, r;
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => ii(s, t)) : ii(o, t);
  };
});
function ii(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const Jd = /* @__PURE__ */ z("$ZodPrefault", (e, t) => {
  ge.init(e, t), e._zod.optin = "optional", fe(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (r, n) => (n.direction === "backward" || r.value === void 0 && (r.value = t.defaultValue), t.innerType._zod.run(r, n));
}), Kd = /* @__PURE__ */ z("$ZodNonOptional", (e, t) => {
  ge.init(e, t), fe(e._zod, "values", () => {
    const r = t.innerType._zod.values;
    return r ? new Set([...r].filter((n) => n !== void 0)) : void 0;
  }), e._zod.parse = (r, n) => {
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => ai(s, e)) : ai(o, e);
  };
});
function ai(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const Bd = /* @__PURE__ */ z("$ZodCatch", (e, t) => {
  ge.init(e, t), fe(e._zod, "optin", () => t.innerType._zod.optin), fe(e._zod, "optout", () => t.innerType._zod.optout), fe(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      return t.innerType._zod.run(r, n);
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => (r.value = s.value, s.issues.length && (r.value = t.catchValue({
      ...r,
      error: {
        issues: s.issues.map((i) => Rt(i, n, At()))
      },
      input: r.value
    }), r.issues = []), r)) : (r.value = o.value, o.issues.length && (r.value = t.catchValue({
      ...r,
      error: {
        issues: o.issues.map((s) => Rt(s, n, At()))
      },
      input: r.value
    }), r.issues = []), r);
  };
}), Gd = /* @__PURE__ */ z("$ZodPipe", (e, t) => {
  ge.init(e, t), fe(e._zod, "values", () => t.in._zod.values), fe(e._zod, "optin", () => t.in._zod.optin), fe(e._zod, "optout", () => t.out._zod.optout), fe(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (r, n) => {
    if (n.direction === "backward") {
      const s = t.out._zod.run(r, n);
      return s instanceof Promise ? s.then((i) => xr(i, t.in, n)) : xr(s, t.in, n);
    }
    const o = t.in._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => xr(s, t.out, n)) : xr(o, t.out, n);
  };
});
function xr(e, t, r) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, r);
}
const Qd = /* @__PURE__ */ z("$ZodReadonly", (e, t) => {
  ge.init(e, t), fe(e._zod, "propValues", () => t.innerType._zod.propValues), fe(e._zod, "values", () => t.innerType._zod.values), fe(e._zod, "optin", () => {
    var r, n;
    return (n = (r = t.innerType) == null ? void 0 : r._zod) == null ? void 0 : n.optin;
  }), fe(e._zod, "optout", () => {
    var r, n;
    return (n = (r = t.innerType) == null ? void 0 : r._zod) == null ? void 0 : n.optout;
  }), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      return t.innerType._zod.run(r, n);
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then(ci) : ci(o);
  };
});
function ci(e) {
  return e.value = Object.freeze(e.value), e;
}
const Xd = /* @__PURE__ */ z("$ZodCustom", (e, t) => {
  tt.init(e, t), ge.init(e, t), e._zod.parse = (r, n) => r, e._zod.check = (r) => {
    const n = r.value, o = t.fn(n);
    if (o instanceof Promise)
      return o.then((s) => ui(s, r, n, e));
    ui(o, r, n, e);
  };
});
function ui(e, t, r, n) {
  if (!e) {
    const o = {
      code: "custom",
      input: r,
      inst: n,
      // incorporates params.error into issue reporting
      path: [...n._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !n._zod.def.abort
      // params: inst._zod.def.params,
    };
    n._zod.def.params && (o.params = n._zod.def.params), t.issues.push(Pr(o));
  }
}
var li;
class Yd {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...r) {
    const n = r[0];
    return this._map.set(t, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, t), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const r = this._map.get(t);
    return r && typeof r == "object" && "id" in r && this._idmap.delete(r.id), this._map.delete(t), this;
  }
  get(t) {
    const r = t._zod.parent;
    if (r) {
      const n = { ...this.get(r) ?? {} };
      delete n.id;
      const o = { ...n, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function ef() {
  return new Yd();
}
(li = globalThis).__zod_globalRegistry ?? (li.__zod_globalRegistry = ef());
const vr = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function tf(e, t) {
  return new e({
    type: "string",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function rf(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function di(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function nf(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function of(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function sf(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function af(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function vc(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function cf(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function uf(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function lf(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function df(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ff(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function hf(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function pf(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function mf(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function gf(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function _f(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function yf(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function vf(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function wf(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function bf(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function $f(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Sf(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function kf(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ef(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Cf(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Tf(e, t) {
  return new e({
    type: "number",
    checks: [],
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Pf(e, t) {
  return new e({
    type: "number",
    coerce: !0,
    checks: [],
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Af(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Rf(e, t) {
  return new e({
    type: "boolean",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function If(e, t) {
  return new e({
    type: "null",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Of(e) {
  return new e({
    type: "any"
  });
}
// @__NO_SIDE_EFFECTS__
function zf(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function Nf(e, t) {
  return new e({
    type: "never",
    ...K(t)
  });
}
// @__NO_SIDE_EFFECTS__
function fi(e, t) {
  return new dc({
    check: "less_than",
    ...K(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function ho(e, t) {
  return new dc({
    check: "less_than",
    ...K(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function hi(e, t) {
  return new fc({
    check: "greater_than",
    ...K(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function po(e, t) {
  return new fc({
    check: "greater_than",
    ...K(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function pi(e, t) {
  return new Vl({
    check: "multiple_of",
    ...K(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function wc(e, t) {
  return new Wl({
    check: "max_length",
    ...K(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function zn(e, t) {
  return new Jl({
    check: "min_length",
    ...K(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function bc(e, t) {
  return new Kl({
    check: "length_equals",
    ...K(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function Mf(e, t) {
  return new Bl({
    check: "string_format",
    format: "regex",
    ...K(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function jf(e) {
  return new Gl({
    check: "string_format",
    format: "lowercase",
    ...K(e)
  });
}
// @__NO_SIDE_EFFECTS__
function qf(e) {
  return new Ql({
    check: "string_format",
    format: "uppercase",
    ...K(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Df(e, t) {
  return new Xl({
    check: "string_format",
    format: "includes",
    ...K(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function xf(e, t) {
  return new Yl({
    check: "string_format",
    format: "starts_with",
    ...K(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function Uf(e, t) {
  return new ed({
    check: "string_format",
    format: "ends_with",
    ...K(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function hr(e) {
  return new td({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function Ff(e) {
  return /* @__PURE__ */ hr((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Lf() {
  return /* @__PURE__ */ hr((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Zf() {
  return /* @__PURE__ */ hr((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Vf() {
  return /* @__PURE__ */ hr((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Hf() {
  return /* @__PURE__ */ hr((e) => Bu(e));
}
// @__NO_SIDE_EFFECTS__
function Wf(e, t, r) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...K(r)
  });
}
// @__NO_SIDE_EFFECTS__
function Jf(e, t, r) {
  const n = K(r);
  return n.abort ?? (n.abort = !0), new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...n
  });
}
// @__NO_SIDE_EFFECTS__
function Kf(e, t, r) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...K(r)
  });
}
// @__NO_SIDE_EFFECTS__
function Bf(e) {
  const t = /* @__PURE__ */ Gf((r) => (r.addIssue = (n) => {
    if (typeof n == "string")
      r.issues.push(Pr(n, r.value, t._zod.def));
    else {
      const o = n;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = r.value), o.inst ?? (o.inst = t), o.continue ?? (o.continue = !t._zod.def.abort), r.issues.push(Pr(o));
    }
  }, e(r.value, r)));
  return t;
}
// @__NO_SIDE_EFFECTS__
function Gf(e, t) {
  const r = new tt({
    check: "custom",
    ...K(t)
  });
  return r._zod.check = e, r;
}
function $c(e) {
  let t = (e == null ? void 0 : e.target) ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: (e == null ? void 0 : e.metadata) ?? vr,
    target: t,
    unrepresentable: (e == null ? void 0 : e.unrepresentable) ?? "throw",
    override: (e == null ? void 0 : e.override) ?? (() => {
    }),
    io: (e == null ? void 0 : e.io) ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: (e == null ? void 0 : e.cycles) ?? "ref",
    reused: (e == null ? void 0 : e.reused) ?? "inline",
    external: (e == null ? void 0 : e.external) ?? void 0
  };
}
function Ae(e, t, r = { path: [], schemaPath: [] }) {
  var d, m;
  var n;
  const o = e._zod.def, s = t.seen.get(e);
  if (s)
    return s.count++, r.schemaPath.includes(e) && (s.cycle = r.path), s.schema;
  const i = { schema: {}, count: 1, cycle: void 0, path: r.path };
  t.seen.set(e, i);
  const a = (m = (d = e._zod).toJSONSchema) == null ? void 0 : m.call(d);
  if (a)
    i.schema = a;
  else {
    const g = {
      ...r,
      schemaPath: [...r.schemaPath, e],
      path: r.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, i.schema, g);
    else {
      const k = i.schema, _ = t.processors[o.type];
      if (!_)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      _(e, t, k, g);
    }
    const w = e._zod.parent;
    w && (i.ref || (i.ref = w), Ae(w, t, g), t.seen.get(w).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && Object.assign(i.schema, c), t.io === "input" && Ke(e) && (delete i.schema.examples, delete i.schema.default), t.io === "input" && i.schema._prefault && ((n = i.schema).default ?? (n.default = i.schema._prefault)), delete i.schema._prefault, t.seen.get(e).schema;
}
function Sc(e, t) {
  var i, a, c, l;
  const r = e.seen.get(t);
  if (!r)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const n = /* @__PURE__ */ new Map();
  for (const d of e.seen.entries()) {
    const m = (i = e.metadataRegistry.get(d[0])) == null ? void 0 : i.id;
    if (m) {
      const g = n.get(m);
      if (g && g !== d[0])
        throw new Error(`Duplicate schema id "${m}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      n.set(m, d[0]);
    }
  }
  const o = (d) => {
    var _;
    const m = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const h = (_ = e.external.registry.get(d[0])) == null ? void 0 : _.id, f = e.external.uri ?? ((p) => p);
      if (h)
        return { ref: f(h) };
      const u = d[1].defId ?? d[1].schema.id ?? `schema${e.counter++}`;
      return d[1].defId = u, { defId: u, ref: `${f("__shared")}#/${m}/${u}` };
    }
    if (d[1] === r)
      return { ref: "#" };
    const w = `#/${m}/`, k = d[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: k, ref: w + k };
  }, s = (d) => {
    if (d[1].schema.$ref)
      return;
    const m = d[1], { ref: g, defId: w } = o(d);
    m.def = { ...m.schema }, w && (m.defId = w);
    const k = m.schema;
    for (const _ in k)
      delete k[_];
    k.$ref = g;
  };
  if (e.cycles === "throw")
    for (const d of e.seen.entries()) {
      const m = d[1];
      if (m.cycle)
        throw new Error(`Cycle detected: #/${(a = m.cycle) == null ? void 0 : a.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const d of e.seen.entries()) {
    const m = d[1];
    if (t === d[0]) {
      s(d);
      continue;
    }
    if (e.external) {
      const w = (c = e.external.registry.get(d[0])) == null ? void 0 : c.id;
      if (t !== d[0] && w) {
        s(d);
        continue;
      }
    }
    if ((l = e.metadataRegistry.get(d[0])) == null ? void 0 : l.id) {
      s(d);
      continue;
    }
    if (m.cycle) {
      s(d);
      continue;
    }
    if (m.count > 1 && e.reused === "ref") {
      s(d);
      continue;
    }
  }
}
function kc(e, t) {
  var i, a, c;
  const r = e.seen.get(t);
  if (!r)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const n = (l) => {
    const d = e.seen.get(l);
    if (d.ref === null)
      return;
    const m = d.def ?? d.schema, g = { ...m }, w = d.ref;
    if (d.ref = null, w) {
      n(w);
      const _ = e.seen.get(w), h = _.schema;
      if (h.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (m.allOf = m.allOf ?? [], m.allOf.push(h)) : Object.assign(m, h), Object.assign(m, g), l._zod.parent === w)
        for (const u in m)
          u === "$ref" || u === "allOf" || u in g || delete m[u];
      if (h.$ref)
        for (const u in m)
          u === "$ref" || u === "allOf" || u in _.def && JSON.stringify(m[u]) === JSON.stringify(_.def[u]) && delete m[u];
    }
    const k = l._zod.parent;
    if (k && k !== w) {
      n(k);
      const _ = e.seen.get(k);
      if (_ != null && _.schema.$ref && (m.$ref = _.schema.$ref, _.def))
        for (const h in m)
          h === "$ref" || h === "allOf" || h in _.def && JSON.stringify(m[h]) === JSON.stringify(_.def[h]) && delete m[h];
    }
    e.override({
      zodSchema: l,
      jsonSchema: m,
      path: d.path ?? []
    });
  };
  for (const l of [...e.seen.entries()].reverse())
    n(l[0]);
  const o = {};
  if (e.target === "draft-2020-12" ? o.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? o.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? o.$schema = "http://json-schema.org/draft-04/schema#" : e.target, (i = e.external) != null && i.uri) {
    const l = (a = e.external.registry.get(t)) == null ? void 0 : a.id;
    if (!l)
      throw new Error("Schema is missing an `id` property");
    o.$id = e.external.uri(l);
  }
  Object.assign(o, r.def ?? r.schema);
  const s = ((c = e.external) == null ? void 0 : c.defs) ?? {};
  for (const l of e.seen.entries()) {
    const d = l[1];
    d.def && d.defId && (s[d.defId] = d.def);
  }
  e.external || Object.keys(s).length > 0 && (e.target === "draft-2020-12" ? o.$defs = s : o.definitions = s);
  try {
    const l = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(l, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: Nn(t, "input", e.processors),
          output: Nn(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), l;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Ke(e, t) {
  const r = t ?? { seen: /* @__PURE__ */ new Set() };
  if (r.seen.has(e))
    return !1;
  r.seen.add(e);
  const n = e._zod.def;
  if (n.type === "transform")
    return !0;
  if (n.type === "array")
    return Ke(n.element, r);
  if (n.type === "set")
    return Ke(n.valueType, r);
  if (n.type === "lazy")
    return Ke(n.getter(), r);
  if (n.type === "promise" || n.type === "optional" || n.type === "nonoptional" || n.type === "nullable" || n.type === "readonly" || n.type === "default" || n.type === "prefault")
    return Ke(n.innerType, r);
  if (n.type === "intersection")
    return Ke(n.left, r) || Ke(n.right, r);
  if (n.type === "record" || n.type === "map")
    return Ke(n.keyType, r) || Ke(n.valueType, r);
  if (n.type === "pipe")
    return Ke(n.in, r) || Ke(n.out, r);
  if (n.type === "object") {
    for (const o in n.shape)
      if (Ke(n.shape[o], r))
        return !0;
    return !1;
  }
  if (n.type === "union") {
    for (const o of n.options)
      if (Ke(o, r))
        return !0;
    return !1;
  }
  if (n.type === "tuple") {
    for (const o of n.items)
      if (Ke(o, r))
        return !0;
    return !!(n.rest && Ke(n.rest, r));
  }
  return !1;
}
const Qf = (e, t = {}) => (r) => {
  const n = $c({ ...r, processors: t });
  return Ae(e, n), Sc(n, e), kc(n, e);
}, Nn = (e, t, r = {}) => (n) => {
  const { libraryOptions: o, target: s } = n ?? {}, i = $c({ ...o ?? {}, target: s, io: t, processors: r });
  return Ae(e, i), Sc(i, e), kc(i, e);
}, Xf = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Yf = (e, t, r, n) => {
  const o = r;
  o.type = "string";
  const { minimum: s, maximum: i, format: a, patterns: c, contentEncoding: l } = e._zod.bag;
  if (typeof s == "number" && (o.minLength = s), typeof i == "number" && (o.maxLength = i), a && (o.format = Xf[a] ?? a, o.format === "" && delete o.format, a === "time" && delete o.format), l && (o.contentEncoding = l), c && c.size > 0) {
    const d = [...c];
    d.length === 1 ? o.pattern = d[0].source : d.length > 1 && (o.allOf = [
      ...d.map((m) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: m.source
      }))
    ]);
  }
}, eh = (e, t, r, n) => {
  const o = r, { minimum: s, maximum: i, format: a, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: d } = e._zod.bag;
  typeof a == "string" && a.includes("int") ? o.type = "integer" : o.type = "number", typeof d == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (o.minimum = d, o.exclusiveMinimum = !0) : o.exclusiveMinimum = d), typeof s == "number" && (o.minimum = s, typeof d == "number" && t.target !== "draft-04" && (d >= s ? delete o.minimum : delete o.exclusiveMinimum)), typeof l == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (o.maximum = l, o.exclusiveMaximum = !0) : o.exclusiveMaximum = l), typeof i == "number" && (o.maximum = i, typeof l == "number" && t.target !== "draft-04" && (l <= i ? delete o.maximum : delete o.exclusiveMaximum)), typeof c == "number" && (o.multipleOf = c);
}, th = (e, t, r, n) => {
  r.type = "boolean";
}, rh = (e, t, r, n) => {
  t.target === "openapi-3.0" ? (r.type = "string", r.nullable = !0, r.enum = [null]) : r.type = "null";
}, nh = (e, t, r, n) => {
  r.not = {};
}, oh = (e, t, r, n) => {
}, sh = (e, t, r, n) => {
}, ih = (e, t, r, n) => {
  const o = e._zod.def, s = Ya(o.entries);
  s.every((i) => typeof i == "number") && (r.type = "number"), s.every((i) => typeof i == "string") && (r.type = "string"), r.enum = s;
}, ah = (e, t, r, n) => {
  const o = e._zod.def, s = [];
  for (const i of o.values)
    if (i === void 0) {
      if (t.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof i == "bigint") {
      if (t.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      s.push(Number(i));
    } else
      s.push(i);
  if (s.length !== 0) if (s.length === 1) {
    const i = s[0];
    r.type = i === null ? "null" : typeof i, t.target === "draft-04" || t.target === "openapi-3.0" ? r.enum = [i] : r.const = i;
  } else
    s.every((i) => typeof i == "number") && (r.type = "number"), s.every((i) => typeof i == "string") && (r.type = "string"), s.every((i) => typeof i == "boolean") && (r.type = "boolean"), s.every((i) => i === null) && (r.type = "null"), r.enum = s;
}, ch = (e, t, r, n) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, uh = (e, t, r, n) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, lh = (e, t, r, n) => {
  const o = r, s = e._zod.def, { minimum: i, maximum: a } = e._zod.bag;
  typeof i == "number" && (o.minItems = i), typeof a == "number" && (o.maxItems = a), o.type = "array", o.items = Ae(s.element, t, { ...n, path: [...n.path, "items"] });
}, dh = (e, t, r, n) => {
  var l;
  const o = r, s = e._zod.def;
  o.type = "object", o.properties = {};
  const i = s.shape;
  for (const d in i)
    o.properties[d] = Ae(i[d], t, {
      ...n,
      path: [...n.path, "properties", d]
    });
  const a = new Set(Object.keys(i)), c = new Set([...a].filter((d) => {
    const m = s.shape[d]._zod;
    return t.io === "input" ? m.optin === void 0 : m.optout === void 0;
  }));
  c.size > 0 && (o.required = Array.from(c)), ((l = s.catchall) == null ? void 0 : l._zod.def.type) === "never" ? o.additionalProperties = !1 : s.catchall ? s.catchall && (o.additionalProperties = Ae(s.catchall, t, {
    ...n,
    path: [...n.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, fh = (e, t, r, n) => {
  const o = e._zod.def, s = o.inclusive === !1, i = o.options.map((a, c) => Ae(a, t, {
    ...n,
    path: [...n.path, s ? "oneOf" : "anyOf", c]
  }));
  s ? r.oneOf = i : r.anyOf = i;
}, hh = (e, t, r, n) => {
  const o = e._zod.def, s = Ae(o.left, t, {
    ...n,
    path: [...n.path, "allOf", 0]
  }), i = Ae(o.right, t, {
    ...n,
    path: [...n.path, "allOf", 1]
  }), a = (l) => "allOf" in l && Object.keys(l).length === 1, c = [
    ...a(s) ? s.allOf : [s],
    ...a(i) ? i.allOf : [i]
  ];
  r.allOf = c;
}, ph = (e, t, r, n) => {
  const o = r, s = e._zod.def;
  o.type = "object";
  const i = s.keyType, a = i._zod.bag, c = a == null ? void 0 : a.patterns;
  if (s.mode === "loose" && c && c.size > 0) {
    const d = Ae(s.valueType, t, {
      ...n,
      path: [...n.path, "patternProperties", "*"]
    });
    o.patternProperties = {};
    for (const m of c)
      o.patternProperties[m.source] = d;
  } else
    (t.target === "draft-07" || t.target === "draft-2020-12") && (o.propertyNames = Ae(s.keyType, t, {
      ...n,
      path: [...n.path, "propertyNames"]
    })), o.additionalProperties = Ae(s.valueType, t, {
      ...n,
      path: [...n.path, "additionalProperties"]
    });
  const l = i._zod.values;
  if (l) {
    const d = [...l].filter((m) => typeof m == "string" || typeof m == "number");
    d.length > 0 && (o.required = d);
  }
}, mh = (e, t, r, n) => {
  const o = e._zod.def, s = Ae(o.innerType, t, n), i = t.seen.get(e);
  t.target === "openapi-3.0" ? (i.ref = o.innerType, r.nullable = !0) : r.anyOf = [s, { type: "null" }];
}, gh = (e, t, r, n) => {
  const o = e._zod.def;
  Ae(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType;
}, _h = (e, t, r, n) => {
  const o = e._zod.def;
  Ae(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType, r.default = JSON.parse(JSON.stringify(o.defaultValue));
}, yh = (e, t, r, n) => {
  const o = e._zod.def;
  Ae(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType, t.io === "input" && (r._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
}, vh = (e, t, r, n) => {
  const o = e._zod.def;
  Ae(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType;
  let i;
  try {
    i = o.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  r.default = i;
}, wh = (e, t, r, n) => {
  const o = e._zod.def, s = t.io === "input" ? o.in._zod.def.type === "transform" ? o.out : o.in : o.out;
  Ae(s, t, n);
  const i = t.seen.get(e);
  i.ref = s;
}, bh = (e, t, r, n) => {
  const o = e._zod.def;
  Ae(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType, r.readOnly = !0;
}, Ec = (e, t, r, n) => {
  const o = e._zod.def;
  Ae(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType;
};
function Qn(e) {
  return !!e._zod;
}
function Ct(e, t) {
  return Qn(e) ? sc(e, t) : e.safeParse(t);
}
function Cc(e) {
  var r, n;
  if (!e)
    return;
  let t;
  if (Qn(e) ? t = (n = (r = e._zod) == null ? void 0 : r.def) == null ? void 0 : n.shape : t = e.shape, !!t) {
    if (typeof t == "function")
      try {
        return t();
      } catch {
        return;
      }
    return t;
  }
}
function $h(e) {
  var o;
  if (Qn(e)) {
    const i = (o = e._zod) == null ? void 0 : o.def;
    if (i) {
      if (i.value !== void 0)
        return i.value;
      if (Array.isArray(i.values) && i.values.length > 0)
        return i.values[0];
    }
  }
  const r = e._def;
  if (r) {
    if (r.value !== void 0)
      return r.value;
    if (Array.isArray(r.values) && r.values.length > 0)
      return r.values[0];
  }
  const n = e.value;
  if (n !== void 0)
    return n;
}
const Sh = /* @__PURE__ */ z("ZodISODateTime", (e, t) => {
  md.init(e, t), Se.init(e, t);
});
function Tc(e) {
  return /* @__PURE__ */ Sf(Sh, e);
}
const kh = /* @__PURE__ */ z("ZodISODate", (e, t) => {
  gd.init(e, t), Se.init(e, t);
});
function Eh(e) {
  return /* @__PURE__ */ kf(kh, e);
}
const Ch = /* @__PURE__ */ z("ZodISOTime", (e, t) => {
  _d.init(e, t), Se.init(e, t);
});
function Th(e) {
  return /* @__PURE__ */ Ef(Ch, e);
}
const Ph = /* @__PURE__ */ z("ZodISODuration", (e, t) => {
  yd.init(e, t), Se.init(e, t);
});
function Ah(e) {
  return /* @__PURE__ */ Cf(Ph, e);
}
const Rh = (e, t) => {
  nc.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (r) => cl(e, r)
      // enumerable: false,
    },
    flatten: {
      value: (r) => al(e, r)
      // enumerable: false,
    },
    addIssue: {
      value: (r) => {
        e.issues.push(r), e.message = JSON.stringify(e.issues, jo, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (r) => {
        e.issues.push(...r), e.message = JSON.stringify(e.issues, jo, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, ut = z("ZodError", Rh, {
  Parent: Error
}), Ih = /* @__PURE__ */ ms(ut), Oh = /* @__PURE__ */ gs(ut), zh = /* @__PURE__ */ Kn(ut), Nh = /* @__PURE__ */ Bn(ut), Mh = /* @__PURE__ */ ll(ut), jh = /* @__PURE__ */ dl(ut), qh = /* @__PURE__ */ fl(ut), Dh = /* @__PURE__ */ hl(ut), xh = /* @__PURE__ */ pl(ut), Uh = /* @__PURE__ */ ml(ut), Fh = /* @__PURE__ */ gl(ut), Lh = /* @__PURE__ */ _l(ut), _e = /* @__PURE__ */ z("ZodType", (e, t) => (ge.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: Nn(e, "input"),
    output: Nn(e, "output")
  }
}), e.toJSONSchema = Qf(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...r) => e.clone(It(t, {
  checks: [
    ...t.checks ?? [],
    ...r.map((n) => typeof n == "function" ? { _zod: { check: n, def: { check: "custom" }, onattach: [] } } : n)
  ]
}), {
  parent: !0
}), e.with = e.check, e.clone = (r, n) => Ot(e, r, n), e.brand = () => e, e.register = (r, n) => (r.add(e, n), e), e.parse = (r, n) => Ih(e, r, n, { callee: e.parse }), e.safeParse = (r, n) => zh(e, r, n), e.parseAsync = async (r, n) => Oh(e, r, n, { callee: e.parseAsync }), e.safeParseAsync = async (r, n) => Nh(e, r, n), e.spa = e.safeParseAsync, e.encode = (r, n) => Mh(e, r, n), e.decode = (r, n) => jh(e, r, n), e.encodeAsync = async (r, n) => qh(e, r, n), e.decodeAsync = async (r, n) => Dh(e, r, n), e.safeEncode = (r, n) => xh(e, r, n), e.safeDecode = (r, n) => Uh(e, r, n), e.safeEncodeAsync = async (r, n) => Fh(e, r, n), e.safeDecodeAsync = async (r, n) => Lh(e, r, n), e.refine = (r, n) => e.check(Mp(r, n)), e.superRefine = (r) => e.check(jp(r)), e.overwrite = (r) => e.check(/* @__PURE__ */ hr(r)), e.optional = () => Ce(e), e.exactOptional = () => $p(e), e.nullable = () => _i(e), e.nullish = () => Ce(_i(e)), e.nonoptional = (r) => Pp(e, r), e.array = () => V(e), e.or = (r) => ye([e, r]), e.and = (r) => vs(e, r), e.transform = (r) => xo(e, Nc(r)), e.default = (r) => Ep(e, r), e.prefault = (r) => Tp(e, r), e.catch = (r) => Rp(e, r), e.pipe = (r) => xo(e, r), e.readonly = () => zp(e), e.describe = (r) => {
  const n = e.clone();
  return vr.add(n, { description: r }), n;
}, Object.defineProperty(e, "description", {
  get() {
    var r;
    return (r = vr.get(e)) == null ? void 0 : r.description;
  },
  configurable: !0
}), e.meta = (...r) => {
  if (r.length === 0)
    return vr.get(e);
  const n = e.clone();
  return vr.add(n, r[0]), n;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (r) => r(e), e)), Pc = /* @__PURE__ */ z("_ZodString", (e, t) => {
  _s.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (n, o, s) => Yf(e, n, o);
  const r = e._zod.bag;
  e.format = r.format ?? null, e.minLength = r.minimum ?? null, e.maxLength = r.maximum ?? null, e.regex = (...n) => e.check(/* @__PURE__ */ Mf(...n)), e.includes = (...n) => e.check(/* @__PURE__ */ Df(...n)), e.startsWith = (...n) => e.check(/* @__PURE__ */ xf(...n)), e.endsWith = (...n) => e.check(/* @__PURE__ */ Uf(...n)), e.min = (...n) => e.check(/* @__PURE__ */ zn(...n)), e.max = (...n) => e.check(/* @__PURE__ */ wc(...n)), e.length = (...n) => e.check(/* @__PURE__ */ bc(...n)), e.nonempty = (...n) => e.check(/* @__PURE__ */ zn(1, ...n)), e.lowercase = (n) => e.check(/* @__PURE__ */ jf(n)), e.uppercase = (n) => e.check(/* @__PURE__ */ qf(n)), e.trim = () => e.check(/* @__PURE__ */ Lf()), e.normalize = (...n) => e.check(/* @__PURE__ */ Ff(...n)), e.toLowerCase = () => e.check(/* @__PURE__ */ Zf()), e.toUpperCase = () => e.check(/* @__PURE__ */ Vf()), e.slugify = () => e.check(/* @__PURE__ */ Hf());
}), Zh = /* @__PURE__ */ z("ZodString", (e, t) => {
  _s.init(e, t), Pc.init(e, t), e.email = (r) => e.check(/* @__PURE__ */ rf(Vh, r)), e.url = (r) => e.check(/* @__PURE__ */ vc(Ac, r)), e.jwt = (r) => e.check(/* @__PURE__ */ $f(ip, r)), e.emoji = (r) => e.check(/* @__PURE__ */ cf(Wh, r)), e.guid = (r) => e.check(/* @__PURE__ */ di(mi, r)), e.uuid = (r) => e.check(/* @__PURE__ */ nf(Ur, r)), e.uuidv4 = (r) => e.check(/* @__PURE__ */ of(Ur, r)), e.uuidv6 = (r) => e.check(/* @__PURE__ */ sf(Ur, r)), e.uuidv7 = (r) => e.check(/* @__PURE__ */ af(Ur, r)), e.nanoid = (r) => e.check(/* @__PURE__ */ uf(Jh, r)), e.guid = (r) => e.check(/* @__PURE__ */ di(mi, r)), e.cuid = (r) => e.check(/* @__PURE__ */ lf(Kh, r)), e.cuid2 = (r) => e.check(/* @__PURE__ */ df(Bh, r)), e.ulid = (r) => e.check(/* @__PURE__ */ ff(Gh, r)), e.base64 = (r) => e.check(/* @__PURE__ */ vf(np, r)), e.base64url = (r) => e.check(/* @__PURE__ */ wf(op, r)), e.xid = (r) => e.check(/* @__PURE__ */ hf(Qh, r)), e.ksuid = (r) => e.check(/* @__PURE__ */ pf(Xh, r)), e.ipv4 = (r) => e.check(/* @__PURE__ */ mf(Yh, r)), e.ipv6 = (r) => e.check(/* @__PURE__ */ gf(ep, r)), e.cidrv4 = (r) => e.check(/* @__PURE__ */ _f(tp, r)), e.cidrv6 = (r) => e.check(/* @__PURE__ */ yf(rp, r)), e.e164 = (r) => e.check(/* @__PURE__ */ bf(sp, r)), e.datetime = (r) => e.check(Tc(r)), e.date = (r) => e.check(Eh(r)), e.time = (r) => e.check(Th(r)), e.duration = (r) => e.check(Ah(r));
});
function E(e) {
  return /* @__PURE__ */ tf(Zh, e);
}
const Se = /* @__PURE__ */ z("ZodStringFormat", (e, t) => {
  we.init(e, t), Pc.init(e, t);
}), Vh = /* @__PURE__ */ z("ZodEmail", (e, t) => {
  id.init(e, t), Se.init(e, t);
}), mi = /* @__PURE__ */ z("ZodGUID", (e, t) => {
  od.init(e, t), Se.init(e, t);
}), Ur = /* @__PURE__ */ z("ZodUUID", (e, t) => {
  sd.init(e, t), Se.init(e, t);
}), Ac = /* @__PURE__ */ z("ZodURL", (e, t) => {
  ad.init(e, t), Se.init(e, t);
});
function Hh(e) {
  return /* @__PURE__ */ vc(Ac, e);
}
const Wh = /* @__PURE__ */ z("ZodEmoji", (e, t) => {
  cd.init(e, t), Se.init(e, t);
}), Jh = /* @__PURE__ */ z("ZodNanoID", (e, t) => {
  ud.init(e, t), Se.init(e, t);
}), Kh = /* @__PURE__ */ z("ZodCUID", (e, t) => {
  ld.init(e, t), Se.init(e, t);
}), Bh = /* @__PURE__ */ z("ZodCUID2", (e, t) => {
  dd.init(e, t), Se.init(e, t);
}), Gh = /* @__PURE__ */ z("ZodULID", (e, t) => {
  fd.init(e, t), Se.init(e, t);
}), Qh = /* @__PURE__ */ z("ZodXID", (e, t) => {
  hd.init(e, t), Se.init(e, t);
}), Xh = /* @__PURE__ */ z("ZodKSUID", (e, t) => {
  pd.init(e, t), Se.init(e, t);
}), Yh = /* @__PURE__ */ z("ZodIPv4", (e, t) => {
  vd.init(e, t), Se.init(e, t);
}), ep = /* @__PURE__ */ z("ZodIPv6", (e, t) => {
  wd.init(e, t), Se.init(e, t);
}), tp = /* @__PURE__ */ z("ZodCIDRv4", (e, t) => {
  bd.init(e, t), Se.init(e, t);
}), rp = /* @__PURE__ */ z("ZodCIDRv6", (e, t) => {
  $d.init(e, t), Se.init(e, t);
}), np = /* @__PURE__ */ z("ZodBase64", (e, t) => {
  Sd.init(e, t), Se.init(e, t);
}), op = /* @__PURE__ */ z("ZodBase64URL", (e, t) => {
  Ed.init(e, t), Se.init(e, t);
}), sp = /* @__PURE__ */ z("ZodE164", (e, t) => {
  Cd.init(e, t), Se.init(e, t);
}), ip = /* @__PURE__ */ z("ZodJWT", (e, t) => {
  Pd.init(e, t), Se.init(e, t);
}), ys = /* @__PURE__ */ z("ZodNumber", (e, t) => {
  pc.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (n, o, s) => eh(e, n, o), e.gt = (n, o) => e.check(/* @__PURE__ */ hi(n, o)), e.gte = (n, o) => e.check(/* @__PURE__ */ po(n, o)), e.min = (n, o) => e.check(/* @__PURE__ */ po(n, o)), e.lt = (n, o) => e.check(/* @__PURE__ */ fi(n, o)), e.lte = (n, o) => e.check(/* @__PURE__ */ ho(n, o)), e.max = (n, o) => e.check(/* @__PURE__ */ ho(n, o)), e.int = (n) => e.check(gi(n)), e.safe = (n) => e.check(gi(n)), e.positive = (n) => e.check(/* @__PURE__ */ hi(0, n)), e.nonnegative = (n) => e.check(/* @__PURE__ */ po(0, n)), e.negative = (n) => e.check(/* @__PURE__ */ fi(0, n)), e.nonpositive = (n) => e.check(/* @__PURE__ */ ho(0, n)), e.multipleOf = (n, o) => e.check(/* @__PURE__ */ pi(n, o)), e.step = (n, o) => e.check(/* @__PURE__ */ pi(n, o)), e.finite = () => e;
  const r = e._zod.bag;
  e.minValue = Math.max(r.minimum ?? Number.NEGATIVE_INFINITY, r.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(r.maximum ?? Number.POSITIVE_INFINITY, r.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (r.format ?? "").includes("int") || Number.isSafeInteger(r.multipleOf ?? 0.5), e.isFinite = !0, e.format = r.format ?? null;
});
function he(e) {
  return /* @__PURE__ */ Tf(ys, e);
}
const ap = /* @__PURE__ */ z("ZodNumberFormat", (e, t) => {
  Ad.init(e, t), ys.init(e, t);
});
function gi(e) {
  return /* @__PURE__ */ Af(ap, e);
}
const cp = /* @__PURE__ */ z("ZodBoolean", (e, t) => {
  Rd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => th(e, r, n);
});
function me(e) {
  return /* @__PURE__ */ Rf(cp, e);
}
const up = /* @__PURE__ */ z("ZodNull", (e, t) => {
  Id.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => rh(e, r, n);
});
function Rc(e) {
  return /* @__PURE__ */ If(up, e);
}
const lp = /* @__PURE__ */ z("ZodAny", (e, t) => {
  Od.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => oh();
});
function dp() {
  return /* @__PURE__ */ Of(lp);
}
const fp = /* @__PURE__ */ z("ZodUnknown", (e, t) => {
  zd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => sh();
});
function be() {
  return /* @__PURE__ */ zf(fp);
}
const hp = /* @__PURE__ */ z("ZodNever", (e, t) => {
  Nd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => nh(e, r, n);
});
function pp(e) {
  return /* @__PURE__ */ Nf(hp, e);
}
const mp = /* @__PURE__ */ z("ZodArray", (e, t) => {
  Md.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => lh(e, r, n, o), e.element = t.element, e.min = (r, n) => e.check(/* @__PURE__ */ zn(r, n)), e.nonempty = (r) => e.check(/* @__PURE__ */ zn(1, r)), e.max = (r, n) => e.check(/* @__PURE__ */ wc(r, n)), e.length = (r, n) => e.check(/* @__PURE__ */ bc(r, n)), e.unwrap = () => e.element;
});
function V(e, t) {
  return /* @__PURE__ */ Wf(mp, e, t);
}
const Ic = /* @__PURE__ */ z("ZodObject", (e, t) => {
  qd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => dh(e, r, n, o), fe(e, "shape", () => t.shape), e.keyof = () => ot(Object.keys(e._zod.def.shape)), e.catchall = (r) => e.clone({ ...e._zod.def, catchall: r }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: be() }), e.loose = () => e.clone({ ...e._zod.def, catchall: be() }), e.strict = () => e.clone({ ...e._zod.def, catchall: pp() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (r) => rl(e, r), e.safeExtend = (r) => nl(e, r), e.merge = (r) => ol(e, r), e.pick = (r) => el(e, r), e.omit = (r) => tl(e, r), e.partial = (...r) => sl(Mc, e, r[0]), e.required = (...r) => il(jc, e, r[0]);
});
function W(e, t) {
  const r = {
    type: "object",
    shape: e ?? {},
    ...K(t)
  };
  return new Ic(r);
}
function xe(e, t) {
  return new Ic({
    type: "object",
    shape: e,
    catchall: be(),
    ...K(t)
  });
}
const Oc = /* @__PURE__ */ z("ZodUnion", (e, t) => {
  _c.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => fh(e, r, n, o), e.options = t.options;
});
function ye(e, t) {
  return new Oc({
    type: "union",
    options: e,
    ...K(t)
  });
}
const gp = /* @__PURE__ */ z("ZodDiscriminatedUnion", (e, t) => {
  Oc.init(e, t), Dd.init(e, t);
});
function zc(e, t, r) {
  return new gp({
    type: "union",
    options: t,
    discriminator: e,
    ...K(r)
  });
}
const _p = /* @__PURE__ */ z("ZodIntersection", (e, t) => {
  xd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => hh(e, r, n, o);
});
function vs(e, t) {
  return new _p({
    type: "intersection",
    left: e,
    right: t
  });
}
const yp = /* @__PURE__ */ z("ZodRecord", (e, t) => {
  Ud.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => ph(e, r, n, o), e.keyType = t.keyType, e.valueType = t.valueType;
});
function $e(e, t, r) {
  return new yp({
    type: "record",
    keyType: e,
    valueType: t,
    ...K(r)
  });
}
const Do = /* @__PURE__ */ z("ZodEnum", (e, t) => {
  Fd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (n, o, s) => ih(e, n, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const r = new Set(Object.keys(t.entries));
  e.extract = (n, o) => {
    const s = {};
    for (const i of n)
      if (r.has(i))
        s[i] = t.entries[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new Do({
      ...t,
      checks: [],
      ...K(o),
      entries: s
    });
  }, e.exclude = (n, o) => {
    const s = { ...t.entries };
    for (const i of n)
      if (r.has(i))
        delete s[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new Do({
      ...t,
      checks: [],
      ...K(o),
      entries: s
    });
  };
});
function ot(e, t) {
  const r = Array.isArray(e) ? Object.fromEntries(e.map((n) => [n, n])) : e;
  return new Do({
    type: "enum",
    entries: r,
    ...K(t)
  });
}
const vp = /* @__PURE__ */ z("ZodLiteral", (e, t) => {
  Ld.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => ah(e, r, n), e.values = new Set(t.values), Object.defineProperty(e, "value", {
    get() {
      if (t.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return t.values[0];
    }
  });
});
function G(e, t) {
  return new vp({
    type: "literal",
    values: Array.isArray(e) ? e : [e],
    ...K(t)
  });
}
const wp = /* @__PURE__ */ z("ZodTransform", (e, t) => {
  Zd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => uh(e, r), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      throw new Qa(e.constructor.name);
    r.addIssue = (s) => {
      if (typeof s == "string")
        r.issues.push(Pr(s, r.value, t));
      else {
        const i = s;
        i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = r.value), i.inst ?? (i.inst = e), r.issues.push(Pr(i));
      }
    };
    const o = t.transform(r.value, r);
    return o instanceof Promise ? o.then((s) => (r.value = s, r)) : (r.value = o, r);
  };
});
function Nc(e) {
  return new wp({
    type: "transform",
    transform: e
  });
}
const Mc = /* @__PURE__ */ z("ZodOptional", (e, t) => {
  yc.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => Ec(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function Ce(e) {
  return new Mc({
    type: "optional",
    innerType: e
  });
}
const bp = /* @__PURE__ */ z("ZodExactOptional", (e, t) => {
  Vd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => Ec(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function $p(e) {
  return new bp({
    type: "optional",
    innerType: e
  });
}
const Sp = /* @__PURE__ */ z("ZodNullable", (e, t) => {
  Hd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => mh(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function _i(e) {
  return new Sp({
    type: "nullable",
    innerType: e
  });
}
const kp = /* @__PURE__ */ z("ZodDefault", (e, t) => {
  Wd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => _h(e, r, n, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Ep(e, t) {
  return new kp({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : tc(t);
    }
  });
}
const Cp = /* @__PURE__ */ z("ZodPrefault", (e, t) => {
  Jd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => yh(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function Tp(e, t) {
  return new Cp({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : tc(t);
    }
  });
}
const jc = /* @__PURE__ */ z("ZodNonOptional", (e, t) => {
  Kd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => gh(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function Pp(e, t) {
  return new jc({
    type: "nonoptional",
    innerType: e,
    ...K(t)
  });
}
const Ap = /* @__PURE__ */ z("ZodCatch", (e, t) => {
  Bd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => vh(e, r, n, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Rp(e, t) {
  return new Ap({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const Ip = /* @__PURE__ */ z("ZodPipe", (e, t) => {
  Gd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => wh(e, r, n, o), e.in = t.in, e.out = t.out;
});
function xo(e, t) {
  return new Ip({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const Op = /* @__PURE__ */ z("ZodReadonly", (e, t) => {
  Qd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => bh(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function zp(e) {
  return new Op({
    type: "readonly",
    innerType: e
  });
}
const qc = /* @__PURE__ */ z("ZodCustom", (e, t) => {
  Xd.init(e, t), _e.init(e, t), e._zod.processJSONSchema = (r, n, o) => ch(e, r);
});
function Np(e, t) {
  return /* @__PURE__ */ Jf(qc, e ?? (() => !0), t);
}
function Mp(e, t = {}) {
  return /* @__PURE__ */ Kf(qc, e, t);
}
function jp(e) {
  return /* @__PURE__ */ Bf(e);
}
function Dc(e, t) {
  return xo(Nc(e), t);
}
const qp = {
  custom: "custom"
};
function Dp(e) {
  return /* @__PURE__ */ Pf(ys, e);
}
const Xn = "2025-11-25", xp = [Xn, "2025-06-18", "2025-03-26", "2024-11-05", "2024-10-07"], xt = "io.modelcontextprotocol/related-task", Yn = "2.0", Ue = Np((e) => e !== null && (typeof e == "object" || typeof e == "function")), xc = ye([E(), he().int()]), Uc = E();
xe({
  /**
   * Time in milliseconds to keep task results available after completion.
   * If null, the task has unlimited lifetime until manually cleaned up.
   */
  ttl: ye([he(), Rc()]).optional(),
  /**
   * Time in milliseconds to wait between task status requests.
   */
  pollInterval: he().optional()
});
const Up = W({
  ttl: he().optional()
}), Fp = W({
  taskId: E()
}), ws = xe({
  /**
   * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
   */
  progressToken: xc.optional(),
  /**
   * If specified, this request is related to the provided task.
   */
  [xt]: Fp.optional()
}), st = W({
  /**
   * See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
   */
  _meta: ws.optional()
}), Ir = st.extend({
  /**
   * If specified, the caller is requesting task-augmented execution for this request.
   * The request will return a CreateTaskResult immediately, and the actual result can be
   * retrieved later via tasks/result.
   *
   * Task augmentation is subject to capability negotiation - receivers MUST declare support
   * for task augmentation of specific request types in their capabilities.
   */
  task: Up.optional()
}), Lp = (e) => Ir.safeParse(e).success, Fe = W({
  method: E(),
  params: st.loose().optional()
}), lt = W({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ws.optional()
}), dt = W({
  method: E(),
  params: lt.loose().optional()
}), Le = xe({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ws.optional()
}), eo = ye([E(), he().int()]), Fc = W({
  jsonrpc: G(Yn),
  id: eo,
  ...Fe.shape
}).strict(), Uo = (e) => Fc.safeParse(e).success, Lc = W({
  jsonrpc: G(Yn),
  ...dt.shape
}).strict(), Zp = (e) => Lc.safeParse(e).success, bs = W({
  jsonrpc: G(Yn),
  id: eo,
  result: Le
}).strict(), wr = (e) => bs.safeParse(e).success;
var ne;
(function(e) {
  e[e.ConnectionClosed = -32e3] = "ConnectionClosed", e[e.RequestTimeout = -32001] = "RequestTimeout", e[e.ParseError = -32700] = "ParseError", e[e.InvalidRequest = -32600] = "InvalidRequest", e[e.MethodNotFound = -32601] = "MethodNotFound", e[e.InvalidParams = -32602] = "InvalidParams", e[e.InternalError = -32603] = "InternalError", e[e.UrlElicitationRequired = -32042] = "UrlElicitationRequired";
})(ne || (ne = {}));
const $s = W({
  jsonrpc: G(Yn),
  id: eo.optional(),
  error: W({
    /**
     * The error type that occurred.
     */
    code: he().int(),
    /**
     * A short description of the error. The message SHOULD be limited to a concise single sentence.
     */
    message: E(),
    /**
     * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
     */
    data: be().optional()
  })
}).strict(), Vp = (e) => $s.safeParse(e).success, Pn = ye([
  Fc,
  Lc,
  bs,
  $s
]);
ye([bs, $s]);
const nr = Le.strict(), Hp = lt.extend({
  /**
   * The ID of the request to cancel.
   *
   * This MUST correspond to the ID of a request previously issued in the same direction.
   */
  requestId: eo.optional(),
  /**
   * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
   */
  reason: E().optional()
}), Ss = dt.extend({
  method: G("notifications/cancelled"),
  params: Hp
}), Wp = W({
  /**
   * URL or data URI for the icon.
   */
  src: E(),
  /**
   * Optional MIME type for the icon.
   */
  mimeType: E().optional(),
  /**
   * Optional array of strings that specify sizes at which the icon can be used.
   * Each string should be in WxH format (e.g., `"48x48"`, `"96x96"`) or `"any"` for scalable formats like SVG.
   *
   * If not provided, the client should assume that the icon can be used at any size.
   */
  sizes: V(E()).optional(),
  /**
   * Optional specifier for the theme this icon is designed for. `light` indicates
   * the icon is designed to be used with a light background, and `dark` indicates
   * the icon is designed to be used with a dark background.
   *
   * If not provided, the client should assume the icon can be used with any theme.
   */
  theme: ot(["light", "dark"]).optional()
}), Or = W({
  /**
   * Optional set of sized icons that the client can display in a user interface.
   *
   * Clients that support rendering icons MUST support at least the following MIME types:
   * - `image/png` - PNG images (safe, universal compatibility)
   * - `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
   *
   * Clients that support rendering icons SHOULD also support:
   * - `image/svg+xml` - SVG images (scalable but requires security precautions)
   * - `image/webp` - WebP images (modern, efficient format)
   */
  icons: V(Wp).optional()
}), dr = W({
  /** Intended for programmatic or logical use, but used as a display name in past specs or fallback */
  name: E(),
  /**
   * Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
   * even by those unfamiliar with domain-specific terminology.
   *
   * If not provided, the name should be used for display (except for Tool,
   * where `annotations.title` should be given precedence over using `name`,
   * if present).
   */
  title: E().optional()
}), Zc = dr.extend({
  ...dr.shape,
  ...Or.shape,
  version: E(),
  /**
   * An optional URL of the website for this implementation.
   */
  websiteUrl: E().optional(),
  /**
   * An optional human-readable description of what this implementation does.
   *
   * This can be used by clients or servers to provide context about their purpose
   * and capabilities. For example, a server might describe the types of resources
   * or tools it provides, while a client might describe its intended use case.
   */
  description: E().optional()
}), Jp = vs(W({
  applyDefaults: me().optional()
}), $e(E(), be())), Kp = Dc((e) => e && typeof e == "object" && !Array.isArray(e) && Object.keys(e).length === 0 ? { form: {} } : e, vs(W({
  form: Jp.optional(),
  url: Ue.optional()
}), $e(E(), be()).optional())), Bp = xe({
  /**
   * Present if the client supports listing tasks.
   */
  list: Ue.optional(),
  /**
   * Present if the client supports cancelling tasks.
   */
  cancel: Ue.optional(),
  /**
   * Capabilities for task creation on specific request types.
   */
  requests: xe({
    /**
     * Task support for sampling requests.
     */
    sampling: xe({
      createMessage: Ue.optional()
    }).optional(),
    /**
     * Task support for elicitation requests.
     */
    elicitation: xe({
      create: Ue.optional()
    }).optional()
  }).optional()
}), Gp = xe({
  /**
   * Present if the server supports listing tasks.
   */
  list: Ue.optional(),
  /**
   * Present if the server supports cancelling tasks.
   */
  cancel: Ue.optional(),
  /**
   * Capabilities for task creation on specific request types.
   */
  requests: xe({
    /**
     * Task support for tool requests.
     */
    tools: xe({
      call: Ue.optional()
    }).optional()
  }).optional()
}), Qp = W({
  /**
   * Experimental, non-standard capabilities that the client supports.
   */
  experimental: $e(E(), Ue).optional(),
  /**
   * Present if the client supports sampling from an LLM.
   */
  sampling: W({
    /**
     * Present if the client supports context inclusion via includeContext parameter.
     * If not declared, servers SHOULD only use `includeContext: "none"` (or omit it).
     */
    context: Ue.optional(),
    /**
     * Present if the client supports tool use via tools and toolChoice parameters.
     */
    tools: Ue.optional()
  }).optional(),
  /**
   * Present if the client supports eliciting user input.
   */
  elicitation: Kp.optional(),
  /**
   * Present if the client supports listing roots.
   */
  roots: W({
    /**
     * Whether the client supports issuing notifications for changes to the roots list.
     */
    listChanged: me().optional()
  }).optional(),
  /**
   * Present if the client supports task creation.
   */
  tasks: Bp.optional()
}), Xp = st.extend({
  /**
   * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
   */
  protocolVersion: E(),
  capabilities: Qp,
  clientInfo: Zc
}), Yp = Fe.extend({
  method: G("initialize"),
  params: Xp
}), em = W({
  /**
   * Experimental, non-standard capabilities that the server supports.
   */
  experimental: $e(E(), Ue).optional(),
  /**
   * Present if the server supports sending log messages to the client.
   */
  logging: Ue.optional(),
  /**
   * Present if the server supports sending completions to the client.
   */
  completions: Ue.optional(),
  /**
   * Present if the server offers any prompt templates.
   */
  prompts: W({
    /**
     * Whether this server supports issuing notifications for changes to the prompt list.
     */
    listChanged: me().optional()
  }).optional(),
  /**
   * Present if the server offers any resources to read.
   */
  resources: W({
    /**
     * Whether this server supports clients subscribing to resource updates.
     */
    subscribe: me().optional(),
    /**
     * Whether this server supports issuing notifications for changes to the resource list.
     */
    listChanged: me().optional()
  }).optional(),
  /**
   * Present if the server offers any tools to call.
   */
  tools: W({
    /**
     * Whether this server supports issuing notifications for changes to the tool list.
     */
    listChanged: me().optional()
  }).optional(),
  /**
   * Present if the server supports task creation.
   */
  tasks: Gp.optional()
}), Vc = Le.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: E(),
  capabilities: em,
  serverInfo: Zc,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: E().optional()
}), Hc = dt.extend({
  method: G("notifications/initialized"),
  params: lt.optional()
}), tm = (e) => Hc.safeParse(e).success, ks = Fe.extend({
  method: G("ping"),
  params: st.optional()
}), rm = W({
  /**
   * The progress thus far. This should increase every time progress is made, even if the total is unknown.
   */
  progress: he(),
  /**
   * Total number of items to process (or total progress required), if known.
   */
  total: Ce(he()),
  /**
   * An optional message describing the current progress.
   */
  message: Ce(E())
}), nm = W({
  ...lt.shape,
  ...rm.shape,
  /**
   * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
   */
  progressToken: xc
}), Es = dt.extend({
  method: G("notifications/progress"),
  params: nm
}), om = st.extend({
  /**
   * An opaque token representing the current pagination position.
   * If provided, the server should return results starting after this cursor.
   */
  cursor: Uc.optional()
}), zr = Fe.extend({
  params: om.optional()
}), Nr = Le.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: Uc.optional()
}), sm = ot(["working", "input_required", "completed", "failed", "cancelled"]), Mr = W({
  taskId: E(),
  status: sm,
  /**
   * Time in milliseconds to keep task results available after completion.
   * If null, the task has unlimited lifetime until manually cleaned up.
   */
  ttl: ye([he(), Rc()]),
  /**
   * ISO 8601 timestamp when the task was created.
   */
  createdAt: E(),
  /**
   * ISO 8601 timestamp when the task was last updated.
   */
  lastUpdatedAt: E(),
  pollInterval: Ce(he()),
  /**
   * Optional diagnostic message for failed tasks or other status information.
   */
  statusMessage: Ce(E())
}), Ar = Le.extend({
  task: Mr
}), im = lt.merge(Mr), Mn = dt.extend({
  method: G("notifications/tasks/status"),
  params: im
}), Cs = Fe.extend({
  method: G("tasks/get"),
  params: st.extend({
    taskId: E()
  })
}), Ts = Le.merge(Mr), Ps = Fe.extend({
  method: G("tasks/result"),
  params: st.extend({
    taskId: E()
  })
});
Le.loose();
const As = zr.extend({
  method: G("tasks/list")
}), Rs = Nr.extend({
  tasks: V(Mr)
}), Is = Fe.extend({
  method: G("tasks/cancel"),
  params: st.extend({
    taskId: E()
  })
}), am = Le.merge(Mr), Wc = W({
  /**
   * The URI of this resource.
   */
  uri: E(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: Ce(E()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), Jc = Wc.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: E()
}), Os = E().refine((e) => {
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}, { message: "Invalid Base64 string" }), Kc = Wc.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: Os
}), jr = ot(["user", "assistant"]), pr = W({
  /**
   * Intended audience(s) for the resource.
   */
  audience: V(jr).optional(),
  /**
   * Importance hint for the resource, from 0 (least) to 1 (most).
   */
  priority: he().min(0).max(1).optional(),
  /**
   * ISO 8601 timestamp for the most recent modification.
   */
  lastModified: Tc({ offset: !0 }).optional()
}), Bc = W({
  ...dr.shape,
  ...Or.shape,
  /**
   * The URI of this resource.
   */
  uri: E(),
  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: Ce(E()),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: Ce(E()),
  /**
   * Optional annotations for the client.
   */
  annotations: pr.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: Ce(xe({}))
}), cm = W({
  ...dr.shape,
  ...Or.shape,
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   */
  uriTemplate: E(),
  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: Ce(E()),
  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType: Ce(E()),
  /**
   * Optional annotations for the client.
   */
  annotations: pr.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: Ce(xe({}))
}), um = zr.extend({
  method: G("resources/list")
}), Gc = Nr.extend({
  resources: V(Bc)
}), lm = zr.extend({
  method: G("resources/templates/list")
}), Qc = Nr.extend({
  resourceTemplates: V(cm)
}), zs = st.extend({
  /**
   * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
   *
   * @format uri
   */
  uri: E()
}), dm = zs, fm = Fe.extend({
  method: G("resources/read"),
  params: dm
}), Xc = Le.extend({
  contents: V(ye([Jc, Kc]))
}), Yc = dt.extend({
  method: G("notifications/resources/list_changed"),
  params: lt.optional()
}), hm = zs, pm = Fe.extend({
  method: G("resources/subscribe"),
  params: hm
}), mm = zs, gm = Fe.extend({
  method: G("resources/unsubscribe"),
  params: mm
}), _m = lt.extend({
  /**
   * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
   */
  uri: E()
}), ym = dt.extend({
  method: G("notifications/resources/updated"),
  params: _m
}), vm = W({
  /**
   * The name of the argument.
   */
  name: E(),
  /**
   * A human-readable description of the argument.
   */
  description: Ce(E()),
  /**
   * Whether this argument must be provided.
   */
  required: Ce(me())
}), wm = W({
  ...dr.shape,
  ...Or.shape,
  /**
   * An optional description of what this prompt provides
   */
  description: Ce(E()),
  /**
   * A list of arguments to use for templating the prompt.
   */
  arguments: Ce(V(vm)),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: Ce(xe({}))
}), bm = zr.extend({
  method: G("prompts/list")
}), eu = Nr.extend({
  prompts: V(wm)
}), $m = st.extend({
  /**
   * The name of the prompt or prompt template.
   */
  name: E(),
  /**
   * Arguments to use for templating the prompt.
   */
  arguments: $e(E(), E()).optional()
}), Sm = Fe.extend({
  method: G("prompts/get"),
  params: $m
}), Ns = W({
  type: G("text"),
  /**
   * The text content of the message.
   */
  text: E(),
  /**
   * Optional annotations for the client.
   */
  annotations: pr.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), Ms = W({
  type: G("image"),
  /**
   * The base64-encoded image data.
   */
  data: Os,
  /**
   * The MIME type of the image. Different providers may support different image types.
   */
  mimeType: E(),
  /**
   * Optional annotations for the client.
   */
  annotations: pr.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), js = W({
  type: G("audio"),
  /**
   * The base64-encoded audio data.
   */
  data: Os,
  /**
   * The MIME type of the audio. Different providers may support different audio types.
   */
  mimeType: E(),
  /**
   * Optional annotations for the client.
   */
  annotations: pr.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), km = W({
  type: G("tool_use"),
  /**
   * The name of the tool to invoke.
   * Must match a tool name from the request's tools array.
   */
  name: E(),
  /**
   * Unique identifier for this tool call.
   * Used to correlate with ToolResultContent in subsequent messages.
   */
  id: E(),
  /**
   * Arguments to pass to the tool.
   * Must conform to the tool's inputSchema.
   */
  input: $e(E(), be()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), Em = W({
  type: G("resource"),
  resource: ye([Jc, Kc]),
  /**
   * Optional annotations for the client.
   */
  annotations: pr.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), Cm = Bc.extend({
  type: G("resource_link")
}), qs = ye([
  Ns,
  Ms,
  js,
  Cm,
  Em
]), Tm = W({
  role: jr,
  content: qs
}), tu = Le.extend({
  /**
   * An optional description for the prompt.
   */
  description: E().optional(),
  messages: V(Tm)
}), ru = dt.extend({
  method: G("notifications/prompts/list_changed"),
  params: lt.optional()
}), Pm = W({
  /**
   * A human-readable title for the tool.
   */
  title: E().optional(),
  /**
   * If true, the tool does not modify its environment.
   *
   * Default: false
   */
  readOnlyHint: me().optional(),
  /**
   * If true, the tool may perform destructive updates to its environment.
   * If false, the tool performs only additive updates.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: true
   */
  destructiveHint: me().optional(),
  /**
   * If true, calling the tool repeatedly with the same arguments
   * will have no additional effect on the its environment.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: false
   */
  idempotentHint: me().optional(),
  /**
   * If true, this tool may interact with an "open world" of external
   * entities. If false, the tool's domain of interaction is closed.
   * For example, the world of a web search tool is open, whereas that
   * of a memory tool is not.
   *
   * Default: true
   */
  openWorldHint: me().optional()
}), Am = W({
  /**
   * Indicates the tool's preference for task-augmented execution.
   * - "required": Clients MUST invoke the tool as a task
   * - "optional": Clients MAY invoke the tool as a task or normal request
   * - "forbidden": Clients MUST NOT attempt to invoke the tool as a task
   *
   * If not present, defaults to "forbidden".
   */
  taskSupport: ot(["required", "optional", "forbidden"]).optional()
}), nu = W({
  ...dr.shape,
  ...Or.shape,
  /**
   * A human-readable description of the tool.
   */
  description: E().optional(),
  /**
   * A JSON Schema 2020-12 object defining the expected parameters for the tool.
   * Must have type: 'object' at the root level per MCP spec.
   */
  inputSchema: W({
    type: G("object"),
    properties: $e(E(), Ue).optional(),
    required: V(E()).optional()
  }).catchall(be()),
  /**
   * An optional JSON Schema 2020-12 object defining the structure of the tool's output
   * returned in the structuredContent field of a CallToolResult.
   * Must have type: 'object' at the root level per MCP spec.
   */
  outputSchema: W({
    type: G("object"),
    properties: $e(E(), Ue).optional(),
    required: V(E()).optional()
  }).catchall(be()).optional(),
  /**
   * Optional additional tool information.
   */
  annotations: Pm.optional(),
  /**
   * Execution-related properties for this tool.
   */
  execution: Am.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), Rm = zr.extend({
  method: G("tools/list")
}), ou = Nr.extend({
  tools: V(nu)
}), to = Le.extend({
  /**
   * A list of content objects that represent the result of the tool call.
   *
   * If the Tool does not define an outputSchema, this field MUST be present in the result.
   * For backwards compatibility, this field is always present, but it may be empty.
   */
  content: V(qs).default([]),
  /**
   * An object containing structured tool output.
   *
   * If the Tool defines an outputSchema, this field MUST be present in the result, and contain a JSON object that matches the schema.
   */
  structuredContent: $e(E(), be()).optional(),
  /**
   * Whether the tool call ended in an error.
   *
   * If not set, this is assumed to be false (the call was successful).
   *
   * Any errors that originate from the tool SHOULD be reported inside the result
   * object, with `isError` set to true, _not_ as an MCP protocol-level error
   * response. Otherwise, the LLM would not be able to see that an error occurred
   * and self-correct.
   *
   * However, any errors in _finding_ the tool, an error indicating that the
   * server does not support tool calls, or any other exceptional conditions,
   * should be reported as an MCP error response.
   */
  isError: me().optional()
});
to.or(Le.extend({
  toolResult: be()
}));
const Im = Ir.extend({
  /**
   * The name of the tool to call.
   */
  name: E(),
  /**
   * Arguments to pass to the tool.
   */
  arguments: $e(E(), be()).optional()
}), Om = Fe.extend({
  method: G("tools/call"),
  params: Im
}), su = dt.extend({
  method: G("notifications/tools/list_changed"),
  params: lt.optional()
}), zm = W({
  /**
   * If true, the list will be refreshed automatically when a list changed notification is received.
   * The callback will be called with the updated list.
   *
   * If false, the callback will be called with null items, allowing manual refresh.
   *
   * @default true
   */
  autoRefresh: me().default(!0),
  /**
   * Debounce time in milliseconds for list changed notification processing.
   *
   * Multiple notifications received within this timeframe will only trigger one refresh.
   * Set to 0 to disable debouncing.
   *
   * @default 300
   */
  debounceMs: he().int().nonnegative().default(300)
}), iu = ot(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]), Nm = st.extend({
  /**
   * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
   */
  level: iu
}), Mm = Fe.extend({
  method: G("logging/setLevel"),
  params: Nm
}), jm = lt.extend({
  /**
   * The severity of this log message.
   */
  level: iu,
  /**
   * An optional name of the logger issuing this message.
   */
  logger: E().optional(),
  /**
   * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
   */
  data: be()
}), au = dt.extend({
  method: G("notifications/message"),
  params: jm
}), qm = W({
  /**
   * A hint for a model name.
   */
  name: E().optional()
}), Dm = W({
  /**
   * Optional hints to use for model selection.
   */
  hints: V(qm).optional(),
  /**
   * How much to prioritize cost when selecting a model.
   */
  costPriority: he().min(0).max(1).optional(),
  /**
   * How much to prioritize sampling speed (latency) when selecting a model.
   */
  speedPriority: he().min(0).max(1).optional(),
  /**
   * How much to prioritize intelligence and capabilities when selecting a model.
   */
  intelligencePriority: he().min(0).max(1).optional()
}), xm = W({
  /**
   * Controls when tools are used:
   * - "auto": Model decides whether to use tools (default)
   * - "required": Model MUST use at least one tool before completing
   * - "none": Model MUST NOT use any tools
   */
  mode: ot(["auto", "required", "none"]).optional()
}), Um = W({
  type: G("tool_result"),
  toolUseId: E().describe("The unique identifier for the corresponding tool call."),
  content: V(qs).default([]),
  structuredContent: W({}).loose().optional(),
  isError: me().optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), Fm = zc("type", [Ns, Ms, js]), jn = zc("type", [
  Ns,
  Ms,
  js,
  km,
  Um
]), Lm = W({
  role: jr,
  content: ye([jn, V(jn)]),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), Zm = Ir.extend({
  messages: V(Lm),
  /**
   * The server's preferences for which model to select. The client MAY modify or omit this request.
   */
  modelPreferences: Dm.optional(),
  /**
   * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
   */
  systemPrompt: E().optional(),
  /**
   * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt.
   * The client MAY ignore this request.
   *
   * Default is "none". Values "thisServer" and "allServers" are soft-deprecated. Servers SHOULD only use these values if the client
   * declares ClientCapabilities.sampling.context. These values may be removed in future spec releases.
   */
  includeContext: ot(["none", "thisServer", "allServers"]).optional(),
  temperature: he().optional(),
  /**
   * The requested maximum number of tokens to sample (to prevent runaway completions).
   *
   * The client MAY choose to sample fewer tokens than the requested maximum.
   */
  maxTokens: he().int(),
  stopSequences: V(E()).optional(),
  /**
   * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
   */
  metadata: Ue.optional(),
  /**
   * Tools that the model may use during generation.
   * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
   */
  tools: V(nu).optional(),
  /**
   * Controls how the model uses tools.
   * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
   * Default is `{ mode: "auto" }`.
   */
  toolChoice: xm.optional()
}), cu = Fe.extend({
  method: G("sampling/createMessage"),
  params: Zm
}), uu = Le.extend({
  /**
   * The name of the model that generated the message.
   */
  model: E(),
  /**
   * The reason why sampling stopped, if known.
   *
   * Standard values:
   * - "endTurn": Natural end of the assistant's turn
   * - "stopSequence": A stop sequence was encountered
   * - "maxTokens": Maximum token limit was reached
   *
   * This field is an open string to allow for provider-specific stop reasons.
   */
  stopReason: Ce(ot(["endTurn", "stopSequence", "maxTokens"]).or(E())),
  role: jr,
  /**
   * Response content. Single content block (text, image, or audio).
   */
  content: Fm
}), Vm = Le.extend({
  /**
   * The name of the model that generated the message.
   */
  model: E(),
  /**
   * The reason why sampling stopped, if known.
   *
   * Standard values:
   * - "endTurn": Natural end of the assistant's turn
   * - "stopSequence": A stop sequence was encountered
   * - "maxTokens": Maximum token limit was reached
   * - "toolUse": The model wants to use one or more tools
   *
   * This field is an open string to allow for provider-specific stop reasons.
   */
  stopReason: Ce(ot(["endTurn", "stopSequence", "maxTokens", "toolUse"]).or(E())),
  role: jr,
  /**
   * Response content. May be a single block or array. May include ToolUseContent if stopReason is "toolUse".
   */
  content: ye([jn, V(jn)])
}), Hm = W({
  type: G("boolean"),
  title: E().optional(),
  description: E().optional(),
  default: me().optional()
}), Wm = W({
  type: G("string"),
  title: E().optional(),
  description: E().optional(),
  minLength: he().optional(),
  maxLength: he().optional(),
  format: ot(["email", "uri", "date", "date-time"]).optional(),
  default: E().optional()
}), Jm = W({
  type: ot(["number", "integer"]),
  title: E().optional(),
  description: E().optional(),
  minimum: he().optional(),
  maximum: he().optional(),
  default: he().optional()
}), Km = W({
  type: G("string"),
  title: E().optional(),
  description: E().optional(),
  enum: V(E()),
  default: E().optional()
}), Bm = W({
  type: G("string"),
  title: E().optional(),
  description: E().optional(),
  oneOf: V(W({
    const: E(),
    title: E()
  })),
  default: E().optional()
}), Gm = W({
  type: G("string"),
  title: E().optional(),
  description: E().optional(),
  enum: V(E()),
  enumNames: V(E()).optional(),
  default: E().optional()
}), Qm = ye([Km, Bm]), Xm = W({
  type: G("array"),
  title: E().optional(),
  description: E().optional(),
  minItems: he().optional(),
  maxItems: he().optional(),
  items: W({
    type: G("string"),
    enum: V(E())
  }),
  default: V(E()).optional()
}), Ym = W({
  type: G("array"),
  title: E().optional(),
  description: E().optional(),
  minItems: he().optional(),
  maxItems: he().optional(),
  items: W({
    anyOf: V(W({
      const: E(),
      title: E()
    }))
  }),
  default: V(E()).optional()
}), eg = ye([Xm, Ym]), tg = ye([Gm, Qm, eg]), rg = ye([tg, Hm, Wm, Jm]), ng = Ir.extend({
  /**
   * The elicitation mode.
   *
   * Optional for backward compatibility. Clients MUST treat missing mode as "form".
   */
  mode: G("form").optional(),
  /**
   * The message to present to the user describing what information is being requested.
   */
  message: E(),
  /**
   * A restricted subset of JSON Schema.
   * Only top-level properties are allowed, without nesting.
   */
  requestedSchema: W({
    type: G("object"),
    properties: $e(E(), rg),
    required: V(E()).optional()
  })
}), og = Ir.extend({
  /**
   * The elicitation mode.
   */
  mode: G("url"),
  /**
   * The message to present to the user explaining why the interaction is needed.
   */
  message: E(),
  /**
   * The ID of the elicitation, which must be unique within the context of the server.
   * The client MUST treat this ID as an opaque value.
   */
  elicitationId: E(),
  /**
   * The URL that the user should navigate to.
   */
  url: E().url()
}), sg = ye([ng, og]), lu = Fe.extend({
  method: G("elicitation/create"),
  params: sg
}), ig = lt.extend({
  /**
   * The ID of the elicitation that completed.
   */
  elicitationId: E()
}), ag = dt.extend({
  method: G("notifications/elicitation/complete"),
  params: ig
}), du = Le.extend({
  /**
   * The user action in response to the elicitation.
   * - "accept": User submitted the form/confirmed the action
   * - "decline": User explicitly decline the action
   * - "cancel": User dismissed without making an explicit choice
   */
  action: ot(["accept", "decline", "cancel"]),
  /**
   * The submitted form data, only present when action is "accept".
   * Contains values matching the requested schema.
   * Per MCP spec, content is "typically omitted" for decline/cancel actions.
   * We normalize null to undefined for leniency while maintaining type compatibility.
   */
  content: Dc((e) => e === null ? void 0 : e, $e(E(), ye([E(), he(), me(), V(E())])).optional())
}), cg = W({
  type: G("ref/resource"),
  /**
   * The URI or URI template of the resource.
   */
  uri: E()
}), ug = W({
  type: G("ref/prompt"),
  /**
   * The name of the prompt or prompt template
   */
  name: E()
}), lg = st.extend({
  ref: ye([ug, cg]),
  /**
   * The argument's information
   */
  argument: W({
    /**
     * The name of the argument
     */
    name: E(),
    /**
     * The value of the argument to use for completion matching.
     */
    value: E()
  }),
  context: W({
    /**
     * Previously-resolved variables in a URI template or prompt.
     */
    arguments: $e(E(), E()).optional()
  }).optional()
}), dg = Fe.extend({
  method: G("completion/complete"),
  params: lg
}), fu = Le.extend({
  completion: xe({
    /**
     * An array of completion values. Must not exceed 100 items.
     */
    values: V(E()).max(100),
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total: Ce(he().int()),
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore: Ce(me())
  })
}), fg = W({
  /**
   * The URI identifying the root. This *must* start with file:// for now.
   */
  uri: E().startsWith("file://"),
  /**
   * An optional name for the root.
   */
  name: E().optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: $e(E(), be()).optional()
}), hg = Fe.extend({
  method: G("roots/list"),
  params: st.optional()
}), pg = Le.extend({
  roots: V(fg)
}), mg = dt.extend({
  method: G("notifications/roots/list_changed"),
  params: lt.optional()
});
ye([
  ks,
  Yp,
  dg,
  Mm,
  Sm,
  bm,
  um,
  lm,
  fm,
  pm,
  gm,
  Om,
  Rm,
  Cs,
  Ps,
  As,
  Is
]);
ye([
  Ss,
  Es,
  Hc,
  mg,
  Mn
]);
ye([
  nr,
  uu,
  Vm,
  du,
  pg,
  Ts,
  Rs,
  Ar
]);
ye([
  ks,
  cu,
  lu,
  hg,
  Cs,
  Ps,
  As,
  Is
]);
ye([
  Ss,
  Es,
  au,
  ym,
  Yc,
  su,
  ru,
  Mn,
  ag
]);
ye([
  nr,
  Vc,
  fu,
  tu,
  eu,
  Gc,
  Qc,
  Xc,
  to,
  ou,
  Ts,
  Rs,
  Ar
]);
class ee extends Error {
  constructor(t, r, n) {
    super(`MCP error ${t}: ${r}`), this.code = t, this.data = n, this.name = "McpError";
  }
  /**
   * Factory method to create the appropriate error type based on the error code and data
   */
  static fromError(t, r, n) {
    if (t === ne.UrlElicitationRequired && n) {
      const o = n;
      if (o.elicitations)
        return new gg(o.elicitations, r);
    }
    return new ee(t, r, n);
  }
}
class gg extends ee {
  constructor(t, r = `URL elicitation${t.length > 1 ? "s" : ""} required`) {
    super(ne.UrlElicitationRequired, r, {
      elicitations: t
    });
  }
  get elicitations() {
    var t;
    return ((t = this.data) == null ? void 0 : t.elicitations) ?? [];
  }
}
function Nt(e) {
  return e === "completed" || e === "failed" || e === "cancelled";
}
new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function yi(e) {
  const t = Cc(e), r = t == null ? void 0 : t.method;
  if (!r)
    throw new Error("Schema is missing a method literal");
  const n = $h(r);
  if (typeof n != "string")
    throw new Error("Schema method literal must be a string");
  return n;
}
function vi(e, t) {
  const r = Ct(e, t);
  if (!r.success)
    throw r.error;
  return r.data;
}
const _g = 6e4;
class yg {
  constructor(t) {
    this._options = t, this._requestMessageId = 0, this._requestHandlers = /* @__PURE__ */ new Map(), this._requestHandlerAbortControllers = /* @__PURE__ */ new Map(), this._notificationHandlers = /* @__PURE__ */ new Map(), this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers = /* @__PURE__ */ new Map(), this._timeoutInfo = /* @__PURE__ */ new Map(), this._pendingDebouncedNotifications = /* @__PURE__ */ new Set(), this._taskProgressTokens = /* @__PURE__ */ new Map(), this._requestResolvers = /* @__PURE__ */ new Map(), this.setNotificationHandler(Ss, (r) => {
      this._oncancel(r);
    }), this.setNotificationHandler(Es, (r) => {
      this._onprogress(r);
    }), this.setRequestHandler(
      ks,
      // Automatic pong by default.
      (r) => ({})
    ), this._taskStore = t == null ? void 0 : t.taskStore, this._taskMessageQueue = t == null ? void 0 : t.taskMessageQueue, this._taskStore && (this.setRequestHandler(Cs, async (r, n) => {
      const o = await this._taskStore.getTask(r.params.taskId, n.sessionId);
      if (!o)
        throw new ee(ne.InvalidParams, "Failed to retrieve task: Task not found");
      return {
        ...o
      };
    }), this.setRequestHandler(Ps, async (r, n) => {
      const o = async () => {
        var a;
        const s = r.params.taskId;
        if (this._taskMessageQueue) {
          let c;
          for (; c = await this._taskMessageQueue.dequeue(s, n.sessionId); ) {
            if (c.type === "response" || c.type === "error") {
              const l = c.message, d = l.id, m = this._requestResolvers.get(d);
              if (m)
                if (this._requestResolvers.delete(d), c.type === "response")
                  m(l);
                else {
                  const g = l, w = new ee(g.error.code, g.error.message, g.error.data);
                  m(w);
                }
              else {
                const g = c.type === "response" ? "Response" : "Error";
                this._onerror(new Error(`${g} handler missing for request ${d}`));
              }
              continue;
            }
            await ((a = this._transport) == null ? void 0 : a.send(c.message, { relatedRequestId: n.requestId }));
          }
        }
        const i = await this._taskStore.getTask(s, n.sessionId);
        if (!i)
          throw new ee(ne.InvalidParams, `Task not found: ${s}`);
        if (!Nt(i.status))
          return await this._waitForTaskUpdate(s, n.signal), await o();
        if (Nt(i.status)) {
          const c = await this._taskStore.getTaskResult(s, n.sessionId);
          return this._clearTaskQueue(s), {
            ...c,
            _meta: {
              ...c._meta,
              [xt]: {
                taskId: s
              }
            }
          };
        }
        return await o();
      };
      return await o();
    }), this.setRequestHandler(As, async (r, n) => {
      var o;
      try {
        const { tasks: s, nextCursor: i } = await this._taskStore.listTasks((o = r.params) == null ? void 0 : o.cursor, n.sessionId);
        return {
          tasks: s,
          nextCursor: i,
          _meta: {}
        };
      } catch (s) {
        throw new ee(ne.InvalidParams, `Failed to list tasks: ${s instanceof Error ? s.message : String(s)}`);
      }
    }), this.setRequestHandler(Is, async (r, n) => {
      try {
        const o = await this._taskStore.getTask(r.params.taskId, n.sessionId);
        if (!o)
          throw new ee(ne.InvalidParams, `Task not found: ${r.params.taskId}`);
        if (Nt(o.status))
          throw new ee(ne.InvalidParams, `Cannot cancel task in terminal status: ${o.status}`);
        await this._taskStore.updateTaskStatus(r.params.taskId, "cancelled", "Client cancelled task execution.", n.sessionId), this._clearTaskQueue(r.params.taskId);
        const s = await this._taskStore.getTask(r.params.taskId, n.sessionId);
        if (!s)
          throw new ee(ne.InvalidParams, `Task not found after cancellation: ${r.params.taskId}`);
        return {
          _meta: {},
          ...s
        };
      } catch (o) {
        throw o instanceof ee ? o : new ee(ne.InvalidRequest, `Failed to cancel task: ${o instanceof Error ? o.message : String(o)}`);
      }
    }));
  }
  async _oncancel(t) {
    if (!t.params.requestId)
      return;
    const r = this._requestHandlerAbortControllers.get(t.params.requestId);
    r == null || r.abort(t.params.reason);
  }
  _setupTimeout(t, r, n, o, s = !1) {
    this._timeoutInfo.set(t, {
      timeoutId: setTimeout(o, r),
      startTime: Date.now(),
      timeout: r,
      maxTotalTimeout: n,
      resetTimeoutOnProgress: s,
      onTimeout: o
    });
  }
  _resetTimeout(t) {
    const r = this._timeoutInfo.get(t);
    if (!r)
      return !1;
    const n = Date.now() - r.startTime;
    if (r.maxTotalTimeout && n >= r.maxTotalTimeout)
      throw this._timeoutInfo.delete(t), ee.fromError(ne.RequestTimeout, "Maximum total timeout exceeded", {
        maxTotalTimeout: r.maxTotalTimeout,
        totalElapsed: n
      });
    return clearTimeout(r.timeoutId), r.timeoutId = setTimeout(r.onTimeout, r.timeout), !0;
  }
  _cleanupTimeout(t) {
    const r = this._timeoutInfo.get(t);
    r && (clearTimeout(r.timeoutId), this._timeoutInfo.delete(t));
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(t) {
    var s, i, a;
    this._transport = t;
    const r = (s = this.transport) == null ? void 0 : s.onclose;
    this._transport.onclose = () => {
      r == null || r(), this._onclose();
    };
    const n = (i = this.transport) == null ? void 0 : i.onerror;
    this._transport.onerror = (c) => {
      n == null || n(c), this._onerror(c);
    };
    const o = (a = this._transport) == null ? void 0 : a.onmessage;
    this._transport.onmessage = (c, l) => {
      o == null || o(c, l), wr(c) || Vp(c) ? this._onresponse(c) : Uo(c) ? this._onrequest(c, l) : Zp(c) ? this._onnotification(c) : this._onerror(new Error(`Unknown message type: ${JSON.stringify(c)}`));
    }, await this._transport.start();
  }
  _onclose() {
    var n;
    const t = this._responseHandlers;
    this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._taskProgressTokens.clear(), this._pendingDebouncedNotifications.clear();
    const r = ee.fromError(ne.ConnectionClosed, "Connection closed");
    this._transport = void 0, (n = this.onclose) == null || n.call(this);
    for (const o of t.values())
      o(r);
  }
  _onerror(t) {
    var r;
    (r = this.onerror) == null || r.call(this, t);
  }
  _onnotification(t) {
    const r = this._notificationHandlers.get(t.method) ?? this.fallbackNotificationHandler;
    r !== void 0 && Promise.resolve().then(() => r(t)).catch((n) => this._onerror(new Error(`Uncaught error in notification handler: ${n}`)));
  }
  _onrequest(t, r) {
    var d, m, g, w;
    const n = this._requestHandlers.get(t.method) ?? this.fallbackRequestHandler, o = this._transport, s = (g = (m = (d = t.params) == null ? void 0 : d._meta) == null ? void 0 : m[xt]) == null ? void 0 : g.taskId;
    if (n === void 0) {
      const k = {
        jsonrpc: "2.0",
        id: t.id,
        error: {
          code: ne.MethodNotFound,
          message: "Method not found"
        }
      };
      s && this._taskMessageQueue ? this._enqueueTaskMessage(s, {
        type: "error",
        message: k,
        timestamp: Date.now()
      }, o == null ? void 0 : o.sessionId).catch((_) => this._onerror(new Error(`Failed to enqueue error response: ${_}`))) : o == null || o.send(k).catch((_) => this._onerror(new Error(`Failed to send an error response: ${_}`)));
      return;
    }
    const i = new AbortController();
    this._requestHandlerAbortControllers.set(t.id, i);
    const a = Lp(t.params) ? t.params.task : void 0, c = this._taskStore ? this.requestTaskStore(t, o == null ? void 0 : o.sessionId) : void 0, l = {
      signal: i.signal,
      sessionId: o == null ? void 0 : o.sessionId,
      _meta: (w = t.params) == null ? void 0 : w._meta,
      sendNotification: async (k) => {
        const _ = { relatedRequestId: t.id };
        s && (_.relatedTask = { taskId: s }), await this.notification(k, _);
      },
      sendRequest: async (k, _, h) => {
        var p;
        const f = { ...h, relatedRequestId: t.id };
        s && !f.relatedTask && (f.relatedTask = { taskId: s });
        const u = ((p = f.relatedTask) == null ? void 0 : p.taskId) ?? s;
        return u && c && await c.updateTaskStatus(u, "input_required"), await this.request(k, _, f);
      },
      authInfo: r == null ? void 0 : r.authInfo,
      requestId: t.id,
      requestInfo: r == null ? void 0 : r.requestInfo,
      taskId: s,
      taskStore: c,
      taskRequestedTtl: a == null ? void 0 : a.ttl,
      closeSSEStream: r == null ? void 0 : r.closeSSEStream,
      closeStandaloneSSEStream: r == null ? void 0 : r.closeStandaloneSSEStream
    };
    Promise.resolve().then(() => {
      a && this.assertTaskHandlerCapability(t.method);
    }).then(() => n(t, l)).then(async (k) => {
      if (i.signal.aborted)
        return;
      const _ = {
        result: k,
        jsonrpc: "2.0",
        id: t.id
      };
      s && this._taskMessageQueue ? await this._enqueueTaskMessage(s, {
        type: "response",
        message: _,
        timestamp: Date.now()
      }, o == null ? void 0 : o.sessionId) : await (o == null ? void 0 : o.send(_));
    }, async (k) => {
      if (i.signal.aborted)
        return;
      const _ = {
        jsonrpc: "2.0",
        id: t.id,
        error: {
          code: Number.isSafeInteger(k.code) ? k.code : ne.InternalError,
          message: k.message ?? "Internal error",
          ...k.data !== void 0 && { data: k.data }
        }
      };
      s && this._taskMessageQueue ? await this._enqueueTaskMessage(s, {
        type: "error",
        message: _,
        timestamp: Date.now()
      }, o == null ? void 0 : o.sessionId) : await (o == null ? void 0 : o.send(_));
    }).catch((k) => this._onerror(new Error(`Failed to send response: ${k}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(t.id);
    });
  }
  _onprogress(t) {
    const { progressToken: r, ...n } = t.params, o = Number(r), s = this._progressHandlers.get(o);
    if (!s) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(t)}`));
      return;
    }
    const i = this._responseHandlers.get(o), a = this._timeoutInfo.get(o);
    if (a && i && a.resetTimeoutOnProgress)
      try {
        this._resetTimeout(o);
      } catch (c) {
        this._responseHandlers.delete(o), this._progressHandlers.delete(o), this._cleanupTimeout(o), i(c);
        return;
      }
    s(n);
  }
  _onresponse(t) {
    const r = Number(t.id), n = this._requestResolvers.get(r);
    if (n) {
      if (this._requestResolvers.delete(r), wr(t))
        n(t);
      else {
        const i = new ee(t.error.code, t.error.message, t.error.data);
        n(i);
      }
      return;
    }
    const o = this._responseHandlers.get(r);
    if (o === void 0) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(t)}`));
      return;
    }
    this._responseHandlers.delete(r), this._cleanupTimeout(r);
    let s = !1;
    if (wr(t) && t.result && typeof t.result == "object") {
      const i = t.result;
      if (i.task && typeof i.task == "object") {
        const a = i.task;
        typeof a.taskId == "string" && (s = !0, this._taskProgressTokens.set(a.taskId, r));
      }
    }
    if (s || this._progressHandlers.delete(r), wr(t))
      o(t);
    else {
      const i = ee.fromError(t.error.code, t.error.message, t.error.data);
      o(i);
    }
  }
  get transport() {
    return this._transport;
  }
  /**
   * Closes the connection.
   */
  async close() {
    var t;
    await ((t = this._transport) == null ? void 0 : t.close());
  }
  /**
   * Sends a request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * @example
   * ```typescript
   * const stream = protocol.requestStream(request, resultSchema, options);
   * for await (const message of stream) {
   *   switch (message.type) {
   *     case 'taskCreated':
   *       console.log('Task created:', message.task.taskId);
   *       break;
   *     case 'taskStatus':
   *       console.log('Task status:', message.task.status);
   *       break;
   *     case 'result':
   *       console.log('Final result:', message.result);
   *       break;
   *     case 'error':
   *       console.error('Error:', message.error);
   *       break;
   *   }
   * }
   * ```
   *
   * @experimental Use `client.experimental.tasks.requestStream()` to access this method.
   */
  async *requestStream(t, r, n) {
    var i, a;
    const { task: o } = n ?? {};
    if (!o) {
      try {
        yield { type: "result", result: await this.request(t, r, n) };
      } catch (c) {
        yield {
          type: "error",
          error: c instanceof ee ? c : new ee(ne.InternalError, String(c))
        };
      }
      return;
    }
    let s;
    try {
      const c = await this.request(t, Ar, n);
      if (c.task)
        s = c.task.taskId, yield { type: "taskCreated", task: c.task };
      else
        throw new ee(ne.InternalError, "Task creation did not return a task");
      for (; ; ) {
        const l = await this.getTask({ taskId: s }, n);
        if (yield { type: "taskStatus", task: l }, Nt(l.status)) {
          l.status === "completed" ? yield { type: "result", result: await this.getTaskResult({ taskId: s }, r, n) } : l.status === "failed" ? yield {
            type: "error",
            error: new ee(ne.InternalError, `Task ${s} failed`)
          } : l.status === "cancelled" && (yield {
            type: "error",
            error: new ee(ne.InternalError, `Task ${s} was cancelled`)
          });
          return;
        }
        if (l.status === "input_required") {
          yield { type: "result", result: await this.getTaskResult({ taskId: s }, r, n) };
          return;
        }
        const d = l.pollInterval ?? ((i = this._options) == null ? void 0 : i.defaultTaskPollInterval) ?? 1e3;
        await new Promise((m) => setTimeout(m, d)), (a = n == null ? void 0 : n.signal) == null || a.throwIfAborted();
      }
    } catch (c) {
      yield {
        type: "error",
        error: c instanceof ee ? c : new ee(ne.InternalError, String(c))
      };
    }
  }
  /**
   * Sends a request and waits for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request(t, r, n) {
    const { relatedRequestId: o, resumptionToken: s, onresumptiontoken: i, task: a, relatedTask: c } = n ?? {};
    return new Promise((l, d) => {
      var u, p, v, b, y;
      const m = (S) => {
        d(S);
      };
      if (!this._transport) {
        m(new Error("Not connected"));
        return;
      }
      if (((u = this._options) == null ? void 0 : u.enforceStrictCapabilities) === !0)
        try {
          this.assertCapabilityForMethod(t.method), a && this.assertTaskCapability(t.method);
        } catch (S) {
          m(S);
          return;
        }
      (p = n == null ? void 0 : n.signal) == null || p.throwIfAborted();
      const g = this._requestMessageId++, w = {
        ...t,
        jsonrpc: "2.0",
        id: g
      };
      n != null && n.onprogress && (this._progressHandlers.set(g, n.onprogress), w.params = {
        ...t.params,
        _meta: {
          ...((v = t.params) == null ? void 0 : v._meta) || {},
          progressToken: g
        }
      }), a && (w.params = {
        ...w.params,
        task: a
      }), c && (w.params = {
        ...w.params,
        _meta: {
          ...((b = w.params) == null ? void 0 : b._meta) || {},
          [xt]: c
        }
      });
      const k = (S) => {
        var O;
        this._responseHandlers.delete(g), this._progressHandlers.delete(g), this._cleanupTimeout(g), (O = this._transport) == null || O.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: g,
            reason: String(S)
          }
        }, { relatedRequestId: o, resumptionToken: s, onresumptiontoken: i }).catch((F) => this._onerror(new Error(`Failed to send cancellation: ${F}`)));
        const T = S instanceof ee ? S : new ee(ne.RequestTimeout, String(S));
        d(T);
      };
      this._responseHandlers.set(g, (S) => {
        var T;
        if (!((T = n == null ? void 0 : n.signal) != null && T.aborted)) {
          if (S instanceof Error)
            return d(S);
          try {
            const O = Ct(r, S.result);
            O.success ? l(O.data) : d(O.error);
          } catch (O) {
            d(O);
          }
        }
      }), (y = n == null ? void 0 : n.signal) == null || y.addEventListener("abort", () => {
        var S;
        k((S = n == null ? void 0 : n.signal) == null ? void 0 : S.reason);
      });
      const _ = (n == null ? void 0 : n.timeout) ?? _g, h = () => k(ee.fromError(ne.RequestTimeout, "Request timed out", { timeout: _ }));
      this._setupTimeout(g, _, n == null ? void 0 : n.maxTotalTimeout, h, (n == null ? void 0 : n.resetTimeoutOnProgress) ?? !1);
      const f = c == null ? void 0 : c.taskId;
      if (f) {
        const S = (T) => {
          const O = this._responseHandlers.get(g);
          O ? O(T) : this._onerror(new Error(`Response handler missing for side-channeled request ${g}`));
        };
        this._requestResolvers.set(g, S), this._enqueueTaskMessage(f, {
          type: "request",
          message: w,
          timestamp: Date.now()
        }).catch((T) => {
          this._cleanupTimeout(g), d(T);
        });
      } else
        this._transport.send(w, { relatedRequestId: o, resumptionToken: s, onresumptiontoken: i }).catch((S) => {
          this._cleanupTimeout(g), d(S);
        });
    });
  }
  /**
   * Gets the current status of a task.
   *
   * @experimental Use `client.experimental.tasks.getTask()` to access this method.
   */
  async getTask(t, r) {
    return this.request({ method: "tasks/get", params: t }, Ts, r);
  }
  /**
   * Retrieves the result of a completed task.
   *
   * @experimental Use `client.experimental.tasks.getTaskResult()` to access this method.
   */
  async getTaskResult(t, r, n) {
    return this.request({ method: "tasks/result", params: t }, r, n);
  }
  /**
   * Lists tasks, optionally starting from a pagination cursor.
   *
   * @experimental Use `client.experimental.tasks.listTasks()` to access this method.
   */
  async listTasks(t, r) {
    return this.request({ method: "tasks/list", params: t }, Rs, r);
  }
  /**
   * Cancels a specific task.
   *
   * @experimental Use `client.experimental.tasks.cancelTask()` to access this method.
   */
  async cancelTask(t, r) {
    return this.request({ method: "tasks/cancel", params: t }, am, r);
  }
  /**
   * Emits a notification, which is a one-way message that does not expect a response.
   */
  async notification(t, r) {
    var a, c, l, d;
    if (!this._transport)
      throw new Error("Not connected");
    this.assertNotificationCapability(t.method);
    const n = (a = r == null ? void 0 : r.relatedTask) == null ? void 0 : a.taskId;
    if (n) {
      const m = {
        ...t,
        jsonrpc: "2.0",
        params: {
          ...t.params,
          _meta: {
            ...((c = t.params) == null ? void 0 : c._meta) || {},
            [xt]: r.relatedTask
          }
        }
      };
      await this._enqueueTaskMessage(n, {
        type: "notification",
        message: m,
        timestamp: Date.now()
      });
      return;
    }
    if ((((l = this._options) == null ? void 0 : l.debouncedNotificationMethods) ?? []).includes(t.method) && !t.params && !(r != null && r.relatedRequestId) && !(r != null && r.relatedTask)) {
      if (this._pendingDebouncedNotifications.has(t.method))
        return;
      this._pendingDebouncedNotifications.add(t.method), Promise.resolve().then(() => {
        var g, w;
        if (this._pendingDebouncedNotifications.delete(t.method), !this._transport)
          return;
        let m = {
          ...t,
          jsonrpc: "2.0"
        };
        r != null && r.relatedTask && (m = {
          ...m,
          params: {
            ...m.params,
            _meta: {
              ...((g = m.params) == null ? void 0 : g._meta) || {},
              [xt]: r.relatedTask
            }
          }
        }), (w = this._transport) == null || w.send(m, r).catch((k) => this._onerror(k));
      });
      return;
    }
    let i = {
      ...t,
      jsonrpc: "2.0"
    };
    r != null && r.relatedTask && (i = {
      ...i,
      params: {
        ...i.params,
        _meta: {
          ...((d = i.params) == null ? void 0 : d._meta) || {},
          [xt]: r.relatedTask
        }
      }
    }), await this._transport.send(i, r);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a request with the given method.
   *
   * Note that this will replace any previous request handler for the same method.
   */
  setRequestHandler(t, r) {
    const n = yi(t);
    this.assertRequestHandlerCapability(n), this._requestHandlers.set(n, (o, s) => {
      const i = vi(t, o);
      return Promise.resolve(r(i, s));
    });
  }
  /**
   * Removes the request handler for the given method.
   */
  removeRequestHandler(t) {
    this._requestHandlers.delete(t);
  }
  /**
   * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
   */
  assertCanSetRequestHandler(t) {
    if (this._requestHandlers.has(t))
      throw new Error(`A request handler for ${t} already exists, which would be overridden`);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a notification with the given method.
   *
   * Note that this will replace any previous notification handler for the same method.
   */
  setNotificationHandler(t, r) {
    const n = yi(t);
    this._notificationHandlers.set(n, (o) => {
      const s = vi(t, o);
      return Promise.resolve(r(s));
    });
  }
  /**
   * Removes the notification handler for the given method.
   */
  removeNotificationHandler(t) {
    this._notificationHandlers.delete(t);
  }
  /**
   * Cleans up the progress handler associated with a task.
   * This should be called when a task reaches a terminal status.
   */
  _cleanupTaskProgressHandler(t) {
    const r = this._taskProgressTokens.get(t);
    r !== void 0 && (this._progressHandlers.delete(r), this._taskProgressTokens.delete(t));
  }
  /**
   * Enqueues a task-related message for side-channel delivery via tasks/result.
   * @param taskId The task ID to associate the message with
   * @param message The message to enqueue
   * @param sessionId Optional session ID for binding the operation to a specific session
   * @throws Error if taskStore is not configured or if enqueue fails (e.g., queue overflow)
   *
   * Note: If enqueue fails, it's the TaskMessageQueue implementation's responsibility to handle
   * the error appropriately (e.g., by failing the task, logging, etc.). The Protocol layer
   * simply propagates the error.
   */
  async _enqueueTaskMessage(t, r, n) {
    var s;
    if (!this._taskStore || !this._taskMessageQueue)
      throw new Error("Cannot enqueue task message: taskStore and taskMessageQueue are not configured");
    const o = (s = this._options) == null ? void 0 : s.maxTaskQueueSize;
    await this._taskMessageQueue.enqueue(t, r, n, o);
  }
  /**
   * Clears the message queue for a task and rejects any pending request resolvers.
   * @param taskId The task ID whose queue should be cleared
   * @param sessionId Optional session ID for binding the operation to a specific session
   */
  async _clearTaskQueue(t, r) {
    if (this._taskMessageQueue) {
      const n = await this._taskMessageQueue.dequeueAll(t, r);
      for (const o of n)
        if (o.type === "request" && Uo(o.message)) {
          const s = o.message.id, i = this._requestResolvers.get(s);
          i ? (i(new ee(ne.InternalError, "Task cancelled or completed")), this._requestResolvers.delete(s)) : this._onerror(new Error(`Resolver missing for request ${s} during task ${t} cleanup`));
        }
    }
  }
  /**
   * Waits for a task update (new messages or status change) with abort signal support.
   * Uses polling to check for updates at the task's configured poll interval.
   * @param taskId The task ID to wait for
   * @param signal Abort signal to cancel the wait
   * @returns Promise that resolves when an update occurs or rejects if aborted
   */
  async _waitForTaskUpdate(t, r) {
    var o, s;
    let n = ((o = this._options) == null ? void 0 : o.defaultTaskPollInterval) ?? 1e3;
    try {
      const i = await ((s = this._taskStore) == null ? void 0 : s.getTask(t));
      i != null && i.pollInterval && (n = i.pollInterval);
    } catch {
    }
    return new Promise((i, a) => {
      if (r.aborted) {
        a(new ee(ne.InvalidRequest, "Request cancelled"));
        return;
      }
      const c = setTimeout(i, n);
      r.addEventListener("abort", () => {
        clearTimeout(c), a(new ee(ne.InvalidRequest, "Request cancelled"));
      }, { once: !0 });
    });
  }
  requestTaskStore(t, r) {
    const n = this._taskStore;
    if (!n)
      throw new Error("No task store configured");
    return {
      createTask: async (o) => {
        if (!t)
          throw new Error("No request provided");
        return await n.createTask(o, t.id, {
          method: t.method,
          params: t.params
        }, r);
      },
      getTask: async (o) => {
        const s = await n.getTask(o, r);
        if (!s)
          throw new ee(ne.InvalidParams, "Failed to retrieve task: Task not found");
        return s;
      },
      storeTaskResult: async (o, s, i) => {
        await n.storeTaskResult(o, s, i, r);
        const a = await n.getTask(o, r);
        if (a) {
          const c = Mn.parse({
            method: "notifications/tasks/status",
            params: a
          });
          await this.notification(c), Nt(a.status) && this._cleanupTaskProgressHandler(o);
        }
      },
      getTaskResult: (o) => n.getTaskResult(o, r),
      updateTaskStatus: async (o, s, i) => {
        const a = await n.getTask(o, r);
        if (!a)
          throw new ee(ne.InvalidParams, `Task "${o}" not found - it may have been cleaned up`);
        if (Nt(a.status))
          throw new ee(ne.InvalidParams, `Cannot update task "${o}" from terminal status "${a.status}" to "${s}". Terminal states (completed, failed, cancelled) cannot transition to other states.`);
        await n.updateTaskStatus(o, s, i, r);
        const c = await n.getTask(o, r);
        if (c) {
          const l = Mn.parse({
            method: "notifications/tasks/status",
            params: c
          });
          await this.notification(l), Nt(c.status) && this._cleanupTaskProgressHandler(o);
        }
      },
      listTasks: (o) => n.listTasks(o, r)
    };
  }
}
function wi(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function vg(e, t) {
  const r = { ...e };
  for (const n in t) {
    const o = n, s = t[o];
    if (s === void 0)
      continue;
    const i = r[o];
    wi(i) && wi(s) ? r[o] = { ...i, ...s } : r[o] = s;
  }
  return r;
}
var Fr = { exports: {} }, mo = {}, yt = {}, Mt = {}, go = {}, _o = {}, yo = {}, bi;
function qn() {
  return bi || (bi = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class r extends t {
      constructor(u) {
        if (super(), !e.IDENTIFIER.test(u))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = u;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = r;
    class n extends t {
      constructor(u) {
        super(), this._items = typeof u == "string" ? [u] : u;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const u = this._items[0];
        return u === "" || u === '""';
      }
      get str() {
        var u;
        return (u = this._str) !== null && u !== void 0 ? u : this._str = this._items.reduce((p, v) => `${p}${v}`, "");
      }
      get names() {
        var u;
        return (u = this._names) !== null && u !== void 0 ? u : this._names = this._items.reduce((p, v) => (v instanceof r && (p[v.str] = (p[v.str] || 0) + 1), p), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function o(f, ...u) {
      const p = [f[0]];
      let v = 0;
      for (; v < u.length; )
        a(p, u[v]), p.push(f[++v]);
      return new n(p);
    }
    e._ = o;
    const s = new n("+");
    function i(f, ...u) {
      const p = [w(f[0])];
      let v = 0;
      for (; v < u.length; )
        p.push(s), a(p, u[v]), p.push(s, w(f[++v]));
      return c(p), new n(p);
    }
    e.str = i;
    function a(f, u) {
      u instanceof n ? f.push(...u._items) : u instanceof r ? f.push(u) : f.push(m(u));
    }
    e.addCodeArg = a;
    function c(f) {
      let u = 1;
      for (; u < f.length - 1; ) {
        if (f[u] === s) {
          const p = l(f[u - 1], f[u + 1]);
          if (p !== void 0) {
            f.splice(u - 1, 3, p);
            continue;
          }
          f[u++] = "+";
        }
        u++;
      }
    }
    function l(f, u) {
      if (u === '""')
        return f;
      if (f === '""')
        return u;
      if (typeof f == "string")
        return u instanceof r || f[f.length - 1] !== '"' ? void 0 : typeof u != "string" ? `${f.slice(0, -1)}${u}"` : u[0] === '"' ? f.slice(0, -1) + u.slice(1) : void 0;
      if (typeof u == "string" && u[0] === '"' && !(f instanceof r))
        return `"${f}${u.slice(1)}`;
    }
    function d(f, u) {
      return u.emptyStr() ? f : f.emptyStr() ? u : i`${f}${u}`;
    }
    e.strConcat = d;
    function m(f) {
      return typeof f == "number" || typeof f == "boolean" || f === null ? f : w(Array.isArray(f) ? f.join(",") : f);
    }
    function g(f) {
      return new n(w(f));
    }
    e.stringify = g;
    function w(f) {
      return JSON.stringify(f).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = w;
    function k(f) {
      return typeof f == "string" && e.IDENTIFIER.test(f) ? new n(`.${f}`) : o`[${f}]`;
    }
    e.getProperty = k;
    function _(f) {
      if (typeof f == "string" && e.IDENTIFIER.test(f))
        return new n(`${f}`);
      throw new Error(`CodeGen: invalid export name: ${f}, use explicit $id name mapping`);
    }
    e.getEsmExportName = _;
    function h(f) {
      return new n(f.toString());
    }
    e.regexpCode = h;
  }(yo)), yo;
}
var vo = {}, $i;
function Si() {
  return $i || ($i = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = qn();
    class r extends Error {
      constructor(l) {
        super(`CodeGen: "code" for ${l} not defined`), this.value = l.value;
      }
    }
    var n;
    (function(c) {
      c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class o {
      constructor({ prefixes: l, parent: d } = {}) {
        this._names = {}, this._prefixes = l, this._parent = d;
      }
      toName(l) {
        return l instanceof t.Name ? l : this.name(l);
      }
      name(l) {
        return new t.Name(this._newName(l));
      }
      _newName(l) {
        const d = this._names[l] || this._nameGroup(l);
        return `${l}${d.index++}`;
      }
      _nameGroup(l) {
        var d, m;
        if (!((m = (d = this._parent) === null || d === void 0 ? void 0 : d._prefixes) === null || m === void 0) && m.has(l) || this._prefixes && !this._prefixes.has(l))
          throw new Error(`CodeGen: prefix "${l}" is not allowed in this scope`);
        return this._names[l] = { prefix: l, index: 0 };
      }
    }
    e.Scope = o;
    class s extends t.Name {
      constructor(l, d) {
        super(d), this.prefix = l;
      }
      setValue(l, { property: d, itemIndex: m }) {
        this.value = l, this.scopePath = (0, t._)`.${new t.Name(d)}[${m}]`;
      }
    }
    e.ValueScopeName = s;
    const i = (0, t._)`\n`;
    class a extends o {
      constructor(l) {
        super(l), this._values = {}, this._scope = l.scope, this.opts = { ...l, _n: l.lines ? i : t.nil };
      }
      get() {
        return this._scope;
      }
      name(l) {
        return new s(l, this._newName(l));
      }
      value(l, d) {
        var m;
        if (d.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const g = this.toName(l), { prefix: w } = g, k = (m = d.key) !== null && m !== void 0 ? m : d.ref;
        let _ = this._values[w];
        if (_) {
          const u = _.get(k);
          if (u)
            return u;
        } else
          _ = this._values[w] = /* @__PURE__ */ new Map();
        _.set(k, g);
        const h = this._scope[w] || (this._scope[w] = []), f = h.length;
        return h[f] = d.ref, g.setValue(d, { property: w, itemIndex: f }), g;
      }
      getValue(l, d) {
        const m = this._values[l];
        if (m)
          return m.get(d);
      }
      scopeRefs(l, d = this._values) {
        return this._reduceValues(d, (m) => {
          if (m.scopePath === void 0)
            throw new Error(`CodeGen: name "${m}" has no value`);
          return (0, t._)`${l}${m.scopePath}`;
        });
      }
      scopeCode(l = this._values, d, m) {
        return this._reduceValues(l, (g) => {
          if (g.value === void 0)
            throw new Error(`CodeGen: name "${g}" has no value`);
          return g.value.code;
        }, d, m);
      }
      _reduceValues(l, d, m = {}, g) {
        let w = t.nil;
        for (const k in l) {
          const _ = l[k];
          if (!_)
            continue;
          const h = m[k] = m[k] || /* @__PURE__ */ new Map();
          _.forEach((f) => {
            if (h.has(f))
              return;
            h.set(f, n.Started);
            let u = d(f);
            if (u) {
              const p = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              w = (0, t._)`${w}${p} ${f} = ${u};${this.opts._n}`;
            } else if (u = g == null ? void 0 : g(f))
              w = (0, t._)`${w}${u}${this.opts._n}`;
            else
              throw new r(f);
            h.set(f, n.Completed);
          });
        }
        return w;
      }
    }
    e.ValueScope = a;
  }(vo)), vo;
}
var ki;
function ie() {
  return ki || (ki = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = qn(), r = Si();
    var n = qn();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var o = Si();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return o.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return o.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return o.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return o.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class s {
      optimizeNodes() {
        return this;
      }
      optimizeNames($, C) {
        return this;
      }
    }
    class i extends s {
      constructor($, C, N) {
        super(), this.varKind = $, this.name = C, this.rhs = N;
      }
      render({ es5: $, _n: C }) {
        const N = $ ? r.varKinds.var : this.varKind, B = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${N} ${this.name}${B};` + C;
      }
      optimizeNames($, C) {
        if ($[this.name.str])
          return this.rhs && (this.rhs = H(this.rhs, $, C)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class a extends s {
      constructor($, C, N) {
        super(), this.lhs = $, this.rhs = C, this.sideEffects = N;
      }
      render({ _n: $ }) {
        return `${this.lhs} = ${this.rhs};` + $;
      }
      optimizeNames($, C) {
        if (!(this.lhs instanceof t.Name && !$[this.lhs.str] && !this.sideEffects))
          return this.rhs = H(this.rhs, $, C), this;
      }
      get names() {
        const $ = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return q($, this.rhs);
      }
    }
    class c extends a {
      constructor($, C, N, B) {
        super($, N, B), this.op = C;
      }
      render({ _n: $ }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + $;
      }
    }
    class l extends s {
      constructor($) {
        super(), this.label = $, this.names = {};
      }
      render({ _n: $ }) {
        return `${this.label}:` + $;
      }
    }
    class d extends s {
      constructor($) {
        super(), this.label = $, this.names = {};
      }
      render({ _n: $ }) {
        return `break${this.label ? ` ${this.label}` : ""};` + $;
      }
    }
    class m extends s {
      constructor($) {
        super(), this.error = $;
      }
      render({ _n: $ }) {
        return `throw ${this.error};` + $;
      }
      get names() {
        return this.error.names;
      }
    }
    class g extends s {
      constructor($) {
        super(), this.code = $;
      }
      render({ _n: $ }) {
        return `${this.code};` + $;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames($, C) {
        return this.code = H(this.code, $, C), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class w extends s {
      constructor($ = []) {
        super(), this.nodes = $;
      }
      render($) {
        return this.nodes.reduce((C, N) => C + N.render($), "");
      }
      optimizeNodes() {
        const { nodes: $ } = this;
        let C = $.length;
        for (; C--; ) {
          const N = $[C].optimizeNodes();
          Array.isArray(N) ? $.splice(C, 1, ...N) : N ? $[C] = N : $.splice(C, 1);
        }
        return $.length > 0 ? this : void 0;
      }
      optimizeNames($, C) {
        const { nodes: N } = this;
        let B = N.length;
        for (; B--; ) {
          const X = N[B];
          X.optimizeNames($, C) || (Y($, X.names), N.splice(B, 1));
        }
        return N.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce(($, C) => U($, C.names), {});
      }
    }
    class k extends w {
      render($) {
        return "{" + $._n + super.render($) + "}" + $._n;
      }
    }
    class _ extends w {
    }
    class h extends k {
    }
    h.kind = "else";
    class f extends k {
      constructor($, C) {
        super(C), this.condition = $;
      }
      render($) {
        let C = `if(${this.condition})` + super.render($);
        return this.else && (C += "else " + this.else.render($)), C;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const $ = this.condition;
        if ($ === !0)
          return this.nodes;
        let C = this.else;
        if (C) {
          const N = C.optimizeNodes();
          C = this.else = Array.isArray(N) ? new h(N) : N;
        }
        if (C)
          return $ === !1 ? C instanceof f ? C : C.nodes : this.nodes.length ? this : new f(ke($), C instanceof f ? [C] : C.nodes);
        if (!($ === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames($, C) {
        var N;
        if (this.else = (N = this.else) === null || N === void 0 ? void 0 : N.optimizeNames($, C), !!(super.optimizeNames($, C) || this.else))
          return this.condition = H(this.condition, $, C), this;
      }
      get names() {
        const $ = super.names;
        return q($, this.condition), this.else && U($, this.else.names), $;
      }
    }
    f.kind = "if";
    class u extends k {
    }
    u.kind = "for";
    class p extends u {
      constructor($) {
        super(), this.iteration = $;
      }
      render($) {
        return `for(${this.iteration})` + super.render($);
      }
      optimizeNames($, C) {
        if (super.optimizeNames($, C))
          return this.iteration = H(this.iteration, $, C), this;
      }
      get names() {
        return U(super.names, this.iteration.names);
      }
    }
    class v extends u {
      constructor($, C, N, B) {
        super(), this.varKind = $, this.name = C, this.from = N, this.to = B;
      }
      render($) {
        const C = $.es5 ? r.varKinds.var : this.varKind, { name: N, from: B, to: X } = this;
        return `for(${C} ${N}=${B}; ${N}<${X}; ${N}++)` + super.render($);
      }
      get names() {
        const $ = q(super.names, this.from);
        return q($, this.to);
      }
    }
    class b extends u {
      constructor($, C, N, B) {
        super(), this.loop = $, this.varKind = C, this.name = N, this.iterable = B;
      }
      render($) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render($);
      }
      optimizeNames($, C) {
        if (super.optimizeNames($, C))
          return this.iterable = H(this.iterable, $, C), this;
      }
      get names() {
        return U(super.names, this.iterable.names);
      }
    }
    class y extends k {
      constructor($, C, N) {
        super(), this.name = $, this.args = C, this.async = N;
      }
      render($) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render($);
      }
    }
    y.kind = "func";
    class S extends w {
      render($) {
        return "return " + super.render($);
      }
    }
    S.kind = "return";
    class T extends k {
      render($) {
        let C = "try" + super.render($);
        return this.catch && (C += this.catch.render($)), this.finally && (C += this.finally.render($)), C;
      }
      optimizeNodes() {
        var $, C;
        return super.optimizeNodes(), ($ = this.catch) === null || $ === void 0 || $.optimizeNodes(), (C = this.finally) === null || C === void 0 || C.optimizeNodes(), this;
      }
      optimizeNames($, C) {
        var N, B;
        return super.optimizeNames($, C), (N = this.catch) === null || N === void 0 || N.optimizeNames($, C), (B = this.finally) === null || B === void 0 || B.optimizeNames($, C), this;
      }
      get names() {
        const $ = super.names;
        return this.catch && U($, this.catch.names), this.finally && U($, this.finally.names), $;
      }
    }
    class O extends k {
      constructor($) {
        super(), this.error = $;
      }
      render($) {
        return `catch(${this.error})` + super.render($);
      }
    }
    O.kind = "catch";
    class F extends k {
      render($) {
        return "finally" + super.render($);
      }
    }
    F.kind = "finally";
    class M {
      constructor($, C = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...C, _n: C.lines ? `
` : "" }, this._extScope = $, this._scope = new r.Scope({ parent: $ }), this._nodes = [new _()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name($) {
        return this._scope.name($);
      }
      // reserves unique name in the external scope
      scopeName($) {
        return this._extScope.name($);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue($, C) {
        const N = this._extScope.value($, C);
        return (this._values[N.prefix] || (this._values[N.prefix] = /* @__PURE__ */ new Set())).add(N), N;
      }
      getScopeValue($, C) {
        return this._extScope.getValue($, C);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs($) {
        return this._extScope.scopeRefs($, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def($, C, N, B) {
        const X = this._scope.toName(C);
        return N !== void 0 && B && (this._constants[X.str] = N), this._leafNode(new i($, X, N)), X;
      }
      // `const` declaration (`var` in es5 mode)
      const($, C, N) {
        return this._def(r.varKinds.const, $, C, N);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let($, C, N) {
        return this._def(r.varKinds.let, $, C, N);
      }
      // `var` declaration with optional assignment
      var($, C, N) {
        return this._def(r.varKinds.var, $, C, N);
      }
      // assignment code
      assign($, C, N) {
        return this._leafNode(new a($, C, N));
      }
      // `+=` code
      add($, C) {
        return this._leafNode(new c($, e.operators.ADD, C));
      }
      // appends passed SafeExpr to code or executes Block
      code($) {
        return typeof $ == "function" ? $() : $ !== t.nil && this._leafNode(new g($)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...$) {
        const C = ["{"];
        for (const [N, B] of $)
          C.length > 1 && C.push(","), C.push(N), (N !== B || this.opts.es5) && (C.push(":"), (0, t.addCodeArg)(C, B));
        return C.push("}"), new t._Code(C);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if($, C, N) {
        if (this._blockNode(new f($)), C && N)
          this.code(C).else().code(N).endIf();
        else if (C)
          this.code(C).endIf();
        else if (N)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf($) {
        return this._elseNode(new f($));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new h());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(f, h);
      }
      _for($, C) {
        return this._blockNode($), C && this.code(C).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for($, C) {
        return this._for(new p($), C);
      }
      // `for` statement for a range of values
      forRange($, C, N, B, X = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
        const de = this._scope.toName($);
        return this._for(new v(X, de, C, N), () => B(de));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf($, C, N, B = r.varKinds.const) {
        const X = this._scope.toName($);
        if (this.opts.es5) {
          const de = C instanceof t.Name ? C : this.var("_arr", C);
          return this.forRange("_i", 0, (0, t._)`${de}.length`, (ue) => {
            this.var(X, (0, t._)`${de}[${ue}]`), N(X);
          });
        }
        return this._for(new b("of", B, X, C), () => N(X));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn($, C, N, B = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf($, (0, t._)`Object.keys(${C})`, N);
        const X = this._scope.toName($);
        return this._for(new b("in", B, X, C), () => N(X));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(u);
      }
      // `label` statement
      label($) {
        return this._leafNode(new l($));
      }
      // `break` statement
      break($) {
        return this._leafNode(new d($));
      }
      // `return` statement
      return($) {
        const C = new S();
        if (this._blockNode(C), this.code($), C.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(S);
      }
      // `try` statement
      try($, C, N) {
        if (!C && !N)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const B = new T();
        if (this._blockNode(B), this.code($), C) {
          const X = this.name("e");
          this._currNode = B.catch = new O(X), C(X);
        }
        return N && (this._currNode = B.finally = new F(), this.code(N)), this._endBlockNode(O, F);
      }
      // `throw` statement
      throw($) {
        return this._leafNode(new m($));
      }
      // start self-balancing block
      block($, C) {
        return this._blockStarts.push(this._nodes.length), $ && this.code($).endBlock(C), this;
      }
      // end the current self-balancing block
      endBlock($) {
        const C = this._blockStarts.pop();
        if (C === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const N = this._nodes.length - C;
        if (N < 0 || $ !== void 0 && N !== $)
          throw new Error(`CodeGen: wrong number of nodes: ${N} vs ${$} expected`);
        return this._nodes.length = C, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func($, C = t.nil, N, B) {
        return this._blockNode(new y($, C, N)), B && this.code(B).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(y);
      }
      optimize($ = 1) {
        for (; $-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode($) {
        return this._currNode.nodes.push($), this;
      }
      _blockNode($) {
        this._currNode.nodes.push($), this._nodes.push($);
      }
      _endBlockNode($, C) {
        const N = this._currNode;
        if (N instanceof $ || C && N instanceof C)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${C ? `${$.kind}/${C.kind}` : $.kind}"`);
      }
      _elseNode($) {
        const C = this._currNode;
        if (!(C instanceof f))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = C.else = $, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const $ = this._nodes;
        return $[$.length - 1];
      }
      set _currNode($) {
        const C = this._nodes;
        C[C.length - 1] = $;
      }
    }
    e.CodeGen = M;
    function U(I, $) {
      for (const C in $)
        I[C] = (I[C] || 0) + ($[C] || 0);
      return I;
    }
    function q(I, $) {
      return $ instanceof t._CodeOrName ? U(I, $.names) : I;
    }
    function H(I, $, C) {
      if (I instanceof t.Name)
        return N(I);
      if (!B(I))
        return I;
      return new t._Code(I._items.reduce((X, de) => (de instanceof t.Name && (de = N(de)), de instanceof t._Code ? X.push(...de._items) : X.push(de), X), []));
      function N(X) {
        const de = C[X.str];
        return de === void 0 || $[X.str] !== 1 ? X : (delete $[X.str], de);
      }
      function B(X) {
        return X instanceof t._Code && X._items.some((de) => de instanceof t.Name && $[de.str] === 1 && C[de.str] !== void 0);
      }
    }
    function Y(I, $) {
      for (const C in $)
        I[C] = (I[C] || 0) - ($[C] || 0);
    }
    function ke(I) {
      return typeof I == "boolean" || typeof I == "number" || I === null ? !I : (0, t._)`!${D(I)}`;
    }
    e.not = ke;
    const Te = A(e.operators.AND);
    function oe(...I) {
      return I.reduce(Te);
    }
    e.and = oe;
    const Ve = A(e.operators.OR);
    function L(...I) {
      return I.reduce(Ve);
    }
    e.or = L;
    function A(I) {
      return ($, C) => $ === t.nil ? C : C === t.nil ? $ : (0, t._)`${D($)} ${I} ${D(C)}`;
    }
    function D(I) {
      return I instanceof t.Name ? I : (0, t._)`(${I})`;
    }
  }(_o)), _o;
}
var se = {}, Ei;
function le() {
  if (Ei) return se;
  Ei = 1, Object.defineProperty(se, "__esModule", { value: !0 }), se.checkStrictMode = se.getErrorPath = se.Type = se.useFunc = se.setEvaluated = se.evaluatedPropsToName = se.mergeEvaluated = se.eachItem = se.unescapeJsonPointer = se.escapeJsonPointer = se.escapeFragment = se.unescapeFragment = se.schemaRefOrVal = se.schemaHasRulesButRef = se.schemaHasRules = se.checkUnknownRules = se.alwaysValidSchema = se.toHash = void 0;
  const e = ie(), t = qn();
  function r(b) {
    const y = {};
    for (const S of b)
      y[S] = !0;
    return y;
  }
  se.toHash = r;
  function n(b, y) {
    return typeof y == "boolean" ? y : Object.keys(y).length === 0 ? !0 : (o(b, y), !s(y, b.self.RULES.all));
  }
  se.alwaysValidSchema = n;
  function o(b, y = b.schema) {
    const { opts: S, self: T } = b;
    if (!S.strictSchema || typeof y == "boolean")
      return;
    const O = T.RULES.keywords;
    for (const F in y)
      O[F] || v(b, `unknown keyword: "${F}"`);
  }
  se.checkUnknownRules = o;
  function s(b, y) {
    if (typeof b == "boolean")
      return !b;
    for (const S in b)
      if (y[S])
        return !0;
    return !1;
  }
  se.schemaHasRules = s;
  function i(b, y) {
    if (typeof b == "boolean")
      return !b;
    for (const S in b)
      if (S !== "$ref" && y.all[S])
        return !0;
    return !1;
  }
  se.schemaHasRulesButRef = i;
  function a({ topSchemaRef: b, schemaPath: y }, S, T, O) {
    if (!O) {
      if (typeof S == "number" || typeof S == "boolean")
        return S;
      if (typeof S == "string")
        return (0, e._)`${S}`;
    }
    return (0, e._)`${b}${y}${(0, e.getProperty)(T)}`;
  }
  se.schemaRefOrVal = a;
  function c(b) {
    return m(decodeURIComponent(b));
  }
  se.unescapeFragment = c;
  function l(b) {
    return encodeURIComponent(d(b));
  }
  se.escapeFragment = l;
  function d(b) {
    return typeof b == "number" ? `${b}` : b.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  se.escapeJsonPointer = d;
  function m(b) {
    return b.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  se.unescapeJsonPointer = m;
  function g(b, y) {
    if (Array.isArray(b))
      for (const S of b)
        y(S);
    else
      y(b);
  }
  se.eachItem = g;
  function w({ mergeNames: b, mergeToName: y, mergeValues: S, resultToName: T }) {
    return (O, F, M, U) => {
      const q = M === void 0 ? F : M instanceof e.Name ? (F instanceof e.Name ? b(O, F, M) : y(O, F, M), M) : F instanceof e.Name ? (y(O, M, F), F) : S(F, M);
      return U === e.Name && !(q instanceof e.Name) ? T(O, q) : q;
    };
  }
  se.mergeEvaluated = {
    props: w({
      mergeNames: (b, y, S) => b.if((0, e._)`${S} !== true && ${y} !== undefined`, () => {
        b.if((0, e._)`${y} === true`, () => b.assign(S, !0), () => b.assign(S, (0, e._)`${S} || {}`).code((0, e._)`Object.assign(${S}, ${y})`));
      }),
      mergeToName: (b, y, S) => b.if((0, e._)`${S} !== true`, () => {
        y === !0 ? b.assign(S, !0) : (b.assign(S, (0, e._)`${S} || {}`), _(b, S, y));
      }),
      mergeValues: (b, y) => b === !0 ? !0 : { ...b, ...y },
      resultToName: k
    }),
    items: w({
      mergeNames: (b, y, S) => b.if((0, e._)`${S} !== true && ${y} !== undefined`, () => b.assign(S, (0, e._)`${y} === true ? true : ${S} > ${y} ? ${S} : ${y}`)),
      mergeToName: (b, y, S) => b.if((0, e._)`${S} !== true`, () => b.assign(S, y === !0 ? !0 : (0, e._)`${S} > ${y} ? ${S} : ${y}`)),
      mergeValues: (b, y) => b === !0 ? !0 : Math.max(b, y),
      resultToName: (b, y) => b.var("items", y)
    })
  };
  function k(b, y) {
    if (y === !0)
      return b.var("props", !0);
    const S = b.var("props", (0, e._)`{}`);
    return y !== void 0 && _(b, S, y), S;
  }
  se.evaluatedPropsToName = k;
  function _(b, y, S) {
    Object.keys(S).forEach((T) => b.assign((0, e._)`${y}${(0, e.getProperty)(T)}`, !0));
  }
  se.setEvaluated = _;
  const h = {};
  function f(b, y) {
    return b.scopeValue("func", {
      ref: y,
      code: h[y.code] || (h[y.code] = new t._Code(y.code))
    });
  }
  se.useFunc = f;
  var u;
  (function(b) {
    b[b.Num = 0] = "Num", b[b.Str = 1] = "Str";
  })(u || (se.Type = u = {}));
  function p(b, y, S) {
    if (b instanceof e.Name) {
      const T = y === u.Num;
      return S ? T ? (0, e._)`"[" + ${b} + "]"` : (0, e._)`"['" + ${b} + "']"` : T ? (0, e._)`"/" + ${b}` : (0, e._)`"/" + ${b}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return S ? (0, e.getProperty)(b).toString() : "/" + d(b);
  }
  se.getErrorPath = p;
  function v(b, y, S = b.opts.strictSchema) {
    if (S) {
      if (y = `strict mode: ${y}`, S === !0)
        throw new Error(y);
      b.self.logger.warn(y);
    }
  }
  return se.checkStrictMode = v, se;
}
var Lr = {}, Ci;
function zt() {
  if (Ci) return Lr;
  Ci = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const e = ie(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return Lr.default = t, Lr;
}
var Ti;
function ro() {
  return Ti || (Ti = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = ie(), r = le(), n = zt();
    e.keywordError = {
      message: ({ keyword: h }) => (0, t.str)`must pass "${h}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: h, schemaType: f }) => f ? (0, t.str)`"${h}" keyword must be ${f} ($data)` : (0, t.str)`"${h}" keyword is invalid ($data)`
    };
    function o(h, f = e.keywordError, u, p) {
      const { it: v } = h, { gen: b, compositeRule: y, allErrors: S } = v, T = m(h, f, u);
      p ?? (y || S) ? c(b, T) : l(v, (0, t._)`[${T}]`);
    }
    e.reportError = o;
    function s(h, f = e.keywordError, u) {
      const { it: p } = h, { gen: v, compositeRule: b, allErrors: y } = p, S = m(h, f, u);
      c(v, S), b || y || l(p, n.default.vErrors);
    }
    e.reportExtraError = s;
    function i(h, f) {
      h.assign(n.default.errors, f), h.if((0, t._)`${n.default.vErrors} !== null`, () => h.if(f, () => h.assign((0, t._)`${n.default.vErrors}.length`, f), () => h.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = i;
    function a({ gen: h, keyword: f, schemaValue: u, data: p, errsCount: v, it: b }) {
      if (v === void 0)
        throw new Error("ajv implementation error");
      const y = h.name("err");
      h.forRange("i", v, n.default.errors, (S) => {
        h.const(y, (0, t._)`${n.default.vErrors}[${S}]`), h.if((0, t._)`${y}.instancePath === undefined`, () => h.assign((0, t._)`${y}.instancePath`, (0, t.strConcat)(n.default.instancePath, b.errorPath))), h.assign((0, t._)`${y}.schemaPath`, (0, t.str)`${b.errSchemaPath}/${f}`), b.opts.verbose && (h.assign((0, t._)`${y}.schema`, u), h.assign((0, t._)`${y}.data`, p));
      });
    }
    e.extendErrors = a;
    function c(h, f) {
      const u = h.const("err", f);
      h.if((0, t._)`${n.default.vErrors} === null`, () => h.assign(n.default.vErrors, (0, t._)`[${u}]`), (0, t._)`${n.default.vErrors}.push(${u})`), h.code((0, t._)`${n.default.errors}++`);
    }
    function l(h, f) {
      const { gen: u, validateName: p, schemaEnv: v } = h;
      v.$async ? u.throw((0, t._)`new ${h.ValidationError}(${f})`) : (u.assign((0, t._)`${p}.errors`, f), u.return(!1));
    }
    const d = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function m(h, f, u) {
      const { createErrors: p } = h.it;
      return p === !1 ? (0, t._)`{}` : g(h, f, u);
    }
    function g(h, f, u = {}) {
      const { gen: p, it: v } = h, b = [
        w(v, u),
        k(h, u)
      ];
      return _(h, f, b), p.object(...b);
    }
    function w({ errorPath: h }, { instancePath: f }) {
      const u = f ? (0, t.str)`${h}${(0, r.getErrorPath)(f, r.Type.Str)}` : h;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, u)];
    }
    function k({ keyword: h, it: { errSchemaPath: f } }, { schemaPath: u, parentSchema: p }) {
      let v = p ? f : (0, t.str)`${f}/${h}`;
      return u && (v = (0, t.str)`${v}${(0, r.getErrorPath)(u, r.Type.Str)}`), [d.schemaPath, v];
    }
    function _(h, { params: f, message: u }, p) {
      const { keyword: v, data: b, schemaValue: y, it: S } = h, { opts: T, propertyName: O, topSchemaRef: F, schemaPath: M } = S;
      p.push([d.keyword, v], [d.params, typeof f == "function" ? f(h) : f || (0, t._)`{}`]), T.messages && p.push([d.message, typeof u == "function" ? u(h) : u]), T.verbose && p.push([d.schema, y], [d.parentSchema, (0, t._)`${F}${M}`], [n.default.data, b]), O && p.push([d.propertyName, O]);
    }
  }(go)), go;
}
var Pi;
function wg() {
  if (Pi) return Mt;
  Pi = 1, Object.defineProperty(Mt, "__esModule", { value: !0 }), Mt.boolOrEmptySchema = Mt.topBoolOrEmptySchema = void 0;
  const e = ro(), t = ie(), r = zt(), n = {
    message: "boolean schema is false"
  };
  function o(a) {
    const { gen: c, schema: l, validateName: d } = a;
    l === !1 ? i(a, !1) : typeof l == "object" && l.$async === !0 ? c.return(r.default.data) : (c.assign((0, t._)`${d}.errors`, null), c.return(!0));
  }
  Mt.topBoolOrEmptySchema = o;
  function s(a, c) {
    const { gen: l, schema: d } = a;
    d === !1 ? (l.var(c, !1), i(a)) : l.var(c, !0);
  }
  Mt.boolOrEmptySchema = s;
  function i(a, c) {
    const { gen: l, data: d } = a, m = {
      gen: l,
      keyword: "false schema",
      data: d,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: a
    };
    (0, e.reportError)(m, n, void 0, c);
  }
  return Mt;
}
var qe = {}, jt = {}, Ai;
function hu() {
  if (Ai) return jt;
  Ai = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.getRules = jt.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function r(o) {
    return typeof o == "string" && t.has(o);
  }
  jt.isJSONType = r;
  function n() {
    const o = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...o, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, o.number, o.string, o.array, o.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return jt.getRules = n, jt;
}
var vt = {}, Ri;
function pu() {
  if (Ri) return vt;
  Ri = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.shouldUseRule = vt.shouldUseGroup = vt.schemaHasRulesForType = void 0;
  function e({ schema: n, self: o }, s) {
    const i = o.RULES.types[s];
    return i && i !== !0 && t(n, i);
  }
  vt.schemaHasRulesForType = e;
  function t(n, o) {
    return o.rules.some((s) => r(n, s));
  }
  vt.shouldUseGroup = t;
  function r(n, o) {
    var s;
    return n[o.keyword] !== void 0 || ((s = o.definition.implements) === null || s === void 0 ? void 0 : s.some((i) => n[i] !== void 0));
  }
  return vt.shouldUseRule = r, vt;
}
var Ii;
function Dn() {
  if (Ii) return qe;
  Ii = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.reportTypeError = qe.checkDataTypes = qe.checkDataType = qe.coerceAndCheckDataType = qe.getJSONTypes = qe.getSchemaTypes = qe.DataType = void 0;
  const e = hu(), t = pu(), r = ro(), n = ie(), o = le();
  var s;
  (function(u) {
    u[u.Correct = 0] = "Correct", u[u.Wrong = 1] = "Wrong";
  })(s || (qe.DataType = s = {}));
  function i(u) {
    const p = a(u.type);
    if (p.includes("null")) {
      if (u.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!p.length && u.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      u.nullable === !0 && p.push("null");
    }
    return p;
  }
  qe.getSchemaTypes = i;
  function a(u) {
    const p = Array.isArray(u) ? u : u ? [u] : [];
    if (p.every(e.isJSONType))
      return p;
    throw new Error("type must be JSONType or JSONType[]: " + p.join(","));
  }
  qe.getJSONTypes = a;
  function c(u, p) {
    const { gen: v, data: b, opts: y } = u, S = d(p, y.coerceTypes), T = p.length > 0 && !(S.length === 0 && p.length === 1 && (0, t.schemaHasRulesForType)(u, p[0]));
    if (T) {
      const O = k(p, b, y.strictNumbers, s.Wrong);
      v.if(O, () => {
        S.length ? m(u, p, S) : h(u);
      });
    }
    return T;
  }
  qe.coerceAndCheckDataType = c;
  const l = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function d(u, p) {
    return p ? u.filter((v) => l.has(v) || p === "array" && v === "array") : [];
  }
  function m(u, p, v) {
    const { gen: b, data: y, opts: S } = u, T = b.let("dataType", (0, n._)`typeof ${y}`), O = b.let("coerced", (0, n._)`undefined`);
    S.coerceTypes === "array" && b.if((0, n._)`${T} == 'object' && Array.isArray(${y}) && ${y}.length == 1`, () => b.assign(y, (0, n._)`${y}[0]`).assign(T, (0, n._)`typeof ${y}`).if(k(p, y, S.strictNumbers), () => b.assign(O, y))), b.if((0, n._)`${O} !== undefined`);
    for (const M of v)
      (l.has(M) || M === "array" && S.coerceTypes === "array") && F(M);
    b.else(), h(u), b.endIf(), b.if((0, n._)`${O} !== undefined`, () => {
      b.assign(y, O), g(u, O);
    });
    function F(M) {
      switch (M) {
        case "string":
          b.elseIf((0, n._)`${T} == "number" || ${T} == "boolean"`).assign(O, (0, n._)`"" + ${y}`).elseIf((0, n._)`${y} === null`).assign(O, (0, n._)`""`);
          return;
        case "number":
          b.elseIf((0, n._)`${T} == "boolean" || ${y} === null
              || (${T} == "string" && ${y} && ${y} == +${y})`).assign(O, (0, n._)`+${y}`);
          return;
        case "integer":
          b.elseIf((0, n._)`${T} === "boolean" || ${y} === null
              || (${T} === "string" && ${y} && ${y} == +${y} && !(${y} % 1))`).assign(O, (0, n._)`+${y}`);
          return;
        case "boolean":
          b.elseIf((0, n._)`${y} === "false" || ${y} === 0 || ${y} === null`).assign(O, !1).elseIf((0, n._)`${y} === "true" || ${y} === 1`).assign(O, !0);
          return;
        case "null":
          b.elseIf((0, n._)`${y} === "" || ${y} === 0 || ${y} === false`), b.assign(O, null);
          return;
        case "array":
          b.elseIf((0, n._)`${T} === "string" || ${T} === "number"
              || ${T} === "boolean" || ${y} === null`).assign(O, (0, n._)`[${y}]`);
      }
    }
  }
  function g({ gen: u, parentData: p, parentDataProperty: v }, b) {
    u.if((0, n._)`${p} !== undefined`, () => u.assign((0, n._)`${p}[${v}]`, b));
  }
  function w(u, p, v, b = s.Correct) {
    const y = b === s.Correct ? n.operators.EQ : n.operators.NEQ;
    let S;
    switch (u) {
      case "null":
        return (0, n._)`${p} ${y} null`;
      case "array":
        S = (0, n._)`Array.isArray(${p})`;
        break;
      case "object":
        S = (0, n._)`${p} && typeof ${p} == "object" && !Array.isArray(${p})`;
        break;
      case "integer":
        S = T((0, n._)`!(${p} % 1) && !isNaN(${p})`);
        break;
      case "number":
        S = T();
        break;
      default:
        return (0, n._)`typeof ${p} ${y} ${u}`;
    }
    return b === s.Correct ? S : (0, n.not)(S);
    function T(O = n.nil) {
      return (0, n.and)((0, n._)`typeof ${p} == "number"`, O, v ? (0, n._)`isFinite(${p})` : n.nil);
    }
  }
  qe.checkDataType = w;
  function k(u, p, v, b) {
    if (u.length === 1)
      return w(u[0], p, v, b);
    let y;
    const S = (0, o.toHash)(u);
    if (S.array && S.object) {
      const T = (0, n._)`typeof ${p} != "object"`;
      y = S.null ? T : (0, n._)`!${p} || ${T}`, delete S.null, delete S.array, delete S.object;
    } else
      y = n.nil;
    S.number && delete S.integer;
    for (const T in S)
      y = (0, n.and)(y, w(T, p, v, b));
    return y;
  }
  qe.checkDataTypes = k;
  const _ = {
    message: ({ schema: u }) => `must be ${u}`,
    params: ({ schema: u, schemaValue: p }) => typeof u == "string" ? (0, n._)`{type: ${u}}` : (0, n._)`{type: ${p}}`
  };
  function h(u) {
    const p = f(u);
    (0, r.reportError)(p, _);
  }
  qe.reportTypeError = h;
  function f(u) {
    const { gen: p, data: v, schema: b } = u, y = (0, o.schemaRefOrVal)(u, b, "type");
    return {
      gen: p,
      keyword: "type",
      data: v,
      schema: b.type,
      schemaCode: y,
      schemaValue: y,
      parentSchema: b,
      params: {},
      it: u
    };
  }
  return qe;
}
var gr = {}, Oi;
function bg() {
  if (Oi) return gr;
  Oi = 1, Object.defineProperty(gr, "__esModule", { value: !0 }), gr.assignDefaults = void 0;
  const e = ie(), t = le();
  function r(o, s) {
    const { properties: i, items: a } = o.schema;
    if (s === "object" && i)
      for (const c in i)
        n(o, c, i[c].default);
    else s === "array" && Array.isArray(a) && a.forEach((c, l) => n(o, l, c.default));
  }
  gr.assignDefaults = r;
  function n(o, s, i) {
    const { gen: a, compositeRule: c, data: l, opts: d } = o;
    if (i === void 0)
      return;
    const m = (0, e._)`${l}${(0, e.getProperty)(s)}`;
    if (c) {
      (0, t.checkStrictMode)(o, `default is ignored for: ${m}`);
      return;
    }
    let g = (0, e._)`${m} === undefined`;
    d.useDefaults === "empty" && (g = (0, e._)`${g} || ${m} === null || ${m} === ""`), a.if(g, (0, e._)`${m} = ${(0, e.stringify)(i)}`);
  }
  return gr;
}
var ht = {}, pe = {}, zi;
function _t() {
  if (zi) return pe;
  zi = 1, Object.defineProperty(pe, "__esModule", { value: !0 }), pe.validateUnion = pe.validateArray = pe.usePattern = pe.callValidateCode = pe.schemaProperties = pe.allSchemaProperties = pe.noPropertyInData = pe.propertyInData = pe.isOwnProperty = pe.hasPropFunc = pe.reportMissingProp = pe.checkMissingProp = pe.checkReportMissingProp = void 0;
  const e = ie(), t = le(), r = zt(), n = le();
  function o(u, p) {
    const { gen: v, data: b, it: y } = u;
    v.if(d(v, b, p, y.opts.ownProperties), () => {
      u.setParams({ missingProperty: (0, e._)`${p}` }, !0), u.error();
    });
  }
  pe.checkReportMissingProp = o;
  function s({ gen: u, data: p, it: { opts: v } }, b, y) {
    return (0, e.or)(...b.map((S) => (0, e.and)(d(u, p, S, v.ownProperties), (0, e._)`${y} = ${S}`)));
  }
  pe.checkMissingProp = s;
  function i(u, p) {
    u.setParams({ missingProperty: p }, !0), u.error();
  }
  pe.reportMissingProp = i;
  function a(u) {
    return u.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  pe.hasPropFunc = a;
  function c(u, p, v) {
    return (0, e._)`${a(u)}.call(${p}, ${v})`;
  }
  pe.isOwnProperty = c;
  function l(u, p, v, b) {
    const y = (0, e._)`${p}${(0, e.getProperty)(v)} !== undefined`;
    return b ? (0, e._)`${y} && ${c(u, p, v)}` : y;
  }
  pe.propertyInData = l;
  function d(u, p, v, b) {
    const y = (0, e._)`${p}${(0, e.getProperty)(v)} === undefined`;
    return b ? (0, e.or)(y, (0, e.not)(c(u, p, v))) : y;
  }
  pe.noPropertyInData = d;
  function m(u) {
    return u ? Object.keys(u).filter((p) => p !== "__proto__") : [];
  }
  pe.allSchemaProperties = m;
  function g(u, p) {
    return m(p).filter((v) => !(0, t.alwaysValidSchema)(u, p[v]));
  }
  pe.schemaProperties = g;
  function w({ schemaCode: u, data: p, it: { gen: v, topSchemaRef: b, schemaPath: y, errorPath: S }, it: T }, O, F, M) {
    const U = M ? (0, e._)`${u}, ${p}, ${b}${y}` : p, q = [
      [r.default.instancePath, (0, e.strConcat)(r.default.instancePath, S)],
      [r.default.parentData, T.parentData],
      [r.default.parentDataProperty, T.parentDataProperty],
      [r.default.rootData, r.default.rootData]
    ];
    T.opts.dynamicRef && q.push([r.default.dynamicAnchors, r.default.dynamicAnchors]);
    const H = (0, e._)`${U}, ${v.object(...q)}`;
    return F !== e.nil ? (0, e._)`${O}.call(${F}, ${H})` : (0, e._)`${O}(${H})`;
  }
  pe.callValidateCode = w;
  const k = (0, e._)`new RegExp`;
  function _({ gen: u, it: { opts: p } }, v) {
    const b = p.unicodeRegExp ? "u" : "", { regExp: y } = p.code, S = y(v, b);
    return u.scopeValue("pattern", {
      key: S.toString(),
      ref: S,
      code: (0, e._)`${y.code === "new RegExp" ? k : (0, n.useFunc)(u, y)}(${v}, ${b})`
    });
  }
  pe.usePattern = _;
  function h(u) {
    const { gen: p, data: v, keyword: b, it: y } = u, S = p.name("valid");
    if (y.allErrors) {
      const O = p.let("valid", !0);
      return T(() => p.assign(O, !1)), O;
    }
    return p.var(S, !0), T(() => p.break()), S;
    function T(O) {
      const F = p.const("len", (0, e._)`${v}.length`);
      p.forRange("i", 0, F, (M) => {
        u.subschema({
          keyword: b,
          dataProp: M,
          dataPropType: t.Type.Num
        }, S), p.if((0, e.not)(S), O);
      });
    }
  }
  pe.validateArray = h;
  function f(u) {
    const { gen: p, schema: v, keyword: b, it: y } = u;
    if (!Array.isArray(v))
      throw new Error("ajv implementation error");
    if (v.some((F) => (0, t.alwaysValidSchema)(y, F)) && !y.opts.unevaluated)
      return;
    const T = p.let("valid", !1), O = p.name("_valid");
    p.block(() => v.forEach((F, M) => {
      const U = u.subschema({
        keyword: b,
        schemaProp: M,
        compositeRule: !0
      }, O);
      p.assign(T, (0, e._)`${T} || ${O}`), u.mergeValidEvaluated(U, O) || p.if((0, e.not)(T));
    })), u.result(T, () => u.reset(), () => u.error(!0));
  }
  return pe.validateUnion = f, pe;
}
var Ni;
function $g() {
  if (Ni) return ht;
  Ni = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.validateKeywordUsage = ht.validSchemaType = ht.funcKeywordCode = ht.macroKeywordCode = void 0;
  const e = ie(), t = zt(), r = _t(), n = ro();
  function o(g, w) {
    const { gen: k, keyword: _, schema: h, parentSchema: f, it: u } = g, p = w.macro.call(u.self, h, f, u), v = l(k, _, p);
    u.opts.validateSchema !== !1 && u.self.validateSchema(p, !0);
    const b = k.name("valid");
    g.subschema({
      schema: p,
      schemaPath: e.nil,
      errSchemaPath: `${u.errSchemaPath}/${_}`,
      topSchemaRef: v,
      compositeRule: !0
    }, b), g.pass(b, () => g.error(!0));
  }
  ht.macroKeywordCode = o;
  function s(g, w) {
    var k;
    const { gen: _, keyword: h, schema: f, parentSchema: u, $data: p, it: v } = g;
    c(v, w);
    const b = !p && w.compile ? w.compile.call(v.self, f, u, v) : w.validate, y = l(_, h, b), S = _.let("valid");
    g.block$data(S, T), g.ok((k = w.valid) !== null && k !== void 0 ? k : S);
    function T() {
      if (w.errors === !1)
        M(), w.modifying && i(g), U(() => g.error());
      else {
        const q = w.async ? O() : F();
        w.modifying && i(g), U(() => a(g, q));
      }
    }
    function O() {
      const q = _.let("ruleErrs", null);
      return _.try(() => M((0, e._)`await `), (H) => _.assign(S, !1).if((0, e._)`${H} instanceof ${v.ValidationError}`, () => _.assign(q, (0, e._)`${H}.errors`), () => _.throw(H))), q;
    }
    function F() {
      const q = (0, e._)`${y}.errors`;
      return _.assign(q, null), M(e.nil), q;
    }
    function M(q = w.async ? (0, e._)`await ` : e.nil) {
      const H = v.opts.passContext ? t.default.this : t.default.self, Y = !("compile" in w && !p || w.schema === !1);
      _.assign(S, (0, e._)`${q}${(0, r.callValidateCode)(g, y, H, Y)}`, w.modifying);
    }
    function U(q) {
      var H;
      _.if((0, e.not)((H = w.valid) !== null && H !== void 0 ? H : S), q);
    }
  }
  ht.funcKeywordCode = s;
  function i(g) {
    const { gen: w, data: k, it: _ } = g;
    w.if(_.parentData, () => w.assign(k, (0, e._)`${_.parentData}[${_.parentDataProperty}]`));
  }
  function a(g, w) {
    const { gen: k } = g;
    k.if((0, e._)`Array.isArray(${w})`, () => {
      k.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${w} : ${t.default.vErrors}.concat(${w})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(g);
    }, () => g.error());
  }
  function c({ schemaEnv: g }, w) {
    if (w.async && !g.$async)
      throw new Error("async keyword in sync schema");
  }
  function l(g, w, k) {
    if (k === void 0)
      throw new Error(`keyword "${w}" failed to compile`);
    return g.scopeValue("keyword", typeof k == "function" ? { ref: k } : { ref: k, code: (0, e.stringify)(k) });
  }
  function d(g, w, k = !1) {
    return !w.length || w.some((_) => _ === "array" ? Array.isArray(g) : _ === "object" ? g && typeof g == "object" && !Array.isArray(g) : typeof g == _ || k && typeof g > "u");
  }
  ht.validSchemaType = d;
  function m({ schema: g, opts: w, self: k, errSchemaPath: _ }, h, f) {
    if (Array.isArray(h.keyword) ? !h.keyword.includes(f) : h.keyword !== f)
      throw new Error("ajv implementation error");
    const u = h.dependencies;
    if (u != null && u.some((p) => !Object.prototype.hasOwnProperty.call(g, p)))
      throw new Error(`parent schema must have dependencies of ${f}: ${u.join(",")}`);
    if (h.validateSchema && !h.validateSchema(g[f])) {
      const v = `keyword "${f}" value is invalid at path "${_}": ` + k.errorsText(h.validateSchema.errors);
      if (w.validateSchema === "log")
        k.logger.error(v);
      else
        throw new Error(v);
    }
  }
  return ht.validateKeywordUsage = m, ht;
}
var wt = {}, Mi;
function Sg() {
  if (Mi) return wt;
  Mi = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.extendSubschemaMode = wt.extendSubschemaData = wt.getSubschema = void 0;
  const e = ie(), t = le();
  function r(s, { keyword: i, schemaProp: a, schema: c, schemaPath: l, errSchemaPath: d, topSchemaRef: m }) {
    if (i !== void 0 && c !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (i !== void 0) {
      const g = s.schema[i];
      return a === void 0 ? {
        schema: g,
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${s.errSchemaPath}/${i}`
      } : {
        schema: g[a],
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(i)}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${s.errSchemaPath}/${i}/${(0, t.escapeFragment)(a)}`
      };
    }
    if (c !== void 0) {
      if (l === void 0 || d === void 0 || m === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: c,
        schemaPath: l,
        topSchemaRef: m,
        errSchemaPath: d
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  wt.getSubschema = r;
  function n(s, i, { dataProp: a, dataPropType: c, data: l, dataTypes: d, propertyName: m }) {
    if (l !== void 0 && a !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: g } = i;
    if (a !== void 0) {
      const { errorPath: k, dataPathArr: _, opts: h } = i, f = g.let("data", (0, e._)`${i.data}${(0, e.getProperty)(a)}`, !0);
      w(f), s.errorPath = (0, e.str)`${k}${(0, t.getErrorPath)(a, c, h.jsPropertySyntax)}`, s.parentDataProperty = (0, e._)`${a}`, s.dataPathArr = [..._, s.parentDataProperty];
    }
    if (l !== void 0) {
      const k = l instanceof e.Name ? l : g.let("data", l, !0);
      w(k), m !== void 0 && (s.propertyName = m);
    }
    d && (s.dataTypes = d);
    function w(k) {
      s.data = k, s.dataLevel = i.dataLevel + 1, s.dataTypes = [], i.definedProperties = /* @__PURE__ */ new Set(), s.parentData = i.data, s.dataNames = [...i.dataNames, k];
    }
  }
  wt.extendSubschemaData = n;
  function o(s, { jtdDiscriminator: i, jtdMetadata: a, compositeRule: c, createErrors: l, allErrors: d }) {
    c !== void 0 && (s.compositeRule = c), l !== void 0 && (s.createErrors = l), d !== void 0 && (s.allErrors = d), s.jtdDiscriminator = i, s.jtdMetadata = a;
  }
  return wt.extendSubschemaMode = o, wt;
}
var We = {}, wo, ji;
function mu() {
  return ji || (ji = 1, wo = function e(t, r) {
    if (t === r) return !0;
    if (t && r && typeof t == "object" && typeof r == "object") {
      if (t.constructor !== r.constructor) return !1;
      var n, o, s;
      if (Array.isArray(t)) {
        if (n = t.length, n != r.length) return !1;
        for (o = n; o-- !== 0; )
          if (!e(t[o], r[o])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
      if (s = Object.keys(t), n = s.length, n !== Object.keys(r).length) return !1;
      for (o = n; o-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(r, s[o])) return !1;
      for (o = n; o-- !== 0; ) {
        var i = s[o];
        if (!e(t[i], r[i])) return !1;
      }
      return !0;
    }
    return t !== t && r !== r;
  }), wo;
}
var bo = { exports: {} }, qi;
function kg() {
  if (qi) return bo.exports;
  qi = 1;
  var e = bo.exports = function(n, o, s) {
    typeof o == "function" && (s = o, o = {}), s = o.cb || s;
    var i = typeof s == "function" ? s : s.pre || function() {
    }, a = s.post || function() {
    };
    t(o, i, a, n, "", n);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(n, o, s, i, a, c, l, d, m, g) {
    if (i && typeof i == "object" && !Array.isArray(i)) {
      o(i, a, c, l, d, m, g);
      for (var w in i) {
        var k = i[w];
        if (Array.isArray(k)) {
          if (w in e.arrayKeywords)
            for (var _ = 0; _ < k.length; _++)
              t(n, o, s, k[_], a + "/" + w + "/" + _, c, a, w, i, _);
        } else if (w in e.propsKeywords) {
          if (k && typeof k == "object")
            for (var h in k)
              t(n, o, s, k[h], a + "/" + w + "/" + r(h), c, a, w, i, h);
        } else (w in e.keywords || n.allKeys && !(w in e.skipKeywords)) && t(n, o, s, k, a + "/" + w, c, a, w, i);
      }
      s(i, a, c, l, d, m, g);
    }
  }
  function r(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return bo.exports;
}
var Di;
function no() {
  if (Di) return We;
  Di = 1, Object.defineProperty(We, "__esModule", { value: !0 }), We.getSchemaRefs = We.resolveUrl = We.normalizeId = We._getFullPath = We.getFullPath = We.inlineRef = void 0;
  const e = le(), t = mu(), r = kg(), n = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function o(_, h = !0) {
    return typeof _ == "boolean" ? !0 : h === !0 ? !i(_) : h ? a(_) <= h : !1;
  }
  We.inlineRef = o;
  const s = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function i(_) {
    for (const h in _) {
      if (s.has(h))
        return !0;
      const f = _[h];
      if (Array.isArray(f) && f.some(i) || typeof f == "object" && i(f))
        return !0;
    }
    return !1;
  }
  function a(_) {
    let h = 0;
    for (const f in _) {
      if (f === "$ref")
        return 1 / 0;
      if (h++, !n.has(f) && (typeof _[f] == "object" && (0, e.eachItem)(_[f], (u) => h += a(u)), h === 1 / 0))
        return 1 / 0;
    }
    return h;
  }
  function c(_, h = "", f) {
    f !== !1 && (h = m(h));
    const u = _.parse(h);
    return l(_, u);
  }
  We.getFullPath = c;
  function l(_, h) {
    return _.serialize(h).split("#")[0] + "#";
  }
  We._getFullPath = l;
  const d = /#\/?$/;
  function m(_) {
    return _ ? _.replace(d, "") : "";
  }
  We.normalizeId = m;
  function g(_, h, f) {
    return f = m(f), _.resolve(h, f);
  }
  We.resolveUrl = g;
  const w = /^[a-z_][-a-z0-9._]*$/i;
  function k(_, h) {
    if (typeof _ == "boolean")
      return {};
    const { schemaId: f, uriResolver: u } = this.opts, p = m(_[f] || h), v = { "": p }, b = c(u, p, !1), y = {}, S = /* @__PURE__ */ new Set();
    return r(_, { allKeys: !0 }, (F, M, U, q) => {
      if (q === void 0)
        return;
      const H = b + M;
      let Y = v[q];
      typeof F[f] == "string" && (Y = ke.call(this, F[f])), Te.call(this, F.$anchor), Te.call(this, F.$dynamicAnchor), v[M] = Y;
      function ke(oe) {
        const Ve = this.opts.uriResolver.resolve;
        if (oe = m(Y ? Ve(Y, oe) : oe), S.has(oe))
          throw O(oe);
        S.add(oe);
        let L = this.refs[oe];
        return typeof L == "string" && (L = this.refs[L]), typeof L == "object" ? T(F, L.schema, oe) : oe !== m(H) && (oe[0] === "#" ? (T(F, y[oe], oe), y[oe] = F) : this.refs[oe] = H), oe;
      }
      function Te(oe) {
        if (typeof oe == "string") {
          if (!w.test(oe))
            throw new Error(`invalid anchor "${oe}"`);
          ke.call(this, `#${oe}`);
        }
      }
    }), y;
    function T(F, M, U) {
      if (M !== void 0 && !t(F, M))
        throw O(U);
    }
    function O(F) {
      return new Error(`reference "${F}" resolves to more than one schema`);
    }
  }
  return We.getSchemaRefs = k, We;
}
var xi;
function oo() {
  if (xi) return yt;
  xi = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.getData = yt.KeywordCxt = yt.validateFunctionCode = void 0;
  const e = wg(), t = Dn(), r = pu(), n = Dn(), o = bg(), s = $g(), i = Sg(), a = ie(), c = zt(), l = no(), d = le(), m = ro();
  function g(P) {
    if (b(P) && (S(P), v(P))) {
      h(P);
      return;
    }
    w(P, () => (0, e.topBoolOrEmptySchema)(P));
  }
  yt.validateFunctionCode = g;
  function w({ gen: P, validateName: R, schema: j, schemaEnv: Z, opts: Q }, ae) {
    Q.code.es5 ? P.func(R, (0, a._)`${c.default.data}, ${c.default.valCxt}`, Z.$async, () => {
      P.code((0, a._)`"use strict"; ${u(j, Q)}`), _(P, Q), P.code(ae);
    }) : P.func(R, (0, a._)`${c.default.data}, ${k(Q)}`, Z.$async, () => P.code(u(j, Q)).code(ae));
  }
  function k(P) {
    return (0, a._)`{${c.default.instancePath}="", ${c.default.parentData}, ${c.default.parentDataProperty}, ${c.default.rootData}=${c.default.data}${P.dynamicRef ? (0, a._)`, ${c.default.dynamicAnchors}={}` : a.nil}}={}`;
  }
  function _(P, R) {
    P.if(c.default.valCxt, () => {
      P.var(c.default.instancePath, (0, a._)`${c.default.valCxt}.${c.default.instancePath}`), P.var(c.default.parentData, (0, a._)`${c.default.valCxt}.${c.default.parentData}`), P.var(c.default.parentDataProperty, (0, a._)`${c.default.valCxt}.${c.default.parentDataProperty}`), P.var(c.default.rootData, (0, a._)`${c.default.valCxt}.${c.default.rootData}`), R.dynamicRef && P.var(c.default.dynamicAnchors, (0, a._)`${c.default.valCxt}.${c.default.dynamicAnchors}`);
    }, () => {
      P.var(c.default.instancePath, (0, a._)`""`), P.var(c.default.parentData, (0, a._)`undefined`), P.var(c.default.parentDataProperty, (0, a._)`undefined`), P.var(c.default.rootData, c.default.data), R.dynamicRef && P.var(c.default.dynamicAnchors, (0, a._)`{}`);
    });
  }
  function h(P) {
    const { schema: R, opts: j, gen: Z } = P;
    w(P, () => {
      j.$comment && R.$comment && q(P), F(P), Z.let(c.default.vErrors, null), Z.let(c.default.errors, 0), j.unevaluated && f(P), T(P), H(P);
    });
  }
  function f(P) {
    const { gen: R, validateName: j } = P;
    P.evaluated = R.const("evaluated", (0, a._)`${j}.evaluated`), R.if((0, a._)`${P.evaluated}.dynamicProps`, () => R.assign((0, a._)`${P.evaluated}.props`, (0, a._)`undefined`)), R.if((0, a._)`${P.evaluated}.dynamicItems`, () => R.assign((0, a._)`${P.evaluated}.items`, (0, a._)`undefined`));
  }
  function u(P, R) {
    const j = typeof P == "object" && P[R.schemaId];
    return j && (R.code.source || R.code.process) ? (0, a._)`/*# sourceURL=${j} */` : a.nil;
  }
  function p(P, R) {
    if (b(P) && (S(P), v(P))) {
      y(P, R);
      return;
    }
    (0, e.boolOrEmptySchema)(P, R);
  }
  function v({ schema: P, self: R }) {
    if (typeof P == "boolean")
      return !P;
    for (const j in P)
      if (R.RULES.all[j])
        return !0;
    return !1;
  }
  function b(P) {
    return typeof P.schema != "boolean";
  }
  function y(P, R) {
    const { schema: j, gen: Z, opts: Q } = P;
    Q.$comment && j.$comment && q(P), M(P), U(P);
    const ae = Z.const("_errs", c.default.errors);
    T(P, ae), Z.var(R, (0, a._)`${ae} === ${c.default.errors}`);
  }
  function S(P) {
    (0, d.checkUnknownRules)(P), O(P);
  }
  function T(P, R) {
    if (P.opts.jtd)
      return ke(P, [], !1, R);
    const j = (0, t.getSchemaTypes)(P.schema), Z = (0, t.coerceAndCheckDataType)(P, j);
    ke(P, j, !Z, R);
  }
  function O(P) {
    const { schema: R, errSchemaPath: j, opts: Z, self: Q } = P;
    R.$ref && Z.ignoreKeywordsWithRef && (0, d.schemaHasRulesButRef)(R, Q.RULES) && Q.logger.warn(`$ref: keywords ignored in schema at path "${j}"`);
  }
  function F(P) {
    const { schema: R, opts: j } = P;
    R.default !== void 0 && j.useDefaults && j.strictSchema && (0, d.checkStrictMode)(P, "default is ignored in the schema root");
  }
  function M(P) {
    const R = P.schema[P.opts.schemaId];
    R && (P.baseId = (0, l.resolveUrl)(P.opts.uriResolver, P.baseId, R));
  }
  function U(P) {
    if (P.schema.$async && !P.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function q({ gen: P, schemaEnv: R, schema: j, errSchemaPath: Z, opts: Q }) {
    const ae = j.$comment;
    if (Q.$comment === !0)
      P.code((0, a._)`${c.default.self}.logger.log(${ae})`);
    else if (typeof Q.$comment == "function") {
      const Me = (0, a.str)`${Z}/$comment`, ft = P.scopeValue("root", { ref: R.root });
      P.code((0, a._)`${c.default.self}.opts.$comment(${ae}, ${Me}, ${ft}.schema)`);
    }
  }
  function H(P) {
    const { gen: R, schemaEnv: j, validateName: Z, ValidationError: Q, opts: ae } = P;
    j.$async ? R.if((0, a._)`${c.default.errors} === 0`, () => R.return(c.default.data), () => R.throw((0, a._)`new ${Q}(${c.default.vErrors})`)) : (R.assign((0, a._)`${Z}.errors`, c.default.vErrors), ae.unevaluated && Y(P), R.return((0, a._)`${c.default.errors} === 0`));
  }
  function Y({ gen: P, evaluated: R, props: j, items: Z }) {
    j instanceof a.Name && P.assign((0, a._)`${R}.props`, j), Z instanceof a.Name && P.assign((0, a._)`${R}.items`, Z);
  }
  function ke(P, R, j, Z) {
    const { gen: Q, schema: ae, data: Me, allErrors: ft, opts: Qe, self: Xe } = P, { RULES: je } = Xe;
    if (ae.$ref && (Qe.ignoreKeywordsWithRef || !(0, d.schemaHasRulesButRef)(ae, je))) {
      Q.block(() => B(P, "$ref", je.all.$ref.definition));
      return;
    }
    Qe.jtd || oe(P, R), Q.block(() => {
      for (const it of je.rules)
        Kt(it);
      Kt(je.post);
    });
    function Kt(it) {
      (0, r.shouldUseGroup)(ae, it) && (it.type ? (Q.if((0, n.checkDataType)(it.type, Me, Qe.strictNumbers)), Te(P, it), R.length === 1 && R[0] === it.type && j && (Q.else(), (0, n.reportTypeError)(P)), Q.endIf()) : Te(P, it), ft || Q.if((0, a._)`${c.default.errors} === ${Z || 0}`));
    }
  }
  function Te(P, R) {
    const { gen: j, schema: Z, opts: { useDefaults: Q } } = P;
    Q && (0, o.assignDefaults)(P, R.type), j.block(() => {
      for (const ae of R.rules)
        (0, r.shouldUseRule)(Z, ae) && B(P, ae.keyword, ae.definition, R.type);
    });
  }
  function oe(P, R) {
    P.schemaEnv.meta || !P.opts.strictTypes || (Ve(P, R), P.opts.allowUnionTypes || L(P, R), A(P, P.dataTypes));
  }
  function Ve(P, R) {
    if (R.length) {
      if (!P.dataTypes.length) {
        P.dataTypes = R;
        return;
      }
      R.forEach((j) => {
        I(P.dataTypes, j) || C(P, `type "${j}" not allowed by context "${P.dataTypes.join(",")}"`);
      }), $(P, R);
    }
  }
  function L(P, R) {
    R.length > 1 && !(R.length === 2 && R.includes("null")) && C(P, "use allowUnionTypes to allow union type keyword");
  }
  function A(P, R) {
    const j = P.self.RULES.all;
    for (const Z in j) {
      const Q = j[Z];
      if (typeof Q == "object" && (0, r.shouldUseRule)(P.schema, Q)) {
        const { type: ae } = Q.definition;
        ae.length && !ae.some((Me) => D(R, Me)) && C(P, `missing type "${ae.join(",")}" for keyword "${Z}"`);
      }
    }
  }
  function D(P, R) {
    return P.includes(R) || R === "number" && P.includes("integer");
  }
  function I(P, R) {
    return P.includes(R) || R === "integer" && P.includes("number");
  }
  function $(P, R) {
    const j = [];
    for (const Z of P.dataTypes)
      I(R, Z) ? j.push(Z) : R.includes("integer") && Z === "number" && j.push("integer");
    P.dataTypes = j;
  }
  function C(P, R) {
    const j = P.schemaEnv.baseId + P.errSchemaPath;
    R += ` at "${j}" (strictTypes)`, (0, d.checkStrictMode)(P, R, P.opts.strictTypes);
  }
  class N {
    constructor(R, j, Z) {
      if ((0, s.validateKeywordUsage)(R, j, Z), this.gen = R.gen, this.allErrors = R.allErrors, this.keyword = Z, this.data = R.data, this.schema = R.schema[Z], this.$data = j.$data && R.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, d.schemaRefOrVal)(R, this.schema, Z, this.$data), this.schemaType = j.schemaType, this.parentSchema = R.schema, this.params = {}, this.it = R, this.def = j, this.$data)
        this.schemaCode = R.gen.const("vSchema", ue(this.$data, R));
      else if (this.schemaCode = this.schemaValue, !(0, s.validSchemaType)(this.schema, j.schemaType, j.allowUndefined))
        throw new Error(`${Z} value must be ${JSON.stringify(j.schemaType)}`);
      ("code" in j ? j.trackErrors : j.errors !== !1) && (this.errsCount = R.gen.const("_errs", c.default.errors));
    }
    result(R, j, Z) {
      this.failResult((0, a.not)(R), j, Z);
    }
    failResult(R, j, Z) {
      this.gen.if(R), Z ? Z() : this.error(), j ? (this.gen.else(), j(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(R, j) {
      this.failResult((0, a.not)(R), void 0, j);
    }
    fail(R) {
      if (R === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(R), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(R) {
      if (!this.$data)
        return this.fail(R);
      const { schemaCode: j } = this;
      this.fail((0, a._)`${j} !== undefined && (${(0, a.or)(this.invalid$data(), R)})`);
    }
    error(R, j, Z) {
      if (j) {
        this.setParams(j), this._error(R, Z), this.setParams({});
        return;
      }
      this._error(R, Z);
    }
    _error(R, j) {
      (R ? m.reportExtraError : m.reportError)(this, this.def.error, j);
    }
    $dataError() {
      (0, m.reportError)(this, this.def.$dataError || m.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, m.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(R) {
      this.allErrors || this.gen.if(R);
    }
    setParams(R, j) {
      j ? Object.assign(this.params, R) : this.params = R;
    }
    block$data(R, j, Z = a.nil) {
      this.gen.block(() => {
        this.check$data(R, Z), j();
      });
    }
    check$data(R = a.nil, j = a.nil) {
      if (!this.$data)
        return;
      const { gen: Z, schemaCode: Q, schemaType: ae, def: Me } = this;
      Z.if((0, a.or)((0, a._)`${Q} === undefined`, j)), R !== a.nil && Z.assign(R, !0), (ae.length || Me.validateSchema) && (Z.elseIf(this.invalid$data()), this.$dataError(), R !== a.nil && Z.assign(R, !1)), Z.else();
    }
    invalid$data() {
      const { gen: R, schemaCode: j, schemaType: Z, def: Q, it: ae } = this;
      return (0, a.or)(Me(), ft());
      function Me() {
        if (Z.length) {
          if (!(j instanceof a.Name))
            throw new Error("ajv implementation error");
          const Qe = Array.isArray(Z) ? Z : [Z];
          return (0, a._)`${(0, n.checkDataTypes)(Qe, j, ae.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return a.nil;
      }
      function ft() {
        if (Q.validateSchema) {
          const Qe = R.scopeValue("validate$data", { ref: Q.validateSchema });
          return (0, a._)`!${Qe}(${j})`;
        }
        return a.nil;
      }
    }
    subschema(R, j) {
      const Z = (0, i.getSubschema)(this.it, R);
      (0, i.extendSubschemaData)(Z, this.it, R), (0, i.extendSubschemaMode)(Z, R);
      const Q = { ...this.it, ...Z, items: void 0, props: void 0 };
      return p(Q, j), Q;
    }
    mergeEvaluated(R, j) {
      const { it: Z, gen: Q } = this;
      Z.opts.unevaluated && (Z.props !== !0 && R.props !== void 0 && (Z.props = d.mergeEvaluated.props(Q, R.props, Z.props, j)), Z.items !== !0 && R.items !== void 0 && (Z.items = d.mergeEvaluated.items(Q, R.items, Z.items, j)));
    }
    mergeValidEvaluated(R, j) {
      const { it: Z, gen: Q } = this;
      if (Z.opts.unevaluated && (Z.props !== !0 || Z.items !== !0))
        return Q.if(j, () => this.mergeEvaluated(R, a.Name)), !0;
    }
  }
  yt.KeywordCxt = N;
  function B(P, R, j, Z) {
    const Q = new N(P, j, R);
    "code" in j ? j.code(Q, Z) : Q.$data && j.validate ? (0, s.funcKeywordCode)(Q, j) : "macro" in j ? (0, s.macroKeywordCode)(Q, j) : (j.compile || j.validate) && (0, s.funcKeywordCode)(Q, j);
  }
  const X = /^\/(?:[^~]|~0|~1)*$/, de = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function ue(P, { dataLevel: R, dataNames: j, dataPathArr: Z }) {
    let Q, ae;
    if (P === "")
      return c.default.rootData;
    if (P[0] === "/") {
      if (!X.test(P))
        throw new Error(`Invalid JSON-pointer: ${P}`);
      Q = P, ae = c.default.rootData;
    } else {
      const Xe = de.exec(P);
      if (!Xe)
        throw new Error(`Invalid JSON-pointer: ${P}`);
      const je = +Xe[1];
      if (Q = Xe[2], Q === "#") {
        if (je >= R)
          throw new Error(Qe("property/index", je));
        return Z[R - je];
      }
      if (je > R)
        throw new Error(Qe("data", je));
      if (ae = j[R - je], !Q)
        return ae;
    }
    let Me = ae;
    const ft = Q.split("/");
    for (const Xe of ft)
      Xe && (ae = (0, a._)`${ae}${(0, a.getProperty)((0, d.unescapeJsonPointer)(Xe))}`, Me = (0, a._)`${Me} && ${ae}`);
    return Me;
    function Qe(Xe, je) {
      return `Cannot access ${Xe} ${je} levels up, current level is ${R}`;
    }
  }
  return yt.getData = ue, yt;
}
var Zr = {}, Ui;
function Ds() {
  if (Ui) return Zr;
  Ui = 1, Object.defineProperty(Zr, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return Zr.default = e, Zr;
}
var Vr = {}, Fi;
function so() {
  if (Fi) return Vr;
  Fi = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  const e = no();
  class t extends Error {
    constructor(n, o, s, i) {
      super(i || `can't resolve reference ${s} from id ${o}`), this.missingRef = (0, e.resolveUrl)(n, o, s), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return Vr.default = t, Vr;
}
var rt = {}, Li;
function xs() {
  if (Li) return rt;
  Li = 1, Object.defineProperty(rt, "__esModule", { value: !0 }), rt.resolveSchema = rt.getCompilingSchema = rt.resolveRef = rt.compileSchema = rt.SchemaEnv = void 0;
  const e = ie(), t = Ds(), r = zt(), n = no(), o = le(), s = oo();
  class i {
    constructor(f) {
      var u;
      this.refs = {}, this.dynamicAnchors = {};
      let p;
      typeof f.schema == "object" && (p = f.schema), this.schema = f.schema, this.schemaId = f.schemaId, this.root = f.root || this, this.baseId = (u = f.baseId) !== null && u !== void 0 ? u : (0, n.normalizeId)(p == null ? void 0 : p[f.schemaId || "$id"]), this.schemaPath = f.schemaPath, this.localRefs = f.localRefs, this.meta = f.meta, this.$async = p == null ? void 0 : p.$async, this.refs = {};
    }
  }
  rt.SchemaEnv = i;
  function a(h) {
    const f = d.call(this, h);
    if (f)
      return f;
    const u = (0, n.getFullPath)(this.opts.uriResolver, h.root.baseId), { es5: p, lines: v } = this.opts.code, { ownProperties: b } = this.opts, y = new e.CodeGen(this.scope, { es5: p, lines: v, ownProperties: b });
    let S;
    h.$async && (S = y.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const T = y.scopeName("validate");
    h.validateName = T;
    const O = {
      gen: y,
      allErrors: this.opts.allErrors,
      data: r.default.data,
      parentData: r.default.parentData,
      parentDataProperty: r.default.parentDataProperty,
      dataNames: [r.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: y.scopeValue("schema", this.opts.code.source === !0 ? { ref: h.schema, code: (0, e.stringify)(h.schema) } : { ref: h.schema }),
      validateName: T,
      ValidationError: S,
      schema: h.schema,
      schemaEnv: h,
      rootId: u,
      baseId: h.baseId || u,
      schemaPath: e.nil,
      errSchemaPath: h.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let F;
    try {
      this._compilations.add(h), (0, s.validateFunctionCode)(O), y.optimize(this.opts.code.optimize);
      const M = y.toString();
      F = `${y.scopeRefs(r.default.scope)}return ${M}`, this.opts.code.process && (F = this.opts.code.process(F, h));
      const q = new Function(`${r.default.self}`, `${r.default.scope}`, F)(this, this.scope.get());
      if (this.scope.value(T, { ref: q }), q.errors = null, q.schema = h.schema, q.schemaEnv = h, h.$async && (q.$async = !0), this.opts.code.source === !0 && (q.source = { validateName: T, validateCode: M, scopeValues: y._values }), this.opts.unevaluated) {
        const { props: H, items: Y } = O;
        q.evaluated = {
          props: H instanceof e.Name ? void 0 : H,
          items: Y instanceof e.Name ? void 0 : Y,
          dynamicProps: H instanceof e.Name,
          dynamicItems: Y instanceof e.Name
        }, q.source && (q.source.evaluated = (0, e.stringify)(q.evaluated));
      }
      return h.validate = q, h;
    } catch (M) {
      throw delete h.validate, delete h.validateName, F && this.logger.error("Error compiling schema, function code:", F), M;
    } finally {
      this._compilations.delete(h);
    }
  }
  rt.compileSchema = a;
  function c(h, f, u) {
    var p;
    u = (0, n.resolveUrl)(this.opts.uriResolver, f, u);
    const v = h.refs[u];
    if (v)
      return v;
    let b = g.call(this, h, u);
    if (b === void 0) {
      const y = (p = h.localRefs) === null || p === void 0 ? void 0 : p[u], { schemaId: S } = this.opts;
      y && (b = new i({ schema: y, schemaId: S, root: h, baseId: f }));
    }
    if (b !== void 0)
      return h.refs[u] = l.call(this, b);
  }
  rt.resolveRef = c;
  function l(h) {
    return (0, n.inlineRef)(h.schema, this.opts.inlineRefs) ? h.schema : h.validate ? h : a.call(this, h);
  }
  function d(h) {
    for (const f of this._compilations)
      if (m(f, h))
        return f;
  }
  rt.getCompilingSchema = d;
  function m(h, f) {
    return h.schema === f.schema && h.root === f.root && h.baseId === f.baseId;
  }
  function g(h, f) {
    let u;
    for (; typeof (u = this.refs[f]) == "string"; )
      f = u;
    return u || this.schemas[f] || w.call(this, h, f);
  }
  function w(h, f) {
    const u = this.opts.uriResolver.parse(f), p = (0, n._getFullPath)(this.opts.uriResolver, u);
    let v = (0, n.getFullPath)(this.opts.uriResolver, h.baseId, void 0);
    if (Object.keys(h.schema).length > 0 && p === v)
      return _.call(this, u, h);
    const b = (0, n.normalizeId)(p), y = this.refs[b] || this.schemas[b];
    if (typeof y == "string") {
      const S = w.call(this, h, y);
      return typeof (S == null ? void 0 : S.schema) != "object" ? void 0 : _.call(this, u, S);
    }
    if (typeof (y == null ? void 0 : y.schema) == "object") {
      if (y.validate || a.call(this, y), b === (0, n.normalizeId)(f)) {
        const { schema: S } = y, { schemaId: T } = this.opts, O = S[T];
        return O && (v = (0, n.resolveUrl)(this.opts.uriResolver, v, O)), new i({ schema: S, schemaId: T, root: h, baseId: v });
      }
      return _.call(this, u, y);
    }
  }
  rt.resolveSchema = w;
  const k = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function _(h, { baseId: f, schema: u, root: p }) {
    var v;
    if (((v = h.fragment) === null || v === void 0 ? void 0 : v[0]) !== "/")
      return;
    for (const S of h.fragment.slice(1).split("/")) {
      if (typeof u == "boolean")
        return;
      const T = u[(0, o.unescapeFragment)(S)];
      if (T === void 0)
        return;
      u = T;
      const O = typeof u == "object" && u[this.opts.schemaId];
      !k.has(S) && O && (f = (0, n.resolveUrl)(this.opts.uriResolver, f, O));
    }
    let b;
    if (typeof u != "boolean" && u.$ref && !(0, o.schemaHasRulesButRef)(u, this.RULES)) {
      const S = (0, n.resolveUrl)(this.opts.uriResolver, f, u.$ref);
      b = w.call(this, p, S);
    }
    const { schemaId: y } = this.opts;
    if (b = b || new i({ schema: u, schemaId: y, root: p, baseId: f }), b.schema !== b.root.schema)
      return b;
  }
  return rt;
}
const Eg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Cg = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Tg = "object", Pg = ["$data"], Ag = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Rg = !1, Ig = {
  $id: Eg,
  description: Cg,
  type: Tg,
  required: Pg,
  properties: Ag,
  additionalProperties: Rg
};
var Hr = {}, _r = { exports: {} }, $o, Zi;
function Og() {
  return Zi || (Zi = 1, $o = {
    HEX: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      a: 10,
      A: 10,
      b: 11,
      B: 11,
      c: 12,
      C: 12,
      d: 13,
      D: 13,
      e: 14,
      E: 14,
      f: 15,
      F: 15
    }
  }), $o;
}
var So, Vi;
function zg() {
  if (Vi) return So;
  Vi = 1;
  const { HEX: e } = Og(), t = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
  function r(_) {
    if (a(_, ".") < 3)
      return { host: _, isIPV4: !1 };
    const h = _.match(t) || [], [f] = h;
    return f ? { host: i(f, "."), isIPV4: !0 } : { host: _, isIPV4: !1 };
  }
  function n(_, h = !1) {
    let f = "", u = !0;
    for (const p of _) {
      if (e[p] === void 0) return;
      p !== "0" && u === !0 && (u = !1), u || (f += p);
    }
    return h && f.length === 0 && (f = "0"), f;
  }
  function o(_) {
    let h = 0;
    const f = { error: !1, address: "", zone: "" }, u = [], p = [];
    let v = !1, b = !1, y = !1;
    function S() {
      if (p.length) {
        if (v === !1) {
          const T = n(p);
          if (T !== void 0)
            u.push(T);
          else
            return f.error = !0, !1;
        }
        p.length = 0;
      }
      return !0;
    }
    for (let T = 0; T < _.length; T++) {
      const O = _[T];
      if (!(O === "[" || O === "]"))
        if (O === ":") {
          if (b === !0 && (y = !0), !S())
            break;
          if (h++, u.push(":"), h > 7) {
            f.error = !0;
            break;
          }
          T - 1 >= 0 && _[T - 1] === ":" && (b = !0);
          continue;
        } else if (O === "%") {
          if (!S())
            break;
          v = !0;
        } else {
          p.push(O);
          continue;
        }
    }
    return p.length && (v ? f.zone = p.join("") : y ? u.push(p.join("")) : u.push(n(p))), f.address = u.join(""), f;
  }
  function s(_) {
    if (a(_, ":") < 2)
      return { host: _, isIPV6: !1 };
    const h = o(_);
    if (h.error)
      return { host: _, isIPV6: !1 };
    {
      let f = h.address, u = h.address;
      return h.zone && (f += "%" + h.zone, u += "%25" + h.zone), { host: f, escapedHost: u, isIPV6: !0 };
    }
  }
  function i(_, h) {
    let f = "", u = !0;
    const p = _.length;
    for (let v = 0; v < p; v++) {
      const b = _[v];
      b === "0" && u ? (v + 1 <= p && _[v + 1] === h || v + 1 === p) && (f += b, u = !1) : (b === h ? u = !0 : u = !1, f += b);
    }
    return f;
  }
  function a(_, h) {
    let f = 0;
    for (let u = 0; u < _.length; u++)
      _[u] === h && f++;
    return f;
  }
  const c = /^\.\.?\//u, l = /^\/\.(?:\/|$)/u, d = /^\/\.\.(?:\/|$)/u, m = /^\/?(?:.|\n)*?(?=\/|$)/u;
  function g(_) {
    const h = [];
    for (; _.length; )
      if (_.match(c))
        _ = _.replace(c, "");
      else if (_.match(l))
        _ = _.replace(l, "/");
      else if (_.match(d))
        _ = _.replace(d, "/"), h.pop();
      else if (_ === "." || _ === "..")
        _ = "";
      else {
        const f = _.match(m);
        if (f) {
          const u = f[0];
          _ = _.slice(u.length), h.push(u);
        } else
          throw new Error("Unexpected dot segment condition");
      }
    return h.join("");
  }
  function w(_, h) {
    const f = h !== !0 ? escape : unescape;
    return _.scheme !== void 0 && (_.scheme = f(_.scheme)), _.userinfo !== void 0 && (_.userinfo = f(_.userinfo)), _.host !== void 0 && (_.host = f(_.host)), _.path !== void 0 && (_.path = f(_.path)), _.query !== void 0 && (_.query = f(_.query)), _.fragment !== void 0 && (_.fragment = f(_.fragment)), _;
  }
  function k(_) {
    const h = [];
    if (_.userinfo !== void 0 && (h.push(_.userinfo), h.push("@")), _.host !== void 0) {
      let f = unescape(_.host);
      const u = r(f);
      if (u.isIPV4)
        f = u.host;
      else {
        const p = s(u.host);
        p.isIPV6 === !0 ? f = `[${p.escapedHost}]` : f = _.host;
      }
      h.push(f);
    }
    return (typeof _.port == "number" || typeof _.port == "string") && (h.push(":"), h.push(String(_.port))), h.length ? h.join("") : void 0;
  }
  return So = {
    recomposeAuthority: k,
    normalizeComponentEncoding: w,
    removeDotSegments: g,
    normalizeIPv4: r,
    normalizeIPv6: s,
    stringArrayToHexStripped: n
  }, So;
}
var ko, Hi;
function Ng() {
  if (Hi) return ko;
  Hi = 1;
  const e = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
  function r(u) {
    return typeof u.secure == "boolean" ? u.secure : String(u.scheme).toLowerCase() === "wss";
  }
  function n(u) {
    return u.host || (u.error = u.error || "HTTP URIs must have a host."), u;
  }
  function o(u) {
    const p = String(u.scheme).toLowerCase() === "https";
    return (u.port === (p ? 443 : 80) || u.port === "") && (u.port = void 0), u.path || (u.path = "/"), u;
  }
  function s(u) {
    return u.secure = r(u), u.resourceName = (u.path || "/") + (u.query ? "?" + u.query : ""), u.path = void 0, u.query = void 0, u;
  }
  function i(u) {
    if ((u.port === (r(u) ? 443 : 80) || u.port === "") && (u.port = void 0), typeof u.secure == "boolean" && (u.scheme = u.secure ? "wss" : "ws", u.secure = void 0), u.resourceName) {
      const [p, v] = u.resourceName.split("?");
      u.path = p && p !== "/" ? p : void 0, u.query = v, u.resourceName = void 0;
    }
    return u.fragment = void 0, u;
  }
  function a(u, p) {
    if (!u.path)
      return u.error = "URN can not be parsed", u;
    const v = u.path.match(t);
    if (v) {
      const b = p.scheme || u.scheme || "urn";
      u.nid = v[1].toLowerCase(), u.nss = v[2];
      const y = `${b}:${p.nid || u.nid}`, S = f[y];
      u.path = void 0, S && (u = S.parse(u, p));
    } else
      u.error = u.error || "URN can not be parsed.";
    return u;
  }
  function c(u, p) {
    const v = p.scheme || u.scheme || "urn", b = u.nid.toLowerCase(), y = `${v}:${p.nid || b}`, S = f[y];
    S && (u = S.serialize(u, p));
    const T = u, O = u.nss;
    return T.path = `${b || p.nid}:${O}`, p.skipEscape = !0, T;
  }
  function l(u, p) {
    const v = u;
    return v.uuid = v.nss, v.nss = void 0, !p.tolerant && (!v.uuid || !e.test(v.uuid)) && (v.error = v.error || "UUID is not valid."), v;
  }
  function d(u) {
    const p = u;
    return p.nss = (u.uuid || "").toLowerCase(), p;
  }
  const m = {
    scheme: "http",
    domainHost: !0,
    parse: n,
    serialize: o
  }, g = {
    scheme: "https",
    domainHost: m.domainHost,
    parse: n,
    serialize: o
  }, w = {
    scheme: "ws",
    domainHost: !0,
    parse: s,
    serialize: i
  }, k = {
    scheme: "wss",
    domainHost: w.domainHost,
    parse: w.parse,
    serialize: w.serialize
  }, f = {
    http: m,
    https: g,
    ws: w,
    wss: k,
    urn: {
      scheme: "urn",
      parse: a,
      serialize: c,
      skipNormalize: !0
    },
    "urn:uuid": {
      scheme: "urn:uuid",
      parse: l,
      serialize: d,
      skipNormalize: !0
    }
  };
  return ko = f, ko;
}
var Wi;
function Mg() {
  if (Wi) return _r.exports;
  Wi = 1;
  const { normalizeIPv6: e, normalizeIPv4: t, removeDotSegments: r, recomposeAuthority: n, normalizeComponentEncoding: o } = zg(), s = Ng();
  function i(h, f) {
    return typeof h == "string" ? h = d(k(h, f), f) : typeof h == "object" && (h = k(d(h, f), f)), h;
  }
  function a(h, f, u) {
    const p = Object.assign({ scheme: "null" }, u), v = c(k(h, p), k(f, p), p, !0);
    return d(v, { ...p, skipEscape: !0 });
  }
  function c(h, f, u, p) {
    const v = {};
    return p || (h = k(d(h, u), u), f = k(d(f, u), u)), u = u || {}, !u.tolerant && f.scheme ? (v.scheme = f.scheme, v.userinfo = f.userinfo, v.host = f.host, v.port = f.port, v.path = r(f.path || ""), v.query = f.query) : (f.userinfo !== void 0 || f.host !== void 0 || f.port !== void 0 ? (v.userinfo = f.userinfo, v.host = f.host, v.port = f.port, v.path = r(f.path || ""), v.query = f.query) : (f.path ? (f.path.charAt(0) === "/" ? v.path = r(f.path) : ((h.userinfo !== void 0 || h.host !== void 0 || h.port !== void 0) && !h.path ? v.path = "/" + f.path : h.path ? v.path = h.path.slice(0, h.path.lastIndexOf("/") + 1) + f.path : v.path = f.path, v.path = r(v.path)), v.query = f.query) : (v.path = h.path, f.query !== void 0 ? v.query = f.query : v.query = h.query), v.userinfo = h.userinfo, v.host = h.host, v.port = h.port), v.scheme = h.scheme), v.fragment = f.fragment, v;
  }
  function l(h, f, u) {
    return typeof h == "string" ? (h = unescape(h), h = d(o(k(h, u), !0), { ...u, skipEscape: !0 })) : typeof h == "object" && (h = d(o(h, !0), { ...u, skipEscape: !0 })), typeof f == "string" ? (f = unescape(f), f = d(o(k(f, u), !0), { ...u, skipEscape: !0 })) : typeof f == "object" && (f = d(o(f, !0), { ...u, skipEscape: !0 })), h.toLowerCase() === f.toLowerCase();
  }
  function d(h, f) {
    const u = {
      host: h.host,
      scheme: h.scheme,
      userinfo: h.userinfo,
      port: h.port,
      path: h.path,
      query: h.query,
      nid: h.nid,
      nss: h.nss,
      uuid: h.uuid,
      fragment: h.fragment,
      reference: h.reference,
      resourceName: h.resourceName,
      secure: h.secure,
      error: ""
    }, p = Object.assign({}, f), v = [], b = s[(p.scheme || u.scheme || "").toLowerCase()];
    b && b.serialize && b.serialize(u, p), u.path !== void 0 && (p.skipEscape ? u.path = unescape(u.path) : (u.path = escape(u.path), u.scheme !== void 0 && (u.path = u.path.split("%3A").join(":")))), p.reference !== "suffix" && u.scheme && v.push(u.scheme, ":");
    const y = n(u);
    if (y !== void 0 && (p.reference !== "suffix" && v.push("//"), v.push(y), u.path && u.path.charAt(0) !== "/" && v.push("/")), u.path !== void 0) {
      let S = u.path;
      !p.absolutePath && (!b || !b.absolutePath) && (S = r(S)), y === void 0 && (S = S.replace(/^\/\//u, "/%2F")), v.push(S);
    }
    return u.query !== void 0 && v.push("?", u.query), u.fragment !== void 0 && v.push("#", u.fragment), v.join("");
  }
  const m = Array.from({ length: 127 }, (h, f) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(f)));
  function g(h) {
    let f = 0;
    for (let u = 0, p = h.length; u < p; ++u)
      if (f = h.charCodeAt(u), f > 126 || m[f])
        return !0;
    return !1;
  }
  const w = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function k(h, f) {
    const u = Object.assign({}, f), p = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    }, v = h.indexOf("%") !== -1;
    let b = !1;
    u.reference === "suffix" && (h = (u.scheme ? u.scheme + ":" : "") + "//" + h);
    const y = h.match(w);
    if (y) {
      if (p.scheme = y[1], p.userinfo = y[3], p.host = y[4], p.port = parseInt(y[5], 10), p.path = y[6] || "", p.query = y[7], p.fragment = y[8], isNaN(p.port) && (p.port = y[5]), p.host) {
        const T = t(p.host);
        if (T.isIPV4 === !1) {
          const O = e(T.host);
          p.host = O.host.toLowerCase(), b = O.isIPV6;
        } else
          p.host = T.host, b = !0;
      }
      p.scheme === void 0 && p.userinfo === void 0 && p.host === void 0 && p.port === void 0 && p.query === void 0 && !p.path ? p.reference = "same-document" : p.scheme === void 0 ? p.reference = "relative" : p.fragment === void 0 ? p.reference = "absolute" : p.reference = "uri", u.reference && u.reference !== "suffix" && u.reference !== p.reference && (p.error = p.error || "URI is not a " + u.reference + " reference.");
      const S = s[(u.scheme || p.scheme || "").toLowerCase()];
      if (!u.unicodeSupport && (!S || !S.unicodeSupport) && p.host && (u.domainHost || S && S.domainHost) && b === !1 && g(p.host))
        try {
          p.host = URL.domainToASCII(p.host.toLowerCase());
        } catch (T) {
          p.error = p.error || "Host's domain name can not be converted to ASCII: " + T;
        }
      (!S || S && !S.skipNormalize) && (v && p.scheme !== void 0 && (p.scheme = unescape(p.scheme)), v && p.host !== void 0 && (p.host = unescape(p.host)), p.path && (p.path = escape(unescape(p.path))), p.fragment && (p.fragment = encodeURI(decodeURIComponent(p.fragment)))), S && S.parse && S.parse(p, u);
    } else
      p.error = p.error || "URI can not be parsed.";
    return p;
  }
  const _ = {
    SCHEMES: s,
    normalize: i,
    resolve: a,
    resolveComponents: c,
    equal: l,
    serialize: d,
    parse: k
  };
  return _r.exports = _, _r.exports.default = _, _r.exports.fastUri = _, _r.exports;
}
var Ji;
function jg() {
  if (Ji) return Hr;
  Ji = 1, Object.defineProperty(Hr, "__esModule", { value: !0 });
  const e = Mg();
  return e.code = 'require("ajv/dist/runtime/uri").default', Hr.default = e, Hr;
}
var Ki;
function qg() {
  return Ki || (Ki = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = oo();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var r = ie();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return r._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return r.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return r.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return r.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return r.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return r.CodeGen;
    } });
    const n = Ds(), o = so(), s = hu(), i = xs(), a = ie(), c = no(), l = Dn(), d = le(), m = Ig, g = jg(), w = (L, A) => new RegExp(L, A);
    w.code = "new RegExp";
    const k = ["removeAdditional", "useDefaults", "coerceTypes"], _ = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), h = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, f = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, u = 200;
    function p(L) {
      var A, D, I, $, C, N, B, X, de, ue, P, R, j, Z, Q, ae, Me, ft, Qe, Xe, je, Kt, it, ao, co;
      const mr = L.strict, uo = (A = L.code) === null || A === void 0 ? void 0 : A.optimize, Hs = uo === !0 || uo === void 0 ? 1 : uo || 0, Ws = (I = (D = L.code) === null || D === void 0 ? void 0 : D.regExp) !== null && I !== void 0 ? I : w, Mu = ($ = L.uriResolver) !== null && $ !== void 0 ? $ : g.default;
      return {
        strictSchema: (N = (C = L.strictSchema) !== null && C !== void 0 ? C : mr) !== null && N !== void 0 ? N : !0,
        strictNumbers: (X = (B = L.strictNumbers) !== null && B !== void 0 ? B : mr) !== null && X !== void 0 ? X : !0,
        strictTypes: (ue = (de = L.strictTypes) !== null && de !== void 0 ? de : mr) !== null && ue !== void 0 ? ue : "log",
        strictTuples: (R = (P = L.strictTuples) !== null && P !== void 0 ? P : mr) !== null && R !== void 0 ? R : "log",
        strictRequired: (Z = (j = L.strictRequired) !== null && j !== void 0 ? j : mr) !== null && Z !== void 0 ? Z : !1,
        code: L.code ? { ...L.code, optimize: Hs, regExp: Ws } : { optimize: Hs, regExp: Ws },
        loopRequired: (Q = L.loopRequired) !== null && Q !== void 0 ? Q : u,
        loopEnum: (ae = L.loopEnum) !== null && ae !== void 0 ? ae : u,
        meta: (Me = L.meta) !== null && Me !== void 0 ? Me : !0,
        messages: (ft = L.messages) !== null && ft !== void 0 ? ft : !0,
        inlineRefs: (Qe = L.inlineRefs) !== null && Qe !== void 0 ? Qe : !0,
        schemaId: (Xe = L.schemaId) !== null && Xe !== void 0 ? Xe : "$id",
        addUsedSchema: (je = L.addUsedSchema) !== null && je !== void 0 ? je : !0,
        validateSchema: (Kt = L.validateSchema) !== null && Kt !== void 0 ? Kt : !0,
        validateFormats: (it = L.validateFormats) !== null && it !== void 0 ? it : !0,
        unicodeRegExp: (ao = L.unicodeRegExp) !== null && ao !== void 0 ? ao : !0,
        int32range: (co = L.int32range) !== null && co !== void 0 ? co : !0,
        uriResolver: Mu
      };
    }
    class v {
      constructor(A = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), A = this.opts = { ...A, ...p(A) };
        const { es5: D, lines: I } = this.opts.code;
        this.scope = new a.ValueScope({ scope: {}, prefixes: _, es5: D, lines: I }), this.logger = U(A.logger);
        const $ = A.validateFormats;
        A.validateFormats = !1, this.RULES = (0, s.getRules)(), b.call(this, h, A, "NOT SUPPORTED"), b.call(this, f, A, "DEPRECATED", "warn"), this._metaOpts = F.call(this), A.formats && T.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), A.keywords && O.call(this, A.keywords), typeof A.meta == "object" && this.addMetaSchema(A.meta), S.call(this), A.validateFormats = $;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: A, meta: D, schemaId: I } = this.opts;
        let $ = m;
        I === "id" && ($ = { ...m }, $.id = $.$id, delete $.$id), D && A && this.addMetaSchema($, $[I], !1);
      }
      defaultMeta() {
        const { meta: A, schemaId: D } = this.opts;
        return this.opts.defaultMeta = typeof A == "object" ? A[D] || A : void 0;
      }
      validate(A, D) {
        let I;
        if (typeof A == "string") {
          if (I = this.getSchema(A), !I)
            throw new Error(`no schema with key or ref "${A}"`);
        } else
          I = this.compile(A);
        const $ = I(D);
        return "$async" in I || (this.errors = I.errors), $;
      }
      compile(A, D) {
        const I = this._addSchema(A, D);
        return I.validate || this._compileSchemaEnv(I);
      }
      compileAsync(A, D) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: I } = this.opts;
        return $.call(this, A, D);
        async function $(ue, P) {
          await C.call(this, ue.$schema);
          const R = this._addSchema(ue, P);
          return R.validate || N.call(this, R);
        }
        async function C(ue) {
          ue && !this.getSchema(ue) && await $.call(this, { $ref: ue }, !0);
        }
        async function N(ue) {
          try {
            return this._compileSchemaEnv(ue);
          } catch (P) {
            if (!(P instanceof o.default))
              throw P;
            return B.call(this, P), await X.call(this, P.missingSchema), N.call(this, ue);
          }
        }
        function B({ missingSchema: ue, missingRef: P }) {
          if (this.refs[ue])
            throw new Error(`AnySchema ${ue} is loaded but ${P} cannot be resolved`);
        }
        async function X(ue) {
          const P = await de.call(this, ue);
          this.refs[ue] || await C.call(this, P.$schema), this.refs[ue] || this.addSchema(P, ue, D);
        }
        async function de(ue) {
          const P = this._loading[ue];
          if (P)
            return P;
          try {
            return await (this._loading[ue] = I(ue));
          } finally {
            delete this._loading[ue];
          }
        }
      }
      // Adds schema to the instance
      addSchema(A, D, I, $ = this.opts.validateSchema) {
        if (Array.isArray(A)) {
          for (const N of A)
            this.addSchema(N, void 0, I, $);
          return this;
        }
        let C;
        if (typeof A == "object") {
          const { schemaId: N } = this.opts;
          if (C = A[N], C !== void 0 && typeof C != "string")
            throw new Error(`schema ${N} must be string`);
        }
        return D = (0, c.normalizeId)(D || C), this._checkUnique(D), this.schemas[D] = this._addSchema(A, I, D, $, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(A, D, I = this.opts.validateSchema) {
        return this.addSchema(A, D, !0, I), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(A, D) {
        if (typeof A == "boolean")
          return !0;
        let I;
        if (I = A.$schema, I !== void 0 && typeof I != "string")
          throw new Error("$schema must be a string");
        if (I = I || this.opts.defaultMeta || this.defaultMeta(), !I)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const $ = this.validate(I, A);
        if (!$ && D) {
          const C = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(C);
          else
            throw new Error(C);
        }
        return $;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(A) {
        let D;
        for (; typeof (D = y.call(this, A)) == "string"; )
          A = D;
        if (D === void 0) {
          const { schemaId: I } = this.opts, $ = new i.SchemaEnv({ schema: {}, schemaId: I });
          if (D = i.resolveSchema.call(this, $, A), !D)
            return;
          this.refs[A] = D;
        }
        return D.validate || this._compileSchemaEnv(D);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(A) {
        if (A instanceof RegExp)
          return this._removeAllSchemas(this.schemas, A), this._removeAllSchemas(this.refs, A), this;
        switch (typeof A) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const D = y.call(this, A);
            return typeof D == "object" && this._cache.delete(D.schema), delete this.schemas[A], delete this.refs[A], this;
          }
          case "object": {
            const D = A;
            this._cache.delete(D);
            let I = A[this.opts.schemaId];
            return I && (I = (0, c.normalizeId)(I), delete this.schemas[I], delete this.refs[I]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(A) {
        for (const D of A)
          this.addKeyword(D);
        return this;
      }
      addKeyword(A, D) {
        let I;
        if (typeof A == "string")
          I = A, typeof D == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), D.keyword = I);
        else if (typeof A == "object" && D === void 0) {
          if (D = A, I = D.keyword, Array.isArray(I) && !I.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (H.call(this, I, D), !D)
          return (0, d.eachItem)(I, (C) => Y.call(this, C)), this;
        Te.call(this, D);
        const $ = {
          ...D,
          type: (0, l.getJSONTypes)(D.type),
          schemaType: (0, l.getJSONTypes)(D.schemaType)
        };
        return (0, d.eachItem)(I, $.type.length === 0 ? (C) => Y.call(this, C, $) : (C) => $.type.forEach((N) => Y.call(this, C, $, N))), this;
      }
      getKeyword(A) {
        const D = this.RULES.all[A];
        return typeof D == "object" ? D.definition : !!D;
      }
      // Remove keyword
      removeKeyword(A) {
        const { RULES: D } = this;
        delete D.keywords[A], delete D.all[A];
        for (const I of D.rules) {
          const $ = I.rules.findIndex((C) => C.keyword === A);
          $ >= 0 && I.rules.splice($, 1);
        }
        return this;
      }
      // Add format
      addFormat(A, D) {
        return typeof D == "string" && (D = new RegExp(D)), this.formats[A] = D, this;
      }
      errorsText(A = this.errors, { separator: D = ", ", dataVar: I = "data" } = {}) {
        return !A || A.length === 0 ? "No errors" : A.map(($) => `${I}${$.instancePath} ${$.message}`).reduce(($, C) => $ + D + C);
      }
      $dataMetaSchema(A, D) {
        const I = this.RULES.all;
        A = JSON.parse(JSON.stringify(A));
        for (const $ of D) {
          const C = $.split("/").slice(1);
          let N = A;
          for (const B of C)
            N = N[B];
          for (const B in I) {
            const X = I[B];
            if (typeof X != "object")
              continue;
            const { $data: de } = X.definition, ue = N[B];
            de && ue && (N[B] = Ve(ue));
          }
        }
        return A;
      }
      _removeAllSchemas(A, D) {
        for (const I in A) {
          const $ = A[I];
          (!D || D.test(I)) && (typeof $ == "string" ? delete A[I] : $ && !$.meta && (this._cache.delete($.schema), delete A[I]));
        }
      }
      _addSchema(A, D, I, $ = this.opts.validateSchema, C = this.opts.addUsedSchema) {
        let N;
        const { schemaId: B } = this.opts;
        if (typeof A == "object")
          N = A[B];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof A != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let X = this._cache.get(A);
        if (X !== void 0)
          return X;
        I = (0, c.normalizeId)(N || I);
        const de = c.getSchemaRefs.call(this, A, I);
        return X = new i.SchemaEnv({ schema: A, schemaId: B, meta: D, baseId: I, localRefs: de }), this._cache.set(X.schema, X), C && !I.startsWith("#") && (I && this._checkUnique(I), this.refs[I] = X), $ && this.validateSchema(A, !0), X;
      }
      _checkUnique(A) {
        if (this.schemas[A] || this.refs[A])
          throw new Error(`schema with key or id "${A}" already exists`);
      }
      _compileSchemaEnv(A) {
        if (A.meta ? this._compileMetaSchema(A) : i.compileSchema.call(this, A), !A.validate)
          throw new Error("ajv implementation error");
        return A.validate;
      }
      _compileMetaSchema(A) {
        const D = this.opts;
        this.opts = this._metaOpts;
        try {
          i.compileSchema.call(this, A);
        } finally {
          this.opts = D;
        }
      }
    }
    v.ValidationError = n.default, v.MissingRefError = o.default, e.default = v;
    function b(L, A, D, I = "error") {
      for (const $ in L) {
        const C = $;
        C in A && this.logger[I](`${D}: option ${$}. ${L[C]}`);
      }
    }
    function y(L) {
      return L = (0, c.normalizeId)(L), this.schemas[L] || this.refs[L];
    }
    function S() {
      const L = this.opts.schemas;
      if (L)
        if (Array.isArray(L))
          this.addSchema(L);
        else
          for (const A in L)
            this.addSchema(L[A], A);
    }
    function T() {
      for (const L in this.opts.formats) {
        const A = this.opts.formats[L];
        A && this.addFormat(L, A);
      }
    }
    function O(L) {
      if (Array.isArray(L)) {
        this.addVocabulary(L);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const A in L) {
        const D = L[A];
        D.keyword || (D.keyword = A), this.addKeyword(D);
      }
    }
    function F() {
      const L = { ...this.opts };
      for (const A of k)
        delete L[A];
      return L;
    }
    const M = { log() {
    }, warn() {
    }, error() {
    } };
    function U(L) {
      if (L === !1)
        return M;
      if (L === void 0)
        return console;
      if (L.log && L.warn && L.error)
        return L;
      throw new Error("logger must implement log, warn and error methods");
    }
    const q = /^[a-z_$][a-z0-9_$:-]*$/i;
    function H(L, A) {
      const { RULES: D } = this;
      if ((0, d.eachItem)(L, (I) => {
        if (D.keywords[I])
          throw new Error(`Keyword ${I} is already defined`);
        if (!q.test(I))
          throw new Error(`Keyword ${I} has invalid name`);
      }), !!A && A.$data && !("code" in A || "validate" in A))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function Y(L, A, D) {
      var I;
      const $ = A == null ? void 0 : A.post;
      if (D && $)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: C } = this;
      let N = $ ? C.post : C.rules.find(({ type: X }) => X === D);
      if (N || (N = { type: D, rules: [] }, C.rules.push(N)), C.keywords[L] = !0, !A)
        return;
      const B = {
        keyword: L,
        definition: {
          ...A,
          type: (0, l.getJSONTypes)(A.type),
          schemaType: (0, l.getJSONTypes)(A.schemaType)
        }
      };
      A.before ? ke.call(this, N, B, A.before) : N.rules.push(B), C.all[L] = B, (I = A.implements) === null || I === void 0 || I.forEach((X) => this.addKeyword(X));
    }
    function ke(L, A, D) {
      const I = L.rules.findIndex(($) => $.keyword === D);
      I >= 0 ? L.rules.splice(I, 0, A) : (L.rules.push(A), this.logger.warn(`rule ${D} is not defined`));
    }
    function Te(L) {
      let { metaSchema: A } = L;
      A !== void 0 && (L.$data && this.opts.$data && (A = Ve(A)), L.validateSchema = this.compile(A, !0));
    }
    const oe = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function Ve(L) {
      return { anyOf: [L, oe] };
    }
  }(mo)), mo;
}
var Wr = {}, Jr = {}, Kr = {}, Bi;
function Dg() {
  if (Bi) return Kr;
  Bi = 1, Object.defineProperty(Kr, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return Kr.default = e, Kr;
}
var Et = {}, Gi;
function xg() {
  if (Gi) return Et;
  Gi = 1, Object.defineProperty(Et, "__esModule", { value: !0 }), Et.callRef = Et.getValidate = void 0;
  const e = so(), t = _t(), r = ie(), n = zt(), o = xs(), s = le(), i = {
    keyword: "$ref",
    schemaType: "string",
    code(l) {
      const { gen: d, schema: m, it: g } = l, { baseId: w, schemaEnv: k, validateName: _, opts: h, self: f } = g, { root: u } = k;
      if ((m === "#" || m === "#/") && w === u.baseId)
        return v();
      const p = o.resolveRef.call(f, u, w, m);
      if (p === void 0)
        throw new e.default(g.opts.uriResolver, w, m);
      if (p instanceof o.SchemaEnv)
        return b(p);
      return y(p);
      function v() {
        if (k === u)
          return c(l, _, k, k.$async);
        const S = d.scopeValue("root", { ref: u });
        return c(l, (0, r._)`${S}.validate`, u, u.$async);
      }
      function b(S) {
        const T = a(l, S);
        c(l, T, S, S.$async);
      }
      function y(S) {
        const T = d.scopeValue("schema", h.code.source === !0 ? { ref: S, code: (0, r.stringify)(S) } : { ref: S }), O = d.name("valid"), F = l.subschema({
          schema: S,
          dataTypes: [],
          schemaPath: r.nil,
          topSchemaRef: T,
          errSchemaPath: m
        }, O);
        l.mergeEvaluated(F), l.ok(O);
      }
    }
  };
  function a(l, d) {
    const { gen: m } = l;
    return d.validate ? m.scopeValue("validate", { ref: d.validate }) : (0, r._)`${m.scopeValue("wrapper", { ref: d })}.validate`;
  }
  Et.getValidate = a;
  function c(l, d, m, g) {
    const { gen: w, it: k } = l, { allErrors: _, schemaEnv: h, opts: f } = k, u = f.passContext ? n.default.this : r.nil;
    g ? p() : v();
    function p() {
      if (!h.$async)
        throw new Error("async schema referenced by sync schema");
      const S = w.let("valid");
      w.try(() => {
        w.code((0, r._)`await ${(0, t.callValidateCode)(l, d, u)}`), y(d), _ || w.assign(S, !0);
      }, (T) => {
        w.if((0, r._)`!(${T} instanceof ${k.ValidationError})`, () => w.throw(T)), b(T), _ || w.assign(S, !1);
      }), l.ok(S);
    }
    function v() {
      l.result((0, t.callValidateCode)(l, d, u), () => y(d), () => b(d));
    }
    function b(S) {
      const T = (0, r._)`${S}.errors`;
      w.assign(n.default.vErrors, (0, r._)`${n.default.vErrors} === null ? ${T} : ${n.default.vErrors}.concat(${T})`), w.assign(n.default.errors, (0, r._)`${n.default.vErrors}.length`);
    }
    function y(S) {
      var T;
      if (!k.opts.unevaluated)
        return;
      const O = (T = m == null ? void 0 : m.validate) === null || T === void 0 ? void 0 : T.evaluated;
      if (k.props !== !0)
        if (O && !O.dynamicProps)
          O.props !== void 0 && (k.props = s.mergeEvaluated.props(w, O.props, k.props));
        else {
          const F = w.var("props", (0, r._)`${S}.evaluated.props`);
          k.props = s.mergeEvaluated.props(w, F, k.props, r.Name);
        }
      if (k.items !== !0)
        if (O && !O.dynamicItems)
          O.items !== void 0 && (k.items = s.mergeEvaluated.items(w, O.items, k.items));
        else {
          const F = w.var("items", (0, r._)`${S}.evaluated.items`);
          k.items = s.mergeEvaluated.items(w, F, k.items, r.Name);
        }
    }
  }
  return Et.callRef = c, Et.default = i, Et;
}
var Qi;
function Ug() {
  if (Qi) return Jr;
  Qi = 1, Object.defineProperty(Jr, "__esModule", { value: !0 });
  const e = Dg(), t = xg(), r = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return Jr.default = r, Jr;
}
var Br = {}, Gr = {}, Xi;
function Fg() {
  if (Xi) return Gr;
  Xi = 1, Object.defineProperty(Gr, "__esModule", { value: !0 });
  const e = ie(), t = e.operators, r = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: s, schemaCode: i }) => (0, e.str)`must be ${r[s].okStr} ${i}`,
    params: ({ keyword: s, schemaCode: i }) => (0, e._)`{comparison: ${r[s].okStr}, limit: ${i}}`
  }, o = {
    keyword: Object.keys(r),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(s) {
      const { keyword: i, data: a, schemaCode: c } = s;
      s.fail$data((0, e._)`${a} ${r[i].fail} ${c} || isNaN(${a})`);
    }
  };
  return Gr.default = o, Gr;
}
var Qr = {}, Yi;
function Lg() {
  if (Yi) return Qr;
  Yi = 1, Object.defineProperty(Qr, "__esModule", { value: !0 });
  const e = ie(), r = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, e._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: o, data: s, schemaCode: i, it: a } = n, c = a.opts.multipleOfPrecision, l = o.let("res"), d = c ? (0, e._)`Math.abs(Math.round(${l}) - ${l}) > 1e-${c}` : (0, e._)`${l} !== parseInt(${l})`;
      n.fail$data((0, e._)`(${i} === 0 || (${l} = ${s}/${i}, ${d}))`);
    }
  };
  return Qr.default = r, Qr;
}
var Xr = {}, Yr = {}, ea;
function Zg() {
  if (ea) return Yr;
  ea = 1, Object.defineProperty(Yr, "__esModule", { value: !0 });
  function e(t) {
    const r = t.length;
    let n = 0, o = 0, s;
    for (; o < r; )
      n++, s = t.charCodeAt(o++), s >= 55296 && s <= 56319 && o < r && (s = t.charCodeAt(o), (s & 64512) === 56320 && o++);
    return n;
  }
  return Yr.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', Yr;
}
var ta;
function Vg() {
  if (ta) return Xr;
  ta = 1, Object.defineProperty(Xr, "__esModule", { value: !0 });
  const e = ie(), t = le(), r = Zg(), o = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: i }) {
        const a = s === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${i} characters`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: i, data: a, schemaCode: c, it: l } = s, d = i === "maxLength" ? e.operators.GT : e.operators.LT, m = l.opts.unicode === !1 ? (0, e._)`${a}.length` : (0, e._)`${(0, t.useFunc)(s.gen, r.default)}(${a})`;
      s.fail$data((0, e._)`${m} ${d} ${c}`);
    }
  };
  return Xr.default = o, Xr;
}
var en = {}, ra;
function Hg() {
  if (ra) return en;
  ra = 1, Object.defineProperty(en, "__esModule", { value: !0 });
  const e = _t(), t = ie(), n = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: o }) => (0, t.str)`must match pattern "${o}"`,
      params: ({ schemaCode: o }) => (0, t._)`{pattern: ${o}}`
    },
    code(o) {
      const { data: s, $data: i, schema: a, schemaCode: c, it: l } = o, d = l.opts.unicodeRegExp ? "u" : "", m = i ? (0, t._)`(new RegExp(${c}, ${d}))` : (0, e.usePattern)(o, a);
      o.fail$data((0, t._)`!${m}.test(${s})`);
    }
  };
  return en.default = n, en;
}
var tn = {}, na;
function Wg() {
  if (na) return tn;
  na = 1, Object.defineProperty(tn, "__esModule", { value: !0 });
  const e = ie(), r = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: o }) {
        const s = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${o} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: o, data: s, schemaCode: i } = n, a = o === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${s}).length ${a} ${i}`);
    }
  };
  return tn.default = r, tn;
}
var rn = {}, oa;
function Jg() {
  if (oa) return rn;
  oa = 1, Object.defineProperty(rn, "__esModule", { value: !0 });
  const e = _t(), t = ie(), r = le(), o = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: s } }) => (0, t.str)`must have required property '${s}'`,
      params: ({ params: { missingProperty: s } }) => (0, t._)`{missingProperty: ${s}}`
    },
    code(s) {
      const { gen: i, schema: a, schemaCode: c, data: l, $data: d, it: m } = s, { opts: g } = m;
      if (!d && a.length === 0)
        return;
      const w = a.length >= g.loopRequired;
      if (m.allErrors ? k() : _(), g.strictRequired) {
        const u = s.parentSchema.properties, { definedProperties: p } = s.it;
        for (const v of a)
          if ((u == null ? void 0 : u[v]) === void 0 && !p.has(v)) {
            const b = m.schemaEnv.baseId + m.errSchemaPath, y = `required property "${v}" is not defined at "${b}" (strictRequired)`;
            (0, r.checkStrictMode)(m, y, m.opts.strictRequired);
          }
      }
      function k() {
        if (w || d)
          s.block$data(t.nil, h);
        else
          for (const u of a)
            (0, e.checkReportMissingProp)(s, u);
      }
      function _() {
        const u = i.let("missing");
        if (w || d) {
          const p = i.let("valid", !0);
          s.block$data(p, () => f(u, p)), s.ok(p);
        } else
          i.if((0, e.checkMissingProp)(s, a, u)), (0, e.reportMissingProp)(s, u), i.else();
      }
      function h() {
        i.forOf("prop", c, (u) => {
          s.setParams({ missingProperty: u }), i.if((0, e.noPropertyInData)(i, l, u, g.ownProperties), () => s.error());
        });
      }
      function f(u, p) {
        s.setParams({ missingProperty: u }), i.forOf(u, c, () => {
          i.assign(p, (0, e.propertyInData)(i, l, u, g.ownProperties)), i.if((0, t.not)(p), () => {
            s.error(), i.break();
          });
        }, t.nil);
      }
    }
  };
  return rn.default = o, rn;
}
var nn = {}, sa;
function Kg() {
  if (sa) return nn;
  sa = 1, Object.defineProperty(nn, "__esModule", { value: !0 });
  const e = ie(), r = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: o }) {
        const s = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${o} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: o, data: s, schemaCode: i } = n, a = o === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${s}.length ${a} ${i}`);
    }
  };
  return nn.default = r, nn;
}
var on = {}, sn = {}, ia;
function Us() {
  if (ia) return sn;
  ia = 1, Object.defineProperty(sn, "__esModule", { value: !0 });
  const e = mu();
  return e.code = 'require("ajv/dist/runtime/equal").default', sn.default = e, sn;
}
var aa;
function Bg() {
  if (aa) return on;
  aa = 1, Object.defineProperty(on, "__esModule", { value: !0 });
  const e = Dn(), t = ie(), r = le(), n = Us(), s = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i, j: a } }) => (0, t.str)`must NOT have duplicate items (items ## ${a} and ${i} are identical)`,
      params: ({ params: { i, j: a } }) => (0, t._)`{i: ${i}, j: ${a}}`
    },
    code(i) {
      const { gen: a, data: c, $data: l, schema: d, parentSchema: m, schemaCode: g, it: w } = i;
      if (!l && !d)
        return;
      const k = a.let("valid"), _ = m.items ? (0, e.getSchemaTypes)(m.items) : [];
      i.block$data(k, h, (0, t._)`${g} === false`), i.ok(k);
      function h() {
        const v = a.let("i", (0, t._)`${c}.length`), b = a.let("j");
        i.setParams({ i: v, j: b }), a.assign(k, !0), a.if((0, t._)`${v} > 1`, () => (f() ? u : p)(v, b));
      }
      function f() {
        return _.length > 0 && !_.some((v) => v === "object" || v === "array");
      }
      function u(v, b) {
        const y = a.name("item"), S = (0, e.checkDataTypes)(_, y, w.opts.strictNumbers, e.DataType.Wrong), T = a.const("indices", (0, t._)`{}`);
        a.for((0, t._)`;${v}--;`, () => {
          a.let(y, (0, t._)`${c}[${v}]`), a.if(S, (0, t._)`continue`), _.length > 1 && a.if((0, t._)`typeof ${y} == "string"`, (0, t._)`${y} += "_"`), a.if((0, t._)`typeof ${T}[${y}] == "number"`, () => {
            a.assign(b, (0, t._)`${T}[${y}]`), i.error(), a.assign(k, !1).break();
          }).code((0, t._)`${T}[${y}] = ${v}`);
        });
      }
      function p(v, b) {
        const y = (0, r.useFunc)(a, n.default), S = a.name("outer");
        a.label(S).for((0, t._)`;${v}--;`, () => a.for((0, t._)`${b} = ${v}; ${b}--;`, () => a.if((0, t._)`${y}(${c}[${v}], ${c}[${b}])`, () => {
          i.error(), a.assign(k, !1).break(S);
        })));
      }
    }
  };
  return on.default = s, on;
}
var an = {}, ca;
function Gg() {
  if (ca) return an;
  ca = 1, Object.defineProperty(an, "__esModule", { value: !0 });
  const e = ie(), t = le(), r = Us(), o = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValue: ${s}}`
    },
    code(s) {
      const { gen: i, data: a, $data: c, schemaCode: l, schema: d } = s;
      c || d && typeof d == "object" ? s.fail$data((0, e._)`!${(0, t.useFunc)(i, r.default)}(${a}, ${l})`) : s.fail((0, e._)`${d} !== ${a}`);
    }
  };
  return an.default = o, an;
}
var cn = {}, ua;
function Qg() {
  if (ua) return cn;
  ua = 1, Object.defineProperty(cn, "__esModule", { value: !0 });
  const e = ie(), t = le(), r = Us(), o = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValues: ${s}}`
    },
    code(s) {
      const { gen: i, data: a, $data: c, schema: l, schemaCode: d, it: m } = s;
      if (!c && l.length === 0)
        throw new Error("enum must have non-empty array");
      const g = l.length >= m.opts.loopEnum;
      let w;
      const k = () => w ?? (w = (0, t.useFunc)(i, r.default));
      let _;
      if (g || c)
        _ = i.let("valid"), s.block$data(_, h);
      else {
        if (!Array.isArray(l))
          throw new Error("ajv implementation error");
        const u = i.const("vSchema", d);
        _ = (0, e.or)(...l.map((p, v) => f(u, v)));
      }
      s.pass(_);
      function h() {
        i.assign(_, !1), i.forOf("v", d, (u) => i.if((0, e._)`${k()}(${a}, ${u})`, () => i.assign(_, !0).break()));
      }
      function f(u, p) {
        const v = l[p];
        return typeof v == "object" && v !== null ? (0, e._)`${k()}(${a}, ${u}[${p}])` : (0, e._)`${a} === ${v}`;
      }
    }
  };
  return cn.default = o, cn;
}
var la;
function Xg() {
  if (la) return Br;
  la = 1, Object.defineProperty(Br, "__esModule", { value: !0 });
  const e = Fg(), t = Lg(), r = Vg(), n = Hg(), o = Wg(), s = Jg(), i = Kg(), a = Bg(), c = Gg(), l = Qg(), d = [
    // number
    e.default,
    t.default,
    // string
    r.default,
    n.default,
    // object
    o.default,
    s.default,
    // array
    i.default,
    a.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    c.default,
    l.default
  ];
  return Br.default = d, Br;
}
var un = {}, Bt = {}, da;
function gu() {
  if (da) return Bt;
  da = 1, Object.defineProperty(Bt, "__esModule", { value: !0 }), Bt.validateAdditionalItems = void 0;
  const e = ie(), t = le(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: s } }) => (0, e.str)`must NOT have more than ${s} items`,
      params: ({ params: { len: s } }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { parentSchema: i, it: a } = s, { items: c } = i;
      if (!Array.isArray(c)) {
        (0, t.checkStrictMode)(a, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      o(s, c);
    }
  };
  function o(s, i) {
    const { gen: a, schema: c, data: l, keyword: d, it: m } = s;
    m.items = !0;
    const g = a.const("len", (0, e._)`${l}.length`);
    if (c === !1)
      s.setParams({ len: i.length }), s.pass((0, e._)`${g} <= ${i.length}`);
    else if (typeof c == "object" && !(0, t.alwaysValidSchema)(m, c)) {
      const k = a.var("valid", (0, e._)`${g} <= ${i.length}`);
      a.if((0, e.not)(k), () => w(k)), s.ok(k);
    }
    function w(k) {
      a.forRange("i", i.length, g, (_) => {
        s.subschema({ keyword: d, dataProp: _, dataPropType: t.Type.Num }, k), m.allErrors || a.if((0, e.not)(k), () => a.break());
      });
    }
  }
  return Bt.validateAdditionalItems = o, Bt.default = n, Bt;
}
var ln = {}, Gt = {}, fa;
function _u() {
  if (fa) return Gt;
  fa = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.validateTuple = void 0;
  const e = ie(), t = le(), r = _t(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(s) {
      const { schema: i, it: a } = s;
      if (Array.isArray(i))
        return o(s, "additionalItems", i);
      a.items = !0, !(0, t.alwaysValidSchema)(a, i) && s.ok((0, r.validateArray)(s));
    }
  };
  function o(s, i, a = s.schema) {
    const { gen: c, parentSchema: l, data: d, keyword: m, it: g } = s;
    _(l), g.opts.unevaluated && a.length && g.items !== !0 && (g.items = t.mergeEvaluated.items(c, a.length, g.items));
    const w = c.name("valid"), k = c.const("len", (0, e._)`${d}.length`);
    a.forEach((h, f) => {
      (0, t.alwaysValidSchema)(g, h) || (c.if((0, e._)`${k} > ${f}`, () => s.subschema({
        keyword: m,
        schemaProp: f,
        dataProp: f
      }, w)), s.ok(w));
    });
    function _(h) {
      const { opts: f, errSchemaPath: u } = g, p = a.length, v = p === h.minItems && (p === h.maxItems || h[i] === !1);
      if (f.strictTuples && !v) {
        const b = `"${m}" is ${p}-tuple, but minItems or maxItems/${i} are not specified or different at path "${u}"`;
        (0, t.checkStrictMode)(g, b, f.strictTuples);
      }
    }
  }
  return Gt.validateTuple = o, Gt.default = n, Gt;
}
var ha;
function Yg() {
  if (ha) return ln;
  ha = 1, Object.defineProperty(ln, "__esModule", { value: !0 });
  const e = _u(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (r) => (0, e.validateTuple)(r, "items")
  };
  return ln.default = t, ln;
}
var dn = {}, pa;
function e_() {
  if (pa) return dn;
  pa = 1, Object.defineProperty(dn, "__esModule", { value: !0 });
  const e = ie(), t = le(), r = _t(), n = gu(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: i } }) => (0, e.str)`must NOT have more than ${i} items`,
      params: ({ params: { len: i } }) => (0, e._)`{limit: ${i}}`
    },
    code(i) {
      const { schema: a, parentSchema: c, it: l } = i, { prefixItems: d } = c;
      l.items = !0, !(0, t.alwaysValidSchema)(l, a) && (d ? (0, n.validateAdditionalItems)(i, d) : i.ok((0, r.validateArray)(i)));
    }
  };
  return dn.default = s, dn;
}
var fn = {}, ma;
function t_() {
  if (ma) return fn;
  ma = 1, Object.defineProperty(fn, "__esModule", { value: !0 });
  const e = ie(), t = le(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: o, max: s } }) => s === void 0 ? (0, e.str)`must contain at least ${o} valid item(s)` : (0, e.str)`must contain at least ${o} and no more than ${s} valid item(s)`,
      params: ({ params: { min: o, max: s } }) => s === void 0 ? (0, e._)`{minContains: ${o}}` : (0, e._)`{minContains: ${o}, maxContains: ${s}}`
    },
    code(o) {
      const { gen: s, schema: i, parentSchema: a, data: c, it: l } = o;
      let d, m;
      const { minContains: g, maxContains: w } = a;
      l.opts.next ? (d = g === void 0 ? 1 : g, m = w) : d = 1;
      const k = s.const("len", (0, e._)`${c}.length`);
      if (o.setParams({ min: d, max: m }), m === void 0 && d === 0) {
        (0, t.checkStrictMode)(l, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (m !== void 0 && d > m) {
        (0, t.checkStrictMode)(l, '"minContains" > "maxContains" is always invalid'), o.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(l, i)) {
        let p = (0, e._)`${k} >= ${d}`;
        m !== void 0 && (p = (0, e._)`${p} && ${k} <= ${m}`), o.pass(p);
        return;
      }
      l.items = !0;
      const _ = s.name("valid");
      m === void 0 && d === 1 ? f(_, () => s.if(_, () => s.break())) : d === 0 ? (s.let(_, !0), m !== void 0 && s.if((0, e._)`${c}.length > 0`, h)) : (s.let(_, !1), h()), o.result(_, () => o.reset());
      function h() {
        const p = s.name("_valid"), v = s.let("count", 0);
        f(p, () => s.if(p, () => u(v)));
      }
      function f(p, v) {
        s.forRange("i", 0, k, (b) => {
          o.subschema({
            keyword: "contains",
            dataProp: b,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, p), v();
        });
      }
      function u(p) {
        s.code((0, e._)`${p}++`), m === void 0 ? s.if((0, e._)`${p} >= ${d}`, () => s.assign(_, !0).break()) : (s.if((0, e._)`${p} > ${m}`, () => s.assign(_, !1).break()), d === 1 ? s.assign(_, !0) : s.if((0, e._)`${p} >= ${d}`, () => s.assign(_, !0)));
      }
    }
  };
  return fn.default = n, fn;
}
var Eo = {}, ga;
function r_() {
  return ga || (ga = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = ie(), r = le(), n = _t();
    e.error = {
      message: ({ params: { property: c, depsCount: l, deps: d } }) => {
        const m = l === 1 ? "property" : "properties";
        return (0, t.str)`must have ${m} ${d} when property ${c} is present`;
      },
      params: ({ params: { property: c, depsCount: l, deps: d, missingProperty: m } }) => (0, t._)`{property: ${c},
    missingProperty: ${m},
    depsCount: ${l},
    deps: ${d}}`
      // TODO change to reference
    };
    const o = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(c) {
        const [l, d] = s(c);
        i(c, l), a(c, d);
      }
    };
    function s({ schema: c }) {
      const l = {}, d = {};
      for (const m in c) {
        if (m === "__proto__")
          continue;
        const g = Array.isArray(c[m]) ? l : d;
        g[m] = c[m];
      }
      return [l, d];
    }
    function i(c, l = c.schema) {
      const { gen: d, data: m, it: g } = c;
      if (Object.keys(l).length === 0)
        return;
      const w = d.let("missing");
      for (const k in l) {
        const _ = l[k];
        if (_.length === 0)
          continue;
        const h = (0, n.propertyInData)(d, m, k, g.opts.ownProperties);
        c.setParams({
          property: k,
          depsCount: _.length,
          deps: _.join(", ")
        }), g.allErrors ? d.if(h, () => {
          for (const f of _)
            (0, n.checkReportMissingProp)(c, f);
        }) : (d.if((0, t._)`${h} && (${(0, n.checkMissingProp)(c, _, w)})`), (0, n.reportMissingProp)(c, w), d.else());
      }
    }
    e.validatePropertyDeps = i;
    function a(c, l = c.schema) {
      const { gen: d, data: m, keyword: g, it: w } = c, k = d.name("valid");
      for (const _ in l)
        (0, r.alwaysValidSchema)(w, l[_]) || (d.if(
          (0, n.propertyInData)(d, m, _, w.opts.ownProperties),
          () => {
            const h = c.subschema({ keyword: g, schemaProp: _ }, k);
            c.mergeValidEvaluated(h, k);
          },
          () => d.var(k, !0)
          // TODO var
        ), c.ok(k));
    }
    e.validateSchemaDeps = a, e.default = o;
  }(Eo)), Eo;
}
var hn = {}, _a;
function n_() {
  if (_a) return hn;
  _a = 1, Object.defineProperty(hn, "__esModule", { value: !0 });
  const e = ie(), t = le(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: o }) => (0, e._)`{propertyName: ${o.propertyName}}`
    },
    code(o) {
      const { gen: s, schema: i, data: a, it: c } = o;
      if ((0, t.alwaysValidSchema)(c, i))
        return;
      const l = s.name("valid");
      s.forIn("key", a, (d) => {
        o.setParams({ propertyName: d }), o.subschema({
          keyword: "propertyNames",
          data: d,
          dataTypes: ["string"],
          propertyName: d,
          compositeRule: !0
        }, l), s.if((0, e.not)(l), () => {
          o.error(!0), c.allErrors || s.break();
        });
      }), o.ok(l);
    }
  };
  return hn.default = n, hn;
}
var pn = {}, ya;
function yu() {
  if (ya) return pn;
  ya = 1, Object.defineProperty(pn, "__esModule", { value: !0 });
  const e = _t(), t = ie(), r = zt(), n = le(), s = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: i }) => (0, t._)`{additionalProperty: ${i.additionalProperty}}`
    },
    code(i) {
      const { gen: a, schema: c, parentSchema: l, data: d, errsCount: m, it: g } = i;
      if (!m)
        throw new Error("ajv implementation error");
      const { allErrors: w, opts: k } = g;
      if (g.props = !0, k.removeAdditional !== "all" && (0, n.alwaysValidSchema)(g, c))
        return;
      const _ = (0, e.allSchemaProperties)(l.properties), h = (0, e.allSchemaProperties)(l.patternProperties);
      f(), i.ok((0, t._)`${m} === ${r.default.errors}`);
      function f() {
        a.forIn("key", d, (y) => {
          !_.length && !h.length ? v(y) : a.if(u(y), () => v(y));
        });
      }
      function u(y) {
        let S;
        if (_.length > 8) {
          const T = (0, n.schemaRefOrVal)(g, l.properties, "properties");
          S = (0, e.isOwnProperty)(a, T, y);
        } else _.length ? S = (0, t.or)(..._.map((T) => (0, t._)`${y} === ${T}`)) : S = t.nil;
        return h.length && (S = (0, t.or)(S, ...h.map((T) => (0, t._)`${(0, e.usePattern)(i, T)}.test(${y})`))), (0, t.not)(S);
      }
      function p(y) {
        a.code((0, t._)`delete ${d}[${y}]`);
      }
      function v(y) {
        if (k.removeAdditional === "all" || k.removeAdditional && c === !1) {
          p(y);
          return;
        }
        if (c === !1) {
          i.setParams({ additionalProperty: y }), i.error(), w || a.break();
          return;
        }
        if (typeof c == "object" && !(0, n.alwaysValidSchema)(g, c)) {
          const S = a.name("valid");
          k.removeAdditional === "failing" ? (b(y, S, !1), a.if((0, t.not)(S), () => {
            i.reset(), p(y);
          })) : (b(y, S), w || a.if((0, t.not)(S), () => a.break()));
        }
      }
      function b(y, S, T) {
        const O = {
          keyword: "additionalProperties",
          dataProp: y,
          dataPropType: n.Type.Str
        };
        T === !1 && Object.assign(O, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), i.subschema(O, S);
      }
    }
  };
  return pn.default = s, pn;
}
var mn = {}, va;
function o_() {
  if (va) return mn;
  va = 1, Object.defineProperty(mn, "__esModule", { value: !0 });
  const e = oo(), t = _t(), r = le(), n = yu(), o = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: i, schema: a, parentSchema: c, data: l, it: d } = s;
      d.opts.removeAdditional === "all" && c.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(d, n.default, "additionalProperties"));
      const m = (0, t.allSchemaProperties)(a);
      for (const h of m)
        d.definedProperties.add(h);
      d.opts.unevaluated && m.length && d.props !== !0 && (d.props = r.mergeEvaluated.props(i, (0, r.toHash)(m), d.props));
      const g = m.filter((h) => !(0, r.alwaysValidSchema)(d, a[h]));
      if (g.length === 0)
        return;
      const w = i.name("valid");
      for (const h of g)
        k(h) ? _(h) : (i.if((0, t.propertyInData)(i, l, h, d.opts.ownProperties)), _(h), d.allErrors || i.else().var(w, !0), i.endIf()), s.it.definedProperties.add(h), s.ok(w);
      function k(h) {
        return d.opts.useDefaults && !d.compositeRule && a[h].default !== void 0;
      }
      function _(h) {
        s.subschema({
          keyword: "properties",
          schemaProp: h,
          dataProp: h
        }, w);
      }
    }
  };
  return mn.default = o, mn;
}
var gn = {}, wa;
function s_() {
  if (wa) return gn;
  wa = 1, Object.defineProperty(gn, "__esModule", { value: !0 });
  const e = _t(), t = ie(), r = le(), n = le(), o = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: i, schema: a, data: c, parentSchema: l, it: d } = s, { opts: m } = d, g = (0, e.allSchemaProperties)(a), w = g.filter((v) => (0, r.alwaysValidSchema)(d, a[v]));
      if (g.length === 0 || w.length === g.length && (!d.opts.unevaluated || d.props === !0))
        return;
      const k = m.strictSchema && !m.allowMatchingProperties && l.properties, _ = i.name("valid");
      d.props !== !0 && !(d.props instanceof t.Name) && (d.props = (0, n.evaluatedPropsToName)(i, d.props));
      const { props: h } = d;
      f();
      function f() {
        for (const v of g)
          k && u(v), d.allErrors ? p(v) : (i.var(_, !0), p(v), i.if(_));
      }
      function u(v) {
        for (const b in k)
          new RegExp(v).test(b) && (0, r.checkStrictMode)(d, `property ${b} matches pattern ${v} (use allowMatchingProperties)`);
      }
      function p(v) {
        i.forIn("key", c, (b) => {
          i.if((0, t._)`${(0, e.usePattern)(s, v)}.test(${b})`, () => {
            const y = w.includes(v);
            y || s.subschema({
              keyword: "patternProperties",
              schemaProp: v,
              dataProp: b,
              dataPropType: n.Type.Str
            }, _), d.opts.unevaluated && h !== !0 ? i.assign((0, t._)`${h}[${b}]`, !0) : !y && !d.allErrors && i.if((0, t.not)(_), () => i.break());
          });
        });
      }
    }
  };
  return gn.default = o, gn;
}
var _n = {}, ba;
function i_() {
  if (ba) return _n;
  ba = 1, Object.defineProperty(_n, "__esModule", { value: !0 });
  const e = le(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(r) {
      const { gen: n, schema: o, it: s } = r;
      if ((0, e.alwaysValidSchema)(s, o)) {
        r.fail();
        return;
      }
      const i = n.name("valid");
      r.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, i), r.failResult(i, () => r.reset(), () => r.error());
    },
    error: { message: "must NOT be valid" }
  };
  return _n.default = t, _n;
}
var yn = {}, $a;
function a_() {
  if ($a) return yn;
  $a = 1, Object.defineProperty(yn, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: _t().validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return yn.default = t, yn;
}
var vn = {}, Sa;
function c_() {
  if (Sa) return vn;
  Sa = 1, Object.defineProperty(vn, "__esModule", { value: !0 });
  const e = ie(), t = le(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: o }) => (0, e._)`{passingSchemas: ${o.passing}}`
    },
    code(o) {
      const { gen: s, schema: i, parentSchema: a, it: c } = o;
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      if (c.opts.discriminator && a.discriminator)
        return;
      const l = i, d = s.let("valid", !1), m = s.let("passing", null), g = s.name("_valid");
      o.setParams({ passing: m }), s.block(w), o.result(d, () => o.reset(), () => o.error(!0));
      function w() {
        l.forEach((k, _) => {
          let h;
          (0, t.alwaysValidSchema)(c, k) ? s.var(g, !0) : h = o.subschema({
            keyword: "oneOf",
            schemaProp: _,
            compositeRule: !0
          }, g), _ > 0 && s.if((0, e._)`${g} && ${d}`).assign(d, !1).assign(m, (0, e._)`[${m}, ${_}]`).else(), s.if(g, () => {
            s.assign(d, !0), s.assign(m, _), h && o.mergeEvaluated(h, e.Name);
          });
        });
      }
    }
  };
  return vn.default = n, vn;
}
var wn = {}, ka;
function u_() {
  if (ka) return wn;
  ka = 1, Object.defineProperty(wn, "__esModule", { value: !0 });
  const e = le(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(r) {
      const { gen: n, schema: o, it: s } = r;
      if (!Array.isArray(o))
        throw new Error("ajv implementation error");
      const i = n.name("valid");
      o.forEach((a, c) => {
        if ((0, e.alwaysValidSchema)(s, a))
          return;
        const l = r.subschema({ keyword: "allOf", schemaProp: c }, i);
        r.ok(i), r.mergeEvaluated(l);
      });
    }
  };
  return wn.default = t, wn;
}
var bn = {}, Ea;
function l_() {
  if (Ea) return bn;
  Ea = 1, Object.defineProperty(bn, "__esModule", { value: !0 });
  const e = ie(), t = le(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: s }) => (0, e.str)`must match "${s.ifClause}" schema`,
      params: ({ params: s }) => (0, e._)`{failingKeyword: ${s.ifClause}}`
    },
    code(s) {
      const { gen: i, parentSchema: a, it: c } = s;
      a.then === void 0 && a.else === void 0 && (0, t.checkStrictMode)(c, '"if" without "then" and "else" is ignored');
      const l = o(c, "then"), d = o(c, "else");
      if (!l && !d)
        return;
      const m = i.let("valid", !0), g = i.name("_valid");
      if (w(), s.reset(), l && d) {
        const _ = i.let("ifClause");
        s.setParams({ ifClause: _ }), i.if(g, k("then", _), k("else", _));
      } else l ? i.if(g, k("then")) : i.if((0, e.not)(g), k("else"));
      s.pass(m, () => s.error(!0));
      function w() {
        const _ = s.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, g);
        s.mergeEvaluated(_);
      }
      function k(_, h) {
        return () => {
          const f = s.subschema({ keyword: _ }, g);
          i.assign(m, g), s.mergeValidEvaluated(f, m), h ? i.assign(h, (0, e._)`${_}`) : s.setParams({ ifClause: _ });
        };
      }
    }
  };
  function o(s, i) {
    const a = s.schema[i];
    return a !== void 0 && !(0, t.alwaysValidSchema)(s, a);
  }
  return bn.default = n, bn;
}
var $n = {}, Ca;
function d_() {
  if (Ca) return $n;
  Ca = 1, Object.defineProperty($n, "__esModule", { value: !0 });
  const e = le(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: r, parentSchema: n, it: o }) {
      n.if === void 0 && (0, e.checkStrictMode)(o, `"${r}" without "if" is ignored`);
    }
  };
  return $n.default = t, $n;
}
var Ta;
function f_() {
  if (Ta) return un;
  Ta = 1, Object.defineProperty(un, "__esModule", { value: !0 });
  const e = gu(), t = Yg(), r = _u(), n = e_(), o = t_(), s = r_(), i = n_(), a = yu(), c = o_(), l = s_(), d = i_(), m = a_(), g = c_(), w = u_(), k = l_(), _ = d_();
  function h(f = !1) {
    const u = [
      // any
      d.default,
      m.default,
      g.default,
      w.default,
      k.default,
      _.default,
      // object
      i.default,
      a.default,
      s.default,
      c.default,
      l.default
    ];
    return f ? u.push(t.default, n.default) : u.push(e.default, r.default), u.push(o.default), u;
  }
  return un.default = h, un;
}
var Sn = {}, kn = {}, Pa;
function h_() {
  if (Pa) return kn;
  Pa = 1, Object.defineProperty(kn, "__esModule", { value: !0 });
  const e = ie(), r = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, o) {
      const { gen: s, data: i, $data: a, schema: c, schemaCode: l, it: d } = n, { opts: m, errSchemaPath: g, schemaEnv: w, self: k } = d;
      if (!m.validateFormats)
        return;
      a ? _() : h();
      function _() {
        const f = s.scopeValue("formats", {
          ref: k.formats,
          code: m.code.formats
        }), u = s.const("fDef", (0, e._)`${f}[${l}]`), p = s.let("fType"), v = s.let("format");
        s.if((0, e._)`typeof ${u} == "object" && !(${u} instanceof RegExp)`, () => s.assign(p, (0, e._)`${u}.type || "string"`).assign(v, (0, e._)`${u}.validate`), () => s.assign(p, (0, e._)`"string"`).assign(v, u)), n.fail$data((0, e.or)(b(), y()));
        function b() {
          return m.strictSchema === !1 ? e.nil : (0, e._)`${l} && !${v}`;
        }
        function y() {
          const S = w.$async ? (0, e._)`(${u}.async ? await ${v}(${i}) : ${v}(${i}))` : (0, e._)`${v}(${i})`, T = (0, e._)`(typeof ${v} == "function" ? ${S} : ${v}.test(${i}))`;
          return (0, e._)`${v} && ${v} !== true && ${p} === ${o} && !${T}`;
        }
      }
      function h() {
        const f = k.formats[c];
        if (!f) {
          b();
          return;
        }
        if (f === !0)
          return;
        const [u, p, v] = y(f);
        u === o && n.pass(S());
        function b() {
          if (m.strictSchema === !1) {
            k.logger.warn(T());
            return;
          }
          throw new Error(T());
          function T() {
            return `unknown format "${c}" ignored in schema at path "${g}"`;
          }
        }
        function y(T) {
          const O = T instanceof RegExp ? (0, e.regexpCode)(T) : m.code.formats ? (0, e._)`${m.code.formats}${(0, e.getProperty)(c)}` : void 0, F = s.scopeValue("formats", { key: c, ref: T, code: O });
          return typeof T == "object" && !(T instanceof RegExp) ? [T.type || "string", T.validate, (0, e._)`${F}.validate`] : ["string", T, F];
        }
        function S() {
          if (typeof f == "object" && !(f instanceof RegExp) && f.async) {
            if (!w.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${v}(${i})`;
          }
          return typeof p == "function" ? (0, e._)`${v}(${i})` : (0, e._)`${v}.test(${i})`;
        }
      }
    }
  };
  return kn.default = r, kn;
}
var Aa;
function p_() {
  if (Aa) return Sn;
  Aa = 1, Object.defineProperty(Sn, "__esModule", { value: !0 });
  const t = [h_().default];
  return Sn.default = t, Sn;
}
var qt = {}, Ra;
function m_() {
  return Ra || (Ra = 1, Object.defineProperty(qt, "__esModule", { value: !0 }), qt.contentVocabulary = qt.metadataVocabulary = void 0, qt.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], qt.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), qt;
}
var Ia;
function g_() {
  if (Ia) return Wr;
  Ia = 1, Object.defineProperty(Wr, "__esModule", { value: !0 });
  const e = Ug(), t = Xg(), r = f_(), n = p_(), o = m_(), s = [
    e.default,
    t.default,
    (0, r.default)(),
    n.default,
    o.metadataVocabulary,
    o.contentVocabulary
  ];
  return Wr.default = s, Wr;
}
var En = {}, yr = {}, Oa;
function __() {
  if (Oa) return yr;
  Oa = 1, Object.defineProperty(yr, "__esModule", { value: !0 }), yr.DiscrError = void 0;
  var e;
  return function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  }(e || (yr.DiscrError = e = {})), yr;
}
var za;
function y_() {
  if (za) return En;
  za = 1, Object.defineProperty(En, "__esModule", { value: !0 });
  const e = ie(), t = __(), r = xs(), n = so(), o = le(), i = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: a, tagName: c } }) => a === t.DiscrError.Tag ? `tag "${c}" must be string` : `value of tag "${c}" must be in oneOf`,
      params: ({ params: { discrError: a, tag: c, tagName: l } }) => (0, e._)`{error: ${a}, tag: ${l}, tagValue: ${c}}`
    },
    code(a) {
      const { gen: c, data: l, schema: d, parentSchema: m, it: g } = a, { oneOf: w } = m;
      if (!g.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const k = d.propertyName;
      if (typeof k != "string")
        throw new Error("discriminator: requires propertyName");
      if (d.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!w)
        throw new Error("discriminator: requires oneOf keyword");
      const _ = c.let("valid", !1), h = c.const("tag", (0, e._)`${l}${(0, e.getProperty)(k)}`);
      c.if((0, e._)`typeof ${h} == "string"`, () => f(), () => a.error(!1, { discrError: t.DiscrError.Tag, tag: h, tagName: k })), a.ok(_);
      function f() {
        const v = p();
        c.if(!1);
        for (const b in v)
          c.elseIf((0, e._)`${h} === ${b}`), c.assign(_, u(v[b]));
        c.else(), a.error(!1, { discrError: t.DiscrError.Mapping, tag: h, tagName: k }), c.endIf();
      }
      function u(v) {
        const b = c.name("valid"), y = a.subschema({ keyword: "oneOf", schemaProp: v }, b);
        return a.mergeEvaluated(y, e.Name), b;
      }
      function p() {
        var v;
        const b = {}, y = T(m);
        let S = !0;
        for (let M = 0; M < w.length; M++) {
          let U = w[M];
          if (U != null && U.$ref && !(0, o.schemaHasRulesButRef)(U, g.self.RULES)) {
            const H = U.$ref;
            if (U = r.resolveRef.call(g.self, g.schemaEnv.root, g.baseId, H), U instanceof r.SchemaEnv && (U = U.schema), U === void 0)
              throw new n.default(g.opts.uriResolver, g.baseId, H);
          }
          const q = (v = U == null ? void 0 : U.properties) === null || v === void 0 ? void 0 : v[k];
          if (typeof q != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${k}"`);
          S = S && (y || T(U)), O(q, M);
        }
        if (!S)
          throw new Error(`discriminator: "${k}" must be required`);
        return b;
        function T({ required: M }) {
          return Array.isArray(M) && M.includes(k);
        }
        function O(M, U) {
          if (M.const)
            F(M.const, U);
          else if (M.enum)
            for (const q of M.enum)
              F(q, U);
          else
            throw new Error(`discriminator: "properties/${k}" must have "const" or "enum"`);
        }
        function F(M, U) {
          if (typeof M != "string" || M in b)
            throw new Error(`discriminator: "${k}" values must be unique strings`);
          b[M] = U;
        }
      }
    }
  };
  return En.default = i, En;
}
const v_ = "http://json-schema.org/draft-07/schema#", w_ = "http://json-schema.org/draft-07/schema#", b_ = "Core schema meta-schema", $_ = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, S_ = ["object", "boolean"], k_ = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, E_ = {
  $schema: v_,
  $id: w_,
  title: b_,
  definitions: $_,
  type: S_,
  properties: k_,
  default: !0
};
var Na;
function vu() {
  return Na || (Na = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const r = qg(), n = g_(), o = y_(), s = E_, i = ["/properties"], a = "http://json-schema.org/draft-07/schema";
    class c extends r.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((k) => this.addVocabulary(k)), this.opts.discriminator && this.addKeyword(o.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const k = this.opts.$data ? this.$dataMetaSchema(s, i) : s;
        this.addMetaSchema(k, a, !1), this.refs["http://json-schema.org/schema"] = a;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
      }
    }
    t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
    var l = oo();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return l.KeywordCxt;
    } });
    var d = ie();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return d._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return d.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return d.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return d.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return d.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return d.CodeGen;
    } });
    var m = Ds();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return m.default;
    } });
    var g = so();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return g.default;
    } });
  }(Fr, Fr.exports)), Fr.exports;
}
var C_ = vu();
const T_ = /* @__PURE__ */ Ga(C_);
var Cn = { exports: {} }, Co = {}, Ma;
function P_() {
  return Ma || (Ma = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(M, U) {
      return { validate: M, compare: U };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(s, i),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(c(!0), l),
      "date-time": t(g(!0), w),
      "iso-time": t(c(), d),
      "iso-date-time": t(g(), k),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: f,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex: F,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte: p,
      // signed 32 bit integer
      int32: { type: "number", validate: y },
      // signed 64 bit integer
      int64: { type: "number", validate: S },
      // C-type float
      float: { type: "number", validate: T },
      // C-type double
      double: { type: "number", validate: T },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, l),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, w),
      "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, d),
      "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, k),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function r(M) {
      return M % 4 === 0 && (M % 100 !== 0 || M % 400 === 0);
    }
    const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, o = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function s(M) {
      const U = n.exec(M);
      if (!U)
        return !1;
      const q = +U[1], H = +U[2], Y = +U[3];
      return H >= 1 && H <= 12 && Y >= 1 && Y <= (H === 2 && r(q) ? 29 : o[H]);
    }
    function i(M, U) {
      if (M && U)
        return M > U ? 1 : M < U ? -1 : 0;
    }
    const a = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function c(M) {
      return function(q) {
        const H = a.exec(q);
        if (!H)
          return !1;
        const Y = +H[1], ke = +H[2], Te = +H[3], oe = H[4], Ve = H[5] === "-" ? -1 : 1, L = +(H[6] || 0), A = +(H[7] || 0);
        if (L > 23 || A > 59 || M && !oe)
          return !1;
        if (Y <= 23 && ke <= 59 && Te < 60)
          return !0;
        const D = ke - A * Ve, I = Y - L * Ve - (D < 0 ? 1 : 0);
        return (I === 23 || I === -1) && (D === 59 || D === -1) && Te < 61;
      };
    }
    function l(M, U) {
      if (!(M && U))
        return;
      const q = (/* @__PURE__ */ new Date("2020-01-01T" + M)).valueOf(), H = (/* @__PURE__ */ new Date("2020-01-01T" + U)).valueOf();
      if (q && H)
        return q - H;
    }
    function d(M, U) {
      if (!(M && U))
        return;
      const q = a.exec(M), H = a.exec(U);
      if (q && H)
        return M = q[1] + q[2] + q[3], U = H[1] + H[2] + H[3], M > U ? 1 : M < U ? -1 : 0;
    }
    const m = /t|\s/i;
    function g(M) {
      const U = c(M);
      return function(H) {
        const Y = H.split(m);
        return Y.length === 2 && s(Y[0]) && U(Y[1]);
      };
    }
    function w(M, U) {
      if (!(M && U))
        return;
      const q = new Date(M).valueOf(), H = new Date(U).valueOf();
      if (q && H)
        return q - H;
    }
    function k(M, U) {
      if (!(M && U))
        return;
      const [q, H] = M.split(m), [Y, ke] = U.split(m), Te = i(q, Y);
      if (Te !== void 0)
        return Te || l(H, ke);
    }
    const _ = /\/|:/, h = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function f(M) {
      return _.test(M) && h.test(M);
    }
    const u = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function p(M) {
      return u.lastIndex = 0, u.test(M);
    }
    const v = -2147483648, b = 2 ** 31 - 1;
    function y(M) {
      return Number.isInteger(M) && M <= b && M >= v;
    }
    function S(M) {
      return Number.isInteger(M);
    }
    function T() {
      return !0;
    }
    const O = /[^\\]\\Z/;
    function F(M) {
      if (O.test(M))
        return !1;
      try {
        return new RegExp(M), !0;
      } catch {
        return !1;
      }
    }
  }(Co)), Co;
}
var To = {}, ja;
function A_() {
  return ja || (ja = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = vu(), r = ie(), n = r.operators, o = {
      formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
      formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
      formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
    }, s = {
      message: ({ keyword: a, schemaCode: c }) => (0, r.str)`should be ${o[a].okStr} ${c}`,
      params: ({ keyword: a, schemaCode: c }) => (0, r._)`{comparison: ${o[a].okStr}, limit: ${c}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(o),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: s,
      code(a) {
        const { gen: c, data: l, schemaCode: d, keyword: m, it: g } = a, { opts: w, self: k } = g;
        if (!w.validateFormats)
          return;
        const _ = new t.KeywordCxt(g, k.RULES.all.format.definition, "format");
        _.$data ? h() : f();
        function h() {
          const p = c.scopeValue("formats", {
            ref: k.formats,
            code: w.code.formats
          }), v = c.const("fmt", (0, r._)`${p}[${_.schemaCode}]`);
          a.fail$data((0, r.or)((0, r._)`typeof ${v} != "object"`, (0, r._)`${v} instanceof RegExp`, (0, r._)`typeof ${v}.compare != "function"`, u(v)));
        }
        function f() {
          const p = _.schema, v = k.formats[p];
          if (!v || v === !0)
            return;
          if (typeof v != "object" || v instanceof RegExp || typeof v.compare != "function")
            throw new Error(`"${m}": format "${p}" does not define "compare" function`);
          const b = c.scopeValue("formats", {
            key: p,
            ref: v,
            code: w.code.formats ? (0, r._)`${w.code.formats}${(0, r.getProperty)(p)}` : void 0
          });
          a.fail$data(u(b));
        }
        function u(p) {
          return (0, r._)`${p}.compare(${l}, ${d}) ${o[m].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const i = (a) => (a.addKeyword(e.formatLimitDefinition), a);
    e.default = i;
  }(To)), To;
}
var qa;
function R_() {
  return qa || (qa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const r = P_(), n = A_(), o = ie(), s = new o.Name("fullFormats"), i = new o.Name("fastFormats"), a = (l, d = { keywords: !0 }) => {
      if (Array.isArray(d))
        return c(l, d, r.fullFormats, s), l;
      const [m, g] = d.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, s], w = d.formats || r.formatNames;
      return c(l, w, m, g), d.keywords && (0, n.default)(l), l;
    };
    a.get = (l, d = "full") => {
      const g = (d === "fast" ? r.fastFormats : r.fullFormats)[l];
      if (!g)
        throw new Error(`Unknown format "${l}"`);
      return g;
    };
    function c(l, d, m, g) {
      var w, k;
      (w = (k = l.opts.code).formats) !== null && w !== void 0 || (k.formats = (0, o._)`require("ajv-formats/dist/formats").${g}`);
      for (const _ of d)
        l.addFormat(_, m[_]);
    }
    e.exports = t = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
  }(Cn, Cn.exports)), Cn.exports;
}
var I_ = R_();
const O_ = /* @__PURE__ */ Ga(I_);
function z_() {
  const e = new T_({
    strict: !1,
    validateFormats: !0,
    validateSchema: !1,
    allErrors: !0
  });
  return O_(e), e;
}
class N_ {
  /**
   * Create an AJV validator
   *
   * @param ajv - Optional pre-configured AJV instance. If not provided, a default instance will be created.
   *
   * @example
   * ```typescript
   * // Use default configuration (recommended for most cases)
   * import { AjvJsonSchemaValidator } from '@modelcontextprotocol/sdk/validation/ajv';
   * const validator = new AjvJsonSchemaValidator();
   *
   * // Or provide custom AJV instance for advanced configuration
   * import { Ajv } from 'ajv';
   * import addFormats from 'ajv-formats';
   *
   * const ajv = new Ajv({ validateFormats: true });
   * addFormats(ajv);
   * const validator = new AjvJsonSchemaValidator(ajv);
   * ```
   */
  constructor(t) {
    this._ajv = t ?? z_();
  }
  /**
   * Create a validator for the given JSON Schema
   *
   * The validator is compiled once and can be reused multiple times.
   * If the schema has an $id, it will be cached by AJV automatically.
   *
   * @param schema - Standard JSON Schema object
   * @returns A validator function that validates input data
   */
  getValidator(t) {
    const r = "$id" in t && typeof t.$id == "string" ? this._ajv.getSchema(t.$id) ?? this._ajv.compile(t) : this._ajv.compile(t);
    return (n) => r(n) ? {
      valid: !0,
      data: n,
      errorMessage: void 0
    } : {
      valid: !1,
      data: void 0,
      errorMessage: this._ajv.errorsText(r.errors)
    };
  }
}
class M_ {
  constructor(t) {
    this._client = t;
  }
  /**
   * Calls a tool and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * This method provides streaming access to tool execution, allowing you to
   * observe intermediate task status updates for long-running tool calls.
   * Automatically validates structured output if the tool has an outputSchema.
   *
   * @example
   * ```typescript
   * const stream = client.experimental.tasks.callToolStream({ name: 'myTool', arguments: {} });
   * for await (const message of stream) {
   *   switch (message.type) {
   *     case 'taskCreated':
   *       console.log('Tool execution started:', message.task.taskId);
   *       break;
   *     case 'taskStatus':
   *       console.log('Tool status:', message.task.status);
   *       break;
   *     case 'result':
   *       console.log('Tool result:', message.result);
   *       break;
   *     case 'error':
   *       console.error('Tool error:', message.error);
   *       break;
   *   }
   * }
   * ```
   *
   * @param params - Tool call parameters (name and arguments)
   * @param resultSchema - Zod schema for validating the result (defaults to CallToolResultSchema)
   * @param options - Optional request options (timeout, signal, task creation params, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  async *callToolStream(t, r = to, n) {
    const o = this._client, s = {
      ...n,
      // We check if the tool is known to be a task during auto-configuration, but assume
      // the caller knows what they're doing if they pass this explicitly
      task: (n == null ? void 0 : n.task) ?? (o.isToolTask(t.name) ? {} : void 0)
    }, i = o.requestStream({ method: "tools/call", params: t }, r, s), a = o.getToolOutputValidator(t.name);
    for await (const c of i) {
      if (c.type === "result" && a) {
        const l = c.result;
        if (!l.structuredContent && !l.isError) {
          yield {
            type: "error",
            error: new ee(ne.InvalidRequest, `Tool ${t.name} has an output schema but did not return structured content`)
          };
          return;
        }
        if (l.structuredContent)
          try {
            const d = a(l.structuredContent);
            if (!d.valid) {
              yield {
                type: "error",
                error: new ee(ne.InvalidParams, `Structured content does not match the tool's output schema: ${d.errorMessage}`)
              };
              return;
            }
          } catch (d) {
            if (d instanceof ee) {
              yield { type: "error", error: d };
              return;
            }
            yield {
              type: "error",
              error: new ee(ne.InvalidParams, `Failed to validate structured content: ${d instanceof Error ? d.message : String(d)}`)
            };
            return;
          }
      }
      yield c;
    }
  }
  /**
   * Gets the current status of a task.
   *
   * @param taskId - The task identifier
   * @param options - Optional request options
   * @returns The task status
   *
   * @experimental
   */
  async getTask(t, r) {
    return this._client.getTask({ taskId: t }, r);
  }
  /**
   * Retrieves the result of a completed task.
   *
   * @param taskId - The task identifier
   * @param resultSchema - Zod schema for validating the result
   * @param options - Optional request options
   * @returns The task result
   *
   * @experimental
   */
  async getTaskResult(t, r, n) {
    return this._client.getTaskResult({ taskId: t }, r, n);
  }
  /**
   * Lists tasks with optional pagination.
   *
   * @param cursor - Optional pagination cursor
   * @param options - Optional request options
   * @returns List of tasks with optional next cursor
   *
   * @experimental
   */
  async listTasks(t, r) {
    return this._client.listTasks(t ? { cursor: t } : void 0, r);
  }
  /**
   * Cancels a running task.
   *
   * @param taskId - The task identifier
   * @param options - Optional request options
   *
   * @experimental
   */
  async cancelTask(t, r) {
    return this._client.cancelTask({ taskId: t }, r);
  }
  /**
   * Sends a request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * This method provides streaming access to request processing, allowing you to
   * observe intermediate task status updates for task-augmented requests.
   *
   * @param request - The request to send
   * @param resultSchema - Zod schema for validating the result
   * @param options - Optional request options (timeout, signal, task creation params, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  requestStream(t, r, n) {
    return this._client.requestStream(t, r, n);
  }
}
function j_(e, t, r) {
  var n;
  if (!e)
    throw new Error(`${r} does not support task creation (required for ${t})`);
  switch (t) {
    case "tools/call":
      if (!((n = e.tools) != null && n.call))
        throw new Error(`${r} does not support task creation for tools/call (required for ${t})`);
      break;
  }
}
function q_(e, t, r) {
  var n, o;
  if (!e)
    throw new Error(`${r} does not support task creation (required for ${t})`);
  switch (t) {
    case "sampling/createMessage":
      if (!((n = e.sampling) != null && n.createMessage))
        throw new Error(`${r} does not support task creation for sampling/createMessage (required for ${t})`);
      break;
    case "elicitation/create":
      if (!((o = e.elicitation) != null && o.create))
        throw new Error(`${r} does not support task creation for elicitation/create (required for ${t})`);
      break;
  }
}
function An(e, t) {
  if (!(!e || t === null || typeof t != "object")) {
    if (e.type === "object" && e.properties && typeof e.properties == "object") {
      const r = t, n = e.properties;
      for (const o of Object.keys(n)) {
        const s = n[o];
        r[o] === void 0 && Object.prototype.hasOwnProperty.call(s, "default") && (r[o] = s.default), r[o] !== void 0 && An(s, r[o]);
      }
    }
    if (Array.isArray(e.anyOf))
      for (const r of e.anyOf)
        typeof r != "boolean" && An(r, t);
    if (Array.isArray(e.oneOf))
      for (const r of e.oneOf)
        typeof r != "boolean" && An(r, t);
  }
}
function D_(e) {
  if (!e)
    return { supportsFormMode: !1, supportsUrlMode: !1 };
  const t = e.form !== void 0, r = e.url !== void 0;
  return { supportsFormMode: t || !t && !r, supportsUrlMode: r };
}
class x_ extends yg {
  /**
   * Initializes this client with the given name and version information.
   */
  constructor(t, r) {
    super(r), this._clientInfo = t, this._cachedToolOutputValidators = /* @__PURE__ */ new Map(), this._cachedKnownTaskTools = /* @__PURE__ */ new Set(), this._cachedRequiredTaskTools = /* @__PURE__ */ new Set(), this._listChangedDebounceTimers = /* @__PURE__ */ new Map(), this._capabilities = (r == null ? void 0 : r.capabilities) ?? {}, this._jsonSchemaValidator = (r == null ? void 0 : r.jsonSchemaValidator) ?? new N_(), r != null && r.listChanged && (this._pendingListChangedConfig = r.listChanged);
  }
  /**
   * Set up handlers for list changed notifications based on config and server capabilities.
   * This should only be called after initialization when server capabilities are known.
   * Handlers are silently skipped if the server doesn't advertise the corresponding listChanged capability.
   * @internal
   */
  _setupListChangedHandlers(t) {
    var r, n, o, s, i, a;
    t.tools && ((n = (r = this._serverCapabilities) == null ? void 0 : r.tools) != null && n.listChanged) && this._setupListChangedHandler("tools", su, t.tools, async () => (await this.listTools()).tools), t.prompts && ((s = (o = this._serverCapabilities) == null ? void 0 : o.prompts) != null && s.listChanged) && this._setupListChangedHandler("prompts", ru, t.prompts, async () => (await this.listPrompts()).prompts), t.resources && ((a = (i = this._serverCapabilities) == null ? void 0 : i.resources) != null && a.listChanged) && this._setupListChangedHandler("resources", Yc, t.resources, async () => (await this.listResources()).resources);
  }
  /**
   * Access experimental features.
   *
   * WARNING: These APIs are experimental and may change without notice.
   *
   * @experimental
   */
  get experimental() {
    return this._experimental || (this._experimental = {
      tasks: new M_(this)
    }), this._experimental;
  }
  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  registerCapabilities(t) {
    if (this.transport)
      throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = vg(this._capabilities, t);
  }
  /**
   * Override request handler registration to enforce client-side validation for elicitation.
   */
  setRequestHandler(t, r) {
    var a;
    const n = Cc(t), o = n == null ? void 0 : n.method;
    if (!o)
      throw new Error("Schema is missing a method literal");
    let s;
    if (Qn(o)) {
      const c = o, l = (a = c._zod) == null ? void 0 : a.def;
      s = (l == null ? void 0 : l.value) ?? c.value;
    } else {
      const c = o, l = c._def;
      s = (l == null ? void 0 : l.value) ?? c.value;
    }
    if (typeof s != "string")
      throw new Error("Schema method literal must be a string");
    const i = s;
    if (i === "elicitation/create") {
      const c = async (l, d) => {
        var p, v;
        const m = Ct(lu, l);
        if (!m.success) {
          const b = m.error instanceof Error ? m.error.message : String(m.error);
          throw new ee(ne.InvalidParams, `Invalid elicitation request: ${b}`);
        }
        const { params: g } = m.data;
        g.mode = g.mode ?? "form";
        const { supportsFormMode: w, supportsUrlMode: k } = D_(this._capabilities.elicitation);
        if (g.mode === "form" && !w)
          throw new ee(ne.InvalidParams, "Client does not support form-mode elicitation requests");
        if (g.mode === "url" && !k)
          throw new ee(ne.InvalidParams, "Client does not support URL-mode elicitation requests");
        const _ = await Promise.resolve(r(l, d));
        if (g.task) {
          const b = Ct(Ar, _);
          if (!b.success) {
            const y = b.error instanceof Error ? b.error.message : String(b.error);
            throw new ee(ne.InvalidParams, `Invalid task creation result: ${y}`);
          }
          return b.data;
        }
        const h = Ct(du, _);
        if (!h.success) {
          const b = h.error instanceof Error ? h.error.message : String(h.error);
          throw new ee(ne.InvalidParams, `Invalid elicitation result: ${b}`);
        }
        const f = h.data, u = g.mode === "form" ? g.requestedSchema : void 0;
        if (g.mode === "form" && f.action === "accept" && f.content && u && (v = (p = this._capabilities.elicitation) == null ? void 0 : p.form) != null && v.applyDefaults)
          try {
            An(u, f.content);
          } catch {
          }
        return f;
      };
      return super.setRequestHandler(t, c);
    }
    if (i === "sampling/createMessage") {
      const c = async (l, d) => {
        const m = Ct(cu, l);
        if (!m.success) {
          const _ = m.error instanceof Error ? m.error.message : String(m.error);
          throw new ee(ne.InvalidParams, `Invalid sampling request: ${_}`);
        }
        const { params: g } = m.data, w = await Promise.resolve(r(l, d));
        if (g.task) {
          const _ = Ct(Ar, w);
          if (!_.success) {
            const h = _.error instanceof Error ? _.error.message : String(_.error);
            throw new ee(ne.InvalidParams, `Invalid task creation result: ${h}`);
          }
          return _.data;
        }
        const k = Ct(uu, w);
        if (!k.success) {
          const _ = k.error instanceof Error ? k.error.message : String(k.error);
          throw new ee(ne.InvalidParams, `Invalid sampling result: ${_}`);
        }
        return k.data;
      };
      return super.setRequestHandler(t, c);
    }
    return super.setRequestHandler(t, r);
  }
  assertCapability(t, r) {
    var n;
    if (!((n = this._serverCapabilities) != null && n[t]))
      throw new Error(`Server does not support ${t} (required for ${r})`);
  }
  async connect(t, r) {
    if (await super.connect(t), t.sessionId === void 0)
      try {
        const n = await this.request({
          method: "initialize",
          params: {
            protocolVersion: Xn,
            capabilities: this._capabilities,
            clientInfo: this._clientInfo
          }
        }, Vc, r);
        if (n === void 0)
          throw new Error(`Server sent invalid initialize result: ${n}`);
        if (!xp.includes(n.protocolVersion))
          throw new Error(`Server's protocol version is not supported: ${n.protocolVersion}`);
        this._serverCapabilities = n.capabilities, this._serverVersion = n.serverInfo, t.setProtocolVersion && t.setProtocolVersion(n.protocolVersion), this._instructions = n.instructions, await this.notification({
          method: "notifications/initialized"
        }), this._pendingListChangedConfig && (this._setupListChangedHandlers(this._pendingListChangedConfig), this._pendingListChangedConfig = void 0);
      } catch (n) {
        throw this.close(), n;
      }
  }
  /**
   * After initialization has completed, this will be populated with the server's reported capabilities.
   */
  getServerCapabilities() {
    return this._serverCapabilities;
  }
  /**
   * After initialization has completed, this will be populated with information about the server's name and version.
   */
  getServerVersion() {
    return this._serverVersion;
  }
  /**
   * After initialization has completed, this may be populated with information about the server's instructions.
   */
  getInstructions() {
    return this._instructions;
  }
  assertCapabilityForMethod(t) {
    var r, n, o, s, i;
    switch (t) {
      case "logging/setLevel":
        if (!((r = this._serverCapabilities) != null && r.logging))
          throw new Error(`Server does not support logging (required for ${t})`);
        break;
      case "prompts/get":
      case "prompts/list":
        if (!((n = this._serverCapabilities) != null && n.prompts))
          throw new Error(`Server does not support prompts (required for ${t})`);
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
      case "resources/subscribe":
      case "resources/unsubscribe":
        if (!((o = this._serverCapabilities) != null && o.resources))
          throw new Error(`Server does not support resources (required for ${t})`);
        if (t === "resources/subscribe" && !this._serverCapabilities.resources.subscribe)
          throw new Error(`Server does not support resource subscriptions (required for ${t})`);
        break;
      case "tools/call":
      case "tools/list":
        if (!((s = this._serverCapabilities) != null && s.tools))
          throw new Error(`Server does not support tools (required for ${t})`);
        break;
      case "completion/complete":
        if (!((i = this._serverCapabilities) != null && i.completions))
          throw new Error(`Server does not support completions (required for ${t})`);
        break;
    }
  }
  assertNotificationCapability(t) {
    var r;
    switch (t) {
      case "notifications/roots/list_changed":
        if (!((r = this._capabilities.roots) != null && r.listChanged))
          throw new Error(`Client does not support roots list changed notifications (required for ${t})`);
        break;
    }
  }
  assertRequestHandlerCapability(t) {
    if (this._capabilities)
      switch (t) {
        case "sampling/createMessage":
          if (!this._capabilities.sampling)
            throw new Error(`Client does not support sampling capability (required for ${t})`);
          break;
        case "elicitation/create":
          if (!this._capabilities.elicitation)
            throw new Error(`Client does not support elicitation capability (required for ${t})`);
          break;
        case "roots/list":
          if (!this._capabilities.roots)
            throw new Error(`Client does not support roots capability (required for ${t})`);
          break;
        case "tasks/get":
        case "tasks/list":
        case "tasks/result":
        case "tasks/cancel":
          if (!this._capabilities.tasks)
            throw new Error(`Client does not support tasks capability (required for ${t})`);
          break;
      }
  }
  assertTaskCapability(t) {
    var r, n;
    j_((n = (r = this._serverCapabilities) == null ? void 0 : r.tasks) == null ? void 0 : n.requests, t, "Server");
  }
  assertTaskHandlerCapability(t) {
    var r;
    this._capabilities && q_((r = this._capabilities.tasks) == null ? void 0 : r.requests, t, "Client");
  }
  async ping(t) {
    return this.request({ method: "ping" }, nr, t);
  }
  async complete(t, r) {
    return this.request({ method: "completion/complete", params: t }, fu, r);
  }
  async setLoggingLevel(t, r) {
    return this.request({ method: "logging/setLevel", params: { level: t } }, nr, r);
  }
  async getPrompt(t, r) {
    return this.request({ method: "prompts/get", params: t }, tu, r);
  }
  async listPrompts(t, r) {
    return this.request({ method: "prompts/list", params: t }, eu, r);
  }
  async listResources(t, r) {
    return this.request({ method: "resources/list", params: t }, Gc, r);
  }
  async listResourceTemplates(t, r) {
    return this.request({ method: "resources/templates/list", params: t }, Qc, r);
  }
  async readResource(t, r) {
    return this.request({ method: "resources/read", params: t }, Xc, r);
  }
  async subscribeResource(t, r) {
    return this.request({ method: "resources/subscribe", params: t }, nr, r);
  }
  async unsubscribeResource(t, r) {
    return this.request({ method: "resources/unsubscribe", params: t }, nr, r);
  }
  /**
   * Calls a tool and waits for the result. Automatically validates structured output if the tool has an outputSchema.
   *
   * For task-based execution with streaming behavior, use client.experimental.tasks.callToolStream() instead.
   */
  async callTool(t, r = to, n) {
    if (this.isToolTaskRequired(t.name))
      throw new ee(ne.InvalidRequest, `Tool "${t.name}" requires task-based execution. Use client.experimental.tasks.callToolStream() instead.`);
    const o = await this.request({ method: "tools/call", params: t }, r, n), s = this.getToolOutputValidator(t.name);
    if (s) {
      if (!o.structuredContent && !o.isError)
        throw new ee(ne.InvalidRequest, `Tool ${t.name} has an output schema but did not return structured content`);
      if (o.structuredContent)
        try {
          const i = s(o.structuredContent);
          if (!i.valid)
            throw new ee(ne.InvalidParams, `Structured content does not match the tool's output schema: ${i.errorMessage}`);
        } catch (i) {
          throw i instanceof ee ? i : new ee(ne.InvalidParams, `Failed to validate structured content: ${i instanceof Error ? i.message : String(i)}`);
        }
    }
    return o;
  }
  isToolTask(t) {
    var r, n, o, s;
    return (s = (o = (n = (r = this._serverCapabilities) == null ? void 0 : r.tasks) == null ? void 0 : n.requests) == null ? void 0 : o.tools) != null && s.call ? this._cachedKnownTaskTools.has(t) : !1;
  }
  /**
   * Check if a tool requires task-based execution.
   * Unlike isToolTask which includes 'optional' tools, this only checks for 'required'.
   */
  isToolTaskRequired(t) {
    return this._cachedRequiredTaskTools.has(t);
  }
  /**
   * Cache validators for tool output schemas.
   * Called after listTools() to pre-compile validators for better performance.
   */
  cacheToolMetadata(t) {
    var r;
    this._cachedToolOutputValidators.clear(), this._cachedKnownTaskTools.clear(), this._cachedRequiredTaskTools.clear();
    for (const n of t) {
      if (n.outputSchema)
        try {
          const s = this._jsonSchemaValidator.getValidator(n.outputSchema);
          this._cachedToolOutputValidators.set(n.name, s);
        } catch (s) {
          console.warn("[MCP SDK] Skipping outputSchema validation in CSP-restricted extension context:", n.name, s);
        }
      const o = (r = n.execution) == null ? void 0 : r.taskSupport;
      (o === "required" || o === "optional") && this._cachedKnownTaskTools.add(n.name), o === "required" && this._cachedRequiredTaskTools.add(n.name);
    }
  }
  /**
   * Get cached validator for a tool
   */
  getToolOutputValidator(t) {
    return this._cachedToolOutputValidators.get(t);
  }
  async listTools(t, r) {
    const n = await this.request({ method: "tools/list", params: t }, ou, r);
    return this.cacheToolMetadata(n.tools), n;
  }
  /**
   * Set up a single list changed handler.
   * @internal
   */
  _setupListChangedHandler(t, r, n, o) {
    const s = zm.safeParse(n);
    if (!s.success)
      throw new Error(`Invalid ${t} listChanged options: ${s.error.message}`);
    if (typeof n.onChanged != "function")
      throw new Error(`Invalid ${t} listChanged options: onChanged must be a function`);
    const { autoRefresh: i, debounceMs: a } = s.data, { onChanged: c } = n, l = async () => {
      if (!i) {
        c(null, null);
        return;
      }
      try {
        const m = await o();
        c(null, m);
      } catch (m) {
        const g = m instanceof Error ? m : new Error(String(m));
        c(g, null);
      }
    }, d = () => {
      if (a) {
        const m = this._listChangedDebounceTimers.get(t);
        m && clearTimeout(m);
        const g = setTimeout(l, a);
        this._listChangedDebounceTimers.set(t, g);
      } else
        l();
    };
    this.setNotificationHandler(r, d);
  }
  async sendRootsListChanged() {
    return this.notification({ method: "notifications/roots/list_changed" });
  }
}
const Da = nt("EventEmitter");
class wu {
  constructor() {
    J(this, "listeners", /* @__PURE__ */ new Map());
    J(this, "maxListeners", 100);
  }
  on(t, r) {
    this.listeners.has(t) || this.listeners.set(t, /* @__PURE__ */ new Set());
    const n = this.listeners.get(t);
    return n.size >= this.maxListeners && Da.warn(`EventEmitter: Maximum listeners (${this.maxListeners}) exceeded for event '${String(t)}'`), n.add(r), this;
  }
  off(t, r) {
    const n = this.listeners.get(t);
    return n && (n.delete(r), n.size === 0 && this.listeners.delete(t)), this;
  }
  once(t, r) {
    const n = (o) => (this.off(t, n), r(o));
    return this.on(t, n);
  }
  emit(t, r) {
    const n = this.listeners.get(t);
    return !n || n.size === 0 ? !1 : (n.forEach(async (o) => {
      try {
        await o(r);
      } catch (s) {
        Da.error(`EventEmitter: Error in listener for event '${String(t)}':`, s);
      }
    }), !0);
  }
  removeAllListeners(t) {
    return t !== void 0 ? this.listeners.delete(t) : this.listeners.clear(), this;
  }
  listenerCount(t) {
    var r;
    return ((r = this.listeners.get(t)) == null ? void 0 : r.size) ?? 0;
  }
  eventNames() {
    return Array.from(this.listeners.keys());
  }
  setMaxListeners(t) {
    return this.maxListeners = Math.max(0, t), this;
  }
  getMaxListeners() {
    return this.maxListeners;
  }
}
class xa extends Error {
  constructor(t, r) {
    super(t), this.name = "ParseError", this.type = r.type, this.field = r.field, this.value = r.value, this.line = r.line;
  }
}
function Po(e) {
}
function bu(e) {
  if (typeof e == "function")
    throw new TypeError(
      "`callbacks` must be an object, got a function instead. Did you mean `{onEvent: fn}`?"
    );
  const { onEvent: t = Po, onError: r = Po, onRetry: n = Po, onComment: o } = e;
  let s = "", i = !0, a, c = "", l = "";
  function d(_) {
    const h = i ? _.replace(/^\xEF\xBB\xBF/, "") : _, [f, u] = U_(`${s}${h}`);
    for (const p of f)
      m(p);
    s = u, i = !1;
  }
  function m(_) {
    if (_ === "") {
      w();
      return;
    }
    if (_.startsWith(":")) {
      o && o(_.slice(_.startsWith(": ") ? 2 : 1));
      return;
    }
    const h = _.indexOf(":");
    if (h !== -1) {
      const f = _.slice(0, h), u = _[h + 1] === " " ? 2 : 1, p = _.slice(h + u);
      g(f, p, _);
      return;
    }
    g(_, "", _);
  }
  function g(_, h, f) {
    switch (_) {
      case "event":
        l = h;
        break;
      case "data":
        c = `${c}${h}
`;
        break;
      case "id":
        a = h.includes("\0") ? void 0 : h;
        break;
      case "retry":
        /^\d+$/.test(h) ? n(parseInt(h, 10)) : r(
          new xa(`Invalid \`retry\` value: "${h}"`, {
            type: "invalid-retry",
            value: h,
            line: f
          })
        );
        break;
      default:
        r(
          new xa(
            `Unknown field "${_.length > 20 ? `${_.slice(0, 20)}…` : _}"`,
            { type: "unknown-field", field: _, value: h, line: f }
          )
        );
        break;
    }
  }
  function w() {
    c.length > 0 && t({
      id: a,
      event: l || void 0,
      // If the data buffer's last character is a U+000A LINE FEED (LF) character,
      // then remove the last character from the data buffer.
      data: c.endsWith(`
`) ? c.slice(0, -1) : c
    }), a = void 0, c = "", l = "";
  }
  function k(_ = {}) {
    s && _.consume && m(s), i = !0, a = void 0, c = "", l = "", s = "";
  }
  return { feed: d, reset: k };
}
function U_(e) {
  const t = [];
  let r = "", n = 0;
  for (; n < e.length; ) {
    const o = e.indexOf("\r", n), s = e.indexOf(`
`, n);
    let i = -1;
    if (o !== -1 && s !== -1 ? i = Math.min(o, s) : o !== -1 ? i = o : s !== -1 && (i = s), i === -1) {
      r = e.slice(n);
      break;
    } else {
      const a = e.slice(n, i);
      t.push(a), n = i + 1, e[n - 1] === "\r" && e[n] === `
` && n++;
    }
  }
  return [t, r];
}
class Ua extends Event {
  /**
   * Constructs a new `ErrorEvent` instance. This is typically not called directly,
   * but rather emitted by the `EventSource` object when an error occurs.
   *
   * @param type - The type of the event (should be "error")
   * @param errorEventInitDict - Optional properties to include in the error event
   */
  constructor(t, r) {
    var n, o;
    super(t), this.code = (n = r == null ? void 0 : r.code) != null ? n : void 0, this.message = (o = r == null ? void 0 : r.message) != null ? o : void 0;
  }
  /**
   * Node.js "hides" the `message` and `code` properties of the `ErrorEvent` instance,
   * when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
   * we explicitly include the properties in the `inspect` method.
   *
   * This is automatically called by Node.js when you `console.log` an instance of this class.
   *
   * @param _depth - The current depth
   * @param options - The options passed to `util.inspect`
   * @param inspect - The inspect function to use (prevents having to import it from `util`)
   * @returns A string representation of the error
   */
  [Symbol.for("nodejs.util.inspect.custom")](t, r, n) {
    return n(Fa(this), r);
  }
  /**
   * Deno "hides" the `message` and `code` properties of the `ErrorEvent` instance,
   * when it is `console.log`'ed. This makes it harder to debug errors. To ease debugging,
   * we explicitly include the properties in the `inspect` method.
   *
   * This is automatically called by Deno when you `console.log` an instance of this class.
   *
   * @param inspect - The inspect function to use (prevents having to import it from `util`)
   * @param options - The options passed to `Deno.inspect`
   * @returns A string representation of the error
   */
  [Symbol.for("Deno.customInspect")](t, r) {
    return t(Fa(this), r);
  }
}
function F_(e) {
  const t = globalThis.DOMException;
  return typeof t == "function" ? new t(e, "SyntaxError") : new SyntaxError(e);
}
function Fo(e) {
  return e instanceof Error ? "errors" in e && Array.isArray(e.errors) ? e.errors.map(Fo).join(", ") : "cause" in e && e.cause instanceof Error ? `${e}: ${Fo(e.cause)}` : e.message : `${e}`;
}
function Fa(e) {
  return {
    type: e.type,
    message: e.message,
    code: e.code,
    defaultPrevented: e.defaultPrevented,
    cancelable: e.cancelable,
    timeStamp: e.timeStamp
  };
}
var $u = (e) => {
  throw TypeError(e);
}, Fs = (e, t, r) => t.has(e) || $u("Cannot " + r), ce = (e, t, r) => (Fs(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Re = (e, t, r) => t.has(e) ? $u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), ve = (e, t, r, n) => (Fs(e, t, "write to private field"), t.set(e, r), r), $t = (e, t, r) => (Fs(e, t, "access private method"), r), et, Ft, Xt, Rn, xn, Sr, or, kr, Tt, Yt, ir, er, br, pt, Lo, Zo, Vo, La, Ho, Wo, $r, Jo, Ko;
class In extends EventTarget {
  constructor(t, r) {
    var n, o;
    super(), Re(this, pt), this.CONNECTING = 0, this.OPEN = 1, this.CLOSED = 2, Re(this, et), Re(this, Ft), Re(this, Xt), Re(this, Rn), Re(this, xn), Re(this, Sr), Re(this, or), Re(this, kr, null), Re(this, Tt), Re(this, Yt), Re(this, ir, null), Re(this, er, null), Re(this, br, null), Re(this, Zo, async (s) => {
      var i;
      ce(this, Yt).reset();
      const { body: a, redirected: c, status: l, headers: d } = s;
      if (l === 204) {
        $t(this, pt, $r).call(this, "Server sent HTTP 204, not reconnecting", 204), this.close();
        return;
      }
      if (c ? ve(this, Xt, new URL(s.url)) : ve(this, Xt, void 0), l !== 200) {
        $t(this, pt, $r).call(this, `Non-200 status code (${l})`, l);
        return;
      }
      if (!(d.get("content-type") || "").startsWith("text/event-stream")) {
        $t(this, pt, $r).call(this, 'Invalid content type, expected "text/event-stream"', l);
        return;
      }
      if (ce(this, et) === this.CLOSED)
        return;
      ve(this, et, this.OPEN);
      const m = new Event("open");
      if ((i = ce(this, br)) == null || i.call(this, m), this.dispatchEvent(m), typeof a != "object" || !a || !("getReader" in a)) {
        $t(this, pt, $r).call(this, "Invalid response body, expected a web ReadableStream", l), this.close();
        return;
      }
      const g = new TextDecoder(), w = a.getReader();
      let k = !0;
      do {
        const { done: _, value: h } = await w.read();
        h && ce(this, Yt).feed(g.decode(h, { stream: !_ })), _ && (k = !1, ce(this, Yt).reset(), $t(this, pt, Jo).call(this));
      } while (k);
    }), Re(this, Vo, (s) => {
      ve(this, Tt, void 0), !(s.name === "AbortError" || s.type === "aborted") && $t(this, pt, Jo).call(this, Fo(s));
    }), Re(this, Ho, (s) => {
      typeof s.id == "string" && ve(this, kr, s.id);
      const i = new MessageEvent(s.event || "message", {
        data: s.data,
        origin: ce(this, Xt) ? ce(this, Xt).origin : ce(this, Ft).origin,
        lastEventId: s.id || ""
      });
      ce(this, er) && (!s.event || s.event === "message") && ce(this, er).call(this, i), this.dispatchEvent(i);
    }), Re(this, Wo, (s) => {
      ve(this, Sr, s);
    }), Re(this, Ko, () => {
      ve(this, or, void 0), ce(this, et) === this.CONNECTING && $t(this, pt, Lo).call(this);
    });
    try {
      if (t instanceof URL)
        ve(this, Ft, t);
      else if (typeof t == "string")
        ve(this, Ft, new URL(t, L_()));
      else
        throw new Error("Invalid URL");
    } catch {
      throw F_("An invalid or illegal string was specified");
    }
    ve(this, Yt, bu({
      onEvent: ce(this, Ho),
      onRetry: ce(this, Wo)
    })), ve(this, et, this.CONNECTING), ve(this, Sr, 3e3), ve(this, xn, (n = r == null ? void 0 : r.fetch) != null ? n : globalThis.fetch), ve(this, Rn, (o = r == null ? void 0 : r.withCredentials) != null ? o : !1), $t(this, pt, Lo).call(this);
  }
  /**
   * Returns the state of this EventSource object's connection. It can have the values described below.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/readyState)
   *
   * Note: typed as `number` instead of `0 | 1 | 2` for compatibility with the `EventSource` interface,
   * defined in the TypeScript `dom` library.
   *
   * @public
   */
  get readyState() {
    return ce(this, et);
  }
  /**
   * Returns the URL providing the event stream.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/url)
   *
   * @public
   */
  get url() {
    return ce(this, Ft).href;
  }
  /**
   * Returns true if the credentials mode for connection requests to the URL providing the event stream is set to "include", and false otherwise.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/withCredentials)
   */
  get withCredentials() {
    return ce(this, Rn);
  }
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/error_event) */
  get onerror() {
    return ce(this, ir);
  }
  set onerror(t) {
    ve(this, ir, t);
  }
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/message_event) */
  get onmessage() {
    return ce(this, er);
  }
  set onmessage(t) {
    ve(this, er, t);
  }
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/open_event) */
  get onopen() {
    return ce(this, br);
  }
  set onopen(t) {
    ve(this, br, t);
  }
  addEventListener(t, r, n) {
    const o = r;
    super.addEventListener(t, o, n);
  }
  removeEventListener(t, r, n) {
    const o = r;
    super.removeEventListener(t, o, n);
  }
  /**
   * Aborts any instances of the fetch algorithm started for this EventSource object, and sets the readyState attribute to CLOSED.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventSource/close)
   *
   * @public
   */
  close() {
    ce(this, or) && clearTimeout(ce(this, or)), ce(this, et) !== this.CLOSED && (ce(this, Tt) && ce(this, Tt).abort(), ve(this, et, this.CLOSED), ve(this, Tt, void 0));
  }
}
et = /* @__PURE__ */ new WeakMap(), Ft = /* @__PURE__ */ new WeakMap(), Xt = /* @__PURE__ */ new WeakMap(), Rn = /* @__PURE__ */ new WeakMap(), xn = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap(), Yt = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakSet(), /**
* Connect to the given URL and start receiving events
*
* @internal
*/
Lo = function() {
  ve(this, et, this.CONNECTING), ve(this, Tt, new AbortController()), ce(this, xn)(ce(this, Ft), $t(this, pt, La).call(this)).then(ce(this, Zo)).catch(ce(this, Vo));
}, Zo = /* @__PURE__ */ new WeakMap(), Vo = /* @__PURE__ */ new WeakMap(), /**
* Get request options for the `fetch()` request
*
* @returns The request options
* @internal
*/
La = function() {
  var e;
  const t = {
    // [spec] Let `corsAttributeState` be `Anonymous`…
    // [spec] …will have their mode set to "cors"…
    mode: "cors",
    redirect: "follow",
    headers: { Accept: "text/event-stream", ...ce(this, kr) ? { "Last-Event-ID": ce(this, kr) } : void 0 },
    cache: "no-store",
    signal: (e = ce(this, Tt)) == null ? void 0 : e.signal
  };
  return "window" in globalThis && (t.credentials = this.withCredentials ? "include" : "same-origin"), t;
}, Ho = /* @__PURE__ */ new WeakMap(), Wo = /* @__PURE__ */ new WeakMap(), /**
* Handles the process referred to in the EventSource specification as "failing a connection".
*
* @param error - The error causing the connection to fail
* @param code - The HTTP status code, if available
* @internal
*/
$r = function(e, t) {
  var r;
  ce(this, et) !== this.CLOSED && ve(this, et, this.CLOSED);
  const n = new Ua("error", { code: t, message: e });
  (r = ce(this, ir)) == null || r.call(this, n), this.dispatchEvent(n);
}, /**
* Schedules a reconnection attempt against the EventSource endpoint.
*
* @param message - The error causing the connection to fail
* @param code - The HTTP status code, if available
* @internal
*/
Jo = function(e, t) {
  var r;
  if (ce(this, et) === this.CLOSED)
    return;
  ve(this, et, this.CONNECTING);
  const n = new Ua("error", { code: t, message: e });
  (r = ce(this, ir)) == null || r.call(this, n), this.dispatchEvent(n), ve(this, or, setTimeout(ce(this, Ko), ce(this, Sr)));
}, Ko = /* @__PURE__ */ new WeakMap(), /**
* ReadyState representing an EventSource currently trying to connect
*
* @public
*/
In.CONNECTING = 0, /**
* ReadyState representing an EventSource connection that is open (eg connected)
*
* @public
*/
In.OPEN = 1, /**
* ReadyState representing an EventSource connection that is closed (eg disconnected)
*
* @public
*/
In.CLOSED = 2;
function L_() {
  const e = "document" in globalThis ? globalThis.document : void 0;
  return e && typeof e == "object" && "baseURI" in e && typeof e.baseURI == "string" ? e.baseURI : void 0;
}
function Un(e) {
  return e ? e instanceof Headers ? Object.fromEntries(e.entries()) : Array.isArray(e) ? Object.fromEntries(e) : { ...e } : {};
}
function Su(e = fetch, t) {
  return t ? async (r, n) => {
    const o = {
      ...t,
      ...n,
      // Headers need special handling - merge instead of replace
      headers: n != null && n.headers ? { ...Un(t.headers), ...Un(n.headers) } : t.headers
    };
    return e(r, o);
  } : e;
}
let Ls;
Ls = globalThis.crypto;
async function Z_(e) {
  return (await Ls).getRandomValues(new Uint8Array(e));
}
async function V_(e) {
  const t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
  let r = "";
  const n = await Z_(e);
  for (let o = 0; o < e; o++) {
    const s = n[o] % t.length;
    r += t[s];
  }
  return r;
}
async function H_(e) {
  return await V_(e);
}
async function W_(e) {
  const t = await (await Ls).subtle.digest("SHA-256", new TextEncoder().encode(e));
  return btoa(String.fromCharCode(...new Uint8Array(t))).replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
}
async function J_(e) {
  if (e || (e = 43), e < 43 || e > 128)
    throw `Expected a length between 43 and 128. Received ${e}.`;
  const t = await H_(e), r = await W_(t);
  return {
    code_verifier: t,
    code_challenge: r
  };
}
const De = Hh().superRefine((e, t) => {
  if (!URL.canParse(e))
    return t.addIssue({
      code: qp.custom,
      message: "URL must be parseable",
      fatal: !0
    }), Ju;
}).refine((e) => {
  const t = new URL(e);
  return t.protocol !== "javascript:" && t.protocol !== "data:" && t.protocol !== "vbscript:";
}, { message: "URL cannot use javascript:, data:, or vbscript: scheme" }), K_ = xe({
  resource: E().url(),
  authorization_servers: V(De).optional(),
  jwks_uri: E().url().optional(),
  scopes_supported: V(E()).optional(),
  bearer_methods_supported: V(E()).optional(),
  resource_signing_alg_values_supported: V(E()).optional(),
  resource_name: E().optional(),
  resource_documentation: E().optional(),
  resource_policy_uri: E().url().optional(),
  resource_tos_uri: E().url().optional(),
  tls_client_certificate_bound_access_tokens: me().optional(),
  authorization_details_types_supported: V(E()).optional(),
  dpop_signing_alg_values_supported: V(E()).optional(),
  dpop_bound_access_tokens_required: me().optional()
}), ku = xe({
  issuer: E(),
  authorization_endpoint: De,
  token_endpoint: De,
  registration_endpoint: De.optional(),
  scopes_supported: V(E()).optional(),
  response_types_supported: V(E()),
  response_modes_supported: V(E()).optional(),
  grant_types_supported: V(E()).optional(),
  token_endpoint_auth_methods_supported: V(E()).optional(),
  token_endpoint_auth_signing_alg_values_supported: V(E()).optional(),
  service_documentation: De.optional(),
  revocation_endpoint: De.optional(),
  revocation_endpoint_auth_methods_supported: V(E()).optional(),
  revocation_endpoint_auth_signing_alg_values_supported: V(E()).optional(),
  introspection_endpoint: E().optional(),
  introspection_endpoint_auth_methods_supported: V(E()).optional(),
  introspection_endpoint_auth_signing_alg_values_supported: V(E()).optional(),
  code_challenge_methods_supported: V(E()).optional(),
  client_id_metadata_document_supported: me().optional()
}), B_ = xe({
  issuer: E(),
  authorization_endpoint: De,
  token_endpoint: De,
  userinfo_endpoint: De.optional(),
  jwks_uri: De,
  registration_endpoint: De.optional(),
  scopes_supported: V(E()).optional(),
  response_types_supported: V(E()),
  response_modes_supported: V(E()).optional(),
  grant_types_supported: V(E()).optional(),
  acr_values_supported: V(E()).optional(),
  subject_types_supported: V(E()),
  id_token_signing_alg_values_supported: V(E()),
  id_token_encryption_alg_values_supported: V(E()).optional(),
  id_token_encryption_enc_values_supported: V(E()).optional(),
  userinfo_signing_alg_values_supported: V(E()).optional(),
  userinfo_encryption_alg_values_supported: V(E()).optional(),
  userinfo_encryption_enc_values_supported: V(E()).optional(),
  request_object_signing_alg_values_supported: V(E()).optional(),
  request_object_encryption_alg_values_supported: V(E()).optional(),
  request_object_encryption_enc_values_supported: V(E()).optional(),
  token_endpoint_auth_methods_supported: V(E()).optional(),
  token_endpoint_auth_signing_alg_values_supported: V(E()).optional(),
  display_values_supported: V(E()).optional(),
  claim_types_supported: V(E()).optional(),
  claims_supported: V(E()).optional(),
  service_documentation: E().optional(),
  claims_locales_supported: V(E()).optional(),
  ui_locales_supported: V(E()).optional(),
  claims_parameter_supported: me().optional(),
  request_parameter_supported: me().optional(),
  request_uri_parameter_supported: me().optional(),
  require_request_uri_registration: me().optional(),
  op_policy_uri: De.optional(),
  op_tos_uri: De.optional(),
  client_id_metadata_document_supported: me().optional()
}), G_ = W({
  ...B_.shape,
  ...ku.pick({
    code_challenge_methods_supported: !0
  }).shape
}), Q_ = W({
  access_token: E(),
  id_token: E().optional(),
  // Optional for OAuth 2.1, but necessary in OpenID Connect
  token_type: E(),
  expires_in: Dp().optional(),
  scope: E().optional(),
  refresh_token: E().optional()
}).strip(), X_ = W({
  error: E(),
  error_description: E().optional(),
  error_uri: E().optional()
}), Za = De.optional().or(G("").transform(() => {
})), Y_ = W({
  redirect_uris: V(De),
  token_endpoint_auth_method: E().optional(),
  grant_types: V(E()).optional(),
  response_types: V(E()).optional(),
  client_name: E().optional(),
  client_uri: De.optional(),
  logo_uri: Za,
  scope: E().optional(),
  contacts: V(E()).optional(),
  tos_uri: Za,
  policy_uri: E().optional(),
  jwks_uri: De.optional(),
  jwks: dp().optional(),
  software_id: E().optional(),
  software_version: E().optional(),
  software_statement: E().optional()
}).strip(), ey = W({
  client_id: E(),
  client_secret: E().optional(),
  client_id_issued_at: he().optional(),
  client_secret_expires_at: he().optional()
}).strip(), ty = Y_.merge(ey);
W({
  error: E(),
  error_description: E().optional()
}).strip();
W({
  token: E(),
  token_type_hint: E().optional()
}).strip();
function ry(e) {
  const t = typeof e == "string" ? new URL(e) : new URL(e.href);
  return t.hash = "", t;
}
function ny({ requestedResource: e, configuredResource: t }) {
  const r = typeof e == "string" ? new URL(e) : new URL(e.href), n = typeof t == "string" ? new URL(t) : new URL(t.href);
  if (r.origin !== n.origin || r.pathname.length < n.pathname.length)
    return !1;
  const o = r.pathname.endsWith("/") ? r.pathname : r.pathname + "/", s = n.pathname.endsWith("/") ? n.pathname : n.pathname + "/";
  return o.startsWith(s);
}
class Ne extends Error {
  constructor(t, r) {
    super(t), this.errorUri = r, this.name = this.constructor.name;
  }
  /**
   * Converts the error to a standard OAuth error response object
   */
  toResponseObject() {
    const t = {
      error: this.errorCode,
      error_description: this.message
    };
    return this.errorUri && (t.error_uri = this.errorUri), t;
  }
  get errorCode() {
    return this.constructor.errorCode;
  }
}
class Bo extends Ne {
}
Bo.errorCode = "invalid_request";
class Fn extends Ne {
}
Fn.errorCode = "invalid_client";
class Ln extends Ne {
}
Ln.errorCode = "invalid_grant";
class Zn extends Ne {
}
Zn.errorCode = "unauthorized_client";
class Go extends Ne {
}
Go.errorCode = "unsupported_grant_type";
class Qo extends Ne {
}
Qo.errorCode = "invalid_scope";
class Xo extends Ne {
}
Xo.errorCode = "access_denied";
class fr extends Ne {
}
fr.errorCode = "server_error";
class Yo extends Ne {
}
Yo.errorCode = "temporarily_unavailable";
class es extends Ne {
}
es.errorCode = "unsupported_response_type";
class ts extends Ne {
}
ts.errorCode = "unsupported_token_type";
class rs extends Ne {
}
rs.errorCode = "invalid_token";
class ns extends Ne {
}
ns.errorCode = "method_not_allowed";
class os extends Ne {
}
os.errorCode = "too_many_requests";
class Vn extends Ne {
}
Vn.errorCode = "invalid_client_metadata";
class ss extends Ne {
}
ss.errorCode = "insufficient_scope";
class is extends Ne {
}
is.errorCode = "invalid_target";
const oy = {
  [Bo.errorCode]: Bo,
  [Fn.errorCode]: Fn,
  [Ln.errorCode]: Ln,
  [Zn.errorCode]: Zn,
  [Go.errorCode]: Go,
  [Qo.errorCode]: Qo,
  [Xo.errorCode]: Xo,
  [fr.errorCode]: fr,
  [Yo.errorCode]: Yo,
  [es.errorCode]: es,
  [ts.errorCode]: ts,
  [rs.errorCode]: rs,
  [ns.errorCode]: ns,
  [os.errorCode]: os,
  [Vn.errorCode]: Vn,
  [ss.errorCode]: ss,
  [is.errorCode]: is
};
class mt extends Error {
  constructor(t) {
    super(t ?? "Unauthorized");
  }
}
function sy(e) {
  return ["client_secret_basic", "client_secret_post", "none"].includes(e);
}
const Ao = "code", Ro = "S256";
function iy(e, t) {
  const r = e.client_secret !== void 0;
  return t.length === 0 ? r ? "client_secret_post" : "none" : "token_endpoint_auth_method" in e && e.token_endpoint_auth_method && sy(e.token_endpoint_auth_method) && t.includes(e.token_endpoint_auth_method) ? e.token_endpoint_auth_method : r && t.includes("client_secret_basic") ? "client_secret_basic" : r && t.includes("client_secret_post") ? "client_secret_post" : t.includes("none") ? "none" : r ? "client_secret_post" : "none";
}
function ay(e, t, r, n) {
  const { client_id: o, client_secret: s } = t;
  switch (e) {
    case "client_secret_basic":
      cy(o, s, r);
      return;
    case "client_secret_post":
      uy(o, s, n);
      return;
    case "none":
      ly(o, n);
      return;
    default:
      throw new Error(`Unsupported client authentication method: ${e}`);
  }
}
function cy(e, t, r) {
  if (!t)
    throw new Error("client_secret_basic authentication requires a client_secret");
  const n = btoa(`${e}:${t}`);
  r.set("Authorization", `Basic ${n}`);
}
function uy(e, t, r) {
  r.set("client_id", e), t && r.set("client_secret", t);
}
function ly(e, t) {
  t.set("client_id", e);
}
async function Eu(e) {
  const t = e instanceof Response ? e.status : void 0, r = e instanceof Response ? await e.text() : e;
  try {
    const n = X_.parse(JSON.parse(r)), { error: o, error_description: s, error_uri: i } = n, a = oy[o] || fr;
    return new a(s || "", i);
  } catch (n) {
    const o = `${t ? `HTTP ${t}: ` : ""}Invalid OAuth error response: ${n}. Raw body: ${r}`;
    return new fr(o);
  }
}
async function Wt(e, t) {
  var r, n;
  try {
    return await Io(e, t);
  } catch (o) {
    if (o instanceof Fn || o instanceof Zn)
      return await ((r = e.invalidateCredentials) == null ? void 0 : r.call(e, "all")), await Io(e, t);
    if (o instanceof Ln)
      return await ((n = e.invalidateCredentials) == null ? void 0 : n.call(e, "tokens")), await Io(e, t);
    throw o;
  }
}
async function Io(e, { serverUrl: t, authorizationCode: r, scope: n, resourceMetadataUrl: o, fetchFn: s }) {
  var h, f;
  let i, a;
  try {
    i = await hy(t, { resourceMetadataUrl: o }, s), i.authorization_servers && i.authorization_servers.length > 0 && (a = i.authorization_servers[0]);
  } catch {
  }
  a || (a = new URL("/", t));
  const c = await fy(t, e, i), l = await yy(a, {
    fetchFn: s
  });
  let d = await Promise.resolve(e.clientInformation());
  if (!d) {
    if (r !== void 0)
      throw new Error("Existing OAuth client information is required when exchanging an authorization code");
    const u = (l == null ? void 0 : l.client_id_metadata_document_supported) === !0, p = e.clientMetadataUrl;
    if (p && !dy(p))
      throw new Vn(`clientMetadataUrl must be a valid HTTPS URL with a non-root pathname, got: ${p}`);
    if (u && p)
      d = {
        client_id: p
      }, await ((h = e.saveClientInformation) == null ? void 0 : h.call(e, d));
    else {
      if (!e.saveClientInformation)
        throw new Error("OAuth client information must be saveable for dynamic registration");
      const b = await Sy(a, {
        metadata: l,
        clientMetadata: e.clientMetadata,
        fetchFn: s
      });
      await e.saveClientInformation(b), d = b;
    }
  }
  const m = !e.redirectUrl;
  if (r !== void 0 || m) {
    const u = await $y(e, a, {
      metadata: l,
      resource: c,
      authorizationCode: r,
      fetchFn: s
    });
    return await e.saveTokens(u), "AUTHORIZED";
  }
  const g = await e.tokens();
  if (g != null && g.refresh_token)
    try {
      const u = await by(a, {
        metadata: l,
        clientInformation: d,
        refreshToken: g.refresh_token,
        resource: c,
        addClientAuthentication: e.addClientAuthentication,
        fetchFn: s
      });
      return await e.saveTokens(u), "AUTHORIZED";
    } catch (u) {
      if (!(!(u instanceof Ne) || u instanceof fr)) throw u;
    }
  const w = e.state ? await e.state() : void 0, { authorizationUrl: k, codeVerifier: _ } = await vy(a, {
    metadata: l,
    clientInformation: d,
    state: w,
    redirectUrl: e.redirectUrl,
    scope: n || ((f = i == null ? void 0 : i.scopes_supported) == null ? void 0 : f.join(" ")) || e.clientMetadata.scope,
    resource: c
  });
  return await e.saveCodeVerifier(_), await e.redirectToAuthorization(k), "REDIRECT";
}
function dy(e) {
  if (!e)
    return !1;
  try {
    const t = new URL(e);
    return t.protocol === "https:" && t.pathname !== "/";
  } catch {
    return !1;
  }
}
async function fy(e, t, r) {
  const n = ry(e);
  if (t.validateResourceURL)
    return await t.validateResourceURL(n, r == null ? void 0 : r.resource);
  if (r) {
    if (!ny({ requestedResource: n, configuredResource: r.resource }))
      throw new Error(`Protected resource ${r.resource} does not match expected ${n} (or origin)`);
    return new URL(r.resource);
  }
}
function Hn(e) {
  const t = e.headers.get("WWW-Authenticate");
  if (!t)
    return {};
  const [r, n] = t.split(" ");
  if (r.toLowerCase() !== "bearer" || !n)
    return {};
  const o = Oo(e, "resource_metadata") || void 0;
  let s;
  if (o)
    try {
      s = new URL(o);
    } catch {
    }
  const i = Oo(e, "scope") || void 0, a = Oo(e, "error") || void 0;
  return {
    resourceMetadataUrl: s,
    scope: i,
    error: a
  };
}
function Oo(e, t) {
  const r = e.headers.get("WWW-Authenticate");
  if (!r)
    return null;
  const n = new RegExp(`${t}=(?:"([^"]+)"|([^\\s,]+))`), o = r.match(n);
  return o ? o[1] || o[2] : null;
}
async function hy(e, t, r = fetch) {
  var o, s;
  const n = await gy(e, "oauth-protected-resource", r, {
    protocolVersion: t == null ? void 0 : t.protocolVersion,
    metadataUrl: t == null ? void 0 : t.resourceMetadataUrl
  });
  if (!n || n.status === 404)
    throw await ((o = n == null ? void 0 : n.body) == null ? void 0 : o.cancel()), new Error("Resource server does not implement OAuth 2.0 Protected Resource Metadata.");
  if (!n.ok)
    throw await ((s = n.body) == null ? void 0 : s.cancel()), new Error(`HTTP ${n.status} trying to load well-known OAuth protected resource metadata.`);
  return K_.parse(await n.json());
}
async function Zs(e, t, r = fetch) {
  try {
    return await r(e, { headers: t });
  } catch (n) {
    if (n instanceof TypeError)
      return t ? Zs(e, void 0, r) : void 0;
    throw n;
  }
}
function py(e, t = "", r = {}) {
  return t.endsWith("/") && (t = t.slice(0, -1)), r.prependPathname ? `${t}/.well-known/${e}` : `/.well-known/${e}${t}`;
}
async function Va(e, t, r = fetch) {
  return await Zs(e, {
    "MCP-Protocol-Version": t
  }, r);
}
function my(e, t) {
  return !e || e.status >= 400 && e.status < 500 && t !== "/";
}
async function gy(e, t, r, n) {
  const o = new URL(e), s = (n == null ? void 0 : n.protocolVersion) ?? Xn;
  let i;
  if (n != null && n.metadataUrl)
    i = new URL(n.metadataUrl);
  else {
    const c = py(t, o.pathname);
    i = new URL(c, (n == null ? void 0 : n.metadataServerUrl) ?? o), i.search = o.search;
  }
  let a = await Va(i, s, r);
  if (!(n != null && n.metadataUrl) && my(a, o.pathname)) {
    const c = new URL(`/.well-known/${t}`, o);
    a = await Va(c, s, r);
  }
  return a;
}
function _y(e) {
  const t = typeof e == "string" ? new URL(e) : e, r = t.pathname !== "/", n = [];
  if (!r)
    return n.push({
      url: new URL("/.well-known/oauth-authorization-server", t.origin),
      type: "oauth"
    }), n.push({
      url: new URL("/.well-known/openid-configuration", t.origin),
      type: "oidc"
    }), n;
  let o = t.pathname;
  return o.endsWith("/") && (o = o.slice(0, -1)), n.push({
    url: new URL(`/.well-known/oauth-authorization-server${o}`, t.origin),
    type: "oauth"
  }), n.push({
    url: new URL(`/.well-known/openid-configuration${o}`, t.origin),
    type: "oidc"
  }), n.push({
    url: new URL(`${o}/.well-known/openid-configuration`, t.origin),
    type: "oidc"
  }), n;
}
async function yy(e, { fetchFn: t = fetch, protocolVersion: r = Xn } = {}) {
  var s;
  const n = {
    "MCP-Protocol-Version": r,
    Accept: "application/json"
  }, o = _y(e);
  for (const { url: i, type: a } of o) {
    const c = await Zs(i, n, t);
    if (c) {
      if (!c.ok) {
        if (await ((s = c.body) == null ? void 0 : s.cancel()), c.status >= 400 && c.status < 500)
          continue;
        throw new Error(`HTTP ${c.status} trying to load ${a === "oauth" ? "OAuth" : "OpenID provider"} metadata from ${i}`);
      }
      return a === "oauth" ? ku.parse(await c.json()) : G_.parse(await c.json());
    }
  }
}
async function vy(e, { metadata: t, clientInformation: r, redirectUrl: n, scope: o, state: s, resource: i }) {
  let a;
  if (t) {
    if (a = new URL(t.authorization_endpoint), !t.response_types_supported.includes(Ao))
      throw new Error(`Incompatible auth server: does not support response type ${Ao}`);
    if (t.code_challenge_methods_supported && !t.code_challenge_methods_supported.includes(Ro))
      throw new Error(`Incompatible auth server: does not support code challenge method ${Ro}`);
  } else
    a = new URL("/authorize", e);
  const c = await J_(), l = c.code_verifier, d = c.code_challenge;
  return a.searchParams.set("response_type", Ao), a.searchParams.set("client_id", r.client_id), a.searchParams.set("code_challenge", d), a.searchParams.set("code_challenge_method", Ro), a.searchParams.set("redirect_uri", String(n)), s && a.searchParams.set("state", s), o && a.searchParams.set("scope", o), o != null && o.includes("offline_access") && a.searchParams.append("prompt", "consent"), i && a.searchParams.set("resource", i.href), { authorizationUrl: a, codeVerifier: l };
}
function wy(e, t, r) {
  return new URLSearchParams({
    grant_type: "authorization_code",
    code: e,
    code_verifier: t,
    redirect_uri: String(r)
  });
}
async function Cu(e, { metadata: t, tokenRequestParams: r, clientInformation: n, addClientAuthentication: o, resource: s, fetchFn: i }) {
  const a = t != null && t.token_endpoint ? new URL(t.token_endpoint) : new URL("/token", e), c = new Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json"
  });
  if (s && r.set("resource", s.href), o)
    await o(c, r, a, t);
  else if (n) {
    const d = (t == null ? void 0 : t.token_endpoint_auth_methods_supported) ?? [], m = iy(n, d);
    ay(m, n, c, r);
  }
  const l = await (i ?? fetch)(a, {
    method: "POST",
    headers: c,
    body: r
  });
  if (!l.ok)
    throw await Eu(l);
  return Q_.parse(await l.json());
}
async function by(e, { metadata: t, clientInformation: r, refreshToken: n, resource: o, addClientAuthentication: s, fetchFn: i }) {
  const a = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: n
  }), c = await Cu(e, {
    metadata: t,
    tokenRequestParams: a,
    clientInformation: r,
    addClientAuthentication: s,
    resource: o,
    fetchFn: i
  });
  return { refresh_token: n, ...c };
}
async function $y(e, t, { metadata: r, resource: n, authorizationCode: o, fetchFn: s } = {}) {
  const i = e.clientMetadata.scope;
  let a;
  if (e.prepareTokenRequest && (a = await e.prepareTokenRequest(i)), !a) {
    if (!o)
      throw new Error("Either provider.prepareTokenRequest() or authorizationCode is required");
    if (!e.redirectUrl)
      throw new Error("redirectUrl is required for authorization_code flow");
    const l = await e.codeVerifier();
    a = wy(o, l, e.redirectUrl);
  }
  const c = await e.clientInformation();
  return Cu(t, {
    metadata: r,
    tokenRequestParams: a,
    clientInformation: c ?? void 0,
    addClientAuthentication: e.addClientAuthentication,
    resource: n,
    fetchFn: s
  });
}
async function Sy(e, { metadata: t, clientMetadata: r, fetchFn: n }) {
  let o;
  if (t) {
    if (!t.registration_endpoint)
      throw new Error("Incompatible auth server: does not support dynamic client registration");
    o = new URL(t.registration_endpoint);
  } else
    o = new URL("/register", e);
  const s = await (n ?? fetch)(o, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(r)
  });
  if (!s.ok)
    throw await Eu(s);
  return ty.parse(await s.json());
}
class ky extends Error {
  constructor(t, r, n) {
    super(`SSE error: ${r}`), this.code = t, this.event = n;
  }
}
class Ey {
  constructor(t, r) {
    this._url = t, this._resourceMetadataUrl = void 0, this._scope = void 0, this._eventSourceInit = r == null ? void 0 : r.eventSourceInit, this._requestInit = r == null ? void 0 : r.requestInit, this._authProvider = r == null ? void 0 : r.authProvider, this._fetch = r == null ? void 0 : r.fetch, this._fetchWithInit = Su(r == null ? void 0 : r.fetch, r == null ? void 0 : r.requestInit);
  }
  async _authThenStart() {
    var r;
    if (!this._authProvider)
      throw new mt("No auth provider");
    let t;
    try {
      t = await Wt(this._authProvider, {
        serverUrl: this._url,
        resourceMetadataUrl: this._resourceMetadataUrl,
        scope: this._scope,
        fetchFn: this._fetchWithInit
      });
    } catch (n) {
      throw (r = this.onerror) == null || r.call(this, n), n;
    }
    if (t !== "AUTHORIZED")
      throw new mt();
    return await this._startOrAuth();
  }
  async _commonHeaders() {
    var n;
    const t = {};
    if (this._authProvider) {
      const o = await this._authProvider.tokens();
      o && (t.Authorization = `Bearer ${o.access_token}`);
    }
    this._protocolVersion && (t["mcp-protocol-version"] = this._protocolVersion);
    const r = Un((n = this._requestInit) == null ? void 0 : n.headers);
    return new Headers({
      ...t,
      ...r
    });
  }
  _startOrAuth() {
    var r;
    const t = ((r = this == null ? void 0 : this._eventSourceInit) == null ? void 0 : r.fetch) ?? this._fetch ?? fetch;
    return new Promise((n, o) => {
      this._eventSource = new In(this._url.href, {
        ...this._eventSourceInit,
        fetch: async (s, i) => {
          const a = await this._commonHeaders();
          a.set("Accept", "text/event-stream");
          const c = await t(s, {
            ...i,
            headers: a
          });
          if (c.status === 401 && c.headers.has("www-authenticate")) {
            const { resourceMetadataUrl: l, scope: d } = Hn(c);
            this._resourceMetadataUrl = l, this._scope = d;
          }
          return c;
        }
      }), this._abortController = new AbortController(), this._eventSource.onerror = (s) => {
        var a;
        if (s.code === 401 && this._authProvider) {
          this._authThenStart().then(n, o);
          return;
        }
        const i = new ky(s.code, s.message, s);
        o(i), (a = this.onerror) == null || a.call(this, i);
      }, this._eventSource.onopen = () => {
      }, this._eventSource.addEventListener("endpoint", (s) => {
        var a;
        const i = s;
        try {
          if (this._endpoint = new URL(i.data, this._url), this._endpoint.origin !== this._url.origin)
            throw new Error(`Endpoint origin does not match connection origin: ${this._endpoint.origin}`);
        } catch (c) {
          o(c), (a = this.onerror) == null || a.call(this, c), this.close();
          return;
        }
        n();
      }), this._eventSource.onmessage = (s) => {
        var c, l;
        const i = s;
        let a;
        try {
          a = Pn.parse(JSON.parse(i.data));
        } catch (d) {
          (c = this.onerror) == null || c.call(this, d);
          return;
        }
        (l = this.onmessage) == null || l.call(this, a);
      };
    });
  }
  async start() {
    if (this._eventSource)
      throw new Error("SSEClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    return await this._startOrAuth();
  }
  /**
   * Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
   */
  async finishAuth(t) {
    if (!this._authProvider)
      throw new mt("No auth provider");
    if (await Wt(this._authProvider, {
      serverUrl: this._url,
      authorizationCode: t,
      resourceMetadataUrl: this._resourceMetadataUrl,
      scope: this._scope,
      fetchFn: this._fetchWithInit
    }) !== "AUTHORIZED")
      throw new mt("Failed to authorize");
  }
  async close() {
    var t, r, n;
    (t = this._abortController) == null || t.abort(), (r = this._eventSource) == null || r.close(), (n = this.onclose) == null || n.call(this);
  }
  async send(t) {
    var r, n, o;
    if (!this._endpoint)
      throw new Error("Not connected");
    try {
      const s = await this._commonHeaders();
      s.set("content-type", "application/json");
      const i = {
        ...this._requestInit,
        method: "POST",
        headers: s,
        body: JSON.stringify(t),
        signal: (r = this._abortController) == null ? void 0 : r.signal
      }, a = await (this._fetch ?? fetch)(this._endpoint, i);
      if (!a.ok) {
        const c = await a.text().catch(() => null);
        if (a.status === 401 && this._authProvider) {
          const { resourceMetadataUrl: l, scope: d } = Hn(a);
          if (this._resourceMetadataUrl = l, this._scope = d, await Wt(this._authProvider, {
            serverUrl: this._url,
            resourceMetadataUrl: this._resourceMetadataUrl,
            scope: this._scope,
            fetchFn: this._fetchWithInit
          }) !== "AUTHORIZED")
            throw new mt();
          return this.send(t);
        }
        throw new Error(`Error POSTing to endpoint (HTTP ${a.status}): ${c}`);
      }
      await ((n = a.body) == null ? void 0 : n.cancel());
    } catch (s) {
      throw (o = this.onerror) == null || o.call(this, s), s;
    }
  }
  setProtocolVersion(t) {
    this._protocolVersion = t;
  }
}
const Ze = nt("SSEPlugin");
class Tu {
  constructor() {
    J(this, "metadata", {
      name: "SSE Transport Plugin",
      version: "1.0.0",
      transportType: "sse",
      description: "Server-Sent Events transport for MCP protocol",
      author: "MCP SuperAssistant"
    });
    J(this, "config", {});
    J(this, "transport", null);
    J(this, "isConnectedFlag", !1);
    J(this, "connectionPromise", null);
  }
  async initialize(t) {
    this.config = {
      keepAlive: !0,
      connectionTimeout: 5e3,
      readTimeout: 3e4,
      ...t
    }, Ze.debug("Initialized with config:", this.config);
  }
  async connect(t) {
    Ze.debug(`Creating transport for: ${t}`);
    try {
      const r = await this.createConnection(t);
      return this.transport = r, Ze.debug("[SSEPlugin] Transport created successfully"), r;
    } catch (r) {
      throw Ze.error("[SSEPlugin] Transport creation failed:", r), r;
    }
  }
  async createConnection(t) {
    try {
      const r = new URL(t);
      Ze.debug(`Creating SSE transport for: ${r.toString()}`);
      const n = new Ey(r);
      return Ze.debug("[SSEPlugin] SSE transport created successfully"), n;
    } catch (r) {
      const n = r instanceof Error ? r.message : String(r);
      let o = n;
      throw n.includes("404") ? o = "SSE endpoint not found (404). Verify the server URL and SSE endpoint path." : n.includes("timeout") ? o = "SSE connection timeout. The server may be slow or the endpoint may not support SSE." : n.includes("Failed to fetch") && (o = "SSE connection failed. Check if the server is running and accessible."), new Error(`SSE Plugin: ${o}`);
    }
  }
  async disconnect() {
    if (Ze.debug("[SSEPlugin] Disconnecting..."), this.transport)
      try {
        "close" in this.transport && typeof this.transport.close == "function" && await this.transport.close();
      } catch (t) {
        Ze.warn("[SSEPlugin] Error during transport cleanup:", t);
      }
    this.transport = null, this.isConnectedFlag = !1, this.connectionPromise = null, Ze.debug("[SSEPlugin] Disconnected");
  }
  isConnected() {
    return this.transport !== null;
  }
  isSupported(t) {
    try {
      const r = new URL(t);
      return r.protocol === "http:" || r.protocol === "https:";
    } catch {
      return !1;
    }
  }
  getDefaultConfig() {
    return {
      keepAlive: !0,
      connectionTimeout: 5e3,
      readTimeout: 3e4,
      headers: {
        Accept: "text/event-stream",
        "Cache-Control": "no-cache"
      }
    };
  }
  async isHealthy() {
    if (!this.isConnected() || !this.transport)
      return !1;
    try {
      return !0;
    } catch (t) {
      return Ze.warn("[SSEPlugin] Health check failed:", t), !1;
    }
  }
  async callTool(t, r, n) {
    if (!this.isConnected())
      throw new Error("SSE Plugin: Not connected");
    Ze.debug(`Calling tool: ${r}`);
    try {
      const o = await t.callTool({ name: r, arguments: n });
      return Ze.debug(`Tool call completed: ${r}`), o;
    } catch (o) {
      throw Ze.error(`Tool call failed: ${r}`, o), o;
    }
  }
  async getPrimitives(t) {
    if (!this.isConnected())
      throw new Error("SSE Plugin: Not connected");
    Ze.debug("[SSEPlugin] Getting primitives...");
    try {
      const r = t.getServerCapabilities(), n = [], o = [];
      return r != null && r.resources && o.push(
        t.listResources().then(({ resources: s }) => {
          s.forEach((i) => n.push({ type: "resource", value: i }));
        })
      ), r != null && r.tools && o.push(
        t.listTools().then(({ tools: s }) => {
          s.forEach((i) => n.push({ type: "tool", value: i }));
        })
      ), r != null && r.prompts && o.push(
        t.listPrompts().then(({ prompts: s }) => {
          s.forEach((i) => n.push({ type: "prompt", value: i }));
        })
      ), await Promise.all(o), Ze.debug(`Retrieved ${n.length} primitives`), n;
    } catch (r) {
      throw Ze.error("[SSEPlugin] Failed to get primitives:", r), r;
    }
  }
}
const Je = nt("WebSocketTransport");
class Cy {
  constructor(t, r = {}) {
    // Transport interface callbacks - required by MCP client
    J(this, "onmessage");
    J(this, "onclose");
    J(this, "onerror");
    J(this, "ws", null);
    J(this, "url");
    J(this, "options");
    J(this, "messageQueue", []);
    J(this, "isConnected", !1);
    // Removed ping/pong timers - using MCP protocol connection management
    J(this, "eventListeners", /* @__PURE__ */ new Map());
    this.url = t, this.options = {
      protocols: ["mcp-v1"],
      pingInterval: 3e4,
      pongTimeout: 5e3,
      binaryType: "arraybuffer",
      maxReconnectAttempts: 3,
      ...r
    };
  }
  async start() {
    Je.debug("[WebSocketTransport] Start method called - initiating connection"), await this.connect();
  }
  async connect() {
    if (this.isConnected || this.ws && this.ws.readyState === WebSocket.CONNECTING) {
      Je.debug("[WebSocketTransport] Already connected or connecting");
      return;
    }
    return new Promise((t, r) => {
      try {
        Je.debug(`Connecting to: ${this.url}`), this.ws = new WebSocket(this.url, this.options.protocols), this.ws.binaryType = this.options.binaryType || "arraybuffer";
        const n = setTimeout(() => {
          this.ws && this.ws.readyState === WebSocket.CONNECTING && (this.ws.close(), r(new Error("WebSocket connection timeout")));
        }, 1e4);
        this.ws.onopen = () => {
          clearTimeout(n), Je.debug("[WebSocketTransport] Connected"), this.isConnected = !0, this.startPingPong(), this.processMessageQueue(), t();
        }, this.ws.onclose = (o) => {
          clearTimeout(n), Je.debug(`Disconnected: ${o.code} ${o.reason}`), this.isConnected = !1, this.stopPingPong(), this.emit("close", { code: o.code, reason: o.reason }), this.onclose && this.onclose();
        }, this.ws.onerror = (o) => {
          clearTimeout(n), Je.error("[WebSocketTransport] Error:", o), this.isConnected = !1, this.emit("error", o), this.onerror && this.onerror(new Error("WebSocket connection failed")), r(new Error("WebSocket connection failed"));
        }, this.ws.onmessage = (o) => {
          try {
            let s;
            if (typeof o.data == "string")
              s = JSON.parse(o.data);
            else if (o.data instanceof ArrayBuffer) {
              const i = new TextDecoder().decode(o.data);
              s = JSON.parse(i);
            } else {
              Je.warn("[WebSocketTransport] Received unknown data type:", typeof o.data);
              return;
            }
            this.emit("message", s), this.onmessage && this.onmessage(s);
          } catch (s) {
            Je.error("[WebSocketTransport] Failed to parse message:", s);
            const i = new Error("Failed to parse WebSocket message");
            this.emit("error", i), this.onerror && this.onerror(i);
          }
        };
      } catch (n) {
        r(n);
      }
    });
  }
  async close() {
    Je.debug("[WebSocketTransport] Closing connection"), this.isConnected = !1, this.stopPingPong(), this.ws && (this.ws.close(1e3, "Normal closure"), this.ws = null);
  }
  async send(t) {
    const r = JSON.stringify(t);
    if (!this.isConnected || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      Je.debug("[WebSocketTransport] Queuing message (not connected)"), this.messageQueue.push(t);
      return;
    }
    try {
      this.ws.send(r);
    } catch (n) {
      throw Je.error("[WebSocketTransport] Failed to send message:", n), this.messageQueue.push(t), n;
    }
  }
  processMessageQueue() {
    if (this.messageQueue.length === 0) return;
    Je.debug(`Processing ${this.messageQueue.length} queued messages`);
    const t = [...this.messageQueue];
    this.messageQueue = [], t.forEach((r) => {
      try {
        this.send(r);
      } catch (n) {
        Je.error("[WebSocketTransport] Failed to send queued message:", n), this.messageQueue.push(r);
      }
    });
  }
  startPingPong() {
    Je.debug("[WebSocketTransport] Skipping custom ping/pong - relying on MCP protocol and server-side monitoring");
  }
  stopPingPong() {
  }
  // Removed custom ping/pong methods - using MCP protocol instead
  // Event emitter functionality
  on(t, r) {
    this.eventListeners.has(t) || this.eventListeners.set(t, /* @__PURE__ */ new Set()), this.eventListeners.get(t).add(r);
  }
  off(t, r) {
    const n = this.eventListeners.get(t);
    n && n.delete(r);
  }
  emit(t, r) {
    const n = this.eventListeners.get(t);
    n && n.forEach((o) => {
      try {
        o(r);
      } catch (s) {
        Je.error(`Error in ${t} listener:`, s);
      }
    });
  }
  getReadyState() {
    var t;
    return ((t = this.ws) == null ? void 0 : t.readyState) ?? WebSocket.CLOSED;
  }
  isConnectionOpen() {
    var t;
    return this.isConnected && ((t = this.ws) == null ? void 0 : t.readyState) === WebSocket.OPEN;
  }
}
const Pe = nt("WebSocketPlugin");
class Pu {
  constructor() {
    J(this, "metadata", {
      name: "WebSocket Transport Plugin",
      version: "1.0.0",
      transportType: "websocket",
      description: "WebSocket transport for MCP protocol with real-time bidirectional communication",
      author: "MCP SuperAssistant"
    });
    J(this, "config", {});
    J(this, "transport", null);
    J(this, "isConnectedFlag", !1);
    J(this, "connectionPromise", null);
    J(this, "lastPingTime", 0);
    J(this, "disconnectionCallback");
  }
  async initialize(t) {
    this.config = {
      protocols: ["mcp-v1"],
      pingInterval: 3e4,
      pongTimeout: 5e3,
      maxReconnectAttempts: 3,
      binaryType: "arraybuffer",
      ...t
    }, Pe.debug("Initialized with config:", this.config);
  }
  async connect(t) {
    Pe.debug(`Creating transport for: ${t}`);
    try {
      const r = await this.createConnection(t);
      return this.transport = r, Pe.debug("[WebSocketPlugin] Transport created successfully"), r;
    } catch (r) {
      throw Pe.error("[WebSocketPlugin] Transport creation failed:", r), r;
    }
  }
  async createConnection(t) {
    try {
      const r = new URL(t);
      if (r.protocol !== "ws:" && r.protocol !== "wss:")
        throw new Error(`Invalid WebSocket protocol: ${r.protocol}. Expected ws: or wss:`);
      Pe.debug(`Creating WebSocket transport for: ${r.toString()}`);
      const n = new Cy(r.toString(), {
        protocols: this.config.protocols,
        pingInterval: this.config.pingInterval,
        pongTimeout: this.config.pongTimeout,
        binaryType: this.config.binaryType,
        maxReconnectAttempts: this.config.maxReconnectAttempts
      });
      return n.on("close", (o) => {
        Pe.debug(`Transport closed: ${o.code} ${o.reason}`), this.isConnectedFlag = !1, this.handleDisconnection("WebSocket closed", o.code, o.reason);
      }), n.on("error", (o) => {
        Pe.error("[WebSocketPlugin] Transport error:", o), o.message.includes("Pong timeout") || (this.isConnectedFlag = !1, this.handleDisconnection("WebSocket error", void 0, o.message));
      }), Pe.debug("[WebSocketPlugin] WebSocket transport created successfully"), n;
    } catch (r) {
      const n = r instanceof Error ? r.message : String(r);
      let o = n;
      throw n.includes("timeout") ? o = "WebSocket connection timeout. The server may be slow or unreachable." : n.includes("Failed to construct") ? o = "Invalid WebSocket URL format. Check the URI syntax." : n.includes("connection failed") ? o = "WebSocket connection failed. Check if the server is running and accessible." : n.includes("protocol") && (o = "WebSocket protocol error. The server may not support the requested protocols."), new Error(`WebSocket Plugin: ${o}`);
    }
  }
  async disconnect() {
    if (Pe.debug("[WebSocketPlugin] Disconnecting..."), this.transport)
      try {
        await this.transport.close();
      } catch (t) {
        Pe.warn("[WebSocketPlugin] Error during transport cleanup:", t);
      }
    this.transport = null, this.isConnectedFlag = !1, this.connectionPromise = null, Pe.debug("[WebSocketPlugin] Disconnected");
  }
  isConnected() {
    return this.transport !== null;
  }
  isSupported(t) {
    try {
      const r = new URL(t);
      return r.protocol === "ws:" || r.protocol === "wss:";
    } catch {
      return !1;
    }
  }
  getDefaultConfig() {
    return {
      protocols: ["mcp-v1"],
      maxReconnectAttempts: 3,
      binaryType: "arraybuffer"
      // Removed ping/pong settings - using MCP protocol connection management
    };
  }
  async isHealthy() {
    if (!this.isConnected() || !this.transport)
      return !1;
    try {
      const t = this.transport.getReadyState();
      return t === WebSocket.OPEN ? ((this.config.pingInterval || 3e4) > 0, !0) : (Pe.warn(`WebSocket not in OPEN state: ${t}`), !1);
    } catch (t) {
      return Pe.warn("[WebSocketPlugin] Health check failed:", t), !1;
    }
  }
  async callTool(t, r, n) {
    if (!this.isConnected())
      throw new Error("WebSocket Plugin: Not connected");
    Pe.debug(`Calling tool: ${r}`);
    try {
      const o = await t.callTool({ name: r, arguments: n });
      return Pe.debug(`Tool call completed: ${r}`), o;
    } catch (o) {
      throw Pe.error(`Tool call failed: ${r}`, o), this.isConnected() ? o : (this.isConnectedFlag = !1, new Error(`WebSocket connection lost during tool call: ${r}`));
    }
  }
  async getPrimitives(t) {
    if (!this.isConnected())
      throw new Error("WebSocket Plugin: Not connected");
    Pe.debug("[WebSocketPlugin] Getting primitives...");
    try {
      const r = t.getServerCapabilities(), n = [], o = [];
      return r != null && r.resources && o.push(
        t.listResources().then(({ resources: s }) => {
          s.forEach((i) => n.push({ type: "resource", value: i }));
        })
      ), r != null && r.tools && o.push(
        t.listTools().then(({ tools: s }) => {
          s.forEach((i) => n.push({ type: "tool", value: i }));
        })
      ), r != null && r.prompts && o.push(
        t.listPrompts().then(({ prompts: s }) => {
          s.forEach((i) => n.push({ type: "prompt", value: i }));
        })
      ), await Promise.all(o), Pe.debug(`Retrieved ${n.length} primitives`), n;
    } catch (r) {
      throw Pe.error("[WebSocketPlugin] Failed to get primitives:", r), this.isConnected() ? r : (this.isConnectedFlag = !1, new Error("WebSocket connection lost while getting primitives"));
    }
  }
  /**
   * Set a callback to be called when the WebSocket disconnects
   */
  setDisconnectionCallback(t) {
    this.disconnectionCallback = t;
  }
  /**
   * Handle disconnection events by notifying the main client
   */
  handleDisconnection(t, r, n) {
    if (Pe.debug(`Handling disconnection: ${t} (code: ${r}, details: ${n})`), this.disconnectionCallback)
      try {
        this.disconnectionCallback(t, r, n);
      } catch (o) {
        Pe.error("[WebSocketPlugin] Error in disconnection callback:", o);
      }
  }
}
class Ty extends TransformStream {
  constructor({ onError: t, onRetry: r, onComment: n } = {}) {
    let o;
    super({
      start(s) {
        o = bu({
          onEvent: (i) => {
            s.enqueue(i);
          },
          onError(i) {
            t === "terminate" ? s.error(i) : typeof t == "function" && t(i);
          },
          onRetry: r,
          onComment: n
        });
      },
      transform(s) {
        o.feed(s);
      }
    });
  }
}
const Py = {
  initialReconnectionDelay: 1e3,
  maxReconnectionDelay: 3e4,
  reconnectionDelayGrowFactor: 1.5,
  maxRetries: 2
};
class Qt extends Error {
  constructor(t, r) {
    super(`Streamable HTTP error: ${r}`), this.code = t;
  }
}
class Ay {
  constructor(t, r) {
    this._hasCompletedAuthFlow = !1, this._url = t, this._resourceMetadataUrl = void 0, this._scope = void 0, this._requestInit = r == null ? void 0 : r.requestInit, this._authProvider = r == null ? void 0 : r.authProvider, this._fetch = r == null ? void 0 : r.fetch, this._fetchWithInit = Su(r == null ? void 0 : r.fetch, r == null ? void 0 : r.requestInit), this._sessionId = r == null ? void 0 : r.sessionId, this._reconnectionOptions = (r == null ? void 0 : r.reconnectionOptions) ?? Py;
  }
  async _authThenStart() {
    var r;
    if (!this._authProvider)
      throw new mt("No auth provider");
    let t;
    try {
      t = await Wt(this._authProvider, {
        serverUrl: this._url,
        resourceMetadataUrl: this._resourceMetadataUrl,
        scope: this._scope,
        fetchFn: this._fetchWithInit
      });
    } catch (n) {
      throw (r = this.onerror) == null || r.call(this, n), n;
    }
    if (t !== "AUTHORIZED")
      throw new mt();
    return await this._startOrAuthSse({ resumptionToken: void 0 });
  }
  async _commonHeaders() {
    var n;
    const t = {};
    if (this._authProvider) {
      const o = await this._authProvider.tokens();
      o && (t.Authorization = `Bearer ${o.access_token}`);
    }
    this._sessionId && (t["mcp-session-id"] = this._sessionId), this._protocolVersion && (t["mcp-protocol-version"] = this._protocolVersion);
    const r = Un((n = this._requestInit) == null ? void 0 : n.headers);
    return new Headers({
      ...t,
      ...r
    });
  }
  async _startOrAuthSse(t) {
    var n, o, s;
    const { resumptionToken: r } = t;
    try {
      const i = await this._commonHeaders();
      i.set("Accept", "text/event-stream"), r && i.set("last-event-id", r);
      const a = await (this._fetch ?? fetch)(this._url, {
        method: "GET",
        headers: i,
        signal: (n = this._abortController) == null ? void 0 : n.signal
      });
      if (!a.ok) {
        if (await ((o = a.body) == null ? void 0 : o.cancel()), a.status === 401 && this._authProvider)
          return await this._authThenStart();
        if (a.status === 405)
          return;
        throw new Qt(a.status, `Failed to open SSE stream: ${a.statusText}`);
      }
      this._handleSseStream(a.body, t, !0);
    } catch (i) {
      throw (s = this.onerror) == null || s.call(this, i), i;
    }
  }
  /**
   * Calculates the next reconnection delay using  backoff algorithm
   *
   * @param attempt Current reconnection attempt count for the specific stream
   * @returns Time to wait in milliseconds before next reconnection attempt
   */
  _getNextReconnectionDelay(t) {
    if (this._serverRetryMs !== void 0)
      return this._serverRetryMs;
    const r = this._reconnectionOptions.initialReconnectionDelay, n = this._reconnectionOptions.reconnectionDelayGrowFactor, o = this._reconnectionOptions.maxReconnectionDelay;
    return Math.min(r * Math.pow(n, t), o);
  }
  /**
   * Schedule a reconnection attempt using server-provided retry interval or backoff
   *
   * @param lastEventId The ID of the last received event for resumability
   * @param attemptCount Current reconnection attempt count for this specific stream
   */
  _scheduleReconnection(t, r = 0) {
    var s;
    const n = this._reconnectionOptions.maxRetries;
    if (r >= n) {
      (s = this.onerror) == null || s.call(this, new Error(`Maximum reconnection attempts (${n}) exceeded.`));
      return;
    }
    const o = this._getNextReconnectionDelay(r);
    this._reconnectionTimeout = setTimeout(() => {
      this._startOrAuthSse(t).catch((i) => {
        var a;
        (a = this.onerror) == null || a.call(this, new Error(`Failed to reconnect SSE stream: ${i instanceof Error ? i.message : String(i)}`)), this._scheduleReconnection(t, r + 1);
      });
    }, o);
  }
  _handleSseStream(t, r, n) {
    if (!t)
      return;
    const { onresumptiontoken: o, replayMessageId: s } = r;
    let i, a = !1, c = !1;
    (async () => {
      var d, m, g, w;
      try {
        const k = t.pipeThrough(new TextDecoderStream()).pipeThrough(new Ty({
          onRetry: (f) => {
            this._serverRetryMs = f;
          }
        })).getReader();
        for (; ; ) {
          const { value: f, done: u } = await k.read();
          if (u)
            break;
          if (f.id && (i = f.id, a = !0, o == null || o(f.id)), !!f.data && (!f.event || f.event === "message"))
            try {
              const p = Pn.parse(JSON.parse(f.data));
              wr(p) && (c = !0, s !== void 0 && (p.id = s)), (d = this.onmessage) == null || d.call(this, p);
            } catch (p) {
              (m = this.onerror) == null || m.call(this, p);
            }
        }
        (n || a) && !c && this._abortController && !this._abortController.signal.aborted && this._scheduleReconnection({
          resumptionToken: i,
          onresumptiontoken: o,
          replayMessageId: s
        }, 0);
      } catch (k) {
        if ((g = this.onerror) == null || g.call(this, new Error(`SSE stream disconnected: ${k}`)), (n || a) && !c && this._abortController && !this._abortController.signal.aborted)
          try {
            this._scheduleReconnection({
              resumptionToken: i,
              onresumptiontoken: o,
              replayMessageId: s
            }, 0);
          } catch (f) {
            (w = this.onerror) == null || w.call(this, new Error(`Failed to reconnect: ${f instanceof Error ? f.message : String(f)}`));
          }
      }
    })();
  }
  async start() {
    if (this._abortController)
      throw new Error("StreamableHTTPClientTransport already started! If using Client class, note that connect() calls start() automatically.");
    this._abortController = new AbortController();
  }
  /**
   * Call this method after the user has finished authorizing via their user agent and is redirected back to the MCP client application. This will exchange the authorization code for an access token, enabling the next connection attempt to successfully auth.
   */
  async finishAuth(t) {
    if (!this._authProvider)
      throw new mt("No auth provider");
    if (await Wt(this._authProvider, {
      serverUrl: this._url,
      authorizationCode: t,
      resourceMetadataUrl: this._resourceMetadataUrl,
      scope: this._scope,
      fetchFn: this._fetchWithInit
    }) !== "AUTHORIZED")
      throw new mt("Failed to authorize");
  }
  async close() {
    var t, r;
    this._reconnectionTimeout && (clearTimeout(this._reconnectionTimeout), this._reconnectionTimeout = void 0), (t = this._abortController) == null || t.abort(), (r = this.onclose) == null || r.call(this);
  }
  async send(t, r) {
    var n, o, s, i, a, c;
    try {
      const { resumptionToken: l, onresumptiontoken: d } = r || {};
      if (l) {
        this._startOrAuthSse({ resumptionToken: l, replayMessageId: Uo(t) ? t.id : void 0 }).catch((u) => {
          var p;
          return (p = this.onerror) == null ? void 0 : p.call(this, u);
        });
        return;
      }
      const m = await this._commonHeaders();
      m.set("content-type", "application/json"), m.set("accept", "application/json, text/event-stream");
      const g = {
        ...this._requestInit,
        method: "POST",
        headers: m,
        body: JSON.stringify(t),
        signal: (n = this._abortController) == null ? void 0 : n.signal
      }, w = await (this._fetch ?? fetch)(this._url, g), k = w.headers.get("mcp-session-id");
      if (k && (this._sessionId = k), !w.ok) {
        const u = await w.text().catch(() => null);
        if (w.status === 401 && this._authProvider) {
          if (this._hasCompletedAuthFlow)
            throw new Qt(401, "Server returned 401 after successful authentication");
          const { resourceMetadataUrl: p, scope: v } = Hn(w);
          if (this._resourceMetadataUrl = p, this._scope = v, await Wt(this._authProvider, {
            serverUrl: this._url,
            resourceMetadataUrl: this._resourceMetadataUrl,
            scope: this._scope,
            fetchFn: this._fetchWithInit
          }) !== "AUTHORIZED")
            throw new mt();
          return this._hasCompletedAuthFlow = !0, this.send(t);
        }
        if (w.status === 403 && this._authProvider) {
          const { resourceMetadataUrl: p, scope: v, error: b } = Hn(w);
          if (b === "insufficient_scope") {
            const y = w.headers.get("WWW-Authenticate");
            if (this._lastUpscopingHeader === y)
              throw new Qt(403, "Server returned 403 after trying upscoping");
            if (v && (this._scope = v), p && (this._resourceMetadataUrl = p), this._lastUpscopingHeader = y ?? void 0, await Wt(this._authProvider, {
              serverUrl: this._url,
              resourceMetadataUrl: this._resourceMetadataUrl,
              scope: this._scope,
              fetchFn: this._fetch
            }) !== "AUTHORIZED")
              throw new mt();
            return this.send(t);
          }
        }
        throw new Qt(w.status, `Error POSTing to endpoint: ${u}`);
      }
      if (this._hasCompletedAuthFlow = !1, this._lastUpscopingHeader = void 0, w.status === 202) {
        await ((o = w.body) == null ? void 0 : o.cancel()), tm(t) && this._startOrAuthSse({ resumptionToken: void 0 }).catch((u) => {
          var p;
          return (p = this.onerror) == null ? void 0 : p.call(this, u);
        });
        return;
      }
      const h = (Array.isArray(t) ? t : [t]).filter((u) => "method" in u && "id" in u && u.id !== void 0).length > 0, f = w.headers.get("content-type");
      if (h)
        if (f != null && f.includes("text/event-stream"))
          this._handleSseStream(w.body, { onresumptiontoken: d }, !1);
        else if (f != null && f.includes("application/json")) {
          const u = await w.json(), p = Array.isArray(u) ? u.map((v) => Pn.parse(v)) : [Pn.parse(u)];
          for (const v of p)
            (s = this.onmessage) == null || s.call(this, v);
        } else
          throw await ((i = w.body) == null ? void 0 : i.cancel()), new Qt(-1, `Unexpected content type: ${f}`);
      else
        await ((a = w.body) == null ? void 0 : a.cancel());
    } catch (l) {
      throw (c = this.onerror) == null || c.call(this, l), l;
    }
  }
  get sessionId() {
    return this._sessionId;
  }
  /**
   * Terminates the current session by sending a DELETE request to the server.
   *
   * Clients that no longer need a particular session
   * (e.g., because the user is leaving the client application) SHOULD send an
   * HTTP DELETE to the MCP endpoint with the Mcp-Session-Id header to explicitly
   * terminate the session.
   *
   * The server MAY respond with HTTP 405 Method Not Allowed, indicating that
   * the server does not allow clients to terminate sessions.
   */
  async terminateSession() {
    var t, r, n;
    if (this._sessionId)
      try {
        const o = await this._commonHeaders(), s = {
          ...this._requestInit,
          method: "DELETE",
          headers: o,
          signal: (t = this._abortController) == null ? void 0 : t.signal
        }, i = await (this._fetch ?? fetch)(this._url, s);
        if (await ((r = i.body) == null ? void 0 : r.cancel()), !i.ok && i.status !== 405)
          throw new Qt(i.status, `Failed to terminate session: ${i.statusText}`);
        this._sessionId = void 0;
      } catch (o) {
        throw (n = this.onerror) == null || n.call(this, o), o;
      }
  }
  setProtocolVersion(t) {
    this._protocolVersion = t;
  }
  get protocolVersion() {
    return this._protocolVersion;
  }
  /**
   * Resume an SSE stream from a previous event ID.
   * Opens a GET SSE connection with Last-Event-ID header to replay missed events.
   *
   * @param lastEventId The event ID to resume from
   * @param options Optional callback to receive new resumption tokens
   */
  async resumeStream(t, r) {
    await this._startOrAuthSse({
      resumptionToken: t,
      onresumptiontoken: r == null ? void 0 : r.onresumptiontoken
    });
  }
}
const Ie = nt("StreamableHttpPlugin");
class Au {
  constructor() {
    J(this, "metadata", {
      name: "StreamableHttpPlugin",
      version: "1.0.0",
      transportType: "streamable-http",
      description: "Streamable HTTP transport for MCP protocol",
      author: "MCP SuperAssistant"
    });
    J(this, "transport", null);
  }
  async initialize(t) {
    Ie.debug("Initialized with config:", t);
  }
  async connect(t) {
    Ie.debug(`Creating transport for: ${t}`);
    try {
      const r = await this.createConnection(t);
      return this.transport = r, Ie.debug("[StreamableHttpPlugin] Transport created successfully"), r;
    } catch (r) {
      throw Ie.error("[StreamableHttpPlugin] Transport creation failed:", r), r;
    }
  }
  async createConnection(t) {
    try {
      const r = new URL(t);
      Ie.debug(`Creating Streamable HTTP transport for: ${r.toString()}`);
      const n = new Ay(r);
      return Ie.debug("[StreamableHttpPlugin] Streamable HTTP transport created successfully"), n;
    } catch (r) {
      const n = r instanceof Error ? r.message : String(r);
      let o = n;
      throw n.includes("404") ? o = "Streamable HTTP endpoint not found (404). Verify the server URL and endpoint path." : n.includes("timeout") ? o = "Streamable HTTP connection timeout. The server may be slow or unreachable." : n.includes("Failed to fetch") ? o = "Streamable HTTP connection failed. Check if the server is running and accessible." : n.includes("protocol") && (o = "Streamable HTTP protocol error. The server may not support streamable HTTP."), new Error(`StreamableHttpPlugin: ${o}`);
    }
  }
  async disconnect() {
    if (Ie.debug("[StreamableHttpPlugin] Disconnecting..."), this.transport)
      try {
        await this.transport.close();
      } catch (t) {
        Ie.warn("[StreamableHttpPlugin] Error during transport cleanup:", t);
      }
    this.transport = null, Ie.debug("[StreamableHttpPlugin] Disconnected");
  }
  isConnected() {
    return this.transport !== null;
  }
  isSupported(t) {
    try {
      const r = new URL(t);
      return r.protocol === "http:" || r.protocol === "https:";
    } catch {
      return !1;
    }
  }
  getDefaultConfig() {
    return {
      keepAlive: !0,
      connectionTimeout: 5e3,
      readTimeout: 3e4,
      fallbackToSSE: !1,
      maxRetries: 2
    };
  }
  async isHealthy() {
    if (!this.isConnected() || !this.transport)
      return !1;
    try {
      return !0;
    } catch (t) {
      return Ie.warn("[StreamableHttpPlugin] Health check failed:", t), !1;
    }
  }
  async callTool(t, r, n) {
    if (!this.isConnected())
      throw new Error("StreamableHttpPlugin: Not connected");
    Ie.debug(`Calling tool: ${r}`);
    try {
      const o = await t.callTool({ name: r, arguments: n });
      return Ie.debug(`Tool call completed: ${r}`), o;
    } catch (o) {
      throw Ie.error(`Tool call failed: ${r}`, o), o;
    }
  }
  async getPrimitives(t) {
    if (!this.isConnected())
      throw new Error("StreamableHttpPlugin: Not connected");
    Ie.debug("[StreamableHttpPlugin] Getting primitives...");
    try {
      const r = t.getServerCapabilities(), n = [], o = [];
      return r != null && r.resources && o.push(
        t.listResources().then(({ resources: s }) => {
          s.forEach((i) => n.push({ type: "resource", value: i }));
        }).catch((s) => {
          Ie.warn("[StreamableHttpPlugin] Failed to list resources:", s);
        })
      ), r != null && r.tools && o.push(
        t.listTools().then(({ tools: s }) => {
          s.forEach((i) => n.push({ type: "tool", value: i }));
        }).catch((s) => {
          Ie.warn("[StreamableHttpPlugin] Failed to list tools:", s);
        })
      ), r != null && r.prompts && o.push(
        t.listPrompts().then(({ prompts: s }) => {
          s.forEach((i) => n.push({ type: "prompt", value: i }));
        }).catch((s) => {
          Ie.warn("[StreamableHttpPlugin] Failed to list prompts:", s);
        })
      ), await Promise.all(o), Ie.debug(`Retrieved ${n.length} primitives`), n;
    } catch (r) {
      return Ie.error("[StreamableHttpPlugin] Failed to get primitives:", r), [];
    }
  }
}
const bt = nt("PluginRegistry");
class Ry extends wu {
  constructor() {
    super();
    J(this, "plugins", /* @__PURE__ */ new Map());
    J(this, "initialized", /* @__PURE__ */ new Set());
    bt.debug("[PluginRegistry] Initialized");
  }
  async register(r) {
    const { transportType: n } = r.metadata;
    this.plugins.has(n) && bt.warn(`Plugin for transport '${n}' already registered, replacing`), this.plugins.set(n, r), bt.debug(
      `Registered plugin: ${r.metadata.name} v${r.metadata.version} (${n})`
    ), this.emit("registry:plugin-registered", { plugin: r });
  }
  unregister(r) {
    return this.plugins.get(r) ? (this.plugins.delete(r), this.initialized.delete(r), bt.debug(`Unregistered plugin for transport: ${r}`), this.emit("registry:plugin-unregistered", { type: r }), !0) : !1;
  }
  getPlugin(r) {
    return this.plugins.get(r);
  }
  async getInitializedPlugin(r, n) {
    const o = this.getPlugin(r);
    if (!o)
      throw new Error(`Plugin for transport '${r}' not found`);
    if (!this.initialized.has(r)) {
      const s = n || o.getDefaultConfig();
      await o.initialize(s), this.initialized.add(r), bt.debug(`Initialized plugin: ${r}`);
    }
    return o;
  }
  isPluginAvailable(r) {
    return this.plugins.has(r);
  }
  isPluginInitialized(r) {
    return this.initialized.has(r);
  }
  listAvailable() {
    return Array.from(this.plugins.keys());
  }
  listInitialized() {
    return Array.from(this.initialized);
  }
  getPluginInfo(r) {
    const n = this.plugins.get(r);
    return {
      available: !!n,
      initialized: this.initialized.has(r),
      metadata: n == null ? void 0 : n.metadata
    };
  }
  async loadDefaultPlugins() {
    bt.debug("[PluginRegistry] Loading default plugins...");
    try {
      await this.register(new Tu()), await this.register(new Pu()), await this.register(new Au());
      const r = this.plugins.size;
      bt.debug(`Loaded ${r} default plugins`), this.emit("registry:plugins-loaded", { count: r });
    } catch (r) {
      throw bt.error("[PluginRegistry] Failed to load default plugins:", r), new Error(`Failed to load default plugins: ${r instanceof Error ? r.message : String(r)}`);
    }
  }
  clear() {
    this.plugins.clear(), this.initialized.clear(), bt.debug("[PluginRegistry] Cleared all plugins");
  }
  getStats() {
    return {
      totalPlugins: this.plugins.size,
      initializedPlugins: this.initialized.size,
      availableTypes: this.listAvailable(),
      initializedTypes: this.listInitialized()
    };
  }
}
const zo = {
  defaultTransport: "sse",
  defaultUri: "http://127.0.0.1:3006/sse",
  plugins: {
    sse: {
      keepAlive: !0,
      connectionTimeout: 5e3,
      readTimeout: 3e4
    },
    websocket: {
      protocols: ["mcp-v1"],
      pingInterval: 3e4,
      pongTimeout: 5e3,
      maxReconnectAttempts: 3,
      binaryType: "arraybuffer"
    },
    "streamable-http": {
      keepAlive: !0,
      connectionTimeout: 5e3,
      readTimeout: 3e4,
      fallbackToSSE: !1,
      maxRetries: 2
    }
  },
  global: {
    timeout: 3e4,
    maxRetries: 3,
    healthCheckInterval: 6e4,
    reconnectDelay: 2e3,
    logLevel: "info"
  }
}, Iy = "G-6ENY3Y3H9X", Oy = "I0PHa_CWTbuTlXSb3T-kXg", Be = nt("AnalyticsService"), zy = "https://www.google-analytics.com/mp/collect", Ha = !("update_url" in chrome.runtime.getManifest()), Ny = zy, My = 100, jy = 30, Wa = typeof window < "u";
async function qy() {
  try {
    let t = (await chrome.storage.local.get("clientId")).clientId;
    return t || (t = self.crypto.randomUUID(), await chrome.storage.local.set({ clientId: t }), Be.debug("[GA4] Generated new clientId:", t)), t;
  } catch (e) {
    return Be.error("[GA4] Error getting or creating clientId:", e), "error-client-id";
  }
}
async function Dy() {
  try {
    let { sessionData: e } = await chrome.storage.session.get("sessionData");
    const t = Date.now();
    return e && e.timestamp && ((t - e.timestamp) / 6e4 > jy ? (e = null, Be.debug("[GA4] Session expired, starting new one.")) : (e.timestamp = t, await chrome.storage.session.set({ sessionData: e }))), e || (e = {
      session_id: t.toString(),
      timestamp: t
      // Store timestamp as number
    }, await chrome.storage.session.set({ sessionData: e }), Be.debug("[GA4] Created new session:", e.session_id)), e.session_id;
  } catch (e) {
    return Be.error("[GA4] Error getting or creating session_id:", e), "error-session-id";
  }
}
async function Ge(e, t, r) {
  try {
    const n = await qy(), o = await Dy(), s = {
      name: e,
      params: {
        session_id: o,
        engagement_time_msec: My,
        ...t
        // Spread user-provided params
      }
    }, i = {
      client_id: n,
      events: [s]
    };
    r && (i.user_properties = r), Be.debug(`[GA4] Sending event: ${e}`, JSON.stringify(t));
    const a = await fetch(`${Ny}?measurement_id=${Iy}&api_secret=${Oy}`, {
      method: "POST",
      body: JSON.stringify(i),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (a.ok) {
      if (Be.debug("[GA4] Event sent successfully."), Ha && a.status !== 204)
        try {
          const c = await a.json();
          Be.debug("[GA4] Debug endpoint success response:", JSON.stringify(c, null, 2));
        } catch {
          Be.debug("[GA4] Debug endpoint success response likely had no body (e.g., 200 OK with empty body).");
        }
    } else if (Be.warn(`[GA4] Analytics request failed: ${a.status} ${a.statusText}`), Ha)
      try {
        const c = await a.json();
        Be.error("[GA4] Debug endpoint error response:", JSON.stringify(c, null, 2));
      } catch {
        Be.error("[GA4] Debug endpoint error response could not be parsed as JSON:", await a.text());
      }
  } catch (n) {
    Be.error("[GA4] Error sending analytics event:", n);
  }
}
function as() {
  try {
    const e = (navigator == null ? void 0 : navigator.userAgent) || "Unknown", t = (navigator == null ? void 0 : navigator.language) || "en";
    let r = "Unknown", n = "Unknown", o = "Unknown", s = "Unknown";
    if (e.indexOf("Firefox") > -1) {
      r = "Firefox";
      const g = e.match(/Firefox\/(\d+\.\d+)/);
      n = g && g[1] ? g[1] : "Unknown";
    } else if (e.indexOf("Edg") > -1) {
      r = "Edge";
      const g = e.match(/Edg\/(\d+\.\d+)/);
      n = g && g[1] ? g[1] : "Unknown";
    } else if (e.indexOf("Chrome") > -1) {
      r = "Chrome";
      const g = e.match(/Chrome\/(\d+\.\d+)/);
      n = g && g[1] ? g[1] : "Unknown";
    } else if (e.indexOf("Safari") > -1) {
      r = "Safari";
      const g = e.match(/Version\/(\d+\.\d+)/);
      n = g && g[1] ? g[1] : "Unknown";
    } else if (e.indexOf("MSIE") > -1 || e.indexOf("Trident/") > -1) {
      r = "Internet Explorer";
      const g = e.match(/(?:MSIE |rv:)(\d+\.\d+)/);
      n = g && g[1] ? g[1] : "Unknown";
    }
    if (e.indexOf("Windows") > -1) {
      o = "Windows";
      const g = e.match(/Windows NT (\d+\.\d+)/), w = g && g[1] ? g[1] : "Unknown";
      s = {
        "10.0": "10/11",
        "6.3": "8.1",
        "6.2": "8",
        "6.1": "7",
        "6.0": "Vista",
        "5.2": "XP x64",
        "5.1": "XP"
      }[w] || w;
    } else if (e.indexOf("Mac") > -1) {
      o = "macOS";
      const g = e.match(/Mac OS X ([\d_]+)/);
      s = g && g[1] ? g[1].replace(/_/g, ".") : "Unknown";
    } else if (e.indexOf("Linux") > -1) {
      o = "Linux";
      const g = e.match(/Linux ([\w\d\.]+)/);
      s = g && g[1] ? g[1] : "Unknown";
    } else if (e.indexOf("Android") > -1) {
      o = "Android";
      const g = e.match(/Android ([\d\.]+)/);
      s = g && g[1] ? g[1] : "Unknown";
    } else if (e.indexOf("iOS") > -1 || e.indexOf("iPhone") > -1 || e.indexOf("iPad") > -1) {
      o = "iOS";
      const g = e.match(/OS ([\d_]+)/);
      s = g && g[1] ? g[1].replace(/_/g, ".") : "Unknown";
    }
    let i = "desktop";
    /Mobi|Android|iPhone|iPad|iPod/i.test(e) && (i = /iPad|tablet/i.test(e) ? "tablet" : "mobile");
    const a = t.split("-")[1] || t;
    let c = "Unknown", l = 1, d = "Unknown", m = 0;
    if (Wa && typeof window < "u")
      try {
        c = `${window.screen.width}x${window.screen.height}`, l = window.devicePixelRatio || 1, d = Intl.DateTimeFormat().resolvedOptions().timeZone, m = (/* @__PURE__ */ new Date()).getTimezoneOffset() / -60;
      } catch (g) {
        Be.debug("[GA4] Window-dependent features not available:", g);
      }
    return {
      browser: r,
      browser_version: n,
      operating_system: o,
      os_version: s,
      language: t,
      region: a,
      screen_resolution: c,
      pixel_ratio: l,
      device_type: i,
      timezone: d,
      timezone_offset: m,
      user_agent: e,
      context: Wa ? "content_script" : "background_service_worker"
    };
  } catch (e) {
    return Be.error("[GA4] Error collecting demographic data:", e), {
      browser: "Unknown",
      browser_version: "Unknown",
      operating_system: "Unknown",
      os_version: "Unknown",
      language: "en",
      region: "Unknown",
      screen_resolution: "Unknown",
      pixel_ratio: 1,
      device_type: "desktop",
      timezone: "Unknown",
      timezone_offset: 0,
      user_agent: "Unknown",
      context: "error",
      error: "Failed to collect demographic data"
    };
  }
}
async function Ru(e, t) {
  var r;
  await Ge("extension_error", {
    error_message: e.message,
    error_stack: (r = e.stack) == null ? void 0 : r.substring(0, 500),
    // Limit stack trace length
    error_context: t
  });
}
const Dt = nt("AnalyticsService"), Ht = class Ht {
  // 2 seconds
  constructor() {
    // Session state
    J(this, "sessionStartTime", Date.now());
    J(this, "sessionToolExecutions", 0);
    J(this, "sessionUniqueTools", /* @__PURE__ */ new Set());
    J(this, "sessionAdapters", /* @__PURE__ */ new Set());
    J(this, "sessionConnections", 0);
    J(this, "sessionErrors", 0);
    J(this, "lastUserAction", "none");
    // User properties cache
    J(this, "userProperties", {});
    J(this, "demographicData", {});
    // Connection state
    J(this, "currentConnectionStatus", "disconnected");
    J(this, "connectionStartTime", null);
    J(this, "currentTransportType", null);
    J(this, "toolsAvailableCount", 0);
    // Active adapter
    J(this, "activeAdapter", null);
    // Debouncing for connection events
    J(this, "lastConnectionTrackTime", 0);
    J(this, "CONNECTION_TRACK_DEBOUNCE", 2e3);
    this.initialize();
  }
  static getInstance() {
    return Ht.instance || (Ht.instance = new Ht()), Ht.instance;
  }
  /**
   * Initialize analytics service with user properties
   */
  async initialize() {
    try {
      const t = await chrome.storage.local.get([
        "installDate",
        "version",
        "userProperties",
        "ga4UserPropertiesSet"
      ]);
      this.demographicData = as(), this.userProperties = {
        extension_version: chrome.runtime.getManifest().version,
        install_date: t.installDate || (/* @__PURE__ */ new Date()).toISOString(),
        ...this.demographicData,
        ...t.userProperties || {}
      }, Dt.debug("[AnalyticsService] Initialized with user properties:", this.userProperties), t.ga4UserPropertiesSet || (await this.setGA4UserProperties(), await chrome.storage.local.set({ ga4UserPropertiesSet: !0 }));
    } catch (t) {
      Dt.error("[AnalyticsService] Initialization failed:", t);
    }
  }
  /**
   * Set GA4 user properties (called once on first launch)
   * These are static demographics that don't change and will be available in all GA4 reports
   */
  async setGA4UserProperties() {
    try {
      const t = {
        extension_version: { value: this.userProperties.extension_version },
        install_date: { value: this.userProperties.install_date },
        browser: { value: this.demographicData.browser },
        browser_version: { value: this.demographicData.browser_version },
        operating_system: { value: this.demographicData.operating_system },
        os_version: { value: this.demographicData.os_version },
        device_type: { value: this.demographicData.device_type },
        language: { value: this.demographicData.language },
        region: { value: this.demographicData.region },
        screen_resolution: { value: this.demographicData.screen_resolution },
        pixel_ratio: { value: this.demographicData.pixel_ratio },
        timezone: { value: this.demographicData.timezone },
        timezone_offset: { value: this.demographicData.timezone_offset }
      };
      await Ge("user_properties_initialized", {}, t), Dt.debug("[AnalyticsService] GA4 user properties set successfully");
    } catch (t) {
      Dt.error("[AnalyticsService] Failed to set GA4 user properties:", t);
    }
  }
  /**
   * Get common event parameters that should be included in all events
   * Note: Static demographics (browser, OS, etc.) are set as GA4 user properties
   * and don't need to be included in every event.
   */
  getCommonParameters() {
    return {
      // Dynamic/session-specific fields only
      extension_version: this.userProperties.extension_version,
      // Can change on update
      session_duration_ms: Date.now() - this.sessionStartTime,
      // Increases over time
      user_segment: this.getUserSegment(),
      // Changes with usage
      days_since_install: this.getDaysSinceInstall()
      // Increases daily
    };
  }
  /**
   * Track tool execution with enhanced context
   */
  async trackToolExecution(t) {
    const r = this.sessionToolExecutions === 0;
    this.sessionToolExecutions++, this.sessionUniqueTools.add(t.tool_name);
    const n = t.adapter_name || this.activeAdapter || "none";
    await Ge("mcp_tool_executed", {
      ...t,
      ...this.getCommonParameters(),
      connection_status: this.currentConnectionStatus,
      active_adapter: n,
      // Use adapter name from content script
      tools_available_count: this.toolsAvailableCount,
      session_tool_count: this.sessionToolExecutions,
      is_first_tool_execution: r,
      unique_tools_used: this.sessionUniqueTools.size
    }), t.execution_status === "error" && this.sessionErrors++;
  }
  /**
   * Track connection status changes
   */
  async trackConnectionChange(t) {
    const r = Date.now();
    if (!(t.tools_discovered && t.tools_discovered > 0 && this.toolsAvailableCount === 0) && r - this.lastConnectionTrackTime < this.CONNECTION_TRACK_DEBOUNCE) {
      Dt.debug("[AnalyticsService] Connection event debounced (too soon after last event)"), this.currentConnectionStatus = t.connection_status, this.currentTransportType = t.transport_type, t.tools_discovered && (this.toolsAvailableCount = t.tools_discovered);
      return;
    }
    this.lastConnectionTrackTime = r;
    const o = this.currentConnectionStatus, s = this.connectionStartTime ? Date.now() - this.connectionStartTime : 0;
    this.currentConnectionStatus = t.connection_status, this.currentTransportType = t.transport_type, t.connection_status === "connected" ? (this.connectionStartTime = Date.now(), this.sessionConnections++, this.toolsAvailableCount = t.tools_discovered || 0) : t.connection_status === "disconnected" && (this.connectionStartTime = null, this.toolsAvailableCount = 0), await Ge("mcp_connection_changed", {
      ...t,
      ...this.getCommonParameters(),
      previous_status: o,
      connection_duration_ms: s,
      session_connections_count: this.sessionConnections,
      active_adapter: this.activeAdapter || "none"
    }), t.connection_status === "error" && this.sessionErrors++;
  }
  /**
   * Track adapter activation
   */
  async trackAdapterActivation(t) {
    const r = this.activeAdapter;
    this.activeAdapter = t.adapter_name, this.sessionAdapters.add(t.adapter_name), this.toolsAvailableCount = t.tools_available, await Ge("adapter_activated", {
      ...t,
      ...this.getCommonParameters(),
      previous_adapter: r || "none",
      session_adapter_switches: this.sessionAdapters.size,
      connection_status: this.currentConnectionStatus
    });
  }
  /**
   * Track feature usage
   */
  async trackFeatureUsage(t) {
    this.lastUserAction = t.feature_name, await Ge("feature_used", {
      ...t,
      ...this.getCommonParameters(),
      active_adapter: this.activeAdapter || "none",
      connection_status: this.currentConnectionStatus,
      tools_available: this.toolsAvailableCount
    });
  }
  /**
   * Track enhanced error with context
   */
  async trackError(t) {
    var r;
    this.sessionErrors++, await Ge("extension_error", {
      ...t,
      ...this.getCommonParameters(),
      error_stack: (r = t.error_stack) == null ? void 0 : r.substring(0, 500),
      // Limit stack trace
      user_action_before_error: this.lastUserAction,
      tools_available_when_error: this.toolsAvailableCount,
      connection_status: this.currentConnectionStatus,
      active_adapter: this.activeAdapter || "none",
      session_errors_count: this.sessionErrors
    });
  }
  /**
   * Track session summary (call on extension unload or periodically)
   */
  async trackSessionSummary() {
    const t = Date.now() - this.sessionStartTime;
    await Ge("session_summary", {
      ...this.getCommonParameters(),
      session_duration_ms: t,
      tools_executed_count: this.sessionToolExecutions,
      unique_tools_used: this.sessionUniqueTools.size,
      unique_adapters_used: this.sessionAdapters.size,
      adapters_activated: Array.from(this.sessionAdapters),
      connections_made: this.sessionConnections,
      errors_encountered: this.sessionErrors,
      final_connection_status: this.currentConnectionStatus
    });
  }
  /**
   * Update user properties (call on extension install/update)
   */
  async updateUserProperties(t) {
    this.userProperties = {
      ...this.userProperties,
      ...t
    }, await chrome.storage.local.set({ userProperties: this.userProperties }), Dt.debug("[AnalyticsService] User properties updated:", this.userProperties);
  }
  /**
   * Reset session state (call on new session start)
   */
  resetSession() {
    this.sessionStartTime = Date.now(), this.sessionToolExecutions = 0, this.sessionUniqueTools.clear(), this.sessionAdapters.clear(), this.sessionConnections = 0, this.sessionErrors = 0, this.lastUserAction = "none", Dt.debug("[AnalyticsService] Session reset");
  }
  /**
   * Get days since installation
   */
  getDaysSinceInstall() {
    const t = this.userProperties.install_date;
    if (!t) return 0;
    const r = new Date(t).getTime(), n = Date.now();
    return Math.floor((n - r) / (1e3 * 60 * 60 * 24));
  }
  /**
   * Determine user segment based on usage patterns
   */
  getUserSegment() {
    const t = this.getDaysSinceInstall(), r = this.sessionToolExecutions;
    return t < 7 ? "new_user" : t < 30 ? r > 20 ? "engaged_new_user" : "recent_user" : r > 100 ? "power_user" : r > 30 ? "active_user" : r > 5 ? "regular_user" : "casual_user";
  }
  /**
   * Get current session state (for debugging)
   */
  getSessionState() {
    return {
      sessionDuration: Date.now() - this.sessionStartTime,
      toolExecutions: this.sessionToolExecutions,
      uniqueTools: this.sessionUniqueTools.size,
      adapters: Array.from(this.sessionAdapters),
      connections: this.sessionConnections,
      errors: this.sessionErrors,
      connectionStatus: this.currentConnectionStatus,
      activeAdapter: this.activeAdapter,
      toolsAvailable: this.toolsAvailableCount,
      userSegment: this.getUserSegment(),
      daysSinceInstall: this.getDaysSinceInstall()
    };
  }
};
J(Ht, "instance", null);
let cs = Ht;
const Lt = cs.getInstance(), re = nt("McpClient");
class Ja extends wu {
  // 5 minutes
  constructor(r = {}) {
    super();
    J(this, "registry");
    J(this, "config");
    J(this, "client", null);
    J(this, "activePlugin", null);
    J(this, "activeTransport", null);
    J(this, "isConnectedFlag", !1);
    J(this, "connectionPromise", null);
    J(this, "healthCheckTimer", null);
    J(this, "primitivesCache", null);
    J(this, "primitivesCacheTime", 0);
    J(this, "CACHE_TTL", 3e5);
    this.config = {
      ...zo,
      ...r,
      global: {
        ...zo.global,
        ...r.global
      },
      plugins: {
        ...zo.plugins,
        ...r.plugins
      }
    }, this.registry = new Ry(), this.registry.on("registry:plugin-registered", (n) => {
      this.emit("registry:plugin-registered", n);
    }), this.registry.on("registry:plugins-loaded", (n) => {
      this.emit("registry:plugins-loaded", n);
    }), re.debug("[McpClient] Initialized with config:", this.config), this.emit("client:initialized", { config: this.config });
  }
  async initialize() {
    try {
      re.debug("[McpClient] Loading default plugins..."), await this.registry.loadDefaultPlugins(), re.debug("[McpClient] Initialization complete");
    } catch (r) {
      re.error("[McpClient] Initialization failed:", r), re.debug("[McpClient] Attempting manual plugin registration as fallback...");
      try {
        await this.manualPluginRegistration(), re.debug("[McpClient] Manual plugin registration successful");
      } catch (n) {
        throw re.error("[McpClient] Manual plugin registration also failed:", n), r;
      }
    }
  }
  async manualPluginRegistration() {
    await this.registry.register(new Tu()), await this.registry.register(new Pu()), await this.registry.register(new Au()), re.debug("[McpClient] Manual plugin registration completed");
  }
  async connect(r) {
    var n, o, s, i;
    if (this.isConnectedFlag && ((n = this.activePlugin) == null ? void 0 : n.metadata.transportType) === r.type) {
      re.debug(`Already connected via ${r.type}, skipping`);
      return;
    }
    if (this.connectionPromise) {
      re.debug("[McpClient] Connection already in progress, waiting...");
      try {
        if (await this.connectionPromise, this.isConnectedFlag && ((o = this.activePlugin) == null ? void 0 : o.metadata.transportType) === r.type) {
          re.debug("[McpClient] Existing connection matches request");
          return;
        }
      } catch {
        re.debug("[McpClient] Previous connection failed, starting new one"), this.connectionPromise = null;
      }
    }
    this.isConnectedFlag && ((s = this.activePlugin) == null ? void 0 : s.metadata.transportType) !== r.type && (re.debug(`Switching from ${(i = this.activePlugin) == null ? void 0 : i.metadata.transportType} to ${r.type}`), await this.disconnect()), this.connectionPromise = this.performConnection(r);
    try {
      await this.connectionPromise;
    } finally {
      this.connectionPromise = null;
    }
  }
  async performConnection(r) {
    const { uri: n, type: o, config: s } = r;
    try {
      re.debug(`Connecting to ${n} via ${o}`), this.emit("client:connecting", { uri: n, type: o }), this.isConnectedFlag && await this.disconnect();
      const i = {
        ...this.config.plugins[o],
        ...s
      }, a = await this.registry.getInitializedPlugin(o, i);
      if (!a.isSupported(n))
        throw new Error(`Plugin ${o} does not support URI: ${n}`);
      const c = await a.connect(n);
      o === "websocket" && "setDisconnectionCallback" in a && a.setDisconnectionCallback((g, w, k) => {
        re.debug(`WebSocket disconnection detected: ${g} (code: ${w})`), this.isConnectedFlag = !1, this.emit("connection:status-changed", {
          isConnected: !1,
          type: "websocket",
          error: `WebSocket disconnected: ${g}${w ? ` (code: ${w})` : ""}${k ? ` - ${k}` : ""}`
        }), this.cleanup().catch((_) => {
          re.error("[McpClient] Error during cleanup after WebSocket disconnection:", _);
        });
      }), this.client = new x_(
        {
          name: `mcp-client-${o}`,
          version: "1.0.0"
        },
        { capabilities: {} }
      ), this.client.setNotificationHandler(au, (g) => {
        re.debug("Server log:", g.params.data);
      }), re.debug("Starting MCP client connection to transport...");
      const l = 3e4, d = this.client.connect(c), m = new Promise((g, w) => {
        setTimeout(() => {
          w(new Error(`MCP client connection timeout after ${l}ms`));
        }, l);
      });
      await Promise.race([d, m]), re.debug("MCP client connected successfully"), this.activePlugin = a, this.activeTransport = c, this.isConnectedFlag = !0, this.clearPrimitivesCache(), this.startHealthMonitoring(), re.debug(`Successfully connected via ${o}`), this.emit("client:connected", { uri: n, type: o }), this.emit("connection:status-changed", {
        isConnected: !0,
        type: o,
        error: void 0
      }), Lt.trackConnectionChange({
        connection_status: "connected",
        transport_type: o,
        tools_discovered: 0
        // Will be updated after getPrimitives
      }).catch((g) => {
        re.warn("[McpClient] Analytics tracking failed:", g);
      });
    } catch (i) {
      const a = i instanceof Error ? i.message : String(i);
      throw re.error("Connection failed:", i), await this.cleanup(), this.emit("client:error", {
        error: i instanceof Error ? i : new Error(a),
        context: "connection"
      }), this.emit("connection:status-changed", {
        isConnected: !1,
        type: o,
        error: a
      }), Lt.trackConnectionChange({
        connection_status: "error",
        transport_type: o,
        error_type: i instanceof Error ? i.name : "UnknownError"
      }).catch((c) => {
        re.warn("[McpClient] Analytics tracking failed:", c);
      }), i;
    }
  }
  async disconnect() {
    var n;
    if (!this.isConnectedFlag) {
      re.debug("[McpClient] Already disconnected");
      return;
    }
    const r = (n = this.activePlugin) == null ? void 0 : n.metadata.transportType;
    re.debug(`Disconnecting from ${r || "unknown"}`), r && this.emit("client:disconnecting", { type: r });
    try {
      await this.cleanup(), re.debug("[McpClient] Disconnected successfully"), r && this.emit("client:disconnected", { type: r }), this.emit("connection:status-changed", {
        isConnected: !1,
        type: r || null
      });
    } catch (o) {
      re.error("[McpClient] Error during disconnect:", o), this.emit("client:error", {
        error: o instanceof Error ? o : new Error(String(o)),
        context: "disconnect"
      });
    }
  }
  async cleanup() {
    if (this.stopHealthMonitoring(), this.client) {
      try {
        await this.client.close();
      } catch (r) {
        re.warn("[McpClient] Error closing client:", r);
      }
      this.client = null;
    }
    if (this.activePlugin) {
      try {
        await this.activePlugin.disconnect();
      } catch (r) {
        re.warn("[McpClient] Error disconnecting plugin:", r);
      }
      this.activePlugin = null;
    }
    this.activeTransport = null, this.isConnectedFlag = !1, this.clearPrimitivesCache();
  }
  async callTool(r, n, o) {
    var i, a, c;
    if (!this.isConnectedFlag || !this.activePlugin || !this.client)
      throw new Error("Not connected to any MCP server");
    const s = Date.now();
    this.emit("tool:call-started", { toolName: r, args: n });
    try {
      re.debug(`Calling tool: ${r}`);
      const l = await this.activePlugin.callTool(this.client, r, n), d = Date.now() - s;
      return this.emit("tool:call-completed", { toolName: r, result: l, duration: d }), Lt.trackToolExecution({
        tool_name: r,
        execution_status: "success",
        execution_duration_ms: d,
        transport_type: ((i = this.activePlugin) == null ? void 0 : i.metadata.transportType) || "unknown",
        adapter_name: o
        // Pass adapter name from content script
      }).catch((m) => {
        re.warn("[McpClient] Analytics tracking failed:", m);
      }), l;
    } catch (l) {
      const d = Date.now() - s, m = l instanceof Error ? l : new Error(String(l));
      throw this.emit("tool:call-failed", { toolName: r, error: m, duration: d }), Lt.trackToolExecution({
        tool_name: r,
        execution_status: "error",
        execution_duration_ms: d,
        transport_type: ((a = this.activePlugin) == null ? void 0 : a.metadata.transportType) || "unknown",
        error_type: m.name || "UnknownError",
        adapter_name: o
        // Pass adapter name from content script
      }).catch((g) => {
        re.warn("[McpClient] Analytics tracking failed:", g);
      }), await this.isHealthy() || (this.isConnectedFlag = !1, this.emit("connection:status-changed", {
        isConnected: !1,
        type: ((c = this.activePlugin) == null ? void 0 : c.metadata.transportType) || null,
        error: "Connection lost during tool call"
      })), m;
    }
  }
  async getPrimitives(r = !1) {
    var n;
    if (!this.isConnectedFlag || !this.activePlugin || !this.client)
      throw new Error("Not connected to any MCP server");
    if (!r && this.primitivesCache && this.isCacheValid())
      return re.debug("[McpClient] Returning cached primitives"), this.primitivesCache;
    try {
      re.debug("[McpClient] Fetching primitives from server...");
      const o = await this.activePlugin.getPrimitives(this.client), s = this.normalizeTools(o.filter((l) => l.type === "tool")), i = o.filter((l) => l.type === "resource").map((l) => l.value), a = o.filter((l) => l.type === "prompt").map((l) => l.value), c = {
        tools: s,
        resources: i,
        prompts: a,
        timestamp: Date.now()
      };
      return this.primitivesCache = c, this.primitivesCacheTime = Date.now(), this.emit("tools:list-updated", {
        tools: s,
        type: this.activePlugin.metadata.transportType
      }), (this.primitivesCache === null || this.primitivesCache.tools.length === 0) && Lt.trackConnectionChange({
        connection_status: "connected",
        transport_type: this.activePlugin.metadata.transportType,
        tools_discovered: s.length
      }).catch((l) => {
        re.warn("[McpClient] Analytics tracking failed:", l);
      }), re.debug(
        `Retrieved ${s.length} tools, ${i.length} resources, ${a.length} prompts`
      ), c;
    } catch (o) {
      throw re.error("[McpClient] Failed to get primitives:", o), await this.isHealthy() || (this.isConnectedFlag = !1, this.emit("connection:status-changed", {
        isConnected: !1,
        type: ((n = this.activePlugin) == null ? void 0 : n.metadata.transportType) || null,
        error: "Connection lost while getting primitives"
      })), o;
    }
  }
  normalizeTools(r) {
    return r.map((n) => {
      const o = n.value;
      return {
        name: o.name,
        description: o.description || "",
        input_schema: o.inputSchema || o.input_schema || {},
        schema: o.inputSchema ? JSON.stringify(o.inputSchema) : o.input_schema ? JSON.stringify(o.input_schema) : "{}",
        ...o.uri && { uri: o.uri },
        ...o.arguments && { arguments: o.arguments }
      };
    });
  }
  clearPrimitivesCache() {
    this.primitivesCache = null, this.primitivesCacheTime = 0;
  }
  isCacheValid() {
    return Date.now() - this.primitivesCacheTime < this.CACHE_TTL;
  }
  async isHealthy() {
    if (!this.isConnectedFlag || !this.activePlugin)
      return !1;
    try {
      return await this.activePlugin.isHealthy();
    } catch (r) {
      return re.warn("[McpClient] Health check failed:", r), !1;
    }
  }
  isConnected() {
    var r;
    return this.isConnectedFlag && ((r = this.activePlugin) == null ? void 0 : r.isConnected()) === !0;
  }
  getConnectionInfo() {
    var r, n;
    return {
      isConnected: this.isConnectedFlag,
      type: ((r = this.activePlugin) == null ? void 0 : r.metadata.transportType) || null,
      uri: null,
      // Could store this if needed
      pluginInfo: ((n = this.activePlugin) == null ? void 0 : n.metadata) || null
    };
  }
  getAvailableTransports() {
    return this.registry.listAvailable();
  }
  async switchTransport(r) {
    var o;
    const n = ((o = this.activePlugin) == null ? void 0 : o.metadata.transportType) || null;
    n === r.type ? re.debug(`Already using ${r.type}, reconnecting...`) : (re.debug(`Switching from ${n} to ${r.type}`), this.emit("client:plugin-switched", { from: n, to: r.type })), await this.connect(r);
  }
  startHealthMonitoring() {
    const r = this.config.global.healthCheckInterval;
    r <= 0 || (this.healthCheckTimer = setInterval(async () => {
      var n;
      if (!this.isConnectedFlag) {
        this.stopHealthMonitoring();
        return;
      }
      try {
        const o = await this.isHealthy(), s = ((n = this.activePlugin) == null ? void 0 : n.metadata.transportType) || null;
        s && this.emit("connection:health-check", {
          healthy: o,
          type: s,
          timestamp: Date.now()
        }), o || (re.warn(`Health check failed for ${s}`), this.isConnectedFlag = !1, this.emit("connection:status-changed", {
          isConnected: !1,
          type: s,
          error: "Health check failed"
        }));
      } catch (o) {
        re.error("[McpClient] Health check error:", o);
      }
    }, r));
  }
  stopHealthMonitoring() {
    this.healthCheckTimer && (clearInterval(this.healthCheckTimer), this.healthCheckTimer = null);
  }
  getConfig() {
    return { ...this.config };
  }
  updateConfig(r) {
    this.config = {
      ...this.config,
      ...r,
      global: {
        ...this.config.global,
        ...r.global
      },
      plugins: {
        ...this.config.plugins,
        ...r.plugins
      }
    }, re.debug("[McpClient] Configuration updated");
  }
}
const kt = nt("mcp_client");
let at = null;
async function qr() {
  if (!at)
    try {
      at = new Ja(), await at.initialize(), Ka(at);
    } catch (e) {
      kt.error("[getGlobalClient] Failed to initialize client:", e), at = new Ja(), Ka(at);
    }
  return at;
}
function Ka(e) {
  e.on("connection:status-changed", (t) => {
    kt.debug("[Global Client] Connection status changed:", t), typeof window < "u" && window.dispatchEvent && window.dispatchEvent(new CustomEvent("mcp:connection-status-changed", {
      detail: t
    })), typeof chrome < "u" && chrome.runtime && chrome.runtime.sendMessage && chrome.runtime.sendMessage({
      type: "mcp:connection-status-changed",
      payload: t,
      origin: "mcpclient"
    }).catch(() => {
    });
  }), e.on("client:connected", (t) => {
    kt.debug("[Global Client] Client connected:", t);
  }), e.on("client:disconnected", (t) => {
    kt.debug("[Global Client] Client disconnected:", t);
  }), e.on("client:error", (t) => {
    kt.error("[Global Client] Client error:", t);
  });
}
function io(e) {
  try {
    const t = new URL(e);
    return t.protocol === "ws:" || t.protocol === "wss:" ? "websocket" : "sse";
  } catch {
    return "sse";
  }
}
function xy() {
  return at ? at.isConnected() : !1;
}
async function Zt() {
  try {
    return await (await qr()).isHealthy();
  } catch (e) {
    return kt.error("[Backward Compatibility] checkMcpServerConnection failed:", e), !1;
  }
}
async function Uy(e, t, r, n, o) {
  const s = await qr(), i = o || io(e);
  return s.isConnected() || await s.connect({ uri: e, type: i }), await s.callTool(t, r, n);
}
async function ar(e, t = !1, r) {
  const n = await qr(), o = r || io(e);
  n.isConnected() || await n.connect({ uri: e, type: o });
  const s = await n.getPrimitives(t), i = [];
  return s.tools.forEach((a) => {
    i.push({ type: "tool", value: a });
  }), s.resources.forEach((a) => {
    i.push({ type: "resource", value: a });
  }), s.prompts.forEach((a) => {
    i.push({ type: "prompt", value: a });
  }), i;
}
async function Ba(e, t) {
  const r = await qr(), n = t || io(e);
  r.isConnected() && await r.disconnect(), await r.connect({ uri: e, type: n });
}
async function Fy(e, t) {
  const r = await qr(), n = t || io(e);
  await r.connect({ uri: e, type: n });
  const o = await r.getPrimitives();
  kt.debug(`Connected, found ${o.tools.length} tools, ${o.resources.length} resources, ${o.prompts.length} prompts`);
}
function Ly() {
  at && at.isConnected() && at.disconnect().catch((e) => {
    kt.error("[Backward Compatibility] resetMcpConnectionState failed:", e);
  });
}
function Zy() {
  kt.debug("[Backward Compatibility] resetMcpConnectionStateForRecovery - handled by plugin health monitoring");
}
function cr(e) {
  return e.filter((t) => t.type === "tool").map((t) => {
    const r = t.value;
    return {
      name: r.name,
      description: r.description || "",
      input_schema: r.inputSchema || r.input_schema || {},
      schema: r.inputSchema ? JSON.stringify(r.inputSchema) : r.input_schema ? JSON.stringify(r.input_schema) : "{}",
      ...r.uri && { uri: r.uri },
      ...r.arguments && { arguments: r.arguments }
    };
  });
}
const x = nt("BACKGROUND"), Wn = "http://127.0.0.1:3006/sse", Iu = "ws://127.0.0.1:3006/message", Vy = "http://127.0.0.1:3006", us = "sse";
let ze = null, Er = Wn, Oe = us, Ou = !1, ls = !1;
function normalizeLocalMcpUrl(e) {
  try {
    const t = new URL(e);
    if (t.hostname === "localhost" && t.port === "3006")
      return e.replace(t.hostname, "127.0.0.1");
  } catch {
  }
  return e;
}
async function Hy() {
  try {
    const e = await chrome.storage.local.get(["mcpServerUrl", "mcpConnectionType"]);
    Oe = e.mcpConnectionType || us;
    const t = Oe === "websocket" ? Iu : Oe === "streamable-http" ? Vy : Wn;
    Er = normalizeLocalMcpUrl(e.mcpServerUrl || t), e.mcpServerUrl && Er !== e.mcpServerUrl && await chrome.storage.local.set({ mcpServerUrl: Er }), ls = !0, x.debug("[Background] Server config loaded from storage:", {
      url: Er,
      type: Oe
    });
  } catch (e) {
    x.warn("[Background] Failed to load server config from storage, using defaults:", e), Oe = us, Er = Wn, ls = !0;
  }
}
async function Wy() {
  for (; !ls; )
    await new Promise((e) => setTimeout(e, 100));
}
function Pt() {
  return Er;
}
function Jy(e, t) {
  Er = normalizeLocalMcpUrl(e), t && (Oe = t), x.debug("[Background] Server config updated to:", { url: Er, type: Oe });
}
function zu() {
  return Ou;
}
function gt(e) {
  Ou = e, x.debug("[Background] Connection status updated to:", e);
}
let Vt = !1, Ut = 0;
const No = 3;
function Ky(e) {
  const t = e.message.toLowerCase(), r = [
    /tool .* not found/i,
    /tool not found/i,
    /method not found/i,
    /invalid arguments/i,
    /invalid parameters/i,
    /mcp error -32602/i,
    // Invalid params
    /mcp error -32601/i,
    // Method not found
    /mcp error -32600/i,
    // Invalid request
    /tool '[^']+' is not available/i,
    /tool '[^']+' not found on server/i
  ], n = [
    /connection refused/i,
    /econnrefused/i,
    /timeout/i,
    /etimedout/i,
    /enotfound/i,
    /network error/i,
    /server unavailable/i,
    /could not connect/i,
    /connection failed/i,
    /transport error/i,
    /fetch failed/i
  ];
  return r.some((o) => o.test(t)) ? { isConnectionError: !1, isToolError: !0, category: "tool_error" } : n.some((o) => o.test(t)) ? { isConnectionError: !0, isToolError: !1, category: "connection_error" } : { isConnectionError: !1, isToolError: !0, category: "unknown_tool_error" };
}
async function Nu() {
  Ge("extension_loaded", {}), x.debug("Extension initializing...");
  try {
    const r = await Fu.get();
    x.debug("Theme initialized:", r);
  } catch (r) {
    x.warn("Error initializing theme, continuing with defaults:", r);
  }
  await Hy(), await Wy();
  const e = Pt();
  x.debug("Background script initialized with server URL:", e), gt(!1), await Yy(), x.debug("Extension initialized successfully"), (async () => {
    const r = Pt();
    x.debug(`Attempting initial connection to ${r} with transport: ${Oe}`);
    let n = !1;
    try {
      await Vs(r, Oe), n = await Zt(), x.debug(`Initial connection attempt result: ${n ? "connected" : "failed"}`);
    } catch (o) {
      x.debug(`Initial connection attempt failed: ${o instanceof Error ? o.message : String(o)}`), n = !1;
    }
    if (gt(n), ct(n), x.debug(`Initial connection status broadcast: ${n ? "connected" : "disconnected"}`), n)
      try {
        x.debug("[Background] Server connected, fetching and broadcasting initial tools...");
        const o = await ar(r, !1, Oe);
        x.debug(`Retrieved ${o.length} primitives for initial broadcast`);
        const s = cr(o);
        x.debug(`Broadcasting ${s.length} normalized initial tools`), Rr(s);
      } catch (o) {
        x.warn("[Background] Error broadcasting initial tools:", o);
      }
  })();
}
async function Vs(e, t = Oe) {
  if (Vt) {
    x.debug("Connection attempt already in progress, skipping");
    return;
  }
  Vt = !0, Ut++, x.debug(
    `Attempting to connect to MCP server via ${t} (attempt ${Ut}/${No}): ${e}`
  );
  try {
    await Fy(e, t), x.debug("MCP client connected successfully"), gt(!0), ct(!0);
    try {
      x.debug("[Background] Connection successful, fetching and broadcasting tools...");
      const r = await ar(e, !0, t);
      x.debug(`Retrieved ${r.length} primitives after connection`);
      const n = cr(r);
      x.debug(`Broadcasting ${n.length} normalized tools after successful connection`), Rr(n);
    } catch (r) {
      x.warn("[Background] Error broadcasting tools after connection:", r);
    }
    Ut = 0;
  } catch (r) {
    const n = Ky(r instanceof Error ? r : new Error(String(r)));
    if (x.warn(`MCP server connection failed (${n.category}): ${r.message || String(r)}`), x.debug("Extension will continue to function with limited capabilities"), n.isConnectionError ? (gt(!1), ct(!1, r.message || String(r))) : x.debug("Error categorized as tool-related, not updating connection status"), Ut < No) {
      const o = Math.min(5e3 * Ut, 15e3);
      x.debug(`Scheduling next connection attempt in ${o / 1e3} seconds...`), setTimeout(() => {
        Vt = !1, Vs(e).catch(() => {
        });
      }, o);
    } else
      x.debug("Maximum connection attempts reached. Will try again during periodic check."), Vt = !1;
  } finally {
    Ut >= No && (Vt = !1);
  }
}
const By = 6e4;
setInterval(async () => {
  if (Vt)
    return;
  const e = zu(), t = await Zt();
  if (gt(t), e !== t) {
    if (x.debug(`Connection status changed: ${e} -> ${t}`), ct(t), t)
      try {
        x.debug("[Background] Periodic check: Connection established, fetching and broadcasting tools...");
        const r = await ar(Pt(), !0, Oe);
        x.debug(`Periodic check: Retrieved ${r.length} primitives`);
        const n = cr(r);
        x.debug(`Periodic check: Broadcasting ${n.length} normalized tools`), Rr(n);
      } catch (r) {
        x.warn("[Background] Error broadcasting tools after status change:", r);
      }
  } else
    ct(t);
  if (!t && !Vt) {
    Ut = 0, x.debug("Periodic check: MCP server not connected, attempting to connect");
    const r = Pt();
    try {
      x.debug("[Background] Resetting MCP client connection state for periodic recovery attempt"), Zy();
    } catch (n) {
      x.warn("[Background] Error resetting MCP connection state:", n);
    }
    Vs(r, Oe).catch(() => {
    });
  }
}, By);
setInterval(() => {
}, 6e4);
self.addEventListener("unhandledrejection", (e) => {
  x.error("Unhandled rejection in service worker:", e.reason), e.reason instanceof Error ? Ru(e.reason, "background_unhandled_rejection") : Ge("extension_error", {
    error_message: `Unhandled rejection: ${JSON.stringify(e.reason)}`,
    error_context: "background_unhandled_rejection_non_error"
  });
});
self.addEventListener("error", (e) => {
  x.error("Uncaught error in service worker:", e.error), e.error instanceof Error ? Ru(e.error, "background_uncaught_error") : Ge("extension_error", {
    error_message: `Uncaught error: ${e.message}`,
    error_context: "background_uncaught_error_non_error"
  });
});
chrome.runtime.onInstalled.addListener(async (e) => {
  x.debug("Extension installed or updated:", e.reason);
  const t = chrome.runtime.getManifest().version, r = (/* @__PURE__ */ new Date()).toISOString();
  if (e.reason === "install") {
    x.debug("Performing first-time installation setup.");
    const n = as();
    await chrome.storage.local.set({
      installDate: r,
      version: t,
      userProperties: {
        extension_version: t,
        install_date: r,
        ...n
      }
    }), await Lt.updateUserProperties({
      extension_version: t,
      install_date: r,
      ...n
    }), Ge("extension_installed", {
      reason: e.reason,
      extension_version: t,
      ...n
    }), ze && ze.initialized && await ze.fetchConfig(!0);
  } else if (e.reason === "update") {
    const n = e.previousVersion || "unknown";
    x.debug(`Extension updated from ${n} to ${t}`);
    const o = as();
    await chrome.storage.local.set({
      version: t,
      previousVersion: n,
      lastUpdateDate: (/* @__PURE__ */ new Date()).toISOString()
    }), await Lt.updateUserProperties({
      extension_version: t,
      previous_version: n,
      ...o
    }), Ge("extension_installed", {
      reason: e.reason,
      extension_version: t,
      previous_version: n,
      ...o
    }), ze && ze.initialized && await ze.fetchConfig(!0), setTimeout(() => {
      chrome.tabs.query({}, (s) => {
        s.forEach((i) => {
          i.id && chrome.tabs.sendMessage(i.id, {
            type: "app:version-updated",
            data: {
              oldVersion: n,
              newVersion: t,
              timestamp: Date.now()
            }
          }).catch(() => {
          });
        });
      });
    }, 1e3);
  }
});
chrome.runtime.onStartup.addListener(() => {
  x.debug("Browser startup detected."), Ge("browser_startup", {}), Nu().catch((e) => x.error("Error initializing on startup:", e));
});
Nu().then(() => {
  x.debug("Extension startup complete");
}).catch((e) => {
  x.error("Error during extension initialization:", e), x.debug("Extension will continue running with limited functionality");
});
x.debug("Background script loaded");
x.debug("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
const WEB_AGENT_PERMISSION_APPROVE_ENDPOINT = "http://127.0.0.1:3017/permissions/approve";
const WEB_AGENT_PERMISSION_REJECT_ENDPOINT = "http://127.0.0.1:3017/permissions/reject";
const WEB_AGENT_PERMISSION_PENDING_CALLS_KEY = "webAgentPermissionPendingCalls";
const WEB_AGENT_EXPLICIT_PATH_INTENTS_KEY = "webAgentExplicitPathIntents";
const WEB_AGENT_PERMISSION_MARKER_START = "WEB_AGENT_PERMISSION_REQUEST";
const WEB_AGENT_PERMISSION_MARKER_END = "END_WEB_AGENT_PERMISSION_REQUEST";
function parseWebAgentPermissionMarker(e) {
  const t = String(e || ""), r = t.indexOf(WEB_AGENT_PERMISSION_MARKER_START);
  if (r < 0)
    return null;
  const n = t.indexOf(WEB_AGENT_PERMISSION_MARKER_END, r + WEB_AGENT_PERMISSION_MARKER_START.length);
  if (n < 0)
    return null;
  try {
    const o = JSON.parse(t.slice(r + WEB_AGENT_PERMISSION_MARKER_START.length, n).trim());
    return o && o.kind === "web_agent_permission_request" && o.requestId && o.argsHash ? o : null;
  } catch {
    return null;
  }
}
function findWebAgentPermissionMarker(e, t = 0) {
  if (!e || t > 8)
    return null;
  if (typeof e == "string")
    return parseWebAgentPermissionMarker(e);
  if (Array.isArray(e)) {
    for (const r of e) {
      const n = findWebAgentPermissionMarker(r, t + 1);
      if (n)
        return n;
    }
    return null;
  }
  if (typeof e == "object") {
    if (typeof e.text == "string") {
      const r = parseWebAgentPermissionMarker(e.text);
      if (r)
        return r;
    }
    for (const r of Object.values(e)) {
      const n = findWebAgentPermissionMarker(r, t + 1);
      if (n)
        return n;
    }
  }
  return null;
}
function cloneWebAgentValue(e) {
  try {
    return JSON.parse(JSON.stringify(e || {}));
  } catch {
    return e && typeof e == "object" ? { ...e } : {};
  }
}
async function getWebAgentPermissionPendingCalls() {
  const e = await chrome.storage.local.get([WEB_AGENT_PERMISSION_PENDING_CALLS_KEY]), t = e[WEB_AGENT_PERMISSION_PENDING_CALLS_KEY];
  return t && typeof t == "object" && !Array.isArray(t) ? t : {};
}
async function setWebAgentPermissionPendingCalls(e) {
  await chrome.storage.local.set({ [WEB_AGENT_PERMISSION_PENDING_CALLS_KEY]: e });
}
function webAgentIntentStorage() {
  return chrome.storage.session || chrome.storage.local;
}
async function getWebAgentExplicitPathIntents() {
  const e = webAgentIntentStorage(), t = await e.get([WEB_AGENT_EXPLICIT_PATH_INTENTS_KEY]), r = t[WEB_AGENT_EXPLICIT_PATH_INTENTS_KEY];
  return r && typeof r == "object" && !Array.isArray(r) ? r : {};
}
async function setWebAgentExplicitPathIntents(e) {
  await webAgentIntentStorage().set({ [WEB_AGENT_EXPLICIT_PATH_INTENTS_KEY]: e });
}
async function recordWebAgentExplicitPathIntent(e, t) {
  const r = t && t.tab && t.tab.id, n = e && e.payload && String(e.payload.text || "").trim();
  if (!Number.isInteger(r))
    throw new Error("EXPLICIT_PATH_INTENT_TAB_REQUIRED");
  if (!n || n.length > 2e4 || !hasWebAgentWindowsAbsolutePath(n))
    return { ok: !0, recorded: !1 };
  const o = await getWebAgentExplicitPathIntents(), s = Date.now();
  o[r] = { text: n, recordedAt: s };
  for (const [i, a] of Object.entries(o))
    s - Number(a && a.recordedAt || 0) > WEB_AGENT_EXPLICIT_PATH_INTENT_TTL_MS && delete o[i];
  await setWebAgentExplicitPathIntents(o);
  return { ok: !0, recorded: !0 };
}
async function hasWebAgentExplicitPathIntent(e, t) {
  if (!Number.isInteger(e)) return !1;
  const r = await getWebAgentExplicitPathIntents(), n = r[e];
  return !!n && Date.now() - Number(n.recordedAt || 0) <= WEB_AGENT_EXPLICIT_PATH_INTENT_TTL_MS && webAgentIntentCoversPermission(n, t);
}
async function rememberWebAgentPermissionCall(e, t) {
  if (!e || !e.requestId || !t || !t.toolName)
    return;
  const r = await getWebAgentPermissionPendingCalls(), n = Date.now();
  r[e.requestId] = {
    storedAt: n,
    marker: cloneWebAgentValue(e),
    toolName: t.toolName,
    adapterName: t.adapterName,
    args: cloneWebAgentValue(t.args || {})
  };
  const o = Object.fromEntries(
    Object.entries(r).filter(([, s]) => s && n - Number(s.storedAt || 0) < 10 * 60 * 1e3).slice(-50)
  );
  await setWebAgentPermissionPendingCalls(o);
}
async function forgetWebAgentPermissionCall(e) {
  if (!e)
    return;
  const t = await getWebAgentPermissionPendingCalls();
  delete t[e], await setWebAgentPermissionPendingCalls(t);
}
async function getWebAgentPermissionCall(e) {
  const t = await getWebAgentPermissionPendingCalls();
  return t[String(e || "")] || null;
}
async function getLatestWebAgentPermissionMarker() {
  const e = await getWebAgentPermissionPendingCalls(), t = Date.now();
  const r = Object.values(e).filter((n) => {
    const o = n && n.marker;
    return o && o.kind === "web_agent_permission_request" && t - Number(n.storedAt || 0) < 10 * 60 * 1e3 && Date.parse(o.expiresAt || 0) > t;
  }).sort((n, o) => Number(o.storedAt || 0) - Number(n.storedAt || 0));
  return r.length ? cloneWebAgentValue(r[0].marker) : null;
}
async function postWebAgentPermission(e, t) {
  const r = await fetch(e, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t || {})
  }), n = await r.json().catch(() => ({}));
  if (!r.ok || !n.ok)
    throw new Error(n.error || `HTTP ${r.status}`);
  return n;
}
function getWebAgentPermissionMarkerFromMessage(e) {
  const t = e && e.payload ? e.payload : {};
  if (!t || t.kind !== "web_agent_permission_request" || !t.requestId || !t.argsHash)
    throw new Error("INVALID_PERMISSION_REQUEST");
  return t;
}
async function approveAndRetryWebAgentPermission(e) {
  const t = getWebAgentPermissionMarkerFromMessage(e), r = await getWebAgentPermissionCall(t.requestId);
  if (!r)
    throw new Error("PERMISSION_ORIGINAL_CALL_NOT_FOUND");
  const a = e && e.payload && e.payload.approvalMode === "directory" ? "directory" : "once";
  const n = await postWebAgentPermission(WEB_AGENT_PERMISSION_APPROVE_ENDPOINT, {
    requestId: t.requestId,
    argsHash: t.argsHash,
    mode: a
  }), o = cloneWebAgentValue(r.args || {});
  delete o._webAgentPermission, delete o.__webAgentPermission, o._webAgentPermission = { requestId: t.requestId, token: n.token };
  try {
    const s = await Uy(Pt(), r.toolName, o, r.adapterName);
    return { ok: !0, requestId: t.requestId, approval: n, retry: s };
  } finally {
    await forgetWebAgentPermissionCall(t.requestId);
  }
}
async function rejectWebAgentPermission(e) {
  const t = getWebAgentPermissionMarkerFromMessage(e), r = await postWebAgentPermission(WEB_AGENT_PERMISSION_REJECT_ENDPOINT, {
    requestId: t.requestId
  });
  return await forgetWebAgentPermissionCall(t.requestId), { ok: !0, requestId: t.requestId, rejection: r };
}
async function manualWebAgentToolCall(e) {
  const t = e && e.payload ? e.payload : {}, r = t.toolName, n = t.args || {}, o = t.adapterName;
  if (r !== "write_file")
    throw new Error("MANUAL_TOOL_NOT_ALLOWED");
  if (!n || typeof n.path != "string" || typeof n.content != "string")
    throw new Error("INVALID_MANUAL_WRITE_FILE_ARGS");
  const s = await Uy(Pt(), r, n, o), i = findWebAgentPermissionMarker(s);
  return i && await rememberWebAgentPermissionCall(i, { toolName: r, args: n || {}, adapterName: o }), { ok: !0, toolName: r, result: s };
}
function isWebAgentPermissionSender(e) {
  try {
    const t = new URL(e && (e.url || e.tab && e.tab.url) || "");
    return (t.protocol === "https:" || t.protocol === "http:") && !!(e && e.tab && Number.isInteger(e.tab.id));
  } catch {
    return !1;
  }
}
chrome.runtime.onMessage.addListener((e, t, r) => {
  if (x.debug("[Background] Received message:", {
    type: e.type || e.command,
    origin: e.origin || "unknown",
    id: e.id,
    hasPayload: !!e.payload,
    from: t.tab ? `tab-${t.tab.id}` : "extension"
  }), e.type === "mcp:connection-status-changed" && e.origin === "mcpclient") {
    x.debug("[Background] Received connection status change from MCP client:", e.payload);
    const { isConnected: n, error: o } = e.payload;
    return gt(n), ct(n, o), !1;
  }
  if (e.command === "webAgentRecordExplicitPathIntent") {
    recordWebAgentExplicitPathIntent(e, t).then((n) => {
      r({ success: !0, result: n });
    }).catch((n) => {
      const o = n instanceof Error ? n.message : String(n);
      x.error("[Background] Failed to record explicit path intent:", n);
      r({ success: !1, error: o });
    });
    return !0;
  }
  if (e.command === "webAgentManualToolCall") {
    manualWebAgentToolCall(e).then((n) => {
      r({ success: !0, result: n });
    }).catch((n) => {
      const o = n instanceof Error ? n.message : String(n);
      x.error("[Background] Failed to run manual web_Agent tool call:", n);
      r({ success: !1, error: o });
    });
    return !0;
  }
  if (e.command === "webAgentPermissionGetLatest") {
    if (!isWebAgentPermissionSender(t)) {
      r({ success: !1, error: "PERMISSION_LOOKUP_DENIED" });
      return !1;
    }
    getLatestWebAgentPermissionMarker().then((n) => {
      r({ success: !0, result: { marker: n } });
    }).catch((n) => {
      const o = n instanceof Error ? n.message : String(n);
      x.error("[Background] Failed to read latest web_Agent permission request:", n);
      r({ success: !1, error: o });
    });
    return !0;
  }
  if (e.command === "webAgentPermissionApprove") {
    approveAndRetryWebAgentPermission(e).then((n) => {
      r({ success: !0, result: n });
    }).catch((n) => {
      const o = n instanceof Error ? n.message : String(n);
      x.error("[Background] Failed to approve and retry web_Agent permission request:", n);
      r({ success: !1, error: o });
    });
    return !0;
  }
  if (e.command === "webAgentPermissionReject") {
    rejectWebAgentPermission(e).then((n) => {
      r({ success: !0, result: n });
    }).catch((n) => {
      const o = n instanceof Error ? n.message : String(n);
      x.error("[Background] Failed to reject web_Agent permission request:", n);
      r({ success: !1, error: o });
    });
    return !0;
  }
  return e.command === "trackAnalyticsEvent" ? e.eventName && e.eventParams ? (Ge(e.eventName, e.eventParams).then(() => r({ success: !0 })).catch((n) => {
    x.error("[Background] Error tracking analytics event from message:", n), r({ success: !1, error: n instanceof Error ? n.message : String(n) });
  }), !0) : (x.warn("[Background] Invalid trackAnalyticsEvent message received:", e), r({ success: !1, error: "Invalid eventName or eventParams" }), !1) : typeof e.type == "string" && e.type.startsWith("mcp:") ? (Gy(e, t, r), !0) : typeof e.type == "string" && e.type.startsWith("remote-config:") ? (Xy(e, t, r), !0) : (x.debug("[Background] Message not handled, ignoring:", e.type || e.command), !1);
});
async function Gy(e, t, r) {
  const n = Date.now(), o = e.type;
  try {
    let s = null;
    const i = e.payload || {};
    switch (x.debug(`Processing MCP message: ${o}`), o) {
      case "mcp:call-tool": {
        const { toolName: c, args: l, adapterName: d } = i;
        if (!c)
          throw new Error("Tool name is required");
        x.debug(`Calling tool: ${c} from adapter: ${d || "unknown"}`), s = await Uy(Pt(), c, l || {}, d);
        const m = findWebAgentPermissionMarker(s);
        if (m) {
          await rememberWebAgentPermissionCall(m, { toolName: c, args: l || {}, adapterName: d });
          if (await hasWebAgentExplicitPathIntent(t && t.tab && t.tab.id, m)) {
            const u = await approveAndRetryWebAgentPermission({ payload: { ...m, approvalMode: "directory" } });
            s = u.retry;
          }
        }
        x.debug(`Tool call completed: ${c}`);
        break;
      }
      case "mcp:get-connection-status": {
        x.debug("[Background] Getting current connection status");
        const c = zu(), l = await Zt();
        x.debug(`Stored status: ${c}, Actual status: ${l}`), c !== l && (x.debug("[Background] Status mismatch detected, updating and broadcasting..."), gt(l), ct(l)), s = {
          status: l ? "connected" : "disconnected",
          isConnected: l,
          timestamp: Date.now()
        };
        break;
      }
      case "mcp:get-tools": {
        const { forceRefresh: c = !1 } = i;
        x.debug(`Getting tools (forceRefresh: ${c})`);
        try {
          const l = await ar(Pt(), c, Oe);
          x.debug(`Retrieved ${l.length} primitives from server`);
          const d = cr(l);
          x.debug(`Returning ${d.length} normalized tools to content script`), s = d;
        } catch (l) {
          x.error("[Background] Error getting tools:", l), s = [];
        }
        break;
      }
      case "mcp:force-reconnect": {
        x.debug("[Background] Force reconnect requested via context bridge");
        try {
          ct(!1, "Reconnecting..."), x.debug("[Background] Starting force reconnection process..."), Ly();
          const c = Ba(Pt(), Oe), l = new Promise(
            (m, g) => setTimeout(() => g(new Error("Reconnection timeout after 20 seconds")), 2e4)
          );
          await Promise.race([c, l]), x.debug("[Background] Force reconnect completed successfully");
          const d = await Zt();
          if (gt(d), ct(d), d)
            try {
              x.debug("[Background] Fetching tools after successful reconnection...");
              const m = await ar(Pt(), !0, Oe);
              x.debug(`Retrieved ${m.length} primitives after reconnection`);
              const g = cr(m);
              x.debug(`Broadcasting ${g.length} normalized tools after reconnection`), Rr(g);
            } catch (m) {
              x.error("[Background] Error fetching tools after reconnect:", m);
            }
          s = { isConnected: d, message: "Reconnection completed" };
        } catch (c) {
          x.error("[Background] Force reconnect failed:", c);
          const l = await Zt();
          gt(l);
          const d = c instanceof Error ? c.message : String(c);
          ct(l, d), s = { isConnected: l, error: d };
        }
        break;
      }
      case "mcp:get-server-config": {
        const c = await chrome.storage.local.get(["mcpServerUrl", "mcpConnectionType"]), l = Oe === "websocket" ? Iu : Wn;
        const d = normalizeLocalMcpUrl(c.mcpServerUrl || l);
        c.mcpServerUrl && d !== c.mcpServerUrl && await chrome.storage.local.set({ mcpServerUrl: d });
        s = {
          uri: d,
          connectionType: c.mcpConnectionType || Oe
        };
        break;
      }
      case "mcp:update-server-config": {
        const { config: c } = i;
        if (!c || typeof c.uri != "string")
          throw new Error("Invalid server config: uri is required");
        const d = normalizeLocalMcpUrl(c.uri);
        let l = c.connectionType;
        if (x.debug(`Received connection type: ${c.connectionType}, parsed as: ${l}`), !l)
          try {
            const m = new URL(c.uri);
            l = m.protocol === "ws:" || m.protocol === "wss:" ? "websocket" : "sse";
          } catch {
            l = Oe;
          }
        x.debug(`Updating server config to: ${d} (${l})`), await chrome.storage.local.set({
          mcpServerUrl: d,
          mcpConnectionType: l
        }), Jy(d, l), Qy({ uri: d, connectionType: l }), (async () => {
          try {
            x.debug("[Background] Starting async reconnection after config update..."), await Ba(d, l);
            const m = await Zt();
            if (gt(m), ct(m), x.debug(`Async reconnection completed, connected: ${m}`), m)
              try {
                const g = await ar(d, !0, l), w = cr(g);
                Rr(w), x.debug(`Broadcasted ${w.length} normalized tools after config update`);
              } catch (g) {
                x.warn("[Background] Failed to fetch tools after config update:", g);
              }
          } catch (m) {
            x.warn("[Background] Async reconnect after config update failed:", m);
            const g = await Zt();
            gt(g);
            const w = m instanceof Error ? m.message : String(m);
            ct(g, w);
          }
        })().catch((m) => {
          x.error("[Background] Unhandled error in async reconnection:", m);
        }), s = { success: !0 };
        break;
      }
      case "mcp:heartbeat": {
        const { timestamp: c } = i, l = xy();
        s = {
          timestamp: Date.now(),
          isConnected: l,
          receivedTimestamp: c
        }, e.id && setTimeout(() => {
          chrome.tabs.query({}, (d) => {
            d.forEach((m) => {
              m.id && chrome.tabs.sendMessage(m.id, {
                type: "mcp:heartbeat-response",
                payload: { timestamp: Date.now(), isConnected: l },
                origin: "background",
                timestamp: Date.now()
              }).catch(() => {
              });
            });
          });
        }, 0);
        break;
      }
      default:
        throw new Error(`Unhandled MCP message type: ${o}`);
    }
    const a = Date.now() - n;
    x.debug(`MCP message ${o} processed in ${a}ms`), r({
      type: `${o}:response`,
      payload: s,
      success: !0,
      timestamp: Date.now(),
      processingTime: a,
      origin: "background",
      id: e.id
    });
  } catch (s) {
    const i = Date.now() - n, a = s instanceof Error ? s.message : String(s);
    x.error(`MCP message handling error (${i}ms):`, s), r({
      type: `${o}:response`,
      error: a,
      success: !1,
      timestamp: Date.now(),
      processingTime: i,
      origin: "background",
      id: e.id
    });
  }
}
function ct(e, t) {
  const r = t ? "error" : e ? "connected" : "disconnected";
  x.debug(`Broadcasting connection status: ${r} (connected: ${e})`);
  const n = {
    type: "connection:status-changed",
    payload: {
      status: r,
      // Type assertion needed due to status calculation
      error: t || void 0,
      isConnected: e,
      timestamp: Date.now()
    },
    origin: "background",
    timestamp: Date.now()
  };
  chrome.tabs.query({}, (o) => {
    o.forEach((s) => {
      s.id && chrome.tabs.sendMessage(s.id, n).catch(() => {
      });
    });
  });
}
function Rr(e) {
  x.debug(`Broadcasting tools update to content scripts: ${e.length} tools`);
  const t = {
    type: "mcp:tool-update",
    payload: e,
    origin: "background",
    timestamp: Date.now()
  };
  chrome.tabs.query({}, (r) => {
    r.forEach((n) => {
      n.id && chrome.tabs.sendMessage(n.id, t).catch(() => {
      });
    });
  });
}
function Qy(e) {
  x.debug(`Broadcasting config update to content scripts: ${e.uri}`);
  const t = {
    type: "mcp:server-config-updated",
    payload: {
      config: e
      // Type assertion due to partial config structure
    },
    origin: "background",
    timestamp: Date.now()
  };
  chrome.tabs.query({}, (r) => {
    r.forEach((n) => {
      n.id && chrome.tabs.sendMessage(n.id, t).catch(() => {
      });
    });
  });
}
async function Xy(e, t, r) {
  const n = Date.now();
  try {
    if (x.debug(`Processing Remote Config message: ${e.type}`), !ze || !ze.initialized)
      throw new Error("Remote Config Manager not initialized");
    let o = null;
    switch (e.type) {
      case "remote-config:fetch": {
        const { force: i = !1 } = e.payload || {};
        x.debug(`Fetching remote config (force: ${i})`), await ze.fetchConfig(i), o = { success: !0, timestamp: Date.now() };
        break;
      }
      case "remote-config:get-feature-flag": {
        const { flagName: i } = e.payload || {};
        if (!i)
          throw new Error("Feature flag name is required");
        x.debug(`Getting feature flag: ${i}`), o = await ze.getFeatureFlag(i);
        break;
      }
      case "remote-config:get-config": {
        const { key: i } = e.payload || {};
        i ? (x.debug(`Getting specific config for key: ${i}`), o = await ze.getSpecificConfig(i)) : (x.debug("[Background] Getting all remote config"), o = await ze.getAllConfig());
        break;
      }
      case "remote-config:get-status": {
        x.debug("[Background] Getting remote config status"), o = {
          initialized: ze.initialized,
          lastFetchTime: await ze.getLastFetchTimePublic(),
          timestamp: Date.now()
        };
        break;
      }
      case "remote-config:clear-cache": {
        x.debug("[Background] Clearing remote config cache and refreshing"), o = {
          success: await ze.clearCacheAndRefresh(),
          timestamp: Date.now()
        };
        break;
      }
      default:
        throw new Error(`Unknown remote config message type: ${e.type}`);
    }
    const s = {
      success: !0,
      data: o,
      processingTime: Date.now() - n,
      timestamp: Date.now()
    };
    x.debug(`Remote Config message processed successfully: ${e.type} (${s.processingTime}ms)`), r(s);
  } catch (o) {
    const s = o instanceof Error ? o.message : String(o);
    x.error(`Error processing Remote Config message ${e.type}:`, o);
    const i = {
      success: !1,
      error: s,
      processingTime: Date.now() - n,
      timestamp: Date.now()
    };
    r(i);
  }
}
async function Yy() {
  try {
    ze = new Wu(), await ze.initialize(), x.debug("[Background] Remote Config Manager initialized successfully"), typeof globalThis < "u" && (globalThis.remoteConfigManager = ze, x.debug("[Background] RemoteConfigManager is now accessible globally as window.remoteConfigManager"));
  } catch (e) {
    x.error("[Background] Failed to initialize Remote Config Manager:", e);
  }
}
