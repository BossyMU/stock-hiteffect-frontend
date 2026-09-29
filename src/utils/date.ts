/** Business timezone; must match the backend's APP_TIMEZONE so both agree on "today". */
export const APP_TIMEZONE = 'Asia/Bangkok'

const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: APP_TIMEZONE })

/** Today's date as YYYY-MM-DD in the shop's timezone. */
export const today = () => ymd.format(new Date())
