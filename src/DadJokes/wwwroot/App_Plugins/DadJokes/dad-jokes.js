const e = [
  {
    type: "headerApp",
    alias: "dadjoke.header.app",
    name: "dadjoke app",
    element: () => import("./headerApps.element-CMyFzkno.js"),
    weight: 850,
    meta: {
      label: "time",
      icon: "icon-alarm-clock",
      path: "time"
    }
  },
  {
    type: "modal",
    alias: "dadjoke.header.modal",
    name: "dadjoke header modal",
    element: () => import("./modal.element-D6znhh09.js")
  }
], a = [
  ...e
];
export {
  a as manifests
};
//# sourceMappingURL=dad-jokes.js.map
