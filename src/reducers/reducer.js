export const reducer = (state, action) => {
  switch (action.type) {
    // Manejo del tema
    case 'SET_THEME':
      localStorage.setItem('theme', action.payload)
      return { ...state, theme: action.payload }

    // Detección de cambio de tamaño de pantalla
    case 'TOGGLE_DESKTOP':
      return { ...state, isDesktop: action.payload }

    // Productos
    case 'LIST_PRODUCTS':
      return { ...state, data: action.payload }
    case 'ADD_PRODUCT':
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        data: state.data.map(product => 
          product.id === action.payload.id ? action.payload : product
        ),
      }
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        data: state.data.filter(product => product.id !== action.payload),
      }

    // Categorías
    case 'LIST_CATEGORIES':
      return { ...state, categories: action.payload }
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload)
      }

    // Sugerencias de búsqueda
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload }

    // Usuario y autenticación
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload.user,
        userInitials: action.payload.initials,
        isLoggedIn: true,
        role: action.payload.user.role,
        favs: JSON.parse(localStorage.getItem('favs')) || [], // Cargar favs desde localStorage al loguear
      }
    case 'UPDATE_USER':
      return { 
        ...state, 
        user: action.payload.user, 
        userInitials: action.payload.initials 
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        userInitials: '',
        isLoggedIn: false,
        role: '',
        token: '',
        favs: [], // Limpiar favs al desloguear
      }
    case 'SET_USER_DATA':
      return { 
        ...state, 
        user: action.payload.user, 
        userInitials: action.payload.initials 
      }
    case 'SET_USERS':
      return { ...state, users: action.payload }

    // Favoritos
    case 'SET_FAVS':
      return {
        ...state, 
        favs: action.payload
      }
    case 'ADD_FAV':
      return {
        ...state, 
        favs: [...state.favs, action.payload]
      }
    case 'REMOVE_FAV':
      return {
        ...state,
        favs: state.favs.filter(fav => fav !== action.payload)
      }

    // Reserva
    case "ADD_RESERVA":
      return{
        ...state,
        reservaData : action.payload
      }
    case 'SET_RESERVATION_COST':
      return {
        ...state,
        totalReservationCost: action.payload,
      }

    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          address: action.payload.address,
        },
      }
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }  
    case 'UPDATE_USER_ROLE':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId ? { ...user, role: action.payload.role } : user
        ),
      }
    case 'UPDATE_PAYMENT_INFO':
      return {
        ...state,
        paymentInfo: {
          ...state.paymentInfo,
          ...action.payload,
        },
      }
      
    default:
      return state
  }
}