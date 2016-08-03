'use strict'

let request = require('request')
let cheerio = require('cheerio')
let async = require('async')
let format = require('util').format

let reddits = ['programming', 'javascript', 'node']
let concurrency = 2

async.eachLimit(reddits, concurrency, function (reddit, next) {
  var url = format('http://reddit.com/r/%s', reddit)
  request(url, function (err, response, body) {
    if (err) throw err
    var $ = cheerio.load(body)
    $('a.title').each(function () {
      console.log('%s (%s)', $(this).text(), $(this).attr('href'))
    })
    next()
  })
})
