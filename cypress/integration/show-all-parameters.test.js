/**
 * @description As a user, I want to see all mapped parameters so that I can decide what to do with my controls
 * @see https://app.asana.com/0/1201218555433785/1201220404923117/f
 */
describe ('show all parameters ', () => {

    const URL = 'http://localhost:5000'
    const SETTINGS_BUTTON = 'settings'
    const SETTINGS_CONTAINER = '.cool-settings--container'
    const SETTINGS_CONTENT = '.cool-settings--content'
    const ACTION = '.cool-action'

    before (() => {
        cy.visit (URL)
    })

    it ('should display settings modal', () => {
        cy.get (SETTINGS_CONTAINER).should ('not.be.visible')
        cy.contains (SETTINGS_BUTTON).click ({force: true})
        cy.get (SETTINGS_CONTAINER).should ('be.visible')
    })

    it ('should display 14 parameters', () => {
        cy.get (SETTINGS_CONTENT).should ('be.visible')
        cy.get (ACTION).should ('have.length', 14)
    })

})