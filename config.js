export default {
    config: {
        // how many mintes should pass after feedback submission for the feedback
        // panel to show up automatically again
        // noAutoFeedbackMinutes: 2,

        // on which pages the feedback should show up automatically
        // this setting works only if specificPagesTrigger.js is used
        // includePages: ['*'],

        // how many seconds should pass from VuePress website load until feedback panel
        // automatically pops up
        // note that the panel might not show up if 'noAutoFeedbackMinutes'
        // setting disallows that.
        // this setting works only if timeoutTrigger.js is used
        // timeoutTriggerSeconds: 5,

        // questions to be included in the panel
        questions: [],

        // feedback sending might be disabled if VuePress website is hosted locally
        disableOnLocalhost: false,

        // interval between button shaking (use 0 to disable)
        // buttonShakeIntervalInSeconds: 60,

        // the text that will be displayed on the Feedback button
        buttonText: "Feedback",

        submissionWebhook: "localhost"
    }
};