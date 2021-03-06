import React from 'react'
import SelectEquipment from 'select_equipment'
import InletSelector from 'connectors/inlet_selector'
import ATOChart from './chart'
import {deleteATO, updateATO} from 'redux/actions/ato'
import {connect} from 'react-redux'
import {isEmptyObject} from 'jquery'
import {confirm} from 'utils/confirm'

class ato extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ato: props.data,
      readOnly: true,
      expand: false
    }
    this.save = this.save.bind(this)
    this.remove = this.remove.bind(this)
    this.showControl = this.showControl.bind(this)
    this.updateCheckBox = this.updateCheckBox.bind(this)
    this.update = this.update.bind(this)
    this.updatePump = this.updatePump.bind(this)
    this.setInlet = this.setInlet.bind(this)
    this.expand = this.expand.bind(this)
    this.detailsUI = this.detailsUI.bind(this)
  }

  expand () {
    this.setState({expand: !this.state.expand})
  }

  setInlet (id) {
    var ato = this.state.ato
    ato.inlet = id
    this.setState({ato: ato})
  }

  updatePump (id) {
    var ato = this.state.ato
    ato.pump = id
    this.setState({ato: ato})
  }

  remove () {
    confirm('Are you sure ?')
      .then(function () {
        this.props.deleteATO(this.props.data.id)
      }.bind(this))
  }

  update (k) {
    return (function (ev) {
      var h = this.state.ato
      h[k] = ev.target.value
      this.setState({
        ato: h
      })
    }.bind(this))
  }

  updateCheckBox (key) {
    return (function (ev) {
      var ato = this.state.ato
      ato[key] = ev.target.checked
      this.setState({
        ato: ato,
        updated: true
      })
    }.bind(this))
  }

  save () {
    if (this.state.readOnly) {
      this.setState({readOnly: false})
      return
    }

    var ato = this.state.ato
    ato.period = parseInt(ato.period)
    if (isNaN(ato.period)) {
      this.setState({
        showAlert: true,
        alertMsg: 'Check frequency has to be a positive integer'
      })
      return
    }
    this.props.updateATO(this.props.data.id, ato)
    this.setState({
      updated: false,
      readOnly: true,
      ato: ato
    })
  }

  showControl () {
    if (!this.state.ato.control) {
      return
    }
    return (
      <div className='row'>
        <div className='col-lg-2'>Pump</div>
        <div className='col-lg-4'>
          <SelectEquipment
            update={this.updatePump}
            active={this.state.ato.pump}
            id='ato-pump'
            readOnly={this.state.readOnly}
          />
        </div>
      </div>
    )
  }

  static getDerivedStateFromProps (props, state) {
    if (props.data === undefined) {
      return null
    }
    if (isEmptyObject(props.data)) {
      return null
    }
    state.ato = props.data
    return state
  }

  detailsUI () {
    var editText = 'edit'
    var editClass = 'btn btn-outline-success'
    if (!this.state.readOnly) {
      editText = 'save'
      editClass = 'btn btn-outline-primary'
    }
    return (
      <div className='row'>
        <div className='container'>
          <div className='row'>
            <InletSelector update={this.setInlet} readOnly={this.state.readOnly} active={this.state.ato.inlet} />
          </div>
          <div className='row'>
            <div className='col-lg-2'>Enable</div>
            <input type='checkbox' id='ato_enable' className='col-lg-4' defaultChecked={this.state.ato.enable} onClick={this.updateCheckBox('enable')} disabled={this.state.readOnly} />
          </div>
          <div className='row'>
            <div className='col-lg-2'>Check frequency</div>
            <input type='text' onChange={this.update('period')} id='period' className='col-lg-1' value={this.state.ato.period} readOnly={this.state.readOnly} />
            <span>second(s)</span>
          </div>
          <div className='row'>
            <div className='col-lg-2'>Control</div>
            <input type='checkbox' id='ato_control' className='col-lg-4' defaultChecked={this.state.ato.control} onClick={this.updateCheckBox('control')} disabled={this.state.readOnly} />
          </div>
          {this.showControl()}
          <div className='row'>
            <ATOChart ato_id={this.props.data.id} width={500} height={300} ato_name={this.props.data.name} />
          </div>
          <div className='row'>
            <div className='col'>
              <div className='float-right'>
                <input type='button' id='updateATO' onClick={this.save} value={editText} className={editClass} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    var details = <div />
    var expandLabel = 'expand'
    if (this.state.expand) {
      details = this.detailsUI()
      expandLabel = 'fold'
    }
    var name = <label>{this.state.ato.name}</label>
    if (!this.state.readOnly) {
      name = <input type='text' value={this.state.ato.name} onChange={this.update('name')} className='col-sm-2' readOnly={this.state.readOnly} />
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-xs-8'>
            <b>{name}</b>
          </div>
          <div className='col-lg-2 col-xs-2'>
            <input type='button' id={'expand-ato-' + this.props.data.id} onClick={this.expand} value={expandLabel} className='btn btn-outline-primary' />
          </div>
          <div className='col-lg-2 col-xs-2'>
            <input type='button' id={'remove-ato-' + this.props.data.id} onClick={this.remove} value='delete' className='btn btn-outline-danger' />
          </div>
        </div>
        {details}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateATO: (id, a) => dispatch(updateATO(id, a)),
    deleteATO: (id) => dispatch(deleteATO(id))
  }
}

const ATO = connect(null, mapDispatchToProps)(ato)
export default ATO
