import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  inputs: {
    dni: '',
    name: '',
    lastName: '',
    phoneNumber: ''
  },
  loading: 'Cargando...',
  listOfClients: [],
  banner: {
    show: false,
    message: '',
    style: ''
  },
  showModal: false,
  updateClient: {
    updateDni: '',
    updateName: '',
    updateLastName: '',
    updatePhoneNumber: ''
  }
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    // fetching clients data from supabase
    getClients (state, action) {
      // 👁️ reverse the listo of clients 👇
      state.listOfClients = action.payload
    },
    // set loading to null when data is loaded
    loadingTable (state) {
      state.loading = null
    },
    // handle input change
    handleInputs (state, action) {
      state.inputs[action.payload.name] = action.payload.value
    },
    // shows a successfull banner
    handleSuccessfullBanner (state) {
      state.banner.show = true
      state.banner.message = 'Se ha registrado un nuevo cliente exitosamente'
      state.banner.style = 'success'
    },
    handleLoadingBanner (state) {
      state.banner.show = true
      state.banner.message = 'Enviando datos...'
      state.banner.style = 'loading'
    },
    handleErrorBanner (state) {
      state.banner.show = true
      state.banner.message = '¡Oops algo salio mal!'
      state.banner.style = 'error'
    },
    resetToInitialState (state) {
      state.inputs = {
        dni: '',
        name: '',
        lastName: '',
        phoneNumber: ''
      }

      state.banner = {
        show: false,
        message: '',
        style: ''
      }
    }
  }
})

export default clientSlice.reducer
export const clientSliceAction = clientSlice.actions
