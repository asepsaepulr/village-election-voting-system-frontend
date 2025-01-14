import { z, ZodType } from 'zod'

export const CREATE: ZodType = z
  .object({
    name: z
      .string({
        required_error: 'Oops, nama sesi pemilihan tidak boleh kosong'
      })
      .min(1, {
        message: 'Oops, nama sesi pemilihan tidak boleh kosong'
      }),
    start: z.coerce
      .date({
        errorMap: (issue, { defaultError }) => ({
          message:
            issue.code === 'invalid_date'
              ? 'Oops, tanggal mulai tidak valid'
              : defaultError
        })
      })
      .refine(
        (value) => {
          return new Date(value) > new Date()
        },
        {
          message: 'Oops, tanggal mulai tidak boleh kurang dari hari ini'
        }
      ),
    end: z.coerce
      .date({
        errorMap: (issue, { defaultError }) => ({
          message:
            issue.code === 'invalid_date'
              ? 'Oops, tanggal mulai tidak valid'
              : defaultError
        })
      })
      .refine(
        (value) => {
          return new Date(value) > new Date()
        },
        {
          message: 'Oops, tanggal selesai tidak boleh kurang dari hari ini'
        }
      )
  })
  .refine(
    (data) => {
      return (
        new Date(data.end) > new Date(data.start) &&
        new Date(data.end) >
          new Date(new Date(data.start).getTime() + 5 * 60 * 60 * 1000 - 1)
      )
    },
    {
      message:
        'Oops, tanggal selesai tidak boleh kurang dari tanggal mulai dan minimal 5 jam dari tanggal mulai',
      path: ['end']
    }
  )

export const UPDATE: ZodType = z
  .object({
    name: z
      .string({
        required_error: 'Oops, nama sesi pemilihan tidak boleh kosong'
      })
      .min(1, {
        message: 'Oops, nama sesi pemilihan tidak boleh kosong'
      }),
    start: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === 'invalid_date'
            ? 'Oops, tanggal mulai tidak valid'
            : defaultError
      })
    }),
    end: z.coerce.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === 'invalid_date'
            ? 'Oops, tanggal mulai tidak valid'
            : defaultError
      })
    })
  })
  .refine(
    (data) => {
      return (
        new Date(data.end) > new Date(data.start) &&
        new Date(data.end) >
          new Date(new Date(data.start).getTime() + 5 * 60 * 60 * 1000 - 1)
      )
    },
    {
      message:
        'Oops, tanggal selesai tidak boleh kurang dari tanggal mulai dan minimal 5 jam dari tanggal mulai',
      path: ['end']
    }
  )
