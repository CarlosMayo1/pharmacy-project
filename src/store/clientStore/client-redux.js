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
      state.banner = {
        show: true,
        message: 'Se ha registrado un nuevo cliente exitosamente',
        style: 'success'
      }
    },
    // shows a blue loading banner
    handleLoadingBanner (state) {
      state.banner = {
        show: true,
        message: 'Enviando datos...',
        style: 'loading'
      }
    },
    // shows an error banner
    handleErrorBanner (state) {
      state.banner = {
        show: true,
        message: '¡Oops algo salio mal!',
        style: 'error'
      }
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
