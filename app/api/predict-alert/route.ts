import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execPromise = promisify(exec)

export async function POST(req: Request): Promise<NextResponse> {
  console.log('Received request in predict-alert route')
  try {
    const body = await req.json()
    console.log('Request body:', body)
    const { features } = body

    if (!Array.isArray(features) || features.length !== 4 || features.some(f => typeof f !== 'number' || isNaN(f))) {
      console.error('Invalid input:', features)
      return NextResponse.json({ error: 'Invalid input: expected an array of 4 numbers' }, { status: 400 })
    }

    const scriptPath = path.resolve(process.cwd(), 'app/utils/prediction_utils.py')
    console.log('Executing Python script:', scriptPath)
    
    const pythonPath = 'C:\\Program Files\\Python312\\python.exe'
    const escapedFeatures = JSON.stringify(features).replace(/"/g, '\\"')
    const { stdout, stderr } = await execPromise(`"${pythonPath}" "${scriptPath}" predict_alert "${escapedFeatures}"`);

    console.log('Python script output:', stdout)
    console.error('Python script error:', stderr)

    const lines = stdout.trim().split('\n')
    const prediction = lines[lines.length - 1].trim()

    if (!prediction || prediction === "Error occurred during prediction") {
      console.error('Prediction failed')
      return NextResponse.json({ error: 'Prediction failed', logs: stdout + stderr }, { status: 500 })
    }

    console.log('Sending prediction:', prediction)
    return NextResponse.json({ prediction, logs: stdout + stderr })
  } catch (error) {
    console.error('Error in predict-alert route:', error)
    return NextResponse.json({ error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 })
  }
}

