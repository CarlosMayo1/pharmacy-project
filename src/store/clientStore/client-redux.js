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
  },
  deleteClient: ''
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
    handleSuccessfullBanner (state, action) {
      state.banner = {
        show: true,
        message: action.payload,
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
    // shows an error
    handleErrorBanner (state, action) {
      state.banner = {
        show: true,
        message: action.payload,
        style: 'error'
      }
    },
    // reset to initial state
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
    },
    // update client
    updateClient (state, action) {
      state.updateClient = action.payload
    },
    // delete client
    deleteClient (state, action) {
      state.deleteClient = action.payload
    }
  }
})

export default clientSlice.reducer
export const clientSliceAction = clientSlice.actions
