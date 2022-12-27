import dayjs from 'dayjs'

export const dateToString = (date: Date) => dayjs(date).format('YYYY-MM-DD')
