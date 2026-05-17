import { cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const targetDir = path.join(root, 'pages-build')
const nestedDir = path.join(targetDir, 'avbyte')

await rm(targetDir, { recursive: true, force: true })
await mkdir(nestedDir, { recursive: true })
await cp(distDir, nestedDir, { recursive: true })
await cp(path.join(distDir, 'index.html'), path.join(targetDir, 'index.html'))
