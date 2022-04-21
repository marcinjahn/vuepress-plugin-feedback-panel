const path = require('path')

module.exports = (options = {}, ctx) => {
    return {
        name: 'feedback-flyout',
        enhanceAppFiles: [
            path.resolve(__dirname, 'enhanceAppFile.js')
        ],
        globalUIComponents: 'FeedbackPanel',
        clientDynamicModules() {
            return {
              name: 'feedbackPanelPluginOptions.js',
              content: "export default " + JSON.stringify(options)
            }
        }
    }
}