import {reduxGet} from 'utils/ajax'
import $ from 'jquery'
import {fetchATOs} from './ato'
import {fetchOutlets} from './outlets'
import {fetchInlets} from './inlets'
import {fetchJacks} from './jacks'
import {fetchTCs} from './tcs'
import {fetchLights} from './lights'
import {fetchPhProbes} from './phprobes'
import {fetchEquipments} from './equipment'
import {capabilitiesLoaded} from './capabilities'

export const fetchUIData = (dispatch) => {
  return (reduxGet({
    url: '/api/capabilities',
    success: (capabilities) => {

      dispatch(fetchInlets())
      dispatch(fetchJacks())
      dispatch(fetchOutlets())

      $.each(capabilities, (i, v) => {
        if (!v) {
          return
        }
        switch (i) {
          case 'ato':
            dispatch(fetchATOs())
            break
          case 'ph':
            dispatch(fetchPhProbes())
            break
          case 'temperature':
            dispatch(fetchTCs())
            break
          case 'lighting':
            dispatch(fetchLights())
            break
          case 'equipments':
            dispatch(fetchEquipments())
            break
        }
      })
      return (capabilitiesLoaded(capabilities))
    }
  }))
}
