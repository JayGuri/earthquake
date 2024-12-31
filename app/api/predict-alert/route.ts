import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import { resolve } from 'path'

export async function POST(req: Request) {
  const body = await req.json()
  const { features } = body

  return new Promise((resolve) => {
    const process = spawn('python', [
      resolve('./app/utils/prediction_utils.py'),
      'predict_alert',
      JSON.stringify(features),
    ])

    let result = ''

    process.stdout.on('data', (data) => {
      result += data.toString()
    })

    process.on('close', (code) => {
      if (code !== 0) {
        resolve(NextResponse.json({ error: 'Prediction failed' }, { status: 500 }))
      } else {
        resolve(NextResponse.json({ prediction: result.trim() }))
      }
    })
  })
}

