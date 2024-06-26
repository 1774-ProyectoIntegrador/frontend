export const routes = {
  home: '/',
  products: '/productos',
  detail: '/producto/:id',
  categories: {
    cameras: '/categoria/camaras',
    lents: '/categoria/lentes',
    lights: '/categoria/luces',
    audio: '/categoria/audio',
    professionals: '/categoria/profesionales',
  },
  admin: {
    dashboard: '/admin/dashboard',
    products: '/admin/productos',
    categories: '/admin/categorias',
    permissions: '/admin/permisos',
  },
  user: {
    profile: '/user/perfil',
    directions: '/user/direcciones',
    bookings: '/user/reservas',
    favs: '/user/favoritos',
  },
}

export const adminMenuItems = [
  {
    id: 1,
    label: "Dashboard",
    path: routes.admin.dashboard,
    icon: "fa-chart-area"
  },
  {
    id: 2,
    label: "Productos",
    path: routes.admin.products,
    icon: "fa-database"
  },
  {
    id: 3,
    label: "Categorias",
    path: routes.admin.categories,
    icon: "fa-tags"
  },
  {
    id: 4,
    label: "Permisos",
    path: routes.admin.permissions,
    icon: "fa-users"
  }
]

export const userMenuItems = [
  {
    id: 1,
    label: "Mi perfil",
    path: routes.user.profile,
    icon: "fa-id-badge"
  },
  {
    id: 2,
    label: "Direcciones",
    path: routes.user.directions,
    icon: "fa-map-marker-alt"
  },
  {
    id: 3,
    label: "Reservas",
    path: routes.user.bookings,
    icon: "fa-calendar-alt"
  },
  {
    id: 4,
    label: "Favoritos",
    path: routes.user.favs,
    icon: "fa-heart"
  }
]