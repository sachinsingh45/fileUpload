const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
const path = require("path");

// Local file upload handler
exports.localFileUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        
        const file = req.files.file;
        console.log("File received:", file);
        
        // Ensure the uploads directory exists
        const uploadPath = path.join(__dirname, "files", `${Date.now()}.${file.name.split('.').pop()}`);
        console.log("Saving file to:", uploadPath);

        file.mv(uploadPath, (err) => {
            if (err) {
                console.error("Error moving file:", err);
                return res.status(500).json({ success: false, message: "File move failed" });
            }
            res.json({ success: true, message: "Local file uploaded successfully", filePath: uploadPath });
        });
    } catch (error) {
        console.error("File upload error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder, resource_type: "auto" };
    if (quality) options.quality = quality;
    
    return await cloudinary.uploader.upload(file.tempFilePath || file.path, options);
}

// Image upload handler
exports.imageUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ success: false, message: "No image file uploaded" });
        }

        const { name, tags, email } = req.body;
        const file = req.files.imageFile;
        const fileType = file.name.split('.').pop().toLowerCase();
        const supportedTypes = ["jpg", "jpeg", "png"];

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ success: false, message: "File format not supported" });
        }

        console.log("Uploading image to Cloudinary...");
        const response = await uploadFileToCloudinary(file, "uploadFile-project");

        const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: `Your image with tags (${tags}) was successfully uploaded.`
        });
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Video upload handler
exports.videoUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.videoFile) {
            return res.status(400).json({ success: false, message: "No video file uploaded" });
        }

        const { name, tags, email } = req.body;
        const file = req.files.videoFile;
        const fileType = file.name.split('.').pop().toLowerCase();
        const supportedTypes = ["mp4", "mov"];

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ success: false, message: "File format not supported" });
        }

        // 5MB file size limit
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return res.status(400).json({ success: false, message: "File size exceeds 5MB limit" });
        }

        console.log("Uploading video to Cloudinary...");
        const response = await uploadFileToCloudinary(file, "uploadFile-project");

        const fileData = await File.create({ name, tags, email, videoUrl: response.secure_url });

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: `Your video with tags (${tags}) was successfully uploaded.`
        });
    } catch (error) {
        console.error("Video upload error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Image compression handler
exports.imageSizeReducer = async (req, res) => {
    try {
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ success: false, message: "No image file uploaded" });
        }

        const { name, tags, email } = req.body;
        const file = req.files.imageFile;
        const fileType = file.name.split('.').pop().toLowerCase();
        const supportedTypes = ["jpg", "jpeg", "png"];

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({ success: false, message: "File format not supported" });
        }

        console.log("Uploading compressed image to Cloudinary...");
        const response = await uploadFileToCloudinary(file, "uploadFile-project", 90);

        const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: `Your compressed image with tags (${tags}) was successfully uploaded.`
        });
    } catch (error) {
        console.error("Image compression error:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};