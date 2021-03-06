const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true, dock: true, typeInterval: 120 })

function TestTemperature () {
  nightmare
    .goto('http://localhost:8080/')
    .viewport(1100, 650)
    .wait(500)
    .type('input#reef-pi-user', 'reef-pi')
    .wait(500)
    .type('input#reef-pi-pass', 'reef-pi')
    .wait(500)
    .click('input#btnSaveCreds')
    .wait(500)

    .click('a#tab-temperature')
    .wait(500)
    .click('input#tc_enable')
    .wait(500)
    .click('input#tc_control')
    .wait(500)
    .insert('input#min')
    .wait(500)
    .type('input#min', '78')
    .wait(500)
    .insert('input#max')
    .wait(500)
    .type('input#max', '80')
    .wait(500)
    .click('button#heater_selector')
    .wait(500)
    .click('span#heater_selector-Heater')
    .wait(1000)
    .click('input#update-temp-settings')

    .wait(1500)
    .end()
    .then(function () {
      console.log('temperature')
    })
    .catch(function (error) {
      console.error('Error:', error)
    })
}
TestTemperature()
