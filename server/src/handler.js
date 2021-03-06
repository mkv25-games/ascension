async function hello (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello serverless world! ${(await message({ time: 1, copy: 'we are ready to rock and roll!' }))}`
    })
  }
}

function message ({ time, ...rest }) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(`${rest.copy} (with a delay)`)
    }, time * 1000)
  )
}

module.exports = { hello }
