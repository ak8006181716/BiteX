userRouter.post(
    "/upload",
    upload.single("avatar"),
    async (req, res) => {
        const uploadimage = await uploadToCloudinary(req.file.path,"avatar")
        res.json({
            file: req.file,
            url:uploadimage.secure_url
        });
    }
);

result => {
    "file": {
        "fieldname": "avatar",
        "originalname": "761014920_2214087306049094_6165669099540930856_n.jpg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "path": "public\\upload\\1786127287337'-'761014920_2214087306049094_6165669099540930856_n.jpg",
        "destination": "public/upload",
        "filename": "1786127287337'-'761014920_2214087306049094_6165669099540930856_n.jpg",
        "size": 189520
    },
    "url": "https://res.cloudinary.com/ankityoutubeclone/image/upload/v1786127293/BiteX/avatar/1786127287337_-_761014920_2214087306049094_6165669099540930856_n.jpg"
}