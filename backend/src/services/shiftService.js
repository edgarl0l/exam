const { calendar, oauth2 } = require("../config/google");
const User = require("../models/User");

create: async data => {
    await DutyShift.create(data);

    const u = await User.findById(data.userId);
    oauth2.setCredentials({ refresh_token: u.RefreshToken });

    await calendar.events.insert({
        calendarId: "primary",
        requestBody: {
            summary: "Дежурство",
            start: { dateTime: data.start },
            end: { dateTime: data.end },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 60 },
                    { method: "email", minutes: 1440 }
                ]
            }
        }
    });

    return { success: true };
}
