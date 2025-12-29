self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/projects/[slug]": [
    "static/chunks/pages/projects/[slug].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/projects/[slug]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()