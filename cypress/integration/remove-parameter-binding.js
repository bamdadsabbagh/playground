/**
 * @description As a user, I want to remove a control so that I can no longer change the parameter on the screen
 * @see https://app.asana.com/0/1201218555433785/1201220404923123/f
 */
describe ('remove parameter binding', () => {
    
    const URL = 'http://localhost:5000'
    const INITIAL_STATEFUL_STORAGE = '{"isLearning":false,"learningParameter":null,"devices":[{"id":"1A0CE1F47C19C43DAEB93B9595F6E4BA822ED318FE8D8BF2750B66286B5BEC38"},{"id":"1A0CE1F47C19C43DAEB93B9595F6E4BA822ED318FE8D8BF2750B66286B5BEC38"},{"id":"1A0CE1F47C19C43DAEB93B9595F6E4BA822ED318FE8D8BF2750B66286B5BEC38"},{"id":"1D7152636AD31F87A649BBA180B97F4AD4106619A9306870DE16C7F0F8B03024"},{"id":"940B011A2CE43CFA6B4CA9C34E5CE0E0D96DD968E0B9F9D173D1AC47026195AE"}],"controlByParameter":{"playPauseButton":{"control":41,"type":"button"},"resetButton":{"control":73,"type":"button"}},"parametersByControl":{"41":["playPauseButton"],"73":["resetButton"]}}'
    const SETTINGS_CONTAINER = '.cool-settings--container'
    const ACTION = '.cool-action'
    const SETTINGS_BUTTON = 'settings'

    before (() => {
        cy.visit (URL)
        window.localStorage.setItem ('coolState', INITIAL_STATEFUL_STORAGE)
    })

    it ('should display settings UI with 2 first parameters bound', () => {
        cy.contains (SETTINGS_BUTTON).click ({force: true})
        cy.get (SETTINGS_CONTAINER).should ('be.visible')

        cy.get (ACTION).then (results => {
            const firstParameter = results[0]
            const secondParameter = results[1]

            expect (firstParameter.children[1].innerText).equal ('41')
            expect (firstParameter.children[2].innerText).equal ('button')

            expect (secondParameter.children[1].innerText).equal ('73')
            expect (secondParameter.children[2].innerText).equal ('button')
        })
    })

    it ('should unbind parameters after clicking delete and results in an empty state', () => {
        cy.contains (SETTINGS_BUTTON).click ({force: true})
        cy.get (SETTINGS_CONTAINER).should ('be.visible')

        cy.get (ACTION).then (results => {
            const firstParameter = results[0]
            const secondParameter = results[1]

            firstParameter.children[3].click ()
            secondParameter.children[3].click ()

            expect (firstParameter.children[1].innerText).equal ('N/A')
            expect (firstParameter.children[2].innerText).equal ('N/A')

            expect (secondParameter.children[1].innerText).equal ('N/A')
            expect (secondParameter.children[2].innerText).equal ('N/A')

            cy.window ().then (w => {
                const state = w.coolState
                expect (Object.keys (state.parametersByControl).length).equal (0)
                expect (Object.keys (state.controlByParameter).length).equal (0)
            })
        })
    })
})