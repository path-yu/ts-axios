var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const atob =  require('atob');
const mutipart = require('connect-multiparty');
var app = express();


app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(express.static(__dirname, {
  setHeaders (res) {
    console.log(res);
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))
app.use(express.static(path.join(__dirname, './client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 用于将文件上传到指定文件
app.use(mutipart({
  uploadDir: path.resolve(__dirname, 'accept-upload-file')
}))




const router = express.Router();
registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

registerConfigRouter()

registerCancelRouter()

registerMoreRouter()

registerUploadRouter()

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })
}

function registerBaseRouter() {

  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function (req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: 'hello world'
      })
    } else {
      res.status(500)
      res.end()
    }
  })
  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: 'hello world'
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end()
  })

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
    res.end()
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body)
  })

  // 响应数据支持泛型接口
  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'Alice',
        age: 18
      }
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function (req, res) {
    res.send('hello ')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', function (req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function (req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}

function registerMoreRouter() {
  router.get('/more/get', (req, res) => {
    console.log(req.query);
    res.json(req.cookies)
  })

  router.post('/more/post', function (req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log('atob on server:', atob(credentials))
    const [username, password] = atob(credentials).split(':').map(item => item.trim())
    if (type === 'Basic' && username === 'chen' && password === '123456') {
      res.json(req.body)
    } else {
      res.status(401)
      res.end('UnAuthorization')
    }
  })

  router.get('/more/304', function (req, res) {
    res.status(304)
    res.end()
  })

  router.get('/more/A', function (req, res) {
    res.end('A')
  })

  router.get('/more/B', function (req, res) {
    res.end('B')
  })
}

function registerUploadRouter() {
  router.post('/upload-download/upload', function (req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })
}
app.use(router);
app.listen(3000, () => {
    console.log('server start at localhost:3000 port');
})

module.exports = app;
