import { options as e } from "./preact.js";
var c, r, m, i = 0, p = [], H = e.__b, d = e.__r, y = e.diffed, E = e.__c, b = e.unmount;
function a(_, n) { e.__h && e.__h(r, _, i || n), i = 0; var t = r.__H || (r.__H = { __: [], __h: [] }); return _ >= t.__.length && t.__.push({}), t.__[_]; }
function g(_) { return i = 1, A(x, _); }
function A(_, n, t) { var u = a(c++, 2); return u.t = _, u.__c || (u.__ = [t ? t(n) : x(void 0, n), function (o) { var f = u.t(u.__[0], o); u.__[0] !== f && (u.__ = [f, u.__[1]], u.__c.setState({})); }], u.__c = r), u.__; }
function D(_, n) { var t = a(c++, 3); !e.__s && v(t.__H, n) && (t.__ = _, t.__H = n, r.__H.__h.push(t)); }
function F(_, n) { var t = a(c++, 4); !e.__s && v(t.__H, n) && (t.__ = _, t.__H = n, r.__h.push(t)); }
function C(_) { return i = 5, h(function () { return { current: _ }; }, []); }
function T(_, n, t) { i = 6, F(function () { typeof _ == "function" ? _(n()) : _ && (_.current = n()); }, t == null ? t : t.concat(_)); }
function h(_, n) { var t = a(c++, 7); return v(t.__H, n) && (t.__ = _(), t.__H = n, t.__h = _), t.__; }
function V(_, n) { return i = 8, h(function () { return _; }, n); }
function j(_) { var n = r.context[_.__c], t = a(c++, 9); return t.c = _, n ? (t.__ == null && (t.__ = !0, n.sub(r)), n.props.value) : _.__; }
function k(_, n) { e.useDebugValue && e.useDebugValue(n ? n(_) : _); }
function R(_) { var n = a(c++, 10), t = g(); return n.__ = _, r.componentDidCatch || (r.componentDidCatch = function (u) { n.__ && n.__(u), t[1](u); }), [t[0], function () { t[1](void 0); }]; }
function S() { for (var _; _ = p.shift();)
    if (_.__P)
        try {
            _.__H.__h.forEach(s), _.__H.__h.forEach(l), _.__H.__h = [];
        }
        catch (n) {
            _.__H.__h = [], e.__e(n, _.__v);
        } }
e.__b = function (_) { r = null, H && H(_); }, e.__r = function (_) { d && d(_), c = 0; var n = (r = _.__c).__H; n && (n.__h.forEach(s), n.__h.forEach(l), n.__h = []); }, e.diffed = function (_) { y && y(_); var n = _.__c; n && n.__H && n.__H.__h.length && (p.push(n) !== 1 && m === e.requestAnimationFrame || ((m = e.requestAnimationFrame) || function (t) { var u, o = function () { clearTimeout(f), q && cancelAnimationFrame(u), setTimeout(t); }, f = setTimeout(o, 100); q && (u = requestAnimationFrame(o)); })(S)), r = null; }, e.__c = function (_, n) { n.some(function (t) { try {
    t.__h.forEach(s), t.__h = t.__h.filter(function (u) { return !u.__ || l(u); });
}
catch (u) {
    n.some(function (o) { o.__h && (o.__h = []); }), n = [], e.__e(u, t.__v);
} }), E && E(_, n); }, e.unmount = function (_) { b && b(_); var n, t = _.__c; t && t.__H && (t.__H.__.forEach(function (u) { try {
    s(u);
}
catch (o) {
    n = o;
} }), n && e.__e(n, t.__v)); };
var q = typeof requestAnimationFrame == "function";
function s(_) { var n = r, t = _.__c; typeof t == "function" && (_.__c = void 0, t()), r = n; }
function l(_) { var n = r; _.__c = _.__(), r = n; }
function v(_, n) { return !_ || _.length !== n.length || n.some(function (t, u) { return t !== _[u]; }); }
function x(_, n) { return typeof n == "function" ? n(_) : n; }
export { V as useCallback, j as useContext, k as useDebugValue, D as useEffect, R as useErrorBoundary, T as useImperativeHandle, F as useLayoutEffect, h as useMemo, A as useReducer, C as useRef, g as useState };
export default null;