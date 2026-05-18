import { cp, rm } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const targetDir = path.join(root, 'pages-build')

await rm(targetDir, { recursive: true, force: true })
await cp(distDir, targetDir, { recursive: true })
