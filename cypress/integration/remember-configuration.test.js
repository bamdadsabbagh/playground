/**
 * @description As a user, I want my configuration to be remembered so that I can come back after a reload or a browser restart without losing my settings
 * @see https://app.asana.com/0/1201218555433785/1201220404923135/f
 * @todo mock Web MIDI API
 */
describe ('remember configuration', () => {

    const URL = 'http://localhost:5000'
    const INITIAL_STATEFUL_STORAGE = '{"isLearning":false,"learningParameter":null,"devices":[{"id":"1A0CE1F47C19C43DAEB93B9595F6E4BA822ED318FE8D8BF2750B66286B5BEC38"},{"id":"1A0CE1F47C19C43DAEB93B9595F6E4BA822ED318FE8D8BF2750B66286B5BEC38"},{"id":"1A0CE1F47C19C43DAEB93B9595F6E4BA822ED318FE8D8BF2750B66286B5BEC38"},{"id":"1D7152636AD31F87A649BBA180B97F4AD4106619A9306870DE16C7F0F8B03024"},{"id":"940B011A2CE43CFA6B4CA9C34E5CE0E0D96DD968E0B9F9D173D1AC47026195AE"}],"controlByParameter":{"playPauseButton":{"control":41,"type":"button"},"resetButton":{"control":73,"type":"button"}},"parametersByControl":{"41":["playPauseButton"],"73":["resetButton"]}}'

    before (() => {
        cy.visit (URL)
        window.localStorage.setItem ('coolState', INITIAL_STATEFUL_STORAGE)
    })

    describe ('localStorage', () => {
        it ('should not be undefined', () => {
            cy.window ('localStorage').should ('not.be.undefined')
        })
    })

    describe ('localStorage.coolState', () => {
        it ('should not be undefined', () => {
            cy.window ('localStorage.coolState').should ('not.be.undefined')
        })

        it ('should equal the window.coolState object', () => {

            // todo this fails
            cy.window ().then (w => {
                expect (w.localStorage.coolState === window.localStorage).equal (true)
            })
        })
    })
})