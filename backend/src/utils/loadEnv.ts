import path from 'path'
import dotenv from 'dotenv'

const __dirname = path.resolve();

// Load .env from the repo root (one level up from backend)
const root = path.resolve(__dirname, '..')
dotenv.config({ path: path.resolve(root, '.env.local') })

// Validate required environment variables early to fail fast with a helpful message
const requiredEnv = [
	'CLOUD_NAME',
	'API_KEY',
	'API_SECRET',
	'MONGO_URI'
]

const missing = requiredEnv.filter((key) => !process.env[key])
if (missing.length > 0) {
	console.error('\nMissing required environment variables: ' + missing.join(', '))
	console.error('Please add them to your .env file at the repo root. Example keys: ' + requiredEnv.join(', '))
	// throw to stop startup early so the developer sees the clear message
	throw new Error('Missing required environment variables: ' + missing.join(', '))
}

export default null
