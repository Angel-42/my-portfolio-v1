module.exports = [
"[project]/data/projects.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"slug":"zappy","title":"Zappy","year":2024,"description":"Jeu multijoueur en réseau (Epitech project) — serveur en C, GUI en C++.","tech":["C","C++","Socket"],"repo":"https://github.com/Angel-42/Zappy"},{"slug":"raytracer","title":"Raytracer","year":2023,"description":"Moteur de rendu par lancer de rayons en C++.","tech":["C++","Math","Rendering"],"repo":"https://github.com/Angel-42/Raytracer"}]);}),
"[project]/pages/projects/[slug].tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectPage,
    "getStaticPaths",
    ()=>getStaticPaths,
    "getStaticProps",
    ()=>getStaticProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/projects.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
function ProjectPage({ project }) {
    if (!project) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            "Projet non trouvé — ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                children: "Retour"
            }, void 0, false, {
                fileName: "[project]/pages/projects/[slug].tsx",
                lineNumber: 16,
                columnNumber: 49
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/projects/[slug].tsx",
        lineNumber: 16,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                children: project.title
            }, void 0, false, {
                fileName: "[project]/pages/projects/[slug].tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            project.year && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("em", {
                    children: project.year
                }, void 0, false, {
                    fileName: "[project]/pages/projects/[slug].tsx",
                    lineNumber: 20,
                    columnNumber: 27
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/projects/[slug].tsx",
                lineNumber: 20,
                columnNumber: 24
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: project.description
            }, void 0, false, {
                fileName: "[project]/pages/projects/[slug].tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            project.tech && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: [
                    "Tech: ",
                    project.tech.join(', ')
                ]
            }, void 0, true, {
                fileName: "[project]/pages/projects/[slug].tsx",
                lineNumber: 22,
                columnNumber: 24
            }, this),
            project.repo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                    href: project.repo,
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Voir le repo"
                }, void 0, false, {
                    fileName: "[project]/pages/projects/[slug].tsx",
                    lineNumber: 23,
                    columnNumber: 27
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/projects/[slug].tsx",
                lineNumber: 23,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/projects/[slug].tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
const getStaticPaths = async ()=>{
    const paths = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$json__$28$json$29$__["default"].map((p)=>({
            params: {
                slug: p.slug
            }
        }));
    return {
        paths,
        fallback: false
    };
};
const getStaticProps = async (context)=>{
    const slug = context.params?.slug;
    const project = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$projects$2e$json__$28$json$29$__["default"].find((p)=>p.slug === slug) || null;
    return {
        props: {
            project
        }
    };
};
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8412d873._.js.map