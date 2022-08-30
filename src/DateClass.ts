interface IDateClass {
    getNowClient(): string;
    getNowUTC(): string;
    getClientToUTC(date: string): string;
    getUTCToClient(date: string): string;
    getUTCToTimezone(date: string, timezone: string): string;
}

class DateClass implements IDateClass {
    public getNowClient(): string {
        return this.getUTCToTimezone(this.getNowUTC(), this.getTimezoneClient())
    }

    public getNowUTC(): string {
        const newDate = new Date()
        return this.defaultFormat(newDate.toISOString())
    }

    public getClientToUTC(date: string): string {
        const newDate = new Date(this.removeTimezone(date))
        return this.defaultFormat(newDate.toISOString())
    }

    public getUTCToClient(date): string {
        return this.getUTCToTimezone(date, this.getTimezoneClient())
    }

    public getUTCToTimezone(date, timezone): string {
        return new Date(`${date}.000Z`).toLocaleString('sv-SE', {timeZone: timezone});
    }

    protected getTimezoneClient(): string {
        return new Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    protected removeTimezone(date: string): string {
        return (date.match(/.[0-9]{3}Z$/))
            ? date.slice(0, -5)
            : date
    }

    protected defaultFormat(date: string): string {
        date = this.removeTimezone(date)
        date = date.replace('T', ' ')
        return date
    }
}

module.exports = DateClass
