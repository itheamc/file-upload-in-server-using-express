const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(fileUpload({
    createParentPath: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    useTempFiles: true
}))

// serve static file placed at public folder whenever received get request
app.use(express.static(path.join(__dirname, 'public')));


app.post('/upload', async (req, res) => {
    try {
        const uploaded_file = req.files.myfile;
        console.log(uploaded_file)
        const move_path = path.join(__dirname, 'public', 'uploads', `${new Date().getTime().toString()}${path.extname(uploaded_file.name)}`)
        await uploaded_file.mv(move_path)
        res.json({message: 'Uploaded Successfully'})
    } catch (error) {
        console.log(error.message)
        res.json({error: error.message})
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})


