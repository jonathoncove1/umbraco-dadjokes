export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'headerApp',
    alias: 'dadjoke.header.app',
    name: 'dadjoke app',
    element: () => import('./headerApps.element'),
    weight: 850,
    meta: {
      label: 'time',
      icon: 'icon-alarm-clock',
      path: 'time'
    } 
  },
  {
    type: 'modal',
    alias: 'dadjoke.header.modal',
    name: 'dadjoke header modal',
    element: () => import('./modal.element'),
  }
];
