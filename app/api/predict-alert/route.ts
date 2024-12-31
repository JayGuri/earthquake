import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execPromise = promisify(exec)

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { features } = body

    const scriptPath = path.resolve(process.cwd(), 'app/utils/prediction_utils.py')
    const { stdout, stderr } = await execPromise(`python ${scriptPath} predict_alert '${JSON.stringify(features)}'`)

    if (stderr) {
      console.error('Python script error:', stderr)
      return NextResponse.json({ error: 'Prediction failed' }, { status: 500 })
    }

    return NextResponse.json({ prediction: stdout.trim() })
  } catch (error) {
    console.error('Error in predict-alert route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

