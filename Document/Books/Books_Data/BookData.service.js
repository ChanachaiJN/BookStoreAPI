
const db = require('../../../UtilityService/db');
const BookData = db.BookDatas;

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    delete: _delete,
    deleteByBookName :_deleteByBookName
};


async function getAll() {
    return await BookData.find();
}

async function getById(id) {
    return await BookData.findById(id);
}
async function getByName(id) {
    return await BookData.findOne({bookName : id});
}

async function create(userParam) {


    const bookdata = new BookData(userParam);
    bookdata.rentPrice = Math.floor(bookdata.bookPrice / 10.00)
    let currentbookdata  =await BookData.findOne({bookName : userParam.bookName});
    console.log(currentbookdata,userParam.bookName);
    if(currentbookdata ) throw  userParam.bookName +"'books "+' has been created'

    // save user
    await bookdata.save();

    return  await bookdata;
}

async function _delete(id) {
    await BookData.findByIdAndRemove(id);
}
async function _deleteByBookName(id) {
    const BookData = BookData.find({bookName : id});
    await BookData.findByIdAndRemove(BookData.id);
}
