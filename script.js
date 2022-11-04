var script = {
  data() {
    return {
      lang: 'en-us'
    };
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { attrs: { id: "app", lang: _vm.lang } }, [
    _c("p", [_vm._v("Current Language: " + _vm._s(_vm.lang))]),
    _vm._v(" "),
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.lang,
          expression: "lang"
        }
      ],
      attrs: { placeholder: "BCP47 language code" },
      domProps: { value: _vm.lang },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.lang = $event.target.value;
        }
      }
    }),
    _vm._v(" "),
    _c("h2", [_vm._v("Role Gallery")]),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c("h3", [_vm._v("Plain")]),
    _vm._v(" "),
    _vm._m(1),
    _vm._v(" "),
    _vm._m(2),
    _vm._v(" "),
    _vm._m(3),
    _vm._v(" "),
    _vm._m(4),
    _vm._v(" "),
    _vm._m(5),
    _vm._v(" "),
    _c("section", [
      _c("h3", [_vm._v("Radiogroup")]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "rating-radio",
          attrs: {
            role: "radiogroup",
            "aria-labelledby": "id-rating-label",
            "data-rating-value": ""
          }
        },
        [
          _c(
            "div",
            { staticClass: "label", attrs: { id: "id-rating-label" } },
            [_vm._v("Rating")]
          ),
          _vm._v(" "),
          _c(
            "svg",
            {
              attrs: {
                role: "none",
                xmlns: "http://www.w3.org/2000/svg",
                width: "264",
                height: "48"
              }
            },
            [
              _c("defs", [
                _c("g", { attrs: { id: "star" } }, [
                  _c("polygon", {
                    attrs: {
                      points:
                        "2.0,13.4 11.7,20.5 8.0,31.1 17.7,24.8 27.4,31.9 23.7,20.5 33.4,13.4 21.4,13.4 17.7,2.0 14.0,13.4"
                    }
                  })
                ]),
                _vm._v(" "),
                _c("g", { attrs: { id: "focus-ring" } }, [
                  _c("rect", { attrs: { width: "40", height: "38", rx: "4" } })
                ])
              ]),
              _vm._v(" "),
              _c(
                "g",
                {
                  staticClass: "star-1 star-2 star-3 star-4 star-5",
                  attrs: {
                    role: "radio",
                    "aria-checked": "false",
                    tabindex: "-1",
                    "data-rating": "1",
                    "aria-label": "one star"
                  }
                },
                [
                  _c("use", {
                    staticClass: "star",
                    attrs: { "xlink:href": "#star", x: "10", y: "7" }
                  }),
                  _vm._v(" "),
                  _c("use", {
                    staticClass: "focus-ring",
                    attrs: { "xlink:href": "#focus-ring", x: "8", y: "5" }
                  })
                ]
              ),
              _vm._v(" "),
              _c(
                "g",
                {
                  staticClass: "star-2 star-3 star-4 star-5",
                  attrs: {
                    role: "radio",
                    "aria-checked": "false",
                    tabindex: "-1",
                    "data-rating": "2",
                    "aria-label": "two stars"
                  }
                },
                [
                  _c("use", {
                    staticClass: "star",
                    attrs: { "xlink:href": "#star", x: "50", y: "7" }
                  }),
                  _vm._v(" "),
                  _c("use", {
                    staticClass: "focus-ring",
                    attrs: { "xlink:href": "#focus-ring", x: "48", y: "5" }
                  })
                ]
              ),
              _vm._v(" "),
              _c(
                "g",
                {
                  staticClass: "star-3 star-4 star-5",
                  attrs: {
                    role: "radio",
                    "aria-checked": "false",
                    tabindex: "-1",
                    "data-rating": "3",
                    "aria-label": "three stars"
                  }
                },
                [
                  _c("use", {
                    staticClass: "star",
                    attrs: { "xlink:href": "#star", x: "90", y: "7" }
                  }),
                  _vm._v(" "),
                  _c("use", {
                    staticClass: "focus-ring",
                    attrs: { "xlink:href": "#focus-ring", x: "88", y: "5" }
                  })
                ]
              ),
              _vm._v(" "),
              _c(
                "g",
                {
                  staticClass: "star-4 star-5",
                  attrs: {
                    role: "radio",
                    "aria-checked": "false",
                    tabindex: "-1",
                    "data-rating": "4",
                    "aria-label": "four stars"
                  }
                },
                [
                  _c("use", {
                    staticClass: "star",
                    attrs: { "xlink:href": "#star", x: "130", y: "7" }
                  }),
                  _vm._v(" "),
                  _c("use", {
                    staticClass: "focus-ring",
                    attrs: { "xlink:href": "#focus-ring", x: "128", y: "5" }
                  })
                ]
              ),
              _vm._v(" "),
              _c(
                "g",
                {
                  staticClass: "star-5",
                  attrs: {
                    role: "radio",
                    "aria-checked": "false",
                    tabindex: "-1",
                    "data-rating": "5",
                    "aria-label": "five stars"
                  }
                },
                [
                  _c("use", {
                    staticClass: "star",
                    attrs: { "xlink:href": "#star", x: "170", y: "7" }
                  }),
                  _vm._v(" "),
                  _c("use", {
                    staticClass: "focus-ring",
                    attrs: { "xlink:href": "#focus-ring", x: "168", y: "5" }
                  })
                ]
              )
            ]
          )
        ]
      )
    ]),
    _vm._v(" "),
    _vm._m(6),
    _vm._v(" "),
    _c("section", [
      _c("h3", [_vm._v("Switch")]),
      _vm._v(" "),
      _c(
        "div",
        {
          attrs: { role: "group", "aria-labelledby": "id-switch-group-label" }
        },
        [
          _c("h3", { attrs: { id: "id-switch-group-label" } }, [
            _vm._v("Environmental Controls")
          ]),
          _vm._v(" "),
          _c(
            "button",
            {
              attrs: { type: "button", role: "switch", "aria-checked": "false" }
            },
            [
              _c("span", { staticClass: "label" }, [
                _vm._v("Living Room Lights")
              ]),
              _vm._v(" "),
              _c(
                "svg",
                {
                  attrs: {
                    xmlns: "http://www.w3.org/2000/svg",
                    height: "20",
                    width: "36"
                  }
                },
                [
                  _c("rect", {
                    staticClass: "container",
                    attrs: {
                      x: "1",
                      y: "1",
                      width: "34",
                      height: "18",
                      rx: "4"
                    }
                  }),
                  _vm._v(" "),
                  _c("rect", {
                    staticClass: "off",
                    attrs: {
                      x: "4",
                      y: "4",
                      width: "12",
                      height: "12",
                      rx: "4"
                    }
                  }),
                  _vm._v(" "),
                  _c("rect", {
                    staticClass: "on",
                    attrs: {
                      x: "20",
                      y: "4",
                      width: "12",
                      height: "12",
                      rx: "4"
                    }
                  })
                ]
              ),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "on", attrs: { "aria-hidden": "true" } },
                [_vm._v("On")]
              ),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "off", attrs: { "aria-hidden": "true" } },
                [_vm._v("Off")]
              )
            ]
          )
        ]
      )
    ]),
    _vm._v(" "),
    _vm._m(7),
    _vm._v(" "),
    _vm._m(8),
    _vm._v(" "),
    _vm._m(9),
    _vm._v(" "),
    _c("section", [
      _c("h3", [_vm._v("Menubar")]),
      _vm._v(" "),
      _c("nav", { attrs: { "aria-label": "Mythical University" } }, [
        _c(
          "ul",
          {
            staticClass: "menubar-navigation",
            attrs: { role: "menubar", "aria-label": "Mythical University" }
          },
          [
            _vm._m(10),
            _vm._v(" "),
            _c("li", { attrs: { role: "none" } }, [
              _c(
                "a",
                {
                  attrs: {
                    role: "menuitem",
                    "aria-haspopup": "true",
                    "aria-expanded": "false",
                    href: "#about"
                  }
                },
                [
                  _vm._v("\n          About\n          "),
                  _c(
                    "svg",
                    {
                      staticClass: "down",
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "12",
                        height: "9",
                        viewBox: "0 0 12 9"
                      }
                    },
                    [_c("polygon", { attrs: { points: "1 0, 11 0, 6 8" } })]
                  )
                ]
              ),
              _vm._v(" "),
              _c("ul", { attrs: { role: "menu", "aria-label": "About" } }, [
                _vm._m(11),
                _vm._v(" "),
                _vm._m(12),
                _vm._v(" "),
                _c("li", { attrs: { role: "none" } }, [
                  _c(
                    "a",
                    {
                      attrs: {
                        role: "menuitem",
                        "aria-haspopup": "true",
                        "aria-expanded": "false",
                        href: "#facts"
                      }
                    },
                    [
                      _vm._v("\n              Facts\n              "),
                      _c(
                        "svg",
                        {
                          staticClass: "right",
                          attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "9",
                            height: "12",
                            viewBox: "0 0 9 12"
                          }
                        },
                        [_c("polygon", { attrs: { points: "0 1, 0 11, 8 6" } })]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm._m(13)
                ]),
                _vm._v(" "),
                _c("li", { attrs: { role: "none" } }, [
                  _c(
                    "a",
                    {
                      attrs: {
                        role: "menuitem",
                        "aria-haspopup": "true",
                        "aria-expanded": "false",
                        href: "#campus-tours"
                      }
                    },
                    [
                      _vm._v("\n              Campus Tours\n              "),
                      _c(
                        "svg",
                        {
                          staticClass: "right",
                          attrs: {
                            xmlns: "http://www.w3.org/2000/svg",
                            width: "9",
                            height: "12",
                            viewBox: "0 0 9 12"
                          }
                        },
                        [_c("polygon", { attrs: { points: "0 1, 0 11, 8 6" } })]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm._m(14)
                ])
              ])
            ])
          ]
        )
      ])
    ]),
    _vm._v(" "),
    _vm._m(15)
  ])
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("p", [
      _vm._v("Example source: "),
      _c(
        "a",
        { attrs: { href: "https://www.w3.org/WAI/ARIA/apg/example-index/" } },
        [_vm._v("W3C ARIA design pattern examples")]
      ),
      _vm._v(" & "),
      _c(
        "a",
        {
          attrs: {
            href:
              "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes"
          }
        },
        [_vm._v("MDN")]
      )
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("button", { attrs: { "aria-role": "button" } }, [_vm._v("Button")]),
      _vm._v(" "),
      _c("button", { attrs: { "aria-role": "alert" } }, [_vm._v("Alert")]),
      _vm._v(" "),
      _c("button", { attrs: { "aria-role": "timer" } }, [_vm._v("00:00")])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h4", { attrs: { id: "id-group-label" } }, [_vm._v("Checkboxes")]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "group_checkbox",
          attrs: {
            role: "checkbox",
            "aria-checked": "mixed",
            "aria-controls": "cond1 cond2 cond3 cond4",
            tabindex: "0"
          }
        },
        [_vm._v("\n       All\n   ")]
      ),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { role: "group", "aria-labelledby": "id-group-label" } },
        [
          _c("ul", { staticClass: "checkboxes" }, [
            _c("li", [
              _c(
                "div",
                {
                  attrs: {
                    role: "checkbox",
                    "aria-checked": "false",
                    id: "cond1",
                    contenteditable: ""
                  }
                },
                [_vm._v("Lettuce")]
              )
            ]),
            _vm._v(" "),
            _c("li", [
              _c(
                "div",
                {
                  attrs: {
                    role: "checkbox",
                    "aria-checked": "true",
                    id: "cond2",
                    contenteditable: ""
                  }
                },
                [_vm._v("Tomato")]
              )
            ]),
            _vm._v(" "),
            _c("li", [
              _c(
                "div",
                {
                  attrs: {
                    role: "checkbox",
                    "aria-checked": "false",
                    "aria-unchecked": "true",
                    id: "cond3",
                    contenteditable: ""
                  }
                },
                [_vm._v("Mustard (Unchecked)")]
              )
            ]),
            _vm._v(" "),
            _c("li", [
              _c(
                "div",
                {
                  attrs: {
                    role: "checkbox",
                    "aria-checked": "false",
                    id: "cond4",
                    contenteditable: ""
                  }
                },
                [_vm._v("Sprouts")]
              )
            ])
          ])
        ]
      )
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h3", [_vm._v("Scrollbar")]),
      _vm._v(" "),
      _c("input", { attrs: { type: "range", "aria-role": "scrollbar" } })
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h3", [_vm._v("Progress")]),
      _vm._v(" "),
      _c("label", { attrs: { for: "file" } }, [_vm._v("File progress:")]),
      _vm._v(" "),
      _c(
        "progress",
        {
          attrs: {
            id: "file",
            max: "100",
            value: "70",
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-role": "progressbar"
          }
        },
        [_vm._v("70% ")]
      )
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h3", [_vm._v("Combobox")]),
      _vm._v(" "),
      _c(
        "select",
        { attrs: { name: "num", id: "num-select", "aria-role": "combobox" } },
        [
          _c("option", { attrs: { value: "-1" } }, [_vm._v("----")]),
          _vm._v(" "),
          _c("option", { attrs: { value: "1" } }, [_vm._v("1")]),
          _vm._v(" "),
          _c("option", { attrs: { value: "2" } }, [_vm._v("2")]),
          _vm._v(" "),
          _c("option", { attrs: { value: "3" } }, [_vm._v("3")])
        ]
      )
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h3", [_vm._v("Spinbutton")]),
      _vm._v(" "),
      _c("label", { attrs: { for: "tentacles" } }, [
        _vm._v("Number (10-100):")
      ]),
      _vm._v(" "),
      _c("input", {
        attrs: {
          type: "number",
          id: "cr",
          name: "cr",
          min: "10",
          max: "100",
          "aria-role": "spinbutton"
        }
      })
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h3", [_vm._v("Accordion")]),
      _vm._v(" "),
      _c("div", { staticClass: "accordion", attrs: { id: "accordionGroup" } }, [
        _c("h4", [
          _c(
            "button",
            {
              staticClass: "accordion-trigger",
              attrs: {
                type: "button",
                "aria-expanded": "true",
                "aria-controls": "sect1",
                id: "accordion1id"
              }
            },
            [
              _c("span", { staticClass: "accordion-title" }, [
                _vm._v("\n            Personal Information\n            "),
                _c("span", { staticClass: "accordion-icon" })
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "accordion-panel",
            attrs: {
              id: "sect1",
              role: "region",
              "aria-labelledby": "accordion1id"
            }
          },
          [_c("div", [_vm._v("\n          1234\n        ")])]
        ),
        _vm._v(" "),
        _c("h4", [
          _c(
            "button",
            {
              staticClass: "accordion-trigger",
              attrs: {
                type: "button",
                "aria-expanded": "false",
                "aria-collapsed": "",
                "aria-controls": "sect2",
                id: "accordion2id"
              }
            },
            [
              _c("span", { staticClass: "accordion-title" }, [
                _vm._v("\n            Billing Address\n            "),
                _c("span", { staticClass: "accordion-icon" })
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "accordion-panel",
            attrs: {
              id: "sect2",
              role: "region",
              "aria-labelledby": "accordion2id",
              hidden: ""
            }
          },
          [_c("div", [_vm._v("\n          5678\n        ")])]
        )
      ])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("div", { staticClass: "tabs" }, [
        _c("h3", { attrs: { id: "tablist-1" } }, [_vm._v("Tabs")]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "manual",
            attrs: { role: "tablist", "aria-labelledby": "tablist-1" }
          },
          [
            _c(
              "button",
              {
                attrs: {
                  id: "tab-1",
                  type: "button",
                  role: "tab",
                  "aria-selected": "true",
                  "aria-controls": "tabpanel-1"
                }
              },
              [_c("span", { staticClass: "focus" }, [_vm._v("1")])]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                attrs: {
                  id: "tab-2",
                  type: "button",
                  role: "tab",
                  "aria-selected": "false",
                  "aria-controls": "tabpanel-2",
                  tabindex: "-1"
                }
              },
              [_c("span", { staticClass: "focus" }, [_vm._v("2")])]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                attrs: {
                  id: "tab-3",
                  type: "button",
                  role: "tab",
                  "aria-selected": "false",
                  "aria-controls": "tabpanel-3",
                  tabindex: "-1"
                }
              },
              [_c("span", { staticClass: "focus" }, [_vm._v("3")])]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                attrs: {
                  id: "tab-4",
                  type: "button",
                  role: "tab",
                  "aria-selected": "false",
                  "aria-controls": "tabpanel-4",
                  tabindex: "-1"
                }
              },
              [_c("span", { staticClass: "focus" }, [_vm._v("4")])]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            attrs: {
              id: "tabpanel-1",
              role: "tabpanel",
              "aria-labelledby": "tab-1"
            }
          },
          [_c("p", { attrs: { contenteditable: "" } }, [_vm._v("1")])]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "is-hidden",
            attrs: {
              id: "tabpanel-2",
              role: "tabpanel",
              "aria-labelledby": "tab-2"
            }
          },
          [_c("p", { attrs: { contenteditable: "" } }, [_vm._v("2")])]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "is-hidden",
            attrs: {
              id: "tabpanel-3",
              role: "tabpanel",
              "aria-labelledby": "tab-3"
            }
          },
          [_c("p", { attrs: { contenteditable: "" } }, [_vm._v("3")])]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "is-hidden",
            attrs: {
              id: "tabpanel-4",
              role: "tabpanel",
              "aria-labelledby": "tab-4"
            }
          },
          [_c("p", { attrs: { contenteditable: "" } }, [_vm._v("4")])]
        )
      ])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h3", [_vm._v("Busy")]),
      _vm._v(" "),
      _c("div", { attrs: { id: "html-spinner", "aria-busy": "" } })
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", { attrs: { role: "none" } }, [
      _c("a", { attrs: { role: "menuitem", href: "#home" } }, [
        _vm._v("\n          Home\n        ")
      ])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", { attrs: { role: "none" } }, [
      _c("a", { attrs: { role: "menuitem", href: "#overview" } }, [
        _vm._v("Overview")
      ])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", { attrs: { role: "none" } }, [
      _c("a", { attrs: { role: "menuitem", href: "#administration" } }, [
        _vm._v("Administration")
      ])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("ul", { attrs: { role: "menu", "aria-label": "Facts" } }, [
      _c("li", { attrs: { role: "none" } }, [
        _c("a", { attrs: { role: "menuitem", href: "#history" } }, [
          _vm._v("History")
        ])
      ]),
      _vm._v(" "),
      _c("li", { attrs: { role: "none" } }, [
        _c("a", { attrs: { role: "menuitem", href: "#current-statistics" } }, [
          _vm._v("Current Statistics")
        ])
      ]),
      _vm._v(" "),
      _c("li", { attrs: { role: "none" } }, [
        _c("a", { attrs: { role: "menuitem", href: "#awards" } }, [
          _vm._v("Awards")
        ])
      ])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("ul", { attrs: { role: "menu", "aria-label": "Campus Tours" } }, [
      _c("li", { attrs: { role: "none" } }, [
        _c(
          "a",
          { attrs: { role: "menuitem", href: "#for-prospective-students" } },
          [_vm._v("For prospective students")]
        )
      ]),
      _vm._v(" "),
      _c("li", { attrs: { role: "none" } }, [
        _c("a", { attrs: { role: "menuitem", href: "#for-alumni" } }, [
          _vm._v("For alumni")
        ])
      ]),
      _vm._v(" "),
      _c("li", { attrs: { role: "none" } }, [
        _c("a", { attrs: { role: "menuitem", href: "#for-visitors" } }, [
          _vm._v("For visitors")
        ])
      ])
    ])
  },
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("section", [
      _c("h3", [_vm._v("Toolbar")]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "format",
          attrs: {
            role: "toolbar",
            "aria-label": "Text Formatting",
            "aria-controls": "textarea1"
          }
        },
        [
          _c("div", { staticClass: "group characteristics" }, [
            _c(
              "button",
              {
                staticClass: "item bold popup",
                attrs: {
                  type: "button",
                  "aria-pressed": "false",
                  value: "bold",
                  tabindex: "0"
                }
              },
              [
                _c("span", {
                  staticClass: "fas fa-bold",
                  attrs: { "aria-hidden": "true" }
                }),
                _vm._v(" "),
                _c("span", { staticClass: "popup-label" }, [_vm._v("Bold")])
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "item italic popup",
                attrs: {
                  type: "button",
                  "aria-pressed": "false",
                  value: "italic",
                  tabindex: "-1"
                }
              },
              [
                _c("span", {
                  staticClass: "fas fa-italic",
                  attrs: { "aria-hidden": "true" }
                }),
                _vm._v(" "),
                _c("span", { staticClass: "popup-label" }, [_vm._v("Italic")])
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "item underline popup",
                attrs: {
                  type: "button",
                  "aria-pressed": "false",
                  value: "underline",
                  tabindex: "-1"
                }
              },
              [
                _c("span", {
                  staticClass: "fas fa-underline",
                  attrs: { "aria-hidden": "true" }
                }),
                _vm._v(" "),
                _c("span", { staticClass: "popup-label" }, [
                  _vm._v("Underline")
                ])
              ]
            )
          ])
        ]
      )
    ])
  }
];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-52f3e751_0", { source: "\n#app {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n\n  color: #2c3e50;\n  margin: 20px 10px 20px;\n}\nsection {\n    margin: 10px 0px;\n}\na,\nbutton {\n  color: #4fc08d;\n}\nbutton {\n  background: none;\n  border: solid 1px;\n  border-radius: 2em;\n  font: inherit;\n  padding: 0.75em 2em;\n}\nul.checkboxes {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  padding-left: 1em;\n}\nul.checkboxes li {\n  list-style: none;\n  margin: 1px;\n  padding: 0;\n}\n[role=\"checkbox\"] {\n  display: inline-block;\n  padding: 4px 8px;\n  cursor: pointer;\n}\n[role=\"checkbox\"]::before {\n  position: relative;\n  top: 1px;\n  left: -4px;\n  content: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='currentcolor' stroke-width='1' fill-opacity='0' /%3E%3C/svg%3E\");\n}\n[role=\"checkbox\"][aria-checked=\"true\"]::before {\n  position: relative;\n  top: 1px;\n  content: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='currentcolor' stroke-width='1' fill-opacity='0' /%3E%3Cpolyline points='4,8 7,12 12,5' fill='none' stroke='currentcolor' stroke-width='2' /%3E%3C/svg%3E\");\n}\n[role=\"checkbox\"][aria-checked=\"mixed\"]::before {\n  position: relative;\n  top: 1px;\n  content: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='currentcolor' stroke-width='1' fill-opacity='0' /%3E%3Cline x1='5' y1='5' x2='12' y2='12' stroke='currentcolor' stroke-width='2' /%3E%3C/svg%3E\");\n}\n[role=\"checkbox\"]:focus,\n[role=\"checkbox\"]:hover {\n  padding: 2px 6px;\n  border: 2px solid #005a9c;\n  border-radius: 5px;\n  background-color: #def;\n}\n[role=\"checkbox\"]:hover {\n  cursor: pointer;\n}\n/** Accordion */\n.accordion {\n  margin: 0;\n  padding: 0;\n  border: 2px solid hsl(0deg 0% 52%);\n  border-radius: 7px;\n  width: 20em;\n}\n.accordion button {\n  border: 0;\n}\n.accordion h4 {\n  margin: 0;\n  padding: 0;\n}\n.accordion:focus-within {\n  border-color: hsl(216deg 94% 43%);\n}\n.accordion:focus-within h4 {\n  background-color: hsl(0deg 0% 97%);\n}\n.accordion > * + * {\n  border-top: 1px solid hsl(0deg 0% 52%);\n}\n.accordion-trigger {\n  background: none;\n  color: hsl(0deg 0% 13%);\n  display: block;\n  font-size: 1rem;\n  font-weight: normal;\n  margin: 0;\n  padding: 1em 1.5em;\n  position: relative;\n  text-align: left;\n  width: 100%;\n  outline: none;\n}\n.accordion-trigger:focus,\n.accordion-trigger:hover {\n  background: hsl(216deg 94% 94%);\n}\n.accordion-trigger:focus {\n  outline: 4px solid transparent;\n}\n.accordion > *:first-child .accordion-trigger,\n.accordion > *:first-child {\n  border-radius: 5px 5px 0 0;\n}\n.accordion > *:last-child .accordion-trigger,\n.accordion > *:last-child {\n  border-radius: 0 0 5px 5px;\n}\n.accordion button::-moz-focus-inner {\n  border: 0;\n}\n.accordion-title {\n  display: block;\n  pointer-events: none;\n  border: transparent 2px solid;\n  border-radius: 5px;\n  padding: 0.25em;\n  outline: none;\n}\n.accordion-trigger:focus .accordion-title {\n  border-color: hsl(216deg 94% 43%);\n}\n.accordion-icon {\n  border: solid currentcolor;\n  border-width: 0 2px 2px 0;\n  height: 0.5rem;\n  pointer-events: none;\n  position: absolute;\n  right: 2em;\n  top: 50%;\n  transform: translateY(-60%) rotate(45deg);\n  width: 0.5rem;\n}\n.accordion-trigger:focus .accordion-icon,\n.accordion-trigger:hover .accordion-icon {\n  border-color: hsl(216deg 94% 43%);\n}\n.accordion-trigger[aria-expanded=\"true\"] .accordion-icon {\n  transform: translateY(-50%) rotate(-135deg);\n}\n.accordion-panel {\n  margin: 0;\n  padding: 1em 1.5em;\n}\n\n/* For Edge bug https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4806035/ */\n.accordion-panel[hidden] {\n  display: none;\n}\n/** Tab */\n.tabs {\n  font-family: \"lucida grande\", sans-serif;\n}\n[role=\"tablist\"] {\n  min-width: 550px;\n}\n[role=\"tab\"],\n[role=\"tab\"]:focus,\n[role=\"tab\"]:hover {\n  position: relative;\n  z-index: 2;\n  top: 2px;\n  margin: 0;\n  margin-top: 4px;\n  padding: 3px 3px 4px;\n  border: 1px solid hsl(219deg 1% 72%);\n  border-bottom: 2px solid hsl(219deg 1% 72%);\n  border-radius: 5px 5px 0 0;\n  overflow: visible;\n  background: hsl(220deg 20% 94%);\n  outline: none;\n  font-weight: bold;\n}\n[role=\"tab\"][aria-selected=\"true\"] {\n  padding: 2px 2px 4px;\n  margin-top: 0;\n  border-width: 2px;\n  border-top-width: 6px;\n  border-top-color: rgb(36 116 214);\n  border-bottom-color: hsl(220deg 43% 99%);\n  background: hsl(220deg 43% 99%);\n}\n[role=\"tab\"][aria-selected=\"false\"] {\n  border-bottom: 1px solid hsl(219deg 1% 72%);\n}\n[role=\"tab\"] span.focus {\n  display: inline-block;\n  margin: 2px;\n  padding: 4px 6px;\n}\n[role=\"tab\"]:hover span.focus,\n[role=\"tab\"]:focus span.focus,\n[role=\"tab\"]:active span.focus {\n  padding: 2px 4px;\n  border: 2px solid rgb(36 116 214);\n  border-radius: 3px;\n}\n[role=\"tabpanel\"] {\n  padding: 5px;\n  border: 2px solid hsl(219deg 1% 72%);\n  border-radius: 0 5px 5px;\n  background: hsl(220deg 43% 99%);\n  min-height: 10em;\n  min-width: 550px;\n  overflow: auto;\n}\n[role=\"tabpanel\"].is-hidden {\n  display: none;\n}\n[role=\"tabpanel\"] p {\n  margin: 0;\n}\n /** Spinner */\n#html-spinner{\n  width:40px;\n  height:40px;\n  border:4px solid #fcd779;\n  border-top:4px solid white;\n  border-radius:50%;\n}\n#html-spinner, #svg-spinner{\n\n  transition-property: transform;\n  animation-name: rotate; \n  animation-duration: 1.2s; \n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n@keyframes rotate {\nfrom {transform: rotate(0deg);}\nto {transform: rotate(360deg);}\n}\n  \n/* Radiogroup */\n.rating-radio label {\n  display: block;\n}\n.rating-radio svg g[role=\"radio\"] {\n  color: #005a9c;\n}\n.rating-radio svg {\n  forced-color-adjust: auto;\n  touch-action: pan-y;\n}\n.rating-radio svg .focus-ring,\n.rating-radio svg .focus-ring-none {\n  stroke-width: 0;\n  fill-opacity: 0;\n}\n.rating-radio svg .star {\n  stroke-width: 2px;\n  stroke: currentcolor;\n  fill-opacity: 0;\n}\n.rating-radio svg .star-none {\n  stroke-width: 3px;\n  stroke: currentcolor;\n  fill-opacity: 0;\n}\n.rating-radio[data-rating-value=\"5\"] svg .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n.rating-radio[data-rating-value=\"1\"] svg .star-1 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n.rating-radio[data-rating-value=\"2\"] svg .star-2 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n.rating-radio[data-rating-value=\"3\"] svg .star-3 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n.rating-radio[data-rating-value=\"4\"] svg .star-4 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n\n/* focus styling */\n.rating-radio:focus {\n  outline: none;\n}\n.rating-radio svg g:focus {\n  outline: none;\n}\n.rating-radio svg g:focus .focus-ring {\n  stroke-width: 2px;\n  stroke: currentcolor;\n}\n.rating-radio:hover {\n  cursor: pointer;\n}\n  \n/* toolbar */\n[role=\"toolbar\"] {\n  border: 2px solid transparent;\n  border-radius: 5px;\n  padding: 6px;\n  height: 44px;\n  width: 1050px;\n  background-color: #ececea;\n}\n[role=\"toolbar\"].focus {\n  border-color: #005a9c;\n  border-width: 3px;\n  padding: 5px;\n}\n[role=\"toolbar\"] .group {\n  padding: 0.25em;\n  display: block;\n  float: left;\n}\n[role=\"toolbar\"] .group:not(:first-child) {\n  margin-left: 0.75em;\n}\n[role=\"toolbar\"] button,\n[role=\"toolbar\"] [role=\"radio\"],\n[role=\"toolbar\"] label,\n[role=\"toolbar\"] .spinbutton,\n[role=\"toolbar\"] a,\n[role=\"toolbar\"] .input {\n  border: 1px solid rgb(255 255 255);\n  outline: none;\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 5px;\n  text-align: center;\n  background: rgb(255 255 255);\n  color: #222428;\n  font-size: 14px;\n  line-height: 1.5em;\n  margin-right: 0.25em;\n}\n[role=\"toolbar\"] button.popup {\n  position: relative;\n}\n[role=\"toolbar\"] button .popup-label {\n  display: block;\n  width: initial;\n  border: 1px solid white;\n  padding: 2px 4px;\n  border-radius: 5px;\n  position: absolute;\n  top: -30000em;\n  background-color: black;\n  color: white;\n  font-weight: normal;\n}\n[role=\"toolbar\"] button .popup-label.show {\n  text-align: center;\n  top: -2.5em;\n}\n[role=\"toolbar\"] button .popup-label::after,\n[role=\"toolbar\"] button .popup-label::before {\n  top: 100%;\n  left: 50%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n[role=\"toolbar\"] button .popup-label::after {\n  border-color: rgb(0 0 0 / 0%);\n  border-top-color: #000;\n  border-width: 10px;\n  margin-left: -10px;\n}\n[role=\"toolbar\"] button .popup-label::before {\n  border-color: rgb(255 255 255 / 0%);\n  border-top-color: #fff;\n  border-width: 12px;\n  margin-left: -12px;\n}\n[role=\"toolbar\"] button[aria-pressed=\"true\"],\n[role=\"toolbar\"] [role=\"radio\"][aria-checked=\"true\"] {\n  border-color: #555;\n  font-weight: bold;\n  background-color: #f4f4f4;\n}\n[role=\"toolbar\"] button[aria-disabled=\"true\"] {\n  color: #889;\n  cursor: not-allowed;\n}\n[role=\"toolbar\"] button[aria-disabled=\"true\"]:focus {\n  border-color: #005a9c;\n}\n[role=\"toolbar\"] button::-moz-focus-inner {\n  border: 0;\n}\n[role=\"toolbar\"] button:focus,\n[role=\"toolbar\"] [role=\"radio\"]:focus,\n[role=\"toolbar\"] .spinbutton:focus,\n[role=\"toolbar\"] .focus,\n[role=\"toolbar\"] a:focus {\n  border-width: 2px;\n  border-color: #005a9c;\n  background: rgb(226 239 255);\n  padding: 5px 11px;\n}\n[role=\"toolbar\"] button:hover,\n[role=\"toolbar\"] [role=\"radio\"]:hover,\n[role=\"toolbar\"] .spinbutton:hover,\n[role=\"toolbar\"] label.input:hover,\n[role=\"toolbar\"] a:hover {\n  border-color: #005a9c;\n  background: rgb(226 239 255);\n}\n[role=\"toolbar\"] [role=\"spinbutton\"] .value,\n[role=\"toolbar\"] [role=\"spinbutton\"] .increase,\n[role=\"toolbar\"] [role=\"spinbutton\"] .decrease {\n  width: 60px;\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n}\n\n", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue"],"names":[],"mappings":";AA6RA;EACA,iDAAA;;EAEA,cAAA;EACA,sBAAA;AACA;AAEA;IACA,gBAAA;AACA;AAEA;;EAEA,cAAA;AACA;AAEA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;AACA;AACA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,iBAAA;AACA;AAEA;EACA,gBAAA;EACA,WAAA;EACA,UAAA;AACA;AAEA;EACA,qBAAA;EACA,gBAAA;EACA,eAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,UAAA;EACA,iQAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,2VAAA;AACA;AACA;EACA,kBAAA;EACA,QAAA;EACA,kVAAA;AACA;AAEA;;EAEA,gBAAA;EACA,yBAAA;EACA,kBAAA;EACA,sBAAA;AACA;AAEA;EACA,eAAA;AACA;AACA,eAAA;AACA;EACA,SAAA;EACA,UAAA;EACA,kCAAA;EACA,kBAAA;EACA,WAAA;AACA;AACA;EACA,SAAA;AACA;AACA;EACA,SAAA;EACA,UAAA;AACA;AAEA;EACA,iCAAA;AACA;AAEA;EACA,kCAAA;AACA;AAEA;EACA,sCAAA;AACA;AAEA;EACA,gBAAA;EACA,uBAAA;EACA,cAAA;EACA,eAAA;EACA,mBAAA;EACA,SAAA;EACA,kBAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;EACA,aAAA;AACA;AAEA;;EAEA,+BAAA;AACA;AAEA;EACA,8BAAA;AACA;AAEA;;EAEA,0BAAA;AACA;AAEA;;EAEA,0BAAA;AACA;AAEA;EACA,SAAA;AACA;AAEA;EACA,cAAA;EACA,oBAAA;EACA,6BAAA;EACA,kBAAA;EACA,eAAA;EACA,aAAA;AACA;AAEA;EACA,iCAAA;AACA;AAEA;EACA,0BAAA;EACA,yBAAA;EACA,cAAA;EACA,oBAAA;EACA,kBAAA;EACA,UAAA;EACA,QAAA;EACA,yCAAA;EACA,aAAA;AACA;AAEA;;EAEA,iCAAA;AACA;AAEA;EACA,2CAAA;AACA;AAEA;EACA,SAAA;EACA,kBAAA;AACA;;AAEA,+FAAA;AACA;EACA,aAAA;AACA;AACA,SAAA;AACA;EACA,wCAAA;AACA;AAEA;EACA,gBAAA;AACA;AAEA;;;EAGA,kBAAA;EACA,UAAA;EACA,QAAA;EACA,SAAA;EACA,eAAA;EACA,oBAAA;EACA,oCAAA;EACA,2CAAA;EACA,0BAAA;EACA,iBAAA;EACA,+BAAA;EACA,aAAA;EACA,iBAAA;AACA;AAEA;EACA,oBAAA;EACA,aAAA;EACA,iBAAA;EACA,qBAAA;EACA,iCAAA;EACA,wCAAA;EACA,+BAAA;AACA;AAEA;EACA,2CAAA;AACA;AAEA;EACA,qBAAA;EACA,WAAA;EACA,gBAAA;AACA;AAEA;;;EAGA,gBAAA;EACA,iCAAA;EACA,kBAAA;AACA;AAEA;EACA,YAAA;EACA,oCAAA;EACA,wBAAA;EACA,+BAAA;EACA,gBAAA;EACA,gBAAA;EACA,cAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,SAAA;AACA;CACA,aAAA;AAEA;EACA,UAAA;EACA,WAAA;EACA,wBAAA;EACA,0BAAA;EACA,iBAAA;AACA;AAEA;;EAEA,8BAAA;EACA,sBAAA;EACA,wBAAA;EACA,mCAAA;EACA,iCAAA;AACA;AAGA;AACA,MAAA,uBAAA,CAAA;AACA,IAAA,yBAAA,CAAA;AACA;;AAEA,eAAA;AAEA;EACA,cAAA;AACA;AAEA;EACA,cAAA;AACA;AAEA;EACA,yBAAA;EACA,mBAAA;AACA;AAEA;;EAEA,eAAA;EACA,eAAA;AACA;AAEA;EACA,iBAAA;EACA,oBAAA;EACA,eAAA;AACA;AAEA;EACA,iBAAA;EACA,oBAAA;EACA,eAAA;AACA;AAEA;EACA,kBAAA;EACA,eAAA;AACA;AAEA;EACA,kBAAA;EACA,eAAA;AACA;AAEA;EACA,kBAAA;EACA,eAAA;AACA;AAEA;EACA,kBAAA;EACA,eAAA;AACA;AAEA;EACA,kBAAA;EACA,eAAA;AACA;;AAEA,kBAAA;AAEA;EACA,aAAA;AACA;AAEA;EACA,aAAA;AACA;AAEA;EACA,iBAAA;EACA,oBAAA;AACA;AAEA;EACA,eAAA;AACA;;AAEA,YAAA;AACA;EACA,6BAAA;EACA,kBAAA;EACA,YAAA;EACA,YAAA;EACA,aAAA;EACA,yBAAA;AACA;AAEA;EACA,qBAAA;EACA,iBAAA;EACA,YAAA;AACA;AAEA;EACA,eAAA;EACA,cAAA;EACA,WAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;;;;;;EAMA,kCAAA;EACA,aAAA;EACA,qBAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,4BAAA;EACA,cAAA;EACA,eAAA;EACA,kBAAA;EACA,oBAAA;AACA;AAEA;EACA,kBAAA;AACA;AAEA;EACA,cAAA;EACA,cAAA;EACA,uBAAA;EACA,gBAAA;EACA,kBAAA;EACA,kBAAA;EACA,aAAA;EACA,uBAAA;EACA,YAAA;EACA,mBAAA;AACA;AAEA;EACA,kBAAA;EACA,WAAA;AACA;AAEA;;EAEA,SAAA;EACA,SAAA;EACA,yBAAA;EACA,YAAA;EACA,SAAA;EACA,QAAA;EACA,kBAAA;EACA,oBAAA;AACA;AAEA;EACA,6BAAA;EACA,sBAAA;EACA,kBAAA;EACA,kBAAA;AACA;AAEA;EACA,mCAAA;EACA,sBAAA;EACA,kBAAA;EACA,kBAAA;AACA;AAEA;;EAEA,kBAAA;EACA,iBAAA;EACA,yBAAA;AACA;AAEA;EACA,WAAA;EACA,mBAAA;AACA;AAEA;EACA,qBAAA;AACA;AAEA;EACA,SAAA;AACA;AAEA;;;;;EAKA,iBAAA;EACA,qBAAA;EACA,4BAAA;EACA,iBAAA;AACA;AAEA;;;;;EAKA,qBAAA;EACA,4BAAA;AACA;AAEA;;;EAGA,WAAA;EACA,qBAAA;EACA,UAAA;EACA,SAAA;AACA","file":"pen.vue","sourcesContent":["<!-- Use preprocessors via the lang attribute! e.g. <template lang=\"pug\"> -->\n<template>\n  <div id=\"app\" :lang=\"lang\">\n    <p>Current Language: {{ lang }}</p>\n    <input v-model=\"lang\" placeholder=\"BCP47 language code\" />\n    \n    <h2>Role Gallery</h2>\n    <p>Example source: <a href=\"https://www.w3.org/WAI/ARIA/apg/example-index/\">W3C ARIA design pattern examples</a> & <a href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes\">MDN</a></p>\n    <h3>Plain</h3>\n    <section>\n      <button aria-role=\"button\">Button</button>\n      <button aria-role=\"alert\">Alert</button>\n      <button aria-role=\"timer\">00:00</button>\n    </section>\n    <section>\n      <h4 id=\"id-group-label\">Checkboxes</h4>\n      <div role=\"checkbox\" class=\"group_checkbox\" aria-checked=\"mixed\" aria-controls=\"cond1 cond2 cond3 cond4\" tabindex=\"0\">\n         All\n     </div>\n      <div role=\"group\" aria-labelledby=\"id-group-label\">\n        <ul class=\"checkboxes\">\n          <li><div role=\"checkbox\" aria-checked=\"false\" id=\"cond1\" contenteditable>Lettuce</div></li>\n          <li><div role=\"checkbox\" aria-checked=\"true\" id=\"cond2\" contenteditable>Tomato</div></li>\n          <li><div role=\"checkbox\" aria-checked=\"false\" aria-unchecked=\"true\" id=\"cond3\"  contenteditable>Mustard (Unchecked)</div></li>\n          <li><div role=\"checkbox\" aria-checked=\"false\" id=\"cond4\" contenteditable>Sprouts</div></li>\n        </ul>\n      </div>\n    </section>\n    <section>\n      <h3>Scrollbar</h3>\n      <input type=\"range\" aria-role=\"scrollbar\">\n    </section>\n    <section>\n      <h3>Progress</h3>\n      <label for=\"file\">File progress:</label>\n      <progress id=\"file\" max=\"100\" value=\"70\" aria-valuemin=\"0\" aria-valuemax=\"100\" aria-role=\"progressbar\">70% </progress>\n    </section>\n    <section>\n      <h3>Combobox</h3>\n      <select name=\"num\" id=\"num-select\" aria-role=\"combobox\">\n        <option value=\"-1\">----</option>\n        <option value=\"1\">1</option>\n        <option value=\"2\">2</option>\n        <option value=\"3\">3</option>\n      </select>\n    </section>\n    <section>\n      <h3>Radiogroup</h3>\n      <div class=\"rating-radio\" role=\"radiogroup\" aria-labelledby=\"id-rating-label\" data-rating-value=\"\">\n        <div id=\"id-rating-label\" class=\"label\">Rating</div>\n        <svg role=\"none\" xmlns=\"http://www.w3.org/2000/svg\" width=\"264\" height=\"48\">\n          <defs>\n            <g id=\"star\">\n              <polygon points=\"2.0,13.4 11.7,20.5 8.0,31.1 17.7,24.8 27.4,31.9 23.7,20.5 33.4,13.4 21.4,13.4 17.7,2.0 14.0,13.4\"></polygon>\n            </g>\n            <g id=\"focus-ring\">\n              <rect width=\"40\" height=\"38\" rx=\"4\"></rect>\n            </g>\n          </defs>\n\n          <g role=\"radio\" aria-checked=\"false\" tabindex=\"-1\" data-rating=\"1\" aria-label=\"one star\" class=\"star-1 star-2 star-3 star-4 star-5\">\n            <use class=\"star\" xlink:href=\"#star\" x=\"10\" y=\"7\"></use>\n            <use class=\"focus-ring\" xlink:href=\"#focus-ring\" x=\"8\" y=\"5\"></use>\n          </g>\n\n          <g role=\"radio\" aria-checked=\"false\" tabindex=\"-1\" data-rating=\"2\" aria-label=\"two stars\" class=\"star-2 star-3 star-4 star-5\">\n            <use class=\"star\" xlink:href=\"#star\" x=\"50\" y=\"7\"></use>\n            <use class=\"focus-ring\" xlink:href=\"#focus-ring\" x=\"48\" y=\"5\"></use>\n          </g>\n\n          <g role=\"radio\" aria-checked=\"false\" tabindex=\"-1\" data-rating=\"3\" aria-label=\"three stars\" class=\"star-3 star-4 star-5\">\n            <use class=\"star\" xlink:href=\"#star\" x=\"90\" y=\"7\"></use>\n            <use class=\"focus-ring\" xlink:href=\"#focus-ring\" x=\"88\" y=\"5\"></use>\n          </g>\n\n          <g role=\"radio\" aria-checked=\"false\" tabindex=\"-1\" data-rating=\"4\" aria-label=\"four stars\" class=\"star-4 star-5\">\n            <use class=\"star\" xlink:href=\"#star\" x=\"130\" y=\"7\"></use>\n            <use class=\"focus-ring\" xlink:href=\"#focus-ring\" x=\"128\" y=\"5\"></use>\n          </g>\n\n          <g role=\"radio\" aria-checked=\"false\" tabindex=\"-1\" data-rating=\"5\" aria-label=\"five stars\" class=\"star-5\">\n            <use class=\"star\" xlink:href=\"#star\" x=\"170\" y=\"7\"></use>\n            <use class=\"focus-ring\" xlink:href=\"#focus-ring\" x=\"168\" y=\"5\"></use>\n          </g>\n        </svg>\n      </div>\n\n      \n    </section>\n    \n    <section>\n      <h3>Spinbutton</h3>\n      <label for=\"tentacles\">Number (10-100):</label>\n\n      <input type=\"number\" id=\"cr\" name=\"cr\" min=\"10\" max=\"100\" aria-role=\"spinbutton\">\n    </section>\n    \n    <section>\n      <h3>Switch</h3>\n      <div role=\"group\" aria-labelledby=\"id-switch-group-label\">\n        <h3 id=\"id-switch-group-label\">Environmental Controls</h3>\n        <button type=\"button\" role=\"switch\" aria-checked=\"false\">\n          <span class=\"label\">Living Room Lights</span>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" height=\"20\" width=\"36\">\n            <rect class=\"container\" x=\"1\" y=\"1\" width=\"34\" height=\"18\" rx=\"4\"></rect>\n            <rect class=\"off\" x=\"4\" y=\"4\" width=\"12\" height=\"12\" rx=\"4\"></rect>\n            <rect class=\"on\" x=\"20\" y=\"4\" width=\"12\" height=\"12\" rx=\"4\"></rect>\n          </svg>\n          <span class=\"on\" aria-hidden=\"true\">On</span>\n          <span class=\"off\" aria-hidden=\"true\">Off</span>\n        </button>\n      </div>\n      \n    </section>\n    <section>\n      <h3>Accordion</h3>\n      <div id=\"accordionGroup\" class=\"accordion\">\n        <h4>\n          <button type=\"button\" aria-expanded=\"true\" class=\"accordion-trigger\" aria-controls=\"sect1\" id=\"accordion1id\">\n            <span class=\"accordion-title\">\n              Personal Information\n              <span class=\"accordion-icon\"></span>\n            </span>\n          </button>\n        </h4>\n        <div id=\"sect1\" role=\"region\" aria-labelledby=\"accordion1id\" class=\"accordion-panel\">\n          <div>\n            1234\n          </div>\n        </div>\n        <h4>\n          <button type=\"button\" aria-expanded=\"false\" aria-collapsed class=\"accordion-trigger\" aria-controls=\"sect2\" id=\"accordion2id\">\n            <span class=\"accordion-title\">\n              Billing Address\n              <span class=\"accordion-icon\"></span>\n            </span>\n          </button>\n        </h4>\n        <div id=\"sect2\" role=\"region\" aria-labelledby=\"accordion2id\" class=\"accordion-panel\" hidden=\"\">\n          <div>\n            5678\n          </div>\n        </div>\n      </div>\n    </section>\n    <section>\n      <div class=\"tabs\">\n        <h3 id=\"tablist-1\">Tabs</h3>\n        <div role=\"tablist\" aria-labelledby=\"tablist-1\" class=\"manual\">\n          <button id=\"tab-1\" type=\"button\" role=\"tab\" aria-selected=\"true\" aria-controls=\"tabpanel-1\">\n            <span class=\"focus\">1</span>\n          </button>\n          <button id=\"tab-2\" type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"tabpanel-2\" tabindex=\"-1\">\n            <span class=\"focus\">2</span>\n          </button>\n          <button id=\"tab-3\" type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"tabpanel-3\" tabindex=\"-1\">\n            <span class=\"focus\">3</span>\n          </button>\n          <button id=\"tab-4\" type=\"button\" role=\"tab\" aria-selected=\"false\" aria-controls=\"tabpanel-4\" tabindex=\"-1\">\n            <span class=\"focus\">4</span>\n          </button>\n        </div>\n\n        <div id=\"tabpanel-1\" role=\"tabpanel\" aria-labelledby=\"tab-1\">\n          <p contenteditable>1</p>\n        </div>\n        <div id=\"tabpanel-2\" role=\"tabpanel\" aria-labelledby=\"tab-2\" class=\"is-hidden\">\n          <p contenteditable>2</p>\n        </div>\n        <div id=\"tabpanel-3\" role=\"tabpanel\" aria-labelledby=\"tab-3\" class=\"is-hidden\">\n          <p contenteditable>3</p>\n        </div>\n        <div id=\"tabpanel-4\" role=\"tabpanel\" aria-labelledby=\"tab-4\" class=\"is-hidden\">\n          <p contenteditable>4</p>\n        </div>\n      </div>\n    </section>\n    \n    <section>\n      <h3>Busy</h3>\n      <div id=\"html-spinner\" aria-busy></div>\n    </section>\n    \n    <section>\n      <h3>Menubar</h3>\n      <nav aria-label=\"Mythical University\">\n      <ul class=\"menubar-navigation\" role=\"menubar\" aria-label=\"Mythical University\">\n        <li role=\"none\">\n          <a role=\"menuitem\" href=\"#home\">\n            Home\n          </a>\n        </li>\n        <li role=\"none\">\n          <a role=\"menuitem\" aria-haspopup=\"true\" aria-expanded=\"false\" href=\"#about\">\n            About\n            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"down\" width=\"12\" height=\"9\" viewBox=\"0 0 12 9\">\n             <polygon points=\"1 0, 11 0, 6 8\"></polygon>\n            </svg>\n          </a>\n          <ul role=\"menu\" aria-label=\"About\">\n            <li role=\"none\">\n              <a role=\"menuitem\" href=\"#overview\">Overview</a>\n            </li>\n            <li role=\"none\">\n              <a role=\"menuitem\" href=\"#administration\">Administration</a>\n            </li>\n            <li role=\"none\">\n              <a role=\"menuitem\" aria-haspopup=\"true\" aria-expanded=\"false\" href=\"#facts\">\n                Facts\n                <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"right\" width=\"9\" height=\"12\" viewBox=\"0 0 9 12\">\n                 <polygon points=\"0 1, 0 11, 8 6\"></polygon>\n                </svg>\n              </a>\n              <ul role=\"menu\" aria-label=\"Facts\">\n                <li role=\"none\">\n                  <a role=\"menuitem\" href=\"#history\">History</a>\n                </li>\n                <li role=\"none\">\n                  <a role=\"menuitem\" href=\"#current-statistics\">Current Statistics</a>\n                </li>\n                <li role=\"none\">\n                  <a role=\"menuitem\" href=\"#awards\">Awards</a>\n                </li>\n              </ul>\n            </li>\n            <li role=\"none\">\n              <a role=\"menuitem\" aria-haspopup=\"true\" aria-expanded=\"false\" href=\"#campus-tours\">\n                Campus Tours\n                <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"right\" width=\"9\" height=\"12\" viewBox=\"0 0 9 12\">\n                 <polygon points=\"0 1, 0 11, 8 6\"></polygon>\n                </svg>\n              </a>\n              <ul role=\"menu\" aria-label=\"Campus Tours\">\n                <li role=\"none\">\n                  <a role=\"menuitem\" href=\"#for-prospective-students\">For prospective students</a>\n                </li>\n                <li role=\"none\">\n                  <a role=\"menuitem\" href=\"#for-alumni\">For alumni</a>\n                </li>\n                <li role=\"none\">\n                  <a role=\"menuitem\" href=\"#for-visitors\">For visitors</a>\n                </li>\n              </ul>\n            </li>\n          </ul>\n        </li>\n      </ul>\n    </nav>\n      \n    </section>\n    <section>\n      <h3>Toolbar</h3>\n      <div class=\"format\" role=\"toolbar\" aria-label=\"Text Formatting\" aria-controls=\"textarea1\">\n        <div class=\"group characteristics\">\n          <button type=\"button\" class=\"item bold popup\" aria-pressed=\"false\" value=\"bold\" tabindex=\"0\">\n            <span class=\"fas fa-bold\" aria-hidden=\"true\"></span>\n            <span class=\"popup-label\">Bold</span>\n          </button>\n          <button type=\"button\" class=\"item italic popup\" aria-pressed=\"false\" value=\"italic\" tabindex=\"-1\">\n            <span class=\"fas fa-italic\" aria-hidden=\"true\"></span>\n            <span class=\"popup-label\">Italic</span>\n          </button>\n          <button type=\"button\" class=\"item underline popup\" aria-pressed=\"false\" value=\"underline\" tabindex=\"-1\">\n            <span class=\"fas fa-underline\" aria-hidden=\"true\"></span>\n            <span class=\"popup-label\">Underline</span>\n          </button>\n        </div>\n       </div>\n      \n    </section>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      lang: 'en-us'\n    };\n  },\n};\n</script>\n\n<!-- Use preprocessors via the lang attribute! e.g. <style lang=\"scss\"> -->\n<style>\n#app {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n\n  color: #2c3e50;\n  margin: 20px 10px 20px;\n}\n  \n  section {\n    margin: 10px 0px;\n  }\n\na,\nbutton {\n  color: #4fc08d;\n}\n\nbutton {\n  background: none;\n  border: solid 1px;\n  border-radius: 2em;\n  font: inherit;\n  padding: 0.75em 2em;\n}\nul.checkboxes {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  padding-left: 1em;\n}\n\nul.checkboxes li {\n  list-style: none;\n  margin: 1px;\n  padding: 0;\n}\n\n[role=\"checkbox\"] {\n  display: inline-block;\n  padding: 4px 8px;\n  cursor: pointer;\n}\n\n[role=\"checkbox\"]::before {\n  position: relative;\n  top: 1px;\n  left: -4px;\n  content: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='currentcolor' stroke-width='1' fill-opacity='0' /%3E%3C/svg%3E\");\n}\n\n[role=\"checkbox\"][aria-checked=\"true\"]::before {\n  position: relative;\n  top: 1px;\n  content: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='currentcolor' stroke-width='1' fill-opacity='0' /%3E%3Cpolyline points='4,8 7,12 12,5' fill='none' stroke='currentcolor' stroke-width='2' /%3E%3C/svg%3E\");\n}\n[role=\"checkbox\"][aria-checked=\"mixed\"]::before {\n  position: relative;\n  top: 1px;\n  content: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='currentcolor' stroke-width='1' fill-opacity='0' /%3E%3Cline x1='5' y1='5' x2='12' y2='12' stroke='currentcolor' stroke-width='2' /%3E%3C/svg%3E\");\n}\n\n[role=\"checkbox\"]:focus,\n[role=\"checkbox\"]:hover {\n  padding: 2px 6px;\n  border: 2px solid #005a9c;\n  border-radius: 5px;\n  background-color: #def;\n}\n\n[role=\"checkbox\"]:hover {\n  cursor: pointer;\n}\n/** Accordion */\n .accordion {\n  margin: 0;\n  padding: 0;\n  border: 2px solid hsl(0deg 0% 52%);\n  border-radius: 7px;\n  width: 20em;\n}\n.accordion button {\n  border: 0;\n}\n.accordion h4 {\n  margin: 0;\n  padding: 0;\n}\n\n.accordion:focus-within {\n  border-color: hsl(216deg 94% 43%);\n}\n\n.accordion:focus-within h4 {\n  background-color: hsl(0deg 0% 97%);\n}\n\n.accordion > * + * {\n  border-top: 1px solid hsl(0deg 0% 52%);\n}\n\n.accordion-trigger {\n  background: none;\n  color: hsl(0deg 0% 13%);\n  display: block;\n  font-size: 1rem;\n  font-weight: normal;\n  margin: 0;\n  padding: 1em 1.5em;\n  position: relative;\n  text-align: left;\n  width: 100%;\n  outline: none;\n}\n\n.accordion-trigger:focus,\n.accordion-trigger:hover {\n  background: hsl(216deg 94% 94%);\n}\n\n.accordion-trigger:focus {\n  outline: 4px solid transparent;\n}\n\n.accordion > *:first-child .accordion-trigger,\n.accordion > *:first-child {\n  border-radius: 5px 5px 0 0;\n}\n\n.accordion > *:last-child .accordion-trigger,\n.accordion > *:last-child {\n  border-radius: 0 0 5px 5px;\n}\n\n.accordion button::-moz-focus-inner {\n  border: 0;\n}\n\n.accordion-title {\n  display: block;\n  pointer-events: none;\n  border: transparent 2px solid;\n  border-radius: 5px;\n  padding: 0.25em;\n  outline: none;\n}\n\n.accordion-trigger:focus .accordion-title {\n  border-color: hsl(216deg 94% 43%);\n}\n\n.accordion-icon {\n  border: solid currentcolor;\n  border-width: 0 2px 2px 0;\n  height: 0.5rem;\n  pointer-events: none;\n  position: absolute;\n  right: 2em;\n  top: 50%;\n  transform: translateY(-60%) rotate(45deg);\n  width: 0.5rem;\n}\n\n.accordion-trigger:focus .accordion-icon,\n.accordion-trigger:hover .accordion-icon {\n  border-color: hsl(216deg 94% 43%);\n}\n\n.accordion-trigger[aria-expanded=\"true\"] .accordion-icon {\n  transform: translateY(-50%) rotate(-135deg);\n}\n\n.accordion-panel {\n  margin: 0;\n  padding: 1em 1.5em;\n}\n\n/* For Edge bug https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4806035/ */\n.accordion-panel[hidden] {\n  display: none;\n}\n/** Tab */\n.tabs {\n  font-family: \"lucida grande\", sans-serif;\n}\n\n[role=\"tablist\"] {\n  min-width: 550px;\n}\n\n[role=\"tab\"],\n[role=\"tab\"]:focus,\n[role=\"tab\"]:hover {\n  position: relative;\n  z-index: 2;\n  top: 2px;\n  margin: 0;\n  margin-top: 4px;\n  padding: 3px 3px 4px;\n  border: 1px solid hsl(219deg 1% 72%);\n  border-bottom: 2px solid hsl(219deg 1% 72%);\n  border-radius: 5px 5px 0 0;\n  overflow: visible;\n  background: hsl(220deg 20% 94%);\n  outline: none;\n  font-weight: bold;\n}\n\n[role=\"tab\"][aria-selected=\"true\"] {\n  padding: 2px 2px 4px;\n  margin-top: 0;\n  border-width: 2px;\n  border-top-width: 6px;\n  border-top-color: rgb(36 116 214);\n  border-bottom-color: hsl(220deg 43% 99%);\n  background: hsl(220deg 43% 99%);\n}\n\n[role=\"tab\"][aria-selected=\"false\"] {\n  border-bottom: 1px solid hsl(219deg 1% 72%);\n}\n\n[role=\"tab\"] span.focus {\n  display: inline-block;\n  margin: 2px;\n  padding: 4px 6px;\n}\n\n[role=\"tab\"]:hover span.focus,\n[role=\"tab\"]:focus span.focus,\n[role=\"tab\"]:active span.focus {\n  padding: 2px 4px;\n  border: 2px solid rgb(36 116 214);\n  border-radius: 3px;\n}\n\n[role=\"tabpanel\"] {\n  padding: 5px;\n  border: 2px solid hsl(219deg 1% 72%);\n  border-radius: 0 5px 5px;\n  background: hsl(220deg 43% 99%);\n  min-height: 10em;\n  min-width: 550px;\n  overflow: auto;\n}\n\n[role=\"tabpanel\"].is-hidden {\n  display: none;\n}\n\n[role=\"tabpanel\"] p {\n  margin: 0;\n}\n /** Spinner */\n  \n #html-spinner{\n  width:40px;\n  height:40px;\n  border:4px solid #fcd779;\n  border-top:4px solid white;\n  border-radius:50%;\n}\n\n#html-spinner, #svg-spinner{\n\n  transition-property: transform;\n  animation-name: rotate; \n  animation-duration: 1.2s; \n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n\n\n@keyframes rotate {\n    from {transform: rotate(0deg);}\n    to {transform: rotate(360deg);}\n}\n  \n/* Radiogroup */\n\n.rating-radio label {\n  display: block;\n}\n\n.rating-radio svg g[role=\"radio\"] {\n  color: #005a9c;\n}\n\n.rating-radio svg {\n  forced-color-adjust: auto;\n  touch-action: pan-y;\n}\n\n.rating-radio svg .focus-ring,\n.rating-radio svg .focus-ring-none {\n  stroke-width: 0;\n  fill-opacity: 0;\n}\n\n.rating-radio svg .star {\n  stroke-width: 2px;\n  stroke: currentcolor;\n  fill-opacity: 0;\n}\n\n.rating-radio svg .star-none {\n  stroke-width: 3px;\n  stroke: currentcolor;\n  fill-opacity: 0;\n}\n\n.rating-radio[data-rating-value=\"5\"] svg .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n\n.rating-radio[data-rating-value=\"1\"] svg .star-1 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n\n.rating-radio[data-rating-value=\"2\"] svg .star-2 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n\n.rating-radio[data-rating-value=\"3\"] svg .star-3 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n\n.rating-radio[data-rating-value=\"4\"] svg .star-4 .star {\n  fill: currentcolor;\n  fill-opacity: 1;\n}\n\n/* focus styling */\n\n.rating-radio:focus {\n  outline: none;\n}\n\n.rating-radio svg g:focus {\n  outline: none;\n}\n\n.rating-radio svg g:focus .focus-ring {\n  stroke-width: 2px;\n  stroke: currentcolor;\n}\n\n.rating-radio:hover {\n  cursor: pointer;\n}\n  \n/* toolbar */\n[role=\"toolbar\"] {\n  border: 2px solid transparent;\n  border-radius: 5px;\n  padding: 6px;\n  height: 44px;\n  width: 1050px;\n  background-color: #ececea;\n}\n\n[role=\"toolbar\"].focus {\n  border-color: #005a9c;\n  border-width: 3px;\n  padding: 5px;\n}\n\n[role=\"toolbar\"] .group {\n  padding: 0.25em;\n  display: block;\n  float: left;\n}\n\n[role=\"toolbar\"] .group:not(:first-child) {\n  margin-left: 0.75em;\n}\n\n[role=\"toolbar\"] button,\n[role=\"toolbar\"] [role=\"radio\"],\n[role=\"toolbar\"] label,\n[role=\"toolbar\"] .spinbutton,\n[role=\"toolbar\"] a,\n[role=\"toolbar\"] .input {\n  border: 1px solid rgb(255 255 255);\n  outline: none;\n  display: inline-block;\n  padding: 6px 12px;\n  border-radius: 5px;\n  text-align: center;\n  background: rgb(255 255 255);\n  color: #222428;\n  font-size: 14px;\n  line-height: 1.5em;\n  margin-right: 0.25em;\n}\n\n[role=\"toolbar\"] button.popup {\n  position: relative;\n}\n\n[role=\"toolbar\"] button .popup-label {\n  display: block;\n  width: initial;\n  border: 1px solid white;\n  padding: 2px 4px;\n  border-radius: 5px;\n  position: absolute;\n  top: -30000em;\n  background-color: black;\n  color: white;\n  font-weight: normal;\n}\n\n[role=\"toolbar\"] button .popup-label.show {\n  text-align: center;\n  top: -2.5em;\n}\n\n[role=\"toolbar\"] button .popup-label::after,\n[role=\"toolbar\"] button .popup-label::before {\n  top: 100%;\n  left: 50%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n}\n\n[role=\"toolbar\"] button .popup-label::after {\n  border-color: rgb(0 0 0 / 0%);\n  border-top-color: #000;\n  border-width: 10px;\n  margin-left: -10px;\n}\n\n[role=\"toolbar\"] button .popup-label::before {\n  border-color: rgb(255 255 255 / 0%);\n  border-top-color: #fff;\n  border-width: 12px;\n  margin-left: -12px;\n}\n\n[role=\"toolbar\"] button[aria-pressed=\"true\"],\n[role=\"toolbar\"] [role=\"radio\"][aria-checked=\"true\"] {\n  border-color: #555;\n  font-weight: bold;\n  background-color: #f4f4f4;\n}\n\n[role=\"toolbar\"] button[aria-disabled=\"true\"] {\n  color: #889;\n  cursor: not-allowed;\n}\n\n[role=\"toolbar\"] button[aria-disabled=\"true\"]:focus {\n  border-color: #005a9c;\n}\n\n[role=\"toolbar\"] button::-moz-focus-inner {\n  border: 0;\n}\n\n[role=\"toolbar\"] button:focus,\n[role=\"toolbar\"] [role=\"radio\"]:focus,\n[role=\"toolbar\"] .spinbutton:focus,\n[role=\"toolbar\"] .focus,\n[role=\"toolbar\"] a:focus {\n  border-width: 2px;\n  border-color: #005a9c;\n  background: rgb(226 239 255);\n  padding: 5px 11px;\n}\n\n[role=\"toolbar\"] button:hover,\n[role=\"toolbar\"] [role=\"radio\"]:hover,\n[role=\"toolbar\"] .spinbutton:hover,\n[role=\"toolbar\"] label.input:hover,\n[role=\"toolbar\"] a:hover {\n  border-color: #005a9c;\n  background: rgb(226 239 255);\n}\n\n[role=\"toolbar\"] [role=\"spinbutton\"] .value,\n[role=\"toolbar\"] [role=\"spinbutton\"] .increase,\n[role=\"toolbar\"] [role=\"spinbutton\"] .decrease {\n  width: 60px;\n  display: inline-block;\n  padding: 0;\n  margin: 0;\n}\n\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;