var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  // xu ly du lieu hoac la truy van vao database
  var array = [
    {id: 0, name: 'Le Duong 0'},
    {id: 1, name: 'Le Duong 1'},
    {id: 2, name: 'Le Duong 2'},
    {id: 3, name: 'Le Duong 3'},
    {id: 4, name: 'Le Duong 4'},
    {id: 5, name: 'Le Duong 5'},
  ]
  res.render('index', {data : array,title: 'Express', name: 'Le Duong'});
});

router.get('/asia',function (req,res) {

  var name = "Le Duong"

  var age = 19

  var array = [6, 8, 10, 13]

  var students = {name: 'Le Dinh Duong', phoneNumber: '0981176792'}

  var lists = [
    {name: 'Le Dinh Duong', phoneNumber: '0981176792'},
    {name: 'Le Dinh Duong', phoneNumber: '0981176792'},
    {name: 'Le Dinh Duong', phoneNumber: '0981176792'}
  ]

  res.render('asia',{title : 'Asia', message: '', name: name, age: age, array: array, students: students, lists: lists});
})
router.get('/euro',function (req,res) {
  console.log('euro')
  res.render('euro',{title : 'Europe'});
})
router.get('/america',function (req,res) {
  console.log('America')
  res.render('america',{title : 'America'});
})

router.get('/about',function (req,res) {
  console.log('About')
  res.render('about',{title : 'Contact us', message: ''});
})

router.get('/album',function (req,res) {

  const fs1 = require('fs');
  fs1.readFile("./data.json", 'utf8', function (error, data){
    if(error) throw error
    const albums = JSON.parse(data);
    console.log(albums);
  });
  res.render('album',{title : 'Album', message: ''  });
})

var fs = require('fs')

router.post('/hotro', function (request, response) {
  var email = request.body.email
  var phoneNumber  = request.body.phoneNumber
  var noiDung = request.body.noiDung


  fs.appendFile('luutru/' + email + '.txt',  '\n' + email + '\n' + phoneNumber + '\n' + noiDung, function (error) {
    var message = ''
    if (error) {
      message = error
    } else {
      message = "We have received your message  "
    }
    response.render('about', {title: 'Contact us', message: message})
  })

})

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/upload',function (req,res) {
  res.render('upload',{title : 'Upload', message: ''});
})
router.post('/upload', upload.single('avatar'), function (req,res, next) {
  res.render('upload',{title : 'Upload', message: 'Tai file thanh cong!'});
})

router.get('/listcar', function (req, res) {
  console.log('List car')
})

router.get('/sua', function (req, res) {
  console.log('Sua')
  Image.find({}, function (err, data) {
    res.render('sua', {title: 'Sua', message: '', data: data})
  })
})
router.post('updateCar', function (req, res) {
  var tenAnhMoi = req.body.tenAnhMoi
  var noiDungMoi = req.body.noiDungMoi
  var linkAnhMoi = req.body.linkAnhMoi
  Image.updateOne({tenAnh: tenAnhMoi}, {noiDung: noiDungMoi}, {linkAnh: linkAnhMoi}, function (error, data) {
    var mess;
    if (error == null) {
      mess = 'Sua thanh cong'
    } else {
      mess = error
    }
    res.render('sua', {title: 'Sua', message: mess, data: data})
  })
})

router.get('/danhsach', function (req, res) {
  console.log('Danh sach')
  Image.find({}, function (err, data) {
    res.render('danhsach', {data: data})
  })
})

// buoc 1: khoi tao khung - Schema
var dbb = 'mongodb+srv://admin:m4s0sNJl074v2Sbg@cluster0.6ado7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require("mongoose");
mongoose.connect(dbb);
var imageSchema = new mongoose.Schema({
  tenAnh: 'string',
  noiDung: 'string',
  linkAnh: 'string'
})
// buoc 2: lien ket Schema voi mongoDB qua mongoose
var Image = mongoose.model('image', imageSchema);

router.get('/them', function (req, res) {
  console.log('Them')
  res.render('them', {title: 'Them', message:''});
})
router.post('/addCar', function (req, res) {
  var tenAnh = req.body.tenAnh
  var noiDung = req.body.noiDung
  var linkAnh = req.body.linkAnh
  // buoc 3: khoi tao car voi gia tri lay duoc
  const image = new Image({
    tenAnh: tenAnh,
    noiDung: noiDung,
    linkAnh: linkAnh
  })
  image.save(function (error) {
    var mess;
    if (error == null) {
      mess = 'Them thanh cong'
    } else {
      mess = error
    }
    res.render('them', {title: 'Them', message: mess})
  })
})

module.exports = router;
