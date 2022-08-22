import multer from 'multer'
const storage = multer.memoryStorage()

const MulterUpload = multer({ dest: 'temp/', storage: storage })

export default MulterUpload
