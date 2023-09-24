#!/usr/bin/env node

const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
const express = require('express')

const consolePrefix = 'build-plus: '

const configPath = path.resolve(process.argv[2] || './pages.json')

if (!fs.existsSync(configPath)) {
  return console.error(`${consolePrefix}Config file not found!`)
}

const config = JSON.parse(fs.readFileSync(configPath).toString())

const port = config.port || 8080
const src = path.resolve(config.src || 'build')
const pages = config.pages || []
const width = config.width || 1920
const height = config.height || 1080
const base = config.base || ''
const debug = config.debug || false

let dirs = []

config.pages.forEach(page => {
  let pagePathParts = page.split('/').filter(x => x)

  if (pagePathParts.length < 2) return

  pagePathParts.pop()

  dirs.push(pagePathParts.join('/'))
})

dirs = Array.from(new Set(dirs))

dirs.forEach(dir => fs.mkdirSync(path.resolve(src, dir), { recursive: true }))

const baseURL = `http://localhost:${port}${base}`

const pageGenerator = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
    ignoreHTTPSErrors: true,
    devtools: false
  })
  const browserPage = await browser.newPage()
  await browserPage.setViewport({ width, height })

  for (const page of pages) {
    const url = baseURL + page
    const outputPage = page.endsWith('/') ? page + 'index.html' : page + '.html'

    console.log(`${consolePrefix}Generating page: ${page} -> ${outputPage}`)

    await browserPage.goto(url)
    await browserPage.waitForNavigation({ waitUntil: 'networkidle0' })
    const content = await browserPage.content()

    fs.writeFileSync(path.resolve(src, outputPage.slice(1)), content)
  }

  browser.close()

  console.log(`${consolePrefix}Pages generated!`)
}

const main = async () => {
  const app = express()

  if (base) app.use(base, express.static(src))
  else app.use(express.static(src))

  app.get('*', (req, res) => res.sendFile(path.resolve(src, 'index.html')))

  const server = app.listen(port, async () => {
    console.log(`${consolePrefix}Server running on port: ${port}`)

    if (debug) return

    await pageGenerator()

    server.close()
  })
}

main()
