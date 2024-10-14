import {
  EmailAlertChannel,

} from 'checkly/constructs'

const sendDefaults = {
  sendFailure: true,
  sendRecovery: true,
  sendDegraded: false,
  sslExpiry: true,
  sslExpiryThreshold: 30
}

export const emailChannel = new EmailAlertChannel('jon-email-channel-1', {
  address: 'jonathan@checklyhq.com',
  ...sendDefaults
})
