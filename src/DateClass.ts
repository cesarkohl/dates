interface IDateClass {
    getNowClient(): string;
    getNowUTC(): string;
    getClientToUTC(date: string | null): string;
    getUTCToClient(date: string): string;
    getUTCToTimezone(dateUTC: string, timezone: string): string;
}

interface IDate {
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number,
}

class DateClass implements IDateClass {
    public getNowClient(): string {
        return this.getUTCToTimezone(this.getClientToUTC(), this.getTimezoneClient())
    }

    public getNowUTC(): string {
        return this.getClientToUTC()
    }

    public getClientToUTC(date: string | IDate = null): string {
        let newDate

        if (date === null) {
            newDate = new Date()
        }
        else if (typeof date === 'string') {
            date = this.removeTimezone(date)
            newDate = new Date(date)
        } else if (typeof date === 'object') {
            newDate = new Date(Date.UTC(
                date.year,
                date.month,
                date.date,
                date.hours,
                date.minutes,
                date.seconds,
                date.ms,
            ))
        }

        return this.defaultFormat(newDate.toISOString())
    }

    public getUTCToClient(date): string {
        return this.getUTCToTimezone(date, this.getTimezoneClient())
    }

    public getUTCToTimezone(dateUTC, timezone): string {
        return new Date(`${dateUTC}.000Z`).toLocaleString('sv-SE', {timeZone: timezone});
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
